<template>
  <v-container style="text-align: center;">
    <div v-if="latitude && longitude">
      <img class="icon" :src="icon" :alt="summary">
      <h2 class="temperature">{{ temperature }}<span v-if="temperature">°F</span></h2>
      <h5 class="summary">{{ summary }}</h5>
      <h6 class="description">{{ wind_speed }}<span v-if="wind_speed"> mph at </span>{{ wind_direction }}</h6>
      <h6 class="description"><span v-if="humidity">Humidity: </span>{{ humidity }}<span v-if="humidity">&#x25;</span></h6>
      <h6 class="description"><span v-if="dew_point">Dew Point: </span>{{ dew_point }}<span v-if="dew_point">°F</span></h6>
      <h6 class="description"><span v-if="cloud_cover">Cloud Cover: </span>{{ cloud_cover }}<span v-if="cloud_cover">&#x25;</span></h6>
      <h6 class="description"><span v-if="cloud_cover">UV Index: </span>{{ uv_index }}</h6>
      <h6 class="description"><span v-if="visibility">Visbility: </span>{{ visibility }} <span v-if="visibility">mi</span></h6>
      <h6 class="description"><span v-if="precipitaion_chance != null || !precipitaion_chance">Chance of Precipitaion: </span>{{ precipitaion_chance }}<span v-if="precipitaion_chance != null || !precipitaion_chance">&#x25;</span></h6>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Weather',
  data() {
    return {
      temperature: '',
      summary: '',
      timestamp: '',
      icon: '',
      wind_speed: '',
      wind_direction: '',
      humidity: '',
      dew_point: '',
      cloud_cover: '',
      uv_index: '',
      visibility: '86',
      precipitaion_chance: '',
      latitude: '',
      longitude: ''
    }
  },
  created() {
    this.$root.loadingBar = true
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.reload()
    })
    this.$root.loadingBar = false
  },
  methods: {
    reload() {
      this.$root.loadingBar = true
      axios.get(`https://cors.io/?https://api.darksky.net/forecast/36090b633b11e11a7eb790775044992a/${this.latitude},${this.longitude}`).then(response => {
        var temperature_input = response.data.currently.temperature.toString()
        this.temperature = temperature_input.substring(0, temperature_input.lastIndexOf('.'))
        this.summary = response.data.currently.summary
        this.timestamp = moment(response.data.currently.time).format('MMMM Do')
        this.icon = `https://relay.theparadigmdev.com/weather/${response.data.currently.icon}.png`
        var wind_speed_input = response.data.currently.windSpeed.toString()
        this.wind_speed = wind_speed_input.substring(0, wind_speed_input.lastIndexOf('.'))
        this.wind_direction = this.degToCompass(response.data.currently.windBearing)
        this.humidity = this.toPercent(response.data.currently.humidity)
        this.cloud_cover = this.toPercent(response.data.currently.cloudCover)
        var dew_point_input = response.data.currently.dewPoint.toString()
        this.dew_point = dew_point_input.substring(0, dew_point_input.lastIndexOf('.'))
        this.uv_index = response.data.currently.uvIndex
        var visibility_input = response.data.currently.visibility.toString()
        this.visibility = visibility_input.substring(0, visibility_input.lastIndexOf('.'))
        this.precipitaion_chance = this.toPercent(response.data.currently.precipProbability)
        this.$root.loadingBar = false
      }).catch(error => {
        console.error(error)
      }).then(() => {

      })
    },
    cToF(input) {
      return ((input * 9/5) + 32).toString()
    },
    degToCompass(input) {
      var val = Math.floor((input / 22.5) + 0.5)
      var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
      return arr[(val % 16)]
    },
    toPercent(input) {
      return Math.floor(input * 100)
    }
  }
}
</script>

<style scoped>
.icon {
  padding-top: 24px;
}

.temperature {
  display: inline-block;
  padding-left: 16px;
  position: relative;
  bottom: +16px;
}

.summary {
  padding: 24px;
}

.description {
  padding-top: 16px;
  font-weight: 400;
}
</style>
