import Link from "next/link"
import { PageShell, listingCardClass } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/lib/site-config"

const highlights = [
  { label: "Active listings", value: "8.6k+" },
  { label: "Cities on the map", value: "120+" },
  { label: "Avg. response (contact)", value: "< 24h" },
]

const values = [
  {
    title: "Listings you can trust",
    description: "Clear photos, categories, and contact paths so visitors know what they are getting before they reach out.",
  },
  {
    title: "Built to scan fast",
    description: "A forest-and-mint layout with large cards and less noise—made for comparison and local discovery.",
  },
  {
    title: "Support that fits the product",
    description: "Questions about your listing, coverage, or partnerships go to the right team without a generic queue.",
  },
]

export default function AboutPage() {
  return (
    <PageShell
      variant="listing"
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a listing-first directory: photo-led cards, search, and categories for local businesses, services, and offers.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/team">Directory team</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={listingCardClass}>
          <CardContent className="space-y-4 p-6">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220] hover:bg-[#d8f0e9]">Our story</Badge>
            <h2 className="text-2xl font-semibold text-[#013220]">One catalog for local discovery</h2>
            <p className="text-sm leading-relaxed text-[#2d4a42]">
              We built {SITE_CONFIG.name} for people who want to find and compare real businesses and services without
              wading through unrelated content. Listings are the main event—articles and other formats stay out of the
              way unless you need them.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#c5e0d8] bg-[#f0faf7] p-4"
                >
                  <div className="text-2xl font-semibold text-[#013220]">{item.value}</div>
                  <div className="text-xs text-[#2d4a42]">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className={listingCardClass}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#013220]">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2d4a42]">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </PageShell>
  )
}
