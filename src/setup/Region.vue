<template>
  <div class="setup region">
    <v-card-text class="text-center">
      <h1 class="display-1 font-weight-light mb-2">Region</h1>
      <v-divider></v-divider>
      <p class="mt-2">Where do you live?</p>
      <v-text-field style="width: 400px;" class="mx-auto" v-model="query" label="Search..."></v-text-field>
      <v-list nav dense class="text-left" style="height: 500px; overflow: scroll;">
        <v-list-item-group mandatory v-model="$root.data.region" style="height: 500px;">
          <v-list-item :value="region.name" v-for="region in filteredRegions" :key="region.code">
            <v-list-item-icon>{{ region.code }}</v-list-item-icon>
            <v-list-item-title>{{ region.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </div>
</template>

<script>
import regions from '@/data/regions.js'

export default {
  name: 'Region',
  data() {
    return {
      console: console,
      query: ''
    }
  },
  computed: {
    filteredRegions() {
			return regions.filter(region => {
				if (region.name.toLowerCase().includes(this.query.toLowerCase()) || region.code.toLowerCase().includes(this.query.toLowerCase())) {
					return region
				}
			})
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
.v-list .v-sheet {
  background-color: none;
}
</style>