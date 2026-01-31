"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

type SectionVariant = "light" | "dark" | "gradient" | "glow" | "minimal";

interface SectionProps {
    id: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
    variant?: SectionVariant;
}

const variantClasses: Record<SectionVariant, string> = {
    light: "section-light",
    dark: "section-dark",
    gradient: "section-gradient",
    glow: "section-glow",
    minimal: "section-minimal",
};

export function Section({
    id,
    title,
    subtitle,
    children,
    className = "",
    variant = "light"
}: SectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const contentY = useTransform(springProgress, [0, 0.5, 1], [30, 0, -30]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`py-24 md:py-32 px-4 relative overflow-hidden ${variantClasses[variant]} ${className}`}
        >
            <div className="absolute inset-0 chinese-pattern opacity-50" />

            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="max-w-6xl mx-auto relative z-10 gpu-accelerate"
            >
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        <span className="text-neon-gradient">{title}</span>
                    </h2>

                    {subtitle && (
                        <p className="text-[#8A8A9A] text-base md:text-lg max-w-xl mx-auto">
                            {subtitle}
                        </p>
                    )}

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="w-16 h-0.5 mx-auto mt-8 rounded-full"
                        style={{
                            background: "linear-gradient(90deg, transparent, #bcd200, transparent)",
                        }}
                    />
                </motion.div>

                {children}
            </motion.div>
        </section>
    );
}
