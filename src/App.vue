<template>
  <v-app>
    <v-app-bar dense app style="background-color: rgba(72, 72, 72, .65);" v-if="$root.data.setup_completed">
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

        <v-list-item @click="$root.data.setup_completed = false">
          <v-list-item-icon><v-icon>mdi-power-sleep</v-icon></v-list-item-icon>
          <v-list-item-title>Enter setup mode</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="(app, index) in apps" :key="index">
          <v-list-item-title>{{ app.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-content v-if="$root.data.setup_completed">
      <Desktop />
    </v-content>

    <v-content v-if="!$root.data.setup_completed">
      <div class="fill-height setup-bg">
        <p class="pt-4 pl-4">
          <span class="title font-weight-medium">{{ time }}</span><br>
          <span class="font-weight-light">{{ date }}</span>
        </p>

        <p style="position: absolute; top: 16px; right: 16px; text-align: right;">
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
import Desktop from './components/Desktop'
import { remote } from 'electron'
import moment from 'moment'

import * as windowManager from '@/lifecycle/windowManager.js'
import OSBootData from './lifecycle/getOSData.js'
import AsteroidAutomatedSetupProcess from './setup/Index.vue'

export default {
  name: 'App',
  components: {
    Desktop,
    AsteroidAutomatedSetupProcess
  },
  data() {
    return {
      console: console,
      win: remote.getCurrentWindow(),
      time: moment(Date.now()).format('LT'),
      date: moment(Date.now()).format('dddd, MMMM Do, YYYY'),
      apps: windowManager.apps
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
    this.$root.data = OSBootData
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

.v-card {
  border-radius: 10px;
}
</style>