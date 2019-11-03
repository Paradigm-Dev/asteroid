<template>
  <div class="index">
		<v-container>
			<div class="title" style="margin: 26px 0px 50px 0px; text-align: center;">
				<v-text-field v-model="searchMusic" label="Search..." style="width: 300px; margin: 50px auto 0px auto;"></v-text-field>
			</div>
			<div class="music">
				<v-card v-for="(item, index) in filteredMusic" :key="index" class="music-item">
					<v-img :src="item.cover"></v-img>
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">{{ item.title }}</h3>
							<h4 class="subtitle-1 grey--text">{{ item.author }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ item.album }}</h4>
							<h4 class="body-2 grey--text">{{ item.genre }}</h4>
						</div>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text v-if="item.available">
						<v-audio :file="item.link"></v-audio>
					</v-card-text>
					<v-card-text style="text-align: center;" v-if="!item.available">
						<span class="red--text font-weight-medium" style="position: relative; top: +100px;">UNAVAILABLE</span>
					</v-card-text>
				</v-card>
			</div>
		</v-container>

		<v-btn color="deep-purple" fab fixed bottom right @click="newMusicDialog = true">
      <v-icon>add</v-icon>
    </v-btn>

		<v-dialog v-model="newMusicDialog" max-width="500">
			<v-card>
				<v-card-title>
					<h3 class="headline mb-0">Add Song</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="newMusicDialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-text-field label="Song" v-model="newMusicTitle"></v-text-field>
					<v-text-field label="Album" v-model="newMusicAlbum"></v-text-field>
					<v-text-field label="Artist" v-model="newMusicArtist"></v-text-field>
					<v-text-field label="Genre" v-model="newMusicGenre"></v-text-field>
					<v-text-field label="Cover URL" v-model="newMusicCover"></v-text-field>
					<p class="grey--text font-weight-light" v-if="newMusicCover">Does the song's cover display correctly?</p>
					<v-img max-width="200" :src="newMusicCover" v-if="newMusicCover"></v-img>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn :disabled="!newMusicAlbum || !newMusicArtist || !newMusicCover || !newMusicGenre || !newMusicTitle" text color="accent" @click="submitSong()">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
  </div>
</template>

<script>
import vAudio from './../components/vAudio'
import { db } from '@/firebase'

export default {
  name: 'Music',
  data() {
    return {
			music: [],
			searchMusic: '',
			newMusicDialog: false,
			newMusicTitle: null,
			newMusicAlbum: null,
			newMusicArtist: null,
			newMusicCover: null,
			newMusicGenre: null
    }
  },
  created() {
		this.$root.loadingBar = true
		let ref = db.collection('music').orderBy("title", "asc")

		ref.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if(change.type === "added") {
					let doc = change.doc
					this.music.splice(change.newIndex, 0, {
						id: doc.id,
						album: doc.data().album,
						author: doc.data().author,
						cover: doc.data().cover,
						link: doc.data().link,
						title: doc.data().title,
						available: doc.data().available,
						genre: doc.data().genre
					})
				}
				if(change.type === "removed") {
					let doc = change.doc
					this.music.splice(change.oldIndex, 1)
				}
				if(change.type === "modified") {
					let doc = change.doc
					this.music.splice(change.oldIndex, 1, {
						id: doc.id,
						album: doc.data().album,
						author: doc.data().author,
						cover: doc.data().cover,
						link: doc.data().link,
						title: doc.data().title,
						available: doc.data().available,
						genre: doc.data().genre
					})
				}
				this.$root.loadingBar = false
			})
		})
	},
	computed: {
		filteredMusic() {
			return this.music.filter(item => {
				return item.title.toLowerCase().includes(this.searchMusic.toLowerCase()) || item.album.toLowerCase().includes(this.searchMusic.toLowerCase()) || item.author.toLowerCase().includes(this.searchMusic.toLowerCase()) || item.genre.toLowerCase().includes(this.searchMusic.toLowerCase())
			})
		}
	},
	methods: {
		logMusic(music) {
			this.$ga.event('Music', this.$root.username + ' is listening to ' + music)
		},
		submitSong() {
			if (this.newMusicTitle && this.newMusicAlbum && this.newMusicArtist && this.newMusicCover && this.newMusicGenre) {
				db.collection('music').add({
					album: this.newMusicAlbum,
					author: this.newMusicArtist,
					title: this.newMusicTitle,
					cover: this.newMusicCover,
					available: false,
					link: '',
					genre: this.newMusicGenre
				}).then(() => {
					this.newMusicDialog = false
					this.newMusicTitle = ''
					this.newMusicAlbum = ''
					this.newMusicArtist = ''
					this.newMusicCover = ''
					this.newMusicGenre = ''
				})
			} else {
				this.$root.feedback = 'Fill in all of the fields'
				this.$root.snackbar = true
			}
		}
	},
  components: {
    'v-audio': vAudio
  },
}
</script>

<style scoped>
@media screen and (min-width: 1240px) {
	div.music {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 16px;
		margin-bottom: 32px;
	}
}

@media screen and (max-width: 1240px) {
	div.music {
		margin-bottom: 32px;
	}
}

h1 {
  text-align: center;
}

div.v-card.music-item {
	max-width: 400px;
	width: 100%;
	margin: auto;
	height: 100%;
}

.music-item div.v-card__text {
	margin-bottom: 0px !important;
	position: relative;
	bottom: -30px;
	top: -15px;
	padding-bottom: 0px !important;
}
</style>