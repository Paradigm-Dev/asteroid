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

      <v-list v-if="$root.data.apps.Todo.todo.length > 0">
        <v-list-item
          v-for="(item, index) in $root.data.apps.Todo.todo"
          :key="index"
        >
          <v-checkbox
            @dblclick="deleteItem(index)"
            dense
            class="ma-0"
            :label="item.title"
            v-model="item.done"
          ></v-checkbox>
        </v-list-item>
      </v-list>

      <div v-else class="pa-5">No todo items</div>

      <v-card-actions
        class="py-0"
        :style="{ backgroundColor: app.config.color }"
      >
        <v-text-field
          @keypress.enter="saveItem()"
          label="New Item"
          v-model="new_item"
        ></v-text-field>
        <v-btn icon @click="saveItem()"><v-icon>mdi-plus</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import * as windowManager from "@/scripts/windowManager.js";

export default {
  name: "Todo",
  props: ["app"],
  data() {
    return {
      new_item: "",
    };
  },
  methods: {
    saveItem() {
      var data = {
        title: this.new_item,
        done: false,
      };
      this.$root.data.apps.Todo.todo.push(data);
      this.$saveData();
      this.new_item = "";
    },
    deleteItem(index) {
      this.$root.data.apps.Todo.todo.splice(index, 1);
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
  background: none !important;
}

.v-messages {
  display: none;
}
</style>