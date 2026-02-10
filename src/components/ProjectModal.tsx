"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        category: string;
        tags: string[];
        image: string;
        images?: string[];
    } | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    // Close on Escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, handleKeyDown]);

    if (!project) return null;

    // Only show gallery images, not the cover
    const allImages = (project.images || []).filter(Boolean);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
                    style={{ background: "rgba(3,3,5,0.95)" }}
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.1 }}
                        onClick={onClose}
                        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
                        style={{
                            background: "rgba(14,14,26,0.9)",
                            border: "1px solid rgba(188,210,0,0.3)",
                        }}
                        whileHover={{
                            scale: 1.1,
                            borderColor: "rgba(188,210,0,0.6)",
                            boxShadow: "0 0 20px rgba(188,210,0,0.2)",
                        }}
                        aria-label="Fechar modal"
                    >
                        <span className="text-white text-xl">✕</span>
                    </motion.button>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="w-full max-w-5xl mx-auto px-4 py-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="text-center mb-10">
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-4 py-1.5 text-sm font-semibold rounded-lg mb-4"
                                style={{
                                    background: "rgba(188,210,0,0.1)",
                                    color: "#bcd200",
                                    border: "1px solid rgba(188,210,0,0.2)",
                                }}
                            >
                                {project.category}
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="text-3xl md:text-4xl font-bold text-white mb-4"
                            >
                                {project.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-[#8A8A9A] max-w-2xl mx-auto"
                            >
                                {project.description}
                            </motion.p>

                            {/* Tags */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.35 }}
                                className="flex flex-wrap justify-center gap-2 mt-4"
                            >
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-medium rounded-md"
                                        style={{
                                            background: "rgba(24,24,48,1)",
                                            color: "#8A8A9A",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </motion.div>
                        </div>

                        {/* Image Grid - 3 Columns, Respects Original Dimensions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {allImages.map((img, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="relative rounded-xl overflow-hidden"
                                    style={{
                                        background: "rgba(6,6,16,0.8)",
                                        border: "1px solid rgba(188,210,0,0.1)",
                                    }}
                                >
                                    {img ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={img}
                                            alt={`${project.title} - Imagem ${index + 1}`}
                                            className="w-full h-auto"
                                            style={{ display: "block" }}
                                        />
                                    ) : (
                                        <div className="w-full aspect-video flex items-center justify-center">
                                            <span className="text-4xl text-[#bcd200] opacity-30">◆</span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Empty state */}
                        {allImages.length === 0 && (
                            <div
                                className="flex flex-col items-center justify-center py-20 rounded-xl"
                                style={{
                                    background: "rgba(6,6,16,0.5)",
                                    border: "1px solid rgba(188,210,0,0.1)",
                                }}
                            >
                                <span className="text-6xl text-[#bcd200] opacity-30 mb-4">◆</span>
                                <p className="text-[#8A8A9A]">Nenhuma imagem disponível</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
