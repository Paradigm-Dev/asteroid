<template>
	<div class="network-status">
		<h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin: 50px; text-align: center;">Network Status</h1>
		<div class="detail">
			<p>Main Site: <kbd :class="{ ok: main == 'OK', down: main == 'Down', maintenence: main == 'Maintenence' }">{{ main }}</kbd></p>
			<p>Relay: <kbd :class="{ ok: relay == 'OK', down: relay == 'Down', maintenence: relay == 'Maintenence' }">{{ relay }}</kbd></p>
			<p>Development Server: <kbd :class="{ ok: dev == 'OK', down: dev == 'Down', maintenence: dev == 'Maintenence' }">{{ dev }}</kbd></p>
			<p>Asteroid: <kbd :class="{ ok: asteroid == 'OK', down: asteroid == 'Down', maintenence: asteroid == 'Maintenence' }">{{ asteroid }}</kbd></p>
			<p>Museum: <kbd :class="{ ok: museum == 'OK', down: museum == 'Down', maintenence: museum == 'Maintenence' }">{{ museum }}</kbd></p>
		</div>
	</div>
</template>

<script>
import db from './../../firestore'

export default {
	name: 'NetworkStatus',
	data() {
		return {
			main: '',
			relay: '',
			dev: '',
			asteroid: '',
			museum: ''
		}
	},
	created() {
		db.collection('meta').doc('status').get().then((doc) => {
			this.main = doc.data().main
			this.relay = doc.data().relay
			this.dev = doc.data().dev
			this.asteroid = doc.data().asteroid
			this.museum = doc.data().museum
		})
	}
}
</script>

<style scoped>
div.detail {
	width: 350px;
	margin: auto;
}

p {
	font-size: 20px;
	padding: 0;
	margin: 0;
}

.ok {
	color: #4CAF50;
	font-size: 25px;
	font-weight: bold;
}

.down {
	color: #F44336;
	font-size: 25px;
	font-weight: bold;
}

.maintenence {
	color: #FF9800;
	font-size: 25px;
	font-weight: bold;
}

kbd {
	margin: 5px;
}
</style>
