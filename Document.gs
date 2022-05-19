function isIdDocument(id) {
  try {
    DocumentApp.openById(id);
    return true;
  } catch (e) {
    return false;
  }
};

function importInDoc() {
  var baseDoc = DocumentApp.getActiveDocument();
  var body = baseDoc.getBody();
  body.clear();

  var otherBody = DocumentApp.openById(getProperty('resumetemplate')).getBody();
  var totalElements = otherBody.getNumChildren();
  for( var j = 0; j < totalElements; ++j ) {
    var element = otherBody.getChild(j).copy();
    var type = element.getType();
    if( type == DocumentApp.ElementType.PARAGRAPH )
      body.appendParagraph(element);
    else if( type == DocumentApp.ElementType.TABLE )
      body.appendTable(element);
    else if( type == DocumentApp.ElementType.LIST_ITEM )
      body.appendListItem(element);
    else if( type == DocumentApp.ElementType.INLINE_IMAGE )
      body.appendImage(element);

    // add other element types as you want

    else
      throw new Error("According to the doc this type couldn't appear in the body: "+type);
  }
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
    original = fourgroup[0]
    sheetlevel = fourgroup[1]
    headerlevel = fourgroup[2]
    rowlevel = fourgroup[3]
    if (db[sheetlevel] && db[sheetlevel][headerlevel] && db[sheetlevel][headerlevel][rowlevel] ) {
      Logger.log("replace " + original + " with " + db[sheetlevel][headerlevel][rowlevel])
      replaceFirst(original, db[sheetlevel][headerlevel][rowlevel])
    }
  })
}


