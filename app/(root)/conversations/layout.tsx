"use client"
import ItemList from '@/components/shared/item-list/ItemList'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Loader } from 'lucide-react'
import React from 'react'
import DMConversationItem from './_components/DMConversationItem'

type Props = React.PropsWithChildren<{}>

const Conversaionslayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get)
  return (
    <>
      <ItemList title='Conversations'>{
        conversations ? conversations.length === 0 ? (
          <p className='h-full w-full flex items-center justify-center'>No Conversations Found</p>
        ) : conversations.map((conversation) => (
          conversation.conversation.isGroup ? null : (
            <DMConversationItem 
              key={conversation.conversation._id} 
              id={conversation.conversation._id} 
              imageUrl={conversation.otherMember?.imageUrl || ""} 
              username={conversation.otherMember?.username || ""}
              lastMessageSender={conversation.lastMessage?.sender} 
              lastMessageContent={conversation.lastMessage?.content}
            />)
        )) : <Loader size={20} className='animate-spin' />
      }</ItemList>
      {children}
    </>
  )
}

export default Conversaionslayout