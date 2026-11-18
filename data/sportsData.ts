// Sports on /blog/sports-and-me. To make a sport clickable, put its photos in
// public/static/images/sports/ and list them here, e.g.
//   { name: 'Bouldering', photos: [{ src: '/static/images/sports/bouldering.jpg', alt: '…' }] }
export interface SportPhoto {
  src: string
  alt: string
  caption?: string
}

export interface Sport {
  name: string
  photos?: SportPhoto[]
}

export const triedSports: Sport[] = [
  { name: 'Running' },
  { name: 'Locking' },
  { name: 'Contact improvisation' },
  { name: 'Kayaking' },
  { name: 'Stand-up paddleboarding' },
  { name: 'Swimming' },
  { name: 'Snorkelling' },
  { name: 'Bouldering' },
  { name: 'Ice climbing' },
  { name: 'Aerial yoga' },
  { name: 'Mat yoga' },
  { name: 'Pilates' },
  { name: 'Fire spinning' },
  { name: 'Pole dance' },
  { name: 'Skating' },
  { name: 'Weight training' },
  { name: 'Gyrotonic' },
  { name: 'Taekwondo' },
  { name: 'Volleyball' },
  { name: 'Badminton' },
  { name: 'Squash' },
  { name: 'Billiards' },
  { name: 'Table tennis' },
  { name: 'Golf' },
  { name: 'Tree climbing' },
  { name: 'Archery' },
  { name: 'Soft tennis' },
  { name: 'Cycling' },
  { name: 'Frisbee' },
  { name: 'Bowling' },
  { name: 'Darts' },
]

export const nextSports: Sport[] = [
  { name: 'Scuba diving' },
  { name: 'Aerial hoop' },
  { name: 'Curling' },
  { name: 'Skateboarding' },
  { name: 'Sanda' },
  { name: 'Dragon boating' },
  { name: 'Dragon and lion dance' },
  { name: 'Fencing' },
  { name: 'Air rifle shooting' },
  { name: 'Skiing' },
  { name: 'Sailing' },
  { name: 'Horse riding' },
  { name: 'Surfing' },
]
