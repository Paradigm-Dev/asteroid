<template>
	<div class="index">
		<v-parallax :src="homebg" class="parallax">
			<div class="home">
				<img src="./../assets/alogo.png" alt=""  style="position: relative; text-align: center; margin: auto; padding-top: 30vh;">
				<h2 class="display-3 font-weight-thin text-uppercase">Paradigm</h2>
			</div>
		</v-parallax>
		<div style="text-align: center; padding: 25px;" class="blue-grey darken-4">
			<h1 class="display-3 blue-grey--text font-weight-thin" style="margin-bottom: 25px;">pär ə dīm</h1>
			<h5 class="headline pb-2 font-weight-thin grey--text">a typical example or pattern of something, a model</h5>
			<p class="grey--text lighten-4 font-weight-light pt-2">We strive to create consistent and well-made products for our users while adopting the newest and best web development standards.</p>
		</div>
		<!-- <v-parallax src="https://relay.theparadigmdev.com/img/robert%20mueller%20report%20doj%20logo%20bg%20v4.jpg" style="text-align: center;">
			<v-layout align-center column justify-center>
				<h1 class="display-3 red--text font-weight-black text-uppercase" style="margin-bottom: 25px;">The Mueller Report</h1>
				<h5 class="headline pb-2 deep-purple--text font-weight-bold">Special Counsel Robert Mueller and Attorney General William Barr</h5>
				<p class="white--text">The document we have been waiting two years for has finally been released by the Special Counsel's office. Earlier on April 18th, Attorney General William Barr spoke at a press conference where he summarized the report that he would later that day.</p>
				<p class="white--text text-uppercase font-weight-medium">Read the report now.</p>
				<v-btn href="https://relay.theparadigmdev.com/paradox/robert-mueller-report-into-pres-donald-trump-russia-collusion.pdf" color="red">Read it</v-btn>
			</v-layout>
		</v-parallax> -->
		<!-- <div style="text-align: center; padding: 25px;" class="grey darken-4">
	  	<h1 class="display-3 deep-purple--text font-weight-thin text-uppercase" style="margin-bottom: 25px;">HEY!</h1>
		  <h5 class="headline pb-2 white--text">Have <span class="font-weight-bold">YOU</span> read the notice?</h5>
		  <p class="white--text">It contains vital information pertaining to your Paradigm account. Be sure to read and acknowledge it.</p>
		  <v-btn @click="route()" color="deep-purple">Read the Notice</v-btn>
		</div> -->
		<v-parallax src="https://relay.theparadigmdev.com/img/Outer_Space.jpg" style="padding: 25px; height: 275px;">
			<div style="text-align: center;">
				<h1 class="display-3 deep-orange--text font-weight-thin text-uppercase" style="margin-bottom: 25px;">Flamechat</h1>
				<h5 class="headline pb-2 white--text">A common sense chatting app.</h5>
				<p class="white--text">A chatting app built for the future.</p>
				<v-btn @click="$root.switch = 'Flamechat'" color="deep-orange">Open Flamechat</v-btn>
			</div>
		</v-parallax>
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
import { db } from '@/firebase'

export default {
  name: 'Home',
  data() {
    return {
			announcements: [],
			homebg: 'https://relay.theparadigmdev.com/img/home_bg.jpg'
		}
	},
  created() {
		var dbRef = db.collection('updates').orderBy('time', 'desc').limit(3)
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
.parallax {
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

