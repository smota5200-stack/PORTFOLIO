"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";

interface ImageCropperProps {
    image: string;
    onCropComplete: (croppedImageUrl: string) => void;
    onCancel: () => void;
    aspectRatio?: number;
}

// Utility to create cropped image
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No 2d context");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                resolve(imageSrc);
                return;
            }
            const url = URL.createObjectURL(blob);
            resolve(url);
        }, "image/jpeg", 0.95);
    });
}

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.crossOrigin = "anonymous";
        image.src = url;
    });
}

export function ImageCropper({
    image,
    onCropComplete,
    onCancel,
    aspectRatio = 16 / 9
}: ImageCropperProps) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const onCropChange = useCallback((location: Point) => {
        setCrop(location);
    }, []);

    const onZoomChange = useCallback((zoom: number) => {
        setZoom(zoom);
    }, []);

    const onCropAreaComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        if (!croppedAreaPixels) return;

        setIsProcessing(true);
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);

            // Convert blob URL to base64 and upload to Firebase
            const response = await fetch(croppedImage);
            const blob = await response.blob();

            const formData = new FormData();
            formData.append("file", blob, "cropped-image.jpg");

            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await uploadResponse.json();

            if (data.url) {
                onCropComplete(data.url);
            } else {
                onCropComplete(croppedImage);
            }

            URL.revokeObjectURL(croppedImage);
        } catch (error) {
            console.error("Error cropping image:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="w-full max-w-3xl mx-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Recortar Imagem</h3>
                    <div className="text-sm text-[#8A8A9A]">
                        Arraste para posicionar, use o slider para zoom
                    </div>
                </div>

                {/* Cropper Container */}
                <div
                    className="relative rounded-xl overflow-hidden"
                    style={{ height: "400px", background: "#0A0A14" }}
                >
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropAreaComplete}
                        cropShape="rect"
                        showGrid={true}
                        style={{
                            containerStyle: { borderRadius: "12px" },
                            cropAreaStyle: {
                                border: "2px solid #bcd200",
                                boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)"
                            }
                        }}
                    />
                </div>

                {/* Zoom Slider */}
                <div className="mt-4 flex items-center gap-4">
                    <span className="text-sm text-[#8A8A9A]">Zoom</span>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, #bcd200 0%, #bcd200 ${((zoom - 1) / 2) * 100}%, #2a2a3a ${((zoom - 1) / 2) * 100}%, #2a2a3a 100%)`,
                        }}
                    />
                    <span className="text-sm text-[#bcd200] w-12 text-right">{zoom.toFixed(1)}x</span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "#8A8A9A",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isProcessing}
                        className="px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors disabled:opacity-50"
                        style={{
                            background: "linear-gradient(135deg, #bcd200 0%, #9ab000 100%)",
                            color: "#0A0A14",
                            border: "none",
                        }}
                    >
                        {isProcessing ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-[#0A0A14] border-t-transparent rounded-full animate-spin" />
                                Processando...
                            </span>
                        ) : (
                            "Aplicar Recorte"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
