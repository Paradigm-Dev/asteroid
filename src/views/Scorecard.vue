<template>
	<div class="scorecard">
		<div style="text-align: center; margin: 50px 0px;">
			<h1 class="display-3 green--text font-weight-thin text-uppercase">Golf</h1>
			<h6 class="headline yellow--text font-weight-thin mt-3">The Masters</h6>
		</div>
		<v-container>
			<v-data-table :headers="headers" :items="players" hide-actions>
				<template v-slot:items="props">
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }">{{ props.item.current_position }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }">{{ props.item.total }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }"><span class="font-weight-bold">{{ props.item.player_bio.last_name.toUpperCase() }}</span>, {{ props.item.player_bio.first_name }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }">{{ props.item.player_bio.country }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }">{{ props.item.thru }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished, 'red--text': props.item.today < 0, 'green--text': props.item.today > 0, 'white--text': props.item.today == 0, 'font-weight-bold': props.item.today != null }">{{ props.item.today == 0 ? 'E' : props.item.today }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }">{{ props.item.rounds[0].strokes == null ? '--' : props.item.rounds[0].strokes }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }">{{ props.item.rounds[1].strokes == null ? '--' : props.item.rounds[0].strokes }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }">{{ props.item.rounds[2].strokes == null ? '--' : props.item.rounds[0].strokes }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }">{{ props.item.rounds[3].strokes == null ? '--' : props.item.rounds[0].strokes }}</td>
					<td :class="{ 'winner': props.item.current_position == '1' && isFinished }">{{ props.item.total_strokes }}</td>
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
			isFinished: true,
			players: []
    }
	},
	created() {
		axios.get('https://statdata.pgatour.com/r/014/leaderboard-v2.json').then(response => {
			this.leaderboard = response.data.leaderboard
			this.filterPlayers()
		}).catch(error => {
			// handle error
			console.log(error)
		}).then(() => {
			// always executed
		})
	},
	methods: {
		reloadData() {
			axios.get('https://statdata.pgatour.com/r/014/leaderboard-v2.json').then(response => {
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
        if (player.status == 'active') {
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
