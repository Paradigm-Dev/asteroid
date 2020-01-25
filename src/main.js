import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import saveOSData from '@/scripts/saveOSData.js'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    $saveData() {
      saveOSData(this.$root.data)
    }
  }
})

new Vue({
  store,
  vuetify,
  render: h => h(App),
  data() {
    return {
      launch_menu: false,
      data: {}
    }
  }
}).$mount('#app')
