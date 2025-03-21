import { Button } from "@/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"
import { Label } from "@/ui/label"
import { Plus } from "lucide-react"
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export function AddBoard() {
  const editor = useCreateBlockNote({});

  return (
    <Dialog>
      <DialogTrigger asChild>
      <div className="fixed bottom-10 right-10">
        <Button variant="outline" size="lg">
          <Plus className="h-6 w-6" />
          <Label>Add Board</Label>
        </Button>
      </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle className="text-4xl"> Add a greeting</DialogTitle>
        </DialogHeader>
        <BlockNoteView editor={editor} />;
        <DialogFooter>
          <Button type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
