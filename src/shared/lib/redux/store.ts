import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingSlices';
import deviceFormReducer from './slices/deviceFormSlice';
import notificationsReducer from './slices/notificationSlice';
import monitoringReducer from './slices/monitoringSlice';
import environmentalEffectReducer from './slices/environmentalEffectSlice';
import devicesReducer from './slices/devicesSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    settings: settingsReducer,
    deviceForm: deviceFormReducer,
    notifications: notificationsReducer,
    monitoring: monitoringReducer,
    environmentalEffect: environmentalEffectReducer,
    devices: devicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
