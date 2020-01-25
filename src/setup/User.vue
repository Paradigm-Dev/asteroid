<template>
  <div class="setup user">
    <v-card-text>
      <h1 class="display-1 font-weight-light mb-2">User</h1>
      <v-divider></v-divider>
      <v-text-field label="Given Name" style="width: 400px; margin: auto;" class="mt-6" v-model="$root.data.given_name"></v-text-field>
      <v-text-field label="Username" style="width: 400px; margin: auto;" v-model="$root.data.username"></v-text-field>
      <v-text-field label="Password" style="width: 400px; margin: auto;" v-model="$root.data.password" type="password"></v-text-field>
      <div style="height: 100px;"></div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      console: console
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