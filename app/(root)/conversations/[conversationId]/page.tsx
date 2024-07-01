"use client"
import ConversationContainer from '@/components/shared/conversation/ConversationContainer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import Header from './_components/Header'
import Body from './_components/body/Body'
import ChatInput from './_components/input/ChatInput'
import RemoveFriendDialog from './_components/dialogs/RemoveFriendDialog'
import DeleteGroupDialog from './_components/dialogs/DeleteGroupDialog'
import LeaveGroupDialog from './_components/dialogs/LeaveGroupDialog'

type Props = {
  params: {
    conversationId: Id<"conversations">
  }
}

const Conversationpage = ({ params: {conversationId}}: Props) => {

  const conversation = useQuery(api.conversation.get, { id: conversationId});
  const[ removeFriendDialogOpen, setRemoveFriendDialogOpen ] = useState(false);
  const[ deleteGroupDialogOpen, setDeleteGroupDialogOpen ] = useState(false);
  const[ leaveGroupDialogOpen, setLeaveGroupDialogOpen ] = useState(false)


  return conversation === undefined ? (<div className="h-full w-full flex items-center justify-center">
    <Loader size={20} className='animate-spin' />
    </div>) : conversation === null ? (
      <p className="h-full w-full flex items-center justify-center">
        Conversation not found
      </p>) : (
      <ConversationContainer>
        <RemoveFriendDialog conversationId={conversationId} open={removeFriendDialogOpen} setOpen={setRemoveFriendDialogOpen} />
        <LeaveGroupDialog conversationId={conversationId} open={leaveGroupDialogOpen} setOpen={setLeaveGroupDialogOpen} />
        <DeleteGroupDialog conversationId={conversationId} open={deleteGroupDialogOpen} setOpen={setDeleteGroupDialogOpen} />
        <Header 
          name={(conversation.isGroup ? conversation.name : conversation.otherMember?.username) || ""} 
          imageUrl={conversation.otherMember?.imageUrl} 
          options={conversation.isGroup ? 
            [
              {
                  label: "Leave group",
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true)
              },
              {
                  label: "Delete group",
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true)
              },
            ] : [
              {
                label: "Remove friend",
                destructive: true,
                onClick: () => setRemoveFriendDialogOpen(true)
              }
            ]}
        />
        <Body members={
            conversation.isGroup
              ? conversation.otherMembers
                ? conversation.otherMembers
                : []
              : conversation.otherMember
              ? [conversation.otherMember]
              : []
          } 
        />
        <ChatInput />
      </ConversationContainer>
  )
}

export default Conversationpage