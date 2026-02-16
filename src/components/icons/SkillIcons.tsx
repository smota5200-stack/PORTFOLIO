"use client";

import {
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiAdobeaftereffects,
    SiAdobeindesign,
    SiAdobepremierepro,
    SiAdobexd,
    SiAdobelightroom,
    SiAdobeaudition,
    SiAdobecreativecloud,
    SiFigma,
    SiBlender,
    SiUnrealengine,
} from "react-icons/si";
import {
    PiMicrosoftWordLogoFill,
    PiMicrosoftExcelLogoFill,
    PiMicrosoftPowerpointLogoFill,
} from "react-icons/pi";
import { TbBrandFramerMotion } from "react-icons/tb";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoGameController } from "react-icons/io5";

// Icon option for the picker
export interface IconOption {
    id: string;
    label: string;
    icon: React.ReactNode;
    category: string;
}

// All available icons organized by category
export const iconOptions: IconOption[] = [
    // Adobe Suite
    { id: "photoshop", label: "Photoshop", icon: <SiAdobephotoshop className="text-[#31A8FF]" />, category: "Adobe" },
    { id: "illustrator", label: "Illustrator", icon: <SiAdobeillustrator className="text-[#FF9A00]" />, category: "Adobe" },
    { id: "indesign", label: "InDesign", icon: <SiAdobeindesign className="text-[#FF3366]" />, category: "Adobe" },
    { id: "after-effects", label: "After Effects", icon: <SiAdobeaftereffects className="text-[#9999FF]" />, category: "Adobe" },
    { id: "premiere", label: "Premiere Pro", icon: <SiAdobepremierepro className="text-[#9999FF]" />, category: "Adobe" },
    { id: "xd", label: "Adobe XD", icon: <SiAdobexd className="text-[#FF61F6]" />, category: "Adobe" },
    { id: "lightroom", label: "Lightroom", icon: <SiAdobelightroom className="text-[#31A8FF]" />, category: "Adobe" },
    { id: "audition", label: "Audition", icon: <SiAdobeaudition className="text-[#9999FF]" />, category: "Adobe" },
    { id: "creative-cloud", label: "Creative Cloud", icon: <SiAdobecreativecloud className="text-[#DA1F26]" />, category: "Adobe" },

    // Microsoft Office
    { id: "word", label: "Word", icon: <PiMicrosoftWordLogoFill className="text-[#2B579A]" />, category: "Office" },
    { id: "excel", label: "Excel", icon: <PiMicrosoftExcelLogoFill className="text-[#217346]" />, category: "Office" },
    { id: "powerpoint", label: "PowerPoint", icon: <PiMicrosoftPowerpointLogoFill className="text-[#D24726]" />, category: "Office" },

    // Design & 3D
    { id: "figma", label: "Figma", icon: <SiFigma className="text-[#A259FF]" />, category: "Design" },
    { id: "blender", label: "Blender", icon: <SiBlender className="text-[#F5792A]" />, category: "3D & Games" },
    { id: "unreal", label: "Unreal Engine", icon: <SiUnrealengine className="text-white" />, category: "3D & Games" },
    { id: "game-ui", label: "UI/UX Games", icon: <IoGameController className="text-[#00D4FF]" />, category: "3D & Games" },

    // Motion & Other
    { id: "framer", label: "Framer Motion", icon: <TbBrandFramerMotion className="text-[#FF0080]" />, category: "Motion" },
    { id: "key-visuals", label: "Key Visuals", icon: <HiOutlinePaintBrush className="text-[#bcd200]" />, category: "Design" },
    { id: "motion-graphics", label: "Motion Graphics", icon: <SiAdobeaftereffects className="text-[#FF61F6]" />, category: "Motion" },
];

// Legacy mapping for backward compatibility (LP rendering)
export const skillIcons: Record<string, React.ReactNode> = {};
iconOptions.forEach((opt) => {
    skillIcons[opt.label] = opt.icon;
    skillIcons[opt.id] = opt.icon;
});
// Additional aliases
skillIcons["INDESIGN"] = skillIcons["InDesign"];
skillIcons["Photoshop"] = iconOptions.find(o => o.id === "photoshop")!.icon;
skillIcons["After Effects"] = iconOptions.find(o => o.id === "after-effects")!.icon;
skillIcons["3D Design"] = iconOptions.find(o => o.id === "blender")!.icon;
skillIcons["Unreal"] = iconOptions.find(o => o.id === "unreal")!.icon;

export function getSkillIcon(skillName: string) {
    return skillIcons[skillName] || <span className="text-[#bcd200]">◆</span>;
}

export function getIconById(iconId: string): React.ReactNode | null {
    const option = iconOptions.find((opt) => opt.id === iconId);
    return option ? option.icon : null;
}
