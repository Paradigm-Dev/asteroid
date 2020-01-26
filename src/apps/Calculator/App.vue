<template>
  <div>
    <v-card :width="app.config.width" class="text-center" :style="{ backgroundColor: app.config.color }">
      <v-system-bar height="32" :style="{ backgroundColor: app.config.color }">
        <span class="__style-appname">{{ app.name }}</span>
        <v-spacer></v-spacer>
        <v-btn x-small icon @click="minimizeApp()"><v-icon>mdi-minus</v-icon></v-btn>
        <v-btn x-small icon @click="closeApp()"><v-icon>mdi-crop-square</v-icon></v-btn>
        <v-btn x-small icon @click="closeApp()"><v-icon>mdi-close</v-icon></v-btn>
      </v-system-bar>

      <v-container fluid class="pb-0">
        <v-row>
          <v-col sm="12">
            <span v-for="(item, index) in history" :key="index">{{ item }}</span><br>
            <span class="display-1">{{ current }}</span>
            <span>{{ answer }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-ripple @click="ac()" sm="3">AC</v-col>
          <v-col v-ripple @click="history.push('+/-')" sm="3">+/-</v-col>
          <v-col v-ripple @click="history.push('%')" sm="3">%</v-col>
          <v-col v-ripple @click="add()" sm="3">+</v-col>
        </v-row>
        <v-row>
          <v-col v-ripple @click="current += '7'" sm="3">7</v-col>
          <v-col v-ripple @click="current += '8'" sm="3">8</v-col>
          <v-col v-ripple @click="current += '9'" sm="3">9</v-col>
          <v-col v-ripple @click="sub()" sm="3">-</v-col>
        </v-row>
        <v-row>
          <v-col v-ripple @click="current += '4'" sm="3">4</v-col>
          <v-col v-ripple @click="current += '5'" sm="3">5</v-col>
          <v-col v-ripple @click="current += '6'" sm="3">6</v-col>
          <v-col v-ripple @click="mult()" sm="3">*</v-col>
        </v-row>
        <v-row>
          <v-col v-ripple @click="current += '1'" sm="3">1</v-col>
          <v-col v-ripple @click="current += '2'" sm="3">2</v-col>
          <v-col v-ripple @click="current += '3'" sm="3">3</v-col>
          <v-col v-ripple @click="div()" sm="3">/</v-col>
        </v-row>
        <v-row>
          <v-col v-ripple @click="current += '0'" sm="6">0</v-col>
          <v-col v-ripple @click="current += '.'" sm="3">.</v-col>
          <v-col v-ripple @click="solve()" sm="3">=</v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import * as windowManager from '@/lifecycle/windowManager.js'

export default {
  name: 'Calculator',
  props: [ 'app' ],
  data() {
    return {
      history: [],
      previous: '0',
      current: '',
      answer: ''
    }
  },
  methods: {
    ac() {
      this.history = []
      this.previous = '0'
      this.current = ''
      this.answer = ''
    },
    add() {
      this.history.push(this.current, '+')
      this.answer = parseInt(this.previous) + parseInt(this.current)
      this.previous = this.current
      this.current = ''
    },
    sub() {
      this.history.push(this.current, '-')
      this.answer = parseInt(this.previous) - parseInt(this.current)
      this.previous = this.current
      this.current = ''
    },
    mult() {
      this.history.push(this.current, '*')
      this.answer = parseInt(this.previous) * parseInt(this.current)
      this.previous = this.current
      this.current = ''
    },
    div() {
      this.history.push(this.current, '/')
      this.answer = parseInt(this.previous) / parseInt(this.current)
      this.previous = this.current
      this.current = ''
    },
    solve() {
      this.history.push(this.current, '=')
      this.answer = parseInt(this.previous) / parseInt(this.current)
      this.current = this.answer
      this.answer = ''
    },
    closeApp() {
      var thisApp = this.app
      function findAppIndex(app) {
        return app == thisApp
      }
      var index = windowManager.apps.findIndex(findAppIndex)
      console.log('closing', index)
      windowManager.close(index)
    },
    minimizeApp() {
      var thisApp = this.app
      function findAppIndex(app) {
        return app == thisApp
      }
      var index = windowManager.apps.findIndex(findAppIndex)
      console.log('minimizing', index)
      windowManager.minimize(index)
    }
  }
}
</script>

<style scoped>

</style>