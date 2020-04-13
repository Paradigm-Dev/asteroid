<template>
  <div class="login index">
    <div class="accounts">
      <h1 class="display-1">Welcome!</h1>
      <p class="title font-weight-light">Login in to continue</p>

      <v-card width="400" class="window text-center mt-8" style="background: rgba(20, 35, 90, .8)">
        <v-card-text class="text-left pb-0 mb-0">
          <v-text-field v-model="username" label="Username"></v-text-field>
          <v-text-field @keypress.enter="signIn()" type="password" v-model="password" label="Password"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!password" text color="white" @click="signIn()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import Moveable from 'moveable'

import dataTemplate from '@/data/dataTemplate.js'
import { db, auth } from '@/firebase.js'

export default {
  name: 'Login',
  data() {
    return {
      password_popup: false,
      password: '',
      username: ''
    }
  },
  methods: {
    quit() {
      this.$root.data.setup_completed = true
      this.$saveData()
      console.log('Done with setup')
    },
    refreshMoveable() {
      const moveable = new Moveable(document.body, {
        target: document.querySelector('.window'),
        draggable: true,
        throttleDrag: 0,
        renderDirections: [],
        className: 'd-none',
        origin: false
      })
      const frame = { translate: [0, 0] }
      moveable.on("dragStart", ({ set }) => {
        set(frame.translate)
      }).on("drag", ({ target, beforeTranslate }) => {
        frame.translate = beforeTranslate;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
      }).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {})
    },
    signIn() {
      auth.signInWithEmailAndPassword(`${this.username}@theparadigmdev.com`, this.password).then(() => {
        db.collection('users').doc(this.username).get().then(doc => {
          this.$root.user = doc.data()
          if (doc.data().asteroid.setup === true) {
            this.$root.data = doc.data().asteroid
          } else {
            db.collection('users').doc(this.username).update({
              asteroid: dataTemplate
            })
            this.$root.data = dataTemplate
          }
          this.$root.data.username = this.username
        })
      }).catch(error => {
        console.error(error)
      })
    }
  },
  mounted() {
    this.refreshMoveable()
  }
}
</script>

<style>
.d-none {
  display: none !important;
}

.accounts {
  text-align: center;
  margin: 100px auto 0px auto;
  width: 400px;
}
</style>