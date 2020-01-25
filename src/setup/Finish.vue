<template>
  <div class="setup start">
    <v-card-text class="text-center">
      <h1 class="display-2 font-weight-light mt-12">All done!</h1>
      <p class="pt-6">Click next to finish the setup process.</p>
      <div style="height: 100px;"></div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'Finish',
  data() {
    return {
      console: console,
    }
  },
  methods: {
    $minimizeWindow() {
      this.minimized = true
    }
  }
}
</script>

<style scoped>

</style>