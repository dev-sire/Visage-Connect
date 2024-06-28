"use client"
import { Card } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { useConversation } from '@/hooks/useConversation'
import { useMutationState } from '@/hooks/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConvexError } from 'convex/values'
import { Content } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const chatMessageSchema = z.object({
    content: z.string().min(1, {
        message: "This field can't be empty"
    }),
})

const ChatInput = () => {
    const { conversationId } = useConversation()
    const { mutate: createMessage, pending} = useMutationState(api.message.create)

    const form = useForm<z.infer<typeof chatMessageSchema>>({
        resolver: zodResolver(chatMessageSchema),
        defaultValues: {
            content: "",
        }
    })

    const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
        createMessage({
            conversationId,
            type: "text",
            content: [values.content],
        }).then(() => {
            form.reset();
        }).catch((error) => {
            toast(error instanceof ConvexError ? error.data : "Unexpected error occured")
        })
    }
  return (
    <Card className='w-full p-2 rounded-lg relative'>
        Chat Input
    </Card>
  )
}

export default ChatInput