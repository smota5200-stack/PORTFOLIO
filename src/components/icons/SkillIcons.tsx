"use client";

import {
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiAdobeaftereffects,
    SiFigma,
    SiBlender,
    SiUnrealengine,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoGameController } from "react-icons/io5";

export const skillIcons: Record<string, React.ReactNode> = {
    // Adobe Suite
    "Motion Graphics": <SiAdobeaftereffects className="text-[#FF61F6]" />,
    "After Effects": <SiAdobeaftereffects className="text-[#FF61F6]" />,
    "Photoshop": <SiAdobephotoshop className="text-[#31A8FF]" />,
    "Illustrator": <SiAdobeillustrator className="text-[#FF9A00]" />,

    // Design Tools
    "Figma": <SiFigma className="text-[#A259FF]" />,
    "Key Visuals": <HiOutlinePaintBrush className="text-[#bcd200]" />,

    // 3D & Games
    "3D Design": <SiBlender className="text-[#F5792A]" />,
    "Blender": <SiBlender className="text-[#F5792A]" />,
    "UI/UX Games": <IoGameController className="text-[#00D4FF]" />,
    "Unreal": <SiUnrealengine className="text-white" />,

    // Motion
    "Framer Motion": <TbBrandFramerMotion className="text-[#FF0080]" />,
};

export function getSkillIcon(skillName: string) {
    return skillIcons[skillName] || <span className="text-[#bcd200]">◆</span>;
}
