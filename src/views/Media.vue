<template>
  <div class="media">
    <v-toolbar class="grey darken-3" dense>
      <v-spacer></v-spacer>
      <v-toolbar-title class="red--text font-weight-light">Rights to the items below are reserved for their owners.</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-tabs fixed-tabs icons-and-text>
      <v-tab>
        Books
        <v-icon>book</v-icon>
      </v-tab>
      <v-tab-item>
        <books/>
      </v-tab-item>
      <v-tab>
        Movies
        <v-icon>movie</v-icon>
      </v-tab>
      <v-tab-item>
        <movies/>
      </v-tab-item>
      <v-tab>
        Music
        <v-icon>music_note</v-icon>
      </v-tab>
      <v-tab-item>
        <music/>
      </v-tab-item>
      <v-tab>
        TV Shows
        <v-icon>tv</v-icon>
      </v-tab>
      <v-tab-item>
        <tv/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Tv from './../components/TV'
import Music from './../components/Music'
import Movies from './../components/Movies'
import Books from './../components/Books'

export default {
  name: 'Media',
  components: {
    'tv': Tv,
    'music': Music,
    'movies': Movies,
    'books': Books
  }
}
</script>

<style scoped>

</style>