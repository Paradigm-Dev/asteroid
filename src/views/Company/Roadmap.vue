<template>
  <div class="changelog">
  	<h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin: 50px;">Roadmap</h1>

		<div class="card" v-for="change in roadmap" :key="change.id">
			<v-card>
				<v-card-title primary-title :class="{ 'green--text': change.future, 'blue--text': change.beta }">
					<div>
						<h3 class="headline mb-0">{{ change.title }}</h3>
					</div>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text>
					<ul>
						<li v-for="(list, index) in change.body" :key="index">{{ list }}</li>
					</ul>
				</v-card-text>
			</v-card>
			<div class="gap"></div>
		</div>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  name:'Roadmap',
  data() {
    return {
      roadmap: []
    }
  },
  created() {
    db.collection('changelog').orderBy('order', 'desc').get().then(snapshot => {
      snapshot.forEach(doc => {
        let change = doc.data()
        change.id = doc.id
        this.roadmap.push(change)
      })
    })
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

div.card {
  margin: auto;
  margin-bottom: 20px;
  width: 100%;
	max-width: 500px;
}

div.gap {
	height: 16px;
}

li {
	list-style: none;
	padding-bottom: 10px;
	padding-left: 0;
	margin-left: 0;
	position: relative;
	left: -23px;
}

li:last-of-type {
	padding-bottom: 0;
}
</style>
