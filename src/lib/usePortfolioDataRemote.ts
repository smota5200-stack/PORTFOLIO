"use client";

import { useState, useEffect, useCallback } from "react";
import { portfolioData as defaultData } from "./data";

export interface ProjectWithImages {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
    image: string;
    images?: string[];
}

// Use typeof to infer the exact shape from defaultData
export type PortfolioData = typeof defaultData & {
    projects: ProjectWithImages[];
};

// Hook to use portfolio data from Firebase
export function usePortfolioDataRemote() {
    const [data, setData] = useState<PortfolioData>(defaultData as PortfolioData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from API
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/data", {
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result = await response.json();
            setData(result);
            setError(null);
        } catch (err) {
            console.error("Error fetching portfolio data:", err);
            setError(err instanceof Error ? err.message : "Unknown error");
            // Use default data as fallback
            setData(defaultData as PortfolioData);
        } finally {
            setLoading(false);
        }
    }, []);

    // Save data to API
    const saveData = useCallback(async (newData: PortfolioData) => {
        try {
            const response = await fetch("/api/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });

            if (!response.ok) {
                throw new Error("Failed to save data");
            }

            setData(newData);
            return { success: true };
        } catch (err) {
            console.error("Error saving portfolio data:", err);
            return {
                success: false,
                error: err instanceof Error ? err.message : "Unknown error"
            };
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refresh: fetchData,
        saveData,
    };
}

// Simple hook for components that only need to read data
export function usePortfolioData() {
    const [data, setData] = useState<PortfolioData>(defaultData as PortfolioData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/data", {
                    next: { revalidate: 60 }, // Cache for 60 seconds
                });

                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
            } catch (err) {
                console.error("Error fetching portfolio data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading };
}
