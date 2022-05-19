function generateResume() {
  if (!getProperty('experiencedb')) {
    var ui = DocumentApp.getUi();
    ui.alert('Make sure you select an ExperienceDB spreadsheet')
  }
  else if (!getProperty('resumetemplate')) {
    var ui = DocumentApp.getUi();
    ui.alert('Make sure you select an Resume Template document')
  }
  else if (!isIdSpreadsheet(getProperty('experiencedb'))) {
    var ui = DocumentApp.getUi();
    ui.alert('Experience DB spreadsheet id ' + getProperty('experiencedb') + 'is invalid')
  }
  else if (!isIdDocument(getProperty('resumetemplate'))) {
    var ui = DocumentApp.getUi();
    ui.alert('Resume Template document id ' + getProperty('experiencedb') + 'is invalid')
  }
  else {
    var ui = DocumentApp.getUi();
    // ui.alert('inside generateResume')
    var jobDescription = DocumentApp.getActiveDocument().getBody().getText()
    // ui.alert('after jobDescription')
    var jobSkills = getSkills(jobDescription)
    // ui.alert('after jobSkills')
    // ui.alert(jobSkills)
    var db = spreadSheetToDB(jobSkills)

    // ui.alert('after spreadSheetToDB')
    // DocumentApp.getActiveDocument().getBody().clear()  // comment out for now
    importInDoc()
    // ui.alert('after importInDoc')

    var substitutions = getSubstitutions()
    // ui.alert('after getSubstitutions')
    // ui.alert(substitutions)

    makeSubstitutions(substitutions, db)
    // ui.alert('after makeSubstitutions')

    var missingSkills = getMissingSkills(jobSkills)
    replaceFirst('{MISSING.SKILLS}', missingSkills.join(', '))

  }
}


