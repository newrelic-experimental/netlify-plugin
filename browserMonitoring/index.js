import { getErrorResponse, settings } from "../settings.js"
import { missingSettings, skipBrowserMonitoring } from "./utils.js"

import { insertBrowserMonitoring } from "./htmlInsertion.js"

export const injectBrowserMonitoring = async (pluginApi) => {
  const { inputs, utils, constants } = pluginApi
  const { build } = utils
  const errorResponse = getErrorResponse(inputs, build)

  return (
    skipBrowserMonitoring(settings(inputs)) ||
    missingSettings(settings(inputs), errorResponse) ||
    (await insertBrowserMonitoring(pluginApi))
  )
}
