<template>
	<div class="colors" v-if="items.length > 0">
		<div class="color" v-for="(item, index) in items" :class="{ 'is-active' : active === index }">
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
				active: -1
			}
		},

		methods: {
			setItem(index) {
				this.active = index;
				Event.$emit('select.color', this.items[index].id);
			}
		}
	}
</script>

<style lang="scss">
	
</style>