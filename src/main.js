import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

import saveOSData from "@/scripts/saveOSData.js";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    $saveData() {
      saveOSData(this.$root.user._id, this.$root.data);
    }
  }
});

new Vue({
  store,
  vuetify,
  render: h => h(App),
  data() {
    return {
      user: false,
      data: false,
      launch_menu: false
    };
  }
}).$mount("#app");
