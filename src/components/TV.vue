<template>
  <div class="index">
		<v-container>
			<div class="title" style="margin: 26px 0px 50px 0px; text-align: center;">
				<v-text-field v-model="searchTV" label="Search..." style="width: 300px; margin: 50px auto 0px auto;"></v-text-field>
			</div>
			<div class="shows">
				<v-card v-for="(show, index) in filteredShows" :key="index" class="tv-item">
					<v-img :src="show.cover"></v-img>

					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">{{ show.title }}</h3>
							<h4 class="subheading grey--text">{{ show.genre }}</h4>
						</div>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text>{{ show.summary }}</v-card-text>

					<v-card-actions>
						<v-btn :disabled="!show.available" flat color="accent" @click="watchShow(show.title, show.link, show.cover)">Watch</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</v-container>
		<v-btn color="deep-purple" fab fixed bottom right @click="newShowDialog = true">
      <v-icon>add</v-icon>
    </v-btn>
		<v-dialog v-model="newShowDialog" max-width="500">
			<v-card>
				<v-card-title>
					<h3 class="headline mb-0">Add TV Show</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="newShowDialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-text-field label="TV Show" v-model="newShowTitle"></v-text-field>
					<v-text-field label="Genre" v-model="newShowGenre"></v-text-field>
					<v-textarea label="Summary" v-model="newShowSummary"></v-textarea>
					<v-text-field label="Cover URL" v-model="newShowCover"></v-text-field>
					<p class="grey--text font-weight-light" v-if="newShowCover">Does the tv show's cover display correctly?</p>
					<v-img max-width="200" :src="newShowCover" v-if="newShowCover"></v-img>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn :disabled="!newShowTitle || !newShowGenre || !newShowSummary || !newShowCover" flat color="accent" @click="submitShow()">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="watchShowDialog" max-width="1000">
			<v-card>
				<v-card-title>
					<h3 class="headline mb-0">{{ watchShowTitle }}</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="watchShowDialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<video autoplay :poster="watchShowCover" width="1000" :src="watchShowURL" controls></video>
			</v-card>
		</v-dialog>
  </div>
</template>

<script>
import db from './../firestore'
import firebase from 'firebase'

export default {
  name: 'TV',
  data() {
    return {
			shows: [],
			searchShow: '',
			newShowDialog: false,
			newShowTitle: '',
			newShowSummary: '',
			newShowCover: '',
			newShowGenre: '',
			watchShowTitle: '',
			watchShowURL: '',
			watchShowDialog: false,
			watchShowCover: ''
    }
  },
  created() {
		this.$root.loadingBar = true
		let ref = db.collection('movies').orderBy("title", "asc")

		ref.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if(change.type === "added") {
					let doc = change.doc
					this.shows.splice(change.newIndex, 0, {
						id: doc.id,
						cover: doc.data().cover,
						genre: doc.data().genre,
						link: doc.data().link,
						summary: doc.data().summary,
						title: doc.data().title,
						available: doc.data().available
					})
				}
				if(change.type === "removed") {
					let doc = change.doc
					this.shows.splice(change.oldIndex, 1)
				}
				if(change.type === "modified") {
					let doc = change.doc
					this.shows.splice(change.oldIndex, 1, {
						id: doc.id,
						cover: doc.data().cover,
						genre: doc.data().genre,
						link: doc.data().link,
						summary: doc.data().summary,
						title: doc.data().title,
						available: doc.data().available
					})
				}
				this.$root.loadingBar = false
			})
		})
	},
	computed: {
		filteredShows() {
			return this.shows.filter(show => {
				return show.title.toLowerCase().includes(this.searchShow.toLowerCase()) || show.genre.toLowerCase().includes(this.searchShow.toLowerCase())
			})
		}
	},
	methods: {
		logShow(show) {
			this.$ga.event(this.$root.username, 'is watching ' + show)
			this.inquiryEvent(this.$root.username, 'is watching ' + show, 'TV Shows', this.$root.accountColor)
		},
		submitShow() {
			if (this.newShowTitle && this.newShowSummary && this.newShowCover && this.newShowGenre) {
				db.collection('shows').add({
					title: this.newShowTitle,
					summary: this.newShowSummary,
					cover: this.newShowCover,
					available: false,
					link: '',
					genre: this.newShowGenre
				}).then(() => {
					this.inquiryEvent(this.$root.username, 'requested ' + this.newShowTitle + ' to be added', 'TV Shows', this.$root.accountColor)
					this.newShowDialog = false
					this.newShowTitle = ''
					this.newShowSummary = ''
					this.newShowCover = ''
					this.newShowGenre = ''
				})
			} else {
				this.$root.feedback = 'Fill in all of the fields'
				this.$root.snackbar = true
			}
		},
		watchShow(title, url, cover) {
			this.watchShowTitle = title
			this.watchShowURL = url
			this.watchShowCover = cover
			this.watchShowDialog = true
			this.logShow(title)
		}
	}
}
</script>

<style scoped>
@media screen and (min-width: 1240px) {
	div.shows {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 16px;
		margin-bottom: 32px;
	}
}

@media screen and (max-width: 1240px) {
	div.shows {
		margin-bottom: 32px;
	}

	.tv-item div.v-card__text {
		margin-bottom: 30px;
		margin-top: 30px;
		position: relative;
		bottom: 30px;
	}
}

h1 {
  text-align: center;
}

div.v-card.tv-item {
	margin: 16px auto;
	max-width: 400px;
	width: 100%;
	height: 100%;
}

.tv-item div.v-card__actions {
	position: absolute;
	bottom: 0px;
	margin-top: 16px;
}

video {
	position: relative;
	bottom: -6px;
  width: 100%;
  height: auto;
}
</style>
