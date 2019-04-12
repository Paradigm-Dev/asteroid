<template>
	<div class="asteroid">
		<div v-if="$root.isAsteroid">
			<h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin: 50px; text-align: center;">Asteroid</h1>
			<v-card>
				<v-card-title primary-title>
					<div>
						<h3 class="headline mb-0">Windows</h3>
					</div>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text>The Paradigm installer for Windows.</v-card-text>
				<v-card-actions>
					<v-btn v-if="winavail" flat color="accent" :href="windows" download>Download</v-btn>
					<span v-if="!winavail" class="red--text font-weight-medium" style="margin: 6px;">UNAVAILABLE</span>
				</v-card-actions>
			</v-card>

			<v-card>
				<v-card-title primary-title>
					<div>
						<h3 class="headline mb-0">macOS</h3>
					</div>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text>The Paradigm installer for macOS.</v-card-text>
				<v-card-actions>
					<v-btn v-if="macavail" flat color="accent" :href="macos" download>Download</v-btn>
					<span v-if="!macavail" class="red--text font-weight-medium" style="margin: 6px;">UNAVAILABLE</span>
				</v-card-actions>
			</v-card>
		</div>

		<div style="text-align: center; margin: 50px 0px;" v-if="!$root.isAsteroid">
			<h1 class="display-3 red--text font-weight-thin text-uppercase">Unavailable</h1>
			<h6 class="headline white--text font-weight-thin mt-3">Please navigate away from this page.</h6>
		</div>
	</div>
</template>

<script>
import db from './../firestore'

export default {
	name: 'Asteroid',
	data() {
		return {
			windows: '',
			macos: '',
			winavail: null,
			macavail: null
		}
	},
	created() {
		db.collection('meta').doc('electron').get().then((doc) => {
			this.windows = doc.data().windows
			this.macos = doc.data().macos
			this.winavail = doc.data().winavail
			this.macavail = doc.data().macavail
		})
	}
}
</script>

<style scoped>
.v-card {
	width: 100%;
	max-width: 500px;
	margin: 16px auto;
}
</style>
