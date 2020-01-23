import electron from 'electron'
import path from 'path'
import fs from 'fs'

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
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

export default data