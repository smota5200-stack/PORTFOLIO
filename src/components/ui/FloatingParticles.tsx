"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    type: "coin" | "star" | "sparkle";
}

export function FloatingParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const newParticles: Particle[] = [];

        // Create 30 particles
        for (let i = 0; i < 30; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 2,
                duration: Math.random() * 4 + 4,
                delay: Math.random() * 2,
                type: ["coin", "star", "sparkle"][Math.floor(Math.random() * 3)] as Particle["type"],
            });
        }

        setParticles(newParticles);
    }, []);

    const getParticleStyle = (particle: Particle) => {
        switch (particle.type) {
            case "coin":
                return "bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]";
            case "star":
                return "bg-[#00F5FF] rounded-full shadow-[0_0_10px_rgba(0,245,255,0.5)]";
            case "sparkle":
                return "bg-white rounded-full";
            default:
                return "bg-[#FFD700] rounded-full";
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute ${getParticleStyle(particle)}`}
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
