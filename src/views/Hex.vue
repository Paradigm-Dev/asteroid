<template>
  <div class="index">
		<v-container>
			<h1 class="display-3 blue--text font-weight-thin text-uppercase" style="margin: 26px 0px 50px 0px; text-align: center;">The Homework Exchange</h1>
			<div class="hex">
				<v-card v-for="(hw, index) in hex" :key="index">
					<v-img :src="hw.preview" v-if="hw.preview"></v-img>

					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">{{ hw.title }}</h3>
							<h4 class="subheading grey--text">{{ hw.date }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ hw.cost }}</h4>
						</div>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text v-html="hw.detail"></v-card-text>
					<v-card-actions>
						<v-btn v-if="hw.available" flat color="accent" :href="hw.link">Buy</v-btn>
						<span v-if="!hw.available" class="red--text font-weight-medium" style="margin: 6px;">UNAVAILABLE</span>
					</v-card-actions>
				</v-card>
			</div>
		</v-container>

  </div>
</template>

<script>
import { db } from './../firebase'

export default {
  name: 'Hex',
  data() {
    return {
			hex: []
    }
  },
  created() {
		this.$root.loadingBar = true
    db.collection('hex').get().then(snapshot => {
      snapshot.forEach(doc => {
				let item = doc.data()
        item.id = doc.id
        this.hex.push(item)
			})
			this.$root.loadingBar = false
		})
	}
}
</script>

<style scoped>
@media screen and (min-width: 1240px) {
	div.hex {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 16px;
		margin-bottom: 32px;
	}
}

@media screen and (max-width: 1240px) {
	div.Hex {
		margin-bottom: 32px;
	}
	div.v-card__text {
		margin-bottom: 30px;
		margin-top: 30px;
		position: relative;
		bottom: 30px;
	}
}

div.v-card {
	margin: 16px auto;
	max-width: 375px;
	width: 400px;
	height: 100%;
}

div.v-card__actions {
	position: absolute;
	bottom: 0px;
	margin-top: 16px;
}
</style>