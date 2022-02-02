const settings = (inputs) => {
  const IS_PREVIEW = process.env.CONTEXT == "deploy-preview"
  const FAIL_BUILD_ON_PLUGIN_ERROR =
    process.env.FAIL_BUILD_ON_PLUGIN_ERROR || inputs.failBuildOnPluginError

  const NEWRELIC_ACCOUNT_ID =
    process.env.NEWRELIC_ACCOUNT_ID || inputs.newrelicAccountId
  const NEWRELIC_INGEST_LICENSE_KEY =
    process.env.NEWRELIC_INGEST_LICENSE_KEY || inputs.newrelicLicenseKey
  const NEWRELIC_BROWSER_LICENSE_KEY =
    process.env.NEWRELIC_BROWSER_LICENSE_KEY || inputs.newrelicBrowserLicenseKey

  const NEWRELIC_APP_ID = process.env.NEWRELIC_APP_ID || inputs.newrelicAppId
  const NEWRELIC_API_KEY = process.env.NEWRELIC_API_KEY || inputs.newrelicApiKey

  const ENABLE_BROWSER_MONITORING =
    process.env.ENABLE_BROWSER_MONITORING || inputs.enableBrowserMonitoring
  const ENABLE_BROWSER_MONITORING_FOR_PREVIEWS =
    process.env.ENABLE_BROWSER_MONITORING_FOR_PREVIEWS ||
    inputs.enableBrowserMonitoringForPreviews
  const DISTRIBUTED_TRACING_ENABLED =
    process.env.DISTRIBUTED_TRACING_ENABLED || inputs.distributedTracingEnabled
  const COOKIES_ENABLED = process.env.COOKIES_ENABLED || inputs.cookiesEnabled
  const HTML_INJECTION_CONCURRENCY =
    process.env.HTML_INJECTION_CONCURRENCY || inputs.htmlInjectionConcurrency

  const SET_DEPLOYMENT_MARKERS =
    process.env.SET_DEPLOYMENT_MARKERS || inputs.setDeploymentMarkers
  const SET_DEPLOYMENT_MARKERS_FOR_PREVIEWS =
    process.env.SET_DEPLOYMENT_MARKERS_FOR_PREVIEWS ||
    inputs.setDeploymentMarkersForPreviews

  const REVISION_TEMPLATE =
    process.env.REVISION_TEMPLATE || inputs.revisionTemplate

  const RECORD_EVENTS_FOR_PREVIEWS =
    process.env.RECORD_EVENTS_FOR_PREVIEWS || inputs.recordEventsForPreviews
  const SKIP_PRE_BUILD_EVENT =
    process.env.SKIP_PRE_BUILD_EVENT || inputs.skipEvent?.onPreBuild
  const SKIP_BUILD_EVENT =
    process.env.SKIP_BUILD_EVENT || inputs.skipEvent?.onBuild
  const SKIP_POST_BUILD_EVENT =
    process.env.SKIP_POST_BUILD_EVENT || inputs.skipEvent?.onPostBuild
  const SKIP_ERROR_EVENT =
    process.env.SKIP_ERROR_EVENT || inputs.skipEvent?.onError
  const SKIP_SUCCESS_EVENT =
    process.env.SKIP_SUCCESS_EVENT || inputs.skipEvent?.onSuccess
  const SKIP_END_EVENT = process.env.SKIP_END_EVENT || inputs.skipEvent?.onEnd

  return {
    IS_PREVIEW,
    FAIL_BUILD_ON_PLUGIN_ERROR,
    NEWRELIC_ACCOUNT_ID,
    NEWRELIC_INGEST_LICENSE_KEY,
    NEWRELIC_BROWSER_LICENSE_KEY,
    NEWRELIC_APP_ID,
    NEWRELIC_API_KEY,
    ENABLE_BROWSER_MONITORING,
    ENABLE_BROWSER_MONITORING_FOR_PREVIEWS,
    DISTRIBUTED_TRACING_ENABLED,
    COOKIES_ENABLED,
    HTML_INJECTION_CONCURRENCY,
    SET_DEPLOYMENT_MARKERS,
    SET_DEPLOYMENT_MARKERS_FOR_PREVIEWS,
    REVISION_TEMPLATE,
    RECORD_EVENTS_FOR_PREVIEWS,
    SKIP_PRE_BUILD_EVENT,
    SKIP_BUILD_EVENT,
    SKIP_POST_BUILD_EVENT,
    SKIP_ERROR_EVENT,
    SKIP_SUCCESS_EVENT,
    SKIP_END_EVENT,
  }
}

const getErrorResponse = (inputs, build) => {
  const { FAIL_BUILD_ON_PLUGIN_ERROR } = settings(inputs)
  return FAIL_BUILD_ON_PLUGIN_ERROR ? build.failBuild : build.failPlugin
}

export { settings, getErrorResponse }
