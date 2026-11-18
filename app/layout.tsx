import 'css/tailwind.css'

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import AnalyticsEvents from '@/components/AnalyticsEvents'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { genPageMetadata, pageSEO, absoluteUrl } from './seo'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  ...genPageMetadata({ ...pageSEO.home, absoluteTitle: true }),
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: pageSEO.home.title,
    template: `%s | ${siteMetadata.title}`,
  },
  applicationName: siteMetadata.title,
  authors: [{ name: siteMetadata.author, url: absoluteUrl('/about') }],
  creator: siteMetadata.author,
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="icon" type="image/svg+xml" href={`${basePath}/static/favicons/favicon.svg`} />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#93442f"
      />
      <meta name="msapplication-TileColor" content="#93442f" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <AnalyticsEvents />
          <a className="skip-to-content" href="#main-content">
            Skip to content
          </a>
          <div className="site-shell">
            <Sidebar />
            <div className="site-content">
              <Header />
              <main id="main-content" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProviders>
      </body>
    </html>
  )
}
