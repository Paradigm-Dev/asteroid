import Vue from 'vue'
import randomString from '@/data/randomString.js'

export var apps = []

export var open = (app, config) => {
  Vue.component(app, require(`@/apps/${app}/App.vue`).default)
  var data = {
    name: app,
    config: config,
    index: apps.length,
    class: randomString(10)
  }
  apps.push(data)
}

export var close = (index) => {
  apps.splice(index, 1)
}