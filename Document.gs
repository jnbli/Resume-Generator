// replaces the first occurrence of old
function replaceFirst(old, replacement) {    
  var body = DocumentApp.getActiveDocument().getBody();
  var found = body.findText(old);
  if (found) {
    var start = found.getStartOffset();
    var end = found.getEndOffsetInclusive();
    var text = found.getElement().asText();
    text.deleteText(start, end);
    text.insertText(start, replacement);
  }
}

function makeSubstitutions(substitutions, db) {
  substitutions.forEach((fourgroup) => {
    original = fourgroup[0];
    sheetlevel = fourgroup[1];
    headerlevel = fourgroup[2];
    rowlevel = fourgroup[3];
    if (db[sheetlevel] && db[sheetlevel][headerlevel] && db[sheetlevel][headerlevel][rowlevel] ) {
      // Logger.log("replace " + original + " with " + db[sheetlevel][headerlevel][rowlevel]);
      replaceFirst(original, db[sheetlevel][headerlevel][rowlevel]);
    }
  })
}


