function loadMenu() {
  const ui = DocumentApp.getUi();
  let experienceMenu = propertyExists('experiencedb') ? 'Change ExperienceDB' : 'Select ExperienceDB'
  let resumeTemplateMenu = propertyExists('resumetemplate') ? 'Change Resume Template' : 'Select Resume Template'

  ui.createMenu('Resume Generator')
    .addItem(experienceMenu,'showPickerExperienceDB')
    .addItem(resumeTemplateMenu,'showPickerResumeTemplate')
    .addItem('Generate Resume', 'generateResume')
    .addToUi();
}

function onOpen() {
  loadMenu()
}

function selectExperienceDB() {
  var ui = DocumentApp.getUi(); // Same variations.

  var result = propertyExists('experiencedb') ? 
    ui.prompt(
      'Your current ExperienceDB spreadsheet is ' + getProperty('experiencedb'),
      'To select a different sheet, please enter the new id:',
      ui.ButtonSet.OK_CANCEL)
    :
    ui.prompt(
      'Let\'s select to your ExperienceDB!',
      'Please enter the spreadspeet id:',
      ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    // User clicked "OK".
    if (isIdSpreadsheet(text)) {
      sheet = SpreadsheetApp.openById(text)
      ui.alert('You ExperienceDB spreadsheet is set to ' + sheet.getName() + ' whose id is ' + text + '.');
      
      setProperty('experiencedb', text)
    }
    else {
      ui.alert(text + ' appears not to be a valid Spreadsheet id');
    }
  }
  loadMenu()
}

function selectResumeTemplate() {
  var ui = DocumentApp.getUi(); // Same variations.

  var result = propertyExists('resumetemplate') ? 
    ui.prompt(
      'Your current Resume Template document is ' + getProperty('resumetemplate'),
      'To select a different doc, please enter the new id:',
      ui.ButtonSet.OK_CANCEL)
    :
    ui.prompt(
      'Let\'s select to your Resume Template!',
      'Please enter the doc id:',
      ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    // User clicked "OK".
    if (isIdDocument(text)) {
      doc = DocumentApp.openById(text)
      ui.alert('You Resume Template doc is set to ' + doc.getName() + ' whose id is ' + text + '.');
      
      setProperty('resumetemplate', text)
    }
    else {
      ui.alert(text + ' appears not to be a valid Doc id');
    }
  }
  loadMenu()
}
