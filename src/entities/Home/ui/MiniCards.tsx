import { useSelector } from 'react-redux';
import type { RootState } from '../../../shared/lib/redux/store';

export default function MiniCards() {
  const cards = useSelector((state: RootState) => state.environmentalEffect.metrics);

  return (
    <div className="flex flex-wrap gap-12">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-gradient-to-br from-[#A3E635] to-[#1A6B3A] p-4 rounded-lg shadow-md w-[234px] h-[120px] flex flex-col items-center justify-center text-[#F8FAF9]"
        >
          <h3 className="text-[16px] font-medium">{card.title}</h3>
          <div className="flex items-center justify-center gap-2">
            <img src={card.icon} style={{ width: 42, height: 42 }} alt={card.title} />
            <div className="text-center flex flex-col items-center justify-center">
              <p className="text-[32px]">
                {card.value}
                {card.unit && <span className="text-[20px]"> {card.unit}</span>}
              </p>
              {card.change && card.changeType === 'up' && (
                <div className="text-[12px]">↑ {card.change} за сегодня</div>
              )}
              {card.change && card.changeType === 'down' && (
                <div className="text-[12px]">↓ {card.change} от нормы</div>
              )}
              {}
              {card.goal && <div className="text-[12px]">{card.goal}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
