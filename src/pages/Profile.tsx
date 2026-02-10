import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../shared/lib/redux/store';
import { updateUser } from '../shared/lib/redux/slices/authSlice';
import { User, Mail, Phone, Calendar, Clock, Shield, Edit, Save, X } from 'lucide-react';

export default function Profile() {
  const dispatch = useDispatch();
  const { user: reduxUser, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    avatar: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      dispatch(updateUser(parsed)); 
    }
  }, [dispatch]);

  useEffect(() => {
    if (reduxUser) {
      setFormData({
        name: reduxUser.name || '',
        phone: reduxUser.phone || '',
        avatar: reduxUser.avatar || '',
      });
    }
  }, [reduxUser]);

  const currentUser = reduxUser; 

  if (isAuthenticated === false) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="p-8 text-center text-gray-600">
        Пользователь не найден. Пожалуйста, авторизуйтесь.
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name || '',
      phone: currentUser.phone || '',
      avatar: currentUser.avatar || '',
    });
    setIsEditing(false);
  };

    const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);  
    };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Профиль</h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 sm:px-10 py-10 sm:py-12 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                {formData.avatar || currentUser.avatar ? (
                  <img
                    src={isEditing ? formData.avatar : currentUser.avatar}
                    alt="Аватар"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-xl"
                    onError={(e) => (e.currentTarget.src = '')}
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/20 flex items-center justify-center border-4 border-white">
                    <User size={64} className="text-white" />
                  </div>
                )}
                <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-4 border-white" />
              </div>

              <div className="text-center sm:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-3xl font-bold bg-transparent border-b-2 border-white focus:outline-none text-white w-full"
                  />
                ) : (
                  <h2 className="text-3xl font-bold">{currentUser.name || 'Пользователь'}</h2>
                )}
                <p className="mt-2 text-lg flex items-center gap-2 justify-center sm:justify-start">
                  <Shield size={20} />
                  {currentUser.role === 'admin' ? 'Администратор' : 'Пользователь'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <ProfileField icon={<Mail size={24} className="text-green-600" />} label="Email" value={currentUser.email || '—'} readOnly />

              <ProfileField
                icon={<Phone size={24} className="text-green-600" />}
                label="Телефон"
                value={isEditing ? formData.phone : currentUser.phone || 'Не указан'}
                name="phone"
                onChange={handleChange}
                editing={isEditing}
              />

              <ProfileField
                icon={<Calendar size={24} className="text-green-600" />}
                label="Дата регистрации"
                value={formatDate(currentUser.createdAt)}
                readOnly
              />

              <ProfileField
                icon={<Clock size={24} className="text-green-600" />}
                label="Последний вход"
                value={formatDate(currentUser.lastLogin)}
                readOnly
              />
            </div>

            <div className="flex flex-wrap justify-end gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <X size={18} /> Отмена
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center gap-2 shadow-sm"
                  >
                    <Save size={18} /> Сохранить изменения
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center gap-2 shadow-sm"
                >
                  <Edit size={18} /> Редактировать профиль
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function ProfileField({
  icon,
  label,
  value,
  name,
  onChange,
  editing = false,
  readOnly = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editing?: boolean;
  readOnly?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-4 bg-green-50 rounded-xl">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 uppercase tracking-wide">{label}</p>
        {editing && !readOnly ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        ) : (
          <p className="text-lg font-medium text-gray-900 mt-1">{value}</p>
        )}
      </div>
    </div>
  );
}