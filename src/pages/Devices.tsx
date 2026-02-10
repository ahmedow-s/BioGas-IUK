import { useState } from 'react';
import { MoreVertical, Eye, Download, Trash2 } from 'lucide-react';
import Button from '../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../shared/lib/redux/store';
import { removeDevice, setFilter } from '../shared/lib/redux/slices/devicesSlice';

export default function Devices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: devices, filter } = useSelector((state: RootState) => state.devices);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleAddDevice = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/add-device');
  };

  const handleDeleteDevice = (e: React.MouseEvent, deviceId: string) => {
    e.preventDefault();
    dispatch(removeDevice(deviceId));
    setOpenMenuId(null);
  };

  const handleViewDevice = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implement view device page
  };

  const handleDownloadDevice = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implement download device data
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активен':
      case 'В сети':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Ожидание':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Ошибка':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-[279px] w-full">
          <Button
            onClick={(e) => {
              e.preventDefault();
              dispatch(setFilter('all'));
            }}
            className={`text-lg font-semibold ${filter === 'all' ? 'text-gray-800' : 'text-gray-500'}`}
          >
            Все устройства
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              dispatch(setFilter('sensors'));
            }}
            className={`text-lg font-semibold ${filter === 'sensors' ? 'text-gray-800' : 'text-gray-500'}`}
          >
            Датчики
          </Button>
        </div>
        <Button
          onClick={handleAddDevice}
          className="flex items-center gap-2 bg-[#1E7F43] hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Добавить устройство
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 font-medium">ID устройства</th>
              <th className="px-6 py-3 font-medium">Тип</th>
              <th className="px-6 py-3 font-medium">Расположение</th>
              <th className="px-6 py-3 font-medium">Последний сигнал</th>
              <th className="px-6 py-3 font-medium">Статус</th>
              <th className="px-6 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {devices.map((device) => {
              const isOpen = openMenuId === device.id;

              return (
                <tr key={device.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{device.id}</td>
                  <td className="px-6 py-4">{device.type}</td>
                  <td className="px-6 py-4">{device.location}</td>
                  <td className="px-6 py-4 text-gray-600">{device.lastSignal}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(device.deviceStatus)}`}>
                      {device.deviceStatus === 'Ожидание' ? 'Ожидание' : device.deviceStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right relative">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenMenuId(isOpen ? null : device.id);
                      }}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <MoreVertical size={18} className="text-gray-500" />
                    </button>

                    {isOpen && (
                      <div className="absolute right-4 top-8 z-10 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-1 text-sm">
                        <button
                          onClick={handleViewDevice}
                          className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Eye size={16} /> Посмотреть
                        </button>
                        <button
                          onClick={handleDownloadDevice}
                          className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Download size={16} /> Скачать
                        </button>
                        <button
                          onClick={(e) => handleDeleteDevice(e, device.id)}
                          className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                        >
                          <Trash2 size={16} /> Удалить
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}