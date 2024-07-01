"use client"
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { api } from '@/convex/_generated/api'
import { useConversation } from '@/hooks/useConversation'
import { useMutationState } from '@/hooks/useMutationState'
import { zodResolver } from '@hookform/resolvers/zod'
import { ConvexError } from 'convex/values'
import { useRef, useState, useEffect, FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import TextAreaAutosize from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'
import { useTheme } from "next-themes";
import MessageActionsPopover from './MessageActionsPopover'
import EmojiPicker, { Theme } from "emoji-picker-react";

type ChatInputProps = {};

const chatMessageSchema = z.object({
    content: z.string().min(1, {
        message: "This field can't be empty"
    }),
})

const ChatInput: FC<ChatInputProps> = ({}) => {

    const emojiPickerRef = useRef<any>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [cursorPosition, setCursorPosition] = useState(0)

    const { conversationId } = useConversation()
    const { theme } = useTheme()
    const { mutate: createMessage, pending} = useMutationState(api.message.create)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target)
          ) {
            setEmojiPickerOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const form = useForm<z.infer<typeof chatMessageSchema>>({
        resolver: zodResolver(chatMessageSchema),
        defaultValues: {
            content: "",
        }
    })

    const content = form.watch("content", "");

    const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
        createMessage({
          content: [values.content],
          type: "text",
          conversationId,
        })
          .then(() => {
            form.reset()
            textareaRef.current?.focus()
          })
          .catch((error) => {
            toast.error(
              error instanceof ConvexError
                ? error.data
                : "Unexpected error occurred"
            )
          })
    }
    const handleInputChange = (event: any) => {
        const {value, selectionStart} = event.target
        if(selectionStart !== null){
            form.setValue("content", value)
            setCursorPosition(selectionStart)
        }
    }
    const insertEmoji = (emoji: string) => {
        const newText = [
          content.substring(0, cursorPosition),
          emoji,
          content.substring(cursorPosition),
        ].join("");
    
        form.setValue("content", newText);
    
        setCursorPosition(cursorPosition + emoji.length);
    }

  return (
    <Card className='w-full p-2 rounded-lg relative'>
        <div className="absolute bottom-16 md:left-0 -left-6" ref={emojiPickerRef}>
            <EmojiPicker
                open={emojiPickerOpen}
                theme={theme as Theme}
                onEmojiClick={(emojiDetails) => {
                    insertEmoji(emojiDetails.emoji);
                    setEmojiPickerOpen(false);
                }}
                lazyLoadEmojis
            />
        </div>
        <div className="flex gap-2 items-end w-full">
            <MessageActionsPopover setEmojiPickerOpen={setEmojiPickerOpen} />   
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex w-full items-end gap-2'>
                    <FormField control={form.control} name='content' render={({field}) => (
                        <FormItem className='w-full h-full'>
                            <FormControl>
                                <TextAreaAutosize
                                    onKeyDown={async e => {
                                        if(e.key === 'Enter' && !e.shiftKey){
                                            e.preventDefault();
                                            await form.handleSubmit(handleSubmit)();
                                        }
                                    }}
                                    rows={1} 
                                    maxRows={3}
                                    {...field}
                                    onChange={handleInputChange}
                                    onClick={handleInputChange}
                                    placeholder='Type a message...'
                                    className='min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button size="icon" type='submit' disabled={pending}>
                        <SendHorizonal />
                    </Button>
                </form>
            </Form>
        </div>
    </Card>
  )
}

export default ChatInput