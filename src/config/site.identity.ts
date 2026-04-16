export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'if7m2q9x4v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Info Platforms',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Reports, articles, and resource publishing',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A clean publication platform for articles, insights, and downloadable PDF resources.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'infoplatforms.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://infoplatforms.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

