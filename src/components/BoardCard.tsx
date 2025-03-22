import { Card, CardHeader, CardContent, CardFooter } from "@/ui/card";
import { PartyPopper } from "lucide-react"; // Import the PartyPopper icon from Lucide

type BoardCardProps = {
  text: string;
  image: string;
  from: string;
};

export default function BoardCard({ text, image, from }: BoardCardProps) {
  return (
    <Card className="flex flex-col p-0 bg-transparent relative -z-10">
      {/* Party Hat Icon */}
      <div className="absolute top-4 -right-4 z-10 bg-white rounded-full p-4 shadow-lg">
        <PartyPopper className="w-8 h-8 text-blue-500" /> {/* Adjust size and color */}
      </div>

      {image && (
        <CardHeader className="p-0">
          <img src={image} alt={from} className="w-full h-full object-cover rounded-t-lg" />
        </CardHeader>
      )}
      <CardContent className="p-4">
        {/* Use white-space: pre-wrap to preserve newlines and spaces */}
        <p className="text-md whitespace-pre-wrap">{text}</p>
      </CardContent>
      <CardFooter className="p-2">
        <p className="text-sm text-gray-500 p-2">{from}</p>
      </CardFooter>
    </Card>
  );
}