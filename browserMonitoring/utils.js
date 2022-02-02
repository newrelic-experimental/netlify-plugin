export const skipBrowserMonitoring = ({
  IS_PREVIEW,
  ENABLE_BROWSER_MONITORING,
  ENABLE_BROWSER_MONITORING_FOR_PREVIEWS,
}) => {
  if (!ENABLE_BROWSER_MONITORING) return true
  if (IS_PREVIEW && !ENABLE_BROWSER_MONITORING_FOR_PREVIEWS) {
    console.log("Skipping browser monitoring. Deploy preview.")
    return true
  }
  return false
}

export const missingSettings = (
  { NEWRELIC_ACCOUNT_ID, NEWRELIC_APP_ID, NEWRELIC_BROWSER_LICENSE_KEY },
  errorResponse
) => {
  if (!NEWRELIC_ACCOUNT_ID) {
    return errorResponse(
      `Browser monitoring is enabled, but NEWRELIC_ACCOUNT_ID is not set`
    )
  }
  if (!NEWRELIC_APP_ID) {
    return errorResponse(
      `Browser monitoring is enabled, but NEWRELIC_APP_ID is not set`
    )
  }
  if (!NEWRELIC_BROWSER_LICENSE_KEY) {
    return errorResponse(
      `Browser monitoring is enabled, but NEWRELIC_BROWSER_LICENSE_KEY is not set`
    )
  }

  return false
}
