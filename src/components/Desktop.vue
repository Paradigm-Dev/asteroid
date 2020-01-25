<template>
  <div class="desktop-wrapper">
    <div @click="openApp('Calculator')" class="app-display" v-ripple>
      <img src="@/apps/Calculator/icon.png">
      <span>Calculator</span>
    </div>

    <div @click="openApp('Contacts')" class="app-display" v-ripple>
      <img src="@/apps/Contacts/icon.png">
      <span>Contacts</span>
    </div>

    <v-card v-for="(app, index) in apps" :key="index" :width="app.config.width" class="window text-center" :id="app.index" :style="{ backgroundColor: app.config.color }">
      <v-system-bar height="32" :style="{ backgroundColor: app.config.color }">
        <span class="__style-appname">{{ app.name }}</span>
        <v-spacer></v-spacer>
        <v-btn x-small icon @click="$minimizeWindow()"><v-icon>mdi-minimize</v-icon></v-btn>
      </v-system-bar>

      <component :is="app.name"></component>

      <v-card-actions :style="{ backgroundColor: app.config.color }">
        <!-- <v-btn :disabled="page >= 4 || page <= 1" @click="page >= 8 || page <= 1 ? console.log() : page -= 1" text color="blue lighten-2">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="page >= 4 ? quit() : page += 1" text color="blue lighten-2">Next</v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import * as windowManager from '@/lifecycle/windowManager.js'
import Moveable from 'moveable'

export default {
  data() {
    return {
      document: document,
      apps: windowManager.apps
    }
  },
  methods: {
    openApp(app) {
      if (!this.$root.data.apps[app]) {
        this.$root.data.apps[app] = {
          width: 500,
          color: 'rgba(72, 72, 72, .65)'
        }
      }
      windowManager.open(app, this.$root.data.apps[app])
    },
    refreshMoveable() {
      this.apps.forEach(app => {
        const moveable = new Moveable(document.body, {
          target: document.querySelector(`#${app.index}`),
          draggable: true,
          throttleDrag: 0,
          renderDirections: [],
          // className: 'd-none',
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
  background: url('./../assets/default_backdrop.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center; 
  height: 100%;
  width: 100%;
  padding: 24px;
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