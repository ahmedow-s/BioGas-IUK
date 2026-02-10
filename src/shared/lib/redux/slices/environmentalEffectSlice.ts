import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Key } from 'react';

export interface EcoMetric {
  changeType: string;
  goal: any;
  change: boolean;
  id: string;
  title: string;
  value: number;
  unit: string;
  icon: string;
  color: string;
}

export interface WasteItem {
  id: Key | null | undefined;
  name: string;
  value: number;
  color: string;
}

export interface DataPoint {
  [x: string]: number;
  value: number;
}

export interface EnvironmentalEffectState {
  metrics: EcoMetric[];
  wasteComposition: WasteItem[];
  energySource: DataPoint[];
  period: 'day' | 'week' | 'month' | 'year';
  loading: boolean;
  error: string | null;
}

const initialState: EnvironmentalEffectState = {
  metrics: [
    {
      id: 'co2',
      title: 'Экономия CO₂',
      value: 850,
      unit: 'kg',
      icon: './icons/oil.svg',
      color: 'bg-green-100',
      changeType: '',
      goal: undefined,
      change: false
    },
    {
      id: 'methane',
      title: 'Улавливание метана',
      value: 1.5,
      unit: 'T',
      icon: './icons/lightning.svg',
      color: 'bg-blue-100',
      changeType: '',
      goal: undefined,
      change: false
    },
    {
      id: 'waste',
      title: 'Переработка отходов',
      value: 1.5,
      unit: 'T',
      icon: './icons/list.svg',
      color: 'bg-amber-100',
      changeType: '',
      goal: undefined,
      change: false
    },
    {
      id: 'wood',
      title: 'Сэкономлено дров',
      value: 2.5,
      unit: 'м³',
      icon: './icons/monitoring.svg',
      color: 'bg-lime-100',
      changeType: '',
      goal: undefined,
      change: false
    },
  ],
  wasteComposition: [
    {
      name: 'Навоз', value: 57, color: '#22c55e',
      id: undefined
    },
    {
      name: 'Пищевые отходы', value: 20, color: '#eab308',
      id: undefined
    },
    {
      name: 'Сельскохозяйственные отходы', value: 12, color: '#f97316',
      id: undefined
    },
    {
      name: 'Другие отходы', value: 11, color: '#ef4444',
      id: undefined
    },
  ],

  period: 'month',
  loading: false,
  error: null,
  energySource: []
};

const environmentalEffectSlice = createSlice({
  name: 'environmentalEffect',
  initialState,
  reducers: {
    updateMetric: (
      state,
      action: PayloadAction<{ metricId: string; value: number }>
    ) => {
      const metric = state.metrics.find(m => m.id === action.payload.metricId);
      if (metric) {
        metric.value = action.payload.value;
      }
    },
    updateWasteComposition: (
      state,
      action: PayloadAction<WasteItem[]>
    ) => {
      state.wasteComposition = action.payload;
    },
    updateEnergySource: (
      state,
      action: PayloadAction<DataPoint[]>
    ) => {
      state.energySource = action.payload;
    },
    setPeriod: (state, action: PayloadAction<'day' | 'week' | 'month' | 'year'>) => {
      state.period = action.payload;
      // На основе периода можно пересчитать метрики
      const multiplier: Record<string, number> = {
        day: 1,
        week: 7,
        month: 30,
        year: 365,
      };
      const factor = multiplier[action.payload] / multiplier[state.period];
      state.metrics.forEach(m => {
        m.value = m.value * factor;
      });
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
  updateMetric,
  updateWasteComposition,
  updateEnergySource,
  setPeriod,
  setLoading,
  setError,
} = environmentalEffectSlice.actions;

export default environmentalEffectSlice.reducer;
