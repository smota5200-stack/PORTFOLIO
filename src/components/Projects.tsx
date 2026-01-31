"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Section } from "./ui/Section";
import { portfolioData as defaultData } from "@/lib/data";
import { ProjectModal } from "./ProjectModal";
import { ProjectWithImages } from "@/lib/usePortfolioData";

export function Projects() {
    const [projects, setProjects] = useState(defaultData.projects as ProjectWithImages[]);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<ProjectWithImages | null>(null);

    // Load data from localStorage if available
    useEffect(() => {
        const savedData = localStorage.getItem("portfolio_data");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed.projects) {
                    setProjects(parsed.projects);
                }
            } catch {
                console.error("Failed to parse saved data");
            }
        }
    }, []);

    const categories = ["Todos", ...new Set(projects.map((p) => p.category))];
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const filteredProjects =
        selectedCategory === "Todos"
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    const handleProjectClick = (project: ProjectWithImages) => {
        setSelectedProject(project);
    };

    return (
        <>
            <Section
                id="projetos"
                title="Projetos"
                subtitle="Trabalhos selecionados do universo iGaming"
                variant="light"
            >
                {/* Premium Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mb-14"
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedCategory(category)}
                            className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer overflow-hidden ${selectedCategory === category
                                ? "text-[#0A0A14]"
                                : "text-[#8A8A9A] hover:text-[#bcd200]"
                                }`}
                            style={{
                                background: selectedCategory === category
                                    ? "linear-gradient(135deg, #D4E65B 0%, #bcd200 50%, #9AB000 100%)"
                                    : "linear-gradient(135deg, rgba(14,14,26,0.8) 0%, rgba(6,6,16,0.9) 100%)",
                                border: selectedCategory === category
                                    ? "1px solid rgba(188,210,0,0.5)"
                                    : "1px solid rgba(188,210,0,0.1)",
                                boxShadow: selectedCategory === category
                                    ? "0 0 30px rgba(188,210,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                                    : "none",
                            }}
                        >
                            {/* Shimmer on active */}
                            {selectedCategory === category && (
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                                    }}
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            )}
                            <span className="relative z-10">{category}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Premium Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-30px" }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.08,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => handleProjectClick(project)}
                        >
                            <motion.div
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="relative overflow-hidden rounded-2xl h-full gpu-accelerate cursor-pointer group"
                                style={{
                                    background: "linear-gradient(135deg, rgba(14,14,26,0.95) 0%, rgba(6,6,16,0.98) 100%)",
                                    border: "1px solid rgba(188,210,0,0.1)",
                                }}
                            >
                                {/* Animated border */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        boxShadow: "inset 0 0 0 1px rgba(188,210,0,0.4), 0 0 40px rgba(188,210,0,0.15)",
                                    }}
                                />

                                {/* Top glow line */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-px"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, rgba(188,210,0,0.5), transparent)",
                                        opacity: hoveredId === project.id ? 1 : 0,
                                        transition: "opacity 0.3s",
                                    }}
                                />

                                {/* Image Area with overlay */}
                                <div className="aspect-[16/10] relative bg-[#050508] overflow-hidden">
                                    {/* Category badge */}
                                    <motion.div
                                        className="absolute top-4 left-4 z-10"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <span
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg"
                                            style={{
                                                background: "linear-gradient(135deg, rgba(188,210,0,0.15) 0%, rgba(10,10,20,0.9) 100%)",
                                                border: "1px solid rgba(188,210,0,0.25)",
                                                color: "#bcd200",
                                                boxShadow: "0 0 15px rgba(188,210,0,0.1)",
                                            }}
                                        >
                                            {project.category}
                                        </span>
                                    </motion.div>

                                    {/* Gallery indicator */}
                                    {project.images && project.images.length > 0 && (
                                        <motion.div
                                            className="absolute top-4 right-4 z-10"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <span
                                                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                                                style={{
                                                    background: "rgba(10,10,20,0.9)",
                                                    border: "1px solid rgba(188,210,0,0.25)",
                                                    color: "#bcd200",
                                                }}
                                            >
                                                <span>🖼</span>
                                                {project.images.length + 1}
                                            </span>
                                        </motion.div>
                                    )}

                                    {/* Placeholder with animated symbol */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            animate={hoveredId === project.id ? {
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 180, 360],
                                            } : { scale: 1, rotate: 0 }}
                                            transition={{ duration: 2, repeat: hoveredId === project.id ? Infinity : 0 }}
                                            className="text-5xl"
                                            style={{
                                                color: "#bcd200",
                                                opacity: 0.3,
                                                textShadow: "0 0 30px rgba(188,210,0,0.5)",
                                            }}
                                        >
                                            ◆
                                        </motion.div>
                                    </div>

                                    {/* Click hint on hover */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span
                                            className="px-4 py-2 rounded-lg text-sm font-semibold"
                                            style={{
                                                background: "rgba(188,210,0,0.9)",
                                                color: "#0A0A14",
                                            }}
                                        >
                                            Ver Galeria
                                        </span>
                                    </motion.div>

                                    {/* Hover overlay */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                        style={{
                                            background: "linear-gradient(180deg, transparent 0%, rgba(188,210,0,0.05) 50%, rgba(10,10,20,0.9) 100%)",
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3
                                        className="text-lg font-bold mb-2 transition-colors duration-300"
                                        style={{ color: hoveredId === project.id ? "#bcd200" : "#fff" }}
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="text-[#8A8A9A] text-sm mb-5 line-clamp-2 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tags with glow */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-300"
                                                style={{
                                                    background: hoveredId === project.id
                                                        ? "rgba(188,210,0,0.1)"
                                                        : "rgba(24,24,48,1)",
                                                    color: hoveredId === project.id ? "#bcd200" : "#8A8A9A",
                                                    border: hoveredId === project.id
                                                        ? "1px solid rgba(188,210,0,0.2)"
                                                        : "1px solid transparent",
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom accent line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5"
                                    style={{
                                        background: "linear-gradient(90deg, transparent, #bcd200, transparent)",
                                        scaleX: hoveredId === project.id ? 1 : 0,
                                        transition: "transform 0.3s",
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>

            {/* Project Modal */}
            <ProjectModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
            />
        </>
    );
}
