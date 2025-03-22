import { Button } from "@/ui/button";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Label } from "@/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "@/ui/textarea";
import { Input } from "@/ui/input";
import { apiUrl } from "@/lib/config";
import { DialogClose } from "@/ui/dialog";
import { Progress } from "@/ui/progress";
import logo from "@/assets/logo.svg";

interface AddBoardProps {
  setShowAlert: (showAlert: boolean) => void;
  setRefreshBoard: (refresh: boolean) => void;
}

export function AddBoard({ setShowAlert, setRefreshBoard }: AddBoardProps) {
  const [greetings, setGreetings] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [greetingsError, setGreetingsError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const postGreetings = async () => {
    setIsLoading(true);
    setProgress(30);

    try {
      const response = await fetch(`${apiUrl}/add-greeting`, {
        method: "POST",
        body: JSON.stringify({
          text: greetings, // Preserve whitespace and newlines
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

      setProgress(70);
      setRefreshBoard(true);
      setShowAlert(true);
      setProgress(100);

      if (dialogCloseRef.current) {
        dialogCloseRef.current.click();
      }
    } catch (error) {
      console.error("Failed to post greeting:", error);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trim only for validation, but preserve whitespace in the actual data
    const isGreetingsEmpty = greetings.trim() === "";
    const isNameEmpty = name.trim() === "";

    setGreetingsError(isGreetingsEmpty);
    setNameError(isNameEmpty);

    if (!isGreetingsEmpty && !isNameEmpty) {
      postGreetings();
    }
  };

  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });

      const base64Reader = new FileReader();
      base64Reader.readAsDataURL(blob);
      base64Reader.onloadend = () => {
        const base64String = base64Reader.result as string;
        setImage(base64String);
      };
    };
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed bottom-10 right-10">
            <div className="relative flex flex-col items-center">
            <img src={logo} alt="Logo" className="-z-10 w-48 h-48 absolute bottom-5 lg:bottom-10" />
            <Button variant="secondary" className="w-48 h-16 lg:w-56 lg:h-20 mt-10">
              <Plus className="h-16 w-16 md:h-32 md:w-32" />
              <Label className="text-xl md:text-2xl">Add Board</Label>
            </Button>
            </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl lg:text-5xl font-black font-raleway tracking-[1px] text-transparent"
            style={{
              WebkitTextStroke: "2px #3B82F6",
              filter: `
      drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))
      drop-shadow(0px 0px 4px rgba(59, 130, 246, 0.5))
      drop-shadow(0px 0px 10px rgba(59, 130, 246, 0.5))
      drop-shadow(0px 0px 50px rgba(59, 130, 246, 1))
    `,
              fontFamily: "Raleway",
            }}
          >
            Add a greeting
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Label className="text-xl">Picture: </Label>
          <Input id="picture" type="file" className="my-2" onChange={handlePicture} />
          
          <Label className="text-xl">Greeting: </Label>
          <Textarea
            placeholder="Write your greeting here"
            onChange={(e) => setGreetings(e.target.value)}
            className="max-w-[410px] lg:max-w-[460px] h-40 my-2 overflow-y-scroll"
          />
          {greetingsError && <Label className="text-red-500 my-2 ">Greeting is required</Label>}
          
          <Label className="text-xl">From: </Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
            className="max-w-[410px] lg:max-w-[460px] h-12 my-2"
          />
          {nameError && <Label className="text-red-500 my-2">Name is required but its up to you if you want to troll</Label>}
          
          {isLoading && (
            <Progress value={progress} className="w-full my-4" />
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button ref={dialogCloseRef} type="button" className="hidden">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}