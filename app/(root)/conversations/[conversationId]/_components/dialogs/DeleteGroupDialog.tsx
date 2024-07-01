import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutationState';
import { ConvexError } from 'convex/values';
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner';

type Props = {
    conversationId: Id<"conversations">;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteGroupDialog = ({ conversationId, open, setOpen }: Props) => {

    const { mutate: deleteGoup, pending } = useMutationState(api.conversation.deleteGroup)

    const handleDeleteGroup = async() => {
        deleteGoup({conversationId})
        .then(() => {
            toast.success("Group deleted successfully!")
        }).catch((error) => {
            toast.error(error instanceof ConvexError ? error.data :"Unexpected error occurred")
        })
    }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action is irreversable. All message will be deleted and you will not be able to message this group. 
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={pending} onClick={handleDeleteGroup}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteGroupDialog