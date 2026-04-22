import { PageShell, listingCardClass } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const licenses = [
  { name: "Next.js", description: "MIT License — App framework and server rendering." },
  { name: "React", description: "MIT License — User interface library." },
  { name: "Tailwind CSS", description: "MIT License — Utility-first styling." },
  { name: "Radix UI", description: "MIT License — Accessible primitives for dialogs, accordions, and more." },
  { name: "Lucide", description: "ISC License — Icon set used in the interface." },
]

export default function LicensesPage() {
  return (
    <PageShell
      variant="listing"
      title="Open source & licenses"
      description="We build on a strong open-source stack. Below are acknowledgments for key dependencies that power the listing experience."
    >
      <div className="space-y-6">
        <Card className={listingCardClass}>
          <CardContent className="p-6 sm:p-8">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220]">Notice</Badge>
            <p className="mt-3 text-sm leading-relaxed text-[#2d4a42]">
              This is a high-level list for transparency. Each package is subject to its own license file in{" "}
              <code className="rounded border border-[#c5e0d8] bg-white px-1.5 py-0.5 text-xs text-[#013220]">
                node_modules
              </code>
              . For a full SPDX-style audit, use your standard dependency license tooling.
            </p>
          </CardContent>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          {licenses.map((license) => (
            <Card key={license.name} className={listingCardClass}>
              <CardContent className="p-5">
                <h2 className="text-base font-semibold text-[#013220]">{license.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#2d4a42]">{license.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
