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

export function LoginForm({ className, actionClassName, mutedClassName }: Props) {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Please enter your email and password.' })
      return
    }
    try {
      await login(email.trim(), password)
      toast({ title: 'Welcome back', description: 'You are signed in.' })
      router.push('/listings')
      router.refresh()
    } catch {
      toast({ title: 'Sign in failed', description: 'Please try again.', variant: 'destructive' })
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="login-email" className="text-[#0d2818]">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          className="h-12 rounded-lg border-[#b8dfd4] bg-white px-4 text-sm text-[#013220] placeholder:text-[#2d4a42]/50"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-4 grid gap-2">
        <Label htmlFor="login-password" className="text-[#0d2818]">Password</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="h-12 rounded-lg border-[#b8dfd4] bg-white px-4 text-sm text-[#013220] placeholder:text-[#2d4a42]/50"
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
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>
      <div className={`mt-6 flex items-center justify-between text-sm ${mutedClassName}`}>
        <Link href="/forgot-password" className="text-[#2d4a42] hover:text-[#013220] hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#0a5c4a] hover:underline">
          <Sparkles className="h-4 w-4 text-[#66C2B2]" />
          Create account
        </Link>
      </div>
    </form>
  )
}
