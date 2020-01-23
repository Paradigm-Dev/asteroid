<template>
  <v-app>
    <v-app-bar dense app style="background: blur(8px);" v-if="OSData.setup_completed">
      <v-app-bar-nav-icon @click="$root.launch_menu = !$root.launch_menu" v-model="$root.launch_menu"><v-icon>mdi-rocket</v-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Asteroid</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="__winReload()"><v-icon>mdi-reload</v-icon></v-btn>
    </v-app-bar>

    <v-menu offset-y v-model="$root.launch_menu">
      <v-list dense>
        <v-list-item @click="__winClose()">
          <v-list-item-icon><v-icon>mdi-power</v-icon></v-list-item-icon>
          <v-list-item-title>Shutdown</v-list-item-title>
        </v-list-item>

        <v-list-item @click="__winMinimize()">
          <v-list-item-icon><v-icon>mdi-power-sleep</v-icon></v-list-item-icon>
          <v-list-item-title>Sleep</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-content v-if="OSData.setup_completed">
      <HelloWorld />
    </v-content>

    <v-content v-if="!OSData.setup_completed">
      <div class="fill-height setup-bg">
        <p style="position: absolute; top: 12px; right: 12px; text-align: right;">
          <span class="font-weight-medium">Paradigm Asteroid</span><br>
          <span class="font-weight-light">Voyager Build 1</span>
        </p>
        <img src="@/assets/logo.png" style="position: absolute; bottom: 12px; left: 12px;">
        <AsteroidAutomatedSetupProcess />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import { remote } from 'electron'

import OSBootData from './lifecycle/created/getOSData.js'
import AsteroidAutomatedSetupProcess from './setup/Index.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AsteroidAutomatedSetupProcess
  },
  data() {
    return {
      console: console,
      win: remote.getCurrentWindow(),
      OSData: {}
    }
  },
  methods: {
    __winClose() {
      this.win.close()
    },
    __winMinimize() {
      this.win.minimize()
    },
    __winReload() {
      this.win.reload()
    }
  },
  created() {
    this.OSData = OSBootData
  }
}
</script>

<style>
.setup-bg {
  background: url('./assets/setup_bg.png');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.center--top-left {
  /* margin: 0; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>