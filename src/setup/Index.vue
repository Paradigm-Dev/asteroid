<template>
  <div class="setup index">
    <v-card width="1000" class="window">
      <v-system-bar style="-webkit-app-region: drag; cursor: move;">
        <span class="__style-appname">Rover</span>
        <v-spacer></v-spacer>
        <v-btn x-small icon @click="$minimizeWindow()"><v-icon>mdi-power</v-icon></v-btn>
      </v-system-bar>

      <Start />

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="blue lighten-2">Next</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Start from './Start.vue'
import Moveable from 'moveable'

export default {
  name: 'AsteroidAutomatedSetupProcess',
  data() {
    return {
      minimized: false
    }
  },
  components: {
    Start
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