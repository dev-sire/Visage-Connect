"use client"
import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Loader } from 'lucide-react'
import React from 'react'
import Header from './_components/Header'
import Body from './_components/body/Body'
import ChatInput from './_components/input/ChatInput'

type Props = {
  params: {
    conversationId: Id<"conversations">
  }
}

const Conversationpage = ({ params: {conversationId}}: Props) => {

  const conversation = useQuery(api.conversation.get, { id: conversationId});

  return conversation === undefined ? (<div className="h-full w-full flex items-center justify-center">
    <Loader size={20} className='animate-spin' />
    </div>) : conversation === null ? (
      <p className="h-full w-full flex items-center justify-center">
        Conversation not found
      </p>) : (
      <ConversationContainer>
        <Header 
          name={(conversation.isGroup ? conversation.name : conversation.otherMember.username) || ""} 
          imageUrl={conversation.otherMember.imageUrl} 
        />
        <Body />
        <ChatInput />
      </ConversationContainer>
  )
}

export default Conversationpage