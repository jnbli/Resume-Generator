/**
 * Displays an HTML-service dialog in Google Sheets that contains client-side
 * JavaScript code for the Google Picker API.
 */
function showPickerResumeTemplate() {
  try {
    const html = HtmlService.createHtmlOutputFromFile('dialogresumetemplate.html')
        .setWidth(600)
        .setHeight(425)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    DocumentApp.getUi().showModalDialog(html, 'Select a Resume Template');
  } catch (e) {
    // TODO (Developer) - Handle exception
    Logger.log('Failed with error: %s', e.error);
  }
  loadMenu()
}

function showPickerExperienceDB() {
  try {
    const html = HtmlService.createHtmlOutputFromFile('dialogexperiencedb.html')
        .setWidth(600)
        .setHeight(425)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    DocumentApp.getUi().showModalDialog(html, 'Select an ExperienceDB');
  } catch (e) {
    // TODO (Developer) - Handle exception
    Logger.log('Failed with error: %s', e.error);
  }
  loadMenu()
}

/**
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */
function getOAuthToken() {
  try {
    DriveApp.getRootFolder();
    return ScriptApp.getOAuthToken();
  } catch (e) {
    // TODO (Developer) - Handle exception
    Logger.log('Failed with error: %s', e.error);
  }
}

function storeResumeTemplate(id) {
  let userProperties = PropertiesService.getUserProperties()
  userProperties.setProperty('resumetemplate', id) // Updates stored value.
}

function storeExperienceDB(id) {
  let userProperties = PropertiesService.getUserProperties()
  userProperties.setProperty('experiencedb', id) // Updates stored value.
}
