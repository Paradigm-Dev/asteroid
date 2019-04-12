<template>
  <div class="debate">
		<h1 class="display-3 blue--text font-weight-thin text-uppercase text-xs-center" style="margin: 50px 0px;">Debate</h1>

    <v-card max-width="500" style="margin: auto;">
      <v-card-title primary-title>
				<div>
					<h3 class="headline mb-0">{{ debateTitle }}</h3>
					<h4 class="subheading grey--text">{{ debateTime }}</h4>
				</div>
      </v-card-title>
      <v-card-text>
        <p v-for="(item, i) in text" :key="i" v-html="item"></p>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn flat color="accent">Join</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import db from './../firestore'

export default {
  name: 'Debate',
  data() {
    return {
      debateTitle: '',
      debateTime: '',
      text: []
    }
  },
  created() {
    var debateRef = db.collection('debate')
    debateRef.doc('details').get().then(doc => {
      this.debateTitle = doc.data().title
      this.debateTime = doc.data().time
      this.text = doc.data().text
    })

    debateRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type === "modified") {
          let doc = change.doc
          this.debateTitle = doc.data().title
          this.debateTime = doc.data().time
          this.text = doc.data().text
        }
      })
    })
  }
}
</script>

<style scoped>

</style>
