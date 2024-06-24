import { useMutation } from "convex/react"
import { useState } from "react"

export const useMutationState = (mutationtorun : any) => {
    const[pending, setPending] = useState(false)

    const mutationFn = useMutation(mutationtorun)

    const mutate = (payload: any) => {
        setPending(true)

        return mutationFn(payload).then((res) => {
            return res;
        }).catch((error) => {
            throw error;
        }).finally(() => setPending(false))
    }

    return { mutate, pending }; 
}