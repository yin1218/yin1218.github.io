/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import styled from 'styled-components'

const NavLink = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  const Button = styled.a`
    color: gray;
    z-index: 2;
    &:hover {
      color: black;
      cursor: crosshair;
      background: #eeeeee;
      transition-duration: 0.1s;
      transition-timing-function: ease-out;
    }
  `

  if (isInternalLink) {
    return (
      <Link href={href}>
        <Button {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return (
    <>
      <Button target="_blank" rel="noopener noreferrer" href={href} {...rest} />
      {/* < custumCurser/> */}
    </>
  )
}

export default NavLink
