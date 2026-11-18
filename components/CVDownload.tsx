import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function CVDownload({
  className,
  label = 'Download CV (PDF)',
}: {
  className?: string
  label?: string
}) {
  return (
    <Link
      href={`${process.env.BASE_PATH || ''}${siteMetadata.cvPath}`}
      download="Chien-Yin-Wu-CV.pdf"
      className={className}
    >
      {label}
    </Link>
  )
}
