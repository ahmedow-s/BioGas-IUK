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

const getInitialToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const getInitialUser = () => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('user');
  return stored ? (JSON.parse(stored) as User) : null;
};

const token = getInitialToken();
const user = getInitialUser();

const initialState: AuthState = {
  token,
  user,
  isAuthenticated: !!(token && user),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
