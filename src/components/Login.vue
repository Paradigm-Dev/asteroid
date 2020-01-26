<template>
  <div class="login index">
    <div class="accounts">
      <h1 class="title">Welcome</h1>
      <p class="font-weight-light">Click on your user</p>
      <v-card v-for="(user, index) in $root.data.users" :key="index" @click="password_popup = true" style="background: rgba(132, 0, 187, .8)">
        <v-container fluid>
          <v-row>
            <v-col sm="3">
              <v-img :src="user.img"></v-img>
            </v-col>
            <v-col sm="9">
              <h1 class="display-1">{{ user.username }}</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card @click="password_popup = true" style="background: rgba(132, 0, 187, .8)">
        <v-card-text class="white--text">
          <h1 class="display-1">Other user</h1>
        </v-card-text>
      </v-card>
    </div>

    <v-fade-transition>
      <v-card v-if="password_popup" width="400" class="window text-center" style="background: rgba(0, 81, 187, .8)">
        <v-card-text class="text-left pb-0 mb-0">
          <h1 class="display-1">Aidan Liddy</h1>
          <span class="title font-weight-light">aidanliddy</span>
          <v-text-field type="password" v-model="password" label="Password"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn text color="grey" @click="password_popup = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="password !== $root.data.password" text color="green" @click="$root.logged_in = true">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-fade-transition>
  </div>
</template>

<script>
import Moveable from 'moveable'

export default {
  name: 'Login',
  data() {
    return {
      password_popup: false,
      password: ''
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
  width: 350px;
}
</style>