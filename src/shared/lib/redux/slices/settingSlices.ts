import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'ru' | 'en' | 'kg';

export interface SettingsState {
  theme: Theme;
  language: Language;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  autoLogoutMinutes: number; 
}

const readLocal = <T,>(key: string, fallback: T) => {
  try {
    const v = localStorage.getItem(key);
    return (v as unknown as T) || fallback;
  } catch (e) {
    return fallback;
  }
};

const initialState: SettingsState = {
  theme: readLocal<Theme>('theme', 'system'),
  language: readLocal<Language>('language', 'ru'),
  notificationsEnabled: true,
  emailNotifications: true,
  autoLogoutMinutes: 30,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      try {
        localStorage.setItem('theme', action.payload);
      } catch (e) {
        // ignore
      }
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      try {
        localStorage.setItem('language', action.payload);
      } catch (e) {
        // ignore
      }
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    toggleEmailNotifications: (state) => {
      state.emailNotifications = !state.emailNotifications;
    },
    setAutoLogoutMinutes: (state, action: PayloadAction<number>) => {
      state.autoLogoutMinutes = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const {
  setTheme,
  setLanguage,
  toggleNotifications,
  toggleEmailNotifications,
  setAutoLogoutMinutes,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;