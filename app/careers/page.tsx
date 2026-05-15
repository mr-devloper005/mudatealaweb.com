import Link from "next/link"
import { PageShell, listingCardClass } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/lib/site-config"

const roles = [
  {
    title: "Listings & catalog designer",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    blurb: "Shape card layouts, search filters, and onboarding for businesses publishing on the directory.",
  },
  {
    title: "Frontend engineer (Next.js)",
    location: "Remote, EU or US",
    type: "Full-time",
    level: "Senior",
    blurb: "Ship performant pages for browse, post detail, and lister dashboards in our mint/forest system.",
  },
  {
    title: "Local partnerships lead",
    location: "Remote",
    type: "Part-time",
    level: "Mid",
    blurb: "Onboard orgs, categories, and regional bundles so the catalog stays fresh and well covered.",
  },
]

const benefits = [
  "Remote-first team with clear ownership per lane (listings, search, content)",
  "Stipend for co-working, desk, and learning",
  "Quarterly planning with space for quality and a11y",
  "Bonus tied to growth of verified listings, not generic vanity metrics",
]

export default function CareersPage() {
  return (
    <PageShell
      variant="listing"
      title="Careers"
      description={`Build the product people use to find real businesses and services. ${SITE_CONFIG.name} is listing-led: your work shows up in every search and every card.`}
      actions={
        <Button asChild className="bg-[#66C2B2] text-white hover:bg-[#52b39f]">
          <Link href="/contact">Talk to us</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <Card
              key={role.title}
              className={`${listingCardClass} transition-transform hover:-translate-y-0.5`}
            >
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220]">{role.level}</Badge>
                  <Badge
                    variant="outline"
                    className="border-[#c5e0d8] text-[#2d4a42]"
                  >
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-[#013220]">{role.title}</h2>
                <p className="mt-1 text-sm text-[#2d4a42]">{role.location}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#2d4a42]">{role.blurb}</p>
                <Button
                  variant="outline"
                  className="mt-4 border-[#b8dfd4] bg-white text-[#013220] hover:bg-[#e8f7f3]"
                  asChild
                >
                  <Link href="/contact">View role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={listingCardClass}>
          <CardContent className="p-6 sm:p-8">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220]">Why join</Badge>
            <h3 className="mt-3 text-lg font-semibold text-[#013220]">Why {SITE_CONFIG.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#2d4a42]">
              We are not another generic social feed. The roadmap is about discovery, trust in listings, and great UX for
              people comparing real options in their area.
            </p>
            <div className="mt-4 space-y-2 text-sm text-[#2d4a42]">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-xl border border-[#c5e0d8] bg-[#f0faf7] px-3 py-2.5"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
