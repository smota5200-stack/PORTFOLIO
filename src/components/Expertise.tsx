"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import { portfolioData } from "@/lib/data";

interface ExpertiseArea {
    id: number;
    title: string;
    items: string[];
}

export function Expertise() {
    const [areas, setAreas] = useState<ExpertiseArea[]>(portfolioData.expertiseAreas);
    const [sectionTitle, setSectionTitle] = useState(portfolioData.expertiseTitle || "Expertise & Especialidades");
    const [sectionSubtitle, setSectionSubtitle] = useState(portfolioData.expertiseSubtitle || "Áreas de atuação e competências especializadas");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(`/api/data?t=${Date.now()}`, { cache: "no-store" });
                if (response.ok) {
                    const data = await response.json();
                    if (data.expertiseAreas && data.expertiseAreas.length > 0) {
                        setAreas(data.expertiseAreas);
                    }
                    if (data.expertiseTitle) {
                        setSectionTitle(data.expertiseTitle);
                    }
                    if (data.expertiseSubtitle) {
                        setSectionSubtitle(data.expertiseSubtitle);
                    }
                }
            } catch (error) {
                console.error("Failed to load expertise:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    if (isLoading) {
        return (
            <Section id="expertise" title={sectionTitle} subtitle={sectionSubtitle} variant="dark">
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-[#bcd200] border-t-transparent rounded-full animate-spin" />
                </div>
            </Section>
        );
    }

    return (
        <Section
            id="expertise"
            title={sectionTitle}
            subtitle={sectionSubtitle}
            variant="dark"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {areas.map((area, index) => (
                    <motion.div
                        key={area.id || index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: index * 0.12 }}
                    >
                        <motion.div
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative p-6 rounded-2xl overflow-hidden h-full group cursor-pointer"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(14,14,26,0.98) 0%, rgba(6,6,16,0.99) 100%)",
                                border: "1px solid rgba(188,210,0,0.1)",
                            }}
                        >
                            {/* Hover glow */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    boxShadow:
                                        "inset 0 0 0 1px rgba(188,210,0,0.3), 0 0 40px rgba(188,210,0,0.08)",
                                }}
                            />

                            {/* Top glow line */}
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-px transition-all duration-500"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent, #bcd200, transparent)",
                                }}
                            />

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-xl">🔸</span>
                                <h3 className="text-lg font-bold text-white group-hover:text-[#bcd200] transition-colors">
                                    {area.title}
                                </h3>
                            </div>

                            {/* Items */}
                            <ul className="space-y-3">
                                {area.items.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.12 + i * 0.06,
                                        }}
                                        className="flex items-start gap-3 text-sm text-[#8A8A9A]"
                                    >
                                        <span
                                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #bcd200, rgba(188,210,0,0.5))",
                                                boxShadow:
                                                    "0 0 6px rgba(188,210,0,0.3)",
                                            }}
                                        />
                                        <span className="group-hover:text-[#c5c5d0] transition-colors">
                                            {item}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Decorative corner */}
                            <div
                                className="absolute bottom-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity"
                                style={{ color: "#bcd200" }}
                            >
                                ◆
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
