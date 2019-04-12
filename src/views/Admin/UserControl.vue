<template>
  <div class="user-control">
    <div style="text-align: center; margin: 50px 0px;" v-if="!$root.isAdmin && users[1]">
			<h1 class="display-3 red--text font-weight-thin text-uppercase">Unavailable</h1>
			<h6 class="headline white--text font-weight-thin mt-3">Please navigate away from this page.</h6>
		</div>

    <v-container>
      <v-expansion-panel v-if="$root.isAdmin && users[1]">
        <v-expansion-panel-content v-for="user in users" :key="user.username">
          <div slot="header">
            <h3 class="headline mb-0 text-uppercase font-weight-medium" :style="{ 'color': user.color }">{{ user.username }}</h3>
            <h4 class="subheading grey--text">{{ user.uid }}</h4>
          </div>
          <v-card>
            <v-card-text>
              <p>{{ user.bio }}</p>
              <v-layout row>
                <v-switch v-model="user.isAdmin" label="Admin" @click="toggleAdmin(user.username, user.isAdmin)"></v-switch>
                <v-switch v-model="user.isAsteroid" label="Asteroid" @click="toggleAsteroid(user.username, user.isAsteroid)"></v-switch>
                <v-switch v-model="user.isInnerCore" label="The Inner Core" @click="toggleInnerCore(user.username, user.isInnerCore)"></v-switch>
                <v-switch v-model="user.isBanned" label="Banned" @click="toggleBanned(user.username, user.isBanned)" :disabled="user.strikes >= 3"></v-switch>
                <v-switch v-model="user.isWriter" label="Writer" @click="toggleWriter(user.username, user.isWriter)"></v-switch>
              </v-layout>
              <p><b>Strikes:</b> {{ user.strikes }}</p>
              <v-btn flat icon :disabled="user.strikes >= 3" color="error" @click="addStrike(user.username, user.strikes)"><v-icon>add</v-icon></v-btn>
              <v-btn flat icon :disabled="user.strikes <= 0" color="success" @click="subStrike(user.username, user.strikes)"><v-icon>remove</v-icon></v-btn>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from './../../firestore'

export default {
  name: 'UserControl',
  data() {
    return {
      users: []
    }
  },
  created() {
		let ref = db.collection('users')

		ref.onSnapshot(snapshot => {
			snapshot.docChanges().forEach(change => {
				if(change.type === "added") {
					let doc = change.doc
					this.users.splice(change.newIndex, 0, {
						username: doc.id,
						bio: doc.data().bio,
						color: doc.data().color,
						isAdmin: doc.data().isAdmin,
						isAnalytics: doc.data().isAnalytics,
						isAsteroid: doc.data().isAsteroid,
            isInnerCore: doc.data().isInnerCore,
            moonrocks: doc.data().moonrocks,
            uid: doc.data().uid,
            isBanned: doc.data().isBanned,
            strikes: doc.data().strikes,
            isWriter: doc.data().isWriter
          })
				}
				if(change.type === "removed") {
					let doc = change.doc
					this.users.splice(change.oldIndex, 1)
				}
				if(change.type === "modified") {
					let doc = change.doc
					this.users.splice(change.oldIndex, 1, {
						username: doc.id,
						bio: doc.data().bio,
						color: doc.data().color,
						isAdmin: doc.data().isAdmin,
						isAnalytics: doc.data().isAnalytics,
						isAsteroid: doc.data().isAsteroid,
            isInnerCore: doc.data().isInnerCore,
            moonrocks: doc.data().moonrocks,
            uid: doc.data().uid,
            isBanned: doc.data().isBanned,
            strikes: doc.data().strikes,
            isWriter: doc.data().isWriter
					})
				}
			})
		})
  },
  methods: {
    toggleAdmin(username, currentSetting) {
      db.collection('users').doc(username).update({
        isAdmin: !currentSetting
      })
    },
    toggleAsteroid(username, currentSetting) {
      db.collection('users').doc(username).update({
        isAsteroid: !currentSetting
      })
    },
    toggleInnerCore(username, currentSetting) {
      db.collection('users').doc(username).update({
        isInnerCore: !currentSetting
      })
    },
    toggleBanned(username, currentSetting) {
      db.collection('users').doc(username).update({
        isBanned: !currentSetting
      })
    },
    toggleWriter(username, currentSetting) {
      db.collection('users').doc(username).update({
        isWriter: !currentSetting
      })
    },
    addStrike(username, currentSetting) {
      db.collection('users').doc(username).update({
        strikes: currentSetting + 1
      }).then(() => {
        if (currentSetting + 1 >= 3) {
				  if (db.collection('users').doc(username).get().then(doc => doc.data().isBanned)) {
						db.collection('users').doc(username).update({ isBanned: true })
					}
				}
      })
    },
    subStrike(username, currentSetting) {
      db.collection('users').doc(username).update({
        strikes: currentSetting - 1
      })
    }
  }
}
</script>

<style scoped>
.v-input--switch {
  margin: 0px 16px 16px 0px !important;
}
</style>
