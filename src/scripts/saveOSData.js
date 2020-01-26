import electron from 'electron'
import fs from 'fs'
import path from 'path'

export default (newUserData) => {
  const userDataPath = (electron.app || electron.remote.app).getPath('userData')
  var pathway = path.join(userDataPath, 'data.json')
  fs.writeFileSync(pathway, JSON.stringify(newUserData))
}