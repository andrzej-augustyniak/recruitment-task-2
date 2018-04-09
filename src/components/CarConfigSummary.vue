<template>
	<div class="car-config-summary">
		<p v-if="data.model !== null">{{ data.model.name }}</p>
		<p v-if="data.engine !== null">{{ data.engine.name }}</p>
		<p v-if="data.transmission !== null">{{ data.transmission.name }}</p>
		<p v-if="data.color !== null">{{ data.color.name }}</p>
	</div>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				required: true
			}
		},
	}
</script>

<style lang="scss">
	
</style>