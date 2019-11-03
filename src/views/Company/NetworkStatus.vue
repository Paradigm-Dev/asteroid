<template>
	<div class="network-status">
		<h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin: 50px; text-align: center;">Network Status</h1>
		<div class="detail">
			<p>Main Site: <kbd :class="{ ok: main == true, down: main == false }">{{ main }}</kbd></p>
			<p>Relay: <kbd :class="{ ok: relay == true, down: relay == false }">{{ relay }}</kbd></p>
			<p>Development Server: <kbd :class="{ ok: dev == true, down: dev == false }">{{ dev }}</kbd></p>
			<p>Asteroid: <kbd :class="{ ok: asteroid == true, down: asteroid == false }">{{ asteroid }}</kbd></p>
			<p>Museum: <kbd :class="{ ok: museum == true, down: museum == false }">{{ museum }}</kbd></p>
		</div>
	</div>
</template>

<script>
import { db } from '@/firebase'

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
		db.collection('paradigm').doc('config').get().then(doc => {
			this.main = doc.data().status.main
			this.relay = doc.data().status.relay
			this.dev = doc.data().status.dev
			this.asteroid = doc.data().status.asteroid
			this.museum = doc.data().status.museum
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
