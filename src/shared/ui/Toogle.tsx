import { type FC, useId } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const Toggle: FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const id = useId();

  const sizes = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'h-3 w-3',
      translate: checked ? 'translate-x-4' : 'translate-x-0.5',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'h-5 w-5',
      translate: checked ? 'translate-x-6' : 'translate-x-0.5',
    },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />

        <label
          htmlFor={id}
          className={`
            ${currentSize.track}
            flex items-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${checked ? 'bg-green-600' : 'bg-gray-300'}
            peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 peer-focus:ring-offset-2
          `}
        >
          <span
            className={`
              ${currentSize.thumb}
              absolute bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out
              ${currentSize.translate}
              ${disabled ? 'opacity-70' : ''}
            `}
          />
        </label>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className={`font-medium text-gray-900 ${disabled ? 'opacity-60' : ''}`}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};