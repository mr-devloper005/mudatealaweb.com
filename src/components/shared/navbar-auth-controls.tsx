'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="hidden h-10 gap-1 rounded-full bg-[#66C2B2] px-4 text-white shadow-[0_12px_24px_rgba(102,194,178,0.35)] hover:bg-[#52b39f] sm:flex"
          >
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border border-[#b8dfd4] bg-white shadow-lg">
          {SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full text-white/90 ring-2 ring-[#66C2B2]/40 hover:bg-white/10" aria-label="Account menu with sign out">
            <Avatar className="h-9 w-9 border-2 border-[#66C2B2]">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-[#1a3d2e] text-white">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border border-[#b8dfd4] bg-white">
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-10 w-10 border border-[#66C2B2]">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-[#e8f7f3] text-[#013220]">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex flex-col">
              <span className="truncate text-sm font-medium text-[#013220]">{user?.name}</span>
              <span className="truncate text-xs text-[#2d4a42]">{user?.email}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              logout()
            }}
            className="mx-1 mb-1 cursor-pointer justify-center gap-2 border border-[#b8dfd4] bg-[#f0faf7] font-semibold text-[#013220] focus:bg-[#e8f7f3] data-[highlighted]:bg-[#e8f7f3]"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
