<template>
  <div>
    <div style="background-color: black;">
      <v-subheader class="white--text">Terminal</v-subheader>
      <p v-if="profilePopupEnable && usersDbDownloaded" style="font-family: monospace; color: white; padding: 0px 16px 0px 16px;">
        <span :style="{ 'color': profilePopupData.color, 'font-size': '14px' }">{{ profilePopupUsername }}</span><br>
        {{ profilePopupData.uid }}<br>
        {{ profilePopupData.bio }}<br>
        --------------------------------------<br>
				Moonrocks: {{ profilePopupData.moonrocks }}<br>
				Admin: {{ profilePopupData.isAdmin }}<br>
        Asteroid: {{ profilePopupData.isAsteroid }}<br>
				The Inner Core: {{ profilePopupData.isInnerCore }}<br>
				Writer: {{ profilePopupData.isWriter }}<br>
				Analytics: {{ profilePopupData.isAnalytics }}<br>
				Banned: {{ profilePopupData.isBanned }}<br>
				Strikes: {{ profilePopupData.strikes }}<br>
				Logged in: {{ profilePopupData.isLoggedIn }}
      </p>
			<p v-if="cmd_console_open" :style="{ 'color': cmd_console_color, 'font-family': 'monospace', 'padding': '0px 16px 0px 16px' }">{{ cmd_console }}</p>
      <form @submit.prevent="sendCmd()">
        <input placeholder="> enter command" autofocus :disabled="!cmd_enabled" :class="cmd_class" style="font-family: monospace; width: 100%; height: 100%; padding: 0px 16px 16px 16px;" v-model="cmd_input">
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  name: 'Terminal',
  data() {
    return {
      cmd_input: '',
      cmd_output: '',
      cmd_class: 'white--text',
      cmd_enabled: true,
      profilePopupEnable: false,
      usersDbDownloaded: false,
			profilePopupData: null,
			profilePopupUsername: '',
			cmd_console_open: false,
			cmd_console: '',
			cmd_console_color: ''
    }
  },
  methods: {
    sendCmd() {
      this.cmd_output = this.cmd_input.split(' ')
			switch (this.cmd_output[0]) {
				case 'exit':
					this.$root.terminalOpen = false
					this.profilePopupEnable = false
					break
				case 'help':
					window.open('https://relay.theparadigmdev.com/terminal.html')
					break
				case 'set':
					switch (this.cmd_output[1]) {
						case 'flamechat':
							this.toggleFc(this.parseBool(this.cmd_output[2]))
							break
						case '404':
							this.global_pnfToggle(this.parseBool(this.cmd_output[2]))
							break
						case 'lockdown':
							this.lockdownToggle(this.parseBool(this.cmd_output[2]))
							break
						case 'shutdown':
							this.toggleShutdown(this.parseBool(this.cmd_output[2]))
							break
						case 'sign_up':
							this.toggleSignUp(this.parseBool(this.cmd_output[2]))
							break
						default:
							this.cmdError('! command does not exist')
					}
					break
				case 'user':
					switch (this.cmd_output[2]) {
						case 'ban':
							this.userBan(this.cmd_output[1], this.parseBool(this.cmd_output[3]))
							break
						case 'admin':
							this.userAdmin(this.cmd_output[1], this.parseBool(this.cmd_output[3]))
							break
						case 'view':
							this.openUsernamePopup(this.cmd_output[1])
							break
						case 'strike':
							this.userStrike(this.cmd_output[1], this.cmd_output[3])
							break
						case 'the_inner_core':
							this.userTIC(this.cmd_output[1], this.parseBool(this.cmd_output[3]))
							break
						case 'asteroid':
							this.userAsteroid(this.cmd_output[1], this.parseBool(this.cmd_output[3]))
							break
						case 'writer':
							this.userWriter(this.cmd_output[1], this.parseBool(this.cmd_output[3]))
							break
						case 'analytics':
							this.userAnalytics(this.cmd_output[1], this.parseBool(this.cmd_output[3]))
							break
					}
					break
				case 'switch':
					this.$root.switch = this.cmd_output[1]
					break
				case 'clear':
					this.profilePopupEnable = false
					this.cmd_console = ''
					this.cmd_console_open = false
					break
				case 'console':
					this.cmd_console = ''
					for (var array_pos = 2; array_pos < this.cmd_output.length; array_pos++) {
						this.cmd_console = this.cmd_console + ' ' + this.cmd_output[array_pos]
					}
					this.cmd_console_color = this.cmd_output[1]
					this.cmd_console_open = true
					break
			}
			this.cmd_input = ''
			this.cmd_output = ''
		},
		userBan(username, input) {
      db.collection('users').doc(username).update({
        isBanned: input
      })
		},
		userWriter(username, input) {
      db.collection('users').doc(username).update({
        isWriter: input
      })
    },
    userAdmin(username, input) {
      db.collection('users').doc(username).update({
        isAdmin: input
      })
		},
		userAnalytics(username, input) {
      db.collection('users').doc(username).update({
        isAnalytics: input
      })
    },
    userStrike(username, input) {
      db.collection('users').doc(username).get().then(doc => {
        var current = parseInt(doc.data().strikes, 10)
				var input_int = parseInt(input, 10)
				db.collection('users').doc(username).update({
					strikes: current + input_int
				}).then(() => {
					if (current + input_int >= 3) {
						if (db.collection('users').doc(username).get().then(doc => doc.data().isBanned)) {
							db.collection('users').doc(username).update({ isBanned: true })
						}
					}
				})
			})
    },
    userTIC(username, input) {
      db.collection('users').doc(username).update({
        isInnerCore: input
      })
    },
    userAsteroid(username, input) {
      db.collection('users').doc(username).update({
        isAsteroid: input
      })
    },
    toggleSignUp(input) {
			db.collection('paradigm').doc('config').update({
				sign_up_enable: input
			}).then(() => {
				this.sign_up_enable = input
				if(this.sign_up_enable == true) {
					this.$ga.event(this.$root.username, 'enabled sign ups')
				} else {
					this.$ga.event(this.$root.username, 'disabled sign ups')
				}
			})
		},
		toggleShutdown(input) {
			db.collection('paradigm').doc('config').update({
				shutdown: input
			}).then(() => {
				this.lockdown = input
				if(this.lockdown == true) {
					this.$ga.event(this.$root.username, 'enabled shutdown')
				} else {
					this.$ga.event(this.$root.username, 'disabled shutdown')
				}
			})
		},
		toggleFcHTML() {
			db.collection('paradigm').doc('config').update({
				flamechat_html_render: !this.flamechat_html_render
			}).then(() => {
				if(this.flamechat_html_render == true) {
					this.$ga.event(this.$root.username, 'enabled Flamechat HTML')
				} else {
					this.$ga.event(this.$root.username, 'disabled Flamechat HTML')
				}
			})
		},
		lockdownToggle(input) {
			db.collection('paradigm').doc('config').update({
				lockdown: input
			}).then(() => {
				this.lockdown = input
				if (this.lockdown == true) {
					this.$ga.event(this.$root.username, 'locked down')
					this.$root.feedback = 'Locked down successfully.'
					this.$root.snackbar = true
				} else {
					this.$ga.event(this.$root.username, 'ended the lockdown')
					this.$root.feedback = 'Lockdown ended successfully.'
					this.$root.snackbar = true
				}
			})
		},
		global_pnfToggle(input) {
			db.collection('paradigm').doc('config').update({
				global_pnf: input
			}).then(() => {
				this.global_pnf = input
				if (this.global_pnf == true) {
					this.$ga.event(this.$root.username, '404ed')
					this.$root.feedback = '404 successfully.'
					this.$root.snackbar = true
				} else {
					this.$ga.event(this.$root.username, 'ended the 404')
					this.$root.feedback = '404 ended successfully.'
					this.$root.snackbar = true
				}
			})
		},
		toggleFc(input) {
			db.collection('paradigm').doc('config').update({
				flamechat_enable: input
			}).then(() => {
				this.flamechat_enable = input
				if (this.flamechat_enable) {
					this.$ga.event(this.$root.username, 'enabled Flamechat')
				}
				if (!this.flamechat_enable) {
					this.$ga.event(this.$root.username, 'disabled Flamechat')
				}
			})
    },
    openUsernamePopup(username) {
			this.$root.loadingBar = true
			this.usersDbDownloaded = false
			var usersRef = db.collection('users')
			usersRef.doc(username).get().then((doc) => {
        this.profilePopupData = doc.data()
				this.profilePopupUsername = username
				this.usersDbDownloaded = true
				this.$root.loadingBar = false
			})

			usersRef.onSnapshot(snapshot => {
				snapshot.docChanges().forEach(change => {
					if(change.type === "modified") {
						let doc = change.doc
						this.profilePopupData = doc.data()
						this.profilePopupUsername = username
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
			this.usersDbDownloaded = false
		},
    cmdError(input_text) {
			this.cmd_input = input_text
      this.cmd_class = 'red--text'
			this.cmd_enabled = false
      setTimeout(() => {
        this.cmd_input = ''
        this.cmd_class = 'white--text'
        this.cmd_enabled = true
      }, 3000)
    },
    parseBool(input) {
      if (input == 'true') return true
			if (input == 'false') return false
			if (input != 'true' || input != 'false') return undefined
		},
		checkIfUser(input) {
			db.collection('users').doc(input).get().then(doc => {
				if (doc != null) return true
				if (doc == null) return false
			})
		}
  }
}
</script>
