<template>
	<div class="satellite">
		<v-text-field label="Web Address" v-model="input"></v-text-field>
		<!-- <v-btn text icon @click="changeURL()"><v-icon>send</v-icon></v-btn> -->
		<iframe id="satellite-embed" crossorigin="anonymous" :src="input"></iframe>
	</div>
</template>

<script>
export default {
	name: 'Satellite',
	data() {
		return {
			proxy: 'https://cors.io/?',
			input: 'https://www.bing.com/',
			output: 'https://cors.io/?https://www.google.com/'
		}
	},
	methods: {
		changeURL() {
			this.output = this.proxy + this.input
		}
	}
}
</script>

<style scoped>
div.satellite {
	height: 100%;
	width: 100%;
	margin: 16px !important;
}

iframe {
	height: calc(100vh - 202.5px);
	width: 100%;
}
</style>
