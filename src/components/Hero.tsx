"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { portfolioData as defaultData } from "@/lib/data";
import { useRef, useMemo, useState, useEffect } from "react";

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

// Optimized Floating Coins - reduced animations
function FloatingCoins() {
    const coins = useMemo(() => [
        { id: 1, size: 40, top: "15%", left: "5%", delay: 0 },
        { id: 2, size: 32, top: "25%", right: "8%", delay: 1 },
        { id: 3, size: 36, bottom: "20%", right: "5%", delay: 2 },
    ], []);

    return (
        <>
            {coins.map((coin) => (
                <div
                    key={coin.id}
                    className="absolute pointer-events-none coin-float"
                    style={{
                        top: coin.top,
                        bottom: coin.bottom,
                        left: coin.left,
                        right: coin.right,
                        width: coin.size,
                        height: coin.size,
                        animationDelay: `${coin.delay}s`,
                        willChange: "transform",
                    }}
                >
                    <div
                        className="w-full h-full rounded-full"
                        style={{
                            background: "linear-gradient(145deg, #EBF3AD 0%, #bcd200 30%, #788D00 70%, #bcd200 100%)",
                            boxShadow: "0 0 15px rgba(188,210,0,0.3)",
                            border: "2px solid rgba(188,210,0,0.5)",
                        }}
                    />
                </div>
            ))}
        </>
    );
}


// Optimized Sparkles - using fixed values to avoid hydration mismatch
function Sparkles() {
    // Pre-calculated fixed values to avoid server/client mismatch
    const sparkles = [
        { id: 0, x: 15, y: 20, size: 3, delay: 0 },
        { id: 1, x: 85, y: 15, size: 2.5, delay: 1 },
        { id: 2, x: 25, y: 75, size: 4, delay: 2 },
        { id: 3, x: 70, y: 45, size: 2, delay: 0.5 },
        { id: 4, x: 45, y: 85, size: 3.5, delay: 1.5 },
        { id: 5, x: 90, y: 60, size: 2.5, delay: 2.5 },
        { id: 6, x: 10, y: 50, size: 3, delay: 3 },
        { id: 7, x: 60, y: 30, size: 4, delay: 3.5 },
    ];

    return (
        <>
            {sparkles.map((sparkle) => (
                <div
                    key={sparkle.id}
                    className="absolute rounded-full pointer-events-none sparkle-pulse"
                    style={{
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
                        width: sparkle.size,
                        height: sparkle.size,
                        background: sparkle.id % 3 === 0 ? "#bcd200" : sparkle.id % 3 === 1 ? "#00D4FF" : "#FF0080",
                        boxShadow: `0 0 ${sparkle.size * 3}px currentColor`,
                        animationDelay: `${sparkle.delay}s`,
                        willChange: "opacity, transform",
                    }}
                />
            ))}
        </>
    );
}

// Fortune Characters - optimized with CSS animations
function FloatingCharacters() {
    return (
        <>
            {/* Fortune Tiger - Canto Superior Direito */}
            <div
                className="absolute top-16 right-8 md:right-16 w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 pointer-events-none z-20 character-float"
                style={{ animationDelay: "0s", willChange: "transform" }}
            >
                <div className="relative w-full h-full">
                    {/* Glow */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(188,210,0,0.35) 0%, transparent 70%)",
                            filter: "blur(20px)",
                            transform: "scale(1.2)",
                        }}
                    />
                    <Image
                        src="/images/fortune-tiger.png"
                        alt="Fortune Tiger"
                        fill
                        className="object-contain"
                        style={{
                            filter: "drop-shadow(0 0 20px rgba(188,210,0,0.25)) drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
                        }}
                        priority
                    />
                </div>
            </div>

            {/* Fortune Dragon - Canto Inferior Esquerdo */}
            <div
                className="absolute bottom-12 left-6 md:left-12 w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 pointer-events-none z-20 character-float"
                style={{ animationDelay: "0.3s", willChange: "transform" }}
            >
                <div className="relative w-full h-full">
                    {/* Glow */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(188,210,0,0.35) 0%, transparent 70%)",
                            filter: "blur(20px)",
                            transform: "scale(1.2)",
                        }}
                    />
                    <Image
                        src="/images/dragon-wild.png"
                        alt="Fortune Dragon"
                        fill
                        className="object-contain"
                        style={{
                            filter: "drop-shadow(0 0 20px rgba(188,210,0,0.25)) drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
                        }}
                        priority
                    />
                </div>
            </div>
        </>
    );
}

// Decorative Casino Symbols - CSS animated
function CasinoSymbols() {
    const symbols = useMemo(() => [
        { char: "♠", top: "12%", right: "25%", size: 24, color: "#bcd200", delay: 0 },
        { char: "♦", top: "40%", right: "15%", size: 20, color: "#00D4FF", delay: 0.5 },
        { char: "♣", bottom: "35%", right: "22%", size: 22, color: "#bcd200", delay: 1 },
        { char: "♥", bottom: "15%", right: "30%", size: 18, color: "#FF0080", delay: 1.5 },
    ], []);

    return (
        <>
            {symbols.map((symbol, i) => (
                <div
                    key={i}
                    className="absolute pointer-events-none font-bold symbol-pulse"
                    style={{
                        top: symbol.top,
                        bottom: symbol.bottom,
                        right: symbol.right,
                        fontSize: symbol.size,
                        color: symbol.color,
                        textShadow: `0 0 15px ${symbol.color}`,
                        animationDelay: `${symbol.delay}s`,
                        willChange: "opacity, transform",
                    }}
                >
                    {symbol.char}
                </div>
            ))}
        </>
    );
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
    const elementsOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

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

            {/* Floating elements */}
            <motion.div style={{ opacity: elementsOpacity }} className="absolute inset-0 overflow-hidden">
                <Sparkles />
                <FloatingCoins />
                <FloatingCharacters />
                <CasinoSymbols />
            </motion.div>

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
