"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import { portfolioData } from "@/lib/data";

export function Experience() {
    const [experiences, setExperiences] = useState(portfolioData.experiences);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch("/api/data", { cache: "no-store" });
                if (response.ok) {
                    const data = await response.json();
                    if (data.experiences && data.experiences.length > 0) {
                        setExperiences(data.experiences);
                    }
                }
            } catch (error) {
                console.error("Failed to load experiences:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    if (isLoading) {
        return (
            <Section id="experiencia" title="Experiência" subtitle="Minha jornada no universo iGaming" variant="gradient">
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-[#bcd200] border-t-transparent rounded-full animate-spin" />
                </div>
            </Section>
        );
    }

    return (
        <Section
            id="experiencia"
            title="Experiência"
            subtitle="Minha jornada no universo iGaming"
            variant="gradient"
        >
            <div className="relative max-w-3xl mx-auto">
                {/* Animated timeline line */}
                <motion.div
                    className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
                    style={{
                        background: "linear-gradient(180deg, transparent, rgba(188,210,0,0.4), rgba(188,210,0,0.4), transparent)",
                    }}
                >
                    {/* Animated glow pulse */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(180deg, transparent, rgba(188,210,0,0.6), transparent)",
                            height: "30%",
                        }}
                        animate={{ top: ["0%", "70%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>

                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className={`relative flex items-start gap-8 mb-14 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                    >
                        {/* Timeline node - Enhanced */}
                        <motion.div
                            className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full z-10"
                            style={{
                                background: "linear-gradient(135deg, #D4E65B 0%, #bcd200 100%)",
                                boxShadow: "0 0 20px rgba(188,210,0,0.5), 0 0 40px rgba(188,210,0,0.2)",
                            }}
                            whileInView={{
                                boxShadow: [
                                    "0 0 20px rgba(188,210,0,0.5), 0 0 40px rgba(188,210,0,0.2)",
                                    "0 0 30px rgba(188,210,0,0.7), 0 0 60px rgba(188,210,0,0.3)",
                                    "0 0 20px rgba(188,210,0,0.5), 0 0 40px rgba(188,210,0,0.2)",
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        />

                        {/* Card - Enhanced */}
                        <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative p-6 rounded-2xl overflow-hidden cursor-pointer group"
                                style={{
                                    background: "linear-gradient(135deg, rgba(14,14,26,0.98) 0%, rgba(6,6,16,0.99) 100%)",
                                    border: "1px solid rgba(188,210,0,0.1)",
                                }}
                            >
                                {/* Hover effects */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        boxShadow: "inset 0 0 0 1px rgba(188,210,0,0.3), 0 0 40px rgba(188,210,0,0.1)",
                                    }}
                                />

                                {/* Top glow line */}
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-px transition-all duration-500"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, #bcd200, transparent)",
                                    }}
                                />

                                {/* Period badge */}
                                <motion.span
                                    className="inline-block px-3 py-1 text-sm font-semibold rounded-lg mb-3"
                                    style={{
                                        background: "rgba(188,210,0,0.1)",
                                        color: "#bcd200",
                                        border: "1px solid rgba(188,210,0,0.2)",
                                    }}
                                >
                                    {exp.period}
                                </motion.span>

                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#bcd200] transition-colors">
                                    {exp.role}
                                </h3>
                                <p
                                    className="text-sm mb-4 font-medium"
                                    style={{ color: "rgba(188,210,0,0.7)" }}
                                >
                                    {exp.company}
                                </p>
                                <p className="text-[#8A8A9A] text-sm leading-relaxed">
                                    {exp.description}
                                </p>

                                {/* Decorative corner */}
                                <div
                                    className="absolute bottom-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity"
                                    style={{ color: "#bcd200" }}
                                >
                                    ◆
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
