import electron from 'electron'
import path from 'path'
import fs from 'fs'

import osDataTemplate from '@/data/dataTemplate.js'

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
var pathway = path.join(userDataPath, 'data.json')

var data = parseDataFile(pathway)

function parseDataFile(filePath) {
  try {
    console.log(pathway)
    return JSON.parse(fs.readFileSync(filePath))
  } catch(error) {
    console.log('Configuration file not found', error)
    fs.writeFileSync(filePath, JSON.stringify(osDataTemplate))
    return osDataTemplate
  }
}

export default data