"use client";

import { useState, useRef } from "react";

interface ImageUploaderProps {
    onUpload: (url: string) => void;
    onUploadMultiple?: (urls: string[]) => void;
    currentImage?: string;
    label?: string;
    multiple?: boolean;
    recommendedSize?: string;
}

export function ImageUploader({
    onUpload,
    onUploadMultiple,
    currentImage,
    label = "Imagem",
    multiple = false,
    recommendedSize,
}: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadSingleFile = async (file: File): Promise<string> => {
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

        return data.url;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Validate all files
        for (const file of Array.from(files)) {
            if (!file.type.startsWith("image/")) {
                setError("Por favor, selecione apenas imagens");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                setError("Imagem muito grande. Máximo 10MB por arquivo");
                return;
            }
        }

        setError(null);
        setIsUploading(true);
        setUploadProgress(0);

        try {
            if (multiple && files.length > 1 && onUploadMultiple) {
                // Upload multiple files
                const urls: string[] = [];
                const totalFiles = files.length;

                for (let i = 0; i < totalFiles; i++) {
                    const url = await uploadSingleFile(files[i]);
                    urls.push(url);
                    setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
                }

                onUploadMultiple(urls);
            } else {
                // Single file upload
                const file = files[0];
                const localPreview = URL.createObjectURL(file);
                setPreview(localPreview);

                const url = await uploadSingleFile(file);
                setPreview(url);
                onUpload(url);

                URL.revokeObjectURL(localPreview);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro no upload");
            setPreview(currentImage || null);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            // Reset input
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-sm text-[#8A8A9A]">{label}</label>
                {recommendedSize && (
                    <span className="text-xs text-[#bcd200]/60">
                        Recomendado: {recommendedSize}
                    </span>
                )}
            </div>

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
                    multiple={multiple}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {preview && !multiple ? (
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
                            <div className="space-y-3">
                                <div className="w-8 h-8 border-2 border-[#bcd200] border-t-transparent rounded-full animate-spin mx-auto" />
                                {multiple && uploadProgress > 0 && (
                                    <div className="text-sm text-[#bcd200]">
                                        Enviando... {uploadProgress}%
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <span className="text-3xl mb-2">{multiple ? "🖼️" : "📷"}</span>
                                <span className="text-sm text-[#8A8A9A]">
                                    {multiple
                                        ? "Clique para selecionar múltiplas imagens"
                                        : "Clique para fazer upload"
                                    }
                                </span>
                                <span className="text-xs text-[#8A8A9A]/60 mt-1">
                                    PNG, JPG até 10MB {multiple && "cada"}
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
