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

    var jobSkills = getSkills(jobDescription, regexSkillPatterns);

    var db = spreadSheetToDB(jobSkills, regexSkillPatterns);

    var substitutions = getSubstitutions();
    makeSubstitutions(substitutions, db);

    replaceFirst("{JOB_SKILLS}", jobSkills.join(", "));

    var myDescription = getMyDescription();
    var mySkills = getSkills(myDescription, regexSkillPatterns);
    replaceFirst("{MY_SKILLS}", mySkills.join(", "));

    var jobSkillsMinusMySkills = skillsDifference(jobSkills, mySkills);
    replaceFirst("{JOB_SKILLS_MINUS_MY_SKILLS}", jobSkillsMinusMySkills.join(", "));

    var mySkillsMinusJobSkills = skillsDifference(mySkills, jobSkills);
    replaceFirst("{MY_SKILLS_MINUS_JOB_SKILLS}", mySkillsMinusJobSkills.join(", "));

  }
}


