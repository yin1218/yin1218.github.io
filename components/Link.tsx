/* eslint-disable jsx-a11y/anchor-has-content */
'use client'

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { localizePath } from '@/data/i18n'
import { useLocale } from './useLocale'

type Props = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    analyticsResource?: string
  }

function analyticsDetails(href: string) {
  if (href.startsWith('mailto:')) return { event: 'contact_click', resource: 'email' }
  // Both languages' PDFs count as the same resource.
  if (/\/chien-yin-wu-cv(-zh)?\.pdf$/.test(href)) return { event: 'cv_download', resource: 'cv' }
  if (href.endsWith('/beyond-adaptation.bib')) {
    return { event: 'citation_download', resource: 'beyond-adaptation' }
  }
  if (href.startsWith('https://doi.org/') || href.startsWith('https://dl.acm.org/doi/')) {
    return { event: 'paper_open', resource: 'beyond-adaptation' }
  }
  if (/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(href)) {
    return { event: 'demo_open', resource: 'project-demo' }
  }
  if (href.startsWith('/publications/')) {
    return { event: 'research_open', resource: href.split('/')[2] }
  }
  if (href.startsWith('/blog/')) return { event: 'essay_open', resource: href.split('/')[2] }
}

const CustomLink = ({ href, analyticsResource, ...rest }: Props) => {
  const locale = useLocale()
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  // Analytics use the un-prefixed href so event names do not change with the language.
  const details = analyticsDetails(href)
  const analytics = details
    ? {
        'data-analytics-event': details.event,
        'data-analytics-resource': analyticsResource || details.resource,
      }
    : {}

  if (rest.download || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return <a className="break-words" href={href} {...analytics} {...rest} />
  }

  if (isInternalLink) {
    // Internal pages stay in the current language; files under /static are shared.
    // Files are plain anchors: next/link would prefetch them as routes and log a 404.
    if (href.includes('/static/')) {
      return <a className="break-words" href={href} {...analytics} {...rest} />
    }
    const target = localizePath(href, locale)
    return <Link className="break-words" href={target} {...analytics} {...rest} />
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />
  }

  return (
    <a
      className="break-words"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...analytics}
      {...rest}
    />
  )
}

export default CustomLink
