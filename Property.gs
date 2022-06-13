function setProperty(key, value) {
  let userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(key, value); // Updates stored value.
}

function getProperty(key) {
  let userProperties = PropertiesService.getUserProperties();
  return userProperties.getProperty(key);
}

function printProperties() {
  let userProperties = PropertiesService.getUserProperties();
  Logger.log(userProperties.getProperties());
}

function propertyExists(key) {
  return PropertiesService.getUserProperties().getKeys().includes(key);
}

function deleteProperty(key) {
  let userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty(key);
}

function deleteAllProperties() {
  let userProperties = PropertiesService.getUserProperties();
  userProperties.deleteAllProperties();
}