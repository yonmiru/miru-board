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
import { Textarea } from "@/ui/textarea"

export function AddBoard() {

  return (
    <Dialog>
      <DialogTrigger asChild>
      <div className="fixed bottom-10 right-10">
        <Button variant="outline" className="w-48 h-16 lg:w-56 lg:h-20">
          <Plus className="h-16 w-16 md:h-32 md:w-32" />
          <Label className="text-xl md:text-2xl">Add Board</Label>
        </Button>
      </div>
      </DialogTrigger>
      <DialogContent className="w-100%">
        <DialogHeader>
          <DialogTitle className="text-4xl"> Add a greeting</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
        <Textarea
          placeholder="What's on your mind?"
          className="w-full h-40 my-4"
          required
        />
        </div>
        <DialogFooter>
          <Button type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
