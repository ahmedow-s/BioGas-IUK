import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const getInitialToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
const getInitialUser = () => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('user');
  return stored ? (JSON.parse(stored) as User) : null;
};

const initialState: AuthState = {
  token: getInitialToken(),
  user: getInitialUser(),
  isAuthenticated: !!(getInitialToken() && getInitialUser()),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        token: string;
        user: User;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
          lastLogin: new Date().toISOString(),
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      }
    },

    clearToken: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },

    forceLogout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
  },
});

export const { setToken, updateUser, clearToken, forceLogout } = authSlice.actions;
export default authSlice.reducer;