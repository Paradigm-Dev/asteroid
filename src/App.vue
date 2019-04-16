<template>
  <v-app dark>
    <!-- System toolbar -->
    <v-system-bar window app style="-webkit-app-region: drag;" class="grey darken-4">
      <div style="-webkit-app-region: no-drag">
        <v-icon @click="reload()" v-ripple class="toolbar-icon">refresh</v-icon>
        <v-icon @click="goBack()" v-ripple class="toolbar-icon">arrow_back</v-icon>
        <v-icon @click="goForward()" v-ripple class="toolbar-icon">arrow_forward</v-icon>
      </div>
      <v-spacer></v-spacer>
      <div>
        <img src="./assets/corner-img.png" height="18" style="position: relative; top: +2px; margin-right: 5px;">
        <span>Asteroid</span>
      </div>
      <v-spacer></v-spacer>
      <div style="-webkit-app-region: no-drag; position: relative; top: +1px;">
        <v-icon @click="minimize()" v-ripple class="toolbar-icon">minimize</v-icon>
        <v-icon @click="maximized ? unmaximize() : maximize()" v-ripple class="toolbar-icon">crop_square</v-icon>
        <v-icon @click="close()" v-ripple class="toolbar-icon">close</v-icon>
      </div>
    </v-system-bar>

    <!-- Toolbar -->
		<v-toolbar app :class="{ 'toolbar-no-ld': !lockdown, 'red': lockdown }">
			<v-toolbar-side-icon @click="drawer = !drawer" v-if="$root.userPresent && !lockdown && !fourofour && !$root.isBanned"></v-toolbar-side-icon>
			<v-toolbar-title>
				<img style="height: 45px;" src="./assets/asteroidlogo.png" class="hidden-xs-only logo">
				<img style="height: 45px;" src="./assets/corner-img.png" class="hidden-sm-and-up logo-sm">
			</v-toolbar-title>
      <v-spacer></v-spacer>
      <p class="clock font-weight-light hidden-xs-only">{{ currentDate }}<br>{{ currentTime }}</p>
			<v-spacer></v-spacer>
			<v-toolbar-items v-if="$root.userPresent && !lockdown && !fourofour && !$root.isBanned">
				<v-btn flat icon @click="adminDialog = true" slot="activator" v-if="$root.isAdmin">
					<v-icon>settings</v-icon>
				</v-btn>
				<v-btn icon @click="dialog = true">
					<v-icon>person</v-icon>
				</v-btn>
			</v-toolbar-items>
			<v-toolbar-items v-if="$root.username == 'diddy12310' && lockdown">
				<v-switch @click="lockdownToggle" v-model="lockdown" style="flex: none !important; top: +16px;"></v-switch>
			</v-toolbar-items>
			<v-toolbar-items v-if="$root.username == 'diddy12310' && fourofour">
				<v-switch @click="fourofourToggle" v-model="fourofour" style="flex: none !important; top: +16px;"></v-switch>
			</v-toolbar-items>
		</v-toolbar>

		<!-- Navigation drawer -->
		<v-navigation-drawer v-model="drawer" app temporary floating>
			<v-toolbar>
				<v-toolbar-side-icon @click.prevent="drawer = false"><v-icon>close</v-icon></v-toolbar-side-icon>
				<v-toolbar-title>Menu</v-toolbar-title>
			</v-toolbar>

			<v-list>
				<v-list-tile v-for="link in apps" :key="link.route" router :to="link.route" :ripple="{ class: 'grey--text' }">
					<v-list-tile-title class="font-weight-light">{{ link.text }}</v-list-tile-title>
				</v-list-tile>

				<v-list-group>
					<v-list-tile slot="activator">
						<v-list-tile-title class="font-weight-black">Company</v-list-tile-title>
					</v-list-tile>

					<v-list-tile v-for="link in company" :key="link.route" router :to="link.route" :ripple="{ class: 'grey--text' }">
						<v-list-tile-title class="font-weight-light">{{ link.text }}</v-list-tile-title>
					</v-list-tile>
				</v-list-group>

				<v-list-group>
					<v-list-tile slot="activator">
						<v-list-tile-title class="font-weight-black">Latest</v-list-tile-title>
					</v-list-tile>

					<v-list-tile v-for="link in latest" :key="link.route" router :to="link.route" :ripple="{ class: 'grey--text' }">
						<v-list-tile-title class="font-weight-light">{{ link.text }}</v-list-tile-title>
					</v-list-tile>
				</v-list-group>

				<v-list-group>
					<v-list-tile slot="activator">
						<v-list-tile-title class="font-weight-black">Developers</v-list-tile-title>
					</v-list-tile>

					<v-list-tile v-for="link in developers" :key="link.route" router :to="link.route" :ripple="{ class: 'grey--text' }">
						<v-list-tile-title class="font-weight-light">{{ link.text }}</v-list-tile-title>
					</v-list-tile>
				</v-list-group>
			</v-list>
    </v-navigation-drawer>

		<!-- Account dialog -->
		<v-dialog v-model="dialog" max-width="500">
			<v-card>
				<v-card-title primary-title>
					<h3 v-if="!$root.userPresent" class="headline mb-0">Account</h3>
					<h3 v-if="$root.userPresent" class="headline mb-0 font-weight-medium text-uppercase" :style="{ color: $root.accountColor }">{{ $root.username }}</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="dialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text>
					<v-tabs fixed-tabs v-if="!$root.userPresent && signUpAvail">
						<v-tab>Sign In</v-tab>
						<v-tab-item>
							<v-form>
								<v-text-field autocomplete="off" type="text" name="username" v-model="$root.username" label="Username" :rules="usernameRules"></v-text-field>
								<v-text-field autocomplete="off" type="password" name="password" v-model="password" label="Password" :rules="passRules"></v-text-field>
								<v-btn @click="signIn" color="primary">Sign In</v-btn>
							</v-form>
						</v-tab-item>
						<v-tab>Sign Up</v-tab>
						<v-tab-item>
							<v-form>
								<v-text-field autocomplete="off" type="text" name="username" v-model="$root.username" label="Username" :rules="usernameRules"></v-text-field>
								<v-text-field autocomplete="off" type="password" name="password" v-model="password" label="Password" :rules="passRules"></v-text-field>
								<v-text-field autocomplete="off" type="text" name="bio" v-model="$root.accountBio" label="Bio"></v-text-field>
								<swatches style="width: 100%; height: 100%; background-color: #2E2E2E; overflow-y: hidden;" v-model="$root.accountColor" />
								<v-checkbox label="I have read and accept the Terms and Conditions" v-model="terms"></v-checkbox>
								<v-btn href="https://relay.theparadigmdev.com/terms.html">View Terms</v-btn>
								<v-btn @click="signUp" color="primary">Sign Up</v-btn>
							</v-form>
						</v-tab-item>
					</v-tabs>

					<v-form v-if="!$root.userPresent && !signUpAvail">
						<v-text-field autocomplete="off" type="text" name="username" v-model="$root.username" label="Username" :rules="usernameRules"></v-text-field>
						<v-text-field autocomplete="off" type="password" name="password" v-model="password" label="Password" :rules="passRules"></v-text-field>
					</v-form>

					<div v-if="$root.userPresent">
						<p>{{ $root.accountBio }}</p>
						<img src="./assets/moonrocks.png" alt="Moonrocks" class="moonrock-img"><span class="moonrock-count font-weight-medium">{{ $root.moonrocks }}</span>
						<p><strong>Last Sign In:</strong> {{ userInfo.metadata.lastSignInTime }}</p>
						<p><strong>Account Creation:</strong> {{ userInfo.metadata.creationTime }}</p>
						<p><strong>User ID:</strong> {{ userInfo.uid }}</p>
						<v-divider></v-divider>
						<v-btn @click="newBioDialog = true" flat color="accent">Edit Bio</v-btn>
						<v-btn @click="newColorDialog = true" flat color="accent">Change Color</v-btn>
						<v-btn @click="newPasswordDialog = true" flat color="warning">Change Password</v-btn>
						<v-btn @click="deleteDialog = true" flat color="error">Delete Account</v-btn>
					</div>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn v-if="!$root.userPresent && !signUpAvail" @click="signIn" color="primary">Sign In</v-btn>
					<v-btn v-if="$root.userPresent" @click="signOut">Sign Out</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Delete account dialog -->
		<v-dialog v-model="deleteDialog" max-width="400">
			<v-card>
				<v-card-title><h3 class="headline mb-0">Delete Account</h3></v-card-title>
				<v-card-text>Are you sure you want to delete your account?</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn @click="deleteUser" color="error" flat>Yes</v-btn>
					<v-btn @click="deleteDialog = false" color="green">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- New password dialog -->
		<v-dialog v-model="newPasswordDialog" max-width="400">
			<v-card>
				<v-card-title><h3 class="headline mb-0">Change Password</h3></v-card-title>
				<v-card-text>
					<v-text-field autocomplete="off" type="password" name="newPassword" v-model="newPassword" label="New Password" :rules="passRules"></v-text-field>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn @click="changePass" color="warning" flat>Change Password</v-btn>
					<v-btn @click="newPasswordDialog = false" flat color="accent">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- New color dialog -->
		<v-dialog v-model="newColorDialog" max-width="400">
			<v-card>
				<v-card-title><h3 class="headline mb-0">Change Color</h3></v-card-title>
				<v-card-text>
					<swatches style="width: 100%; height: 100%; background-color: #2E2E2E; overflow-y: hidden;" v-model="$root.accountColor" />
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn @click="changeColor($root.accountColor.hex)" color="warning" flat>Change Color</v-btn>
					<v-btn @click="newColorDialog = false" flat color="accent">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- New bio dialog -->
		<v-dialog v-model="newBioDialog" max-width="400">
			<v-card>
				<v-card-title><h3 class="headline mb-0">Change Bio</h3></v-card-title>
				<v-card-text>
					<v-text-field autocomplete="off" type="text" name="bio" v-model="$root.accountBio" label="Bio"></v-text-field>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn @click="changeBio($root.accountBio)" color="warning" flat>Change Bio</v-btn>
					<v-btn @click="newBioDialog = false" flat color="accent">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Admin dialog -->
		<v-dialog v-model="adminDialog" max-width="500" v-if="$root.isAdmin">
			<v-card>
				<v-card-title>
					<h3 class="headline mb-0">Mission Control</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="adminDialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-switch @click="toggleSignUp" v-model="signUpAvail" style="flex: none !important;" label="Sign up availability"></v-switch>
					<v-switch @click="lockdownToggle" v-model="lockdown" style="flex: none !important;" label="Lockdown" color="red"></v-switch>
					<v-switch @click="fourofourToggle" v-model="fourofour" style="flex: none !important;" label="404" color="deep-purple"></v-switch>
					<v-switch @click="toggleFc" v-model="flamechatEnable" style="flex: none !important;" label="Flamechat" color="deep-orange"></v-switch>
					<v-switch @click="toggleFcHTML" v-model="flamechatHTML" style="flex: none !important;" label="Flamechat HTML" color="deep-orange"></v-switch>
					<v-divider></v-divider>
					<v-btn flat color="blue-grey" router to="/admin/users" @click="adminDialog = false">Users</v-btn>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn flat color="deep-orange" href="https://console.firebase.google.com/project/paradigm-a1bc9/overview">Firebase</v-btn>
					<v-btn flat color="deep-purple lighten-1" href="https://app.logrocket.com/uvh8hk/paradigm">LogRocket</v-btn>
					<v-btn flat color="blue" href="https://search.google.com/search-console?resource_id=sc-domain:theparadigmdev.com">Search</v-btn>
					<v-btn flat color="deep-purple lighten-1" router to="/admin/inquiry" @click="adminDialog = false">Inquiry</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Site content -->
		<v-content>
			<v-container fluid style="padding: 0;">
				<router-view v-if="$root.userPresent && !lockdown && !fourofour && !$root.isBanned"></router-view>
				<div class="noUser" v-if="!$root.userPresent &&!lockdown && !fourofour" style="text-align: center;">
					<h1 class="display-3 red--text font-weight-thin text-uppercase" style="margin: 100px 0px 25px 0px;">No User is Logged In</h1>
					<h3 class="headline font-weight-light" style="margin: 25px;">Please login to continue.</h3>
					<v-btn color="primary" @click="dialog = true">Login</v-btn>
				</div>
				<div class="lockdown" v-if="lockdown" style="text-align: center;">
					<v-icon style="font-size: 75px; margin-top: 100px;" color="red">block</v-icon>
					<h1 class="display-3 red--text font-weight-thin text-uppercase" style="margin: 25px 0px 25px 0px;">Nope.</h1>
					<h3 class="headline font-weight-light" style="margin: 25px;">Entry is not permitted.</h3>
				</div>
				<div class="banned" v-if="$root.isBanned && !lockdown && !fourofour" style="text-align: center;">
					<v-icon style="font-size: 75px; margin-top: 100px;" color="red">block</v-icon>
					<h1 class="display-3 red--text font-weight-thin text-uppercase" style="margin: 25px 0px 25px 0px;">Sorry!</h1>
					<h3 class="headline font-weight-light" style="margin: 25px;">But, you've been banned.</h3>
				</div>
				<div class="fourofour" v-if="fourofour && !lockdown" style="text-align: center;">
					<v-icon style="font-size: 75px; margin-top: 100px;" color="deep-purple darken-3">warning</v-icon>
					<h1 class="display-3 deep-purple--text darken-3 font-weight-thin text-uppercase" style="margin: 25px 0px 25px 0px;">404</h1>
					<h3 class="headline font-weight-light" style="margin: 25px;">Page not found.<br>There is probably an issue with the server.</h3>
				</div>
			</v-container>
			<v-progress-linear :indeterminate="true" v-if="$root.loadingBar" class="loading-bar"></v-progress-linear>
		</v-content>

		<!-- Snackbar -->
		<v-snackbar v-model="$root.snackbar" bottom left :timeout="2000">{{ $root.feedback }}</v-snackbar>
  </v-app>
</template>

<script>
import db from './firestore'
import firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
import { Swatches } from 'vue-color'
import LogRocket from 'logrocket'
const remote = require('electron').remote

export default {
  name: 'Asteroid',
  data() {
    return {
      win: remote.getCurrentWindow(),
      maximized: remote.getCurrentWindow().isMaximized(),
      drawer: false,
			apps: [
				{ text: 'Home', route: '/home' },
				{ text: 'Flamechat', route: '/flame' },
				{ text: 'The Paradox', route: '/paradox' },
				{ text: 'Hex', route: '/hex' },
				{ text: 'Satellite', route: '/satellite'},
				{ text: 'Asteroid', route: '/asteroid' },
				{ text: 'Bookshelf', route: '/bookshelf' },
				{ text: 'Movies', route: '/movies' },
				{ text: 'Music', route: '/music' },
				{ text: 'Scorecard', route: '/scorecard' }
			],
			company: [
				{ text: 'Support', route: '/company/support' },
				{ text: 'Notice', route: '/company/notice' },
				{ text: 'Roadmap', route: '/company/roadmap' },
				{ text: 'Terms', route: '/company/terms' },
				{ text: 'Network Status', route: '/company/status' },
				{ text: 'About', route: '/company/about' }
			],
			latest: [
				{ text: 'Memes', route: '/latest/memes' },
				{ text: 'Rocco', route: '/latest/rocco' }
			],
			developers: [
				{ text: 'Contracts', route: '/dev/contracts' },
				{ text: 'Relay', route: '/dev/relay' },
				{ text: 'Databank', route: '/dev/databank' },
			],
			password: '',
			dialog: false,
			usernameRules: [
				value => value.length >= 3 || 'Minimum length is 3 characters',
			],
			passRules: [
				value => value.length >= 8 || 'Minimum length is 8 characters'
			],
			userInfo: null,
			newPassword: null,
			signUpAvail: null,
			terms: false,
			deleteDialog: false,
			lockdown: null,
			flamechatEnable: null,
			fourofour: null,
			flamechatHTML: null,
			newPasswordDialog: false,
			adminDialog: false,
			newColorDialog: false,
			newBioDialog: false,
			currentTime: '',
			currentDate: ''
    }
  },
  components: {
    Swatches
  },
  methods: {
    close() {
      this.win.close()
    },
    maximize() {
      this.win.maximize()
      this.maximized = remote.getCurrentWindow().isMaximized()
    },
    unmaximize() {
      this.win.unmaximize()
      this.maximized = remote.getCurrentWindow().isMaximized()
    },
    minimize() {
      this.win.minimize()
    },
    reload() {
      location.reload()
    },
    startTime() {
			var today = new Date()
			this.currentDate = moment(today).format('MMMM Do, YYYY')
			this.currentTime = moment(today).format('LTS')
			setTimeout(this.startTime, 500)
    },
    goBack() {
      this.win.webContents.goBack()
    },
    goForward() {
      this.win.webContents.goForward()
    },
    signIn() {
			if(this.$root.username && this.password) {
				firebase.auth().signInWithEmailAndPassword(this.$root.username + '@theparadigmdev.com', this.password).then(() => {
				  
				}).catch(error => {
					if(error.code == 'auth/invalid-email') {
						this.$root.feedback = 'Do not use spaces or characters disallowed in an email address.'
						this.$root.snackbar = true
					}
					if(error.code == 'auth/wrong-password') {
						this.$root.feedback = 'Please check your password.'
						this.$root.snackbar = true
					}
					if(error.code == 'auth/invalid-email' || 'auth/wrong-password') {
						this.$root.feedback = error.message
						this.$root.snackbar = true
					}
				})
			} else {
				this.$root.feedback = 'Please fill in the required fields.'
				this.$root.snackbar = true
			}
		},
		signUp() {
			if(this.$root.username && this.password && this.terms && this.$root.accountBio && this.$root.accountColor) {
				firebase.auth().createUserWithEmailAndPassword(this.$root.username + '@theparadigmdev.com', this.password).then(user => {
					db.collection('users').doc(this.$root.username).set({
						bio: this.$root.accountBio,
						color: this.$root.accountColor,
						moonrocks: 0,
						isAdmin: false,
						isInnerCore: false,
						isAsteroid: false,
						isAnalytics: false,
						uid: user.uid,
						isBanned: false,
						strikes: 0,
						isWriter: false
					})
					this.$ga.event(this.$root.username, 'signed up')
					this.inquiryEvent(this.$root.username, 'signed up', '$account', this.$root.accountColor)
				}).catch(error => {
					if(error.code == 'auth/invalid-email') {
						this.$root.feedback = 'Do not use spaces or characters disallowed in an email address.'
						this.$root.snackbar = true
					}
					if(error.code == 'auth/wrong-password') {
						this.$root.feedback = 'Please check your password.'
						this.$root.snackbar = true
					}
					if(error.code != 'auth/invalid-email' || 'auth/wrong-password') {
						this.$root.feedback = error.message
						this.$root.snackbar = true
					}
				})
			} else {
				this.$root.feedback = 'Please fill in the required fields.'
				this.$root.snackbar = true
			}
		},
		signOut() {
			this.$ga.event(this.$root.username, 'signed out')
			this.inquiryEvent(this.$root.username, 'signed out', '$account', this.$root.accountColor)
			firebase.auth().signOut().then(() => {
				this.$root.feedback = 'Signed out successfully.'
				this.$root.snackbar = true
			})
		},
		changePass() {
			firebase.auth().currentUser.updatePassword(this.newPassword).then(() => {
				// Update successful.
				this.newPasswordDialog = false,
				this.$root.feedback = 'Password changed successfully.'
				this.$root.snackbar = true
				this.$ga.event(this.$root.username, 'changed their password')
				this.inquiryEvent(this.$root.username, 'changed their password', '$account', this.$root.accountColor)
			}).catch(error => {
				// An error happened.
				this.$root.feedback = 'Password changed unsuccessfully.'
				this.$root.snackbar = true
			})
			this.newPassword = null
		},
		deleteUser() {
			this.$ga.event(this.$root.username, 'deleted their account')
			this.inquiryEvent(this.$root.username, 'deleted their account', '$account', this.$root.accountColor)
			firebase.auth().currentUser.delete().then(() => {
				// User deleted.
				db.collection('users').doc(this.$root.username).delete().then(() => {
					this.$root.username = null
					this.userInfo = null
					this.$root.userPresent = false
				})
				this.$root.feedback = 'Account deleted sucessfully.'
				this.$root.snackbar = true
			}).catch(error => {
				// An error happened.
				console.log(error)
			})
			this.deleteDialog = false
			this.dialog = false
		},
		toggleSignUp() {
			db.collection('meta').doc('auth').update({
				signUpAvail: !this.signUpAvail
			}).then(() => {
				if(this.signUpAvail == true) {
					this.$ga.event(this.$root.username, 'enabled sign ups')
					this.inquiryEvent(this.$root.username, 'enabled sign ups', '$admin', this.$root.accountColor)
				} else {
					this.$ga.event(this.$root.username, 'disabled sign ups')
					this.inquiryEvent(this.$root.username, 'disabled sign ups', '$admin', this.$root.accountColor)
				}
			})
		},
		toggleFcHTML() {
			db.collection('meta').doc('auth').update({
				flamechatHTML: !this.flamechatHTML
			}).then(() => {
				if(this.flamechatHTML == true) {
					this.$ga.event(this.$root.username, 'enabled Flamechat HTML')
					this.inquiryEvent(this.$root.username, 'enabled Flamechat HTML rendering', '$admin', this.$root.accountColor)
				} else {
					this.$ga.event(this.$root.username, 'disabled Flamechat HTML')
					this.inquiryEvent(this.$root.username, 'disabled Flamechat HTML rendering', '$admin', this.$root.accountColor)
				}
			})
		},
		lockdownToggle() {
			db.collection('meta').doc('auth').update({
				lockdown: !this.lockdown
			}).then(() => {
				if (this.lockdown == true) {
					this.$ga.event(this.$root.username, 'locked down')
					this.inquiryEvent(this.$root.username, 'locked down', '$admin', this.$root.accountColor)
					this.$root.feedback = 'Locked down successfully.'
					this.$root.snackbar = true
				} else {
					this.$ga.event(this.$root.username, 'ended the lockdown')
					this.inquiryEvent(this.$root.username, 'ended the lockdown', '$admin', this.$root.accountColor)
					this.$root.feedback = 'Lockdown ended successfully.'
					this.$root.snackbar = true
				}
			})
		},
		fourofourToggle() {
			db.collection('meta').doc('auth').update({
				fourofour: !this.fourofour
			}).then(() => {
				if (this.fourofour == true) {
					this.$ga.event(this.$root.username, '404ed')
					this.inquiryEvent(this.$root.username, '404ed', '$admin', this.$root.accountColor)
					this.$root.feedback = '404 successfully.'
					this.$root.snackbar = true
				} else {
					this.$ga.event(this.$root.username, 'ended the 404')
					this.inquiryEvent(this.$root.username, 'ended the 404', '$admin', this.$root.accountColor)
					this.$root.feedback = '404 ended successfully.'
					this.$root.snackbar = true
				}
			})
		},
		toggleFc() {
			db.collection('meta').doc('auth').update({
				flamechatEnable: !this.flamechatEnable
			}).then(() => {
				if (this.flamechatEnable) {
					this.$ga.event(this.$root.username, 'enabled Flamechat')
					this.inquiryEvent(this.$root.username, 'enabled Flamechat', '$admin', this.$root.accountColor)
				}
				if (!this.flamechatEnable) {
					this.$ga.event(this.$root.username, 'disabled Flamechat')
					this.inquiryEvent(this.$root.username, 'disabled Flamechat', '$admin', this.$root.accountColor)
				}
			})
		},
		changeColor(newColor) {
			db.collection('users').doc(this.$root.username).update({
				color: newColor
			}).then(() => {
				this.$root.accountColor = newColor
				this.newColorDialog = false
				this.$ga.event(this.$root.username, 'changed their color to ' + this.$root.accountColor)
				this.inquiryEvent(this.$root.username, 'changed their color to ' + this.$root.accountColor, '$account', this.$root.accountColor)
			})
		},
		changeBio(newBio) {
			db.collection('users').doc(this.$root.username).update({
				bio: newBio
			}).then(() => {
				this.accountBio = newBio
				this.newBioDialog = false
				this.$ga.event(this.$root.username, 'changed their bio to ' + this.$root.accountBio)
				this.inquiryEvent(this.$root.username, 'changed their bio to ' + this.$root.accountBio, '$account', this.$root.accountColor)
			})
		},
		startTime() {
			var today = new Date()
			this.currentDate = moment(today).format('MMMM Do YYYY')
			this.currentTime = moment(today).format('LTS')
			setTimeout(this.startTime, 500)
		}
  },
  created() {
		this.$root.loadingBar = true
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if(firebaseUser) {
				this.$root.feedback = 'Signed in successfully.'
				this.$root.snackbar = true
				this.$root.userPresent = true
				this.$root.username = firebaseUser.email.substring(0, firebaseUser.email.lastIndexOf("@"))
				this.userInfo = firebaseUser
				this.$ga.event(this.$root.username, 'signed in')

				var usersRef = db.collection('users')
				usersRef.doc(this.$root.username).get().then(doc => {
					this.$root.accountBio = doc.data().bio
					this.$root.accountColor = doc.data().color
					this.$root.moonrocks = doc.data().moonrocks
					this.$root.isAdmin = doc.data().isAdmin
					this.$root.isInnerCore = doc.data().isInnerCore
					this.$root.isAnalytics = doc.data().isAnalytics
					this.$root.isAsteroid = doc.data().isAsteroid
					this.$root.isBanned = doc.data().isBanned
					this.$root.strikes = doc.data().strikes
					this.$root.isWriter = doc.data().isWriter
					if (doc.data().strikes >= 3) {
						this.$root.isBanned = true
						if (db.collection('users').doc(this.$root.username).get().then(doc => doc.data().isBanned)) {
							db.collection('users').doc(this.$root.username).update({ isBanned: true })
						}
					} else {
						db.collection('users').doc(this.$root.username).update({ isBanned: false })
					}
					this.inquiryEvent(this.$root.username, 'signed in', '$account', this.$root.accountColor)
					LogRocket.identify(this.userInfo.uid, {
						name: this.$root.username,
						isAdmin: this.$root.isAdmin,
						isAsteroid: this.$root.isAsteroid,
						bio: this.$root.accountBio,
						color: this.$root.accountColor,
						moonrocks: this.$root.moonrocks
					})
				})

				usersRef.onSnapshot(snapshot => {
					snapshot.docChanges().forEach(change => {
						if(change.type === "modified" && change.doc.id == this.$root.username) {
							let doc = change.doc
							this.$root.accountBio = doc.data().bio
							this.$root.accountColor = doc.data().color
							this.$root.moonrocks = doc.data().moonrocks
							this.$root.isAdmin = doc.data().isAdmin
							this.$root.isInnerCore = doc.data().isInnerCore
							this.$root.isAnalytics = doc.data().isAnalytics
							this.$root.isAsteroid = doc.data().isAsteroid
							this.$root.isBanned = doc.data().isBanned
							this.$root.strikes = doc.data().strikes
							this.$root.isWriter = doc.data().isWriter
							if (doc.data().strikes >= 3) {
								this.$root.isBanned = true
								if (db.collection('users').doc(this.$root.username).get().then(doc => doc.data().isBanned)) {
									db.collection('users').doc(this.$root.username).update({ isBanned: true })
								}
							}
						}
					})
				})
			} else {
				this.$root.userPresent = false
				this.$root.username = ''
				this.password = ''
			}
		})

		var metaRef = db.collection('meta')
		metaRef.doc('auth').get().then((doc) => {
			this.signUpAvail = doc.data().signUpAvail
			this.lockdown = doc.data().lockdown
			this.flamechatEnable = doc.data().flamechatEnable,
			this.fourofour = doc.data().fourofour,
			this.flamechatHTML = doc.data().flamechatHTML
		})

		metaRef.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if(change.type === "modified") {
					let doc = change.doc
					this.signUpAvail = doc.data().signUpAvail
					this.lockdown = doc.data().lockdown
					this.flamechatEnable = doc.data().flamechatEnable,
					this.fourofour = doc.data().fourofour,
					this.flamechatHTML = doc.data().flamechatHTML
				}

				if (this.lockdown || this.fourofour) {
					this.newBioDialog = false
					this.newColorDialog = false
					this.adminDialog = false
					this.newPasswordDialog = false
					this.deleteDialog = false
					this.dialog = false
				}
			})
		})
		this.startTime()
		this.$root.loadingBar = false
	}
}
</script>

<style>
.clock {
	margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
	text-align: center;
}

/* Scrollbar */

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(33, 33, 33);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(100, 100, 100);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(60, 60, 60);
}

.error-card {
	margin: auto;
	padding: 16px;
	text-align: center;
}

.error-card p {
	margin: 0;
	padding: 0;
}

.dialog-close-btn {
	margin-top: 0px !important;
}

.toolbar-no-ld {
	background: linear-gradient(to right, #542478 0%, #011949 100%);
}

.v-input--switch {
	flex: none !important;
	position: relative;
	height: 30px;
}

.moonrock-img {
	height: 50px;
	margin-bottom: 16px;
}

.moonrock-count {
	position: relative;
	bottom: +36px;
	padding-left: 5px;
}

.loading-bar {
	position: absolute;
	bottom: -14px;
}

.logo {
	margin: 0;
  position: absolute;
  top: 50%;
  left: 150px;
  transform: translate(-50%, -50%);
}

.logo-sm {
	margin: 0;
  position: absolute;
  top: 47%;
  left: 80px;
  transform: translate(-50%, -50%);
}

html {
  overflow-y: auto;
	-webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.toolbar-icon {
  border-radius: 100px;
}
</style>
