"use client";

import { useState, useEffect, useCallback } from "react";
import { portfolioData as defaultData, PortfolioData } from "./data";

// Extended project type with images array
export interface ProjectWithImages {
    id: number;
    title: string;
    category: string;
    description: string;
    tags: string[];
    image: string;
    images?: string[];
}

export interface ExtendedPortfolioData extends Omit<PortfolioData, 'projects'> {
    projects: ProjectWithImages[];
}

const STORAGE_KEY = "portfolio_data";

export function usePortfolioData() {
    const [data, setData] = useState<ExtendedPortfolioData>(defaultData as ExtendedPortfolioData);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setData(parsed);
            } catch {
                console.error("Failed to parse saved portfolio data");
            }
        }
        setIsLoaded(true);
    }, []);

    // Save data to localStorage
    const saveData = useCallback((newData: ExtendedPortfolioData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        setData(newData);
    }, []);

    // Reset to default data
    const resetData = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setData(defaultData as ExtendedPortfolioData);
    }, []);

    // Refresh data from localStorage (useful when admin saves)
    const refreshData = useCallback(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                setData(JSON.parse(savedData));
            } catch {
                console.error("Failed to parse saved portfolio data");
            }
        }
    }, []);

    return {
        data,
        isLoaded,
        saveData,
        resetData,
        refreshData,
    };
}
