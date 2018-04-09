<template>
	<div class="car-config" v-cloak>
		<div class="car-config-wrapper">

			<!-- HEADER & NAVIGATION -->
			<header class="car-config-header">

				<!-- TODO: TABS COMPONENT -->
				<div class="car-config-tabs">
					
					<a href="#" class="tab-nav" @click.prevent="previousTab">
						<i class="arrow left"></i>
					</a>

					<a href="#" class="tab"
						:class="{ 'is-active' : activeStep === 1 }"
						@click="activeStep = 1"
					>
						<div class="subtitle">step 1</div>
						<span class="title">models & engines</span>
					</a>

					<a href="#" class="tab"
						:class="{ 'is-disabled' : selection.transmission === null, 'is-active' : activeStep === 2 }"
						@click="activeStep = 2"
					>
						<div class="subtitle">step 2</div>
						<span class="title">exterior</span>
					</a>

					<a href="#" class="tab"
						:class="{ 'is-disabled' : selection.color === null, 'is-active' : activeStep === 3 }"
						@click="activeStep = 3"
					>
						<div class="subtitle">step 3</div>
						<span class="title">options & accessories</span>
					</a>

					<a href="#" class="tab"
						:class="{ 'is-disabled' : selection.color === null, 'is-active' : activeStep === 4 }"
						@click="activeStep = 4"
					>
						<div class="subtitle">finish</div>
						<span class="title">summary</span>
					</a>

					<a href="#" class="tab-nav" @click.prevent="nextTab">
						<i class="arrow right"></i>
					</a>
				</div>
			</header>

			<!-- TOTAL PRICE -->
			<div class="card render-wrapper" v-show="activeStep !== 1">
				<div class="render" :style="{ backgroundImage: renderUrl }"></div>
				<div class="total-price">
					<div class="subtitle">total price</div>
					<div class="title">
						{{ totalPrice }} EUR
					</div>
				</div>
			</div>

			<!-- STEP 1 -->
			<div class="card" id="tab-1" v-show="activeStep === 1">
				<div class="card-content">
					<div class="card-title">MODELS & ENGINES</div>
					<div class="choice-label">MODEL</div>
					<car-config-choice
						name="model"
						:items="configData.models"
						:filters="['engine']"
						:resets="['engine', 'color', 'option']"
					>
						<template slot="item" slot-scope="{ item }">
							{{ item.name }}
							<span class="subtitle">&euro;{{ item.price }}</span>
						</template>
					</car-config-choice>

					<div class="choice-label">ENGINE</div>
					<car-config-choice
						name="engine"
						:items="configData.engines"
						:disabled="true"
						:filters="['transmission']"
						:resets="['transmission']"
					>
						<template slot="item" slot-scope="{ item }">
							{{ item.name }}
							<span class="subtitle">&euro;{{ item.price }}</span>
						</template>
					</car-config-choice>

					<div class="choice-label">TRANSMISSION</div>
					<car-config-choice
						name="transmission"
						:items="configData.transmissions"
						:disabled="true"
					>
						<template slot="item" slot-scope="{ item }">
							{{ item.name }}
							<span class="subtitle">&euro;{{ item.price }}</span>
						</template>
					</car-config-choice>
				</div>
				<a href="#" class="button next"
					:class="{ 'is-active' : selection.transmission !== null }"
					@click="activeStep = 2"
				>
					next: exterior
				</a>
			</div>

			<!-- STEP 2 -->
			<div class="card" id="tab-2" v-show="activeStep === 2">
				<div class="card-content">
					<div class="card-title">EXTERIOR</div>
					<div class="choice-label">COLOR</div>
					<car-config-choice
						name="color"
						:items="configData.colors"
					>
						<template slot="item" slot-scope="{ item }">
							<span class="paint" :style="{ backgroundColor: item.hex }"></span>
							<span class="subtitle">&euro;{{ item.price }}</span>
						</template>
					</car-config-choice>
				</div>
				<a href="#" class="button next"
					:class="{ 'is-active' : selection.color !== null }"
					@click="activeStep = 3"
				>
					next: options & accessories
				</a>
			</div>

			<!-- STEP 3 -->
			<div class="card" id="tab-3" v-show="activeStep === 3">
				<div class="card-content">
					<div class="card-title">OPTIONS & ACCESSORIES</div>
					<div class="choice-label">practical additions</div>
					<car-config-choice
						name="option"
						:items="configData.options"
						multiple
					>
					<template slot="item" slot-scope="{ item }">
						{{ item.name }}
						<span class="subtitle">&euro;{{ item.price }}</span>
					</template>
					</car-config-choice>
				</div>
				<a href="#" class="button next"
					:class="{ 'is-active' : selection.color !== null }"
					@click="activeStep = 4"
				>
					next: summary
				</a>
			</div>
			
			<!-- STEP 4 -->
			<div class="card" id="tab-4" v-show="activeStep === 4">
				<div class="card-content">
					<div class="card-title">your selection</div>
					<div class="summary columns" v-if="selection.color !== null">
						<div class="column">
							<div class="summary-group">
								<div class="summary-label">Model</div>
								<div class="summary-item">
									<div class="summary-value">{{ selection.model.name }}</div>
									<div class="summary-price">&euro;{{ selection.model.price }}</div>
								</div>
							</div>
							<div class="summary-group">
								<div class="summary-label">Engine</div>
								<div class="summary-item">
									<div class="summary-value">{{ selection.engine.name }}</div>
									<div class="summary-price">&euro;{{ selection.engine.price }}</div>
								</div>
							</div>
							<div class="summary-group">
								<div class="summary-label">Transmission</div>
								<div class="summary-item">
									<div class="summary-value">{{ selection.transmission.name }}</div>
									<div class="summary-price">&euro;{{ selection.transmission.price }}</div>
								</div>
							</div>
							<div class="summary-group">
								<div class="summary-label">Color</div>
								<div class="summary-item">
									<div class="summary-value">{{ selection.color.name }}</div>
									<div class="summary-price">&euro;{{ selection.color.price }}</div>
								</div>
							</div>
						</div>
						<div class="column">
							<div class="summary-group">
								<div class="summary-label">Options</div>
								<div class="summary-item" v-for="item in selection.option">
									<div class="summary-value">{{ item.name }}</div>
									<div class="summary-price">&euro;{{ item.price }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CarConfigChoice from './CarConfigChoice.vue';

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
				color: null,
				option: []
			},
			activeStep: 1
		};
	},

	components: {
		CarConfigChoice
	},

	computed: {
		// calculate total price from selection
		totalPrice: function() {
			var totalPrice = 0;
			for(let item in this.selection) {
				if(this.selection[item] === null) continue;
				if(Array.isArray(this.selection[item])) {
					this.selection[item].forEach((a) => {
						totalPrice += (a.hasOwnProperty('price'))? a.price : 0;
					});
				} else {
					if(this.selection[item].hasOwnProperty('price')) {
						totalPrice += parseInt(this.selection[item].price);
					}
				}
			}
			return totalPrice;
		},

		// return car render url based on selection > currently based on color property
		renderUrl: function() {
			if(this.selection.color !== null) {
				return 'url(/public/car/' + this.selection.color.id + '.png)';
			} else {
				return 'url(/public/car/default.png)';
			}
		}
	},

	created() {
		// listen to config selections
		for(let property in this.selection) {
			Event.$on('select-' + property, (data) => {
				// check if property is a set of options
				if(Array.isArray(this.selection[property])) {
					let index = this.selection[property].findIndex(item => item.id === data.id);
					// if it is a clear request
					if(data.clear === true) {
						this.selection[property].splice(index, 1);
						return;
					}
					// check if item already exists
					if(index !== -1) {
						// replace existing option
						this.selection[property].splice(index, 1, data);
					} else {
						// push new item
						this.selection[property].push(data);
					}
				} else {
					// property is a choice
					this.selection[property] = (data.clear === true) ? null : data;
				}
			});
		}
	},

	methods: {
		/* TODO: TABS COMPONENT */
		previousTab() {
			if(this.activeStep === 1) return;
			let activeTab = document.querySelector('.tab.is-active');
			if(!activeTab.previousElementSibling.classList.contains('is-disabled')) {
				this.activeStep--;
			}
		},

		/* TODO: TABS COMPONENT */
		nextTab() {
			if(this.activeStep === 4) return;
			let activeTab = document.querySelector('.tab.is-active');
			if(!activeTab.nextElementSibling.classList.contains('is-disabled')) {
				this.activeStep++;
			}
		}
	}
}
</script>

<style lang="scss">
/**
 * Let's import Montserrat font for use in our component.
 * This should be removed if the font is available globally
 */
 @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&subset=latin-ext');

 @import '../assets/scss/_variables.scss';
 @import '../assets/scss/main.scss';
 </style>