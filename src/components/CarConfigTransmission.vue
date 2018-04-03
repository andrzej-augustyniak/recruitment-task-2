<template>
	<div class="transmissions" v-if="items.length > 0">
		<div class="transmission" v-for="(item, index) in items" :class="{ 'is-active' : isActive(index), 'is-disabled' : isDisabled(item.id) }">
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
				Event.$emit('select.transmission', null);
			}
		},

		created() {
			Event.$on('filter.transmission', (data) => {
				this.filter = data;
			});
		},

		methods: {
			setItem(index) {
				this.active = index;
				Event.$emit('select.transmission', this.items[index].id);
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