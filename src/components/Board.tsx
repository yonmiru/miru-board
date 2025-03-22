import { useEffect, useState } from "react";
import BoardCard from "@/components/BoardCard";
import { apiUrl } from "@/lib/config";

interface Board {
    id: number;
    text: string;
    image: string;
    submitted_by: string;
}

export default function Board() {

    const [board, setBoard] = useState<Board[]>([]);    

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
            console.error("Fetch error:", error);
        }
    };
    

    console.log(board);

    useEffect(() => {
        fetchBoard();
    }, []);

    return (
        <div className="mx-8 md:mx-32">
            <div className="columns-1 gap-5 lg:gap-8 lg:columns-2 xl:columns-3 py-10">
                {
                    board.map((item) => (
                        <div className="mb-4 break-inside-avoid">
                            <BoardCard
                            key={item.id}
                            text={item.text}
                            image={item.image}
                            from={item.submitted_by}
                        />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
