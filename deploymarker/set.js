import { getErrorResponse, settings } from "../settings.js"
import { missingSettings, skipMarker } from "./utils.js"

import { makeRequest } from "./post.js"

export const setDeployMarker = async (pluginApi) => {
  const { inputs, utils } = pluginApi
  const { build } = utils

  const errorResponse = getErrorResponse(inputs, build)

  return (
    skipMarker(settings(inputs)) ||
    missingSettings(settings(inputs), errorResponse) ||
    (await makeRequest(pluginApi))
  )
}
