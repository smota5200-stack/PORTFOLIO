"use client";

import {
    IoTrophy,
    IoCalendar,
    IoTime,
    IoBriefcase,
    IoStar,
    IoPeople,
    IoRocket,
    IoFlash,
    IoFlame,
    IoGlobe,
    IoDiamond,
    IoHeart,
    IoRibbon,
    IoBarChart,
    IoTrendingUp,
    IoGameController,
    IoDesktop,
    IoLaptop,
    IoPhonePortrait,
    IoCube,
    IoColorPalette,
    IoBrush,
    IoLayers,
    IoImages,
    IoFilm,
    IoMusicalNotes,
    IoVideocam,
    IoMegaphone,
    IoBulb,
    IoCodeSlash,
    IoConstruct,
    IoSettingsSharp,
    IoShield,
    IoThumbsUp,
    IoChatbubbles,
    IoEye,
    IoFlag,
    IoMap,
    IoCompass,
    IoFingerPrint,
    IoLeaf,
    IoPlanet,
    IoSparkles,
    IoStorefront,
    IoWallet,
    IoCart,
    IoGift,
    IoPricetag,
    IoBookmark,
    IoDocument,
    IoFolder,
    IoCloudDone,
    IoCheckmarkCircle,
    IoSchool,
    IoFitness,
    IoExtensionPuzzle,
    IoColorWand,
    IoAnalytics,
    IoPodium,
    IoCamera,
} from "react-icons/io5";

export interface StatIconOption {
    id: string;
    label: string;
    icon: React.ReactNode;
    category: string;
}

export const statIconOptions: StatIconOption[] = [
    // Conquistas & Resultados
    { id: "trophy", label: "Troféu", icon: <IoTrophy className="text-[#bcd200]" />, category: "Conquistas" },
    { id: "star", label: "Estrela", icon: <IoStar className="text-[#bcd200]" />, category: "Conquistas" },
    { id: "ribbon", label: "Medalha", icon: <IoRibbon className="text-white" />, category: "Conquistas" },
    { id: "diamond", label: "Diamante", icon: <IoDiamond className="text-[#bcd200]" />, category: "Conquistas" },
    { id: "podium", label: "Pódio", icon: <IoPodium className="text-white" />, category: "Conquistas" },
    { id: "flag", label: "Bandeira", icon: <IoFlag className="text-[#bcd200]" />, category: "Conquistas" },
    { id: "checkmark", label: "Concluído", icon: <IoCheckmarkCircle className="text-[#bcd200]" />, category: "Conquistas" },
    { id: "thumbs-up", label: "Aprovado", icon: <IoThumbsUp className="text-white" />, category: "Conquistas" },

    // Tempo & Experiência
    { id: "calendar", label: "Calendário", icon: <IoCalendar className="text-[#bcd200]" />, category: "Tempo" },
    { id: "time", label: "Relógio", icon: <IoTime className="text-white" />, category: "Tempo" },
    { id: "briefcase", label: "Trabalho", icon: <IoBriefcase className="text-[#bcd200]" />, category: "Tempo" },
    { id: "school", label: "Educação", icon: <IoSchool className="text-white" />, category: "Tempo" },

    // Métricas & Dados
    { id: "bar-chart", label: "Gráfico", icon: <IoBarChart className="text-[#bcd200]" />, category: "Métricas" },
    { id: "trending", label: "Crescimento", icon: <IoTrendingUp className="text-white" />, category: "Métricas" },
    { id: "analytics", label: "Analytics", icon: <IoAnalytics className="text-[#bcd200]" />, category: "Métricas" },
    { id: "eye", label: "Visualizações", icon: <IoEye className="text-white" />, category: "Métricas" },

    // Pessoas & Comunicação
    { id: "people", label: "Pessoas", icon: <IoPeople className="text-[#bcd200]" />, category: "Pessoas" },
    { id: "heart", label: "Coração", icon: <IoHeart className="text-white" />, category: "Pessoas" },
    { id: "chatbubbles", label: "Chat", icon: <IoChatbubbles className="text-[#bcd200]" />, category: "Pessoas" },
    { id: "megaphone", label: "Marketing", icon: <IoMegaphone className="text-white" />, category: "Pessoas" },

    // Tecnologia & Design
    { id: "rocket", label: "Foguete", icon: <IoRocket className="text-[#bcd200]" />, category: "Tech" },
    { id: "flash", label: "Raio", icon: <IoFlash className="text-[#bcd200]" />, category: "Tech" },
    { id: "code", label: "Código", icon: <IoCodeSlash className="text-white" />, category: "Tech" },
    { id: "desktop", label: "Desktop", icon: <IoDesktop className="text-[#bcd200]" />, category: "Tech" },
    { id: "laptop", label: "Laptop", icon: <IoLaptop className="text-white" />, category: "Tech" },
    { id: "phone", label: "Mobile", icon: <IoPhonePortrait className="text-[#bcd200]" />, category: "Tech" },
    { id: "construct", label: "Construção", icon: <IoConstruct className="text-white" />, category: "Tech" },
    { id: "settings", label: "Config", icon: <IoSettingsSharp className="text-[#bcd200]" />, category: "Tech" },
    { id: "cloud", label: "Nuvem", icon: <IoCloudDone className="text-white" />, category: "Tech" },
    { id: "extension", label: "Plugin", icon: <IoExtensionPuzzle className="text-[#bcd200]" />, category: "Tech" },
    { id: "shield", label: "Segurança", icon: <IoShield className="text-white" />, category: "Tech" },
    { id: "fingerprint", label: "ID", icon: <IoFingerPrint className="text-[#bcd200]" />, category: "Tech" },

    // Design & Criativo
    { id: "palette", label: "Paleta", icon: <IoColorPalette className="text-[#bcd200]" />, category: "Criativo" },
    { id: "brush", label: "Pincel", icon: <IoBrush className="text-white" />, category: "Criativo" },
    { id: "color-wand", label: "Varinha", icon: <IoColorWand className="text-[#bcd200]" />, category: "Criativo" },
    { id: "layers", label: "Camadas", icon: <IoLayers className="text-white" />, category: "Criativo" },
    { id: "images", label: "Imagens", icon: <IoImages className="text-[#bcd200]" />, category: "Criativo" },
    { id: "camera", label: "Câmera", icon: <IoCamera className="text-white" />, category: "Criativo" },
    { id: "cube", label: "3D", icon: <IoCube className="text-[#bcd200]" />, category: "Criativo" },

    // Mídia
    { id: "film", label: "Filme", icon: <IoFilm className="text-white" />, category: "Mídia" },
    { id: "videocam", label: "Vídeo", icon: <IoVideocam className="text-[#bcd200]" />, category: "Mídia" },
    { id: "music", label: "Música", icon: <IoMusicalNotes className="text-white" />, category: "Mídia" },
    { id: "game", label: "Games", icon: <IoGameController className="text-[#bcd200]" />, category: "Mídia" },

    // Negócios
    { id: "globe", label: "Global", icon: <IoGlobe className="text-white" />, category: "Negócios" },
    { id: "storefront", label: "Loja", icon: <IoStorefront className="text-[#bcd200]" />, category: "Negócios" },
    { id: "wallet", label: "Carteira", icon: <IoWallet className="text-white" />, category: "Negócios" },
    { id: "cart", label: "Carrinho", icon: <IoCart className="text-[#bcd200]" />, category: "Negócios" },
    { id: "gift", label: "Presente", icon: <IoGift className="text-white" />, category: "Negócios" },
    { id: "pricetag", label: "Preço", icon: <IoPricetag className="text-[#bcd200]" />, category: "Negócios" },
    { id: "document", label: "Documento", icon: <IoDocument className="text-white" />, category: "Negócios" },
    { id: "folder", label: "Pasta", icon: <IoFolder className="text-[#bcd200]" />, category: "Negócios" },
    { id: "bookmark", label: "Favorito", icon: <IoBookmark className="text-white" />, category: "Negócios" },

    // Natureza & Outros
    { id: "flame", label: "Fogo", icon: <IoFlame className="text-[#bcd200]" />, category: "Outros" },
    { id: "bulb", label: "Ideia", icon: <IoBulb className="text-[#bcd200]" />, category: "Outros" },
    { id: "sparkles", label: "Brilho", icon: <IoSparkles className="text-white" />, category: "Outros" },
    { id: "leaf", label: "Folha", icon: <IoLeaf className="text-[#bcd200]" />, category: "Outros" },
    { id: "planet", label: "Planeta", icon: <IoPlanet className="text-white" />, category: "Outros" },
    { id: "compass", label: "Bússola", icon: <IoCompass className="text-[#bcd200]" />, category: "Outros" },
    { id: "map", label: "Mapa", icon: <IoMap className="text-white" />, category: "Outros" },
    { id: "fitness", label: "Fitness", icon: <IoFitness className="text-[#bcd200]" />, category: "Outros" },
];

// Lookup by ID
export function getStatIconById(iconId: string): React.ReactNode | null {
    const option = statIconOptions.find((opt) => opt.id === iconId);
    return option ? option.icon : null;
}
