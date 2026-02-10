import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  date: string; // ISO или "2 минуты назад"
  isRead: boolean;
  link?: string; // если уведомление ведёт куда-то
}

export interface NotificationsState {
  list: Notification[];
  unreadCount: number;
  filter: 'all' | 'unread' | 'read';
}

const initialState: NotificationsState = {
  list: [
    {
      id: '1',
      title: 'Низкий уровень pH в реакторе №1',
      message: 'Значение pH упало до 5.8. Рекомендуется проверить подачу реагента.',
      type: 'warning',
      date: '5 минут назад',
      isRead: false,
    },
    {
      id: '2',
      title: 'Устройство BIOGAS.KG03 подключено',
      message: 'Газгольдер успешно вышел в сеть после обслуживания.',
      type: 'success',
      date: '1 час назад',
      isRead: true,
    },
    {
      id: '3',
      title: 'Критическая ошибка датчика давления',
      message: 'Датчик давления на складе ГСМ не отвечает более 30 минут.',
      type: 'error',
      date: 'Вчера, 14:23',
      isRead: false,
    },
    {
      id: '4',
      title: 'Ежедневный отчёт готов',
      message: 'Суточный отчёт по выработке биогаза доступен в разделе "Отчёты".',
      type: 'info',
      date: 'Сегодня, 08:00',
      isRead: true,
    },
    // можно добавить ещё
  ],
  unreadCount: 0, // будет вычисляться
  filter: 'all',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.list.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.list.forEach(n => { n.isRead = true; });
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.list.unshift(action.payload);
    },
    setFilter: (state, action: PayloadAction<NotificationsState['filter']>) => {
      state.filter = action.payload;
    },
    clearAll: (state) => {
      state.list = [];
    },
  },
});

export const {
  markAsRead,
  markAllAsRead,
  addNotification,
  setFilter,
  clearAll,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;