<template>
	<div class="blank">
		<h1 class="display-3 blue--text font-weight-thin text-uppercase">{{ app }} is Not Ready Yet</h1>
		<v-divider style="width: 750px; margin: auto; padding: 25px;"></v-divider>
		<h4 class="display-1">{{ message }}</h4>
	</div>
</template>

<script>
export default {
	name: 'BlankSpace',
	data() {
		return {

		}
	},
	props: ['app', 'message']
}
</script>

<style>
.blank {
	margin: 50px auto;
	text-align: center;
}

.blank * {
	padding-bottom: 25px;
}
</style>
