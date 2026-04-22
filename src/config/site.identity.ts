export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'v4ov52ojwy',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Mudatealaweb',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Search & browse local listings',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Discover local businesses, services, and offers—photo-first listings, categories, and easy contact.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'mudatealaweb.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mudatealaweb.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

