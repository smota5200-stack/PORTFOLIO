"use client";

import { motion } from "framer-motion";
import { usePortfolioData } from "@/contexts/DataContext";

export function Footer() {
    const { data } = usePortfolioData();
    const currentYear = new Date().getFullYear();

    const footer = (data as typeof data & { footer?: { copyrightText?: string; taglineIcon?: string; tagline?: string } }).footer;
    const copyrightText = footer?.copyrightText || "Todos os direitos reservados.";
    const taglineIcon = footer?.taglineIcon || "♠";
    const tagline = footer?.tagline || "Feito com ♠ para iGaming";

    // Replace the icon placeholder in tagline with animated version
    const taglineParts = tagline.split(taglineIcon);

    return (
        <footer className="relative py-8 px-4 overflow-hidden section-dark">
            {/* Background pattern */}
            <div className="absolute inset-0 chinese-pattern opacity-30" />

            {/* Top glow line */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(188,210,0,0.3), transparent)",
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <p className="text-[#8A8A9A] text-sm">
                        © {currentYear} <span className="text-[#bcd200]">{data.personal.name}</span>. {copyrightText}
                    </p>
                    <motion.p
                        className="text-[#8A8A9A] text-sm flex items-center gap-2"
                        whileHover={{ color: "#bcd200" }}
                    >
                        {taglineParts.length > 1 ? (
                            <>
                                {taglineParts[0]}
                                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>{taglineIcon}</motion.span>
                                {taglineParts.slice(1).join(taglineIcon)}
                            </>
                        ) : (
                            tagline
                        )}
                    </motion.p>
                </motion.div>
            </div>
        </footer>
    );
}
