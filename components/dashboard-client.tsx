'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogOut, Settings, Home, Users, CreditCard, LifeBuoy, Bell, User } from 'lucide-react'

interface User {
  id: string
  name: string | null
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
}

interface DashboardClientProps {
  user: User
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await authClient.signOut()
    router.push('/')
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'devices', label: 'Devices', icon: Users },
    { id: 'support', label: 'Support', icon: LifeBuoy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">StreamFlow</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-card">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-foreground">{user.name || user.email}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="space-y-2">
              {navItems.map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-primary text-white'
                        : 'text-foreground hover:bg-card'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                )
              })}
              <div className="border-t border-border pt-2 mt-2">
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                  </span>
                </button>
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeTab === 'overview' && <OverviewTab user={user} />}
            {activeTab === 'subscription' && <SubscriptionTab />}
            {activeTab === 'devices' && <DevicesTab />}
            {activeTab === 'support' && <SupportTab />}
            {activeTab === 'settings' && <SettingsTab user={user} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function OverviewTab({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Welcome, {user.name || user.email}!</h2>
        <p className="text-muted-foreground">Manage your StreamFlow account and streaming experience.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Active Subscription', value: 'Premium', icon: CreditCard },
          { label: 'Active Devices', value: '2/5', icon: Users },
          { label: 'Account Status', value: 'Active', icon: Home },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-primary opacity-50" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-6 rounded-lg border border-border bg-card space-y-4">
        <h3 className="text-lg font-semibold text-white">Account Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="text-foreground">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Member Since</span>
            <span className="text-foreground">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email Verified</span>
            <span className={`font-medium ${user.emailVerified ? 'text-green-400' : 'text-yellow-400'}`}>
              {user.emailVerified ? 'Verified' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SubscriptionTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Subscription</h2>
        <p className="text-muted-foreground">Manage your subscription and billing information.</p>
      </div>

      <div className="p-6 rounded-lg border border-primary bg-card/50 ring-2 ring-primary/20">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Premium Plan</h3>
            <p className="text-muted-foreground">$19.99/month</p>
          </div>
          <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-full">Active</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Your subscription renews on January 15, 2025</p>
        <Button className="bg-primary hover:bg-blue-600">Manage Subscription</Button>
      </div>

      <div className="p-6 rounded-lg border border-border bg-card">
        <h3 className="text-lg font-semibold text-white mb-4">Plan Features</h3>
        <ul className="space-y-3">
          {[
            '4K Streaming',
            '5 Simultaneous Streams',
            '1000+ Channels',
            'Priority Support',
            'Ad-Free Experience',
            'Downloads Available',
          ].map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function DevicesTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Devices</h2>
        <p className="text-muted-foreground">Manage your connected devices. You can stream on up to 5 devices simultaneously.</p>
      </div>

      <div className="space-y-4">
        {[
          { name: 'MacBook Pro', type: 'Computer', active: true, lastActive: 'Now' },
          { name: 'iPhone 14', type: 'Smartphone', active: false, lastActive: '2 hours ago' },
        ].map((device, idx) => (
          <div key={idx} className="p-4 rounded-lg border border-border bg-card flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">{device.name}</p>
              <p className="text-sm text-muted-foreground">{device.type} • Last active: {device.lastActive}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SupportTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Support</h2>
        <p className="text-muted-foreground">Get help or create a support ticket.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { title: 'Live Chat', description: 'Chat with our support team', icon: LifeBuoy },
          { title: 'Help Center', description: 'Browse our knowledge base', icon: LifeBuoy },
        ].map((item, idx) => {
          const Icon = item.icon
          return (
            <button key={idx} className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all group">
              <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </button>
          )
        })}
      </div>

      <Button className="w-full bg-primary hover:bg-blue-600">Create Support Ticket</Button>
    </div>
  )
}

function SettingsTab({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences.</p>
      </div>

      <div className="p-6 rounded-lg border border-border bg-card space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
          <div className="space-y-3">
            {[
              { label: 'Share viewing history', value: false },
              { label: 'Allow personalized recommendations', value: true },
              { label: 'Show online status', value: false },
            ].map((setting, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-foreground">{setting.label}</span>
                <input
                  type="checkbox"
                  defaultChecked={setting.value}
                  className="w-5 h-5 rounded border-border cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full border-border text-foreground hover:bg-card">
              Change Password
            </Button>
            <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
