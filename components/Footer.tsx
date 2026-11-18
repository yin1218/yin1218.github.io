import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer id="contact" className="academic-footer">
      <div className="footer-contact">
        <h2>Contact</h2>
        <Link href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</Link>
        <div className="footer-links">
          <Link href={siteMetadata.github}>GitHub</Link>
          <Link href={siteMetadata.linkedin}>LinkedIn</Link>
        </div>
      </div>
      <p>
        © {new Date().getFullYear()} {siteMetadata.author}
      </p>
    </footer>
  )
}
