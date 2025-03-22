import { ThemeProvider } from "@/components/ThemeProvider"
import Header  from "@/components/Header"
import { AddBoard } from "@/components/AddBoard";
import Canvas from "@/components/Canvas";
import Board from "@/components/Board";


export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative">
        <Canvas />
        <Header />
        <AddBoard />
        <Board />
      </div>
    </ThemeProvider>
  );
}