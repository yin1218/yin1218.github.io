import { buildSync } from 'esbuild'
import Module from 'node:module'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const result = buildSync({
  stdin: {
    contents: `
      import * as academic from './data/academicData'
      import projects from './data/projectsData'
      import profile from './data/siteMetadata'
      export { academic, projects, profile }
    `,
    resolveDir: root,
    sourcefile: 'cv-data.ts',
  },
  bundle: true,
  platform: 'node',
  format: 'cjs',
  write: false,
})
const compiled = new Module('cv-data')
compiled._compile(result.outputFiles[0].text, `${root}/cv-data.cjs`)
process.stdout.write(JSON.stringify(compiled.exports))
