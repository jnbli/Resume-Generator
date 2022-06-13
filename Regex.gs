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

function getSkills2(jobDescription, regexSkillPatterns) {
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


function getSkills(text) {
  var skills = [];
  var oneletter = text.match(/(?<=\W)[A-Z][\+#]*(?=$|\W)/g);
  if (oneletter) {
    skills = skills.concat(oneletter);
  }
  var twoletterplus = text.match(/(?<!(^|\. ))(?<=\W)(\w?[A-Z]\w+ ?)+/g);
  if (twoletterplus) {
    skills = skills.concat(twoletterplus);
  }
  skills = skills.map((skill) => skill.trim());
  skills = skills.filter((v, i, a) => a.indexOf(v) === i);
  return skills;
}

function getSubstitutions2() {
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

function getSubstitutions() {
  let text = DocumentApp.getActiveDocument().getBody().getText();
  let substitutions = [];

  let pattern = /\{\w+\.\w+\}/g;
  let matches = text.match(pattern);

  DocumentApp.getUi().alert(matches);

  let counts = {};
  let seen = {};


  if (matches) {
    matches.forEach(match => {
      let parts = match.replace('{','').replace('}','').split('.');
      let tab = parts[0];
      let header = parts[1];

      if (tab in counts) {
      }
      else {
        counts[tab] = 0;
      }

      if (tab in seen) {
        if (seen[tab].includes(header)) {
          seen[tab] = [];
          counts[tab] += 1;
        }
        else {
          seen[tab].push(header);
        }
      }
      else {
        seen[tab] = [header];
      }

      substitutions.push([match, tab, header, counts[tab]]);
    })
  }
  DocumentApp.getUi().alert(substitutions);
  return substitutions;
}
