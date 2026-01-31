"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -5, scale: 1.01 } : undefined}
            transition={{ duration: 0.3 }}
            className={`
        relative overflow-hidden rounded-2xl
        bg-[#12121A]/80 backdrop-blur-xl
        border border-[#FFD700]/10
        transition-all duration-300
        ${hover ? "hover:border-[#FFD700]/30 hover:shadow-[0_0_40px_rgba(255,215,0,0.1)]" : ""}
        ${className}
      `}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
