"use client"
import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import ItemList from '@/components/shared/item-list/ItemList'
import AddFriendDialog from './_components/AddFriendDialog'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader } from 'lucide-react'
import Request from './_components/Request';

type Props = {}

const FriendsPage = (props: Props) => {
  const requests = useQuery(api.requests.get)
  return (
    <>
      <ItemList title='Friends' action={<AddFriendDialog />}>
        {requests ? requests.length === 0 ? (
          <p className='w-full h-full flex justify-center items-center'>No Friend Request Found</p>
        ) : (
          requests.map((request) => (
            <Request key={request.request._id} id={request.request._id} imageUrl={request.sender.imageUrl} username={request.sender.username} email={request.sender.email} />
          ))
        ) : (<Loader size={20} className='animate-spin' />)}
      </ItemList>
      <ConversationFallback />
    </>
  )
}

export default FriendsPage