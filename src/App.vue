<template>
	<div id="app">
		<car-config :configData="configData"></car-config>
	</div>
</template>

<script>
export default {
	name: 'app',

	data() {
		return {
			configData: {}
		}
	},

	created() {
		/**
		 * Using native Fetch API to get mockup data
		 * We could use polyfill for extended compatibility (IE)
		 * Alternatively we could use axios
		 */
		fetch('./public/data.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			this.configData = data;
		});
	}
}
</script>

<style lang="scss">
	// Importing normalize.css, used by majority of the web
	@import '~normalize.css/normalize.css';
	
	// Car config component is responsive, it's size is derived from html font-size
	html {
		height: 100%;
		font-size: 16px;
	}

	body {
		display: flex;
		flex-grow: 1;
		min-height: 100%;
	}

	#app {
		display: flex;
		flex-grow: 1;
	}
</style>