import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { X, ShieldCheck } from "lucide-react"
import { Message } from "@/model/User"
import { toast } from "sonner"
import axios from "axios"
import { useState } from "react"

type MessageCardProps = {
  message: Message
  onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true)

      const response = await axios.delete(
        `/api/delete-message/${message._id}`
      )

      toast.success(response.data.message)
      onMessageDelete(message._id.toString())
    } catch (error) {
      toast.error("Failed to delete message")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="relative border bg-white shadow-sm transition hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        {/* Left meta */}
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            Anonymous message
          </CardTitle>
          <CardDescription className="text-xs">
            {new Date(message.createdAt).toLocaleString()}
          </CardDescription>
        </div>

        {/* Delete action */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:text-red-600"
              disabled={isDeleting}
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete this message?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This message will be permanently removed from your inbox.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      {/* Message content */}
      <CardContent>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
          {message.content}
        </p>
      </CardContent>
    </Card>
  )
}

export default MessageCard
