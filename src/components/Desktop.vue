<template>
  <div class="desktop">
    <v-app-bar dense style="background: rgba(72, 72, 72, .8);">
      <v-app-bar-nav-icon @click="$root.launch_menu = !$root.launch_menu" v-model="$root.launch_menu"><v-icon>mdi-rocket</v-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Asteroid</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="__winReload()"><v-icon>mdi-reload</v-icon></v-btn>
    </v-app-bar>

    <div class="desktop-wrapper">
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

      <div v-if="app.visible" v-for="(app, index) in apps" :key="index" class="window" :class="app.class">
        <component :app="app" :is="app.name"></component>
      </div>
    </div>
  </div>
</template>

<script>
import * as windowManager from '@/lifecycle/windowManager.js'

import Moveable from 'moveable'
import { remote } from 'electron'

export default {
  data() {
    return {
      win: remote.getCurrentWindow(),
      document: document,
      apps: windowManager.apps
    }
  },
  methods: {
    __winReload() {
      this.win.reload()
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
        this.refreshMoveable()
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
    }
  },
  mounted() {
    this.refreshMoveable()
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
</style>