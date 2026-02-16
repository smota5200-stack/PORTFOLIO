"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { portfolioData } from "@/lib/data";

type PortfolioData = typeof portfolioData;

interface DataContextType {
    data: PortfolioData;
    isLoading: boolean;
}

const DataContext = createContext<DataContextType>({
    data: portfolioData,
    isLoading: true,
});

export function DataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<PortfolioData>(portfolioData);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(`/api/data?t=${Date.now()}`, {
                    cache: "no-store",
                });
                if (response.ok) {
                    const firebaseData = await response.json();
                    setData((prev) => ({
                        ...prev,
                        ...firebaseData,
                    }));
                }
            } catch (error) {
                console.error("Failed to load data from API:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <DataContext.Provider value={{ data, isLoading }}>
            <div
                style={{
                    opacity: isLoading ? 0 : 1,
                    transition: "opacity 0.4s ease-in-out",
                }}
            >
                {children}
            </div>
        </DataContext.Provider>
    );
}

export function usePortfolioData() {
    return useContext(DataContext);
}
