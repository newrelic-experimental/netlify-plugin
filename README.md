[![New Relic Experimental header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#new-relic-experimental)

# New Relic Netlify Plugin ![GitHub](https://img.shields.io/github/license/newrelic-experimental/newrelic-netlify-plugin) ![GitHub issues](https://img.shields.io/github/issues/newrelic-experimental/newrelic-netlify-plugin) ![GitHub pull requests](https://img.shields.io/github/issues-pr/newrelic-experimental/newrelic-netlify-plugin) ![GitHub last commit](https://img.shields.io/github/last-commit/newrelic-experimental/newrelic-netlify-plugin) ![npm (scoped)](https://img.shields.io/npm/v/@newrelic/newrelic-netlify-plugin) ![npm](https://img.shields.io/npm/dt/@newrelic/newrelic-netlify-plugin) ![npms.io (quality)](https://img.shields.io/npms-io/maintenance-score/@newrelic/newrelic-netlify-plugin) ![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@newrelic/newrelic-netlify-plugin) ![Lines of code](https://img.shields.io/tokei/lines/github/newrelic-experimental/newrelic-netlify-plugin)

Monitor your [Netlify](https://www.netlify.com/) build process and Jamstack application performance with [New Relic](https://newrelic.com/), without the need for lengthy manual set up.

The New Relic Netlify Plugin:

- Notifies New Relic on Netlify build events including: Pre Build, Post Build, Sucess, and Failure.
- Installs the browser agent across your static pages
- Adds a release version to each deployment for easier monitoring and debugging

## Installation

For detailed installation instructions see "Jumpstart your Jamstack monitoring with the New Relic Netlify plugin and quickstart"

### UI Installation

[UI installation](https://docs.netlify.com/configure-builds/build-plugins/#ui-installation) is the quickest way to start using the plugin, and does not require any modifications to your project's code.

- Navigate to the [Netlify plugin directory](https://app.netlify.com/plugins), search for New Relic, and select install and then choose which of your Netlify sites will use the plugin
- Go to your site settings > build and deploy > environment and set the following [environment variables](https://docs.netlify.com/configure-builds/environment-variables/):
  - NEWRELIC_ACCOUNT_ID: Your [New Relic Account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-structure/account-id/)
  - NEWRELIC_INGEST_LICENSE_KEY: A New Relic [ingest license key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#ingest-license-key)
  - NEWRELIC_BROWSER_LICENSE_KEY: A New Relic [browser ingest license key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#ingest-browser-key)
  - NEWRELIC_APP_ID: Your New Relic [Browser App ID](https://docs.newrelic.com/docs/apis/rest-api-v2/get-started/get-app-other-ids-new-relic-one/#browser)
  - ENABLE_BROWSER_MONITORING: Set this to true

### File-based Installation

Alternatively, to install with [file-based installation](https://docs.netlify.com/configure-builds/build-plugins/#file-based-installation), add the following lines to your `netlify.toml` files:

```[[plugins]]
package = "@newrelic/newrelic-netlify-plugin"

  [plugins.inputs]
    newrelicAccountId = "123456"
    newrelicLicenseKey = "12345678901234567890"
    newrelicBrowserLicenseKey = "ABCD-0987654321"
    newrelicAppId = "123456789"
    enableBrowserMonitoring = true
```

Replace the values for `newrelicAccountId`, `newrelicLicenseKey`, `newrelicBrowserLicenseKey`, and `newrelicAppId` with your New Relic Account ID, the ingest and browser ingest license key you, and your New Relic Browser App ID.

## Install the Netlify quickstart

To get the most out of your Netlify integration you should also install the New Relic Netlify quickstart. You can find more information on the quickstart page on [New Relic I/O](https://newrelic.com/platform/about-instant-observability).

## Settings

The plugin allows for customisation of the following settings via environment variables or your `netlify.toml`.

| _`netlify.toml` key_               | _Environment variable name_            | _Description_                                                                 | _Required for_                      | _Default value_                                                                                                                                                                                                                            |
| ---------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| failBuildOnPluginError             | FAIL_BUILD_ON_PLUGIN_ERROR             | Fail the whole build if the plugin has an error                               |                                     | true                                                                                                                                                                                                                                       |
| newrelicAccountId                  | NEWRELIC_ACCOUNT_ID                    | New Relic Account ID                                                          | event tracking & browser monitoring | undefined                                                                                                                                                                                                                                  |
| newrelicLicenseKey                 | NEWRELIC_INGEST_LICENSE_KEY            | New Relic Ingest License Key                                                  | event tracking                      | undefined                                                                                                                                                                                                                                  |
| newrelicBrowserLicenseKey          | NEWRELIC_BROWSER_LICENSE_KEY           | New Relic Ingest License Key                                                  | event tracking                      | undefined                                                                                                                                                                                                                                  |
| newrelicAppId                      | NEWRELIC_APP_ID                        | New Relic APM App ID                                                          | browser monitoring                  | undefined                                                                                                                                                                                                                                  |
| recordEventsForPreviews            | RECORD_EVENTS_FOR_PREVIEWS             | Set this to true if you want to record events for deploy previews             |                                     | false                                                                                                                                                                                                                                      |
| skipEvent.onPreBuild               | SKIP_PRE_BUILD_EVENT                   | Set this to true to skip recording onPreBuild custom events                   |                                     | false                                                                                                                                                                                                                                      |
| skipEvent.onBuild                  | SKIP_BUILD_EVENT                       | Set this to true to skip recording onBuild custom events                      |                                     | false                                                                                                                                                                                                                                      |
| skipEvent.onPostBuild              | SKIP_POST_BUILD_EVENT                  | Set this to true to skip recording onPostBuild custom events                  |                                     | false                                                                                                                                                                                                                                      |
| skipEvent.onSuccess                | SKIP_SUCCESS_EVENT                     | Set this to true to skip recording onSuccess custom events                    |                                     | false                                                                                                                                                                                                                                      |
| skipEvent.onError                  | SKIP_ERROR_EVENT                       | Set this to true to skip recording onError custom events                      |                                     | false                                                                                                                                                                                                                                      |
| skipEvent.onEnd                    | SKIP_END_EVENT                         | Set this to true to skip recording onEnd custom events                        |                                     | false                                                                                                                                                                                                                                      |
| enableBrowserMonitoring            | ENABLE_BROWSER_MONITORING              | Attempt to inject the browser monitor script tag into any HTML pages          |                                     | false                                                                                                                                                                                                                                      |
| enableBrowserMonitoringForPreviews | ENABLE_BROWSER_MONITORING_FOR_PREVIEWS | Set this to true if you want to enable browser monitoring for deploy previews |                                     | false                                                                                                                                                                                                                                      |
| distributedTracingEnabled          | DISTRIBUTED_TRACING_ENABLED            | Enable distributed tracing for browser requests                               |                                     | true                                                                                                                                                                                                                                       |
| cookiesEnabled                     | COOKIES_ENABLED                        | Enable cookies for browser monitoring                                         |                                     | true                                                                                                                                                                                                                                       |
| htmlInjectionConcurrency           | HTML_INJECTION_CONCURRENCY             | Number of concurrently pending promises to use when injecting browser agent   |                                     | 5                                                                                                                                                                                                                                          |
| revisionTemplate                   | REVISION_TEMPLATE                      | Deploy marker revision and release version id structure (EJS string)          |                                     | <% if(git.commits[0].message){ % ><%= git.commits[0].message.slice(0,25) % >-<% } % ><%= process.env.CONTEXT % >-<%= process.env.COMMIT_REF.slice(0, 7) % >-<%= process.env.DEPLOY_ID.slice(-6) % >-<%= process.env.BUILD_ID.slice(-6) % > |

## Support

The plugin is part of [New Relic experimental](https://opensource.newrelic.com/oss-category/#new-relic-experimental). The project is being developed in the open and we welcome all feedback and contributions.

Please [raise an issue](https://github.com/newrelic-experimental/newrelic-netlify-plugin/issues) or contact us via the [New Relic Explorers Hub](https://discuss.newrelic.com/).

## Contributing

We encourage your contributions to improve the New Relic Netlify Plugin!

Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.

If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company, please drop us an email at opensource@newrelic.com.

## A note about vulnerabilities

As noted in our [security policy](../../security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [HackerOne](https://hackerone.com/newrelic).

## License

The New Relic Netlify plugin is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.
