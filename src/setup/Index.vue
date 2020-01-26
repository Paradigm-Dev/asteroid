<template>
  <div class="setup index">
    <v-card width="1000" class="window text-center" style="background: rgba(132, 0, 187, .8);">
      <v-system-bar height="32" style="background-color: rgba(132, 0, 187, .8);">
        <span class="__style-appname">Apollo Installer</span>
        <v-spacer></v-spacer>
        <v-btn x-small icon @click="refreshMoveable()"><v-icon>mdi-reload</v-icon></v-btn>
        <v-btn x-small icon @click="cancel_popup = true"><v-icon>mdi-power</v-icon></v-btn>
      </v-system-bar>

      <Start v-if="page == 1" />
      <Region v-if="page == 2" />
      <User v-if="page == 3" />
      <Finish v-if="page == 4" />

      <v-card-actions style="background-color: rgba(132, 0, 187, .8);">
        <v-btn :disabled="page >= 4 || page <= 1" @click="page >= 8 || page <= 1 ? console.log() : page -= 1" text color="blue lighten-2">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="page >= 4 ? quit() : page += 1" text color="blue lighten-2">Next</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="cancel_popup" width="350" class="window-confirm text-center" style="background: rgba(154, 0, 0, .8)">
      <v-container fluid class="pb-0">
        <v-row>
          <v-col sm="4" class="text-center">
            <v-icon class="display-2 pt-6">mdi-alert</v-icon>
          </v-col>
          <v-col sm="8" class="text-left">
            <h1 class="display-1 font-weight-light pb-2">Warning</h1>
            <span class="font-weight-light grey--text text--lighten-2">Are you sure you want to cancel the installation?</span>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="red" @click="close()">Yes</v-btn>
        <v-btn text color="green" @click="cancel_popup = false">No</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Start from './Start.vue'
import Region from './Region.vue'
import User from './User.vue'
import Finish from './Finish.vue'

import Moveable from 'moveable'
import { remote } from 'electron'

export default {
  name: 'AsteroidAutomatedSetupProcess',
  data() {
    return {
      minimized: false,
      page: 1,
      cancel_popup: false
    }
  },
  components: {
    Start, Region, User, Finish
  },
  methods: {
    close() {
      remote.getCurrentWindow().close()
    },
    quit() {
      this.$root.data.setup_completed = true
      this.$root.logged_in = true
      this.$saveData()
      console.log('Done with setup')
    },
    refreshMoveable() {
      const moveable = new Moveable(document.body, {
        target: document.querySelector('.window'),
        draggable: true,
        throttleDrag: 0,
        renderDirections: [],
        className: 'd-none',
        origin: false
      })

      const moveable_confirm = new Moveable(document.body, {
        target: document.querySelector('.window-confirm'),
        draggable: true,
        throttleDrag: 0,
        renderDirections: [],
        className: 'd-none',
        origin: false
      })

      const frame = {
        translate: [0, 0],
      }

      moveable.on("dragStart", ({ set }) => {
        set(frame.translate)
      }).on("drag", ({ target, beforeTranslate }) => {
        frame.translate = beforeTranslate;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
      }).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {

      })

      moveable_confirm.on("dragStart", ({ set }) => {
        set(frame.translate)
      }).on("drag", ({ target, beforeTranslate }) => {
        frame.translate = beforeTranslate;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
      }).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {

      })
    }
  },
  mounted() {
    this.refreshMoveable()
  }
}
</script>

<style>
.d-none {
  display: none !important;
}
</style>