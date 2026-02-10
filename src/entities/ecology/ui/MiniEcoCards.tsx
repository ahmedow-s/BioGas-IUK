import { useSelector } from 'react-redux';
import type { RootState } from '../../../shared/lib/redux/store';

export default function MiniEcoCards() {
  const cards = useSelector((state: RootState) => state.environmentalEffect.metrics);

  return (
    <div className="flex flex-wrap gap-12 md:items-center justify-center">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white p-4 rounded-lg shadow-md w-[234px] h-[120px] flex flex-col items-center justify-center "
        >
          <h3 className="text-[16px] font-medium">{card.title}</h3>
          <div className="flex items-center justify-center gap-2">
            <img src={card.icon} style={{ width: 42, height: 42 }} alt={card.title} />
            <div className="text-center flex flex-col items-center justify-center">
              <p className="text-[32px]">
                {card.value}
                {card.unit && <span className="text-[20px]"> {card.unit}</span>}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
