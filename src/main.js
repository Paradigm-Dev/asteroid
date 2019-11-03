import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import VueChatScroll from 'vue-chat-scroll'
import VueAnalytics from 'vue-analytics'
import store from './store'
import { perf } from '@/firebase'

const opts = {
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
}

Vue.use(Vuetify)

Vue.use(VueAnalytics, {
	id: 'UA-52752236-3',
	router
})

Vue.config.productionTip = false

Vue.use(VueChatScroll)

Vue.mixin({
  methods: {
    route(to) {
      this.$root.switch = to
    }
  },
  data() {
    return {
      username: '',
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
      switch: 'Home',
      uid: '',
      terminalOpen: false,
      account_dialog: false
    }
  }
})

new Vue({
  router,
  store,
  render: function(h) { return h(App) },
  vuetify: new Vuetify(opts)
}).$mount('div#app')    
