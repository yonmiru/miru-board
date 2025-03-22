import { PartyPopper } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/ui/alert"

export default function AlertNotification() {
    return (
        <div className="fixed top-4 right-4">
            <Alert>
                <PartyPopper className="h-4 w-4" />
                <AlertTitle>Nice up!</AlertTitle>
                <AlertDescription>
                    Your board is now posted !!!
                </AlertDescription>
            </Alert>
        </div>
    )
}