function makeSampleResumeTemplate() {
  var baseDoc = DocumentApp.getActiveDocument();
  var body = baseDoc.getBody();
  body.clear();

  body.appendParagraph("{Contact.FullName}")
  body.appendParagraph("{Contact.Phone} | {Contact.Email} | {Contact.Location}")
  body.appendHorizontalRule()
  body.appendParagraph("WORK")
  body.appendParagraph("{Work.Company}")
  body.appendParagraph("{Work.Position}, {Work.Start} - {Work.End}")
  body.appendParagraph("{Work.Description}")
  body.appendParagraph("")
  body.appendParagraph("{Work.Company}")
  body.appendParagraph("{Work.Position}, {Work.Start} - {Work.End}")
  body.appendParagraph("{Work.Description}")
  body.appendParagraph("")
  body.appendParagraph("{Work.Company}")
  body.appendParagraph("{Work.Position}, {Work.Start} - {Work.End}")
  body.appendParagraph("{Work.Description}")
  body.appendHorizontalRule()
  body.appendParagraph("EDUCATION")
  body.appendParagraph("{Education.School}")
  body.appendParagraph("{Education.Degree}")
  body.appendParagraph("{Education.Honors}")
  body.appendHorizontalRule()
  body.appendParagraph("MAGIC FORMULAS")
  body.appendParagraph("job skills: {JOB_SKILLS}")
  body.appendParagraph("")
  body.appendParagraph("my skills: {MY_SKILLS}")
  body.appendParagraph("")
  body.appendParagraph("skills I am missing: {JOB_SKILLS_MINUS_MY_SKILLS}")
  body.appendParagraph("")
  body.appendParagraph("extra skills I have: {MY_SKILLS_MINUS_JOB_SKILLS}")
}


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


