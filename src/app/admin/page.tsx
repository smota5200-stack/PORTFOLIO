"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD_HASH = "!QAZxsw2"; // Simple password check

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate a small delay for UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (password === ADMIN_PASSWORD_HASH) {
            sessionStorage.setItem("admin_authenticated", "true");
            router.push("/admin/dashboard");
        } else {
            setError("Senha incorreta");
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                background: "linear-gradient(180deg, #030305 0%, #070710 50%, #030305 100%)",
            }}
        >
            {/* Background pattern */}
            <div className="fixed inset-0 chinese-pattern opacity-20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Login Card */}
                <div
                    className="relative p-8 rounded-2xl overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, rgba(14,14,26,0.98) 0%, rgba(6,6,16,0.99) 100%)",
                        border: "1px solid rgba(188,210,0,0.15)",
                    }}
                >
                    {/* Top glow line */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(188,210,0,0.5), transparent)",
                        }}
                    />

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <motion.div
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                            style={{
                                background: "linear-gradient(135deg, #D4E65B 0%, #bcd200 50%, #788D00 100%)",
                                boxShadow: "0 0 30px rgba(188,210,0,0.3)",
                            }}
                            animate={{
                                boxShadow: [
                                    "0 0 30px rgba(188,210,0,0.3)",
                                    "0 0 50px rgba(188,210,0,0.5)",
                                    "0 0 30px rgba(188,210,0,0.3)",
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-[#0A0A14] font-black text-2xl">F</span>
                        </motion.div>
                        <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
                        <p className="text-[#8A8A9A] text-sm">Digite a senha para acessar</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-[#8A8A9A] text-sm mb-2 block font-medium">
                                Senha
                            </label>
                            <motion.input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                aria-required="true"
                                autoFocus
                                className="w-full px-5 py-4 rounded-xl text-white placeholder-[#52525B] outline-none transition-all"
                                style={{
                                    background: "rgba(6,6,16,0.8)",
                                    border: error
                                        ? "1px solid rgba(255,0,80,0.5)"
                                        : "1px solid rgba(188,210,0,0.15)",
                                }}
                                whileFocus={{
                                    borderColor: "rgba(188,210,0,0.4)",
                                    boxShadow: "0 0 20px rgba(188,210,0,0.1)",
                                }}
                            />
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm mt-2"
                                    style={{ color: "#FF0080" }}
                                >
                                    {error}
                                </motion.p>
                            )}
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 rounded-xl font-bold text-base cursor-pointer transition-all relative overflow-hidden"
                            style={{
                                background: "linear-gradient(180deg, #D4E65B 0%, #bcd200 30%, #9AB000 100%)",
                                color: "#0A0A14",
                                boxShadow: "0 0 25px rgba(188,210,0,0.25)",
                            }}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        ◆
                                    </motion.span>
                                    Verificando...
                                </span>
                            ) : (
                                "Entrar"
                            )}
                        </motion.button>
                    </form>

                    {/* Back to site link */}
                    <div className="text-center mt-6">
                        <a
                            href="/"
                            className="text-[#8A8A9A] text-sm hover:text-[#bcd200] transition-colors"
                        >
                            ← Voltar para o site
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
