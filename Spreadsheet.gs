function isIdSpreadsheet(id) {
  try {
    SpreadsheetApp.openById(id);
    return true;
  } catch (e) {
    return false;
  }
};

function spreadSheetToDB(jobSkills) {
  var db = {}
  var sheets = SpreadsheetApp.openById(getProperty('experiencedb')).getSheets()
  sheets.forEach((sheet) => {
    var tab = sheet.getName()
    var headers = sheet.getRange(1, 1, 1, sheet.getMaxColumns()).getValues()[0]
    var rows = sheet.getRange(2, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues()
    var scoredRows = rows.map((row) => {
      return [getSkills(row.join(' ')).filter(value => jobSkills.includes(value)).length, ...row]
    })
    var sortedScoredRows = scoredRows.sort((a, b) => {
      for (var i=0; i<Math.min(a.length, b.length); i++) {
        if (a[i] != b[i]) {
          return b[i] - a[i]
        }
      }
      return 0
    })

    var sortedRows = sortedScoredRows.map((row) => row.slice(1))

    for (var i=0; i < sortedRows.length; i++) {
      for (var j=0; j < sortedRows[i].length; j++) {
        header = headers[j]
        content = sortedRows[i][j]
        if (!db[tab]) {
          db[tab] = {}
        }
        if (!db[tab][header]) {
          db[tab][header] = {}
        }
        if (!db[tab][header][i]) {
          db[tab][header][i] = content
        }
      }
    }
    
  })
  return db
}

function getMissingSkills(jobSkills) {
  var sheets = SpreadsheetApp.openById(getProperty('experiencedb')).getSheets()
  var allContent = sheets.map((sheet) => {
    return sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues()
  }).join(' ')
  var allMySkills = getSkills(allContent)

  return jobSkills.filter((skill) => !allMySkills.includes(skill))
}
