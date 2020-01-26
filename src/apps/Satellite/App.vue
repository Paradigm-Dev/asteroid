<template>
  <div>
    <v-card :width="app.config.width" class="text-center" :style="{ backgroundColor: app.config.color }">
      <v-system-bar height="32" :style="{ backgroundColor: app.config.color }" style="z-index: 100;" class="elevation-5">
        <span class="__style-appname">{{ app.name }}</span>
        <v-spacer></v-spacer>
        <v-btn x-small icon @click="minimizeApp()"><v-icon>mdi-minus</v-icon></v-btn>
        <v-btn x-small icon @click="closeApp()"><v-icon>mdi-crop-square</v-icon></v-btn>
        <v-btn x-small icon @click="closeApp()"><v-icon>mdi-close</v-icon></v-btn>
      </v-system-bar>

      <v-toolbar dense color="rgba(69, 90, 100, .8)">
        <v-text-field color="white" class="mt-9" label="Web Address" v-model="input"></v-text-field>
        <v-btn text icon @click="changeURL()"><v-icon>mdi-arrow-right</v-icon></v-btn>
      </v-toolbar>

      <iframe id="satellite-embed" crossorigin="anonymous" :src="input"></iframe>
    </v-card>
  </div>
</template>

<script>
import * as windowManager from '@/lifecycle/windowManager.js'

export default {
  name: 'Contacts',
  props: [ 'app' ],
  data() {
    return {
      input: 'https://www.bing.com/'
    }
  },
  methods: {
    closeApp() {
      var thisApp = this.app
      function findAppIndex(app) {
        return app == thisApp
      }
      var index = windowManager.apps.findIndex(findAppIndex)
      console.log('closing', index)
      windowManager.close(index)
    },
    minimizeApp() {
      var thisApp = this.app
      function findAppIndex(app) {
        return app == thisApp
      }
      var index = windowManager.apps.findIndex(findAppIndex)
      console.log('minimizing', index)
      windowManager.minimize(index)
    }
  }
}
</script>

<style scoped>
iframe {
	height: 1000px;
	width: 100%;
	border: 0px;
}
</style>