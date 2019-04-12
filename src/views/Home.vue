<template>
	<div class="index">
		<v-parallax :src="homebg" class="paralax">
			<div class="home">
				<h2 class="display-3 font-weight-light text-uppercase" style="position: relative; text-align: center; margin: auto; padding-top: 30vh;">Welcome to<br>the future</h2>
				<v-btn router to="flame" style="margin-top: 20px;" color="primary">Open Flamechat</v-btn>
			</div>
		</v-parallax>
		<div style="text-align: center; padding: 25px;" class="blue-grey darken-4">
			<h1 class="display-3 blue-grey--text font-weight-thin" style="margin-bottom: 25px;">pär ə dīm</h1>
			<h5 class="headline pb-2 font-weight-thin grey--text">a typical example or pattern of something, a model</h5>
			<p class="grey--text lighten-4 font-weight-light pt-2">We strive to create consistent and well-made products for our users while adopting the newest and best web development standards.</p>
		</div>
		<div style="text-align: center; padding: 25px;" class="grey darken-4">
	  	<h1 class="display-3 deep-purple--text font-weight-thin text-uppercase" style="margin-bottom: 25px;">HEY!</h1>
		  <h5 class="headline pb-2 white--text">Have <span class="font-weight-bold">YOU</span> read the notice?</h5>
		  <p class="white--text">It contains vital information pertaining to your Paradigm account. Be sure to read and acknowledge it.</p>
		  <v-btn dark router to="/company/notice" color="deep-purple">Read the Notice</v-btn>
		</div>
		<h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin: 25px; text-align: center;">Updates</h1>
		<v-card v-for="(announcement, index) in announcements" :key="index" style="width: 100%; margin: 20px auto; max-width: 600px;">
			<v-card-title primary-title>
				<div>
					<h3 class="headline mb-0">{{ announcement.title }}</h3>
				</div>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<div v-for="item in announcement.detail" :key="item" class="item" v-html="item"></div>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import db from './../firestore'

export default {
  name: 'Home',
  data() {
    return {
			announcements: [],
			homebg: 'https://relay.theparadigmdev.com/img/asteroid-home_bg.jpg'
		}
	},
  created() {
		var dbRef = db.collection('announcements').orderBy('time', 'desc').limit(3)
    dbRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        let announcement = doc.data()
				announcement.id = doc.id
				this.announcements.push(announcement)
      })
		})
  }
}
</script>

<style scoped>
.paralax {
	height: 100% !important;
}

.home {
	text-align: center;
	height: calc(100vh - 56px);
}

h1 {
  text-align: center;
}

.item {
	padding-bottom: 10px;
}

.item:last-of-type {
	padding-bottom: 0px;
}
</style>
