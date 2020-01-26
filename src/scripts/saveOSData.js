import electron from 'electron'
import fs from 'fs'
import path from 'path'
import { db } from '@/firebase.js'

export default (username, newUserData) => {
  db.collection('users').doc(username).update({
    asteroid: newUserData
  }).then(() => {
    return true
  }).catch(error => {
    console.error(error)
    return false
  })
}