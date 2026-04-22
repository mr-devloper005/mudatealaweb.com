import { PageShell, listingCardClass } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "Essential",
    body: "Required for sign-in, session security, and core navigation. These cannot be turned off if you use logged-in features.",
  },
  {
    title: "Preferences",
    body: "Remember your choices: theme where applicable, language, and saved filter defaults on listing browse pages.",
  },
  {
    title: "Analytics",
    body: "Help us see which pages and listing flows are used so we can improve search quality and performance. We use this in aggregate when possible.",
  },
  {
    title: "Managing cookies",
    body: "Your browser can block or delete cookies; doing so may limit account features. For advertising-related signals, use industry opt-out tools if we integrate them in your region.",
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      variant="listing"
      title="Cookie policy"
      description="How we use cookies and local storage to run the directory and improve the experience."
    >
      <Card className={listingCardClass}>
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220]">Cookies</Badge>
            <p className="text-xs text-[#2d4a42]">Last updated: April 22, 2026</p>
          </div>
          <p className="text-sm leading-relaxed text-[#2d4a42]">
            Cookies are small text files stored on your device. We use them to keep the listing catalog fast, safe, and
            tailored to what you have chosen. Below is a plain-language map of the main categories we use.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-[#c5e0d8] bg-[#f0faf7] p-5"
              >
                <h2 className="text-base font-semibold text-[#013220]">{section.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#2d4a42]">{section.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
