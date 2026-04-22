import { Bookmark, Building2, FileText, Image as ImageIcon } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { RegisterForm } from '@/components/auth/register-form'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f7faf8] text-[#013220]',
      panel: 'border border-[#b8dfd4] bg-white shadow-[0_20px_50px_rgba(1,50,32,0.08)]',
      side: 'border border-[#8fc9bc]/50 bg-[#e8f7f3] shadow-[0_8px_30px_rgba(1,50,32,0.06)]',
      muted: 'text-[#2d4a42]',
      action: 'bg-[#66C2B2] text-white hover:bg-[#52b39f]',
      icon: Building2,
      title: 'Create your listing account',
      body: 'Join to publish and manage listings with clear photos, categories, and contact details — the same clean style buyers see in the catalog.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, issue drafts, editorial review, and publication scheduling.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon
  const sideBullets =
    productKind === 'directory'
      ? [
          'Listing-first layout: big images, bold titles, trust cues',
          'Mint accent actions for “add” and “view” like a modern catalog',
          'Sign-in state saved in your browser for this device',
        ]
      : ['Different onboarding per product family', 'No repeated one-size-fits-all shell', 'Profile, publishing, and discovery aligned']

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-3">
              {sideBullets.map((item) => (
                <div
                  key={item}
                  className={`flex items-start gap-3 rounded-xl border border-current/10 px-4 py-3 text-sm ${
                    productKind === 'directory' ? 'bg-white/60' : ''
                  }`}
                >
                  {productKind === 'directory' ? (
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#66C2B2] text-xs font-bold text-white">
                      ✓
                    </span>
                  ) : null}
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2d4a42]/80">Create account</p>
            <p className={`mt-1 text-sm ${config.muted}`}>
              You will be signed in right away; we store your profile locally in this browser.
            </p>
            <RegisterForm
              className="mt-6"
              actionClassName={config.action}
              mutedClassName={config.muted}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
