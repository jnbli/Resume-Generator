function getRegexSkillsPatterns(regexSkillPatternStrings) {
  var regexSkillPatterns = [];
  regexSkillPatternStrings.forEach((regexSkillPatternString) => {
    var parts = /\/(.*)\/(.*)/.exec(regexSkillPatternString);
    try {
      var restoredRegex = new RegExp(parts[1], parts[2]);
      regexSkillPatterns.push(restoredRegex);
    }
    catch(e) {
    }
  });
  return regexSkillPatterns;
}

function getSkills(jobDescription, regexSkillPatterns) {
  var skills = [];
  regexSkillPatterns.forEach((pattern) => {
    var matches = jobDescription.match(pattern);
    if (matches) {
      skills = skills.concat(matches);
    }    
  });
  skills = skills.filter((v, i, a) => a.indexOf(v) === i);
  return skills;
}


function getSubstitutions() {
  let text = DocumentApp.getActiveDocument().getBody().getText();
  let substitutions = [];

  let pattern = /\{\w+\.\w+\}/g;
  let matches = text.match(pattern);
  // var matches = "{Contact.FullName},{Contact.Phone},{Contact.Email},{Contact.Location},{Work.Company},{Work.Position},{Work.Start},{Work.End},{Work.Description},{Work.Company},{Work.Position},{Work.Start},{Work.End},{Work.Description},{Work.Company},{Work.Position},{Work.Start},{Work.End},{Work.Description},{Education.School},{Education.Degree},{Education.Honors}".split(',')

  var d = {}
  matches.forEach((match) => {
    var parts = match.replace('{','').replace('}','').split('.')
    var tab = parts[0];
    var header = parts[1];

    if (!(tab in d)) {
      d[tab] = {}
    }
    if (!(header in d[tab])) {
      d[tab][header] = -1
    }
    if (d[tab][header] == Math.max(...Object.values(d[tab]))) {
      d[tab][header] += 1
    }
    else {
      d[tab][header] = Math.max(...Object.values(d[tab]))
    }
    // console.log(parts, d[tab][header])
    substitutions.push([match, tab, header, d[tab][header]]);

  });

  return substitutions;
}
