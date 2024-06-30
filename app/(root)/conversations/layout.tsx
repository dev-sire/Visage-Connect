"use client"
import ItemList from '@/components/shared/item-list/ItemList'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Loader } from 'lucide-react'
import React from 'react'
import DMConversationItem from './_components/DMConversationItem'
import CreateGroupDialog from './_components/CreateGroupDialog'
import GroupConversationItem from './_components/GroupConversationItem'

type Props = React.PropsWithChildren<{}>

const Conversaionslayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get)
  return (
    <>
      <ItemList title='Conversations' action={<CreateGroupDialog />}>{
        conversations ? conversations.length === 0 ? (
          <p className='h-full w-full flex items-center justify-center'>No Conversations Found</p>
        ) : conversations.map((conversation) => (
          conversation.conversation.isGroup ? (
            <GroupConversationItem 
              key={conversation.conversation._id} 
              id={conversation.conversation._id} 
              name={conversation.conversation.name || ""}
              lastMessageSender={conversation.lastMessage?.sender} 
              lastMessageContent={conversation.lastMessage?.content}
            />
          ) : (
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