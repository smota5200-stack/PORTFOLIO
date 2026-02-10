"use client";

import { useState, useRef } from "react";
import { ImageCropper } from "./ImageCropper";

interface CoverImageUploaderProps {
    currentImage?: string;
    onImageChange: (url: string) => void;
    recommendedSize?: string;
}

export function CoverImageUploader({
    currentImage,
    onImageChange,
    recommendedSize = "1200 x 800px"
}: CoverImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [showCropper, setShowCropper] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate
        if (!file.type.startsWith("image/")) {
            setError("Por favor, selecione uma imagem");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError("Imagem muito grande. Máximo 10MB");
            return;
        }

        setError(null);

        // Create local preview for cropper
        const localUrl = URL.createObjectURL(file);
        setTempImage(localUrl);
        setShowCropper(true);

        // Reset input
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleCropComplete = (croppedUrl: string) => {
        onImageChange(croppedUrl);
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
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="block text-sm text-[#8A8A9A]">Imagem de Capa</label>
                    <span className="text-xs text-[#bcd200]/60">
                        Recomendado: {recommendedSize}
                    </span>
                </div>

                <div
                    onClick={() => inputRef.current?.click()}
                    className="relative border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[#bcd200]/50 group overflow-hidden"
                    style={{
                        borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(188,210,0,0.2)",
                        background: "rgba(6,6,16,0.5)",
                    }}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    {currentImage ? (
                        <div className="relative aspect-video">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={currentImage}
                                alt="Capa"
                                className="w-full h-full object-cover"
                            />
                            {isUploading && (
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-[#bcd200] border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <span className="px-3 py-1.5 bg-[#bcd200] text-[#0A0A14] rounded-lg text-sm font-medium">
                                    ✂️ Alterar e Recortar
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            {isUploading ? (
                                <div className="w-8 h-8 border-2 border-[#bcd200] border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="text-4xl mb-3">🖼️</span>
                                    <span className="text-sm text-[#8A8A9A]">
                                        Clique para adicionar imagem de capa
                                    </span>
                                    <span className="text-xs text-[#8A8A9A]/60 mt-1">
                                        Você poderá recortar e ajustar o zoom
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {error && (
                    <p className="text-red-400 text-xs">{error}</p>
                )}

                {/* Thumbnail Preview */}
                {currentImage && (
                    <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(6,6,16,0.8)" }}>
                        <div className="w-16 h-10 rounded overflow-hidden flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={currentImage}
                                alt="Thumbnail"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#8A8A9A]">Visualização como thumbnail</p>
                            <p className="text-xs text-[#bcd200]/60 truncate">{currentImage.substring(0, 50)}...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Cropper Modal */}
            {showCropper && tempImage && (
                <ImageCropper
                    image={tempImage}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                    aspectRatio={16 / 9}
                />
            )}
        </>
    );
}
