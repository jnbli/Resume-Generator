/**
 * Callback for rendering the main card.
 * @return {CardService.Card} The card to show the user.
 */
function onHomepage(e) {
  var builder = CardService.newCardBuilder();

  var templateSection = CardService.newCardSection();
  var step1Paragraph = CardService.newTextParagraph()
    .setText("Step 1: Create the current Google Doc into a resume template. To see an example, click Create Sample Template");
  var makeSampleResumeTemplateButton = CardService.newTextButton()
    .setText('Create Sample Template')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setBackgroundColor("#4688F1")
    .setOnClickAction(
      CardService.newAction()
      .setFunctionName('makeSampleResumeTemplate')
    );
  templateSection.addWidget(step1Paragraph);
  templateSection.addWidget(makeSampleResumeTemplateButton);
  builder.addSection(templateSection);

  var experienceSection = CardService.newCardSection();
  var step2Paragraph = CardService.newTextParagraph()
    .setText("Step 2: Select a Google Sheet containing your experiences to be used to fill out the resume template. To see an example, click Create Sample Sheet.");
  var makeSampleExperienceSpreadsheet = CardService.newTextButton()
    .setText('Create Sample Sheet')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setBackgroundColor("#1D9C5B")
    .setOnClickAction(
      CardService.newAction()
      .setFunctionName('makeSampleExperienceSpreadsheet')
    );

  var selectExistingExperienceSpreadsheet = CardService.newTextButton()
    .setText('Select Existing Sheet')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setBackgroundColor("#1D9C5B")
    .setOnClickAction(CardService.newAction().setFunctionName('showPickerExperienceDB'));

  experienceSection.addWidget(step2Paragraph);
  experienceSection.addWidget(makeSampleExperienceSpreadsheet);
  experienceSection.addWidget(selectExistingExperienceSpreadsheet);
  builder.addSection(experienceSection);

  var jobDescriptionSection = CardService.newCardSection();
  var step3Paragraph = CardService.newTextParagraph()
    .setText("Step 3: Paste in a job description that will be used to tailor your resume. For an example, click Fill With Example Description and refresh the addon or reload the page.");

  var fillWithExampleJobDescriptionButton = CardService.newTextButton()
    .setText('Fill With Example Description')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setBackgroundColor("#484848")
    .setOnClickAction(
      CardService.newAction()
      .setFunctionName('fillExampleJobDescription')
    );

  var jobDescriptionInputProperty = PropertiesService.getUserProperties().getProperty("jobDescriptionInput") ? PropertiesService.getUserProperties().getProperty("jobDescriptionInput") : "";
  var jobDescriptionInput = CardService.newTextInput()
    .setFieldName("jobDescriptionInput")
    .setTitle("Enter Job Description")
    .setValue(htmlEntities(jobDescriptionInputProperty))
    .setMultiline(true)
    .setOnChangeAction(CardService.newAction()
      .setFunctionName("handleJobDescriptionInputChange")
    )
  jobDescriptionSection.addWidget(step3Paragraph);
  jobDescriptionSection.addWidget(fillWithExampleJobDescriptionButton);
  jobDescriptionSection.addWidget(jobDescriptionInput);
  builder.addSection(jobDescriptionSection);

  var skillMatchingSection = CardService.newCardSection();
  var step4Paragraph = CardService.newTextParagraph()
    .setText("Step 4: Paste regex patterns to identify skills in the experiences spreadsheet and job description. For an example, click Fill With Example Regex and refresh the addon or reload the page");

  var regexSkillsInputProperty = PropertiesService.getUserProperties().getProperty("regexSkillsInput") ? PropertiesService.getUserProperties().getProperty("regexSkillsInput") : "";

  var regexSkillsInput = CardService.newTextInput()
    .setFieldName("regexSkillsInput")
    .setTitle("Enter Regex Patterns")
    .setValue(htmlEntities(regexSkillsInputProperty))
    .setMultiline(true)
    .setOnChangeAction(CardService.newAction()
      .setFunctionName("handleRegexInputChange")
    );

  var fillWithExampleRegexButton = CardService.newTextButton()
    .setText('Fill With Example Regex')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setBackgroundColor("#852536")
    .setOnClickAction(
      CardService.newAction()
      .setFunctionName('fillExampleRegex')
    );
  skillMatchingSection.addWidget(step4Paragraph);
  skillMatchingSection.addWidget(fillWithExampleRegexButton);
  skillMatchingSection.addWidget(regexSkillsInput);
  builder.addSection(skillMatchingSection);

  var generateResumeSection = CardService.newCardSection();
  var step5Paragraph = CardService.newTextParagraph()
    .setText("Step 5: Generate the resume by clicking the below button");
  var generateResumeButton = CardService.newTextButton()
    .setText('Generate Resume')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setOnClickAction(
      CardService.newAction()
      .setFunctionName('generateResume')
    );
  generateResumeSection.addWidget(step5Paragraph);
  generateResumeSection.addWidget(generateResumeButton);
  builder.addSection(generateResumeSection);

  return builder.build();

}

function handleRegexInputChange(c) {
  var content = c.formInputs.regexSkillsInput;
  if (content) {
    PropertiesService.getUserProperties().setProperty("regexSkillsInput", content[0]);
  }
}

function handleJobDescriptionInputChange(c) {
  var content = c.formInputs.jobDescriptionInput;
  if (content) {
    PropertiesService.getUserProperties().setProperty("jobDescriptionInput", content[0]);
  }
}

function fillExampleRegex(c) {
  PropertiesService.getUserProperties().setProperty("regexSkillsInput", "/(?&lt;!(^|&#92;. |&#92;n))[A-Z]&#92;w+( [A-Z]&#92;w+)*/g\n/(?&lt;=^|&#92;W)[A-Z][&#92;+#]*(?=&#92;W|$)/g");
}

function fillExampleJobDescription(c) {
  PropertiesService.getUserProperties().setProperty("jobDescriptionInput", `Minimum Qualifications:
4+ years experience coding in higher-level languages (e.g. Python, C++, Java, Angular).`)
}

function htmlEntities(str) {
  return str.replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace('\\', '&#92;')
}