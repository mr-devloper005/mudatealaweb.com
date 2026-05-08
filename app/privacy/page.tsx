import { PageShell, listingCardClass } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const sections = [
  {
    title: "Data we collect",
    body: "We collect information you provide when you create an account, publish a listing, or contact us: name, email, business details, and media you upload. We also receive technical data such as device type, browser, and approximate location when you use the site, plus usage signals that help us improve search and fix errors.",
  },
  {
    title: "Listings and public content",
    body: "Content you add to a listing (descriptions, photos, categories) may be shown publicly in the directory and in search. You control what you publish; avoid sharing sensitive data you do not want visitors to see.",
  },
  {
    title: "How we use data",
    body: "We use your data to run the service: authenticate you, show listings, personalize rankings where applicable, send transactional messages, prevent abuse, and understand aggregate usage. We do not sell your personal information.",
  },
  {
    title: "Cookies and similar technologies",
    body: "We use cookies and local storage for sign-in, preferences, and analytics. See the Cookie policy for types and choices.",
  },
  {
    title: "Retention and deletion",
    body: "We keep account and listing data as long as your account is active or as needed to provide the service. You may request deletion of your account subject to legal or security exceptions.",
  },
  {
    title: "Your choices",
    body: "You can update profile and listing information in your account, opt out of marketing email where offered, and contact us to exercise access or deletion requests in line with applicable law.",
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      variant="listing"
      title="Privacy policy"
      description="How we handle information for accounts, listings, and visitors who browse the directory."
    >
      <Card className={listingCardClass}>
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220]">Directory</Badge>
            <p className="text-xs text-[#2d4a42]">Last updated: April 22, 2026</p>
          </div>
          <p className="text-sm leading-relaxed text-[#2d4a42]">
            This policy describes how we collect, use, and protect information when you use our listing platform. It is
            written for clarity; if you need a specific term defined for your region, contact us and we will help.
          </p>
          <div className="space-y-4">
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
