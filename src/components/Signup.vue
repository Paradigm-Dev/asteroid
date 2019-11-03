<template>
  <div>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field clearable autocomplete="off" type="text" name="username" v-model="$root.username" label="Username"></v-text-field>
          <span class="caption grey--text text--darken-1">
            This is the username you will use to login to your Paradigm account.
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field clearable autocomplete="off" type="password" name="password" v-model="password" label="Password"></v-text-field>
          <v-text-field clearable autocomplete="off" type="password" name="password" v-model="password_confirm" label="Confirm Password"></v-text-field>
          <span class="caption grey--text text--darken-1">
            Enter a password to sign in to your account.
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <v-color-picker mode="hexa" hide-mode-switch style="background-color: #2E2E2E;" class="mt-3 mb-3" v-model="$root.accountColor"></v-color-picker>
        <span class="caption grey--text text--darken-1">
          Pick a color for your account.
        </span>
      </v-window-item>

      <v-window-item :value="4">
        <v-text-field autocomplete="off" type="text" name="bio" v-model="$root.accountBio" label="Bio"></v-text-field>
        <span class="caption grey--text text--darken-1">
          Enter a shot biography.
        </span>
      </v-window-item>

      <v-window-item :value="5">
        <v-checkbox label="I have read and accept the Terms and Conditions" v-model="terms_accepted"></v-checkbox>
        <v-btn href="http://relay.theparadigmdev.com/terms.html" text color="blue-grey lighten-2">View Terms</v-btn><br>
        <span class="caption grey--text text--darken-1">
          Please read and accept the Terms and Conditions.
        </span>
      </v-window-item>

      <v-window-item :value="6">
        <span class="caption grey--text text--darken-1">
          Welcome to Paradigm!
        </span>
      </v-window-item>
    </v-window>
    <v-card-actions>
      <v-btn :disabled="step === 1 || step === 6" text @click="step--">Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="step !== 6" color="primary" @click="step++">Next</v-btn>
      <v-btn color="primary" v-if="step === 6" @click="signUp()">Continue</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { db, auth } from '@/firebase'

export default {
  name: 'Signup',
  data() {
    return {
      step: 1,
      terms_accepted: false,
      password_confirm: '',
      password: ''
    }
  },
  methods: {
    signUp() {
			if (this.password_confirm === this.password) {
				if (this.$root.username && this.password && this.terms_accepted && this.$root.accountBio && this.$root.accountColor) {
					auth.createUserWithEmailAndPassword(this.$root.username + '@theparadigmdev.com', this.password).then(user => {
						this.$root.username = user.user.email.substring(0, user.user.email.lastIndexOf("@"))
						db.collection('users').doc(this.$root.username).set({
							bio: this.$root.accountBio,
							color: this.$root.accountColor,
							moonrocks: 0,
							isAdmin: false,
							isInnerCore: false,
							isAsteroid: false,
							isAnalytics: false,
							uid: user.user.uid,
							isBanned: false,
							strikes: 0,
							isWriter: false,
							isLoggedIn: true
						})
            this.$ga.event(this.$root.username, 'signed up')
            this.$root.account_dialog = false
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
						} else {
							this.$root.feedback = 'Please fill in the required fields.'
							this.$root.snackbar = true
						}
					})
				}
			}
		}
  }
}
</script>

<style scoped>

</style>
