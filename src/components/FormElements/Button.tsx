import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
    color: "primary" | "secondary";
    href?: string;
    to?: string;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
};

const Button = ({
    color,
    href,
    to,
    type,
    onClick,
    disabled,
    children,
}: ButtonProps) => {
    if (href) {
        return (
            <a className={color} href={href}>
                {children}
            </a>
        );
    }

    if (to) {
        return (
            <Link to={to} className={color}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={color}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
