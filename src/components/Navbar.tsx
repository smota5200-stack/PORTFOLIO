"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Sobre", href: "#sobre" },
    { name: "Skills", href: "#skills" },
    { name: "Experiência", href: "#experiencia" },
    { name: "Projetos", href: "#projetos" },
    { name: "Contato", href: "#contato" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const scrollTo = (href: string) => {
        const id = href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-5"
                    }`}
                style={{
                    background: isScrolled
                        ? "linear-gradient(180deg, rgba(3,3,5,0.95) 0%, rgba(7,7,16,0.9) 100%)"
                        : "transparent",
                    backdropFilter: isScrolled ? "blur(12px)" : "none",
                    WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
                    borderBottom: isScrolled ? "1px solid rgba(188,210,0,0.1)" : "none",
                    boxShadow: isScrolled ? "0 10px 40px rgba(0,0,0,0.3)" : "none",
                }}
            >
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo("#hero");
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3"
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background: "linear-gradient(135deg, #D4E65B 0%, #788D00 100%)",
                                boxShadow: "0 0 15px rgba(188,210,0,0.3)",
                            }}
                        >
                            <span className="text-[#030305] font-bold text-lg">F</span>
                        </div>
                        <span
                            className="text-xl font-black hidden sm:block"
                            style={{
                                background: "linear-gradient(135deg, #D4E65B, #bcd200)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            FM
                        </span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(link.href);
                                }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                                className="px-4 py-2 text-sm font-medium text-[#8A8A9A] hover:text-[#bcd200] transition-colors relative group"
                            >
                                {link.name}
                                <motion.span
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 transition-all duration-300"
                                    style={{
                                        background: "linear-gradient(90deg, #bcd200, #00D4FF)",
                                        boxShadow: "0 0 10px rgba(188,210,0,0.5)",
                                    }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href="#contato"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo("#contato");
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer"
                        style={{
                            background: "linear-gradient(180deg, #D4E65B 0%, #bcd200 30%, #9AB000 100%)",
                            color: "#030305",
                            boxShadow: "0 0 20px rgba(188,210,0,0.25)",
                        }}
                    >
                        Contato
                    </motion.a>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isMobileOpen}
                        aria-controls="mobile-navigation"
                        className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                    >
                        <motion.span
                            animate={{
                                rotate: isMobileOpen ? 45 : 0,
                                y: isMobileOpen ? 6 : 0,
                            }}
                            className="w-6 h-0.5 rounded-full"
                            style={{ background: "#bcd200" }}
                        />
                        <motion.span
                            animate={{ opacity: isMobileOpen ? 0 : 1 }}
                            className="w-6 h-0.5 rounded-full"
                            style={{ background: "#bcd200" }}
                        />
                        <motion.span
                            animate={{
                                rotate: isMobileOpen ? -45 : 0,
                                y: isMobileOpen ? -6 : 0,
                            }}
                            className="w-6 h-0.5 rounded-full"
                            style={{ background: "#bcd200" }}
                        />
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.nav
                id="mobile-navigation"
                aria-label="Menu de navegação mobile"
                initial={false}
                animate={{
                    opacity: isMobileOpen ? 1 : 0,
                    x: isMobileOpen ? 0 : "100%",
                }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 md:hidden"
                style={{
                    background: "linear-gradient(180deg, rgba(3,3,5,0.98) 0%, rgba(7,7,16,0.98) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                }}
            >
                <div className="flex flex-col items-center justify-center h-full gap-6">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollTo(link.href);
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: isMobileOpen ? 1 : 0,
                                y: isMobileOpen ? 0 : 20
                            }}
                            transition={{ delay: index * 0.1 }}
                            className="text-2xl font-semibold text-[#8A8A9A] hover:text-[#bcd200] transition-colors"
                        >
                            {link.name}
                        </motion.a>
                    ))}

                    {/* Mobile CTA */}
                    <motion.a
                        href="#contato"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo("#contato");
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: isMobileOpen ? 1 : 0,
                            scale: isMobileOpen ? 1 : 0.8,
                        }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 px-8 py-3 rounded-xl font-bold text-lg"
                        style={{
                            background: "linear-gradient(180deg, #D4E65B 0%, #bcd200 30%, #9AB000 100%)",
                            color: "#030305",
                            boxShadow: "0 0 30px rgba(188,210,0,0.3)",
                        }}
                    >
                        Entre em Contato
                    </motion.a>
                </div>
            </motion.nav>
        </>
    );
}
