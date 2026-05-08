import Link from 'next/link'
import { PageShell, listingCardClass } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Listings & profiles',
    description: 'Create a listing, upload photos, choose a category, and keep contact details and hours up to date.',
  },
  {
    title: 'Search & filters',
    description: 'Use search and category filters to narrow the catalog, then open a card for the full story and contact options.',
  },
  {
    title: 'Accounts & sign-in',
    description: 'Sign in to save progress on drafts, manage your listings, and get support tied to your email.',
  },
  {
    title: 'Trust & quality',
    description: 'We review reports on inaccurate listings and work with owners to keep the directory reliable.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      variant="listing"
      title="Help Center"
      description="Guides for search, listings, and account basics—written for a listing catalog, not a generic social feed."
      actions={
        <Button asChild className="bg-[#66C2B2] text-white hover:bg-[#52b39f]">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Card
              key={topic.title}
              className={`${listingCardClass} transition-transform hover:-translate-y-0.5`}
            >
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#013220]">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#2d4a42]">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={listingCardClass}>
          <CardContent className="p-6">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220]">FAQ</Badge>
            <p className="mt-2 text-sm text-[#2d4a42]">Short answers to common questions about listings and search.</p>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#c5e0d8]">
                  <AccordionTrigger className="text-left text-[#013220] hover:text-[#0a5c4a]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#2d4a42]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
