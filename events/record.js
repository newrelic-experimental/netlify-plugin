import axios from "axios"
import { deploySummaryResults } from "../results.js"

export const recordEvent = async (eventData) => {
  const { isEnabled, eventName, settings, constants, errorResponse } = eventData

  const {
    NEWRELIC_ACCOUNT_ID,
    NEWRELIC_INGEST_LICENSE_KEY,
    IS_PREVIEW,
    RECORD_EVENTS_FOR_PREVIEWS,
  } = settings

  if (isEnabled) {
    if (IS_PREVIEW && !RECORD_EVENTS_FOR_PREVIEWS) {
      console.log(`Not recording ${eventName} event. Deploy preview.`)
      return
    } else {
      if (!NEWRELIC_ACCOUNT_ID) {
        return errorResponse(
          `Recording ${eventName} event enabled, but NEWRELIC_ACCOUNT_ID is not set`
        )
      }
      if (!NEWRELIC_INGEST_LICENSE_KEY) {
        return errorResponse(
          `Recording ${eventName} event enabled, but NEWRELIC_INGEST_LICENSE_KEY is not set`
        )
      }

      try {
        const response = await axios({
          url: `https://insights-collector.newrelic.com/v1/accounts/${NEWRELIC_ACCOUNT_ID}/events`,
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Api-Key": NEWRELIC_INGEST_LICENSE_KEY,
          },
          data: [
            {
              eventType: `Netlify:${eventName}`,
              siteId: process.env.SITE_ID,
              siteName: process.env.SITE_NAME,
              commitRef: process.env.COMMIT_REF,
              buildId: process.env.BUILD_ID,
              deployId: process.env.DEPLOY_ID,
              branch: process.env.BRANCH,
              context: process.env.CONTEXT,
              deployUrl: process.env.DEPLOY_URL,
              repositoryUrl: process.env.REPOSITORY_URL,
              netlifyBuildVersion: constants.NETLIFY_BUILD_VERSION,
            },
          ],
        })

        if (response.status == 200 && response.data?.success) {
          deploySummaryResults.addRecordedEvent({
            name: eventName,
            uuid: response.data.uuid,
          })
          return
        } else {
          return errorResponse(`Could not record ${eventName} event`)
        }
      } catch (error) {
        return errorResponse(`Could not record ${eventName} event`, {
          error,
        })
      }
    }
  }
}
