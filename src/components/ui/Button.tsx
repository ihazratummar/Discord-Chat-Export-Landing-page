import React from 'react';
import styles from './Button.module.css';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    icon,
    className,
    ...props
}) => {
    const classes = [
        styles.button,
        styles[variant],
        size === 'lg' ? styles.lg : '',
        fullWidth ? styles.full : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} disabled={isLoading} {...props}>
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : icon}
            {children}
        </button>
    );
};
