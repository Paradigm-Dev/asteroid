import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueChatScroll from 'vue-chat-scroll'
import VueFriendlyIframe from 'vue-friendly-iframe';
import VueAnalytics from 'vue-analytics'
import store from './store'
import firebase from 'firebase'
import LogRocket from 'logrocket'
import db from './firestore'
import './registerServiceWorker'

Vue.use(VueAnalytics, {
	id: 'UA-52752236-3',
	router
})

Vue.component('vue-friendly-iframe', VueFriendlyIframe);
Vue.config.productionTip = false

Vue.use(VueChatScroll)

Vue.mixin({
  methods: {
    inquiryEvent(user, event, location, color) {
      console.log(user, event, location, color)
      db.collection('analytics').add({
        user: user,
        event: event,
        location: location,
        timestamp: Date.now(),
        type: 'event',
        color: color
      })
    },
    inquiryError(user, error, location, color) {
      console.error(user, error, location, color)
      db.collection('analytics').add({
        user: user,
        error: error,
        location: location,
        timestamp: Date.now(),
        type: 'error',
        color: color
      })
    }
  },
  data() {
    return {
      username: null,
      accountBio: null,
      accountColor: '#1565C0',
      isAdmin: false,
      isInnerCore: false,
      isAnalytics: false,
      userPresent: null,
      isAsteroid: false,
      isBanned: false,
      feedback: '',
      snackbar: false,
      isWriter: false,
      loadingBar: false,
      darkMode: true
    }
  }
})

let app = null
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: function (h) { return h(App) }
    }).$mount('div#app')    
  }
})

LogRocket.init('uvh8hk/paradigm')
