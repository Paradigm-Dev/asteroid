<template>
  <div class="login index">
    <div class="accounts">
      <h1 class="display-1">Welcome!</h1>
      <p class="title font-weight-light">Click on your user</p>
      <v-item-group v-model="user">
        <v-item :value="user.username" v-for="(user, index) in $root.data.users" :key="index" v-slot:default="{ active, toggle }">
          <v-card @click="toggle" class="mb-6" style="background: rgba(132, 0, 187, .8)">
            <v-container fluid class="py-0">
              <v-row>
                <v-col sm="2" class="pa-0 ma-0">
                  <v-img style="border-radius: 10px;" :src="user.img"></v-img>
                </v-col>
                <v-col sm="9">
                  <h1 class="text-left pl-2 headline font-weight-medium text-uppercase" style="padding-top: 2px;" :style="{ color: user.color }">{{ user.username }}</h1>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-item>

        <v-item value="" v-slot:default="{ active, toggle }">
          <v-card @click="toggle" style="background: rgba(132, 0, 187, .8); height: 58.38px;">
            <h1 class="headline pt-3">Other user</h1>
          </v-card>
        </v-item>
      </v-item-group>
    </div>

    <v-fade-transition>
      <v-card v-if="user" width="400" class="window text-center" style="background: rgba(0, 81, 187, .8)">
        <v-card-text class="text-left pb-0 mb-0">
          <v-text-field v-model="user" label="Username"></v-text-field>
          <v-text-field type="password" v-model="password" label="Password"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn text color="grey" @click="user = ''">Cancel</v-btn>
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
      password: '',
      user: ''
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