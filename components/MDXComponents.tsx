import type { MDXComponents } from 'mdx/types'
import BeyondResearch from './BeyondResearch'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

export const components: MDXComponents = {
  BeyondResearch,
  Image,
  a: CustomLink,
  table: TableWrapper,
}
