"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles = "relative font-semibold rounded-xl transition-all duration-300 cursor-pointer";

    const variants = {
        primary: "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0A0A0F] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]",
        secondary: "bg-[#18181B] text-white border border-[#FFD700]/30 hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]",
        ghost: "bg-transparent text-[#FFD700] hover:bg-[#FFD700]/10",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
