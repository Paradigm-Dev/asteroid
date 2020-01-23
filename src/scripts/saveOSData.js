import electron from 'electron'
import fs from 'fs'
import path from 'path'

var pathway = path.join(userDataPath, 'os_data.json')

var data = parseDataFile(pathway)

function parseDataFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch(error) {
    console.log('Configuration file not found', error)
    fs.writeFileSync(filePath, JSON.stringify({
      setup_completed: false
    }))
    return {
      setup_completed: false
    }
  }
}

export default (newUserData) => {
  const userDataPath = (electron.app || electron.remote.app).getPath('userData')
  var pathway = path.join(userDataPath, 'os_data.json')
  fs.writeFileSync(pathway, JSON.stringify(newUserData))
}