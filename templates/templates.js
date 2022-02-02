import path, { dirname } from "path"

import { fileURLToPath } from "url"
import fs from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getTemplateString = (templateFileName) => {
  const TEMPLATE_FILE_PATH = path.resolve(__dirname, templateFileName)
  const buffer = fs.readFileSync(TEMPLATE_FILE_PATH)
  return buffer.toString()
}

const changeLogTemplate = getTemplateString("changeLogTemplate.txt")
const deploySummaryTemplate = getTemplateString("deploySummary.txt")
const browserAgentTemplate = getTemplateString("browserAgent.txt")

export { changeLogTemplate, deploySummaryTemplate, browserAgentTemplate }
