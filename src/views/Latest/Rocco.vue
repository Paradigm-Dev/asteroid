<template>
	<div class="rocco">
		<v-container>
			<h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin: 26px 0px 50px 0px; text-align: center;">Latest of Rocco</h1>
			<div v-for="post in latestRocco" :key="post.link">
				<v-card style="max-width: 800px; margin: 20px auto">
					<video width="100%" controls v-if="post.isVideo">
						<source :src="post.link" type="video/mp4">
					</video> 
					<v-img :src="post.link" v-if="!post.isVideo"></v-img>
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">{{ post.title }}</h3>
						</div>
					</v-card-title>
				</v-card>
			</div>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'LatestRocco',
	data() {
		return {
			latestRocco: []
		}
	},
	created() {
		axios.get('http://relay.theparadigmdev.com/latest-rocco/latest-rocco.json').then(response => {
			this.latestRocco = response.data
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
.v-card__title {
	padding-top: 12px;
}
</style>
