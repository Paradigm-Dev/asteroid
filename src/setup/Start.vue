<template>
  <div class="setup start">
    <v-card-text class="text-center">
      <h1 class="display-2 font-weight-light mt-12">Welcome to Asteroid!</h1>
      <p class="pt-6">Click next to continue with the setup process.</p>
      <div style="height: 100px;"></div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'Start',
  data() {
    return {
      console: console,
    }
  },
  methods: {
    $minimizeWindow() {
      this.minimized = true
    },
    dragWindow(e) {
      this.x = e.x
      this.y = e.y
    },
    dragCard(event) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

      pos1 = pos3 - event.clientX
      pos2 = pos4 - event.clientY
      pos3 = event.clientX
      pos4 = event.clientY

      document.querySelector(event.target).style.top = pos1
      document.querySelector(event.target).style.left = pos2
    }
  },
  components: {
    
  }
//   mounted() {
//     dragElement(this.$refs.card);

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   this.$refs.cardheader.onmousedown = dragMouseDown;

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }

//   }
}
</script>

<style scoped>

</style>