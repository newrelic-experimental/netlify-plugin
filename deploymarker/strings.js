import { changeLogTemplate } from "../templates/index.js"
import ejs from "ejs"
import { settings } from "../settings.js"

const revision = (constants, inputs, git, netlifyConfig, packageJson) => {
  const { REVISION_TEMPLATE } = settings(inputs)
  return ejs.render(REVISION_TEMPLATE, {
    constants,
    inputs,
    git,
    netlifyConfig,
    packageJson,
  })
}

const changelog = (git) => {
  return ejs
    .render(changeLogTemplate, { git: git, env: process.env })
    .replace(/\n{3,}/g, "\n\n")
}

const description = (git, constants) => {
  return `Deploying "${
    git.commits[0].message ? git.commits[0].message : process.env.COMMIT_REF
  }" from branch ${
    process.env.BRANCH
  } to ${process.env.CONTEXT.toUpperCase()} for site ${
    process.env.SITE_NAME
  } on Netlify v${constants.NETLIFY_BUILD_VERSION}`
}

export { revision, changelog, description }
