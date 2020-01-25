import Vue from 'vue'

export var apps = []

export var open = (app, config) => {
  Vue.component(app, require(`@/apps/${app}/App.vue`).default)
  apps.push({
    name: app,
    config: config,
    index: apps.length
  })
}
