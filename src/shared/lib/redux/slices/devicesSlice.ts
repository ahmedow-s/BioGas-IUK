import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Device {
  id: string;
  type: string;
  status: 'Активен' | 'В сети' | 'Ожидание' | 'Ошибка';
  location: string;
  lastSignal: string;
  deviceStatus: 'Активен' | 'В сети' | 'Ожидание' | 'Ошибка';
  category: 'all' | 'sensors';
}

export interface DevicesState {
  list: Device[];
  filter: 'all' | 'sensors';
  loading: boolean;
  error: string | null;
}

const initialState: DevicesState = {
  list: [
    { id: 'BIOGAS.KG01', type: 'Реактор', status: 'Ожидание', location: 'Реакторный цех №1', lastSignal: '2 минуты назад', deviceStatus: 'Ожидание', category: 'all' },
    { id: 'BIOGAS.KG02', type: 'Насос', status: 'Активен', location: 'Склад ГСМ', lastSignal: '1 час назад', deviceStatus: 'Активен', category: 'all' },
    { id: 'BIOGAS.KG03', type: 'Газгольдер', status: 'В сети', location: 'Склад ГСМ', lastSignal: 'В сети', deviceStatus: 'Активен', category: 'all' },
    { id: 'BIOGAS.KG04', type: 'Датчик pH', status: 'Активен', location: 'Склад ГСМ', lastSignal: '38 минут назад', deviceStatus: 'Активен', category: 'sensors' },
    { id: 'BIOGAS.KG05', type: 'Датчик давления', status: 'Активен', location: 'Реакторный цех №1', lastSignal: '5 минут назад', deviceStatus: 'Активен', category: 'sensors' },
    { id: 'BIOGAS.KG06', type: 'Датчик температуры', status: 'Ожидание', location: 'Склад опилок', lastSignal: '1 час назад', deviceStatus: 'Ожидание', category: 'sensors' },
    { id: 'BIOGAS.KG07', type: 'Датчик pH', status: 'Активен', location: 'Склад ГСМ', lastSignal: '38 минут назад', deviceStatus: 'Активен', category: 'sensors' },
    { id: 'BIOGAS.KG08', type: 'Датчик давления', status: 'Активен', location: 'Реакторный цех №1', lastSignal: '5 минут назад', deviceStatus: 'Активен', category: 'sensors' },
    { id: 'BIOGAS.KG09', type: 'Датчик температуры', status: 'Ожидание', location: 'Склад опилок', lastSignal: '1 час назад', deviceStatus: 'Ожидание', category: 'sensors' },
    { id: 'BIOGAS.KG010', type: 'Газгольдер', status: 'В сети', location: 'Склад ГСМ', lastSignal: 'В сети', deviceStatus: 'Активен', category: 'all' },
  ],
  filter: 'all',
  loading: false,
  error: null,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice: (state, action: PayloadAction<Device>) => {
      state.list.unshift(action.payload);
    },
    removeDevice: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(device => device.id !== action.payload);
    },
    updateDevice: (state, action: PayloadAction<Device>) => {
      const index = state.list.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    updateDeviceStatus: (
      state,
      action: PayloadAction<{ deviceId: string; status: Device['status'] }>
    ) => {
      const device = state.list.find(d => d.id === action.payload.deviceId);
      if (device) {
        device.status = action.payload.status;
        device.deviceStatus = action.payload.status === 'Активен' || action.payload.status === 'В сети' ? 'Активен' : action.payload.status;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'sensors'>) => {
      state.filter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addDevice,
  removeDevice,
  updateDevice,
  updateDeviceStatus,
  setFilter,
  setLoading,
  setError,
} = devicesSlice.actions;

export default devicesSlice.reducer;
