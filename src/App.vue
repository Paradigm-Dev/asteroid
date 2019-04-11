<template>
  <v-app dark>
    <v-system-bar window dark app style="-webkit-app-region: drag;" class="grey darken-4">
      <div style="-webkit-app-region: no-drag">
        <v-icon @click="reload()" v-ripple>refresh</v-icon>
        <img src="./assets/corner-img.png" height="18" style="position: relative; top: +2px; margin-right: 5px;">
        <span style="margin-right: 5px;">Asteroid</span>
      </div>
      <v-spacer></v-spacer>
      <div style="-webkit-app-region: no-drag; position: relative; top: +1px;">
        <v-icon @click="minimize()" v-ripple>remove</v-icon>
        <v-icon @click="maximize()" v-if="!maximized" v-ripple>check_box_outline_blank</v-icon>
        <v-icon @click="unmaximize()" v-if="maximized" v-ripple>check_box_outline_blank</v-icon>
        <v-icon @click="close()" v-ripple>close</v-icon>
      </div>
    </v-system-bar>

    <v-toolbar app style="background: linear-gradient(to right, #542478 0%, #011949 100%);">
      <v-toolbar-title class="headline text-uppercase">
        <span>Paradigm</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
const remote = require('electron').remote

export default {
  name: 'Asteroid',
  data() {
    return {
      win: remote.getCurrentWindow(),
      maximized: remote.getCurrentWindow().isMaximized()
    }
  },
  methods: {
    close() {
      this.win.close()
    },
    maximize() {
      this.win.maximize()
      this.maximized = remote.getCurrentWindow().isMaximized()
    },
    unmaximize() {
      this.win.unmaximize()
      this.maximized = remote.getCurrentWindow().isMaximized()
    },
    minimize() {
      this.win.minimize()
    },
    reload() {
      location.reload()
    }
  }
}
</script>

<style>
/* Scrollbar */

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(241, 241, 241, 0.25);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

html {
  overflow-y: auto;
}
</style>
