import Vue from 'vue'
import randomString from '@/data/randomString.js'

export var apps = []
export var minimized = []

export function open(app, config) {
  Vue.component(app, require(`@/apps/${app}/App.vue`).default)
  var data = {
    name: app,
    config: config,
    class: randomString(10),
    visible: true
  }
  apps.push(data)
}

export function close(index) {
  apps.splice(index, 1)
}

export function minimize(index) {
  apps[index].visible = false
  minimized.push(apps[index])
}

export function unMinimize(index) {
  apps[index].visible = true
  minimized.splice(index, 1)
}