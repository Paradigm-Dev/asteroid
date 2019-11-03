<template>
	<div class="memes">
		<v-container>
			<h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin: 26px 0px 50px 0px; text-align: center;">Latest Memes</h1>
			<v-select style="width: 300px; margin: auto;" :items="sort" label="Sort by" v-model="sortedby" @change="changeSort" default="Hot"></v-select>
			<div v-for="post in meirl" :key="post.data.id">
				<v-card v-if="!post.data.is_video && post.data.title != 'me irl is not an edgy meme board'" style="max-width: 800px; margin: 20px auto">
					<v-img :src="post.data.url"></v-img>
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">{{ post.data.title }}</h3>
							<h4 class="subtitle-1 grey--text">{{ post.data.author }}</h4>
						</div>
					</v-card-title>
				</v-card>
			</div>
		</v-container>
		<!-- <v-btn color="deep-purple darken-4" fab fixed bottom right>
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn> -->
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'LatestMemes',
	data() {
		return {
			meirl: [],
			sort: ['Hot', 'New', 'Controversial', 'Top', 'Rising'],
			sortedby: 'Hot'
		}
	},
	created() {
		axios.get('https://www.reddit.com/r/me_irl.json').then(response => {
			this.meirl = response.data.data.children
		}).catch(error => {
			// handle error
			console.log(error)
		}).then(() => {
			// always executed
		})
	},
	methods: {
		changeSort() {
			if(this.sortedby == 'Hot') {
				axios.get('https://www.reddit.com/r/me_irl.json').then(response => {
					this.meirl = response.data.data.children
				}).catch(error => {
					// handle error
					console.log(error)
				}).then(() => {
					// always executed
				})
			}
			if(this.sortedby == 'New') {
				axios.get('https://www.reddit.com/r/me_irl/new.json').then(response => {
					this.meirl = response.data.data.children
				}).catch(error => {
					// handle error
					console.log(error)
				}).then(() => {
					// always executed
				})
			}
			if(this.sortedby == 'Controversial') {
				axios.get('https://www.reddit.com/r/me_irl/controversial.json').then(response => {
					this.meirl = response.data.data.children
				}).catch(error => {
					// handle error
					console.log(error)
				}).then(() => {
					// always executed
				})
			}
			if(this.sortedby == 'Top') {
				axios.get('https://www.reddit.com/r/me_irl/top.json').then(response => {
					this.meirl = response.data.data.children
				}).catch(error => {
					// handle error
					console.log(error)
				}).then(() => {
					// always executed
				})
			}
			if(this.sortedby == 'Rising') {
				axios.get('https://www.reddit.com/r/me_irl/rising.json').then(response => {
					this.meirl = response.data.data.children
				}).catch(error => {
					// handle error
					console.log(error)
				}).then(() => {
					// always executed
				})
			}
		}
	}
}
</script>

<style scoped>

</style>
