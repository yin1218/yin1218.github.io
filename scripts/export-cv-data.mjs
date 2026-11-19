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
      import * as zhAcademic from './data/zh/academicData'
      import { publications as zhPublications } from './data/zh/publications'
      import zhProjects from './data/zh/projectsData'
      const zh = {
        academic: { ...zhAcademic, publications: zhPublications, selfName: academic.selfName },
        projects: zhProjects,
      }
      export { academic, projects, profile, zh }
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
