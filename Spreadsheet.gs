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

function getMissingSkills(jobSkills) {
  var sheets = SpreadsheetApp.openById(getProperty('experiencedb')).getSheets();
  var allContent = sheets.map((sheet) => {
    return sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues();
  }).join(' ');
  var allMySkills = getSkills(allContent);

  return jobSkills.filter((skill) => !allMySkills.includes(skill));
}
