import { Activity, Droplet, Gauge, Thermometer, TrendingUp } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../shared/lib/redux/store';
import { selectReactor } from '../shared/lib/redux/slices/monitoringSlice';

export default function MonitoringDashboard() {
  const dispatch = useDispatch();
  const { reactors, selectedReactorId } = useSelector((state: RootState) => state.monitoring);
  const reactor = reactors.find(r => r.id === selectedReactorId);

  if (!reactor) return null;

  return (
    <div className="p-6 lg:p-8  min-h-screen">
      <div className="mb-6 flex gap-3 flex-wrap">
        {reactors.map(r => (
          <button
            key={r.id}
            onClick={(e) => {
              e.preventDefault();
              dispatch(selectReactor(r.id));
            }}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedReactorId === r.id
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-green-500'
            }`}
          >
            {r.name} {r.status === 'offline' && <span className="text-red-500">●</span>}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/5">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{reactor.name}</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full animate-pulse ${
                    reactor.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className={`font-semibold ${reactor.status === 'online' ? 'text-green-700' : 'text-red-700'}`}>
                  {reactor.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">Обновлено: {reactor.lastUpdate}</p>

            <div className="grid grid-cols-3 gap-5">
              <div className="text-center">
                <Thermometer className="w-10 h-10 mx-auto text-orange-500 mb-2" />
                <p className="text-3xl font-bold">{reactor.sensors[0]?.value ?? 0} °C</p>
                <p className="text-sm text-gray-600 mt-1">Температура</p>
                <div className="h-20 mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reactor.temperature}>
                      <Area type="monotone" dataKey="value" stroke="#10b981" fill="#d1fae5" strokeWidth={2.5} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="text-center">
                <Droplet className="w-10 h-10 mx-auto text-blue-500 mb-2" />
                <p className="text-3xl font-bold">{reactor.sensors[1]?.value ?? 0}</p>
                <p className="text-sm text-gray-600 mt-1">pH</p>
                <div className="h-20 mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reactor.temperature}>
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#bfdbfe" strokeWidth={2.5} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="text-center">
                <Gauge className="w-10 h-10 mx-auto text-purple-500 mb-2" />
                <p className="text-3xl font-bold">{reactor.sensors[2]?.value ?? 0}</p>
                <p className="text-sm text-gray-600 mt-1">кПа</p>
                <div className="h-20 mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reactor.temperature}>
                      <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#e9d5ff" strokeWidth={2.5} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 grid grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="text-base font-medium mb-3">Температура реактора</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reactor.temperature}>
                    <Area type="monotone" dataKey="value" stroke="#10b981" fill="#d1fae5" strokeWidth={3} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-green-600" />
                <h3 className="text-base font-medium">Метан</h3>
              </div>
              <p className="text-3xl font-bold mb-2">{reactor.sensors[3]?.value ?? 0} %</p>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reactor.methane}>
                    <Area type="monotone" dataKey="value" stroke="#10b981" fill="#d1fae5" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-medium">Давление системы</h3>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={reactor.pressure}>
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#bfdbfe" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Все датчики</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Датчик</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Значение</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Единица</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reactor.sensors.map(sensor => (
                <tr key={sensor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{sensor.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sensor.value}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sensor.unit}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sensor.status === 'normal'
                          ? 'bg-green-100 text-green-700'
                          : sensor.status === 'warning'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {sensor.status === 'normal' ? 'Норма' : sensor.status === 'warning' ? 'Предупреждение' : 'Ошибка'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}