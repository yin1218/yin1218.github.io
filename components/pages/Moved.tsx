import Link from '@/components/Link'
import { Locale, localizePath } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'

// A retired address that forwards to its new home (a meta refresh, because the site is static).
export default function MovedPage({
  locale,
  to,
  label,
}: {
  locale: Locale
  to: string
  label: string
}) {
  return (
    <div className="academic-document">
      <meta httpEquiv="refresh" content={`0; url=${localizePath(to, locale)}`} />
      <h1>{dictionary[locale].moved.heading}</h1>
      <p className="document-intro">
        <Link href={to}>{label}</Link>
      </p>
    </div>
  )
}
