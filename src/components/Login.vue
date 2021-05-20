<template>
  <div class="login index">
    <div class="accounts">
      <h1 class="display-1">Welcome!</h1>
      <p class="title font-weight-light">Sign in to continue</p>

      <v-card
        width="400"
        class="window text-center mt-8"
        style="background: rgba(20, 35, 90, 0.8)"
      >
        <v-card-text class="text-left pb-0 mb-0">
          <v-text-field
            v-model="username"
            label="Username"
            hide-details
            class="mb-4"
          ></v-text-field>
          <v-text-field
            @keypress.enter="signIn()"
            type="password"
            v-model="password"
            label="Password"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!password" text color="white" @click="signIn()"
            >Sign in</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import Moveable from "moveable";

import dataTemplate from "@/data/dataTemplate.js";
// import { db, auth } from '@/firebase.js'

export default {
  name: "Login",
  data() {
    return {
      password_popup: false,
      password: "",
      username: "",
    };
  },
  methods: {
    quit() {
      this.$root.data.setup_completed = true;
      this.$saveData();
      console.log("Done with setup");
    },
    refreshMoveable() {
      const moveable = new Moveable(document.body, {
        target: document.querySelector(".window"),
        draggable: true,
        throttleDrag: 0,
        renderDirections: [],
        className: "d-none",
        origin: false,
      });
      const frame = { translate: [0, 0] };
      moveable
        .on("dragStart", ({ set }) => {
          set(frame.translate);
        })
        .on("drag", ({ target, beforeTranslate }) => {
          frame.translate = beforeTranslate;
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        })
        .on("dragEnd", ({ target, isDrag, clientX, clientY }) => {});
    },
    signIn() {
      this.$http
        .post("https://www.theparadigmdev.com/api/authentication/signin", {
          username: this.username.toLowerCase(),
          password: this.password,
          sticky: false,
        })
        .then((response) => {
          console.log(response.data.user);
          this.$root.user = response.data.user;
          if (response.data.user.asteroid.setup === true) {
            this.$root.data = response.data.user.asteroid;
          } else {
            this.$http.post(
              `https://www.theparadigmdev.com/api/asteroid/${response.data.user._id}`,
              dataTemplate
            );
            this.$root.data = dataTemplate;
          }
          this.$root.data.username = this.username;
        });
    },
  },
  mounted() {
    this.refreshMoveable();
  },
};
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