<template>
  <div>
    <v-card
      :width="app.config.width"
      class="text-center"
      :style="{ backgroundColor: app.config.color }"
    >
      <v-system-bar height="32" :style="{ backgroundColor: app.config.color }">
        <span class="__style-appname">{{ app.name }}</span>
        <v-spacer></v-spacer>
        <v-btn x-small icon @click="minimizeApp()"
          ><v-icon class="mr-0">mdi-minus</v-icon></v-btn
        >
        <v-btn x-small icon @click="closeApp()"
          ><v-icon class="mr-0">mdi-crop-square</v-icon></v-btn
        >
        <v-btn x-small icon @click="closeApp()"
          ><v-icon class="mr-0">mdi-close</v-icon></v-btn
        >
      </v-system-bar>

      <v-container class="pa-0" fluid>
        <v-row>
          <v-col sm="4" class="py-0">
            <v-list
              dense
              nav
              class="text-left"
              height="300"
              style="overflow: scroll"
            >
              <v-list-item-group mandatory v-model="current_contact">
                <v-list-item
                  :value="contact"
                  v-for="(contact, index) in $root.data.apps.Contacts.contacts"
                  :key="index"
                >
                  <v-list-item-title>{{ contact.name }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>

          <v-col sm="8" v-if="current_contact" class="pr-9">
            <v-text-field
              v-model="current_contact.name"
              label="Name"
              @change="$saveData()"
            ></v-text-field>
            <v-text-field
              v-model="current_contact.phone"
              label="Phone Number"
              @change="$saveData()"
            ></v-text-field>
            <v-text-field
              v-model="current_contact.email"
              label="Email Address"
              @change="$saveData()"
            ></v-text-field>
            <v-btn icon color="red" @click="deleteContact()"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
            <p>{{ current_contact.index }}</p>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions
        class="py-0"
        :style="{ backgroundColor: app.config.color }"
      >
        <v-text-field
          @keypress.enter="saveContact()"
          label="New Contact"
          v-model="new_contact"
        ></v-text-field>
        <v-btn icon @click="saveContact()"><v-icon>mdi-plus</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import * as windowManager from "@/scripts/windowManager.js";

export default {
  name: "Contacts",
  props: ["app"],
  data() {
    return {
      new_contact: "",
      current_contact: {},
    };
  },
  methods: {
    saveContact() {
      var data = {
        name: this.new_contact,
      };
      this.$root.data.apps.Contacts.contacts.push(data);
      this.$saveData();
    },
    deleteContact() {
      var current_contact = this.current_contact;
      function findContactIndex(contact) {
        return contact == current_contact;
      }
      var index = this.$root.data.apps.Contacts.contacts.findIndex(
        findContactIndex
      );
      console.log(index);
      this.$root.data.apps.Contacts.contacts.splice(index, 1);
      this.$saveData();
    },
    closeApp() {
      var thisApp = this.app;
      function findAppIndex(app) {
        return app == thisApp;
      }
      var index = windowManager.apps.findIndex(findAppIndex);
      console.log("closing", index);
      windowManager.close(index);
    },
    minimizeApp() {
      var thisApp = this.app;
      function findAppIndex(app) {
        return app == thisApp;
      }
      var index = windowManager.apps.findIndex(findAppIndex);
      console.log("minimizing", index);
      windowManager.minimize(index);
    },
  },
};
</script>

<style scoped>
.v-list {
  background: rgba(161, 147, 111, 0.8) !important;
  border-radius: 0px;
}
</style>