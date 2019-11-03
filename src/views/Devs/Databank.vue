<template>
  <div class="databank">
    <div style="text-align: center; margin: 50px 0px;">
			<h1 class="display-3 red--text font-weight-thin text-uppercase">Unavailable</h1>
			<h6 class="headline white--text font-weight-thin mt-3">Please navigate away from this page.</h6>
		</div>

    <!-- <v-card style="max-width: 800px; margin: 20px auto" v-for="data in testData" :key="data.id">
      <v-img :src="data.url"></v-img>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ data.title }}</h3>
          <h4 class="subtitle-1 grey--text">{{ data.author }}</h4>
        </div>
      </v-card-title>
    </v-card> -->

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Databank',
  data() {
    return {
      testData: []
    }
  },
  created() {
    axios.get('http://relay.theparadigmdev.com/databank/test.json').then(response => {
      this.testData = response.data.data
		}).catch(error => {
			// handle error
			console.log(error)
		}).then(() => {
			// always executed
		})
  }
}
</script>

<style scoped>

</style>
