import { recordEvent } from "./record.js"
import { settings } from "../settings.js"

export const onError = async (pluginApi) => {
  const { constants, inputs, utils } = pluginApi
  const { build } = utils

  const { SKIP_ERROR_EVENT } = settings(inputs)

  if (!constants.IS_LOCAL) {
    const eventRecordingResponse = await recordEvent({
      isEnabled: !SKIP_ERROR_EVENT,
      eventName: "onError",
      errorResponse: build.failPlugin, // We can't fail build if it's already failed
      settings: settings(inputs),
      constants,
    })

    if (eventRecordingResponse) {
      return eventRecordingResponse
    }
  }
}
