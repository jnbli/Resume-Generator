function setProperty(key, value) {
  let userProperties = PropertiesService.getUserProperties()
  userProperties.setProperty(key, value) // Updates stored value.
}

function getProperty(key) {
  let userProperties = PropertiesService.getUserProperties()
  return userProperties.getProperty(key)
}

function printProperties() {
  let userProperties = PropertiesService.getUserProperties()
  Logger.log(userProperties.getProperties())
}

function propertyExists(key) {
  return PropertiesService.getUserProperties().getKeys().includes(key)
  // let userProperties = PropertiesService.getUserProperties()
  // try {
  //   userProperties.getProperty(key)
  //   return true
  // }
  // catch (err) {
  //   return false
  // }
}

function deleteProperty(key) {
  let userProperties = PropertiesService.getUserProperties()
  userProperties.deleteProperty(key)
}

function deleteAllProperties() {
  let userProperties = PropertiesService.getUserProperties()
  userProperties.deleteAllProperties()
}

function test() {
  let x = propertyExists('resumetemplate')
  // let x = PropertiesService.getUserProperties().g
  Logger.log(x)
}
