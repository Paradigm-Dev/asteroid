<template>
	<div class="flamechat">
		<v-toolbar dense color="deep-orange darken-2" v-if="flamechat_enable">
			<v-toolbar-title>Flamechat</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn v-if="$root.isAdmin && $root.accountColor && ready && chatroom" text @click="purgeVerifyPopup = true">Purge</v-btn>
			<v-btn v-if="$root.username && $root.accountColor && ready && chatroom" text @click="leaveRoom()">Leave</v-btn>
		</v-toolbar>

		<v-container>
			<!-- Disabled card -->
			<v-card class="disabled-card" v-if="!flamechat_enable">
				<h1 class="display-4 red--text font-weight-bold">:(</h1><br><br>
				<p class="headline font-weight-light">Flamechat is off.<br>It will remain off indefinitely.</p>
			</v-card>

			<!-- Welcome card -->
			<div v-if="flamechat_enable">
				<v-card class="welcome-card" v-if="!$root.username || !$root.accountColor || !ready || !chatroom">
					<v-card-title>
						<h3 class="headline mb-0 text-xs-center">Welcome to Flamechat!</h3>
					</v-card-title>
					<v-card-text>
						<v-radio-group v-model="chatroom" column>
							<v-radio :label="room.name" :value="room.db" :disabled="!room.available" v-if="room.id !== 'chatrooms'" v-for="room in chatrooms" :key="room.id"></v-radio>
							<v-radio color="#C0C0C0" label="The Inner Core" value="the-inner-core" v-if="$root.isInnerCore"></v-radio>
						</v-radio-group>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-btn :disabled="!chatroom || !$root.accountColor" text @click.stop="ready = true, setChatroom()" color="accent">Join</v-btn>
					</v-card-actions>
				</v-card>

				<!-- Chat card -->
				<v-card class="chat-card" v-if="$root.username && $root.accountColor && ready && chatroom">
					<v-card-text>
						<ul class="messages" v-chat-scroll="{ always: false }">
							<p v-if="messages == []">There are no messages posted on this room.</p>
							<li v-for="message in messages" :key="message.id" :id="message.id">
								<v-btn :style="{ color: message.color }" class="name" text @click="openUsernamePopup(message.name)">{{ message.name }}</v-btn>
								<v-btn class="admin-btn" icon text color="error" v-if="$root.isAdmin || $root.username == message.name" @click.prevent="deleteChat(message.id)"><v-icon>delete</v-icon></v-btn>
								<v-btn class="admin-btn" icon text color="warning" v-if="$root.isAdmin || $root.username == message.name" @click.prevent="editor = true, editing = message.id, editMessage = message.content"><v-icon>edit</v-icon></v-btn><br>
								<span v-if="flamechat_html_render" v-html="message.content" class="message"></span>
								<span v-if="!flamechat_html_render" class="message">{{ message.content }}</span>
								<span class="time">{{ message.timestamp }}</span>
							</li>
						</ul>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<form @submit.prevent="sendChat" class="new-message" v-if="!editor">
							<v-btn :disabled="!flamechat_enable" id="submit" type="submit" text icon style="float: right; display: inline; position: relative; top: 16px;">
								<v-icon>send</v-icon>
							</v-btn>
							<v-text-field :disabled="!flamechat_enable" class="message-box" autocomplete="off" label="Message..." v-model="newMessage"></v-text-field>
						</form>
						<form @submit.prevent="editChat" class="new-message" v-if="editor">
							<v-btn id="submit" type="submit" text icon style="float: right; display: inline; position: relative; top: 16px;">
								<v-icon>edit</v-icon>
							</v-btn>
							<v-text-field v-model="editMessage" class="message-box" autocomplete="off" label="Edit Message"></v-text-field>
						</form>
					</v-card-actions>
				</v-card>

			</div>
		</v-container>

		<v-dialog v-model="profilePopupEnable" max-width="350">
			<v-card>
				<div v-if="usersDbDownloaded">
					<v-card-title>
						<h3 class="headline mb-0 text-uppercase font-weight-medium" :style="{ color: profilePopupColor }">{{ profilePopupUsername }}</h3>
						<v-spacer></v-spacer>
						<v-btn icon @click="closeUsernamePopup" class="dialog-close-btn">
							<v-icon>close</v-icon>
						</v-btn>
					</v-card-title>
					<v-card-text>
						<p>{{ profilePopupBio }}</p>
						<img src="@/assets/isAdmin.png" alt="Administrator" class="moonrock-img" v-if="profilePopupAdmin" style="height: 25px !important;">
						<img src="@/assets/asteroid.png" alt="Asteroid" class="moonrock-img" v-if="profilePopupAsteroid" style="height: 25px !important;"><br>
						<img src="@/assets/moonrocks.png" alt="Moonrocks" class="moonrock-img"><span class="moonrock-count font-weight-medium">{{ profilePopupMoonrocks }}</span>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-btn text @click="noDM()" color="accent">Message</v-btn>
					</v-card-actions>
				</div>
			</v-card>
		</v-dialog>

		<v-dialog v-model="purgeVerifyPopup" max-width="400">
			<v-card>
				<v-card-title><h3 class="headline mb-0">Purge Chatroom</h3></v-card-title>
				<v-card-text>Are you sure you want to purge this chatroom?</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn @click="clearAllMessages()" color="error" text>Yes</v-btn>
					<v-btn @click="purgeVerifyPopup = false" color="green">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</div>
</template>

<script>
import { db } from '@/firebase'
import moment from 'moment'

export default {
	name: 'Flamechat',
  data() {
    return {
			ready: false,
			messages: [],
			newMessage: '',
			editMessage: '',
			editor: false,
			editing: null,
			flamechat_enable: true,
			chatroom: null,
			chatrooms: [],
			flamechat_html_render: true,
			profilePopupUsername: '',
			profilePopupEnable: false,
			profilePopupBio: '',
			profilePopupColor: '',
			profilePopupMoonrocks: '',
			usersDbDownloaded: false,
			profilePopupAdmin: false,
			profilePopupAsteroid: false,
			lockdown: null,
			global_pnf: null,
			purgeVerifyPopup: false
    }
	},
	created() {
		this.chatroom = null

		var chatroomsRef = db.collection('flamechat')
		chatroomsRef.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				// if (change.doc.id != 'chatrooms') {
				// 	console.log(change)
					if (change.type === "added") {
						let doc = change.doc
						this.chatrooms.splice(change.newIndex, 0, {
							id: doc.id,
							name: doc.data().name,
							db: doc.data().db,
							available: doc.data().available,
						})
					}
					if (change.type === "removed") {
						let doc = change.doc
						this.chatrooms.splice(change.oldIndex, 1)
					}
					if (change.type === "modified") {
						let doc = change.doc
						this.chatrooms.splice(change.oldIndex, 1, {
							id: doc.id,
							name: doc.data().name,
							db: doc.data().db,
							available: doc.data().available
						})
					}
				// }
			})
		})

		var metaRef = db.collection('paradigm')
		metaRef.doc('config').get().then((doc) => {
			this.flamechat_enable = doc.data().flamechat_enable
			this.flamechat_html_render = doc.data().flamechat_html_render
			this.lockdown = doc.data().lockdown
			this.global_pnf = doc.data().global_pnf
		})

		metaRef.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if(change.type === "modified") {
					let doc = change.doc
					this.flamechat_enable = doc.data().flamechat_enable
					this.flamechat_html_render = doc.data().flamechat_html_render
					this.lockdown = doc.data().lockdown
					this.global_pnf = doc.data().global_pnf
					this.newMessage = null
				}

				if (this.lockdown || this.global_pnf) {
					this.profilePopupUsername = ''
					this.profilePopupMoonrocks = ''
					this.profilePopupColor = ''
					this.profilePopupAdmin = false
					this.profilePopupBio = ''
					this.profilePopupEnable = false
					this.ready = false
					this.chatroom = ''
				}
			})
		})
	},
	methods: {
		deleteChat(id) {
			db.collection('flamechat').doc('chatrooms').collection(this.chatroom).doc(id).delete().then(() => {
				this.$root.feedback = 'Message deleted successfully.'
				this.$root.snackbar = true
				this.$ga.event(this.$root.username, 'deleted a message on ' + this.chatroom)
			}).catch(error => {
				this.$ga.event($root.username, 'error: ' + error.message)
			})
		},
		clearAllMessages() {
			var message
			for (message in this.messages) {
				db.collection('flamechat').doc('chatrooms').collection(this.chatroom).get().then(snapshot => {
					snapshot.forEach(doc => {
						doc.ref.delete()
						this.$root.feedback = 'All messages purged.'
						this.$root.snackbar = true
					}).catch(error => {
						this.$ga.event($root.username, 'error: ' + error.message)
					})
				})
			}
			this.purgeVerifyPopup = false
		},
		sendChat() {
			if(this.newMessage && this.$root.username != '' && this.$root.accountColor != null) {
				db.collection('flamechat').doc('chatrooms').collection(this.chatroom).add({
					name: this.$root.username,
					content: this.newMessage,
					color: this.$root.accountColor,
					timestamp: Date.now()
				}).catch(error => {
					console.log(error.message)
					this.$root.feedback = 'Your message did not send successfully!'
					this.$root.snackbar = true
					this.$ga.event($root.username, 'error: ' + error.message)
				})
				this.$root.feedback = 'Your message sent successfully!'
				this.$root.snackbar = true
				this.$ga.event(this.$root.username, 'sent ' + this.newMessage + ' on ' + this.chatroom)
				this.newMessage = null
			} else {
				this.$root.feedback = 'Your message did not send sucessfully!'
				this.$ga.event($root.username, 'error: they tried and failed to send a message')
				this.$root.snackbar = true
			}
		},
		editChat(id) {
			db.collection('flamechat').doc('chatrooms').collection(this.chatroom).doc(this.editing).update({
				content: this.editMessage
			}).then(() => {
				this.$root.feedback = 'Message edited successfully.'
				this.$root.snackbar = true
				this.$ga.event(this.$root.username, 'edited ' + this.editMessage + ' on ' + this.chatroom)
				this.editing = null
				this.editMessage = ''
				this.editor = false
			}).catch(error => {
				this.$ga.event($root.username, 'error: ' + error.message)
			})
		},
		setChatroom() {
			let ref = db.collection('flamechat').doc('chatrooms').collection(this.chatroom).orderBy('timestamp', 'asc')
			this.messages = []
			this.editing = null
			this.editMessage = ''
			this.editor = false

			ref.onSnapshot(snapshot => {
				snapshot.docChanges().forEach(change => {
					if(change.type === "added") {
						let doc = change.doc
						this.messages.splice(change.newIndex, 0, {
							id: doc.id,
							name: doc.data().name,
							content: doc.data().content,
							color: doc.data().color,
							timestamp: moment(doc.data().timestamp).format('MMMM Do YYYY, h:mm:ss a')
						})
					}
					if(change.type === "removed") {
						let doc = change.doc
						this.messages.splice(change.oldIndex, 1)
					}
					if(change.type === "modified") {
						let doc = change.doc
						this.messages.splice(change.oldIndex, 1, {
							id: doc.id,
							name: doc.data().name,
							content: doc.data().content,
							color: doc.data().color,
							timestamp: moment(doc.data().timestamp).format('MMMM Do YYYY, h:mm:ss a')
						})
					}
				})
			})
		},
		leaveRoom() {
			this.chatroom = null
			this.ready = false
		},
		openUsernamePopup(username, color) {
			this.$root.loadingBar = true
			this.usersDbDownloaded = false
			var usersRef = db.collection('users')
			usersRef.doc(username).get().then((doc) => {
				this.profilePopupBio = doc.data().bio,
				this.profilePopupColor = doc.data().color
				this.profilePopupMoonrocks = doc.data().moonrocks
				this.profilePopupUsername = username
				this.profilePopupAdmin = doc.data().isAdmin
				this.profilePopupAsteroid = doc.data().isAsteroid
				this.usersDbDownloaded = true
				this.$root.loadingBar = false
			})

			usersRef.onSnapshot(snapshot => {
				snapshot.docChanges().forEach(change => {
					if(change.type === "modified") {
						let doc = change.doc
						this.profilePopupBio = doc.data().bio,
						this.profilePopupColor = doc.data().color
						this.profilePopupMoonrocks = doc.data().moonrocks
						this.profilePopupUsername = username
						this.profilePopupAdmin = doc.data().isAdmin
						this.profilePopupAsteroid = doc.data().isAsteroid
						this.usersDbDownloaded = true
						this.$root.loadingBar = false
					}
				})
			})
			this.profilePopupEnable = true
		},
		closeUsernamePopup() {
			this.profilePopupEnable = false
			this.profilePopupUsername = ''
			this.profilePopupBio = ''
			this.profilePopupColor = ''
			this.profilePopupMoonrocks = ''
			this.profilePopupAdmin = false,
			this.profilePopupAsteroid = false
			this.usersDbDownloaded = false
		},
		noDM() {
			this.$root.feedback = 'Function not implemented yet.'
			this.$root.snackbar = true
		}
	}
}
</script>

<style scoped>
.welcome-card {
	margin: 50px auto;
	width: 100%;
	max-width: 550px;
}

.hidden {
	display: none;
}

.new-message {
	width: 100%;
	position: relative;
	bottom: -12px;
}

.v-card__text {
	height: 100%;
}

.chat-card {
	margin: auto;
	width: 100%;
	height: 100%;
	max-width: 1250px;
}

.chat-card h2 {
	font-size: 2.6em;
	margin-bottom: 40px;
}

.chat-card span {
	font-size: 1.25em;
}

.chat-card ul {
	margin-left: 0;
  padding-left: 0;
}

.chat-card li {
	margin-bottom: 15px;
	list-style-type: none;
}

.chat-card .time {
	display: block;
	font-size: .85em;
}

.messages {
	height: calc(100vh - 312px);
	overflow-y: auto;
	overflow-x: hidden;
}

.chat-card .name {
	font-size: 20px;
	margin: 0px 3px 3px 0px;
}

div.v-input__slot {
	margin: 0px !important;
}

div.v-messages {
	height: 0px !important;
}

.admin-btn {
	margin: auto;
}

.message-box {
	width: 92.5% !important;
}

.disabled-card {
	width: 100%;
	max-width: 350px;
	text-align: center;
	padding: 8px;
	margin: 64px auto;
}
</style>