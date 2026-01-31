"use client";

import { useState, useRef } from "react";

interface ImageUploaderProps {
    onUpload: (url: string) => void;
    currentImage?: string;
    label?: string;
}

export function ImageUploader({ onUpload, currentImage, label = "Imagem" }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setError("Por favor, selecione uma imagem");
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("Imagem muito grande. Máximo 10MB");
            return;
        }

        setError(null);
        setIsUploading(true);

        // Show local preview
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Falha no upload");
            }

            setPreview(data.url);
            onUpload(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro no upload");
            setPreview(currentImage || null);
        } finally {
            setIsUploading(false);
            URL.revokeObjectURL(localPreview);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm text-[#8A8A9A]">{label}</label>

            <div
                onClick={() => inputRef.current?.click()}
                className="relative border-2 border-dashed rounded-xl p-4 cursor-pointer transition-all hover:border-[#bcd200]/50 group"
                style={{
                    borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(188,210,0,0.2)",
                    background: "rgba(6,6,16,0.5)",
                }}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {preview ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-[#bcd200] border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-medium">Trocar imagem</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        {isUploading ? (
                            <div className="w-8 h-8 border-2 border-[#bcd200] border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="text-3xl mb-2">📷</span>
                                <span className="text-sm text-[#8A8A9A]">
                                    Clique para fazer upload
                                </span>
                                <span className="text-xs text-[#8A8A9A]/60 mt-1">
                                    PNG, JPG até 10MB
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-red-400 text-xs">{error}</p>
            )}
        </div>
    );
}
