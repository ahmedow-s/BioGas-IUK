import { useSelector } from 'react-redux';
import type { RootState } from '../shared/lib/redux/store';
import PieChartWithCustomizedLabel from '../entities/ecology/ui/CustomPie';
import MiniEcoCards from '../entities/ecology/ui/MiniEcoCards';

export default function EcoImpact() {
  const { metrics, wasteComposition } = useSelector((state: RootState) => state.environmentalEffect);

  const COLORS = ['#1E7F43','#18CF5E','#A3E635','#77B510',   ];

  return (
    <div className="p-6 lg:p-8 ">
      <div className='mb-10'>
        <MiniEcoCards />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center lg:text-left mb-10">Состав отходов</h3>
          <div className="h-64 flex items-center justify-center lg:flex-row flex-col gap-6">
                <PieChartWithCustomizedLabel />
                <div>
                    <ul className="mt-4 flex flex-col gap-2">
                        {wasteComposition.map((item, index) => (
                            <li key={item.id ?? index} className="flex items-center gap-2">
                                <div style={{ backgroundColor: COLORS[index % COLORS.length] }} className="w-4 h-4 "></div>
                                <span className="text-gray-700">•  {item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
          </div>
        </div>

        <div className="bg-white p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Источник энергии</h3>
          <div className="h-64 flex items-center justify-center">
                   <PieChartWithCustomizedLabel />
                    <div>
                    <ul className="mt-4 flex flex-col gap-2">
                        {wasteComposition.map((item, index) => (
                            <li key={item.id ?? index} className="flex items-center gap-2">
                                <div style={{ backgroundColor: COLORS[index % COLORS.length] }} className="w-4 h-4 "></div>
                                <span className="text-gray-700">•  {item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white max-w-[492px] w-full h-[475px] rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6  flex flex-col">
            <div className='flex gap-30'>
              <h3 className="text-[20px] font-bold mb-3">Переработка отходов</h3>
              <div className='relative w-[100px] h-[40px] '>
                <img src="/icons/recycling.svg" alt="Переработка отходов" className="w-[66px] h-[66px] mx-auto" />
              </div>
            </div>
              <p className="text-3xl font-bold text-[#1E7F43] mb-2">50.000 тон/в год</p>
              <p className="text-gray-700 text-[16px] mb-4">
                Эффективная утилизация навоза и сельхозотходов без вреда для почвы
              </p>
            </div>
            <div>
                <img src="/img/ecology.jpg" alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-white max-w-[492px] w-full h-[475px] rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
            <div className='flex gap-20'>
              <h3 className="text-[20px] font-bold mb-3">Снижение выбросов CO₂</h3>
              <div className='relative w-[100px] h-[40px] '>
                <img src="/icons/recycling.svg" alt="Переработка отходов" className="w-[66px] h-[66px] mx-auto" />
              </div>
            </div>
              <p className="text-3xl font-bold text-green-700 mb-2">{Math.round(metrics[0]?.value ?? 850)} кг</p>
              <p className="text-gray-700 mb-4">
                Сокращение выбросов парниковых газов в атмосферу
              </p>
            </div>
            <div className='flex mt-6'>
                <img src="/img/ecology.jpg" alt="" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}