'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Play, Zap, Globe, Users, Shield, Tv, 
  MessageSquare, Phone, User, MessageCircle, 
  Loader2, CheckCircle2, AlertCircle 
} from 'lucide-react'
import { useState, useTransition } from 'react'
import { submitContactForm } from '@/app/actions/contact'

export default function Home() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!fullName.trim() || !phone.trim() || !description.trim()) {
      setError('All fields are required.')
      return
    }

    startTransition(async () => {
      const res = await submitContactForm({ fullName, phone, description })
      if (res.success) {
        setSuccess(true)
        
        // Open WhatsApp pre-filled link
        const supportNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'
        const text = `Hello StreamFlow Support! I'd like to get in touch.\n\nName: ${fullName.trim()}\nPhone: ${phone.trim()}\nPurpose: ${description.trim()}`
        const encodedText = encodeURIComponent(text)
        const whatsappUrl = `https://wa.me/${supportNumber.replace(/\+/g, '')}?text=${encodedText}`
        
        window.open(whatsappUrl, '_blank')
        
        // Clear fields
        setFullName('')
        setPhone('')
        setDescription('')
      } else {
        setError(res.error || 'Something went wrong. Please try again.')
      }
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">StreamFlow</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition">Contact Support</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-foreground hover:bg-card">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-primary hover:bg-blue-600">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl -z-10" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Premium IPTV Entertainment at Your Fingertips
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Stream 1000+ channels, exclusive movies, and live sports. Watch anywhere, anytime with crystal-clear quality.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="bg-primary hover:bg-blue-600 text-white w-full sm:w-auto">
                  <Play className="mr-2 w-5 h-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-card w-full sm:w-auto">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl" />
            <div className="absolute inset-4 bg-gradient-to-br from-card to-card/50 rounded-xl border border-border/50 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Play className="w-16 h-16 text-primary mx-auto" />
                <p className="text-muted-foreground">Streaming Experience Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Why Choose StreamFlow?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for the ultimate streaming experience, all in one powerful platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast Streaming',
                description: 'Enjoy buffer-free HD, 4K, and 8K streaming with our optimized servers worldwide.'
              },
              {
                icon: Globe,
                title: 'Global Coverage',
                description: 'Access content from over 50 countries with 1000+ channels at your fingertips.'
              },
              {
                icon: Users,
                title: 'Multi-Device Support',
                description: 'Stream on up to 5 devices simultaneously. Watch on phones, tablets, and smart TVs.'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Bank-level encryption protects your data. We never log your viewing history.'
              },
              {
                icon: Tv,
                title: 'Live & On-Demand',
                description: 'Watch live sports, news, and events plus a massive library of on-demand content.'
              },
              {
                icon: Play,
                title: '24/7 Support',
                description: 'Our dedicated support team is always ready to help you 24 hours a day, 7 days a week.'
              },
            ].map((feature, idx) => (
              <div key={idx} className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that&apos;s right for you. All plans include our full feature set.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: '$9.99',
                period: '/month',
                description: 'Perfect for individuals',
                features: ['HD Streaming', '2 Simultaneous Streams', '500+ Channels', 'Email Support', '30-day Free Trial'],
                popular: false,
              },
              {
                name: 'Premium',
                price: '$19.99',
                period: '/month',
                description: 'Most popular choice',
                features: ['4K Streaming', '5 Simultaneous Streams', '1000+ Channels', 'Priority Support', 'Ad-Free Experience', 'Downloads Available'],
                popular: true,
              },
              {
                name: 'Family',
                price: '$29.99',
                period: '/month',
                description: 'For the whole family',
                features: ['4K/8K Streaming', 'Unlimited Streams', '1000+ Channels', '24/7 Premium Support', 'Ad-Free Experience', 'Parental Controls', 'Multi-Profile'],
                popular: false,
              },
            ].map((plan, idx) => (
              <div key={idx} className={`rounded-xl border transition-all ${plan.popular ? 'border-primary bg-card/50 ring-2 ring-primary/20 md:scale-105' : 'border-border bg-card hover:border-primary/50'}`}>
                <div className="p-8 space-y-6">
                  {plan.popular && (
                    <div className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary font-medium">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <Link href="/sign-up" className="block">
                    <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-blue-600' : 'bg-card border border-border hover:border-primary'}`}>
                      Get Started
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur" />
          
          <div className="relative p-12 md:p-20 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to Start Streaming?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join millions of users enjoying unlimited entertainment. Your first month is on us!
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-primary hover:bg-blue-600 text-white">
                Start Your Free Trial Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Get in Touch with Support
              </h2>
              <p className="text-lg text-muted-foreground">
                Have questions about our packages or need help getting started? Fill out the form, and you'll be redirected to chat with our support agent instantly on WhatsApp.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30 shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Instant WhatsApp Chat</h4>
                  <p className="text-muted-foreground text-sm">No waiting on hold. Connect directly with support on WhatsApp.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/30 shrink-0">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Safe & Secure Support</h4>
                  <p className="text-muted-foreground text-sm">We handle your data privately and securely.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/30 shrink-0">
                  <Tv className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">24/7 Availability</h4>
                  <p className="text-muted-foreground text-sm">Our support team is available around the clock to assist you.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="relative rounded-2xl border border-border bg-card/45 p-8 shadow-xl backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 rounded-2xl pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium text-white block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    disabled={isPending}
                    className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-white block">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    disabled={isPending}
                    className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-white block">
                  Description of Purpose
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us what you need help with (e.g. package issues, device setup)..."
                    disabled={isPending}
                    className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-950/20 p-3 rounded-lg border border-green-800/30 animate-in fade-in slide-in-from-top-1">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Submission successful! Opening WhatsApp chat...</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all animate-none"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Submission...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 text-white fill-white/10" />
                    Send to WhatsApp
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Tv className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">StreamFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">Premium IPTV Entertainment Platform</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">FAQ</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#contact" className="hover:text-foreground transition">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 StreamFlow. All rights reserved. Premium IPTV Entertainment.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

