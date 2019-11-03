<template>
  <div class="inquiry">
    <v-container>
      <div v-if="$root.isAnalytics">
        <div v-for="event in events" :key="event.id">
          <v-expansion-panel>
            <v-expansion-panel-content v-if="event.type == 'event'" class="blue-grey darken-2">
              <div slot="header">
                <h3 class="headline mb-0 text-uppercase font-weight-medium" :style="{ 'color': event.color }">{{ event.user }}</h3>
                <h4 class="subheading">{{ event.event }}</h4>
              </div>
              <v-card>
                <v-card-text>at {{ event.timestamp }} on {{ event.location }}</v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content v-if="event.type == 'error'" class="red accent-4">
              <div slot="header">
                <h3 class="headline mb-0 text-uppercase font-weight-medium" :style="{ 'color': event.color }">{{ event.user }}</h3>
                <h4 class="subheading">{{ event.error }}</h4>
              </div>
              <v-card>
                <v-card-text>at {{ event.timestamp }} on {{ event.location }}</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </div>
      </div>
    </v-container>

    <div style="text-align: center; margin: 50px 0px;" v-if="!$root.isAnalytics">
			<h1 class="display-3 red--text font-weight-thin text-uppercase">Unavailable</h1>
			<h6 class="headline white--text font-weight-thin mt-3">Please navigate away from this page.</h6>
		</div>

  </div>
</template>

<script>
import { db } from './../../firebase'
import moment from 'moment'


export default {
  name: 'Inquiry',
  data() {
    return {
      events: []
    }
  },
  created() {
    var inquiryRef = db.collection('analytics').orderBy('timestamp', 'desc').limit(50)
    inquiryRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.doc.data().type == 'event') {
          if(change.type === "added") {
            let doc = change.doc
            this.events.splice(change.newIndex, 0, {
              user: doc.data().user,
              event: doc.data().event,
              location: doc.data().location,
              timestamp: moment(doc.data().timestamp).format('lll'),
              type: doc.data().type,
              color: doc.data().color
            })
          }
          if(change.type === "removed") {
            let doc = change.doc
            this.events.splice(change.oldIndex, 1)
          }
          if(change.type === "modified") {
            let doc = change.doc
            this.events.splice(change.oldIndex, 1, {
              user: doc.data().user,
              event: doc.data().event,
              location: doc.data().location,
              timestamp: moment(doc.data().timestamp).format('lll'),
              type: doc.data().type,
              color: doc.data().color
            })
          }
        }

        if (change.doc.data().type == 'error') {
          if(change.type === "added") {
            let doc = change.doc
            this.events.splice(change.newIndex, 0, {
              user: doc.data().user,
              error: doc.data().error,
              location: doc.data().location,
              timestamp: moment(doc.data().timestamp).format('lll'),
              type: doc.data().type,
              color: doc.data().color,
              fileLocation: doc.data().fileLocation
            })
            var container = document.querySelector('.inquiry')
            container.scrollTop = container.scrollHeight
          }
          if(change.type === "removed") {
            let doc = change.doc
            this.events.splice(change.oldIndex, 1)
          }
          if(change.type === "modified") {
            let doc = change.doc
            this.events.splice(change.oldIndex, 1, {
              user: doc.data().user,
              error: doc.data().error,
              location: doc.data().location,
              timestamp: moment(doc.data().timestamp).format('lll'),
              type: doc.data().type,
              color: doc.data().color,
              fileLocation: doc.data().fileLocation
            })
          }
        }

        if (change.doc.data().type == 'route') {

        }
      })
    })
  }
}
</script>

<style scoped>

</style>
