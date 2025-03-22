import BoardCard from "@/components/BoardCard";
import useBoard from "@/hooks/useBoard";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";

interface BoardProps {
    refreshBoard: boolean;
    setRefreshBoard: (refresh: boolean) => void;
}

export default function Board({ refreshBoard, setRefreshBoard }: BoardProps) {
    const { board, loading, fetchBoard } = useBoard(); // Ensure board updates in hook

    useEffect(() => {
        fetchBoard();
        setRefreshBoard(false);
      }, [refreshBoard, fetchBoard, setRefreshBoard]);
    
    useEffect(() => {
        console.log("Board component re-rendered");
    }, [refreshBoard]);


    return loading ? (
        <div className="flex flex-col justify-center items-center mt-40">
            <PuffLoader size={256} color="white" />
            <div className="text-white text-2xl font-bold py-8">Loading...</div>
        </div>
    ) : (
        <div className="mx-8 md:mx-32">
            <div className="columns-1 gap-5 lg:gap-8 lg:columns-2 xl:columns-3 py-10">
                {board.map((item, index) => (
                    <div key={index} className="mb-4 break-inside-avoid">
                        <BoardCard
                            text={item.text}
                            image={item.image}
                            from={item.submitted_by}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
