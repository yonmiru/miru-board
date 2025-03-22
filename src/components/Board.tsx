import BoardCard from "@/components/BoardCard";
import useBoard from "@/hooks/useBoard";
import { useEffect } from "react";

interface BoardProps {
    refreshBoard: boolean;
}

export default function Board({ refreshBoard }: BoardProps) {

    const { board } = useBoard(); 

    useEffect(() => {
    
    }, [refreshBoard]);

    return (
        <div className="mx-8 md:mx-32">
            <div className="columns-1 gap-5 lg:gap-8 lg:columns-2 xl:columns-3 py-10">
                {
                    board.map((item, index) => (
                        <div key={index} className="mb-4 break-inside-avoid">
                            <BoardCard
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
