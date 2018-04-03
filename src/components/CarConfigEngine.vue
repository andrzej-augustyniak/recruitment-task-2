<template>
	<div class="engines" v-if="items.length > 0">
		<div class="engine" v-for="(item, index) in items" :class="{ 'is-active' : isActive(index), 'is-disabled' : isDisabled(item.id) }">
			<a href="#" @click.prevent="setItem(index)">
				{{ item.name }}
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			items: {
				type: Array,
				required: true,
				default: () => []
			}
		},

		data() {
			return {
				active: -1,
				filter: []
			}
		},

		watch: {
			filter: function() {
				this.active = -1;
				Event.$emit('select.engine', null);
				Event.$emit('filter.transmission', []);
			}
		},

		created() {
			Event.$on('filter.engine', (data) => {
				this.filter = data;
			});
		},

		methods: {
			setItem(index) {
				this.active = index;
				Event.$emit('select.engine', this.items[index].id);
				Event.$emit('filter.transmission', this.items[index].transmissions);
			},

			isActive(index) {
				return this.active === index;
			},

			isDisabled(id) {
				if (this.filter.indexOf(id) !== -1) {
					return false;
				}
				return true;
			}
		}
	}
</script>

<style lang="scss">
	
</style>