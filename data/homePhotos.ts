// Photographs shown when a visitor presses the shutter on the home-page portrait.
// Put files in public/static/images/photos/ and set `src`; an entry without `src`
// renders as a placeholder frame.
export interface HomePhoto {
  src?: string
  alt: string
  caption: string
}

export const homePhotos: HomePhoto[] = [
  { alt: 'Placeholder for a photograph', caption: 'Photo to come' },
  { alt: 'Placeholder for a photograph', caption: 'Photo to come' },
  { alt: 'Placeholder for a photograph', caption: 'Photo to come' },
]

export const photoAccount = { label: '@wpbag.jpg', href: 'https://www.instagram.com/wpbag.jpg/' }
