'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  className?: string
  actionClassName: string
  mutedClassName: string
}

export function RegisterForm({ className, actionClassName, mutedClassName }: Props) {
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Name, email, and password are required.' })
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      toast({ title: 'Account created', description: 'You are now signed in.' })
      router.push('/listings')
      router.refresh()
    } catch {
      toast({ title: 'Sign up failed', description: 'Please try again.', variant: 'destructive' })
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="reg-name" className="text-[#0d2818]">Full name</Label>
        <Input
          id="reg-name"
          name="name"
          autoComplete="name"
          className="h-12 rounded-lg border-[#b8dfd4] bg-white px-4 text-sm text-[#013220]"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-4 grid gap-2">
        <Label htmlFor="reg-email" className="text-[#0d2818]">Email</Label>
        <Input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          className="h-12 rounded-lg border-[#b8dfd4] bg-white px-4 text-sm text-[#013220]"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-4 grid gap-2">
        <Label htmlFor="reg-password" className="text-[#0d2818]">Password</Label>
        <Input
          id="reg-password"
          name="password"
          type="password"
          autoComplete="new-password"
          className="h-12 rounded-lg border-[#b8dfd4] bg-white px-4 text-sm text-[#013220]"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className={`mt-6 h-12 w-full rounded-lg text-sm font-semibold shadow-md ${actionClassName}`}
      >
        {isLoading ? 'Creating…' : 'Create account'}
      </Button>
      <div className={`mt-6 flex items-center justify-between text-sm ${mutedClassName}`}>
        <span>Already have an account?</span>
        <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#0a5c4a] hover:underline">
          <Sparkles className="h-4 w-4 text-[#66C2B2]" />
          Sign in
        </Link>
      </div>
    </form>
  )
}
