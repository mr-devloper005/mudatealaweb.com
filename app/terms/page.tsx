import { PageShell, listingCardClass } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/lib/site-config"

const sections = [
  {
    title: "The service",
    body: `${SITE_CONFIG.name} provides a directory to discover and publish listings (businesses, services, and related offers). Features may change over time; we will try to give reasonable notice of material changes that affect you.`,
  },
  {
    title: "Your account",
    body: "You are responsible for keeping your login secure and for activity under your account. You must provide accurate information and update listings so visitors are not misled.",
  },
  {
    title: "Listings and content",
    body: "You retain rights to content you upload. You grant us a license to host, display, and promote that content in connection with the directory and related marketing. You must not post illegal, deceptive, hateful, or harmful material.",
  },
  {
    title: "Acceptable use",
    body: "No scraping that overloads the service, no attempts to break security, no spam or manipulative review behavior, and no use of the site in violation of law. We may suspend or remove content or accounts that breach these terms.",
  },
  {
    title: "Disclaimers",
    body: "Listings are provided by third parties; we do not endorse every claim in a profile. The service is provided “as is” to the extent permitted by law. Limitations on liability apply as described in the full terms your counsel may require.",
  },
  {
    title: "Contact",
    body: "For questions about these terms or your account, use the contact options on this site. We will respond as promptly as we can.",
  },
]

export default function TermsPage() {
  return (
    <PageShell
      variant="listing"
      title="Terms of service"
      description={`The rules for using ${SITE_CONFIG.name} as a visitor, lister, or partner.`}
    >
      <Card className={listingCardClass}>
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220]">Terms</Badge>
            <p className="text-xs text-[#2d4a42]">Last updated: April 22, 2026</p>
          </div>
          <p className="text-sm leading-relaxed text-[#2d4a42]">
            By using {SITE_CONFIG.name}, you agree to these terms. They are a summary of common points; your legal team
            may need the complete binding document for your jurisdiction.
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
