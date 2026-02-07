
type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

export default function Button({
    onClick,
    children,
    disabled = false,
    className = '',
    variant = 'primary',
    ...props
}: ButtonProps) {

    const buttonClasses = [
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
