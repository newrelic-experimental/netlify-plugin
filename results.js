import { deploySummaryTemplate } from "./templates/index.js"
import ejs from "ejs"
import pluralize from "pluralize"

class PluginResults {
  deploymentMarkerUUID = undefined
  eventsRecorded = []
  htmlFilesInjected = []
  htmlFilesNotInjected = []

  addRecordedEvent(event) {
    this.eventsRecorded.push(event)
  }

  addInjectedHtmlFile(file) {
    this.htmlFilesInjected.push(file)
  }

  addCouldNotInjectHtmlFile(file) {
    this.htmlFilesNotInjected.push(file)
  }

  setDeploymentMarkerUUID(uuid) {
    this.deploymentMarkerUUID = uuid
  }

  summary() {
    const eventCount = this.eventsRecorded.length
    const htmlCount = this.htmlFilesInjected.length

    switch (
      [
        this.deploymentMarkerUUID != undefined,
        eventCount > 0,
        htmlCount > 0,
      ].toString()
    ) {
      case [false, false, false].toString():
        return "We have nothing to report 😥"
      case [true, false, false].toString():
        return "We marked this deployment 🎉"
      case [true, true, false].toString():
        return `We marked this deployment and recorded ${pluralize(
          "event",
          eventCount,
          true
        )}`
      case [true, true, true].toString():
        return `We marked this deployment, recorded ${pluralize(
          "event",
          eventCount,
          true
        )}, and added browser monitoring to ${pluralize(
          "page",
          htmlCount,
          true
        )}`
      case [true, false, true].toString():
        return `We marked this deployment and added browser monitoring to ${pluralize(
          "page",
          htmlCount,
          true
        )}`
      case [false, true, false].toString():
        return `We recorded ${pluralize("event", eventCount, true)}`
      case [false, true, true].toString():
        return `We recorded ${pluralize(
          "event",
          eventCount,
          true
        )} and added browser monitoring to ${pluralize(
          "page",
          htmlCount,
          true
        )}`
      case [false, false, true].toString():
        return `We added browser monitoring to ${pluralize(
          "page",
          htmlCount,
          true
        )}`
    }
  }

  text() {
    return ejs.render(deploySummaryTemplate, {
      deploymentMarkerUUID: this.deploymentMarkerUUID,
      eventsRecorded: this.eventsRecorded,
      htmlFilesInjected: this.htmlFilesInjected,
      htmlFilesNotInjected: this.htmlFilesNotInjected,
    })
  }

  show() {
    return {
      title: "New Relic build plugin results",
      summary: this.summary(),
      text: this.text(),
    }
  }
}

const deploySummaryResults = new PluginResults()

export { deploySummaryResults }
