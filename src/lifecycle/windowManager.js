import Vue from 'vue'
import randomString from '@/data/randomString.js'

export var apps = []
export var minimized = []

export var open = (app, config) => {
  Vue.component(app, require(`@/apps/${app}/App.vue`).default)
  var data = {
    name: app,
    config: config,
    index: apps.length,
    class: randomString(10),
    visible: true
  }
  apps.push(data)
}

export var close = (index) => {
  apps.splice(index, 1)
}

export var minimize = (index) => {
  apps[index].visibile = false
  minimized.push(apps[index])
}