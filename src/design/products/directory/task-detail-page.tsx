import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#e7e7e7] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <div className="h-44 w-full bg-[#1e1e1e]" />
      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-950">
          Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
          <div className="overflow-hidden border border-black bg-[#d4d4d4] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <div className="border-b border-[#c7c7c7] bg-[#f0f0f0] px-4 py-5 text-center">
              <h1 className="text-3xl font-semibold leading-tight text-black">{post.title}</h1>
              <p className="mt-1 text-sm text-black/80">{category || taskLabel}</p>
            </div>
            <div className="relative h-[320px] overflow-hidden bg-[#d4d4d4]">
              <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
            </div>
            <div className="divide-y divide-[#b2b2b2] border-t border-[#b2b2b2] bg-[#d4d4d4]">
              {phone ? (
                <div className="flex items-center gap-3 px-4 py-3 text-lg">
                  <Phone className="h-5 w-5 text-black" />
                  <span className="text-black">Mobile</span>
                  <span className="ml-auto font-medium text-black">{phone}</span>
                </div>
              ) : null}
              {email ? (
                <div className="flex items-center gap-3 px-4 py-3 text-lg">
                  <Mail className="h-5 w-5 text-black" />
                  <span className="text-black">Email</span>
                  <a href={`mailto:${email}`} className="ml-auto break-all text-sm text-black underline">{email}</a>
                </div>
              ) : null}
              {website ? (
                <div className="flex items-center gap-3 px-4 py-3 text-lg">
                  <Globe className="h-5 w-5 text-black" />
                  <span className="text-black">Website</span>
                  <a href={website} target="_blank" rel="noreferrer" className="ml-auto break-all text-sm text-black underline">{website}</a>
                </div>
              ) : null}
              {location ? (
                <div className="flex items-center gap-3 px-4 py-3 text-lg">
                  <MapPin className="h-5 w-5 text-black" />
                  <span className="text-black">Address</span>
                  <span className="ml-auto max-w-[200px] text-right text-base text-black">{location}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <div className="bg-black p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-2xl font-semibold">About</p>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
              <RichContent
                html={descriptionHtml}
                className="mt-5 max-w-3xl text-base leading-8 text-white/90 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-white"
              />
              {highlights.length ? (
                <ul className="mt-6 space-y-2">
                  {highlights.slice(0, 5).map((item) => (
                    <li key={item} className="text-sm text-white/85">- {item}</li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                <Link href={taskRoute} className="inline-flex items-center gap-2 border border-white/60 px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black">Browse more</Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden border border-black bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                <div className="border-b border-slate-200 px-4 py-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[300px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-400 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 border border-slate-500 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
