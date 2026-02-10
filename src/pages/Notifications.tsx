import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../shared/lib/redux/store';
import {
  markAsRead,
  markAllAsRead,
  setFilter,
} from '../shared/lib/redux/slices/notificationSlice';
import { Bell, Check, CheckCheck, Clock, AlertCircle, Search } from 'lucide-react';
import type { Notification } from '../shared/lib/redux/slices/notificationSlice';
import SearchableSelect from '../shared/ui/Select';

export default function Notifications() {
  const dispatch = useDispatch();
  const { list, filter } = useSelector((state: RootState) => state.notifications);

  const unreadCount = list.filter((n: Notification) => !n.isRead).length;

  const filteredList = list.filter((notification: Notification) => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'error':   return 'bg-red-100 text-red-800 border-red-200';
      case 'info':    return 'bg-blue-100 text-blue-800 border-blue-200';
      default:        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Уведомления</h1>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {unreadCount} новых
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <SearchableSelect
              value={filter}
              onChange={(value) => dispatch(setFilter(value as 'all' | 'unread' | 'read'))}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:border-green-500 focus:ring-green-200"
              options={[
                { value: 'all', label: 'Все уведомления' },
                { value: 'unread', label: 'Непрочитанные' },
                { value: 'read', label: 'Прочитанные' },
              ]}
            />
            {unreadCount > 0 && (
              <button
                onClick={() => dispatch(markAllAsRead())}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
              >
                <CheckCheck size={18} />
                Пометить все как прочитанные
              </button>
            )}
          </div>
        </div>

        {filteredList.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {filter === 'unread' ? 'Нет непрочитанных уведомлений' : 'Нет уведомлений'}
            </h3>
            <p className="text-gray-500">
              Здесь будут отображаться все важные события и оповещения системы
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredList.map((notification: Notification) => (
              <div
                key={notification.id}
                className={`
                  bg-white rounded-xl shadow-sm border-l-4 p-5 flex items-start gap-4 
                  transition-all hover:shadow-md
                  ${notification.isRead ? 'border-gray-200' : 'border-green-500 bg-green-50/40'}
                `}
              >
                <div className={`p-3 rounded-full ${getTypeStyles(notification.type).split(' ')[0]}`}>
                  {notification.type === 'success' && <Check size={24} />}
                  {notification.type === 'warning' && <Clock size={24} />}
                  {notification.type === 'error' && <AlertCircle size={24} />}
                  {notification.type === 'info' && <Bell size={24} />}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-medium ${notification.isRead ? 'text-gray-900' : 'text-gray-900 font-semibold'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {notification.date}
                    </span>
                  </div>

                  <p className="mt-1 text-gray-600 text-sm">
                    {notification.message}
                  </p>

                  {notification.link && (
                    <a
                      href={notification.link}
                      className="mt-2 inline-block text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Перейти →
                    </a>
                  )}

                  {!notification.isRead && (
                    <button
                      onClick={() => dispatch(markAsRead(notification.id))}
                      className="mt-3 text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
                    >
                      <Check size={16} /> Пометить как прочитанное
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}