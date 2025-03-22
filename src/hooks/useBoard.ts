import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/config";

interface Board {
    id: number;
    text: string;
    image: string;
    submitted_by: string;
}

const useBoard = (): { board: Board[], loading: boolean, error: string | null } => {
    const [board, setBoard] = useState<Board[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await fetch(`${apiUrl}/get-greetings`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Response is not valid JSON");
                }
        
                const data: Board[] = await response.json();
                setBoard(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchBoard();
    }, [apiUrl]);

    return { board, loading, error };
};

export default useBoard;