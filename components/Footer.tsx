import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="academic-footer">
      <p>
        © {new Date().getFullYear()} {siteMetadata.author}
      </p>
      <Link href={`mailto:${siteMetadata.email}`}>Contact</Link>
    </footer>
  )
}
