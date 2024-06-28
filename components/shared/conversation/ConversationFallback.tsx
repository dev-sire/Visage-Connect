"use client"
import { Card } from "@/components/ui/card"
import { useTheme } from 'next-themes'

const ConversationFallback = () => {
  const { theme, setTheme } = useTheme();
  return (
    // TO-DO: Style this component with VisageConnect Logo
    <Card className="hidden lg:flex w-full h-full p-2 items-center justify-center bg-secondary text-secondary-foreground">
        Select/Start a conversation
    </Card>
  )
}

export default ConversationFallback