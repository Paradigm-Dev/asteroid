<template>
  <div>
    <v-container fluid class="pb-0">
      <v-row>
        <v-col sm="12">
          <span v-for="(item, index) in history" :key="index">{{ item }}</span><br>
          <span class="display-1">{{ history[history.length - 1] }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-ripple @click="history = []" sm="3">AC</v-col>
        <v-col v-ripple @click="history.push('+/-')" sm="3">+/-</v-col>
        <v-col v-ripple @click="history.push('%')" sm="3">%</v-col>
        <v-col v-ripple @click="history.push('+')" sm="3">+</v-col>
      </v-row>
      <v-row>
        <v-col v-ripple @click="history.push(7)" sm="3">7</v-col>
        <v-col v-ripple @click="history.push(8)" sm="3">8</v-col>
        <v-col v-ripple @click="history.push(9)" sm="3">9</v-col>
        <v-col v-ripple @click="history.push('-')" sm="3">-</v-col>
      </v-row>
      <v-row>
        <v-col v-ripple @click="history.push(4)" sm="3">4</v-col>
        <v-col v-ripple @click="history.push(5)" sm="3">5</v-col>
        <v-col v-ripple @click="history.push(6)" sm="3">6</v-col>
        <v-col v-ripple @click="history.push('*')" sm="3">*</v-col>
      </v-row>
      <v-row>
        <v-col v-ripple @click="history.push(1)" sm="3">1</v-col>
        <v-col v-ripple @click="history.push(2)" sm="3">2</v-col>
        <v-col v-ripple @click="history.push(3)" sm="3">3</v-col>
        <v-col v-ripple @click="history.push('/')" sm="3">/</v-col>
      </v-row>
      <v-row>
        <v-col v-ripple @click="history.push(0)" sm="6">0</v-col>
        <v-col v-ripple @click="history.push('.')" sm="3">.</v-col>
        <v-col v-ripple @click="history.push('=')" sm="3">=</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      history: []
    }
  }
}
</script>

<style scoped>

</style>