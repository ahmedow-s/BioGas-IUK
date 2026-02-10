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
import Button from '../shared/ui/Button';
import Select from '../shared/ui/Select';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [logoutMinutes, setLogoutMinutes] = useState(settings.autoLogoutMinutes);

  const handleLogoutMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setLogoutMinutes(value);
      dispatch(setAutoLogoutMinutes(value));
    }
  };

  return (
    <div className="min-h-screen  px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('settings.title')}</h1>
        <p className="text-gray-600 mb-10">
          {t('settings.description')}
        </p>

        <div className="bg-white shadow rounded-xl  mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{t('settings.appearance')}</h2>
          </div>

          <div className="divide-y divide-gray-200">
            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{t('settings.theme')}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {t('settings.themeDescription')}
                </div>
              </div>
              <Select
                value={settings.theme}
                onChange={(value) => dispatch(setTheme(value as 'light' | 'dark' | 'system'))}
                className="
                  rounded-lg border border-gray-300 bg-white px-3 py-2 
                  text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 
                  outline-none transition
                "
                options={[
                  { value: 'light', label: t('settings.themeLight') },
                  { value: 'dark', label: t('settings.themeDark') },
                  { value: 'system', label: t('settings.themeSystem') },
                ]}
              />
              
               
            </div>

            <div className="px-6 py-5 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{t('settings.language')}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {t('settings.languageDescription')}
                </div>
              </div>
              <Select
                value={settings.language}
                onChange={(value) => dispatch(setLanguage(value as 'ru' | 'en' | 'kg'))}
                className="
                  rounded-lg border border-gray-300 bg-white px-3 py-2 
                  text-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-200 
                  outline-none transition
                "
                options={[
                  { value: 'ru', label: t('settings.languageRu') },
                  { value: 'en', label: t('settings.languageEn') },
                  { value: 'kg', label: t('settings.languageKg') },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{t('settings.notifications')}</h2>
          </div>

          <div className="divide-y divide-gray-200">
            <Toggle
              checked={settings.notificationsEnabled}
              onChange={() => dispatch(toggleNotifications())}
              label={t('settings.pushNotifications')}
              description={t('settings.pushNotificationsDesc')}
            />

            <Toggle
              checked={settings.emailNotifications}
              onChange={() => dispatch(toggleEmailNotifications())}
              label={t('settings.emailNotifications')}
              description={t('settings.emailNotificationsDesc')}
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{t('settings.security')}</h2>
          </div>

          <div className="px-6 py-6">
            <label className="block text-gray-900 font-medium mb-2">
              {t('settings.autoLogout')}
            </label>
            <p className="text-sm text-gray-500 mb-4">
              {t('settings.autoLogoutDesc')}
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
              <span className="ml-3 text-gray-600 text-sm">{t('settings.minutes')}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            className="
              px-6 py-2.5 border border-gray-300 rounded-lg 
              text-gray-700 hover:bg-gray-50 transition-colors
            "
          >
            {t('settings.cancel')}
          </Button>
          <Button
            type="button"
            className="
              px-6 py-2.5 bg-green-600 text-white rounded-lg 
              hover:bg-green-700 transition-colors font-medium
            "
          >
            {t('settings.save')}
          </Button>
        </div>
      </div>
    </div>
  );
}