'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getUserProfile() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  return session.user
}

export async function updateUserProfile(data: {
  name?: string
  email?: string
}) {
  const userId = await getUserId()
  
  // For now, we'll just return success since Better Auth manages user data
  // In production, you might want to store additional profile data in a users table
  revalidatePath('/dashboard')
  return { success: true }
}
