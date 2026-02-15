"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { portfolioData as defaultData } from "@/lib/data";
import { useRef, useState, useEffect } from "react";

// Load personal data from Firebase API
function usePersonalData() {
    const [personal, setPersonal] = useState<typeof defaultData.personal | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch("/api/data", {
                    cache: "no-store"
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.personal) setPersonal(data.personal);
                    else setPersonal(defaultData.personal);
                } else {
                    setPersonal(defaultData.personal);
                }
            } catch {
                setPersonal(defaultData.personal);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    return { personal: personal || defaultData.personal, isLoading };
}

export function Hero() {
    const { personal, isLoading } = usePersonalData();
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    // Use spring for smoother scroll-linked animations
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const contentY = useTransform(smoothProgress, [0, 1], [0, 60]);
    const contentOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.6, 0]);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg"
        >
            <div className="absolute inset-0 chinese-pattern" />

            {/* Static gradient orbs - no JS animation */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(188,210,0,0.35) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(0,212,255,0.35) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Main content */}
            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="relative z-30 text-center px-4 max-w-4xl mx-auto gpu-accelerate"
            >
                {/* Premium glassmorphism badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12"
                    style={{
                        background: "linear-gradient(135deg, rgba(188,210,0,0.1) 0%, rgba(10,10,20,0.85) 100%)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(188,210,0,0.3)",
                        boxShadow: "0 0 30px rgba(188,210,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                >
                    <motion.span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                            background: "#bcd200",
                            boxShadow: "0 0 10px #bcd200",
                        }}
                        animate={{
                            opacity: [1, 0.4, 1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[#bcd200] text-sm font-semibold tracking-wider uppercase">
                        Disponível para novos projetos
                    </span>
                </motion.div>

                {/* Name with enhanced glow */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
                >
                    <span className="text-white" style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}>
                        {personal.name.split(" ")[0]}
                    </span>{" "}
                    <motion.span
                        className="text-neon-gradient inline-block"
                        style={{
                            textShadow: "0 0 60px rgba(188,210,0,0.5), 0 0 120px rgba(188,210,0,0.3)",
                        }}
                        animate={{
                            textShadow: [
                                "0 0 60px rgba(188,210,0,0.5), 0 0 120px rgba(188,210,0,0.3)",
                                "0 0 80px rgba(188,210,0,0.7), 0 0 160px rgba(188,210,0,0.4)",
                                "0 0 60px rgba(188,210,0,0.5), 0 0 120px rgba(188,210,0,0.3)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {personal.name.split(" ")[1]}
                    </motion.span>
                </motion.h1>

                {/* Title with underline animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative inline-block mb-3"
                >
                    <p className="text-xl md:text-2xl text-[#8A8A9A] font-medium">
                        {personal.title}
                    </p>
                    <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                        style={{ background: "linear-gradient(90deg, transparent, #bcd200, transparent)" }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.8 }}
                    />
                </motion.div>

                {/* Subtitle with cyan accent */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-lg md:text-xl font-medium mb-14"
                    style={{
                        color: "#00D4FF",
                        textShadow: "0 0 30px rgba(0,212,255,0.3)",
                    }}
                >
                    {personal.subtitle}
                </motion.p>

                {/* Premium CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5"
                >
                    <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(188,210,0,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
                        className="btn-fortune px-10 py-4 cursor-pointer text-base"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <span>Ver Projetos</span>
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                    </motion.button>

                    <motion.button
                        whileHover={{
                            scale: 1.03,
                            borderColor: "rgba(188,210,0,0.5)",
                            boxShadow: "0 0 30px rgba(188,210,0,0.15)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
                        className="px-10 py-4 rounded-xl font-semibold cursor-pointer transition-all"
                        style={{
                            background: "linear-gradient(135deg, rgba(188,210,0,0.08) 0%, rgba(10,10,20,0.92) 100%)",
                            border: "1px solid rgba(188,210,0,0.25)",
                            color: "#bcd200",
                        }}
                    >
                        Entre em Contato
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Enhanced scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[#bcd200]/60 text-xs font-medium uppercase tracking-widest">Scroll</span>
                    <div
                        className="w-6 h-10 rounded-full flex items-start justify-center p-2"
                        style={{
                            border: "2px solid rgba(188,210,0,0.3)",
                            background: "rgba(188,210,0,0.05)",
                        }}
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                                background: "#bcd200",
                                boxShadow: "0 0 8px #bcd200",
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
