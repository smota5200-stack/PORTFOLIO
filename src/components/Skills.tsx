"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Section } from "./ui/Section";
import { portfolioData } from "@/lib/data";
import { getSkillIcon } from "./icons/SkillIcons";

export function Skills() {
    const [skills, setSkills] = useState<typeof portfolioData.skills>([]);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Load data from Firebase API
    useEffect(() => {
        const loadSkills = async () => {
            try {
                const response = await fetch("/api/data", {
                    cache: "no-store"
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.skills && data.skills.length > 0) {
                        setSkills(data.skills);
                    } else {
                        setSkills(portfolioData.skills);
                    }
                } else {
                    setSkills(portfolioData.skills);
                }
            } catch (error) {
                console.error("Failed to load skills:", error);
                setSkills(portfolioData.skills);
            } finally {
                setIsLoading(false);
            }
        };

        loadSkills();
    }, []);

    return (
        <Section
            id="skills"
            title="Skills"
            subtitle="Ferramentas e habilidades aplicadas em projetos"
            variant="dark"
        >
            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="p-5 md:p-6 rounded-2xl animate-pulse"
                            style={{
                                background: "linear-gradient(135deg, rgba(14,14,26,0.98) 0%, rgba(6,6,16,0.99) 100%)",
                                border: "1px solid rgba(188,210,0,0.1)",
                            }}
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#1A1A2E] mb-4" />
                            <div className="h-4 bg-[#1A1A2E] rounded w-3/4 mb-4" />
                            <div className="h-2 bg-[#0A0A14] rounded-full" />
                            <div className="mt-3 flex justify-end">
                                <div className="h-5 w-10 bg-[#1A1A2E] rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.08,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            className="group"
                        >
                            <motion.div
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="relative p-5 md:p-6 h-full rounded-2xl overflow-hidden gpu-accelerate cursor-pointer"
                                style={{
                                    background: "linear-gradient(135deg, rgba(14,14,26,0.98) 0%, rgba(6,6,16,0.99) 100%)",
                                    border: "1px solid rgba(188,210,0,0.1)",
                                }}
                            >
                                {/* Animated border glow on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: "transparent",
                                        boxShadow: "inset 0 0 0 1px rgba(188,210,0,0.3), 0 0 30px rgba(188,210,0,0.1)",
                                    }}
                                />

                                {/* Top line glow */}
                                <motion.div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-500"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, #bcd200, transparent)",
                                        boxShadow: "0 0 10px rgba(188,210,0,0.5)",
                                    }}
                                />

                                {/* Icon with glow */}
                                <motion.div
                                    className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 text-2xl md:text-3xl"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(188,210,0,0.15) 0%, rgba(120,141,0,0.05) 100%)",
                                        border: "1px solid rgba(188,210,0,0.2)",
                                        color: "#bcd200",
                                    }}
                                    whileHover={{
                                        boxShadow: "0 0 25px rgba(188,210,0,0.3)",
                                    }}
                                >
                                    <span className="text-2xl md:text-3xl">
                                        {getSkillIcon(skill.name)}
                                    </span>

                                    {/* Icon inner glow */}
                                    <div
                                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: "radial-gradient(circle at center, rgba(188,210,0,0.1) 0%, transparent 70%)",
                                        }}
                                    />
                                </motion.div>

                                {/* Name */}
                                <h3 className="text-sm md:text-base font-semibold text-white mb-2 group-hover:text-[#bcd200] transition-colors duration-300">
                                    {skill.name}
                                </h3>

                                {/* Description */}
                                {skill.description && (
                                    <p className="text-xs text-[#6A6A7A] mb-4 line-clamp-2 group-hover:text-[#8A8A9A] transition-colors duration-300">
                                        {skill.description}
                                    </p>
                                )}

                                {/* Progress Bar with glow - only show if showLevel is true */}
                                {(skill as typeof skill & { showLevel?: boolean }).showLevel !== false && (
                                    <>
                                        <div className="relative h-2 rounded-full overflow-hidden bg-[#0A0A14]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: false }}
                                                transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: "easeOut" }}
                                                className="absolute h-full rounded-full"
                                                style={{
                                                    background: "linear-gradient(90deg, #566A00 0%, #788D00 20%, #bcd200 50%, #D4E65B 80%, #bcd200 100%)",
                                                    boxShadow: "0 0 10px rgba(188,210,0,0.4)",
                                                }}
                                            />

                                            {/* Shimmer effect */}
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                                                }}
                                                initial={{ x: "-100%" }}
                                                whileInView={{ x: "200%" }}
                                                viewport={{ once: false }}
                                                transition={{ duration: 1.5, delay: 1 + index * 0.08, ease: "easeInOut" }}
                                            />
                                        </div>

                                        {/* Level */}
                                        <div className="mt-3 flex justify-end">
                                            <motion.span
                                                className="text-xs font-semibold px-2 py-0.5 rounded-md"
                                                style={{
                                                    background: "rgba(188,210,0,0.1)",
                                                    color: "#bcd200",
                                                    border: "1px solid rgba(188,210,0,0.15)",
                                                }}
                                            >
                                                {skill.level}%
                                            </motion.span>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            )}
        </Section>
    );
}
