<template>
  <v-app>
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

        <v-list-item @click="$root.logged_in = false">
          <v-list-item-icon><v-icon>mdi-logout-variant</v-icon></v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>

        <v-list-item @click="$root.data.setup_completed = false">
          <v-list-item-icon><v-icon>mdi-backup-restore</v-icon></v-list-item-icon>
          <v-list-item-title>Enter setup mode</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div v-if="$root.user" style="height: 100vh;">
      <v-content style="height: 100vh;">
        <Desktop />
      </v-content>

      <!-- <v-content v-if="!$root.user.asteroid.setup">
        <div class="fill-height setup-bg">
          <p class="pt-4 pl-4">
            <span class="title font-weight-medium">{{ time }}</span><br>
            <span class="font-weight-light">{{ date }}</span>
          </p>

          <p style="position: absolute; top: 16px; right: 16px; text-align: right;">
            <span class="font-weight-medium">Paradigm Asteroid</span><br>
            <span class="font-weight-light">Voyager Build 1</span>
          </p>
          <img @click="__winReload()" src="@/assets/logo.png" style="position: absolute; bottom: 12px; left: 12px;">
          <AsteroidAutomatedSetupProcess />
        </div>
      </v-content> -->
    </div>

    <v-content v-else style="height: 100vh;">
      <div class="fill-height setup-bg">
        <p class="pt-4 pl-4">
          <span class="title font-weight-medium">{{ time }}</span><br>
          <span class="font-weight-light">{{ date }}</span>
        </p>

        <p style="position: absolute; top: 16px; right: 16px; text-align: right;">
          <span class="font-weight-medium">Paradigm Asteroid</span><br>
          <span class="font-weight-light">Voyager Build 1</span>
        </p>
        <img @click="__winReload()" src="@/assets/logo.png" style="position: absolute; bottom: 12px; left: 12px;">
        <Login />
      </div>
    </v-content>

  </v-app>
</template>

<script>
import Desktop from './components/Desktop'
import Login from './components/Login'

import { remote } from 'electron'
import moment from 'moment'

import * as windowManager from '@/lifecycle/windowManager.js'
import OSBootData from './lifecycle/getOSData.js'
import AsteroidAutomatedSetupProcess from './setup/Index.vue'

export default {
  name: 'App',
  components: {
    Desktop, Login, AsteroidAutomatedSetupProcess
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
    },
    startTime() {
			var today = new Date()
			this.date = moment(today).format('MMMM Do, YYYY')
			this.time = moment(today).format('LTS')
			setTimeout(this.startTime, 500)
		}
  },
  created() {
    this.startTime()
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

.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 10px;
}

.v-application {
  background: none !important;
}
</style>