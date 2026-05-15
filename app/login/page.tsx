import { Bookmark, Building2, FileText, Image as ImageIcon } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'
import { LoginForm } from '@/components/auth/login-form'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f7faf8] text-[#013220]',
      panel: 'border border-[#b8dfd4] bg-white shadow-[0_20px_50px_rgba(1,50,32,0.08)]',
      side: 'border border-[#8fc9bc]/50 bg-[#e8f7f3] shadow-[0_8px_30px_rgba(1,50,32,0.06)]',
      muted: 'text-[#2d4a42]',
      action: 'bg-[#66C2B2] text-white hover:bg-[#52b39f]',
      icon: Building2,
      title: 'Sign in to manage your listings',
      body: 'Post new listings, update contact details, and keep your public profile consistent — all in one place.',
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
      title: 'Sign in to your publication workspace',
      body: 'Draft, review, and publish long-form work with the calmer reading system intact.',
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
      title: 'Enter the creator workspace',
      body: 'Open your visual feed, creator profile, and publishing tools without dropping into a generic admin shell.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Open your curated collections',
    body: 'Manage saved resources, collection notes, and curator identity from a calmer workspace.',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon
  const sideBullets =
    productKind === 'directory'
      ? [
          'Photo-first listing cards that read like a trusted catalog',
          'Search and categories built for quick scanning',
          'Session remembered on this device for easy return visits',
        ]
      : ['Cleaner product-specific workflows', 'Palette and layout matched to the site family', 'Fewer repeated admin patterns']

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2d4a42]/80">Welcome back</p>
            <p className={`mt-1 text-sm ${config.muted}`}>Your session is saved on this device after you sign in.</p>
            <LoginForm
              className="mt-6 grid gap-0"
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
