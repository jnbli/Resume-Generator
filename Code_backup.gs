// function writeProperties() {
//   const userProperties = PropertiesService.getUserProperties();
//   // let units = userProperties.getProperty('DISPLAY_UNITS2');
//   units = 'metricus'; // Only changes local value, not stored value.
//   userProperties.setProperty('DISPLAY_UNITS2', units); // Updates stored value.
// }

// function readProperties() {
//   try {
//     // Get the value for the user property 'DISPLAY_UNITS'.
//     const userProperties = PropertiesService.getUserProperties();
//     Logger.log(userProperties.getProperties())
//     // const units = userProperties.getProperty('DISPLAY_UNITS');
//     // Logger.log('values of units %s', units);
//   } catch (err) {
//     // TODO (developer) - Handle exception
//     Logger.log('Failed with error %s', err.message);
//   }
// }



// function importInDoc() {
//   var baseDoc = DocumentApp.getActiveDocument();
//   var body = baseDoc.getBody();
//   body.clear();

//   var otherBody = DocumentApp.openById('1KUxezzIuAwxNez3XTM_uOYLzHF1P6toyrYK-K-AfXYs').getBody();
//   var totalElements = otherBody.getNumChildren();
//   for( var j = 0; j < totalElements; ++j ) {
//     var element = otherBody.getChild(j).copy();
//     var type = element.getType();
//     if( type == DocumentApp.ElementType.PARAGRAPH )
//       body.appendParagraph(element);
//     else if( type == DocumentApp.ElementType.TABLE )
//       body.appendTable(element);
//     else if( type == DocumentApp.ElementType.LIST_ITEM )
//       body.appendListItem(element);
//     else if( type == DocumentApp.ElementType.INLINE_IMAGE )
//       body.appendImage(element);

//     // add other element types as you want

//     else
//       throw new Error("According to the doc this type couldn't appear in the body: "+type);
//   }
// }





// // custom menu function
// function onOpen() {
//   const ui = DocumentApp.getUi();
//   ui.createMenu('Resume')
//       .addItem('Import ExperienceDB','importExperienceDB')
//       .addToUi();
// }

// function importExperienceDB() {
//   const ui = DocumentApp.getUi()
//   ui.createMenu('Resume Generator')
//       .addItem('Change ExperienceDB','changeExperienceDB')
//       .addToUi();
// }

// function getSubstitutions() {
//   let text = DocumentApp.getActiveDocument().getBody().getText()
//   let pattern = /\{\w+\.\w+\}/g
//   let matches = text.match(pattern) //.map(m => m.replace('{','').replace('}','').trim())
//   let iteration = 0
//   let seen = []
//   let substitutions = []
//   matches.forEach(match => {
//     if (seen.includes(match)) {
//       iteration++
//     }
//     let original = match
//     let querystring = match.replace('{','').replace('}','').split('.')
//     substitutions.push([original, querystring[0], querystring[1], iteration])
//     seen.push(match)
//   })
//   return substitutions
// }

// function sheet2map() {
//   let sheets = SpreadsheetApp.openById('1R9hk1f-VRVt85Ovdhes7vEdniz8CzMeiNlzrU3LRGKw').getSheets()
//   let db = {}
//   sheets.forEach((sheet) => {
//     sheetlevel = sheet.getName()
//     let numCols = sheet.getMaxColumns()
//     let numRows = sheet.getMaxRows()
//     let level2s = sheet.getRange(1, 1, 1, numCols).getValues()[0]

//     let range = sheet.getRange(2, 1, numRows, numCols)
//     let values = range.getValues()
//     for (var row=0; row < values.length; row++) {
//       for (var col=0; col < values[row].length; col++) {
//         headerlevel = level2s[col]
//         rowlevel = row
//         contentlevel = values[row][col]
//         if (!db[sheetlevel]) {
//           db[sheetlevel] = new Map()
//         }
//         if (!db[sheetlevel][headerlevel]) {
//           db[sheetlevel][headerlevel] = new Map()
//         }
//         if (!db[sheetlevel][headerlevel][rowlevel]) {
//           db[sheetlevel][headerlevel][rowlevel] = contentlevel
//         }
//         // Logger.log(sheetlevel+'.'+headerlevel+'['+row+']='+values[row][col])

//         // Logger.log(values[row][col]);
//       }
//     }
//   })
//   return db
// }

// function createPlaceholders() {
//   var body = DocumentApp.getActiveDocument().getBody();
//   body.appendParagraph('{name}');
//   body.appendParagraph('{address}');
//   body.appendParagraph('{city} {state} {zip}');
// }

// function searchAndReplace() {
//   var body = DocumentApp.getActiveDocument()
//       .getBody();
//   var client = {
//     name: 'Joe Script-Guru',
//     address: '100 Script Rd',
//     city: 'Scriptville',
//     state: 'GA',
//     zip: 94043
//   };

//   // body.replaceText('{name}', client.name);
//   // body.replaceText('{address}', client.address);
//   // body.replaceText('{city}', client.city);
//   // body.replaceText('{state}', client.state);
//   // body.replaceText('{zip}', client.zip);

//   replaceFirst('{name}', client.name)
// }

// // replaces the first occurrence of old
// function replaceFirst(old, replacement) {    
//   var body = DocumentApp.getActiveDocument().getBody();
//   var found = body.findText(old);
//   if (found) {
//     var start = found.getStartOffset();
//     var end = found.getEndOffsetInclusive();
//     var text = found.getElement().asText();
//     text.deleteText(start, end);
//     text.insertText(start, replacement);
//   }
// }

// function myFunction() {
//   let substitutions = getSubstitutions()
//   let db = sheet2map()
//   Logger.log(substitutions)
//   Logger.log(db)
//   substitutions.forEach((fourgroup) => {
//     original = fourgroup[0]
//     sheetlevel = fourgroup[1]
//     headerlevel = fourgroup[2]
//     rowlevel = fourgroup[3]
//     if (db[sheetlevel] && db[sheetlevel][headerlevel] && db[sheetlevel][headerlevel][rowlevel] ) {
//       Logger.log("replace " + original + " with " + db[sheetlevel][headerlevel][rowlevel])
//       replaceFirst(original, db[sheetlevel][headerlevel][rowlevel])
//     }
//   })
// }

