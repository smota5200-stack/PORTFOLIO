"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "./ui/Section";
import { portfolioData } from "@/lib/data";
import { getSocialIcon } from "./icons/SocialIcons";

export function Contact() {
    const { personal, social } = portfolioData;
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <Section
            id="contato"
            title="Contato"
            subtitle="Vamos criar algo incrível juntos"
            variant="dark"
        >
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info - Enhanced */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    className="space-y-8"
                >
                    {/* Info Cards */}
                    <div className="space-y-4">
                        {/* Email */}
                        <motion.div
                            className="flex items-center gap-4 p-5 rounded-2xl group cursor-pointer"
                            style={{
                                background: "linear-gradient(135deg, rgba(14,14,26,0.9) 0%, rgba(6,6,16,0.95) 100%)",
                                border: "1px solid rgba(188,210,0,0.1)",
                            }}
                            whileHover={{
                                y: -4,
                                borderColor: "rgba(188,210,0,0.3)",
                                boxShadow: "0 0 30px rgba(188,210,0,0.1)",
                            }}
                        >
                            <motion.div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                                style={{
                                    background: "linear-gradient(135deg, rgba(188,210,0,0.15) 0%, rgba(120,141,0,0.05) 100%)",
                                    border: "1px solid rgba(188,210,0,0.2)",
                                    color: "#bcd200",
                                }}
                                whileHover={{ boxShadow: "0 0 20px rgba(188,210,0,0.3)" }}
                            >
                                ✉
                            </motion.div>
                            <div>
                                <span className="text-[#8A8A9A] text-sm block mb-0.5">Email</span>
                                <span className="text-white font-semibold group-hover:text-[#bcd200] transition-colors">
                                    {personal.email}
                                </span>
                            </div>
                        </motion.div>

                        {/* Location */}
                        <motion.div
                            className="flex items-center gap-4 p-5 rounded-2xl group cursor-pointer"
                            style={{
                                background: "linear-gradient(135deg, rgba(14,14,26,0.9) 0%, rgba(6,6,16,0.95) 100%)",
                                border: "1px solid rgba(188,210,0,0.1)",
                            }}
                            whileHover={{
                                y: -4,
                                borderColor: "rgba(188,210,0,0.3)",
                                boxShadow: "0 0 30px rgba(188,210,0,0.1)",
                            }}
                        >
                            <motion.div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                                style={{
                                    background: "linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(0,100,130,0.05) 100%)",
                                    border: "1px solid rgba(0,212,255,0.2)",
                                    color: "#00D4FF",
                                }}
                                whileHover={{ boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
                            >
                                ◎
                            </motion.div>
                            <div>
                                <span className="text-[#8A8A9A] text-sm block mb-0.5">Localização</span>
                                <span className="text-white font-semibold group-hover:text-[#00D4FF] transition-colors">
                                    {personal.location}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Social Links - Enhanced */}
                    <div>
                        <p className="text-[#8A8A9A] text-sm mb-4 font-medium">Redes Sociais</p>
                        <div className="flex gap-3">
                            {social.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        y: -5,
                                        scale: 1.1,
                                        boxShadow: "0 0 25px rgba(188,210,0,0.25)",
                                    }}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg cursor-pointer"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(14,14,26,0.9) 0%, rgba(6,6,16,0.95) 100%)",
                                        border: "1px solid rgba(188,210,0,0.15)",
                                        color: "#8A8A9A",
                                    }}
                                >
                                    <span className="text-xl transition-colors duration-200 group-hover:text-[#bcd200]">
                                        {getSocialIcon(item.name)}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Decorative element */}
                    <motion.div
                        className="relative p-6 rounded-2xl overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, rgba(188,210,0,0.05) 0%, rgba(6,6,16,0.9) 100%)",
                            border: "1px solid rgba(188,210,0,0.1)",
                        }}
                    >
                        <div className="flex items-center gap-4">
                            <motion.span
                                className="text-4xl"
                                animate={{ rotate: [0, 10, 0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                🎰
                            </motion.span>
                            <div>
                                <p className="text-white font-semibold">Pronto para o próximo jackpot?</p>
                                <p className="text-[#8A8A9A] text-sm">Vamos criar algo épico juntos</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Contact Form - Enhanced */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <motion.div
                            className="relative p-8 rounded-2xl overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, rgba(14,14,26,0.98) 0%, rgba(6,6,16,0.99) 100%)",
                                border: "1px solid rgba(188,210,0,0.1)",
                            }}
                        >
                            {/* Top glow */}
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(188,210,0,0.4), transparent)",
                                }}
                            />

                            <div className="space-y-5">
                                {/* Name Field */}
                                <div className="relative">
                                    <label className="text-[#8A8A9A] text-sm mb-2 block font-medium">Nome</label>
                                    <motion.input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        onFocus={() => setFocusedField("name")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Seu nome"
                                        required
                                        aria-required="true"
                                        className="w-full px-5 py-4 rounded-xl text-white placeholder-[#52525B] outline-none transition-all"
                                        style={{
                                            background: "rgba(6,6,16,0.8)",
                                            border: focusedField === "name"
                                                ? "1px solid rgba(188,210,0,0.4)"
                                                : "1px solid rgba(188,210,0,0.1)",
                                            boxShadow: focusedField === "name"
                                                ? "0 0 20px rgba(188,210,0,0.1)"
                                                : "none",
                                        }}
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <label className="text-[#8A8A9A] text-sm mb-2 block font-medium">Email</label>
                                    <motion.input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        onFocus={() => setFocusedField("email")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="seu@email.com"
                                        required
                                        aria-required="true"
                                        className="w-full px-5 py-4 rounded-xl text-white placeholder-[#52525B] outline-none transition-all"
                                        style={{
                                            background: "rgba(6,6,16,0.8)",
                                            border: focusedField === "email"
                                                ? "1px solid rgba(188,210,0,0.4)"
                                                : "1px solid rgba(188,210,0,0.1)",
                                            boxShadow: focusedField === "email"
                                                ? "0 0 20px rgba(188,210,0,0.1)"
                                                : "none",
                                        }}
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="relative">
                                    <label className="text-[#8A8A9A] text-sm mb-2 block font-medium">Mensagem</label>
                                    <motion.textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        onFocus={() => setFocusedField("message")}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Descreva seu projeto..."
                                        required
                                        aria-required="true"
                                        rows={4}
                                        className="w-full px-5 py-4 rounded-xl text-white placeholder-[#52525B] outline-none resize-none transition-all"
                                        style={{
                                            background: "rgba(6,6,16,0.8)",
                                            border: focusedField === "message"
                                                ? "1px solid rgba(188,210,0,0.4)"
                                                : "1px solid rgba(188,210,0,0.1)",
                                            boxShadow: focusedField === "message"
                                                ? "0 0 20px rgba(188,210,0,0.1)"
                                                : "none",
                                        }}
                                    />
                                </div>

                                {/* Submit Button - Enhanced */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 0 40px rgba(188,210,0,0.3)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-4 rounded-xl font-bold text-base cursor-pointer transition-all relative overflow-hidden ${isSubmitted ? "bg-green-600 text-white" : "btn-fortune"
                                        }`}
                                >
                                    {/* Shimmer effect */}
                                    {!isSubmitted && (
                                        <motion.div
                                            className="absolute inset-0"
                                            style={{
                                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                                            }}
                                            animate={{ x: ["-100%", "200%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isSubmitting ? (
                                            <>
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    ◆
                                                </motion.span>
                                                Enviando...
                                            </>
                                        ) : isSubmitted ? (
                                            <>✓ Mensagem Enviada!</>
                                        ) : (
                                            <>Enviar Mensagem →</>
                                        )}
                                    </span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </Section>
    );
}
