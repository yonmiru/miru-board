import { ThemeProvider } from "@/components/ThemeProvider"
import Header  from "@/components/Header"
import { ModeToggle } from "@/components/ModeToggle"
import { AddBoard } from "@/components/AddBoard";


export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <ModeToggle />
      <AddBoard />
    </ThemeProvider>
  );
}
