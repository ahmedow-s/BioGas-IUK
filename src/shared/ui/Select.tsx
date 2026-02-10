// src/shared/ui/SearchableSelect.tsx
import { useState, useRef, useEffect } from 'react';
import {ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
 className?: string;
  placeholder?: string;
}

export default function Select({
  options,
  value,
  onChange,
  className = '',
  placeholder = 'Поиск и выбор...',
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selected = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg flex items-center z-5 justify-between cursor-pointer hover:border-green-400 transition ${className}`}
      >
        <div className="flex items-center gap-2">
          {selected?.icon}
          <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
            {selected?.label || placeholder}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-hidden">      
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-sm text-center">
                Ничего не найдено
              </div>
            ) : (
              filtered.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`
                    px-4 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-green-50 transition
                    ${opt.value === value ? 'bg-green-50 text-green-700' : 'text-gray-800'}
                  `}
                >
                  {opt.icon}
                  {opt.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}