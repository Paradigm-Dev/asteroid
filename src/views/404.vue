<template>
	<div class="404">
		<div style="text-align: center;">
			<v-icon style="font-size: 75px; margin-top: 100px;" color="deep-purple darken-3">:/</v-icon>
			<h1 class="display-3 deep-purple--text darken-3 font-weight-thin text-uppercase" style="margin: 25px 0px 25px 0px;">Aw, snap.</h1>
			<h3 class="headline font-weight-light" style="margin: 25px;">The requested resource was not found on the server.</h3>
			<v-btn @click="$root.switch = 'Home'" color="deep-purple">Go Home</v-btn>
    </div>
	</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
