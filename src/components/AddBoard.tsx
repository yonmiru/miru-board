import { Button } from "@/ui/button"
import { useState } from "react"
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
import { Input } from "@/ui/input"
import { apiUrl } from "@/lib/config"
import { DialogClose } from "@radix-ui/react-dialog"

interface AddBoardProps {
  setShowAlert: (showAlert: boolean) => void;
  setRefreshBoard: (refresh: boolean) => void;
}

export function AddBoard({ setShowAlert, setRefreshBoard }: AddBoardProps) {

  const [greetings, setGreetings] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const postGreetings = async () => {
    try {
      const response = await fetch(`${apiUrl}/add-greeting`, {
        method: "POST",
        body: JSON.stringify({
          text: greetings,
          submitted_by: name,
          date_submitted: new Date().toISOString(),
          image: image,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

    } catch (error) {
      console.error("Failed to post greeting:", error);
    } finally {
      setGreetings("");
      setName("");
      setImage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postGreetings();
    setRefreshBoard(true);
    setShowAlert(true);
  }

  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file); // Read as binary
    reader.onloadend = () => {
      const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });

      // Convert blob to Base64
      const base64Reader = new FileReader();
      base64Reader.readAsDataURL(blob);
      base64Reader.onloadend = () => {
        const base64String = base64Reader.result as string;
        setImage(base64String); // Store base64 to display in UI
      };
    };
  };

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl lg:text-5xl font-black font-raleway tracking-[1px] text-transparent"
            style={{
              WebkitTextStroke: "2px #3B82F6", // Blue stroke
              filter: `
      drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))
      drop-shadow(0px 0px 4px rgba(59, 130, 246, 0.5))
      drop-shadow(0px 0px 10px rgba(59, 130, 246, 0.5))
      drop-shadow(0px 0px 50px rgba(59, 130, 246, 1))
    `,
              fontFamily: "Raleway",
            }}
          > Add a greeting</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Label className="text-xl">Picture: </Label>
          <Input id="picture" type="file" className="my-2" onChange={handlePicture} />
          <Label className="text-xl">Greeting: </Label>
          <Textarea
            placeholder="Write your greeting here"
            onChange={(e) => setGreetings(e.target.value)}
            className="max-w-[410px] lg:max-w-[460px] h-40 my-2 overflow-y-scroll"
            required
          />
          <Label className="text-xl">From: </Label>
          <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" className="max-w-[410px] lg:max-w-[460px] h-12 my-2" required />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Post</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
