function getSkills(text) {
  var skills = []
  var oneletter = text.match(/(?<=\W)[A-Z][\+#]*(?=$|\W)/g)
  if (oneletter) {
    skills = skills.concat(oneletter)
  }
  var twoletterplus = text.match(/(?<!(^|\. ))(?<=\W)(\w?[A-Z]\w+ ?)+/g)
  if (twoletterplus) {
    skills = skills.concat(twoletterplus)
  }
  skills = skills.map((skill) => skill.trim())
  skills = skills.filter((v, i, a) => a.indexOf(v) === i)
  return skills
}

function getSubstitutions() {
  let text = DocumentApp.getActiveDocument().getBody().getText()
  let substitutions = []

  let pattern = /\{\w+\.\w+\}/g
  let matches = text.match(pattern)

  let counts = {}
  let seen = {}


  if (matches) {
    matches.forEach(match => {
      let parts = match.replace('{','').replace('}','').split('.')
      let tab = parts[0]
      let header = parts[1]

      if (tab in counts) {
      }
      else {
        counts[tab] = 0
      }

      if (tab in seen) {
        if (seen[tab].includes(header)) {
          seen[tab] = []
          counts[tab] += 1
        }
        else {
          seen[tab].push(header)
        }
      }
      else {
        seen[tab] = [header]
      }

      substitutions.push([match, tab, header, counts[tab]])
    })
  }
  // Logger.log(substitutions)
  return substitutions
}
