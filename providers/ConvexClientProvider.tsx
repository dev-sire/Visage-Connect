"use client"
import Loader from '@/components/shared/Loader'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import React from 'react'

type Props = {
    children: React.ReactNode,
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || ""
const convex = new ConvexReactClient(convexUrl)

const ConvexClientProvider = ({ children }: Props) => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
            <Authenticated>{ children }</Authenticated>
            <AuthLoading><Loader /></AuthLoading>
        </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClientProvider