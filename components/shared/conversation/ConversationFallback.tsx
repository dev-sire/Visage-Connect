import { Card } from "@/components/ui/card"


const ConversationFallback = () => {
  return (
    <Card className="hidden lg:flex w-full h-full p-2 items-center justify-center bg-secondary text-secondary-foreground">
        Select/Start a conversation
    </Card>
  )
}

export default ConversationFallback