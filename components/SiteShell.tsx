import 'css/tailwind.css'

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import AnalyticsEvents from '@/components/AnalyticsEvents'
import siteMetadata from '@/data/siteMetadata'
import { Locale, htmlLang } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'
import { ThemeProviders } from '../app/theme-providers'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

// Shared <html> shell for both locale root layouts, which only add their own metadata.
export default function SiteShell({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const t = dictionary[locale]
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={htmlLang[locale]}
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
            {t.skipToContent}
          </a>
          <div className="site-shell">
            <Sidebar locale={locale} />
            <div className="site-content">
              <Header locale={locale} />
              <main id="main-content" tabIndex={-1}>
                {children}
              </main>
              <Footer locale={locale} />
            </div>
          </div>
        </ThemeProviders>
      </body>
    </html>
  )
}
