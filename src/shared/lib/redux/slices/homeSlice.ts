import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CardData {
  id: string;
  title: string;
  icon: string;
  value: string | number;
  unit?: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  goal?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface HomeState {
  cards: CardData[];
  chartData: ChartDataPoint[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  cards: [
    {
      id: '1',
      title: 'Общий объём газа',
      icon: '/icons/oil.svg',
      value: 450,
      unit: 'м³',
      change: '12%',
      changeType: 'up',
    },
    {
      id: '2',
      title: 'Выработка энергии',
      icon: '/icons/lightning.svg',
      value: 1.2,
      unit: 'МВт/ч',
      goal: 'Цель 1.5 М/ч',
    },
    {
      id: '3',
      title: 'Экономия CO₂',
      icon: '/icons/list.svg',
      value: 850,
      unit: 'кг.',
      change: '20%',
      changeType: 'down',
    },
    {
      id: '4',
      title: 'Активные установки',
      icon: '/icons/monitoring.svg',
      value: 12,
    },
  ],
  chartData: [
   { date: 'Nov 01', value: 10000 },
  { date: 'Nov 05', value: 6000 },
  { date: 'Nov 10', value: 9000 },
  { date: 'Nov 15', value: 5000 },
  { date: 'Nov 20', value: 11000 },
  { date: 'Nov 25', value: 7000 },
  { date: 'Nov 30', value: 9500 },
  ],
  loading: false,
  error: null,
};




const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<CardData[]>) => {
      state.cards = action.payload;
    },
    updateCard: (state, action: PayloadAction<{ id: string; data: Partial<CardData> }>) => {
      const card = state.cards.find(c => c.id === action.payload.id);
      if (card) {
        Object.assign(card, action.payload.data);
      }
    },
    setChartData: (state, action: PayloadAction<ChartDataPoint[]>) => {
      state.chartData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCards, updateCard, setChartData, setLoading, setError } = homeSlice.actions;
export default homeSlice.reducer;
