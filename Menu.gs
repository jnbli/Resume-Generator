/**
 * Callback for rendering the main card.
 * @return {CardService.Card} The card to show the user.
 */
function onHomepage(e) {
  var builder = CardService.newCardBuilder()

  var homeSection = CardService.newCardSection()
  
  var selectExperienceDBButton = CardService.newTextButton()
    .setText('Select Experiences Database')
    .setOnClickAction(CardService.newAction().setFunctionName('showPickerExperienceDB'))

  var jobDescriptionInput = CardService.newTextInput()
    .setFieldName("jobDescriptionInput")
    .setTitle("Enter Job Description")
    .setMultiline(true)
    .setHint("Keywords will be used to tailor you resume");

  var generateResumeButton = CardService.newTextButton()
  .setText('Generate Resume')
  .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
  .setOnClickAction(
    CardService.newAction()
      .setFunctionName('generateResume')
      // .setParameters({'jobDescription': jobDescriptionInput})
  )
  
  homeSection.addWidget(selectExperienceDBButton)
  homeSection.addWidget(jobDescriptionInput)
  homeSection.addWidget(generateResumeButton)
  
  builder.addSection(homeSection)
  return builder.build()
}
