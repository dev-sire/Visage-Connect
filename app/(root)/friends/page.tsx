import ConversationFallback from '@/components/shared/conversation/ConversationFallback'
import ItemList from '@/components/shared/item-list/ItemList'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title='Friends'>Friends Page</ItemList>
      <ConversationFallback />
    </>
  )
}

export default FriendsPage