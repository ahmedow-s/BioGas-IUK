
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    value?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorClassName?: string;
}

export default function Input({
    label,
    error,
    value,
    onChange,
    className,
    wrapperClassName,
    labelClassName,
    errorClassName,
    disabled,
    ...props
}: InputProps) {
    return (
        <div className={wrapperClassName}>
            {label && (
                <label className={labelClassName}>
                    {label}
                </label>
            )}

            <input
                disabled={disabled}
                className={className}
                value={value}
                onChange={onChange}
                {...props}
            />

            {error && (
                <span className={errorClassName}>
                    {error}
                </span>
            )}
        </div>
    );
}
