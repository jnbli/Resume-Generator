function isIdSpreadsheet(id) {
  try {
    SpreadsheetApp.openById(id);
    return true;
  } catch (e) {
    return false;
  }
};

function spreadSheetToDB(jobSkills='') {
  var db = {}
  var sheets = SpreadsheetApp.openById(getProperty('experiencedb')).getSheets()
  for (var sheet of sheets) {
    var tab = sheet.getName();

    var data = sheet.getDataRange().getValues();
    for (var i=0; i<data.length; i++) {
      if (!data[i].every(x => x == '')) {
        break;
      }
    }
    var headers = data.slice(i, i+1);
    if (headers.length == 0) {
      continue;
    }
    headers = headers[0];
    var rows = data.slice(i+1)
    if (rows.length == 0) {
      continue;
    }

    var scoredRows = rows.map((row) => {
      return [getSkills(row.join(' ')).filter(value => jobSkills.includes(value)).length, ...row];
    })
    var sortedScoredRows = scoredRows.sort((a, b) => {
      for (var i=0; i<Math.min(a.length, b.length); i++) {
        if (a[i] != b[i]) {
          return b[i] - a[i];
        }
      }
      return 0;
    })

    var sortedRows = sortedScoredRows.map((row) => row.slice(1));

    for (var i=0; i < sortedRows.length; i++) {
      for (var j=0; j < sortedRows[i].length; j++) {
        header = headers[j]
        if (header == '') {
          continue;
        }
        content = sortedRows[i][j]
        if (!db[tab]) {
          db[tab] = {};
        }
        if (!db[tab][header]) {
          db[tab][header] = {};
        }
        if (!db[tab][header][i]) {
          db[tab][header][i] = content;
        }
      }
    }
  }
  
  return db;
}

function test() {
  var db = spreadSheetToDB(["Qualifications","Java","Angular","APIs","Computer Science","Computer Engineering","C++"]);
  // Logger.log(db);

  var substitutions = getSubstitutions();
  Logger.log(substitutions);
}

function getMissingSkills(jobSkills) {
  var sheets = SpreadsheetApp.openById(getProperty('experiencedb')).getSheets();
  var allContent = sheets.map((sheet) => {
    return sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues();
  }).join(' ');
  var allMySkills = getSkills(allContent);

  return jobSkills.filter((skill) => !allMySkills.includes(skill));
}

function getMySkills() {
  var sheets = SpreadsheetApp.openById(getProperty('experiencedb')).getSheets();
  var allContent = sheets.map((sheet) => {
    return sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues();
  }).join(' ');
  var allMySkills = getSkills(allContent);

  return allMySkills;
}

function getMyDescription() {
  var sheets = SpreadsheetApp.openById(getProperty('experiencedb')).getSheets();
  var allContent = sheets.map((sheet) => {
    return sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues();
  }).join(' ');
  return allContent;
}

function skillsDifference(skillsA, skillsB) {
  return skillsA.filter((skill) => !skillsB.includes(skill));
}

function makeSampleExperienceSpreadsheet() {
  var ssNew = SpreadsheetApp.create("Sample Resume Experiences");
  // var ssNew = SpreadsheetApp.openById("1EknSCNisXVbWeLBvTxefMcvKt_9ElrERo5h6Da7Rh6s");
  
  var contactSheet = ssNew.getActiveSheet();
  contactSheet.setName("Contact");
  contactSheet.getRange("A1:D1").setValues([["FullName", "Phone", "Email", "Location"]]);
  contactSheet.getRange("A2:D2").setValues([["John Doe", "(555) 555-5555", "johndoe@example.com", "SF Bay Area"]]);
  
  var workSheet = ssNew.insertSheet("Work");
  workSheet.activate();
  workSheet.getRange("A1:E1").setValues([["Company","Position","Start","End","Description"]]);
  workSheet.getRange("A2:E2").setValues([["SuperFoo","Software Developer","Oct 2022","Present","Designed Tofu dispensing automation in C++ and Ansible"]]);
  workSheet.getRange("A3:E3").setValues([["MegaBar","Lead Engineer","Aug 2020","Aug 2022","Wrote Bartending application Front End in Angular"]]);
  workSheet.getRange("A4:E4").setValues([["UltraFiz","Web Developer","Nov 2016","Jun 2020","Maintained Soft drink WordPress website in PHP"]]);
  workSheet.getRange("A5:E5").setValues([["TeraBuz","System Administrator","Feb 2013","Sep 2016","Improved SSD Capacity using VBScript"]]);

  var educationSheet = ssNew.insertSheet("Education");
  educationSheet.activate();
  educationSheet.getRange("A1:C1").setValues([["School", "Degree", "Honors"]]);
  educationSheet.getRange("A2:C2").setValues([["UC School of Hard Knox", "Bachelors of Science in Computer Science", "Magna cum laude"]]);

  var ssId = ssNew.getId();
  setProperty("experiencedb", ssId);

}
