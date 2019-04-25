<template>
  <div class="index">
		<v-container>
			<div class="title" style="margin: 26px 0px 50px 0px; text-align: center;">
				<v-text-field v-model="searchMovie" label="Search..." style="width: 300px; margin: 50px auto 0px auto;"></v-text-field>
			</div>
			<div class="movies">
				<v-card v-for="(movie, index) in filteredMovie" :key="index" class="movie-item">
					<v-img :src="movie.cover"></v-img>

					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">{{ movie.title }}</h3>
							<h4 class="subheading grey--text">{{ movie.genre }}</h4>
						</div>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text>{{ movie.summary }}</v-card-text>

					<v-card-actions>
						<v-btn :disabled="!movie.available" flat color="accent" @click="watchMovie(movie.title, movie.link, movie.cover)">Watch</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</v-container>
		<v-btn color="deep-purple" fab fixed bottom right @click="newMovieDialog = true">
      <v-icon>add</v-icon>
    </v-btn>
		<v-dialog v-model="newMovieDialog" max-width="500">
			<v-card>
				<v-card-title>
					<h3 class="headline mb-0">Add Movie</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="newMovieDialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-text-field label="Movie" v-model="newMovieTitle"></v-text-field>
					<v-text-field label="Genre" v-model="newMovieGenre"></v-text-field>
					<v-textarea label="Summary" v-model="newMovieSummary"></v-textarea>
					<v-text-field label="Cover URL" v-model="newMovieCover"></v-text-field>
					<p class="grey--text font-weight-light" v-if="newMovieCover">Does the movie's cover display correctly?</p>
					<v-img max-width="200" :src="newMovieCover" v-if="newMovieCover"></v-img>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn :disabled="!newMovieTitle || !newMovieGenre || !newMovieSummary || !newMovieCover" flat color="accent" @click="submitMovie()">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="watchMovieDialog" max-width="1000">
			<v-card>
				<v-card-title>
					<h3 class="headline mb-0">{{ watchMovieTitle }}</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="watchMovieDialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<video autoplay :poster="watchMovieCover" width="1000" :src="watchMovieURL" controls></video>
			</v-card>
		</v-dialog>
  </div>
</template>

<script>
import db from './../firestore'
import firebase from 'firebase'

export default {
  name: 'Movies',
  data() {
    return {
			movies: [],
			searchMovie: '',
			newMovieDialog: false,
			newMovieTitle: '',
			newMovieSummary: '',
			newMovieCover: '',
			newMovieGenre: '',
			watchMovieTitle: '',
			watchMovieURL: '',
			watchMovieDialog: false,
			watchMovieCover: ''
    }
  },
  created() {
		this.$root.loadingBar = true
		let ref = db.collection('movies').orderBy("title", "asc")

		ref.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if(change.type === "added") {
					let doc = change.doc
					this.movies.splice(change.newIndex, 0, {
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
					this.movies.splice(change.oldIndex, 1)
				}
				if(change.type === "modified") {
					let doc = change.doc
					this.movies.splice(change.oldIndex, 1, {
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
		filteredMovie() {
			return this.movies.filter(movie => {
				return movie.title.toLowerCase().includes(this.searchMovie.toLowerCase()) || movie.genre.toLowerCase().includes(this.searchMovie.toLowerCase())
			})
		}
	},
	methods: {
		logMovie(movie) {
			this.$ga.event(this.$root.username, 'is watching ' + movie)
			this.inquiryEvent(this.$root.username, 'is watching ' + movie, 'Movies', this.$root.accountColor)
		},
		submitMovie() {
			if (this.newMovieTitle && this.newMovieSummary && this.newMovieCover && this.newMovieGenre) {
				db.collection('movies').add({
					title: this.newMovieTitle,
					summary: this.newMovieSummary,
					cover: this.newMovieCover,
					available: false,
					link: '',
					genre: this.newMovieGenre
				}).then(() => {
					this.inquiryEvent(this.$root.username, 'requested ' + this.newMovieTitle + ' to be added', 'Movies', this.$root.accountColor)
					this.newMovieDialog = false
					this.newMovieTitle = ''
					this.newMovieSummary = ''
					this.newMovieCover = ''
					this.newMovieGenre = ''
				})
			} else {
				this.$root.feedback = 'Fill in all of the fields'
				this.$root.snackbar = true
			}
		},
		watchMovie(title, url, cover) {
			this.watchMovieTitle = title
			this.watchMovieURL = url
			this.watchMovieCover = cover
			this.watchMovieDialog = true
			this.logMovie(title)
		}
	}
}
</script>

<style scoped>
@media screen and (min-width: 1240px) {
	div.movies {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 16px;
		margin-bottom: 32px;
	}
}

@media screen and (max-width: 1240px) {
	div.movies {
		margin-bottom: 32px;
	}

	.movie-item div.v-card__text {
		margin-bottom: 30px;
		margin-top: 30px;
		position: relative;
		bottom: 30px;
	}
}

h1 {
  text-align: center;
}

div.v-card.movie-item {
	margin: 16px auto;
	max-width: 400px;
	width: 100%;
	height: 100%;
}

.movie-item div.v-card__actions {
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
