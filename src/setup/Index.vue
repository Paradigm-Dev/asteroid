<template>
  <div class="setup index">
    <v-card width="1000" class="window text-center" style="background-color: rgba(132, 0, 187, .8);">
      <v-system-bar height="32" style="background-color: rgba(132, 0, 187, .8);">
        <span class="__style-appname">Apollo Installer</span>
        <v-spacer></v-spacer>
        <v-btn x-small icon @click="$minimizeWindow()"><v-icon>mdi-power</v-icon></v-btn>
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
  </div>
</template>

<script>
import Start from './Start.vue'
import Region from './Region.vue'
import User from './User.vue'
import Finish from './Finish.vue'

import Moveable from 'moveable'

export default {
  name: 'AsteroidAutomatedSetupProcess',
  data() {
    return {
      minimized: false,
      page: 1
    }
  },
  components: {
    Start, Region, User, Finish
  },
  methods: {
    quit() {
      this.$root.data.setup_completed = true
      this.$saveData()
      console.log('Done with setup')
    }
  },
  mounted() {
    const moveable = new Moveable(document.body, {
      target: document.querySelector('.window'),
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
  }
}
</script>

<style>
.d-none {
  display: none !important;
}
</style>