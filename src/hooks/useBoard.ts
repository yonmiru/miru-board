import { useState   , useCallback } from "react";
import { apiUrl } from "@/lib/config";

interface Board {
    id: number;
    text: string;
    image: string;
    submitted_by: string;
}

const useBoard = (): { board: Board[], loading: boolean, error: string | null, fetchBoard: (callback?: () => void) => void } => {
    const [board, setBoard] = useState<Board[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBoard = useCallback(async (callback?: () => void) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/get-greetings`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: Board[] = await response.json();
            setBoard(data);
            if (callback) callback(); // Execute callback after successful fetch
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    return { board, loading, error, fetchBoard };
};

export default useBoard;
