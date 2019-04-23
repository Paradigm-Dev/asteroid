<template>
	<div class="scorecard">
		<div style="text-align: center; margin: 50px 0px;">
			<h1 class="display-3 green--text font-weight-thin text-uppercase">Golf</h1>
			<h6 class="headline yellow--text font-weight-thin mt-3">{{ tournament_name }}</h6>
			<p class="grey--text font-weight-light mt-3">Last updated: {{ timestamp }}</p>
			<v-btn color="grey" flat icon @click="reloadData()" class="mt-3"><v-icon>refresh</v-icon></v-btn>
		</div>
		<v-container>
			<v-data-table :headers="headers" :items="players" hide-actions>
				<template v-slot:items="props">
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1' }">{{ props.item.current_position }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1' }">{{ props.item.total }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1', 'blue--text': props.item.player_bio.is_amateur == true }"><span class="font-weight-bold">{{ props.item.player_bio.last_name.toUpperCase() }}</span>, {{ props.item.player_bio.first_name }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1' }">{{ props.item.player_bio.country }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1' }">{{ props.item.thru }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1', 'red--text': props.item.today < 0, 'green--text': props.item.today > 0, 'white--text': props.item.today == 0, 'font-weight-bold': props.item.today != null }">{{ props.item.today == 0 ? 'E' : props.item.today }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1' }">{{ props.item.rounds[0].strokes == null ? '—' : props.item.rounds[0].strokes }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1' }">{{ props.item.rounds[1].strokes == null ? '—' : props.item.rounds[0].strokes }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1' }">{{ props.item.rounds[2].strokes == null ? '—' : props.item.rounds[0].strokes }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1' }">{{ props.item.rounds[3].strokes == null ? '—' : props.item.rounds[0].strokes }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' || props.item.current_position == 'T1' }">{{ props.item.total_strokes }}</td>
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
			tournament_name: '',
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
			players: [],
			timestamp: '',
			tid: ''
    }
	},
	created() {
		axios.get('https://statdata.pgatour.com/r/current/message.json').then(response => {
			this.tid = response.data.tid
		}).catch(error => {

		}).then(() => {
			axios.get(`https://statdata.pgatour.com/r/${this.tid}/leaderboard-v2.json`).then(response => {
				this.timestamp = moment(response.data.last_updated).format('MMMM Do, YYYY, h:mm a')
				this.tournament_name = response.data.leaderboard.tournament_name
				this.leaderboard = response.data.leaderboard
				this.filterPlayers()
			}).catch(error => {
				// handle error
				console.log(error)
			}).then(() => {
				// always executed
			})
		})
	},
	methods: {
		reloadData() {
			axios.get(`https://statdata.pgatour.com/r/${this.tid}/leaderboard-v2.json`).then(response => {
				this.timestamp = moment(response.data.last_updated).format('MMMM Do, YYYY, h:mm a')
				this.leaderboard = response.data.leaderboard
			}).catch(error => {
				// handle error
				console.log(error)
			}).then(() => {
				// always executed
			})
		},
		filterPlayers() {
			this.leaderboard.players.filter(player => {
        if (player.status == 'active' && player.thru != null) {
					this.players.push(player)
				}
			})
		}
	}
}
</script>

<style scoped>
.winner {
	color: #bf9b30;
}
</style>
