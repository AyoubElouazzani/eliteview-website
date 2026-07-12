import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/dashboard-client'

export const metadata = {
  title: 'Dashboard - StreamFlow',
  description: 'Your StreamFlow account dashboard',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  return <DashboardClient user={session.user} />
}
