/**
 * Displays an HTML-service dialog in Google Sheets that contains client-side
 * JavaScript code for the Google Picker API.
 */
function showPickerExperienceDB() {
  try {
    // const html = HtmlService.createHtmlOutputFromFile('dialogexperiencedb.html')
    //     .setWidth(600)
    //     .setHeight(425)
    //     .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    const htmlTemplate = HtmlService.createTemplateFromFile('dialogexperiencedb.html')

    if (propertyExists('experiencedb')) {
      var experiencedbid = getProperty('experiencedb')
      htmlTemplate.display = 'block'
      htmlTemplate.sheetid = experiencedbid
      if (isIdSpreadsheet(experiencedbid)) {
        htmlTemplate.sheetname = SpreadsheetApp.openById(experiencedbid).getName()
        htmlTemplate.additionalnotes = ''
      }
      else {
        htmlTemplate.sheetname = ''
        htmlTemplate.additionalnotes = 'And it appears the url is no longer valid'
      }
    }
    else {
      htmlTemplate.display = 'none'
      htmlTemplate.sheetid = ''
      htmlTemplate.sheetname = ''
      htmlTemplate.additionalnotes = ''
    }

    const html = htmlTemplate.evaluate()
        .setWidth(600)
        .setHeight(425)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    DocumentApp.getUi().showModalDialog(html, 'Select an ExperienceDB');
    // loadMenu()
  } catch (e) {
    // TODO (Developer) - Handle exception
    Logger.log('Failed with error: %s', e.error);
  }
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

function storeExperienceDB(id) {
  let userProperties = PropertiesService.getUserProperties()
  userProperties.setProperty('experiencedb', id) // Updates stored value.
}
