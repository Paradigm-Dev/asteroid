import Vue from "vue";
import randomString from "@/data/randomString.js";

export let apps = [];
export let minimized = [];

export function open(app, config) {
  Vue.component(app, require(`@/apps/${app}/App.vue`).default);
  let data = {
    name: app,
    config: config,
    class: randomString(10),
    visible: true,
    icon: `@/apps/${app}/icon.png`
  };
  apps.push(data);
}

export function close(index) {
  apps.splice(index, 1);
}

export function minimize(index) {
  apps[index].visible = false;
  minimized.push(apps[index]);
}

export function unMinimize(index) {
  apps[index].visible = true;
  minimized.splice(index, 1);
}
