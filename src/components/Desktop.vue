<template>
  <div class="desktop">
    <v-app-bar dense style="background: rgba(82, 82, 102, .8); z-index: 100000;">
      <v-app-bar-nav-icon @click="$root.launch_menu = !$root.launch_menu" v-model="$root.launch_menu"><v-avatar :src="picURLresolve"></v-avatar></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-medium text-uppercase" :style="{ color: $root.user.color }">{{ $root.data.username }}</v-toolbar-title>
      <v-divider vertical inset class="ml-8 mr-4"></v-divider>
      <v-fade-transition group>
        <v-btn :color="app.config.color" text @click="unminimizeApp(app)" v-for="(app, index) in minimized" :key="index">{{ app.name }}</v-btn>
      </v-fade-transition>
      <v-spacer></v-spacer>
      <v-btn icon @click="winManReload()"><v-icon>mdi-dock-window</v-icon></v-btn>
      <v-btn icon @click="__winReload()"><v-icon>mdi-reload</v-icon></v-btn>
    </v-app-bar>

    <div class="desktop-wrapper">
      <v-fade-transition group style="z-index: 1;">
        <div v-if="app.visible" v-for="(app, index) in apps" :key="index" class="window" :class="app.class" style="position: absolute;">
          <component :app="app" :is="app.name"></component>
        </div>
      </v-fade-transition>

      <div @click="openApp('Calculator')" class="app-display" v-ripple>
        <img src="@/apps/Calculator/icon.png">
        <span>Calculator</span>
      </div>

      <div @click="openApp('Contacts')" class="app-display" v-ripple>
        <img src="@/apps/Contacts/icon.png">
        <span>Contacts</span>
      </div>

      <div @click="openApp('Satellite')" class="app-display" v-ripple>
        <img src="@/apps/Satellite/icon.png">
        <span>Satellite</span>
      </div>

      <div @click="openApp('Todo')" class="app-display" v-ripple>
        <img src="@/apps/Todo/icon.png">
        <span>To-Do</span>
      </div>

      <p class="mb-4 mr-4 clock">
        <span class="title font-weight-medium">{{ time }}</span><br>
        <span class="font-weight-light">{{ date }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import * as windowManager from '@/lifecycle/windowManager.js'

import Moveable from 'moveable'
import { remote } from 'electron'
import moment from 'moment'

export default {
  data() {
    return {
      win: remote.getCurrentWindow(),
      document: document,
      apps: windowManager.apps,
      minimized: windowManager.minimized,
      time: '',
      date: ''
    }
  },
  computed: {
    picURLresolve() {
      var url = 'https://relay.theparadigmdev.com/profile-pics/' + this.$root.user.pic + '.jpg'
      return url
    }
  },
  methods: {
    __winReload() {
      this.win.reload()
    },
    winManReload() {
      this.refreshMoveable()
      this.apps = windowManager.apps
      this.minimized = windowManager.minimized
    },
    openApp(app) {
      this.refreshMoveable()
      if (!this.$root.data.apps[app]) {
        this.$root.data.apps[app] = {
          actions: false,
          width: 500,
          color: 'rgba(72, 72, 72, .65)'
        }
      }
      windowManager.open(app, this.$root.data.apps[app])
      this.apps = windowManager.apps
      setTimeout(() => {
        this.winManReload()
      }, 1)
    },
    unminimizeApp(app) {
      function findAppIndex(array_app) {
        return array_app == app
      }
      var index = windowManager.minimized.findIndex(findAppIndex)
      console.log('unminimizing', index)
      windowManager.unMinimize(index)
      setTimeout(() => {
        this.winManReload()
      }, 1)
    },
    refreshMoveable() {
      this.apps.forEach(app => {
        const moveable = new Moveable(document.body, {
          target: document.querySelector(`.${app.class}`),
          draggable: true,
          throttleDrag: 0,
          renderDirections: [],
          className: 'd-none',
          origin: false
        })

        const frame = { translate: [0, 0] }
        moveable.on("dragStart", ({ set }) => {
          set(frame.translate)
        }).on("drag", ({ target, beforeTranslate }) => {
          frame.translate = beforeTranslate;
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
        }).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {})
      })
    },
    startTime() {
			var today = new Date()
			this.date = moment(today).format('MMMM Do, YYYY')
			this.time = moment(today).format('LTS')
			setTimeout(this.startTime, 500)
		}
  },
  mounted() {
    this.winManReload()
    this.startTime()
  }
}
</script>

<style scoped>
.desktop-wrapper {
  padding: 24px;
}

.desktop {
  background: url('./../assets/default_backdrop.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}

.app-display {
  width: 99px;
  border-radius: 12px;
  text-align: center;
  vertical-align: middle;
  padding: 12px;
}

.app-display img {
  height: 75px;
  width: 75px;
}

.app-display span {
  margin: auto;
}

.clock {
  position: absolute;
  bottom: 0px;
  right: 0px;
  text-align: right;
  z-index: 0 !important;
}
</style>