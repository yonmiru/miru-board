import { ThemeProvider } from "@/components/ThemeProvider"
import Header  from "@/components/Header"
import { AddBoard } from "@/components/AddBoard";
import Canvas from "@/components/Canvas";
import Board from "@/components/Board";
import { useState } from "react";
import AlertNotification from "@/components/Alert";
import { useEffect } from "react";


export default function App() {

  const [showAlert, setShowAlert] = useState(false);
  const [refreshBoard, setRefreshBoard] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative">
        <Canvas />
        <Header />
        <AddBoard setRefreshBoard={setRefreshBoard} setShowAlert={setShowAlert} />
        <Board refreshBoard={refreshBoard} setRefreshBoard={setRefreshBoard} />
        {
          showAlert && <AlertNotification />
        }
      </div>
    </ThemeProvider>
  );
}