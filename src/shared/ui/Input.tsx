
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
}

export default function Input({
    label,
    error,
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
