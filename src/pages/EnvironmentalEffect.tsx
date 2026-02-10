import { useSelector } from 'react-redux';
import type { RootState } from '../shared/lib/redux/store';
import PieChartWithCustomizedLabel from '../entities/ecology/ui/CustomPie';
import MiniEcoCards from '../entities/ecology/ui/MiniEcoCards';

export default function EcoImpact() {
  const { metrics, wasteComposition } = useSelector((state: RootState) => state.environmentalEffect);

  const COLORS = ['#1E7F43', '#18CF5E', '#A3E635', '#77B510'];

  return (
    <div className="p-5 sm:p-6 lg:p-8 min-h-screen ">
      <div className="mb-8 sm:mb-10">
        <MiniEcoCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 lg:mb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5 sm:mb-6 text-center sm:text-left">
            Состав отходов
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 min-h-[260px] sm:min-h-[280px]">
            <div className="w-full max-w-[260px] sm:max-w-[300px] aspect-square">
              <PieChartWithCustomizedLabel />
            </div>

            <div className="w-full max-w-sm">
              <ul className="flex flex-col gap-2.5 sm:gap-3 text-sm sm:text-base">
                {wasteComposition.map((item, index) => (
                  <li key={item.id ?? index} className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm flex-shrink-0"
                    />
                    <span className="text-gray-700">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5 sm:mb-6 text-center sm:text-left">
            Источник энергии
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 min-h-[260px] sm:min-h-[280px]">
            <div className="w-full max-w-[260px] sm:max-w-[300px] aspect-square">
              <PieChartWithCustomizedLabel />
            </div>

            <div className="w-full max-w-sm">
              <ul className="flex flex-col gap-2.5 sm:gap-3 text-sm sm:text-base">
                {wasteComposition.map((item, index) => (
                  <li key={item.id ?? index} className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm flex-shrink-0"
                    />
                    <span className="text-gray-700">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-auto min-h-[420px] sm:min-h-[460px]">
            <div className="p-5 sm:p-6 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-start sm:items-center justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  Переработка отходов
                </h3>
                <img
                  src="/icons/recycling.svg"
                  alt="Переработка"
                  className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0"
                />
              </div>

              <p className="text-2xl sm:text-3xl font-bold text-[#1E7F43]">
                50 000 тон/в год
              </p>

              <p className="text-gray-600 text-sm sm:text-base">
                Эффективная утилизация навоза и сельхозотходов без вреда для почвы
              </p>
            </div>

            <div className="mt-auto flex-1 min-h-[180px] sm:min-h-[220px]">
              <img
                src="/img/ecology.jpg"
                alt="Переработка отходов"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-auto min-h-[420px] sm:min-h-[460px]">
            <div className="p-5 sm:p-6 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-start sm:items-center justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  Снижение выбросов CO₂
                </h3>
                <img
                  src="/icons/recycling.svg"
                  alt="Снижение CO₂"
                  className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0"
                />
              </div>

              <p className="text-2xl sm:text-3xl font-bold text-green-700">
                {Math.round(metrics[0]?.value ?? 850)} кг
              </p>

              <p className="text-gray-600 text-sm sm:text-base">
                Сокращение выбросов парниковых газов в атмосферу
              </p>
            </div>

            <div className="mt-auto flex-1 min-h-[180px] sm:min-h-[220px] max-h-[320px]">
              <img
                src="/img/ecology.jpg"
                alt="Снижение выбросов"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}