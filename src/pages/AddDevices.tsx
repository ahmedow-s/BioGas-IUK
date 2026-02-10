import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../shared/lib/redux/store';
import {
  updateField,
  toggleSensor,
  resetForm,
  setError,
  setSubmitting,
} from '../shared/lib/redux/slices/deviceFormSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/ui/Button';

export default function AddDevice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, isSubmitting, error } = useSelector((state: RootState) => state.deviceForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ [name]: value }));
  };

  const handleSensorToggle = (sensor: string) => {
    dispatch(toggleSensor(sensor));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.type || !form.location.trim()) {
      dispatch(setError('Заполните обязательные поля: название, тип и расположение'));
      return;
    }

    if (form.sensors.length === 0) {
      dispatch(setError('Выберите хотя бы один датчик'));
      return;
    }

    dispatch(setSubmitting(true));

    console.log('Сохраняем устройство:', form);

    setTimeout(() => {
      dispatch(setSubmitting(false));
      dispatch(resetForm());
      navigate('/devices'); 
    }, 1200);
  };

  const deviceTypes = [
    'Реактор',
    'Насос',
    'Газгольдер',
    'Датчик pH',
    'Датчик давления',
    'Датчик температуры',
    'Другое',
  ];

  const locations = [
    'Реакторный цех №1',
    'Склад ГСМ',
    'Склад опилок',
    'Территория фермы',
    'Другое',
  ];

  const sensorsList = [
    'pH-датчик',
    'Датчик давления газа',
    'Датчик расхода газа',
    'Температурный датчик',
    'Метан (CH₄)',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 border-r border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                Основные данные
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название устройства <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Например: Реактор №1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип устройства <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none bg-white"
                  >
                    <option value="">Выберите тип</option>
                    {deviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Расположение <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none bg-white"
                  >
                    <option value="">Выберите расположение</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание устройства
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Краткое описание, серийный номер, особенности..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">2</span>
                Датчики устройства
              </h2>

              <p className="text-sm text-gray-600 mb-5">
                Выберите датчики, которые установлены на этом устройстве
              </p>

              <div className="space-y-4">
                {sensorsList.map(sensor => (
                  <label key={sensor} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.sensors.includes(sensor)}
                      onChange={() => handleSensorToggle(sensor)}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-gray-800">{sensor}</span>
                  </label>
                ))}
              </div>

              {form.sensors.includes('Датчик расхода газа') && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Диапазон расхода газа</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Мин (м³/ч)</label>
                      <input
                        type="number"
                        value={form.minValue ?? ''}
                        onChange={e => dispatch(updateField({ minValue: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Макс (м³/ч)</label>
                      <input
                        type="number"
                        value={form.maxValue ?? ''}
                        onChange={e => dispatch(updateField({ maxValue: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                dispatch(resetForm());
                navigate(-1);
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Отмена
            </button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить устройство'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}