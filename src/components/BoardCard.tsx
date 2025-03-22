import { Card, CardHeader, CardContent, CardFooter } from "@/ui/card"

type BoardCardProps = {
  text: string
  image: string
  from: string
}

export default function BoardCard({ text, image, from }: BoardCardProps) {
  return (
    <Card className="flex flex-col p-0 bg-transparent">
      <CardHeader className="p-0">
        <img src={image} alt={from} className="w-full h-full object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent>
        <p className="text-md">{text}</p>
      </CardContent>
      <CardFooter className="p-4">
      <p className="text-sm text-gray-500">{from}</p>
      </CardFooter>
    </Card>
  )
}