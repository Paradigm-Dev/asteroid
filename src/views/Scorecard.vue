<template>
	<div class="scorecard">
		<div style="text-align: center; margin: 50px 0px;">
			<h1 class="display-3 green--text font-weight-thin text-uppercase">Golf</h1>
			<h6 class="headline yellow--text font-weight-thin mt-3">The Masters</h6>
			<p class="grey--text font-weight-light mt-3">Last updated: {{ timestamp }}</p>
			<v-btn color="grey" flat icon @click="reloadData()" class="mt-3"><v-icon>refresh</v-icon></v-btn>
		</div>
		<v-container>
			<v-data-table :headers="headers" :items="filteredPlayers" hide-actions>
				<template v-slot:items="props">
					<td>{{ props.item.current_position }}</td>
					<td>{{ props.item.total }}</td>
					<td><span class="font-weight-bold">{{ props.item.player_bio.last_name.toUpperCase() }}</span>, {{ props.item.player_bio.first_name }}</td>
					<td>{{ props.item.player_bio.country }}</td>
					<td>{{ props.item.thru }}</td>
					<td :class="{ 'red--text': props.item.today < 0, 'green--text': props.item.today > 0, 'white--text': props.item.today == 0, 'font-weight-bold': props.item.today != null }">{{ props.item.today == 0 ? 'E' : props.item.today }}</td>
					<td>{{ props.item.rounds[0].strokes == null ? '--' : props.item.rounds[0].strokes }}</td>
					<td>{{ props.item.rounds[1].strokes == null ? '--' : props.item.rounds[0].strokes }}</td>
					<td>{{ props.item.rounds[2].strokes == null ? '--' : props.item.rounds[0].strokes }}</td>
					<td>{{ props.item.rounds[3].strokes == null ? '--' : props.item.rounds[0].strokes }}</td>
					<td>{{ props.item.total_strokes }}</td>
				</template>
			</v-data-table>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
			app: 'Scorecard',
			leaderboard: null,
			headers: [
				{ text: 'Pos', value: 'current_position', sortable: false, width: '10' },
				{ text: 'Par', value: 'total', width: '15' },
				{ text: 'Player', value: 'player_bio.last_name' },
				{ text: 'Nat', value: 'player_bio.country', width: '10' },
				{ text: 'On', value: 'thru', width: '10' },
				{ text: 'Cur', value: 'today', width: '10' },
				{ text: 'R1', value: 'rounds[0].strokes', width: '10' },
				{ text: 'R2', value: 'rounds[1].strokes', width: '10' },
				{ text: 'R3', value: 'rounds[2].strokes', width: '10' },
				{ text: 'R4', value: 'rounds[3].strokes', width: '10' },
				{ text: 'Strokes', value: 'total_strokes', width: '15' }
			],
			timestamp: ''
    }
	},
	created() {
		axios.get('https://statdata.pgatour.com/r/014/leaderboard-v2.json').then(response => {
			this.timestamp = moment(response.data.last_updated).format('MMMM Do, YYYY, h:mm a')
			this.leaderboard = response.data.leaderboard
		}).catch(error => {
			// handle error
			console.log(error)
		}).then(() => {
			// always executed
		})
	},
	computed: {
		filteredPlayers() {
			return this.leaderboard.players.filter(player => {
        return player.status === 'active'
      })
		}
	},
	methods: {
		reloadData() {
			axios.get('http://statdata.pgatour.com/r/014/leaderboard-v2.json').then(response => {
				this.timestamp = moment(response.data.last_updated).format('MMMM Do, YYYY, h:mm a')
				this.leaderboard = response.data.leaderboard
			}).catch(error => {
				// handle error
				console.log(error)
			}).then(() => {
				// always executed
			})
		}
	}
}
</script>

<style scoped>

</style>
