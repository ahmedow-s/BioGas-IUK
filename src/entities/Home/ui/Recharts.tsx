import { useSelector } from 'react-redux';
import type { RootState } from '../../../shared/lib/redux/store';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function RechartsCharts() {
  const chartData = useSelector((state: RootState) => state.home.chartData);
  const loading = useSelector((state: RootState) => state.home.loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Загрузка данных...
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1     lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h3 className="w-[500px] h-[53px] border-b border-gray-200 text-[24px] font-semibold text-gray-800 mb-4">
          График выработки биогаза
        </h3>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="bioGasGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A3E635" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#A3E635" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)} т`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number | undefined) => [`${(value ?? 0).toLocaleString()} м³`, 'Объём']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#65a30d"
              strokeWidth={3}
              fill="url(#bioGasGreen)"
              dot={{ fill: '#65a30d', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h3 className="w-[500px] h-[53px] border-b border-gray-200 text-[24px] font-semibold text-gray-800 mb-4">
          График выработки биогаза
        </h3>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)} т`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number | undefined) => [`${(value ?? 0).toLocaleString()} м³`, 'Объём']}
            />
            <Bar
              dataKey="value"
              fill="#fdba74"
              radius={[8, 8, 0, 0]}
              barSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}