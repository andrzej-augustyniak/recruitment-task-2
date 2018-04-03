<template>
	<div class="cc-container" v-cloak>
		<h1 class="title">Car configurator</h1>

		<car-config-model :items="configData.models" />

		<car-config-engine :items="configData.engines" />

		<car-config-transmission :items="configData.transmissions" />

		<car-config-color :items="configData.colors" />

		<car-config-summary :data="selection" />
	</div>
</template>

<script>
import CarConfigSummary from './CarConfigSummary.vue';
import CarConfigModel from './CarConfigModel.vue';
import CarConfigEngine from './CarConfigEngine.vue';
import CarConfigTransmission from './CarConfigTransmission.vue';
import CarConfigColor from './CarConfigColor.vue';

export default {
	props: {
		configData: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			selection: {
				model: null,
				engine: null,
				transmission: null,
				color: null
			}
		};
	},

	components: {
		CarConfigSummary, CarConfigModel, CarConfigEngine, CarConfigTransmission, CarConfigColor
	},

	watch: {
		profileData: function() {
			this.data = this.configData;
		}
	},

	created() {
		Event.$on('select.model', (id) => {
			if(id !== null) {
				this.selection.model = this.configData.models.find( (item) => { return item.id === id; } );
			} else {
				this.selection.model = null;
			}
		});

		Event.$on('select.engine', (id) => {
			if(id !== null) {
				this.selection.engine = this.configData.engines.find( (item) => { return item.id === id; } );
			} else {
				this.selection.engine = null;
			}
		});

		Event.$on('select.transmission', (id) => {
			if(id !== null) {
				this.selection.transmission = this.configData.transmissions.find( (item) => { return item.id === id; } );
			} else {
				this.selection.transmission = null;
			}
		});

		Event.$on('select.color', (id) => {
			if(id !== null) {
				this.selection.color = this.configData.colors.find( (item) => { return item.id === id; } );
			} else {
				this.selection.color = null;
			}
		});
	}
}
</script>

<style lang="scss">
/**
 * Let's import Montserrat font for use in our component.
 * This should be removed if the font is available globally
 */
@import url('https://fonts.googleapis.com/css?family=Roboto:400,400i,500&subset=latin-ext');

@import '../assets/scss/_variables.scss';

.cc-container {
	display: flex;
	flex-grow: 1;
	flex-direction: column;

	background-color: $background-color;
	color: $text-color;
}

a {
	color: inherit;
}

.is-disabled {
	color: $text-color-muted;
	pointer-events: none;
}

.is-active {
	color: $primary-color;
}

</style>