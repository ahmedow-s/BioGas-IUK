import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../shared/lib/redux/store';
import {
  setTheme,
  setLanguage,
  toggleNotifications,
  toggleEmailNotifications,
  setAutoLogoutMinutes,
} from '../shared/lib/redux/slices/settingSlices';
import { useState } from 'react';

const Toggle = ({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  description?: string;
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-5">
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        {description && (
          <div className="text-sm text-gray-500 mt-1">{description}</div>
        )}
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`
            w-11 h-6 bg-gray-200 rounded-full peer 
            peer-checked:after:translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
            after:bg-white after:border-gray-300 after:border after:rounded-full 
            after:h-5 after:w-5 after:transition-all
            peer-checked:bg-green-600
          `}
        />
      </label>
    </div>
  );
};

export default function Settings() {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  const [logoutMinutes, setLogoutMinutes] = useState(settings.autoLogoutMinutes);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(e.target.value as 'light' | 'dark' | 'system'));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value as 'ru' | 'en' | 'kg'));
  };

  const handleLogoutMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setLogoutMinutes(value);
      dispatch(setAutoLogoutMinutes(value));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Настройки</h1>
        <p className="text-gray-600 mb-10">
          Управление внешним видом, уведомлениями и безопасностью
        </p>

        {/* 1. Внешний вид */}
        <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Внешний вид</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {/* Тема */}
            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Тема оформления</div>
                <div className="text-sm text-gray-500 mt-1">
                  Светлая, тёмная или как в системе
                </div>
              </div>
              <select
                value={settings.theme}
                onChange={handleThemeChange}
                className="
                  rounded-lg border border-gray-300 bg-white px-3 py-2 
                  text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 
                  outline-none transition
                "
              >
                <option value="light">Светлая</option>
                <option value="dark">Тёмная</option>
                <option value="system">Системная</option>
              </select>
            </div>

            {/* Язык */}
            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Язык интерфейса</div>
                <div className="text-sm text-gray-500 mt-1">
                  Язык приложения
                </div>
              </div>
              <select
                value={settings.language}
                onChange={handleLanguageChange}
                className="
                  rounded-lg border border-gray-300 bg-white px-3 py-2 
                  text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 
                  outline-none transition
                "
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
                <option value="kg">Кыргызча</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Уведомления */}
        <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Уведомления</h2>
          </div>

          <div className="divide-y divide-gray-200">
            <Toggle
              checked={settings.notificationsEnabled}
              onChange={() => dispatch(toggleNotifications())}
              label="Push-уведомления"
              description="Получать уведомления на устройство"
            />

            <Toggle
              checked={settings.emailNotifications}
              onChange={() => dispatch(toggleEmailNotifications())}
              label="Email-уведомления"
              description="Важные оповещения на почту"
            />
          </div>
        </div>

        {/* 3. Безопасность */}
        <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Безопасность</h2>
          </div>

          <div className="px-6 py-6">
            <label className="block text-gray-900 font-medium mb-2">
              Автоматический выход из системы
            </label>
            <p className="text-sm text-gray-500 mb-4">
              Выход после неактивности (в минутах, 0 = никогда)
            </p>

            <div className="flex items-center">
              <input
                type="number"
                min="0"
                value={logoutMinutes}
                onChange={handleLogoutMinutesChange}
                className="
                  w-28 rounded-lg border border-gray-300 px-3 py-2 
                  text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 
                  outline-none transition
                "
              />
              <span className="ml-3 text-gray-600 text-sm">минут</span>
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="
              px-6 py-2.5 border border-gray-300 rounded-lg 
              text-gray-700 hover:bg-gray-50 transition-colors
            "
          >
            Отмена
          </button>
          <button
            type="button"
            className="
              px-6 py-2.5 bg-green-600 text-white rounded-lg 
              hover:bg-green-700 transition-colors font-medium
            "
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
}