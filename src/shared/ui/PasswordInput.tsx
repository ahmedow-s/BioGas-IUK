import { useState } from 'react';
import Input from './Input';

type PasswordInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function PasswordInput({ value, onChange }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative max-w-[450px]">
            <Input
                type={showPassword ? 'text' : 'password'}
                className="bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] w-full h-[45px] p-4 pr-12 text-[16px] text-[#8E8E93] font-regular"
                placeholder="Введите пароль"
                required
                value={value}
                onChange={onChange}
            />
            <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
            >
                <img
                    src={showPassword ? '/icons/show.png' : '/icons/hide.svg'}
                    alt="Toggle password visibility"
                    className="w-5 h-5"
                />
            </button>
        </div>
    );
}
