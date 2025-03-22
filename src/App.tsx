import { ThemeProvider } from "@/components/ThemeProvider"
import Header  from "@/components/Header"
import { AddBoard } from "@/components/AddBoard";
import Canvas from "@/components/Canvas";
import Board from "@/components/Board";
import { useState } from "react";
import AlertNotification from "@/components/Alert";


export default function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [refreshBoard, setRefreshBoard] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative">
        <Canvas />
        <Header />
        <AddBoard setRefreshBoard={setRefreshBoard} setShowAlert={setShowAlert} />
        <Board refreshBoard={refreshBoard} />
        {
          showAlert && <AlertNotification />
        }
      </div>
    </ThemeProvider>
  );
}