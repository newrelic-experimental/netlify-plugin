import { getErrorResponse, settings } from "../settings.js"

import { injectBrowserMonitoring } from "../browserMonitoring/index.js"
import { recordEvent } from "./record.js"
import { setDeployMarker } from "../deploymarker/set.js"

export const onPostBuild = async (pluginApi) => {
  const { constants, inputs, utils } = pluginApi
  const { build } = utils

  const { SKIP_POST_BUILD_EVENT } = settings(inputs)

  const errorResponse = getErrorResponse(inputs, build)

  if (!constants.IS_LOCAL) {
    const eventRecordingResponse = await recordEvent({
      isEnabled: !SKIP_POST_BUILD_EVENT,
      eventName: "onPostBuild",
      settings: settings(inputs),
      constants,
      errorResponse,
    })

    if (eventRecordingResponse) {
      return eventRecordingResponse
    }

    await injectBrowserMonitoring(pluginApi)
    await setDeployMarker(pluginApi)
  }
}
