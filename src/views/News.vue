<template>
	<div class="news">
		<div class="title" style="margin: 26px 0px 50px 0px; text-align: center;">
			<h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin-top: 50px; text-align: center;">The Paradox</h1>
			<h3 class="display-1 blue-grey--text font-weight-light text-uppercase font-italic" style="text-align: center; margin-bottom: 50px;">Accuracy. Transparency. Legitimacy.</h3>
			<v-text-field v-model="searchNews" label="Search..." style="width: 300px; margin: 50px auto 0px auto;" hint="For now, you cannot search within articles."></v-text-field>
		</div>

		<v-card v-for="item in filteredNews" :key="item.id" class="news-home">
			<div v-if="item.uploaded">
				<v-img :src="item.cover"></v-img>

				<v-card-title primary-title>
					<div>
						<h3 class="headline mb-0">{{ item.title }}</h3>
						<h4 class="subtitle-1 grey--text">{{ item.author }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ item.timestamp }}</h4>
					</div>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn text color="accent" @click="setNews(item.title, item.author, item.timestamp, item.cover, item.detail)">View Article</v-btn>
				</v-card-actions>
			</div>
    </v-card>


		<v-dialog v-model="newsDialog" max-width="800" v-if="currentNews">
			<v-card>
				<v-img :src="currentNews.cover"></v-img>
				<v-card-title primary-title>
					<div>
						<h3 class="headline mb-0">{{ currentNews.title }}</h3>
						<h4 class="subtitle-1 grey--text">{{ currentNews.author }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ currentNews.timestamp }}</h4>
					</div>
				</v-card-title>
				<v-card-text>
					<div class="detitem" v-html="currentNews.details"></div>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn text color="accent" @click="newsDialog = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-btn color="deep-purple" fab fixed bottom right @click="newNewsDialog = true">
      <v-icon>add</v-icon>
    </v-btn>
		<v-dialog v-model="newNewsDialog" max-width="500">
			<v-card>
				<v-card-title>
					<h3 class="headline mb-0">Write a Story</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="newNewsDialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-text-field label="Title" v-model="newNewsTitle"></v-text-field>
					<v-textarea label="Details" v-model="newNewsDetail"></v-textarea>
					<v-switch v-model="newNewsIsPublished" label="Published"></v-switch>
					<v-text-field label="Cover URL" v-model="newNewsCover"></v-text-field>
					<p class="grey--text font-weight-light" v-if="newNewsCover">Does the story's cover display correctly?</p>
					<v-img max-width="200" :src="newNewsCover" v-if="newNewsCover"></v-img>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn :disabled="!newNewsTitle || !newNewsDetail || !newNewsIsPublished || !newNewsCover" text color="accent" @click="submitNews()">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>


	</div>
</template>

<script>
import { db } from '@/firebase'
import moment from 'moment'

export default {
	name: 'Paradox',
	data() {
		return {
			news: [],
			searchNews: '',
			currentNews: null,
			newsDialog: false,
			newNewsDialog: false,
			newNewsTitle: '',
			newNewsDetail: '',
			newNewsIsPublished: true,
			newNewsCover: ''
		}
	},
	created() {
		let ref = db.collection('news').orderBy("timestamp", "desc").limit(25)

		ref.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if(change.type === "added") {
					let doc = change.doc
					this.news.splice(change.newIndex, 0, {
						id: doc.id,
						author: doc.data().author,
						cover: doc.data().cover,
						detail: doc.data().detail,
						timestamp: moment(doc.data().timestamp).format('LLLL'),
						title: doc.data().title,
						uploaded: doc.data().uploaded,
					})
				}
				if(change.type === "removed") {
					let doc = change.doc
					this.news.splice(change.oldIndex, 1)
				}
				if(change.type === "modified") {
					let doc = change.doc
					this.news.splice(change.oldIndex, 1, {
						id: doc.id,
						author: doc.data().author,
						cover: doc.data().cover,
						detail: doc.data().detail,
						timestamp: moment(doc.data().timestamp).format('LLLL'),
						title: doc.data().title,
						uploaded: doc.data().uploaded
					})
				}
			})
		})
	},
	computed: {
		filteredNews() {
			return this.news.filter(item => {
				return item.title.match(this.searchNews) || item.author.match(this.searchNews) || item.timestamp.match(this.searchNews)
			})
		}
	},
	methods: {
		setNews(title, author, timestamp, cover, details) {
			this.currentNews = {
				title: title,
				author: author,
				timestamp: timestamp,
				cover: cover,
				details: details
			}
			this.newsDialog = true
		},
		submitNews() {
			if (this.newNewsTitle && this.newNewsDetail && this.newNewsIsPublished && this.newNewsCover) {
				db.collection('news').add({
					title: this.newNewsTitle,
					author: this.$root.username,
					detail: this.newNewsDetail,
					uploaded: this.newNewsIsPublished,
					cover: this.newNewsCover,
					timestamp: Date.now()
				}).then(() => {
					this.newNewsDialog = false
					this.newNewsTitle = ''
					this.newNewsDetail = ''
					this.newNewsIsPublished = true
					this.newNewsCover = ''
				})
			} else {
				this.$root.feedback = 'Fill in all of the fields'
				this.$root.snackbar = true
			}
		}
	}
}
</script>

<style scoped>
div.v-card.news-home {
	max-width: 750px;
	width: 100%;
	margin: 20px auto;
}
</style>
