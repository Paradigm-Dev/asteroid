<template>
  <div class="index">
		<v-container>
			<div class="title" style="margin: 26px 0px 50px 0px; text-align: center;">
				<v-text-field v-model="searchBook" label="Search..." style="width: 300px; margin: 50px auto 0px auto;"></v-text-field>
			</div>
			<div class="bookshelf">
				<v-card v-for="(book, index) in filteredBook" :key="index" class="book-item">
					<v-img :src="book.cover"></v-img>
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">{{ book.title }}</h3>
							<h4 class="subtitle-1 grey--text">By {{ book.author }}</h4>
						</div>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text>{{ book.summary }}</v-card-text>
					<v-card-actions>
						<v-btn text color="accent" :disabled="!book.available" :href="book.link" @click="logBook(book.title)">Read</v-btn>
					</v-card-actions>
				</v-card>
			</div>
		</v-container>
		<v-btn color="deep-purple" fab fixed bottom right @click="newBookDialog = true">
      <v-icon>add</v-icon>
    </v-btn>
		<v-dialog v-model="newBookDialog" max-width="500">
			<v-card>
				<v-card-title>
					<h3 class="headline mb-0">Add Book</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="newBookDialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-text-field label="Book" v-model="newBookTitle"></v-text-field>
					<v-text-field label="Author" v-model="newBookAuthor"></v-text-field>
					<v-text-field label="Genre" v-model="newBookGenre"></v-text-field>
					<v-textarea label="Summary" v-model="newBookSummary"></v-textarea>
					<v-text-field label="Cover URL" v-model="newBookCover"></v-text-field>
					<p class="grey--text font-weight-light" v-if="newBookCover">Does the book's cover display correctly?</p>
					<v-img max-width="200" :src="newBookCover" v-if="newBookCover"></v-img>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn :disabled="!newBookTitle || !newBookGenre || !newBookSummary || !newBookCover || !newBookGenre" text color="accent" @click="submitBook()">Submit</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: 'Bookshelf',
  data() {
    return {
			bookshelf: [],
			searchBook: '',
			newBookDialog: false,
			newBookTitle: '',
			newBookGenre: '',
			newBookSummary: '',
			newBookCover: '',
			newBookAuthor: ''
    }
	},
  created() {
		this.$root.loadingBar = true
		let ref = db.collection('bookshelf').orderBy("title", "asc")

		ref.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if(change.type === "added") {
					let doc = change.doc
					this.bookshelf.splice(change.newIndex, 0, {
						id: doc.id,
						author: doc.data().author,
						cover: doc.data().cover,
						link: doc.data().link,
						summary: doc.data().summary,
						title: doc.data().title,
						available: doc.data().available
					})
				}
				if(change.type === "removed") {
					let doc = change.doc
					this.bookshelf.splice(change.oldIndex, 1)
				}
				if(change.type === "modified") {
					let doc = change.doc
					this.bookshelf.splice(change.oldIndex, 1, {
						id: doc.id,
						author: doc.data().author,
						cover: doc.data().cover,
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
		filteredBook() {
			return this.bookshelf.filter(book => {
				return book.title.toLowerCase().includes(this.searchBook.toLowerCase()) || book.author.toLowerCase().includes(this.searchBook.toLowerCase())
			})
		}
	},
	methods: {
		logBook(book) {
			this.$ga.event(this.$root.username,  + 'is reading ' + book)
		},
		submitBook() {
			if (this.newBookTitle && this.newBookAuthor && this.newBookCover && this.newBookGenre && this.newBookSummary) {
				db.collection('bookshelf').add({
					title: this.newBookTitle,
					author: this.newBookAuthor,
					cover: this.newBookCover,
					available: false,
					link: '',
					genre: this.newBookGenre,
					summary: this.newBookSummary
				}).then(() => {
					this.newBookDialog = false
					this.newBookTitle = ''
					this.newBookAuthor = ''
					this.newBookCover = ''
					this.newBookGenre = ''
					this.newBookSummary = ''
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
@media screen and (min-width: 1240px) {
	div.bookshelf {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 16px;
		margin-bottom: 32px;
	}
}

@media screen and (max-width: 1240px) {
	div.bookshelf {
		margin-bottom: 32px;
	}

	div.v-card__text {
		margin-bottom: 30px;
		margin-top: 30px;
		position: relative;
		bottom: 30px;
	}
}

h1 {
  text-align: center;
}

.book-item {
	margin: 16px auto;
	max-width: 400px;
	width: 100%;
	height: 100%;
}

.book-item div.v-card__actions {
	position: absolute;
	bottom: 0px;
	margin-top: 16px;
}
</style>
