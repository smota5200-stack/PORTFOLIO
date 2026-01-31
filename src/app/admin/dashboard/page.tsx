"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { portfolioData as defaultData } from "@/lib/data";
import { ImageUploader } from "@/components/admin/ImageUploader";

type TabType = "personal" | "skills" | "experiences" | "projects" | "social";

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("personal");
    const [data, setData] = useState(defaultData);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    // Check authentication
    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem("admin_authenticated");
        if (!isAuthenticated) {
            router.push("/admin");
        }
    }, [router]);

    // Load data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem("portfolio_data");
        if (savedData) {
            try {
                setData(JSON.parse(savedData));
            } catch {
                console.error("Failed to parse saved data");
            }
        }
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        localStorage.setItem("portfolio_data", JSON.stringify(data));
        setIsSaving(false);
        setSaveMessage("Dados salvos com sucesso!");
        setTimeout(() => setSaveMessage(""), 3000);
    };

    const handleReset = () => {
        if (confirm("Tem certeza que deseja resetar todos os dados para o padrão?")) {
            localStorage.removeItem("portfolio_data");
            setData(defaultData);
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
        { id: "skills", label: "Skills", icon: "⚡" },
        { id: "experiences", label: "Experiência", icon: "💼" },
        { id: "projects", label: "Projetos", icon: "🎨" },
        { id: "social", label: "Social", icon: "🔗" },
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
                    {activeTab === "skills" && (
                        <SkillsTab data={data} setData={setData} />
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
    const handleChange = (field: string, value: string) => {
        setData((prev) => ({
            ...prev,
            personal: { ...prev.personal, [field]: value },
        }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-6">Informações Pessoais</h2>

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
            <TextareaField
                label="Bio"
                value={data.personal.bio}
                onChange={(v) => handleChange("bio", v)}
                rows={6}
            />
        </div>
    );
}

function SkillsTab({ data, setData }: TabProps) {
    const handleSkillChange = (index: number, field: string, value: string | number) => {
        setData((prev) => {
            const newSkills = [...prev.skills];
            newSkills[index] = { ...newSkills[index], [field]: value };
            return { ...prev, skills: newSkills };
        });
    };

    const addSkill = () => {
        setData((prev) => ({
            ...prev,
            skills: [...prev.skills, { name: "Nova Skill", level: 50, icon: "⭐" }],
        }));
    };

    const removeSkill = (index: number) => {
        setData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
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
                        className="flex items-center gap-4 p-4 rounded-xl"
                        style={{
                            background: "rgba(6,6,16,0.5)",
                            border: "1px solid rgba(188,210,0,0.1)",
                        }}
                    >
                        <input
                            type="text"
                            value={skill.icon}
                            onChange={(e) => handleSkillChange(index, "icon", e.target.value)}
                            className="w-12 text-center text-xl bg-transparent outline-none"
                        />
                        <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg text-white bg-transparent outline-none"
                            style={{ border: "1px solid rgba(188,210,0,0.15)" }}
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
                ))}
            </div>
        </div>
    );
}

function ExperiencesTab({ data, setData }: TabProps) {
    const handleExpChange = (index: number, field: string, value: string) => {
        setData((prev) => {
            const newExps = [...prev.experiences];
            newExps[index] = { ...newExps[index], [field]: value };
            return { ...prev, experiences: newExps };
        });
    };

    const addExperience = () => {
        const newId = Math.max(...data.experiences.map((e) => e.id), 0) + 1;
        setData((prev) => ({
            ...prev,
            experiences: [
                ...prev.experiences,
                { id: newId, role: "Nova Posição", company: "Empresa", period: "2024 - Presente", description: "" },
            ],
        }));
    };

    const removeExperience = (index: number) => {
        setData((prev) => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="space-y-6">
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
                {data.experiences.map((exp, index) => (
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
    const handleProjectChange = (index: number, field: string, value: string | string[]) => {
        setData((prev) => {
            const newProjects = [...prev.projects];
            newProjects[index] = { ...newProjects[index], [field]: value };
            return { ...prev, projects: newProjects };
        });
    };

    const addProject = () => {
        const newId = Math.max(...data.projects.map((p) => p.id), 0) + 1;
        setData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                {
                    id: newId,
                    title: "Novo Projeto",
                    category: "Design",
                    description: "",
                    tags: [],
                    image: "",
                    images: [],
                },
            ],
        }));
    };

    const removeProject = (index: number) => {
        setData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
        }));
    };

    const addImage = (projectIndex: number, url: string) => {
        setData((prev) => {
            const newProjects = [...prev.projects];
            const images = (newProjects[projectIndex] as typeof newProjects[0] & { images?: string[] }).images || [];
            newProjects[projectIndex] = { ...newProjects[projectIndex], images: [...images, url] };
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Projetos</h2>
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

            <div className="space-y-6">
                {data.projects.map((project, index) => {
                    const projectWithImages = project as typeof project & { images?: string[] };
                    return (
                        <div
                            key={project.id}
                            className="p-6 rounded-xl space-y-4"
                            style={{
                                background: "rgba(6,6,16,0.5)",
                                border: "1px solid rgba(188,210,0,0.1)",
                            }}
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-[#bcd200] text-sm font-medium">Projeto #{index + 1}</span>
                                <button
                                    onClick={() => removeProject(index)}
                                    className="p-2 text-[#FF0080] hover:bg-[#FF0080]/10 rounded-lg transition-colors cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

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

                            {/* Cover Image Upload */}
                            <div className="space-y-2">
                                <ImageUploader
                                    label="Imagem de Capa"
                                    currentImage={project.image}
                                    onUpload={(url) => handleProjectChange(index, "image", url)}
                                />
                            </div>

                            {/* Gallery Images */}
                            <div className="space-y-3">
                                <label className="text-[#8A8A9A] text-sm font-medium block">Galeria de Imagens</label>

                                {/* Existing Images */}
                                <div className="grid grid-cols-4 gap-3">
                                    {(projectWithImages.images || []).map((img, imgIndex) => (
                                        <div
                                            key={imgIndex}
                                            className="relative aspect-square rounded-lg overflow-hidden group"
                                            style={{ background: "rgba(6,6,16,0.8)", border: "1px solid rgba(188,210,0,0.1)" }}
                                        >
                                            {img && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                            )}
                                            <button
                                                onClick={() => removeImage(index, imgIndex)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-[#FF0080] text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Upload New Image */}
                                <div className="mt-4">
                                    <ImageUploader
                                        label="Adicionar Nova Imagem"
                                        onUpload={(url) => addImage(index, url)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function SocialTab({ data, setData }: TabProps) {
    const handleSocialChange = (index: number, field: string, value: string) => {
        setData((prev) => {
            const newSocial = [...prev.social];
            newSocial[index] = { ...newSocial[index], [field]: value };
            return { ...prev, social: newSocial };
        });
    };

    const addSocial = () => {
        setData((prev) => ({
            ...prev,
            social: [...prev.social, { name: "Nova Rede", url: "https://", icon: "🔗" }],
        }));
    };

    const removeSocial = (index: number) => {
        setData((prev) => ({
            ...prev,
            social: prev.social.filter((_, i) => i !== index),
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
                {data.social.map((item, index) => (
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
