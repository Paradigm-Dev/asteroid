<template>
  <div class="notice" style="text-align: center;">
    <h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin: 50px 0px;">NOTICE</h1>
    <v-divider></v-divider><br>
    <h2 class="display-1 font-weight-regular pa-2">There is no guarantee that ...</h2>
    <h2 class="headline font-weight-light">... this software will work.</h2>
    <h2 class="headline font-weight-light">... your data will be fully protected at all times.</h2>
    <h2 class="headline font-weight-light">... this software will be fully released.</h2>
    <h2 class="headline font-weight-light">... customer service will be available.</h2>
    <br><v-divider></v-divider><br>
    <h2 class="display-1 font-weight-regular pa-2">We reserve the right to ...</h2>
    <h2 class="headline font-weight-light">... terminate your account.</h2>
    <h2 class="headline font-weight-light">... search and seize any account, without cause, at any time.</h2>
    <h2 class="headline font-weight-light">... refuse account creation.</h2>
    <h2 class="headline font-weight-light">... block or censor sent messages.</h2>
    <br><v-divider></v-divider><br>
    <h2 class="display-1 font-weight-regular pa-2">Be sure to ...</h2>
    <h2 class="headline font-weight-light">... not use your real name as a username.</h2>
    <h2 class="headline font-weight-light">... read the terms and conditions.</h2>
    <h2 class="headline font-weight-light">... report bugs to the development team.</h2>
    <h2 class="headline font-weight-light">... be aware of what you are sending.</h2>
    <br><v-divider></v-divider><br>
		<h2 class="display-1 font-weight-medium red--text">Failure to accept will result in account termination.</h2>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data() {
    return {

    }
  }
}
</script>

<style scoped>
div.notice {
	text-align: center;
}
</style>
