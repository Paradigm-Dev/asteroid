<template>
  <div class="support">
		<h1 class="display-3 red--text font-weight-thin text-uppercase" style="margin: 50px; text-align: center;">Support</h1>
		<v-card>
			<form action="mailto:paradigmdevelop@gmail.com" method="post" enctype="text/plain">

				<v-card-text>
					<v-text-field type="text" name="Name" label="Name"></v-text-field>
					<v-text-field type="email" name="Email" label="Email"></v-text-field>
					<v-textarea name="Comment" label="Comment"></v-textarea>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn type="submit" color="error">Send</v-btn>
					<v-btn type="reset" color="info">Reset</v-btn>
				</v-card-actions>

			</form>
		</v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
div.v-card {
	width: 100%;
	max-width: 500px;
	margin: 16px auto;
}
</style>
