function generateResume(e) {
  if (!getProperty('experiencedb')) {
    var ui = DocumentApp.getUi();
    ui.alert('Make sure you select an ExperienceDB spreadsheet')
  }
  else if (!isIdSpreadsheet(getProperty('experiencedb'))) {
    var ui = DocumentApp.getUi();
    ui.alert('Experience DB spreadsheet https://docs.google.com/spreadsheets/d/' + getProperty('experiencedb') + 'is invalid')
  }
  else {
    var ui = DocumentApp.getUi();
    // ui.alert('Generating Tailored Resume on Experience DB spreadsheet https://docs.google.com/spreadsheets/d/' + getProperty('experiencedb'))
    // ui.alert(JSON.stringify(e.formInput))
    // ui.alert('inside generateResume')
    // var jobDescription = DocumentApp.getActiveDocument().getBody().getText()
    
    if ('jobDescriptionInput' in e.formInput) {
      var jobDescription = e.formInput['jobDescriptionInput']
    }
    else {
      var jobDescription = ''
    }

    // ui.alert('jobDescription is: ' + jobDescription)

    
    // ui.alert('after jobDescription')
    var jobSkills = getSkills(jobDescription)
    // ui.alert('after jobSkills')
    // ui.alert(jobSkills)
    var db = spreadSheetToDB(jobSkills)

    // ui.alert('after spreadSheetToDB')
    // DocumentApp.getActiveDocument().getBody().clear()  // comment out for now
    // importInDoc()
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


