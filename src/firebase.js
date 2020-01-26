import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCQqPjLsa4fKf82dQ6V1iMxFlKgmDurnBA",
  authDomain: "paradigm-a1bc9.firebaseapp.com",
  databaseURL: "https://paradigm-a1bc9.firebaseio.com",
  projectId: "paradigm-a1bc9",
  storageBucket: "paradigm-a1bc9.appspot.com",
  messagingSenderId: "728943503114",
  appId: "1:728943503114:web:4ea6a4f7b7f57e71"
})

firebaseApp.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
})
firebaseApp.firestore().enablePersistence()
firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

const auth = firebaseApp.auth()
const storage = firebaseApp.storage().ref()
const db = firebaseApp.firestore()
const func = firebaseApp.functions()
const app = firebase

export { db, storage, auth, func, app }