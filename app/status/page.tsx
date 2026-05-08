import { PageShell, listingCardClass } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const services = [
  { name: "Web app & directory", status: "Operational", note: "Listing browse, post pages, and auth" },
  { name: "Search & index", status: "Operational", note: "Query API and post filters" },
  { name: "Media CDN", status: "Operational", note: "Images and attachments for listings" },
]

const incidents = [
  { date: "Apr 2, 2026", title: "Elevated image load times in EU", status: "Resolved" },
  { date: "Mar 12, 2026", title: "Delayed notifications", status: "Resolved" },
  { date: "Feb 22, 2026", title: "Search indexing lag", status: "Resolved" },
]

export default function StatusPage() {
  return (
    <PageShell
      variant="listing"
      title="System status"
      description="Uptime and recent incidents for the catalog, search, and media delivery—aligned with the same product surface as the home page."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className={listingCardClass}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#013220]">{service.name}</h2>
                <Badge
                  className="mt-3 border-[#b8dfd4] bg-[#e8f7f3] text-[#013220] hover:bg-[#d8f0e9]"
                >
                  {service.status}
                </Badge>
                <p className="mt-2 text-xs text-[#2d4a42]">{service.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={listingCardClass}>
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-[#013220]">Incident history</h3>
            <p className="mt-1 text-sm text-[#2d4a42]">Past events affecting discovery or publish flows.</p>
            <div className="mt-4 space-y-3">
              {incidents.map((incident) => (
                <div
                  key={incident.title}
                  className="rounded-xl border border-[#c5e0d8] bg-[#f0faf7] px-4 py-3"
                >
                  <div className="text-xs text-[#2d4a42]">{incident.date}</div>
                  <div className="text-sm font-medium text-[#013220]">{incident.title}</div>
                  <div className="text-xs text-[#2d4a42]">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
