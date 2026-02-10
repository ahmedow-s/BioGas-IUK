import axios from 'axios';
import type { CardData, ChartDataPoint } from '../redux/slices/homeSlice';

interface HomeDataResponse {
  cards: CardData[];
  chartData: ChartDataPoint[];
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const homeApi = {
  getHomeData: async (): Promise<HomeDataResponse> => {
    const response = await apiClient.get<HomeDataResponse>('/home');
    return response.data;
  },

  getCards: async (): Promise<CardData[]> => {
    const response = await apiClient.get<CardData[]>('/home/cards');
    return response.data;
  },

  getChartData: async (): Promise<ChartDataPoint[]> => {
    const response = await apiClient.get<ChartDataPoint[]>('/home/chart');
    return response.data;
  },

  updateCard: async (cardId: string, data: Partial<CardData>): Promise<CardData> => {
    const response = await apiClient.put<CardData>(`/home/cards/${cardId}`, data);
    return response.data;
  },
};
