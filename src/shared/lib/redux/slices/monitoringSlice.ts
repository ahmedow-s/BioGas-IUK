import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Sensor {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'error';
  threshold?: { min?: number; max?: number };
}

export interface ChartPoint {
  time: number;
  value: number;
}

export interface Reactor {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastUpdate: string;
  sensors: Sensor[];
  temperature: ChartPoint[];
  methane: ChartPoint[];
  pressure: ChartPoint[];
}

export interface MonitoringState {
  reactors: Reactor[];
  selectedReactorId: string;
  loading: boolean;
  error: string | null;
}

// Mock данные
const mockChartData = Array.from({ length: 24 }, (_, i) => ({
  time: i,
  value: 35 + Math.sin(i * 0.6) * 2.5 + Math.random() * 0.8,
}));

const mockMethaneData = Array.from({ length: 24 }, (_, i) => ({
  time: i,
  value: 60 + Math.sin(i * 0.4) * 4,
}));

const mockPressureData = Array.from({ length: 24 }, (_, i) => ({
  time: i,
  value: 103 + Math.sin(i * 0.5) * 1.5,
}));

const initialState: MonitoringState = {
  reactors: [
    {
      id: 'reactor-1',
      name: 'Реактор N1',
      status: 'online',
      lastUpdate: '10 секунд назад',
      sensors: [
        { id: 's1', name: 'Температура', value: 36.9, unit: '°C', status: 'normal' },
        { id: 's2', name: 'pH', value: 7.1, unit: 'pH', status: 'normal' },
        { id: 's3', name: 'Давление', value: 103.4, unit: 'кПа', status: 'normal' },
        { id: 's4', name: 'Метан (CH₄)', value: 62.8, unit: '%', status: 'normal' },
      ],
      temperature: mockChartData,
      methane: mockMethaneData,
      pressure: mockPressureData,
    },
    {
      id: 'reactor-2',
      name: 'Реактор N2',
      status: 'online',
      lastUpdate: '45 секунд назад',
      sensors: [
        { id: 's5', name: 'Температура', value: 35.2, unit: '°C', status: 'normal' },
        { id: 's6', name: 'pH', value: 6.8, unit: 'pH', status: 'warning' },
        { id: 's7', name: 'Давление', value: 101.2, unit: 'кПа', status: 'normal' },
        { id: 's8', name: 'Метан (CH₄)', value: 58.5, unit: '%', status: 'normal' },
      ],
      temperature: mockChartData,
      methane: mockMethaneData,
      pressure: mockPressureData,
    },
    {
      id: 'reactor-3',
      name: 'Реактор N3',
      status: 'offline',
      lastUpdate: '3 часа назад',
      sensors: [
        { id: 's9', name: 'Температура', value: 0, unit: '°C', status: 'error' },
        { id: 's10', name: 'pH', value: 0, unit: 'pH', status: 'error' },
        { id: 's11', name: 'Давление', value: 0, unit: 'кПа', status: 'error' },
        { id: 's12', name: 'Метан (CH₄)', value: 0, unit: '%', status: 'error' },
      ],
      temperature: [],
      methane: [],
      pressure: [],
    },
  ],
  selectedReactorId: 'reactor-1',
  loading: false,
  error: null,
};

const monitoringSlice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    selectReactor: (state, action: PayloadAction<string>) => {
      state.selectedReactorId = action.payload;
      state.error = null;
    },
    updateSensorValue: (
      state,
      action: PayloadAction<{ reactorId: string; sensorId: string; value: number }>
    ) => {
      const reactor = state.reactors.find(r => r.id === action.payload.reactorId);
      if (reactor) {
        const sensor = reactor.sensors.find(s => s.id === action.payload.sensorId);
        if (sensor) {
          sensor.value = action.payload.value;
        }
      }
    },
    updateReactorStatus: (
      state,
      action: PayloadAction<{ reactorId: string; status: 'online' | 'offline' }>
    ) => {
      const reactor = state.reactors.find(r => r.id === action.payload.reactorId);
      if (reactor) {
        reactor.status = action.payload.status;
      }
    },
    addChartPoint: (
      state,
      action: PayloadAction<{
        reactorId: string;
        type: 'temperature' | 'methane' | 'pressure';
        point: ChartPoint;
      }>
    ) => {
      const reactor = state.reactors.find(r => r.id === action.payload.reactorId);
      if (reactor) {
        if (action.payload.type === 'temperature') {
          reactor.temperature.push(action.payload.point);
          if (reactor.temperature.length > 24) reactor.temperature.shift();
        } else if (action.payload.type === 'methane') {
          reactor.methane.push(action.payload.point);
          if (reactor.methane.length > 24) reactor.methane.shift();
        } else if (action.payload.type === 'pressure') {
          reactor.pressure.push(action.payload.point);
          if (reactor.pressure.length > 24) reactor.pressure.shift();
        }
      }
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
  selectReactor,
  updateSensorValue,
  updateReactorStatus,
  addChartPoint,
  setLoading,
  setError,
} = monitoringSlice.actions;

export default monitoringSlice.reducer;
