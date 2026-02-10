import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'ru' | 'en' | 'kg';

export interface SettingsState {
  theme: Theme;
  language: Language;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  autoLogoutMinutes: number; // 0 = никогда
  // можно добавить: timezone, currency и т.д.
}

const initialState: SettingsState = {
  theme: 'system',
  language: 'ru',
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
      // здесь можно localStorage.setItem('theme', action.payload);
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
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