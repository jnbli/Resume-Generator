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
    var jobDescription = ('jobDescriptionInput' in e.formInput) ? e.formInput['jobDescriptionInput'] : "";
    var regexSkillPatternStrings = ('regexSkillsInput' in e.formInput) ? e.formInput['regexSkillsInput'].split(/\r?\n/) : [];
    
    var regexSkillPatterns = getRegexSkillsPatterns(regexSkillPatternStrings);

    var jobSkills = getSkills2(jobDescription, regexSkillPatterns);

    // var jobSkills = getSkills(jobDescription);
    var db = spreadSheetToDB(jobSkills);

    // var substitutions = getSubstitutions();
    var substitutions = getSubstitutions2();
    makeSubstitutions(substitutions, db);

    // var missingSkills = getMissingSkills(jobSkills);
    // replaceFirst('{MISSING.SKILLS}', missingSkills.join(', '));
    replaceFirst("{JOB_SKILLS}", jobSkills.join(", "));

    // var mySkills = getMySkills();
    var myDescription = getMyDescription();
    var mySkills = getSkills2(myDescription, regexSkillPatterns);
    replaceFirst("{MY_SKILLS}", mySkills.join(", "));

    var jobSkillsMinusMySkills = skillsDifference(jobSkills, mySkills);
    replaceFirst("{JOB_SKILLS_MINUS_MY_SKILLS}", jobSkillsMinusMySkills.join(", "));

    var mySkillsMinusJobSkills = skillsDifference(mySkills, jobSkills);
    replaceFirst("{MY_SKILLS_MINUS_JOB_SKILLS}", mySkillsMinusJobSkills.join(", "));

  }
}


