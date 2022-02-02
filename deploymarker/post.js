import { changelog, description, revision } from "./strings.js"
import { getErrorResponse, settings } from "../settings.js"

import axios from "axios"
import { deploySummaryResults } from "../results.js"

export const makeRequest = async (pluginApi) => {
  const { constants, inputs, utils, netlifyConfig, packageJson } = pluginApi
  const { build, git } = utils

  const { NEWRELIC_APP_ID, NEWRELIC_API_KEY } = settings(inputs)
  const errorResponse = getErrorResponse(inputs, build)

  const revisionUUID = revision(
    constants,
    inputs,
    git,
    netlifyConfig,
    packageJson
  )

  try {
    const data = {
      deployment: {
        revision: revisionUUID,
        changelog: changelog(git),
        description: description(git, constants),
        ...(git.commits[0].committer.name && {
          user: git.commits[0].committer.name,
        }),
        ...(git.commits[0].committer.date && {
          timestamp: new Date(
            Date.parse(git.commits[0].committer.date)
          ).toISOString(),
        }),
      },
    }

    const response = await axios({
      url: `https://api.newrelic.com/v2/applications/${NEWRELIC_APP_ID}/deployments.json`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": NEWRELIC_API_KEY,
      },
      data,
    })

    if (response.status == 201) {
      deploySummaryResults.setDeploymentMarkerUUID(revisionUUID)
      return
    } else {
      return errorResponse(
        `Could not create deployment marker "${revisionUUID}" New Relic API responded with ${response.status} ${response.statusText}`
      )
    }
  } catch (error) {
    return errorResponse(
      `Could not create deployment marker "${revisionUUID}"`,
      error
    )
  }
}
