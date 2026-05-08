"use client"

import { useState } from "react"
import Image from "next/image"
import { PageShell, listingCardClass } from "@/components/shared/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { mockPressAssets, mockPressCoverage } from "@/data/mock-data"

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      variant="listing"
      title="Press & media"
      description="Logos, screenshots, and stories for anyone covering the listing directory and local discovery on our platform."
      actions={
        <Button
          className="bg-[#66C2B2] text-white hover:bg-[#52b39f]"
          onClick={() =>
            toast({ title: "Request received", description: "We will send the full press pack to your email." })
          }
        >
          Request press pack
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={listingCardClass}>
          <CardContent className="space-y-3 p-6 sm:p-8">
            <Badge className="border-[#b8dfd4] bg-[#e8f7f3] text-[#013220]">Press kit</Badge>
            <h2 className="text-lg font-semibold text-[#013220]">Assets for media use</h2>
            <p className="text-sm leading-relaxed text-[#2d4a42]">
              Download or preview brand marks, product views, and short guidance for how we talk about listings, search,
              and the catalog experience.
            </p>
            <div className="grid gap-2">
              {mockPressAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-xl border border-[#c5e0d8] bg-[#f0faf7] px-4 py-3"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#013220]">{asset.title}</p>
                      <p className="text-xs text-[#2d4a42]">{asset.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="border-[#b8dfd4] bg-white text-[#013220]">{asset.fileType}</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#b8dfd4] bg-white"
                        onClick={() => setActiveAssetId(asset.id)}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#66C2B2] text-white hover:bg-[#52b39f]"
                        onClick={() =>
                          toast({
                            title: "Download started",
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {mockPressCoverage.map((item) => (
            <Card
              key={item.id}
              className={`${listingCardClass} transition-transform hover:-translate-y-1`}
            >
              <CardContent className="p-6">
                <div className="text-xs uppercase tracking-wide text-[#2d4a42]">{item.outlet}</div>
                <p className="mt-2 text-sm text-[#013220]">{item.headline}</p>
                <p className="mt-2 text-xs text-[#2d4a42]">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#b8dfd4]">
          <DialogHeader>
            <DialogTitle className="text-[#013220]">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[#b8dfd4] bg-[#e8f7f3]">
              <Image
                src={activeAsset.previewUrl}
                alt={activeAsset.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <p className="text-sm text-[#2d4a42]">{activeAsset?.description}</p>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-[#b8dfd4] bg-white"
              onClick={() => setActiveAssetId(null)}
            >
              Close
            </Button>
            <Button
              className="bg-[#66C2B2] text-white hover:bg-[#52b39f]"
              onClick={() =>
                toast({
                  title: "Download started",
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
