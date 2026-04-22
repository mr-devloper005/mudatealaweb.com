import Link from "next/link"
import { Building2, Mail, MapPin, Phone } from "lucide-react"
import { PageShell, listingCardClass } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SITE_CONFIG } from "@/lib/site-config"
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from "@/overrides/contact-page"

const highlights = [
  { label: "Listings in the catalog", value: "8.6k+" },
  { label: "Typical reply time", value: "< 24h" },
  { label: "Ways to reach us", value: "3" },
]

const topics = [
  {
    title: "Listings & onboarding",
    description:
      "Add or update a listing, verification, photos, and business details so visitors see you clearly in the directory.",
  },
  {
    title: "Partnerships & growth",
    description: "Talk through bulk publishing, local coverage, and how we can shape the catalog for your market.",
  },
  {
    title: "Coverage & categories",
    description: "Request a new geography, category, or filter so the right people find the right listings.",
  },
]

const direct = [
  { icon: Mail, label: "Email", value: `hello@${SITE_CONFIG.domain}` },
  { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" },
  { icon: MapPin, label: "Office", value: "Remote-first · worldwide" },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <PageShell
      variant="listing"
      title="Contact us"
      description={`Questions about listings, partnerships, or coverage? Tell us what you need—we route every message to the right lane for ${SITE_CONFIG.name}.`}
      actions={
        <>
          <Button
            variant="outline"
            className="border-[#b8dfd4] bg-white text-[#013220] hover:bg-[#e8f7f3]"
            asChild
          >
            <Link href="/about">About</Link>
          </Button>
          <Button asChild className="bg-[#66C2B2] text-white hover:bg-[#52b39f]">
            <Link href="/listings">Browse listings</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={listingCardClass}>
          <CardContent className="space-y-4 p-6">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] font-normal text-[#013220] hover:bg-[#d8f0e9]">
              <Building2 className="mr-1 inline h-3.5 w-3.5" />
              Get in touch
            </Badge>
            <h2 className="text-2xl font-semibold text-[#013220]">A real team behind the listing catalog</h2>
            <p className="text-sm text-[#2d4a42]">
              Whether you are listing a business, growing in a new area, or fixing a detail on your page, we will point you
              to the right next step—no generic queue.
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
          {topics.map((topic) => (
            <Card
              key={topic.title}
              className={`${listingCardClass} transition-transform hover:-translate-y-0.5`}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#013220]">{topic.title}</h3>
                <p className="mt-2 text-sm text-[#2d4a42]">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className={listingCardClass}>
          <CardContent className="p-6 sm:p-8">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220]">Send a message</Badge>
            <h2 className="mt-3 text-xl font-semibold text-[#013220]">We will respond with a clear next step</h2>
            <p className="mt-2 text-sm text-[#2d4a42]">
              Include your listing URL or business name if you already publish with us—it speeds things up.
            </p>
            <form className="mt-6 grid gap-4" action="#" method="post">
              <div className="grid gap-2">
                <Label htmlFor="contact-name" className="text-[#2d4a42]">Name</Label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  className="h-11 border-[#c5e0d8] bg-white focus-visible:ring-[#66C2B2]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email" className="text-[#2d4a42]">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-11 border-[#c5e0d8] bg-white focus-visible:ring-[#66C2B2]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-subject" className="text-[#2d4a42]">Topic</Label>
                <Input
                  id="contact-subject"
                  name="subject"
                  placeholder="e.g. Listing update, new category…"
                  className="h-11 border-[#c5e0d8] bg-white focus-visible:ring-[#66C2B2]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-body" className="text-[#2d4a42]">Message</Label>
                <Textarea
                  id="contact-body"
                  name="message"
                  placeholder="What do you need help with? The more context, the better we can help."
                  className="min-h-[160px] resize-y border-[#c5e0d8] bg-white focus-visible:ring-[#66C2B2]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#66C2B2] text-white hover:bg-[#52b39f] sm:w-auto"
              >
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {direct.map((row) => (
            <Card key={row.label} className={listingCardClass}>
              <CardContent className="flex items-start gap-3 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#b8dfd4] bg-[#e8f7f3]">
                  <row.icon className="h-5 w-5 text-[#013220]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#2d4a42]">{row.label}</p>
                  <p className="mt-1 text-sm font-medium text-[#013220]">{row.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
