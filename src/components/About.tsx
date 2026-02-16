"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Section } from "./ui/Section";
import { portfolioData } from "@/lib/data";
import { getStatIconById } from "./icons/StatIcons";

export function About() {
    const [personal, setPersonal] = useState<typeof portfolioData.personal | null>(null);
    const [stats, setStats] = useState<typeof portfolioData.stats>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load data from Firebase API
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch("/api/data", {
                    cache: "no-store"
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.personal) {
                        setPersonal(data.personal);
                    } else {
                        setPersonal(portfolioData.personal);
                    }
                    if (data.stats && data.stats.length > 0) {
                        setStats(data.stats);
                    } else {
                        setStats(portfolioData.stats);
                    }
                } else {
                    setPersonal(portfolioData.personal);
                    setStats(portfolioData.stats);
                }
            } catch {
                setPersonal(portfolioData.personal);
                setStats(portfolioData.stats);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // Use loaded data or default
    const displayPersonal = personal || portfolioData.personal;
    const displayStats = stats.length > 0 ? stats : portfolioData.stats;

    return (
        <Section
            id="sobre"
            title="Sobre"
            subtitle="Conheça o designer por trás dos visuais"
            variant="glow"
        >
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Avatar Section - Enhanced */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        {/* Outer glow ring */}
                        <motion.div
                            className="absolute -inset-4 rounded-3xl opacity-50"
                            style={{
                                background: "linear-gradient(135deg, rgba(188,210,0,0.1) 0%, transparent 50%, rgba(0,212,255,0.05) 100%)",
                                filter: "blur(20px)",
                            }}
                            animate={{
                                opacity: [0.3, 0.5, 0.3],
                                scale: [1, 1.02, 1],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Main avatar container */}
                        <motion.div
                            className="relative w-64 md:w-80 rounded-2xl overflow-hidden"
                            style={{
                                aspectRatio: "4/5",
                                background: "linear-gradient(135deg, rgba(14,14,26,0.95) 0%, rgba(6,6,16,0.98) 100%)",
                                border: "1px solid rgba(188,210,0,0.2)",
                                boxShadow: `
                  0 25px 80px rgba(0,0,0,0.6),
                  0 0 60px rgba(188,210,0,0.08),
                  inset 0 1px 0 rgba(255,255,255,0.03)
                `,
                            }}
                            whileHover={{
                                borderColor: "rgba(188,210,0,0.4)",
                                boxShadow: `
                  0 30px 100px rgba(0,0,0,0.7),
                  0 0 80px rgba(188,210,0,0.12),
                  inset 0 1px 0 rgba(255,255,255,0.05)
                `,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Inner pattern */}
                            <div className="absolute inset-0 chinese-pattern opacity-30" />

                            {/* Photo or fallback placeholder */}
                            <div className="w-full h-full flex items-center justify-center relative">
                                {(displayPersonal as typeof displayPersonal & { photo?: string }).photo ? (
                                    <Image
                                        src={(displayPersonal as typeof displayPersonal & { photo?: string }).photo!}
                                        alt={displayPersonal.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 256px, 320px"
                                    />
                                ) : (
                                    <>
                                        <motion.div
                                            className="text-8xl md:text-9xl"
                                            style={{
                                                color: "#bcd200",
                                                opacity: 0.4,
                                                textShadow: "0 0 50px rgba(188,210,0,0.5)",
                                            }}
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                rotate: [0, 5, 0, -5, 0],
                                            }}
                                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            ◆
                                        </motion.div>

                                        {/* Floating mini symbols */}
                                        <motion.span
                                            className="absolute top-8 right-8 text-xl"
                                            style={{ color: "#bcd200", opacity: 0.3 }}
                                            animate={{ y: [0, -5, 0], opacity: [0.3, 0.5, 0.3] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            ♠
                                        </motion.span>
                                        <motion.span
                                            className="absolute bottom-8 left-8 text-xl"
                                            style={{ color: "#00D4FF", opacity: 0.3 }}
                                            animate={{ y: [0, 5, 0], opacity: [0.3, 0.5, 0.3] }}
                                            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                                        >
                                            ♦
                                        </motion.span>
                                    </>
                                )}
                            </div>

                            {/* Shimmer overlay */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(135deg, transparent 30%, rgba(188,210,0,0.05) 50%, transparent 70%)",
                                }}
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                            />
                        </motion.div>

                        {/* Corner accents */}
                        <motion.div
                            className="absolute -top-3 -right-3 w-20 h-20"
                            style={{
                                borderTop: "2px solid rgba(188,210,0,0.4)",
                                borderRight: "2px solid rgba(188,210,0,0.4)",
                                borderRadius: "0 16px 0 0",
                            }}
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute -bottom-3 -left-3 w-20 h-20"
                            style={{
                                borderBottom: "2px solid rgba(188,210,0,0.4)",
                                borderLeft: "2px solid rgba(188,210,0,0.4)",
                                borderRadius: "0 0 0 16px",
                            }}
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                        />
                    </div>
                </motion.div>

                {/* Content Section - Enhanced */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                >
                    {/* Name badge */}
                    <motion.div
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl"
                        style={{
                            background: "linear-gradient(135deg, rgba(188,210,0,0.1) 0%, rgba(10,10,20,0.8) 100%)",
                            border: "1px solid rgba(188,210,0,0.2)",
                            backdropFilter: "blur(10px)",
                        }}
                        whileHover={{
                            borderColor: "rgba(188,210,0,0.4)",
                            boxShadow: "0 0 20px rgba(188,210,0,0.1)",
                        }}
                    >
                        <motion.span
                            style={{ color: "#bcd200" }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            ◆
                        </motion.span>
                        <span className="text-[#bcd200] font-semibold">{displayPersonal.name}</span>
                    </motion.div>

                    {/* Bio paragraphs */}
                    <div className="space-y-4">
                        {displayPersonal.bio.split('\n\n').map((paragraph, i) => (
                            <motion.p
                                key={i}
                                className="text-[#8A8A9A] leading-relaxed text-base md:text-lg"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>

                    {/* Location */}
                    <motion.div
                        className="flex items-center gap-3 text-[#8A8A9A]"
                        whileHover={{ x: 5 }}
                    >
                        <span
                            className="text-lg"
                            style={{
                                color: "#bcd200",
                                textShadow: "0 0 10px rgba(188,210,0,0.5)",
                            }}
                        >
                            ◎
                        </span>
                        <span className="font-medium">{displayPersonal.location}</span>
                    </motion.div>
                </motion.div>
            </div >

            {/* Stats - Enhanced */}
            < motion.div
                initial={{ opacity: 0, y: 30 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20"
            >
                {
                    displayStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="relative p-6 md:p-8 text-center rounded-2xl overflow-hidden cursor-pointer group"
                            style={{
                                background: "linear-gradient(135deg, rgba(14,14,26,0.98) 0%, rgba(6,6,16,0.99) 100%)",
                                border: "1px solid rgba(188,210,0,0.1)",
                            }}
                        >
                            {/* Hover border glow */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    boxShadow: "inset 0 0 0 1px rgba(188,210,0,0.3), 0 0 30px rgba(188,210,0,0.1)",
                                }}
                            />

                            {/* Top glow line */}
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-px transition-all duration-500"
                                style={{
                                    background: "linear-gradient(90deg, transparent, #bcd200, transparent)",
                                }}
                            />

                            {/* Icon */}
                            <div className="text-3xl md:text-4xl mb-3" style={{ color: "#bcd200" }}>
                                {getStatIconById(stat.icon) || <span>{stat.icon}</span>}
                            </div>

                            {/* Value with glow */}
                            <motion.div
                                className="text-4xl md:text-5xl font-black mb-2"
                                style={{
                                    background: "linear-gradient(180deg, #EBF3AD 0%, #bcd200 50%, #9AB000 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    filter: "drop-shadow(0 0 20px rgba(188,210,0,0.3))",
                                }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-sm text-[#8A8A9A] font-medium">{stat.label}</div>
                        </motion.div>
                    ))
                }
            </motion.div >
        </Section >
    );
}
