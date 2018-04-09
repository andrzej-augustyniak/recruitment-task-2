<template>
	<div class="choice-group" :class="[ { 'multiple' : multiple }, 'choice-group-' + pluralName ]" v-if="items.length > 0">
		<div v-for="(item, index) in items" class="choice" :class="[ 'choice-' + name, {'is-active' : isActive(index)}, {'is-disabled' : isDisabled(item.id)} ]">
			<a href="#" @click.prevent="select(index)">
				<slot name="item" :item="item">
					{{ item.name }}
				</slot>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		items: {
			type: Array,
			required: true,
			default: () => []
		},
		disabled: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		filters: {
			type: Array,
			default: () => []
		},
		resets: {
			type: Array,
			default: () => []
		}
	},

	data() {
		return {
			active: [],
			activeFilters: []
		}
	},

	computed: {
		combinedFilter: function() {
			let whitelists = _.flatten(this.activeFilters.map( item => item.whitelist ));
			return _.intersection(whitelists);
		},
		pluralName: function() {
			return pluralize(this.name);
		}
	},

	created() {
		Event.$on('filter-' + this.name, (data) => {
			if(data.hasOwnProperty('whitelist') && data.whitelist.length > 0) {
				this.setFilter(data);
			} else {
				this.clearFilter(data);
			}
		});

		Event.$on('reset-' + this.name, (data) => {
			this.clearSelection();
			this.clearFilter(data);
			this.emitResets();
		});
	},

	methods: {
		select(index) {
			// emit resets unless it's initial selection
			if(this.active.length !== 0) {
				this.emitResets();
			}

			// check if multiple selections are allowed
			if(this.multiple) {
				// check if item is already active, deselect it
				let deselectIndex = this.active.indexOf(index)
				if(deselectIndex !== -1) {
					Event.$emit('select-' + this.name, { id: this.items[index].id, clear: true });
					this.active.splice(deselectIndex, 1);
					return;
				}
				
				// add to selection
				this.active.push(index);
			} else {
				// select only one
				this.active.splice(0, 1, index);
			}

			// emit select event and filters
			Event.$emit('select-' + this.name, this.items[index]);
			this.emitFilters();
		},

		clearSelection() {
			this.active.forEach((item) => {
				Event.$emit('select-' + this.name, { id: item, clear: true });
			});
			this.active = [];
		},

		setFilter(data) {
			let index = this.activeFilters.findIndex( item => item.invoker === data.invoker );
			if(index !== -1) {
				this.activeFilters.splice(index, 1, data);
			} else {
				this.activeFilters.push(data);
			}
		},

		clearFilter(data) {
			let index = this.activeFilters.findIndex( item => item.invoker === data.invoker );
			if(index !== -1) {
				this.activeFilters.splice(index, 1);
			}
		},

		isActive(index) {
			return (this.active.indexOf(index) !== -1)? true : false;
		},

		isDisabled(id) {
			if (this.combinedFilter.length === 0) {
				// No active filter, return based on disabled property
				return (this.disabled === true)? true : false;
			} else {
				// Active filter exists, check if the item is present in the filter
				return (this.combinedFilter.indexOf(id) === -1)? true : false;
			}
		},

		emitResets() {
			this.resets.forEach((item) => {
				Event.$emit('reset-' + item, {
					invoker: this.name
				});
			});
		},

		emitFilters() {
			this.filters.forEach((item) => {
				Event.$emit('filter-' + item, {
					invoker: this.name,
					whitelist: this.items[this.active][pluralize(item)]
				});
			});
		}
	}
}
</script>