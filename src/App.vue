<template>
  <v-app dark>
    <!-- System toolbar -->
    <v-system-bar app window style="-webkit-app-region: drag;" class="grey darken-4">
      <div style="-webkit-app-region: no-drag">
        <v-icon @click="reload()" v-ripple class="toolbar-icon">mdi-refresh</v-icon>
        <v-icon @click="goBack()" v-ripple class="toolbar-icon">mdi-arrow-left</v-icon>
        <v-icon @click="goForward()" v-ripple class="toolbar-icon">mdi-arrow-right</v-icon>
      </div>
      <v-spacer></v-spacer>
      <div>
        <img src="./assets/corner-img.png" height="18" style="position: relative; top: +2px; margin-right: 5px;">
        <span>Asteroid</span>
      </div>
      <v-spacer></v-spacer>
      <div style="-webkit-app-region: no-drag; position: relative; top: +1px;">
        <v-icon @click="minimize()" v-ripple class="toolbar-icon">mdi-minus</v-icon>
        <v-icon @click="maximized ? unmaximize() : maximize()" v-ripple class="toolbar-icon">mdi-crop-square</v-icon>
        <v-icon @click="close()" v-ripple class="toolbar-icon">mdi-close</v-icon>
      </div>
    </v-system-bar>

    <!-- Toolbar -->
		<v-app-bar app :class="{ 'toolbar-no-ld': !lockdown, 'red': lockdown }" style="top: +30px;">
			<v-app-bar-nav-icon @click="drawer = !drawer" v-if="$root.userPresent && !lockdown && !global_pnf && !$root.isBanned"><v-icon>mdi-menu</v-icon></v-app-bar-nav-icon>
			<v-toolbar-title>
				<img style="height: 45px;" src="./assets/asteroidlogo.png" :class="{ 'logo': $root.userPresent, 'logo-nouser': !$root.userPresent, 'hidden-xs-only': $root.accountColor }">
				<img style="height: 45px;" src="./assets/corner-img.png" :class="{ 'logo-sm': $root.userPresent, 'logo-sm-nouser': !$root.userPresent, 'hidden-sm-and-up': $root.accountColor }">
			</v-toolbar-title>
      <v-spacer></v-spacer>
      <p class="clock font-weight-light hidden-xs-only">{{ currentDate }}<br>{{ currentTime }}</p>
			<v-spacer></v-spacer>
			<div v-if="$root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown">
				<v-btn icon @click="$root.terminalOpen = true" v-if="$root.isAdmin">
					<v-icon>settings</v-icon>
				</v-btn>
				<v-btn icon @click="$root.account_dialog = true">
					<v-icon>person</v-icon>
				</v-btn>
			</div>
			<div v-if="shutdown || lockdown || global_pnf && !$root.isBanned">
				<v-btn icon @click="$root.terminalOpen = true" v-if="$root.isAdmin">
					<v-icon>settings</v-icon>
				</v-btn>
			</div>
		</v-app-bar>

		<!-- Navigation drawer -->
		<v-navigation-drawer v-model="drawer" app temporary floating>
			<v-toolbar class="grey darken-4">
				<v-app-bar-nav-icon @click.prevent="drawer = false"><v-icon>mdi-close</v-icon></v-app-bar-nav-icon>
				<v-toolbar-title>Menu</v-toolbar-title>
			</v-toolbar>

			<v-list dense nav>
				<v-list-item @click="$root.switch = 'Home', drawer = false">
					<v-list-item-content>
						<v-list-item-title>Home</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
        <v-list-item v-for="link in apps" :key="link.route" link @click="$root.switch = `${link.route}`, drawer = false">
          <v-list-item-content>
            <v-list-item-title>{{ link.app }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
				<v-divider></v-divider>
				<v-list-group>
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-title>Company</v-list-item-title>
            </v-list-item>
          </template>

					<v-list-item v-for="link in company" :key="link.route" link @click="$root.switch = `${link.route}`, drawer = false">
						<v-list-item-content>
							<v-list-item-title>{{ link.app }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>
				<v-list-group>
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-title>Latest</v-list-item-title>
            </v-list-item>
          </template>

					<v-list-item v-for="link in latest" :key="link.route" link @click="$root.switch = `${link.route}`, drawer = false">
						<v-list-item-content>
							<v-list-item-title>{{ link.app }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>
				<v-list-group>
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-title>Developers</v-list-item-title>
            </v-list-item>
          </template>

					<v-list-item v-for="link in developers" :key="link.route" link @click="$root.switch = `${link.route}`, drawer = false">
						<v-list-item-content>
							<v-list-item-title>{{ link.app }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-group>
      </v-list>
			<template v-slot:append>
				<div class="grey darken-4 elevation-14">
					<v-divider></v-divider>
					<v-btn class="ma-2" icon color="#7289DA" href="https://discord.gg/cA9dpRM">
						<v-icon>mdi-discord</v-icon>
					</v-btn>
					<v-divider></v-divider>

					<v-list-item two-line>
						<v-list-item-content>
							<v-list-item-title class="text-uppercase font-weight-medium" :style="{ 'color': $root.accountColor }">{{ $root.username }}</v-list-item-title>
							<v-list-item-subtitle>Logged in</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</div>
      </template>
    </v-navigation-drawer>

		<!-- Account dialog -->
		<v-dialog v-model="$root.account_dialog" max-width="500">
			<v-card>
				<v-card-title primary-title>
					<h3 v-if="!$root.userPresent" class="headline mb-0">Account</h3>
					<h3 v-if="$root.userPresent" class="headline mb-0 font-weight-medium text-uppercase" :style="{ color: $root.accountColor }">{{ $root.username }}</h3>
					<v-spacer></v-spacer>
					<v-btn icon @click="$root.account_dialog = false" class="dialog-close-btn">
						<v-icon>close</v-icon>
					</v-btn>
				</v-card-title>

				<v-card-text>
					<v-tabs fixed-tabs v-if="!$root.userPresent && sign_up_enable">
						<v-tab>Sign In</v-tab>
						<v-tab-item>
							<v-form>
								<v-text-field clearable autocomplete="off" type="text" name="username" v-model="$root.username" label="Username"></v-text-field>
								<v-text-field clearable autocomplete="off" type="password" name="password" v-model="password" label="Password"></v-text-field>
								<v-btn @click="signIn" color="accent" text>Sign In</v-btn>
							</v-form>
						</v-tab-item>
						<v-tab>Sign Up</v-tab>
						<v-tab-item>
							<Signup />
						</v-tab-item>
					</v-tabs>

					<v-form v-if="!$root.userPresent && !sign_up_enable">
						<v-text-field clearable autocomplete="off" type="text" name="username" v-model="$root.username" label="Username"></v-text-field>
						<v-text-field clearable autocomplete="off" type="password" name="password" v-model="password" label="Password"></v-text-field>
					</v-form>

					<div v-if="$root.userPresent">
						<p>{{ $root.accountBio }}</p>
						<img src="./assets/moonrocks.png" alt="Moonrocks" class="moonrock-img"><span class="moonrock-count font-weight-medium">{{ $root.moonrocks }}</span>
						<p><strong>Last Sign In:</strong> {{ userInfo.metadata.lastSignInTime }}</p>
						<p><strong>Account Creation:</strong> {{ userInfo.metadata.creationTime }}</p>
						<p><strong>User ID:</strong> {{ userInfo.uid }}</p>
						<v-divider></v-divider>
						<div class="pt-2">
							<v-btn @click="newBioDialog = true" text color="accent">Edit Bio</v-btn>
							<v-btn @click="newColorDialog = true" text color="accent">Edit Color</v-btn>
							<v-btn @click="newPasswordDialog = true" text color="warning">New Password</v-btn>
							<v-btn @click="deleteDialog = true" text color="error">Delete Account</v-btn>
						</div>
					</div>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn v-if="!$root.userPresent && !sign_up_enable" @click="signIn" color="accent" text>Sign In</v-btn>
					<v-btn v-if="$root.userPresent" @click="signOut" color="accent" text>Sign Out</v-btn>
					<v-btn @click="disableNetwork()" color="red">Disable Firestore Connection</v-btn>
					<v-btn @click="enableNetwork()" color="green">Enable Firestore Connection</v-btn>
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
					<v-btn @click="deleteUser" color="error" text>Yes</v-btn>
					<v-btn @click="deleteDialog = false" color="green" text>Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- New password dialog -->
		<v-dialog v-model="newPasswordDialog" max-width="400">
			<v-card>
				<v-card-title><h3 class="headline mb-0">New Password</h3></v-card-title>
				<v-card-text>
					<v-text-field autocomplete="off" type="password" name="newPassword" v-model="newPassword" label="New Password"></v-text-field>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn @click="changePass" color="warning" text>Save</v-btn>
					<v-btn @click="newPasswordDialog = false" text color="accent">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- New color dialog -->
		<v-dialog v-model="newColorDialog" max-width="335">
			<v-card>
				<v-card-title><h3 class="headline mb-0">Edit Color</h3></v-card-title>
				<v-card-text>
					<v-layout justify-center>
						<v-color-picker mode="hexa" hide-mode-switch style="background-color: #2E2E2E;" v-model="$root.accountColor"></v-color-picker>
					</v-layout>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn @click="changeColor($root.accountColor.hex)" color="warning" text>Save</v-btn>
					<v-btn @click="newColorDialog = false" text color="accent">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- New bio dialog -->
		<v-dialog v-model="newBioDialog" max-width="400">
			<v-card>
				<v-card-title><h3 class="headline mb-0">Edit Bio</h3></v-card-title>
				<v-card-text>
					<v-text-field autocomplete="off" type="text" name="bio" v-model="$root.accountBio" label="Bio"></v-text-field>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn @click="changeBio($root.accountBio)" color="warning" text>Save</v-btn>
					<v-btn @click="newBioDialog = false" text color="accent">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Admin terminal -->
		<v-bottom-sheet v-model="$root.terminalOpen" v-if="$root.isAdmin">
			<Terminal />
    </v-bottom-sheet>

		<!-- Site content -->
		<v-content v-if="app_loaded">
			<v-container fluid style="padding: 0;">
				<!-- <router-view v-if="$root.userPresent && !lockdown && !global_pnf && !$root.isBanned"></router-view> -->
				<Home v-if="$root.switch == 'Home' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Flamechat v-if="$root.switch == 'Flamechat' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Roadmap v-if="$root.switch == 'Roadmap' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Terms v-if="$root.switch == 'Terms' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Drawer v-if="$root.switch == 'Drawer' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Scorecard v-if="$root.switch == 'Scorecard' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Support v-if="$root.switch == 'Support' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<News v-if="$root.switch == 'News' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Satellite v-if="$root.switch == 'Satellite' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Asteroid v-if="$root.switch == 'Asteroid' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<NetworkStatus v-if="$root.switch == 'NetworkStatus' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<LatestMemes v-if="$root.switch == 'LatestMemes' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<LatestVines v-if="$root.switch == 'LatestVines' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Contracts v-if="$root.switch == 'Contracts' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Databank v-if="$root.switch == 'Databank' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Relay v-if="$root.switch == 'Relay' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Media v-if="$root.switch == 'Media' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Weather v-if="$root.switch == 'Weather' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<Notice v-if="$root.switch == 'Notice' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<PageNotFound v-if="$root.switch == 'PageNotFound' && $root.userPresent && !lockdown && !global_pnf && !$root.isBanned && !shutdown"/>
				<div class="noUser" v-if="!$root.userPresent &&!lockdown && !global_pnf" style="text-align: center;">
					<h1 class="display-3 deep-purple--text font-weight-thin text-uppercase" style="margin: 100px 0px 25px 0px;">Welcome!</h1>
					<h3 class="headline font-weight-light" style="margin: 25px;">Please login to continue.</h3>
					<v-btn color="deep-purple" @click="$root.account_dialog = true">Login</v-btn>
				</div>
				<div class="lockdown" v-if="lockdown && !shutdown" style="text-align: center;">
					<v-icon style="font-size: 75px; margin-top: 100px;" color="red">block</v-icon>
					<h1 class="display-3 red--text font-weight-thin text-uppercase" style="margin: 25px 0px 25px 0px;">Nope.</h1>
					<h3 class="headline font-weight-light" style="margin: 25px;">Entry is not permitted.</h3>
				</div>
				<div class="banned" v-if="$root.isBanned && !lockdown && !global_pnf && !shutdown" style="text-align: center;">
					<v-icon style="font-size: 75px; margin-top: 100px;" color="red">block</v-icon>
					<h1 class="display-3 red--text font-weight-thin text-uppercase" style="margin: 25px 0px 25px 0px;">Sorry!</h1>
					<h3 class="headline font-weight-light" style="margin: 25px;">But, you've been banned.</h3>
				</div>
				<div class="global_pnf" v-if="global_pnf && !lockdown && !shutdown" style="text-align: center;">
					<v-icon style="font-size: 75px; margin-top: 100px;" color="deep-purple darken-3">warning</v-icon>
					<h1 class="display-3 deep-purple--text darken-3 font-weight-thin text-uppercase" style="margin: 25px 0px 25px 0px;">404</h1>
					<h3 class="headline font-weight-light" style="margin: 25px;">Page not found.<br>There is probably an issue with the server.</h3>
				</div>
				<div class="global_pnf" v-if="shutdown" style="text-align: center;">
					<v-icon style="font-size: 75px; margin-top: 100px;" color="black">highlight_off</v-icon>
					<h1 class="display-3 black--text font-weight-thin text-uppercase" style="margin: 25px 0px 25px 0px;">Shutdown</h1>
					<h3 class="headline font-weight-light grey--text darken-4" style="margin: 25px;">Paradigm has been shut down.</h3>
				</div>
			</v-container>
		</v-content>

		<!-- Snackbar -->
		<v-snackbar v-model="$root.snackbar" bottom left :timeout="2000">{{ $root.feedback }}</v-snackbar>

		<!-- Footer -->
		<v-footer app v-if="!shutdown && app_loaded">
			<v-progress-linear :active="$root.loadingBar" indeterminate absolute top color="deep-purple accent-4"></v-progress-linear>
			<div>&copy; {{ new Date().getFullYear() }} Paradigm</div>
		</v-footer>

		<p class="hidden-screen-only" style="margin: auto auto auto auto;">Paradigm cannot be printed!</p>
  </v-app>
</template>

<script>
import { db, perf, auth } from './firebase'
import firebase from 'firebase/app'
import moment from 'moment'
import Signup from './components/Signup'
const remote = require('electron').remote

// ------------------------------

import Home from './views/Home'
import Flamechat from './views/Flamechat'
import Roadmap from './views/Company/Roadmap'
import Terms from './views/Company/Terms'
import Drawer from './views/Drawer'
import Scorecard from './views/Scorecard'
import Support from './views/Company/Support'
import News from './views/News'
import Satellite from './views/Satellite'
import Asteroid from './views/Asteroid'
import NetworkStatus from './views/Company/NetworkStatus'
import LatestMemes from './views/Latest/Memes'
import LatestVines from './views/Latest/Vines'
import Contracts from './views/Devs/Contracts'
import Databank from './views/Devs/Databank'
import Relay from './views/Devs/Relay'
import About from './views/Company/About'
import Media from './views/Media'
import Terminal from './components/Terminal'
import Weather from './views/Weather'
import Notice from './views/Company/Notice'

export default {
	name: 'Asteroid',
	components: {
		Home, Flamechat, Roadmap, Terms, Drawer, Scorecard, Support, News, Satellite, Asteroid, NetworkStatus, LatestMemes,
		LatestVines, Contracts, Databank, Relay, Media, Terminal, Weather, Notice, Signup
	},
	data() {
		return {
			drawer: false,
			apps: [
				{ route: 'Flamechat', app: 'Flamechat' },
				{ route: 'News', app: 'The Paradox' },
				{ route: 'Satellite', app: 'Satellite' },
				{ route: 'Asteroid', app: 'Asteroid' },
				{ route: 'Scorecard', app: 'Scorecard' },
				{ route: 'Drawer', app: 'Drawer' },
				{ route: 'Media', app: 'Media' },
				{ route: 'Weather', app: 'Weather' },
			],
			company: [
				{ route: 'Support', app: 'Support' },
				{ route: 'Roadmap', app: 'Roadmap' },
				{ route: 'Terms', app: 'Terms of Use, Service, and Privacy Policy' },
				{ route: 'NetworkStatus', app: 'Network Status' },
			],
			latest: [
				{ route: 'LatestMemes', app: 'Memes' },
			],
			developers: [
				{ route: 'Contracts', app: 'Contracting' },
				{ route: 'Relay', app: 'Relay' },
				{ route: 'Databank', app: 'Databank' },
			],
			password: '',
			userInfo: null,
			newPassword: null,
			sign_up_enable: null,
			deleteDialog: false,
			lockdown: null,
			flamechat_enable: true,
			global_pnf: null,
			flamechat_html_render: true,
			newPasswordDialog: false,
			newColorDialog: false,
			newBioDialog: false,
			currentTime: '',
			currentDate: '',
			app_loaded: false,
			shutdown: null
		}
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
				auth.signInWithEmailAndPassword(this.$root.username + '@theparadigmdev.com', this.password).then(() => {
				  
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
		signUp() {
			if(this.$root.username && this.password && this.terms && this.$root.accountBio && this.$root.accountColor) {
				auth.createUserWithEmailAndPassword(this.$root.username + '@theparadigmdev.com', this.password).then(user => {
					console.log(user)
					this.$root.accountUID = user.uid
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
				db.collection('users').doc(this.$root.username).set({
					bio: this.$root.accountBio,
					color: this.$root.accountColor,
					moonrocks: 0,
					isAdmin: false,
					isInnerCore: false,
					isAsteroid: false,
					isAnalytics: false,
					uid: this.$root.accountUID,
					isBanned: false,
					strikes: 0,
					isWriter: false
				}).catch(error => {
					console.error(error)
				})
			} else {
				this.$root.feedback = 'Please fill in the required fields.'
				this.$root.snackbar = true
			}
		},
		signOut() {
			this.$ga.event(this.$root.username, 'signed out')
			this.inquiryEvent(this.$root.username, 'signed out', '$account', this.$root.accountColor)
			auth.signOut().then(() => {
				this.$root.feedback = 'Signed out successfully.'
				this.$root.snackbar = true
			})
		},
		changePass() {
			auth.currentUser.updatePassword(this.newPassword).then(() => {
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
			auth.currentUser.delete().then(() => {
				// User deleted.
				this.$root.feedback = 'Account deleted sucessfully.'
				this.$root.snackbar = true
			}).catch(error => {
				// An error happened.
				console.log(error)
			})
			db.collection('users').doc(this.$root.username).delete().then(() => {
				this.$root.username = null
				this.userInfo = null
				this.$root.userPresent = false
			})
			this.deleteDialog = false
			this.$root.account_dialog = false
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
		global_pnfToggle() {
			db.collection('meta').doc('auth').update({
				global_pnf: !this.global_pnf
			}).then(() => {
				if (this.global_pnf == true) {
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
		this.app_loaded = false
		auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
		this.$root.loadingBar = true
		auth.onAuthStateChanged(firebaseUser => {
			this.app_loaded = true
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
				this.$root.accountBio = ''
				this.terms = false
			}
		})

		var metaRef = db.collection('paradigm')
		metaRef.doc('config').get().then(doc => {
			this.sign_up_enable = doc.data().sign_up_enable
			this.lockdown = doc.data().lockdown
			this.shutdown = doc.data().shutdown
			this.flamechat_enable = doc.data().flamechat_enable,
			this.global_pnf = doc.data().global_pnf,
			this.flamechat_html_render = doc.data().flamechat_html_render
		})

		metaRef.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if(change.type === "modified") {
					let doc = change.doc
					this.sign_up_enable = doc.data().sign_up_enable
					this.lockdown = doc.data().lockdown
					this.shutdown = doc.data().shutdown
					this.flamechat_enable = doc.data().flamechat_enable,
					this.global_pnf = doc.data().global_pnf,
					this.flamechat_html_render = doc.data().flamechat_html_render
				}

				if (this.lockdown || this.global_pnf || this.shutdown) {
					this.newBioDialog = false
					this.newColorDialog = false
					this.newPasswordDialog = false
					this.deleteDialog = false
					this.$root.account_dialog = false
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
	background: linear-gradient(135deg, #162fa1 0%, #50336e 100%);
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
	bottom: 0px;
	margin-bottom: 0px;
}

.logo {
	margin: 0;
  position: absolute;
  top: 50%;
  left: 150px;
  transform: translate(-50%, -50%);
}

.logo-nouser {
	margin: 0;
  position: absolute;
  top: 50%;
  left: 110px;
  transform: translate(-50%, -50%);
}

.logo-sm {
	margin: 0;
  position: absolute;
  top: 47%;
  left: 80px;
  transform: translate(-50%, -50%);
}

.logo-sm-nouser {
	margin: 0;
  position: absolute;
  top: 47%;
  left: 40px;
  transform: translate(-50%, -50%);
}

html {
  overflow-y: auto !important;
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
