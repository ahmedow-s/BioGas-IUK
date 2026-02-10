import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { setCards, setChartData, setLoading, setError } from '../redux/slices/homeSlice';
import { useEffect } from 'react';

const fetchHomeData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
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
          { time: '00:00', value: 120 },
          { time: '04:00', value: 132 },
          { time: '08:00', value: 101 },
          { time: '12:00', value: 134 },
          { time: '16:00', value: 90 },
          { time: '20:00', value: 130 },
          { time: '24:00', value: 110 },
        ],
      });
    }, 500);
  });
};

export const useHomeData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => state.home.cards);
  const chartData = useSelector((state: RootState) => state.home.chartData);
  const loading = useSelector((state: RootState) => state.home.loading);
  const error = useSelector((state: RootState) => state.home.error);

  const loadData = async () => {
    dispatch(setLoading(true));
    try {
      const data = await fetchHomeData();
      dispatch(setCards((data as any).cards));
      dispatch(setChartData((data as any).chartData));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Ошибка загрузки данных'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  return { cards, chartData, loading, error, loadData };
};
