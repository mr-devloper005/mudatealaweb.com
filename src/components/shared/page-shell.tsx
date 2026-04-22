'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { cn } from '@/lib/utils'

/** Card surface aligned with the home page (forest / mint listing theme). */
export const listingCardClass =
  'rounded-2xl border border-[#b8dfd4] bg-white shadow-[0_12px_36px_rgba(1,50,32,0.06)]'

export function PageShell({
  title,
  description,
  actions,
  children,
  variant = 'default',
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  /** Matches the listing home palette: soft green page, mint hero band. */
  variant?: 'default' | 'listing'
}) {
  const listing = variant === 'listing'

  return (
    <div className={cn('min-h-screen', listing ? 'bg-[#f7faf8] text-[#013220]' : 'bg-background')}>
      <NavbarShell />
      <main>
        <section
          className={cn(
            listing
              ? 'border-b border-[#b8dfd4] bg-[linear-gradient(180deg,#e0f2ec_0%,#f7faf8_100%)]'
              : 'border-b border-border bg-secondary/30',
          )}
        >
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1
                  className={cn(
                    'text-3xl font-bold tracking-tight',
                    listing ? 'text-[#013220]' : 'text-foreground',
                  )}
                >
                  {title}
                </h1>
                {description && (
                  <p
                    className={cn(
                      'mt-2 max-w-2xl text-sm leading-relaxed',
                      listing ? 'text-[#2d4a42]' : 'text-muted-foreground',
                    )}
                  >
                    {description}
                  </p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
