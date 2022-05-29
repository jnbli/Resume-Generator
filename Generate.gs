function generateResume(e) {
  if (!getProperty('experiencedb')) {
    var ui = DocumentApp.getUi();
    ui.alert('Make sure you select an ExperienceDB spreadsheet');
  }
  else if (!isIdSpreadsheet(getProperty('experiencedb'))) {
    var ui = DocumentApp.getUi();
    ui.alert('Experience DB spreadsheet https://docs.google.com/spreadsheets/d/' + getProperty('experiencedb') + 'is invalid');
  }
  else {    
    if ('jobDescriptionInput' in e.formInput) {
      var jobDescription = e.formInput['jobDescriptionInput'];
    }
    else {
      var jobDescription = '';
    }
    
    var jobSkills = getSkills(jobDescription);
    var db = spreadSheetToDB(jobSkills);

    var substitutions = getSubstitutions();
    makeSubstitutions(substitutions, db);

    var missingSkills = getMissingSkills(jobSkills);
    replaceFirst('{MISSING.SKILLS}', missingSkills.join(', '));

  }
}


