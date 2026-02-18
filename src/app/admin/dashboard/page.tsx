"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { portfolioData as defaultData } from "@/lib/data";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { CoverImageUploader } from "@/components/admin/CoverImageUploader";
import { ImageCropper } from "@/components/admin/ImageCropper";
import { iconOptions, getSkillIcon, IconOption } from "@/components/icons/SkillIcons";
import { statIconOptions, getStatIconById, StatIconOption } from "@/components/icons/StatIcons";

type TabType = "personal" | "stats" | "skills" | "expertise" | "experiences" | "projects" | "social" | "footer";

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("personal");
    const [data, setData] = useState(defaultData);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [saveMessage, setSaveMessage] = useState("");

    // Check authentication
    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem("admin_authenticated");
        if (!isAuthenticated) {
            router.push("/admin");
        }
    }, [router]);

    // Load data from Firebase API
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/data?t=${Date.now()}`, { cache: "no-store" });
                if (response.ok) {
                    const result = await response.json();
                    // Merge with defaults - use Firebase data if exists, otherwise use defaults
                    setData({
                        ...defaultData,
                        ...result,
                        // Ensure arrays use Firebase data if not empty, otherwise fallback to defaults
                        stats: result.stats?.length > 0 ? result.stats : defaultData.stats,
                        skills: result.skills?.length > 0 ? result.skills : defaultData.skills,
                        expertiseAreas: result.expertiseAreas?.length > 0 ? result.expertiseAreas : defaultData.expertiseAreas,
                        experiences: result.experiences?.length > 0 ? result.experiences : defaultData.experiences,
                        projects: result.projects?.length > 0 ? result.projects : defaultData.projects,
                        social: result.social?.length > 0 ? result.social : defaultData.social,
                    });
                }
            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMessage("Salvando no Firebase...");

        try {
            const response = await fetch("/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSaveMessage("✅ Dados salvos no Firebase!");
            } else {
                setSaveMessage("❌ Erro ao salvar dados");
            }
        } catch (error) {
            console.error("Error saving:", error);
            setSaveMessage("❌ Erro de conexão");
        } finally {
            setIsSaving(false);
            setTimeout(() => setSaveMessage(""), 3000);
        }
    };

    const handleReset = async () => {
        if (confirm("Tem certeza que deseja resetar todos os dados para o padrão?")) {
            setData(defaultData);
            // Also save the default data to Firebase
            await fetch("/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(defaultData),
            });
            setSaveMessage("Dados resetados para o padrão!");
            setTimeout(() => setSaveMessage(""), 3000);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin_authenticated");
        router.push("/admin");
    };

    const tabs: { id: TabType; label: string; icon: string }[] = [
        { id: "personal", label: "Pessoal", icon: "👤" },
        { id: "stats", label: "Estatísticas", icon: "📊" },
        { id: "skills", label: "Skills", icon: "⚡" },
        { id: "expertise", label: "Expertise", icon: "🔸" },
        { id: "experiences", label: "Experiência", icon: "💼" },
        { id: "projects", label: "Projetos", icon: "🎨" },
        { id: "social", label: "Social", icon: "🔗" },
        { id: "footer", label: "Rodapé", icon: "📄" },
    ];

    return (
        <div
            className="min-h-screen"
            style={{
                background: "linear-gradient(180deg, #030305 0%, #070710 50%, #030305 100%)",
            }}
        >
            {/* Header */}
            <header
                className="sticky top-0 z-50 px-6 py-4"
                style={{
                    background: "linear-gradient(180deg, rgba(3,3,5,0.98) 0%, rgba(7,7,16,0.95) 100%)",
                    borderBottom: "1px solid rgba(188,210,0,0.1)",
                }}
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background: "linear-gradient(135deg, #D4E65B 0%, #788D00 100%)",
                            }}
                        >
                            <span className="text-[#030305] font-bold text-lg">F</span>
                        </div>
                        <div>
                            <h1 className="text-white font-bold">Admin Panel</h1>
                            <p className="text-[#8A8A9A] text-xs">Gerenciamento de conteúdo</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {saveMessage && (
                            <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-sm font-medium"
                                style={{ color: "#bcd200" }}
                            >
                                {saveMessage}
                            </motion.span>
                        )}
                        <a
                            href="/"
                            target="_blank"
                            className="px-4 py-2 rounded-lg text-sm font-medium text-[#8A8A9A] hover:text-white transition-colors"
                            style={{ border: "1px solid rgba(188,210,0,0.2)" }}
                        >
                            Ver Site ↗
                        </a>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-[#8A8A9A] hover:text-[#FF0080] transition-colors cursor-pointer"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                            style={{
                                background:
                                    activeTab === tab.id
                                        ? "linear-gradient(135deg, #D4E65B 0%, #bcd200 50%, #9AB000 100%)"
                                        : "rgba(14,14,26,0.8)",
                                color: activeTab === tab.id ? "#0A0A14" : "#8A8A9A",
                                border:
                                    activeTab === tab.id
                                        ? "1px solid rgba(188,210,0,0.5)"
                                        : "1px solid rgba(188,210,0,0.1)",
                            }}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </motion.button>
                    ))}
                </div>

                {/* Tab Content */}
                <div
                    className="p-8 rounded-2xl"
                    style={{
                        background: "linear-gradient(135deg, rgba(14,14,26,0.98) 0%, rgba(6,6,16,0.99) 100%)",
                        border: "1px solid rgba(188,210,0,0.1)",
                    }}
                >
                    {activeTab === "personal" && (
                        <PersonalTab data={data} setData={setData} />
                    )}
                    {activeTab === "stats" && (
                        <StatsTab data={data} setData={setData} />
                    )}
                    {activeTab === "skills" && (
                        <SkillsTab data={data} setData={setData} />
                    )}
                    {activeTab === "expertise" && (
                        <ExpertiseTab data={data} setData={setData} />
                    )}
                    {activeTab === "experiences" && (
                        <ExperiencesTab data={data} setData={setData} />
                    )}
                    {activeTab === "projects" && (
                        <ProjectsTab data={data} setData={setData} />
                    )}
                    {activeTab === "social" && (
                        <SocialTab data={data} setData={setData} />
                    )}
                    {activeTab === "footer" && (
                        <FooterTab data={data} setData={setData} />
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <motion.button
                        onClick={handleReset}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-xl font-semibold text-sm cursor-pointer"
                        style={{
                            background: "rgba(255,0,80,0.1)",
                            color: "#FF0080",
                            border: "1px solid rgba(255,0,80,0.3)",
                        }}
                    >
                        Resetar Dados
                    </motion.button>
                    <motion.button
                        onClick={handleSave}
                        disabled={isSaving}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3 rounded-xl font-bold text-sm cursor-pointer"
                        style={{
                            background: "linear-gradient(135deg, #D4E65B 0%, #bcd200 50%, #9AB000 100%)",
                            color: "#0A0A14",
                            boxShadow: "0 0 20px rgba(188,210,0,0.25)",
                        }}
                    >
                        {isSaving ? "Salvando..." : "Salvar Alterações"}
                    </motion.button>
                </div>
            </main>
        </div>
    );
}

// ===== TAB COMPONENTS =====

interface TabProps {
    data: typeof defaultData;
    setData: React.Dispatch<React.SetStateAction<typeof defaultData>>;
}

function PersonalTab({ data, setData }: TabProps) {
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [showCropper, setShowCropper] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [photoError, setPhotoError] = useState<string | null>(null);

    const handleChange = (field: string, value: string) => {
        setData((prev) => ({
            ...prev,
            personal: { ...prev.personal, [field]: value },
        }));
    };

    const currentPhoto = (data.personal as typeof data.personal & { photo?: string }).photo || "";

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setPhotoError("Por favor, selecione uma imagem");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setPhotoError("Imagem muito grande. Máximo 10MB");
            return;
        }

        setPhotoError(null);
        const localUrl = URL.createObjectURL(file);
        setTempImage(localUrl);
        setShowCropper(true);

        if (inputRef.current) inputRef.current.value = "";
    };

    const handleCropComplete = (croppedUrl: string) => {
        handleChange("photo", croppedUrl);
        setShowCropper(false);
        if (tempImage) {
            URL.revokeObjectURL(tempImage);
            setTempImage(null);
        }
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        if (tempImage) {
            URL.revokeObjectURL(tempImage);
            setTempImage(null);
        }
    };

    return (
        <>
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">Informações Pessoais</h2>

                {/* Photo Upload with Crop */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm text-[#8A8A9A]">Foto de Perfil</label>
                        <span className="text-xs text-[#bcd200]/60">Recomendado: 400x400px</span>
                    </div>

                    <div
                        onClick={() => inputRef.current?.click()}
                        className="relative border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[#bcd200]/50 group overflow-hidden"
                        style={{
                            borderColor: photoError ? "rgba(239,68,68,0.5)" : "rgba(188,210,0,0.2)",
                            background: "rgba(6,6,16,0.5)",
                            maxWidth: "240px",
                        }}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        {currentPhoto ? (
                            <div className="relative" style={{ aspectRatio: "4/5" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={currentPhoto}
                                    alt="Foto de perfil"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="px-3 py-1.5 bg-[#bcd200] text-[#0A0A14] rounded-lg text-sm font-medium">
                                        ✂️ Alterar e Recortar
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 text-center" style={{ aspectRatio: "4/5" }}>
                                <span className="text-4xl mb-3">📷</span>
                                <span className="text-sm text-[#8A8A9A]">
                                    Clique para adicionar foto
                                </span>
                                <span className="text-xs text-[#8A8A9A]/60 mt-1">
                                    Você poderá recortar e ajustar
                                </span>
                            </div>
                        )}
                    </div>

                    {photoError && (
                        <p className="text-red-400 text-xs">{photoError}</p>
                    )}
                </div>

                <InputField
                    label="Nome"
                    value={data.personal.name}
                    onChange={(v) => handleChange("name", v)}
                />
                <InputField
                    label="Título"
                    value={data.personal.title}
                    onChange={(v) => handleChange("title", v)}
                />
                <InputField
                    label="Subtítulo"
                    value={data.personal.subtitle}
                    onChange={(v) => handleChange("subtitle", v)}
                />
                <InputField
                    label="Email"
                    type="email"
                    value={data.personal.email}
                    onChange={(v) => handleChange("email", v)}
                />
                <InputField
                    label="Localização"
                    value={data.personal.location}
                    onChange={(v) => handleChange("location", v)}
                />
                <InputField
                    label="WhatsApp (ex: 5511999999999)"
                    value={(data.personal as typeof data.personal & { whatsapp?: string }).whatsapp || ""}
                    onChange={(v) => handleChange("whatsapp", v)}
                />
                <TextareaField
                    label="Bio"
                    value={data.personal.bio}
                    onChange={(v) => handleChange("bio", v)}
                    rows={6}
                />
            </div>

            {/* Cropper Modal - 1:1 for profile photo */}
            {showCropper && tempImage && (
                <ImageCropper
                    image={tempImage}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                    aspectRatio={4 / 5}
                />
            )}
        </>
    );
}

function StatsTab({ data, setData }: TabProps) {
    const [openPickerIndex, setOpenPickerIndex] = useState<number | null>(null);

    const handleStatChange = (index: number, field: string, value: string) => {
        setData((prev) => {
            const newStats = [...(prev.stats || [])];
            newStats[index] = { ...newStats[index], [field]: value };
            return { ...prev, stats: newStats };
        });
    };

    const addStat = () => {
        const newId = Math.max(...(data.stats || []).map((s) => s.id), 0) + 1;
        setData((prev) => ({
            ...prev,
            stats: [...(prev.stats || []), { id: newId, label: "Nova Estatística", value: "0", icon: "trophy" }],
        }));
    };

    const removeStat = (index: number) => {
        setData((prev) => ({
            ...prev,
            stats: (prev.stats || []).filter((_, i) => i !== index),
        }));
    };

    const handleSelectIcon = (index: number, iconId: string) => {
        handleStatChange(index, "icon", iconId);
        setOpenPickerIndex(null);
    };

    // Group icons by category
    const categories = statIconOptions.reduce<Record<string, StatIconOption[]>>((acc, opt) => {
        if (!acc[opt.category]) acc[opt.category] = [];
        acc[opt.category].push(opt);
        return acc;
    }, {});

    const getIconForStat = (iconValue: string) => {
        const byId = getStatIconById(iconValue);
        if (byId) return byId;
        return <span className="text-[#bcd200]">{iconValue}</span>;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Estatísticas</h2>
                <motion.button
                    onClick={addStat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                    style={{
                        background: "rgba(188,210,0,0.1)",
                        color: "#bcd200",
                        border: "1px solid rgba(188,210,0,0.3)",
                    }}
                >
                    + Adicionar Estatística
                </motion.button>
            </div>

            <p className="text-[#8A8A9A] text-sm mb-4">
                Configure as estatísticas que aparecem na seção &quot;Sobre&quot; (ex: Anos de Experiência, Projetos Entregues).
            </p>

            <div className="space-y-4">
                {(data.stats || []).map((stat, index) => (
                    <div
                        key={stat.id || index}
                        className="flex items-center gap-4 p-4 rounded-xl"
                        style={{
                            background: "rgba(6,6,16,0.5)",
                            border: "1px solid rgba(188,210,0,0.1)",
                        }}
                    >
                        {/* Icon Picker */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setOpenPickerIndex(openPickerIndex === index ? null : index)}
                                className="w-12 h-12 flex items-center justify-center text-2xl rounded-lg cursor-pointer transition-all hover:scale-110"
                                style={{
                                    background: "rgba(188,210,0,0.08)",
                                    border: openPickerIndex === index ? "1px solid rgba(188,210,0,0.5)" : "1px solid rgba(188,210,0,0.15)",
                                }}
                                title="Selecionar ícone"
                            >
                                {getIconForStat(stat.icon)}
                            </button>

                            {/* Dropdown Picker */}
                            {openPickerIndex === index && (
                                <div
                                    className="absolute top-14 left-0 z-50 w-[340px] max-h-[400px] overflow-y-auto rounded-xl p-3 space-y-3"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(14,14,26,0.99) 0%, rgba(6,6,16,1) 100%)",
                                        border: "1px solid rgba(188,210,0,0.25)",
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                                    }}
                                >
                                    {Object.entries(categories).map(([category, icons]) => (
                                        <div key={category}>
                                            <p className="text-[#8A8A9A] text-xs font-semibold uppercase tracking-wider mb-2 px-1">{category}</p>
                                            <div className="grid grid-cols-5 gap-1.5">
                                                {icons.map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => handleSelectIcon(index, opt.id)}
                                                        className="flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all hover:scale-105"
                                                        style={{
                                                            background: stat.icon === opt.id ? "rgba(188,210,0,0.15)" : "rgba(255,255,255,0.03)",
                                                            border: stat.icon === opt.id ? "1px solid rgba(188,210,0,0.4)" : "1px solid transparent",
                                                        }}
                                                        title={opt.label}
                                                    >
                                                        <span className="text-lg">{opt.icon}</span>
                                                        <span className="text-[8px] text-[#8A8A9A] truncate w-full text-center leading-tight">{opt.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => handleStatChange(index, "value", e.target.value)}
                            className="w-24 px-3 py-2 rounded-lg text-[#bcd200] text-center font-bold bg-transparent outline-none"
                            style={{ border: "1px solid rgba(188,210,0,0.15)" }}
                            placeholder="100+"
                        />
                        <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatChange(index, "label", e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg text-white bg-transparent outline-none"
                            style={{ border: "1px solid rgba(188,210,0,0.15)" }}
                            placeholder="Nome da estatística"
                        />
                        <button
                            onClick={() => removeStat(index)}
                            className="p-2 text-[#FF0080] hover:bg-[#FF0080]/10 rounded-lg transition-colors cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SkillsTab({ data, setData }: TabProps) {
    const [openPickerIndex, setOpenPickerIndex] = useState<number | null>(null);

    const handleSkillChange = (index: number, field: string, value: string | number | boolean) => {
        setData((prev) => {
            const newSkills = [...prev.skills];
            newSkills[index] = { ...newSkills[index], [field]: value };
            return { ...prev, skills: newSkills };
        });
    };

    const addSkill = () => {
        setData((prev) => ({
            ...prev,
            skills: [...prev.skills, { name: "Nova Skill", level: 50, icon: "photoshop", showLevel: true, description: "" }],
        }));
    };

    const removeSkill = (index: number) => {
        setData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    const handleSelectIcon = (index: number, iconId: string, iconLabel: string) => {
        handleSkillChange(index, "icon", iconId);
        handleSkillChange(index, "name", iconLabel);
        setOpenPickerIndex(null);
    };

    // Group icons by category
    const categories = iconOptions.reduce<Record<string, IconOption[]>>((acc, opt) => {
        if (!acc[opt.category]) acc[opt.category] = [];
        acc[opt.category].push(opt);
        return acc;
    }, {});

    const getIconForSkill = (iconValue: string) => {
        const byId = iconOptions.find((o) => o.id === iconValue);
        if (byId) return byId.icon;
        const byLabel = iconOptions.find((o) => o.label === iconValue);
        if (byLabel) return byLabel.icon;
        return getSkillIcon(iconValue);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Skills</h2>
                <motion.button
                    onClick={addSkill}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                    style={{
                        background: "rgba(188,210,0,0.1)",
                        color: "#bcd200",
                        border: "1px solid rgba(188,210,0,0.3)",
                    }}
                >
                    + Adicionar Skill
                </motion.button>
            </div>

            <div className="space-y-4">
                {data.skills.map((skill, index) => (
                    <div
                        key={index}
                        className="p-5 rounded-xl space-y-4"
                        style={{
                            background: "rgba(6,6,16,0.5)",
                            border: "1px solid rgba(188,210,0,0.1)",
                        }}
                    >
                        {/* Header row */}
                        <div className="flex items-center gap-4">
                            {/* Icon Picker */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setOpenPickerIndex(openPickerIndex === index ? null : index)}
                                    className="w-12 h-12 flex items-center justify-center text-2xl rounded-lg cursor-pointer transition-all hover:scale-110"
                                    style={{
                                        background: "rgba(188,210,0,0.08)",
                                        border: openPickerIndex === index ? "1px solid rgba(188,210,0,0.5)" : "1px solid rgba(188,210,0,0.15)",
                                    }}
                                    title="Selecionar ícone"
                                >
                                    {getIconForSkill(skill.icon)}
                                </button>

                                {/* Dropdown Picker */}
                                {openPickerIndex === index && (
                                    <div
                                        className="absolute top-14 left-0 z-50 w-[320px] max-h-[360px] overflow-y-auto rounded-xl p-3 space-y-3"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(14,14,26,0.99) 0%, rgba(6,6,16,1) 100%)",
                                            border: "1px solid rgba(188,210,0,0.25)",
                                            boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                                        }}
                                    >
                                        {Object.entries(categories).map(([category, icons]) => (
                                            <div key={category}>
                                                <p className="text-[#8A8A9A] text-xs font-semibold uppercase tracking-wider mb-2 px-1">{category}</p>
                                                <div className="grid grid-cols-4 gap-1.5">
                                                    {icons.map((opt) => (
                                                        <button
                                                            key={opt.id}
                                                            type="button"
                                                            onClick={() => handleSelectIcon(index, opt.id, opt.label)}
                                                            className="flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all hover:scale-105"
                                                            style={{
                                                                background: skill.icon === opt.id ? "rgba(188,210,0,0.15)" : "rgba(255,255,255,0.03)",
                                                                border: skill.icon === opt.id ? "1px solid rgba(188,210,0,0.4)" : "1px solid transparent",
                                                            }}
                                                            title={opt.label}
                                                        >
                                                            <span className="text-xl">{opt.icon}</span>
                                                            <span className="text-[9px] text-[#8A8A9A] truncate w-full text-center leading-tight">{opt.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg text-white bg-transparent outline-none"
                                style={{ border: "1px solid rgba(188,210,0,0.15)" }}
                                placeholder="Nome da skill"
                            />
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) => handleSkillChange(index, "level", parseInt(e.target.value) || 0)}
                                className="w-20 px-3 py-2 rounded-lg text-white text-center bg-transparent outline-none"
                                style={{ border: "1px solid rgba(188,210,0,0.15)" }}
                            />
                            <span className="text-[#8A8A9A] text-sm">%</span>
                            <button
                                onClick={() => removeSkill(index)}
                                className="p-2 text-[#FF0080] hover:bg-[#FF0080]/10 rounded-lg transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Description field */}
                        <div>
                            <label className="text-[#6A6A7A] text-xs mb-1 block">Descrição</label>
                            <textarea
                                value={(skill as typeof skill & { description?: string }).description || ""}
                                onChange={(e) => handleSkillChange(index, "description", e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 rounded-lg text-white text-sm bg-transparent outline-none resize-none"
                                style={{ border: "1px solid rgba(188,210,0,0.1)" }}
                                placeholder="Descreva sua experiência com esta skill..."
                            />
                        </div>

                        {/* Show Level Toggle */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => handleSkillChange(index, "showLevel", !(skill as typeof skill & { showLevel?: boolean }).showLevel)}
                                className="relative w-12 h-6 rounded-full transition-colors cursor-pointer"
                                style={{
                                    background: (skill as typeof skill & { showLevel?: boolean }).showLevel !== false
                                        ? "linear-gradient(135deg, #bcd200 0%, #788D00 100%)"
                                        : "rgba(60,60,80,0.5)",
                                }}
                            >
                                <div
                                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
                                    style={{
                                        left: (skill as typeof skill & { showLevel?: boolean }).showLevel !== false ? "calc(100% - 20px)" : "4px",
                                    }}
                                />
                            </button>
                            <span className="text-[#8A8A9A] text-sm">
                                {(skill as typeof skill & { showLevel?: boolean }).showLevel !== false ? "Mostrar barra de %" : "Ocultar barra de %"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ExpertiseTab({ data, setData }: TabProps) {
    const areas = data.expertiseAreas || [];

    const handleAreaChange = (index: number, field: string, value: string) => {
        setData((prev) => {
            const newAreas = [...(prev.expertiseAreas || [])];
            newAreas[index] = { ...newAreas[index], [field]: value };
            return { ...prev, expertiseAreas: newAreas };
        });
    };

    const handleItemChange = (areaIndex: number, itemIndex: number, value: string) => {
        setData((prev) => {
            const newAreas = [...(prev.expertiseAreas || [])];
            const newItems = [...newAreas[areaIndex].items];
            newItems[itemIndex] = value;
            newAreas[areaIndex] = { ...newAreas[areaIndex], items: newItems };
            return { ...prev, expertiseAreas: newAreas };
        });
    };

    const addItem = (areaIndex: number) => {
        setData((prev) => {
            const newAreas = [...(prev.expertiseAreas || [])];
            newAreas[areaIndex] = {
                ...newAreas[areaIndex],
                items: [...newAreas[areaIndex].items, "Novo item"],
            };
            return { ...prev, expertiseAreas: newAreas };
        });
    };

    const removeItem = (areaIndex: number, itemIndex: number) => {
        setData((prev) => {
            const newAreas = [...(prev.expertiseAreas || [])];
            newAreas[areaIndex] = {
                ...newAreas[areaIndex],
                items: newAreas[areaIndex].items.filter((_, i) => i !== itemIndex),
            };
            return { ...prev, expertiseAreas: newAreas };
        });
    };

    const addArea = () => {
        const newId = areas.length > 0 ? Math.max(...areas.map((a) => a.id)) + 1 : 1;
        setData((prev) => ({
            ...prev,
            expertiseAreas: [
                ...(prev.expertiseAreas || []),
                { id: newId, title: "Nova Especialidade", items: ["Item 1"] },
            ],
        }));
    };

    const removeArea = (index: number) => {
        setData((prev) => ({
            ...prev,
            expertiseAreas: (prev.expertiseAreas || []).filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-6">
            {/* Section Title & Subtitle */}
            <div
                className="p-5 rounded-xl space-y-4"
                style={{
                    background: "rgba(6,6,16,0.5)",
                    border: "1px solid rgba(188,210,0,0.1)",
                }}
            >
                <p className="text-[#8A8A9A] text-xs font-semibold uppercase tracking-wider">Título da Seção</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                        label="Título"
                        value={data.expertiseTitle ?? "Expertise & Especialidades"}
                        onChange={(v) => setData((prev) => ({ ...prev, expertiseTitle: v }))}
                    />
                    <InputField
                        label="Subtítulo"
                        value={data.expertiseSubtitle ?? "Áreas de atuação e competências especializadas"}
                        onChange={(v) => setData((prev) => ({ ...prev, expertiseSubtitle: v }))}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Áreas de Expertise</h2>
                <motion.button
                    onClick={addArea}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                    style={{
                        background: "rgba(188,210,0,0.1)",
                        color: "#bcd200",
                        border: "1px solid rgba(188,210,0,0.3)",
                    }}
                >
                    + Adicionar Área
                </motion.button>
            </div>

            <div className="space-y-6">
                {areas.map((area, areaIndex) => (
                    <div
                        key={area.id}
                        className="p-6 rounded-xl space-y-4"
                        style={{
                            background: "rgba(6,6,16,0.5)",
                            border: "1px solid rgba(188,210,0,0.1)",
                        }}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-[#bcd200] text-sm font-medium">🔸 #{areaIndex + 1}</span>
                            <button
                                onClick={() => removeArea(areaIndex)}
                                className="p-2 text-[#FF0080] hover:bg-[#FF0080]/10 rounded-lg transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <InputField
                            label="Título da Área"
                            value={area.title}
                            onChange={(v) => handleAreaChange(areaIndex, "title", v)}
                        />

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[#8A8A9A] text-sm font-medium">Itens</label>
                                <button
                                    onClick={() => addItem(areaIndex)}
                                    className="text-xs px-3 py-1 rounded-lg cursor-pointer transition-colors"
                                    style={{
                                        background: "rgba(188,210,0,0.08)",
                                        color: "#bcd200",
                                        border: "1px solid rgba(188,210,0,0.2)",
                                    }}
                                >
                                    + Item
                                </button>
                            </div>
                            {area.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center gap-2">
                                    <span
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{ background: "#bcd200" }}
                                    />
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleItemChange(areaIndex, itemIndex, e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg text-white text-sm bg-transparent outline-none"
                                        style={{ border: "1px solid rgba(188,210,0,0.1)" }}
                                    />
                                    <button
                                        onClick={() => removeItem(areaIndex, itemIndex)}
                                        className="p-1.5 text-[#FF0080] hover:bg-[#FF0080]/10 rounded-lg transition-colors cursor-pointer text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ExperiencesTab({ data, setData }: TabProps) {
    const experiences = data.experiences || [];

    const handleExpChange = (index: number, field: string, value: string) => {
        setData((prev) => {
            const newExps = [...(prev.experiences || [])];
            newExps[index] = { ...newExps[index], [field]: value };
            return { ...prev, experiences: newExps };
        });
    };

    const addExperience = () => {
        const ids = experiences.map((e) => e.id);
        const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        setData((prev) => ({
            ...prev,
            experiences: [
                ...(prev.experiences || []),
                { id: newId, role: "Nova Posição", company: "Empresa", period: "2024 - Presente", description: "" },
            ],
        }));
    };

    const removeExperience = (index: number) => {
        setData((prev) => ({
            ...prev,
            experiences: (prev.experiences || []).filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-6">
            {/* Section Title & Subtitle */}
            <div
                className="p-5 rounded-xl space-y-4"
                style={{
                    background: "rgba(6,6,16,0.5)",
                    border: "1px solid rgba(188,210,0,0.1)",
                }}
            >
                <p className="text-[#8A8A9A] text-xs font-semibold uppercase tracking-wider">Título da Seção</p>
                <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                        label="Título"
                        value={data.experienceTitle ?? "Experiência"}
                        onChange={(v) => setData((prev) => ({ ...prev, experienceTitle: v }))}
                    />
                    <InputField
                        label="Subtítulo"
                        value={data.experienceSubtitle ?? "Minha jornada no universo iGaming"}
                        onChange={(v) => setData((prev) => ({ ...prev, experienceSubtitle: v }))}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Experiências</h2>
                <motion.button
                    onClick={addExperience}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                    style={{
                        background: "rgba(188,210,0,0.1)",
                        color: "#bcd200",
                        border: "1px solid rgba(188,210,0,0.3)",
                    }}
                >
                    + Adicionar Experiência
                </motion.button>
            </div>

            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <div
                        key={exp.id}
                        className="p-6 rounded-xl space-y-4"
                        style={{
                            background: "rgba(6,6,16,0.5)",
                            border: "1px solid rgba(188,210,0,0.1)",
                        }}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-[#bcd200] text-sm font-medium">#{index + 1}</span>
                            <button
                                onClick={() => removeExperience(index)}
                                className="p-2 text-[#FF0080] hover:bg-[#FF0080]/10 rounded-lg transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <InputField
                                label="Cargo"
                                value={exp.role}
                                onChange={(v) => handleExpChange(index, "role", v)}
                            />
                            <InputField
                                label="Empresa"
                                value={exp.company}
                                onChange={(v) => handleExpChange(index, "company", v)}
                            />
                        </div>
                        <InputField
                            label="Período"
                            value={exp.period}
                            onChange={(v) => handleExpChange(index, "period", v)}
                        />
                        <TextareaField
                            label="Descrição"
                            value={exp.description}
                            onChange={(v) => handleExpChange(index, "description", v)}
                            rows={3}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProjectsTab({ data, setData }: TabProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleProjectChange = (index: number, field: string, value: string | string[]) => {
        setData((prev) => {
            const newProjects = [...prev.projects];
            newProjects[index] = { ...newProjects[index], [field]: value };
            return { ...prev, projects: newProjects };
        });
    };

    const addProject = () => {
        const newId = Math.max(...data.projects.map((p) => p.id), 0) + 1;
        // Shift all existing orders up by 1
        setData((prev) => ({
            ...prev,
            projects: [
                {
                    id: newId,
                    title: "Novo Projeto",
                    category: "Design",
                    description: "",
                    tags: [],
                    image: "",
                    images: [] as string[],
                    order: 0,
                },
                ...prev.projects.map((p) => ({
                    ...p,
                    order: ((p as typeof p & { order?: number }).order ?? 0) + 1,
                })),
            ],
        }));
        setExpandedId(newId);
    };

    const removeProject = (index: number) => {
        const projectId = data.projects[index].id;
        if (expandedId === projectId) setExpandedId(null);
        setData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
        }));
    };

    const moveProject = (index: number, direction: "up" | "down") => {
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= data.projects.length) return;
        setData((prev) => {
            const newProjects = [...prev.projects];
            const temp = newProjects[index];
            newProjects[index] = newProjects[targetIndex];
            newProjects[targetIndex] = temp;
            // Update order values
            return {
                ...prev,
                projects: newProjects.map((p, i) => ({ ...p, order: i })),
            };
        });
    };

    const addImage = (projectIndex: number, url: string) => {
        setData((prev) => {
            const newProjects = [...prev.projects];
            const images = (newProjects[projectIndex] as typeof newProjects[0] & { images?: string[] }).images || [];
            newProjects[projectIndex] = { ...newProjects[projectIndex], images: [...images, url] };
            return { ...prev, projects: newProjects };
        });
    };

    const addMultipleImages = (projectIndex: number, urls: string[]) => {
        setData((prev) => {
            const newProjects = [...prev.projects];
            const images = (newProjects[projectIndex] as typeof newProjects[0] & { images?: string[] }).images || [];
            newProjects[projectIndex] = { ...newProjects[projectIndex], images: [...images, ...urls] };
            return { ...prev, projects: newProjects };
        });
    };

    const removeImage = (projectIndex: number, imageIndex: number) => {
        setData((prev) => {
            const newProjects = [...prev.projects];
            const project = newProjects[projectIndex] as typeof newProjects[0] & { images?: string[] };
            const images = project.images || [];
            newProjects[projectIndex] = { ...newProjects[projectIndex], images: images.filter((_, i) => i !== imageIndex) };
            return { ...prev, projects: newProjects };
        });
    };

    // Sort by order field
    const sortedProjects = [...data.projects]
        .map((p, originalIndex) => ({ ...p, originalIndex }))
        .sort((a, b) => ((a as typeof a & { order?: number }).order ?? a.originalIndex) - ((b as typeof b & { order?: number }).order ?? b.originalIndex));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Projetos</h2>
                    <p className="text-[#8A8A9A] text-xs mt-1">{data.projects.length} projeto{data.projects.length !== 1 ? "s" : ""}</p>
                </div>
                <motion.button
                    onClick={addProject}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                    style={{
                        background: "rgba(188,210,0,0.1)",
                        color: "#bcd200",
                        border: "1px solid rgba(188,210,0,0.3)",
                    }}
                >
                    + Adicionar Projeto
                </motion.button>
            </div>

            <div className="space-y-2">
                {sortedProjects.map((project, sortedIndex) => {
                    const index = project.originalIndex;
                    const projectWithImages = project as typeof project & { images?: string[] };
                    const isExpanded = expandedId === project.id;
                    const imageCount = (projectWithImages.images || []).length + (project.image ? 1 : 0);

                    return (
                        <div
                            key={project.id}
                            className="rounded-xl overflow-hidden transition-colors"
                            style={{
                                background: isExpanded ? "rgba(6,6,16,0.7)" : "rgba(6,6,16,0.4)",
                                border: isExpanded ? "1px solid rgba(188,210,0,0.25)" : "1px solid rgba(188,210,0,0.08)",
                            }}
                        >
                            {/* Compact Row Header */}
                            <div
                                onClick={() => setExpandedId(isExpanded ? null : project.id)}
                                className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all hover:bg-white/[0.02] group"
                            >
                                {/* Thumbnail */}
                                <div
                                    className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                                    style={{
                                        background: "rgba(188,210,0,0.05)",
                                        border: "1px solid rgba(188,210,0,0.1)",
                                    }}
                                >
                                    {project.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={project.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#8A8A9A] text-xs">📁</div>
                                    )}
                                </div>

                                {/* Title & Category */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate">
                                        {project.title || "Sem título"}
                                    </p>
                                    <p className="text-[#8A8A9A] text-xs truncate">{project.category}</p>
                                </div>

                                {/* Tags count */}
                                {project.tags.length > 0 && (
                                    <span
                                        className="hidden sm:inline-block px-2 py-0.5 rounded text-xs"
                                        style={{ background: "rgba(188,210,0,0.08)", color: "#8A8A9A" }}
                                    >
                                        {project.tags.length} tag{project.tags.length !== 1 ? "s" : ""}
                                    </span>
                                )}

                                {/* Image count */}
                                {imageCount > 0 && (
                                    <span
                                        className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                                        style={{ background: "rgba(188,210,0,0.08)", color: "#8A8A9A" }}
                                    >
                                        🖼 {imageCount}
                                    </span>
                                )}

                                {/* Reorder buttons */}
                                <div className="flex flex-col gap-0.5" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => moveProject(index, "up")}
                                        disabled={sortedIndex === 0}
                                        className="p-0.5 text-xs rounded transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                                        style={{ color: "#8A8A9A" }}
                                        title="Mover para cima"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        onClick={() => moveProject(index, "down")}
                                        disabled={sortedIndex === sortedProjects.length - 1}
                                        className="p-0.5 text-xs rounded transition-colors cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                                        style={{ color: "#8A8A9A" }}
                                        title="Mover para baixo"
                                    >
                                        ▼
                                    </button>
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeProject(index);
                                    }}
                                    className="p-1.5 text-[#FF0080]/60 hover:text-[#FF0080] hover:bg-[#FF0080]/10 rounded-lg transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                                    title="Remover projeto"
                                >
                                    ✕
                                </button>

                                {/* Chevron */}
                                <motion.span
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-[#8A8A9A] text-xs flex-shrink-0"
                                >
                                    ▼
                                </motion.span>
                            </div>

                            {/* Expanded Edit Form */}
                            <motion.div
                                initial={false}
                                animate={{
                                    height: isExpanded ? "auto" : 0,
                                    opacity: isExpanded ? 1 : 0,
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                            >
                                <div className="px-4 pb-5 pt-2 space-y-4" style={{ borderTop: "1px solid rgba(188,210,0,0.08)" }}>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputField
                                            label="Título"
                                            value={project.title}
                                            onChange={(v) => handleProjectChange(index, "title", v)}
                                        />
                                        <InputField
                                            label="Categoria"
                                            value={project.category}
                                            onChange={(v) => handleProjectChange(index, "category", v)}
                                        />
                                    </div>

                                    <TextareaField
                                        label="Descrição"
                                        value={project.description}
                                        onChange={(v) => handleProjectChange(index, "description", v)}
                                        rows={2}
                                    />

                                    <InputField
                                        label="Tags (separadas por vírgula)"
                                        value={project.tags.join(", ")}
                                        onChange={(v) => handleProjectChange(index, "tags", v.split(",").map((t) => t.trim()))}
                                    />

                                    {/* Cover Image Upload with Crop */}
                                    <CoverImageUploader
                                        currentImage={project.image}
                                        onImageChange={(url) => handleProjectChange(index, "image", url)}
                                        recommendedSize="1200 x 800px"
                                    />

                                    {/* Gallery Images */}
                                    <div className="space-y-3">
                                        <label className="text-[#8A8A9A] text-sm font-medium block">Galeria de Imagens</label>

                                        {/* Masonry Gallery Grid */}
                                        <div style={{ columns: "3 200px", columnGap: "12px" }}>
                                            {(projectWithImages.images || []).map((img, imgIndex) => (
                                                <div
                                                    key={imgIndex}
                                                    className="relative rounded-lg overflow-hidden group/img mb-3"
                                                    style={{
                                                        background: "rgba(6,6,16,0.8)",
                                                        border: "1px solid rgba(188,210,0,0.1)",
                                                        breakInside: "avoid",
                                                    }}
                                                >
                                                    {img && (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={img}
                                                            alt=""
                                                            className="w-full h-auto block rounded-lg"
                                                            style={{ display: "block" }}
                                                        />
                                                    )}
                                                    <button
                                                        onClick={() => removeImage(index, imgIndex)}
                                                        className="absolute top-2 right-2 w-7 h-7 bg-[#FF0080] text-white rounded-full text-xs opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer flex items-center justify-center shadow-lg"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Upload New Images */}
                                        <div className="mt-4">
                                            <ImageUploader
                                                label="Adicionar Imagens"
                                                multiple={true}
                                                onUpload={(url) => addImage(index, url)}
                                                onUploadMultiple={(urls) => addMultipleImages(index, urls)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function SocialTab({ data, setData }: TabProps) {
    const social = data.social || [];

    const handleSocialChange = (index: number, field: string, value: string) => {
        setData((prev) => {
            const newSocial = [...(prev.social || [])];
            newSocial[index] = { ...newSocial[index], [field]: value };
            return { ...prev, social: newSocial };
        });
    };

    const addSocial = () => {
        setData((prev) => ({
            ...prev,
            social: [...(prev.social || []), { name: "Nova Rede", url: "https://", icon: "🔗" }],
        }));
    };

    const removeSocial = (index: number) => {
        setData((prev) => ({
            ...prev,
            social: (prev.social || []).filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Redes Sociais</h2>
                <motion.button
                    onClick={addSocial}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                    style={{
                        background: "rgba(188,210,0,0.1)",
                        color: "#bcd200",
                        border: "1px solid rgba(188,210,0,0.3)",
                    }}
                >
                    + Adicionar Rede
                </motion.button>
            </div>

            <div className="space-y-4">
                {social.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl"
                        style={{
                            background: "rgba(6,6,16,0.5)",
                            border: "1px solid rgba(188,210,0,0.1)",
                        }}
                    >
                        <input
                            type="text"
                            value={item.icon}
                            onChange={(e) => handleSocialChange(index, "icon", e.target.value)}
                            className="w-12 text-center text-xl bg-transparent outline-none"
                        />
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleSocialChange(index, "name", e.target.value)}
                            placeholder="Nome"
                            className="w-32 px-3 py-2 rounded-lg text-white bg-transparent outline-none"
                            style={{ border: "1px solid rgba(188,210,0,0.15)" }}
                        />
                        <input
                            type="url"
                            value={item.url}
                            onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                            placeholder="https://"
                            className="flex-1 px-3 py-2 rounded-lg text-white bg-transparent outline-none"
                            style={{ border: "1px solid rgba(188,210,0,0.15)" }}
                        />
                        <button
                            onClick={() => removeSocial(index)}
                            className="p-2 text-[#FF0080] hover:bg-[#FF0080]/10 rounded-lg transition-colors cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FooterTab({ data, setData }: TabProps) {
    const footer = (data as typeof data & { footer?: { copyrightText?: string; taglineIcon?: string; tagline?: string } }).footer || {};
    const copyrightText = footer.copyrightText ?? "Todos os direitos reservados.";
    const taglineIcon = footer.taglineIcon ?? "♠";
    const tagline = footer.tagline ?? "Feito com ♠ para iGaming";
    const currentYear = new Date().getFullYear();

    const handleFooterChange = (field: string, value: string) => {
        setData((prev) => ({
            ...prev,
            footer: {
                ...((prev as typeof prev & { footer?: Record<string, string> }).footer || {}),
                [field]: value,
            },
        }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-6">Rodapé</h2>

            <p className="text-[#8A8A9A] text-sm mb-4">
                Configure os textos que aparecem no rodapé do site. O nome e o ano são preenchidos automaticamente.
            </p>

            <InputField
                label="Texto de Copyright (após o nome)"
                value={copyrightText}
                onChange={(v) => handleFooterChange("copyrightText", v)}
            />
            <InputField
                label="Ícone animado do Tagline"
                value={taglineIcon}
                onChange={(v) => handleFooterChange("taglineIcon", v)}
            />
            <InputField
                label="Tagline (frase do rodapé)"
                value={tagline}
                onChange={(v) => handleFooterChange("tagline", v)}
            />

            {/* Live Preview */}
            <div
                className="p-6 rounded-xl mt-6"
                style={{
                    background: "rgba(3,3,5,0.9)",
                    border: "1px solid rgba(188,210,0,0.15)",
                }}
            >
                <p className="text-[#8A8A9A] text-xs font-semibold uppercase tracking-wider mb-4">Preview</p>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[#8A8A9A] text-sm">
                        © {currentYear} <span className="text-[#bcd200]">{data.personal.name}</span>. {copyrightText}
                    </p>
                    <p className="text-[#8A8A9A] text-sm">
                        {tagline}
                    </p>
                </div>
            </div>
        </div>
    );
}

// ===== FORM COMPONENTS =====

function InputField({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
    return (
        <div>
            <label className="text-[#8A8A9A] text-sm mb-2 block font-medium">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-white bg-transparent outline-none transition-all"
                style={{ border: "1px solid rgba(188,210,0,0.15)", background: "rgba(6,6,16,0.5)" }}
            />
        </div>
    );
}

function TextareaField({
    label,
    value,
    onChange,
    rows = 4,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}) {
    return (
        <div>
            <label className="text-[#8A8A9A] text-sm mb-2 block font-medium">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className="w-full px-4 py-3 rounded-xl text-white bg-transparent outline-none resize-none transition-all"
                style={{ border: "1px solid rgba(188,210,0,0.15)", background: "rgba(6,6,16,0.5)" }}
            />
        </div>
    );
}
