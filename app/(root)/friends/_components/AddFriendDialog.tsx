"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const addFriendFormSchema = z.object({
    email: z.string()
            .min(1, { message: "This field cannot be empty"})
            .email("Please enter a valid email")
})

const AddFriendDialog = () => {
    
    const{ mutate: createRequest, pending } = useMutationState(api.request.create)

    const form = useForm<z.infer<typeof addFriendFormSchema>>({
        resolver: zodResolver(addFriendFormSchema),
        defaultValues: {
            email: "",
        }
    })
    const handleSubmit = async (values: z.infer<typeof addFriendFormSchema>) => {
        await createRequest({email: values.email}).then(() => {
            form.reset()
            toast.success("Friend Request Send!")

        }).catch((error) => {
            toast.error(error instanceof ConvexError ? error.data : "Unexpected Error Occurred")
        })
    }
  return (
    <Dialog>
        <Tooltip>
            <TooltipTrigger>
                <Button size="icon" variant="outline">
                    <DialogTrigger>
                        <UserPlus />
                    </DialogTrigger>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Add Friend</p>
            </TooltipContent>
        </Tooltip>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Friends</DialogTitle>
                <DialogDescription>Send a request to connect with your friends!</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField control={form.control} name="email" render={({field}) => 
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }/>
                    <DialogFooter>
                        <Button type="submit" disabled={pending}>Send</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default AddFriendDialog