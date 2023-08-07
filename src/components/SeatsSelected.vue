<script setup lang="ts">
	import type { Seat } from '@/views/Seats.vue'

	withDefaults(
		defineProps<{
			selectedSeats: Seat[];
		}>(),
		{
			selectedSeats: () => [],
		}
	);

	const emit = defineEmits<{
		(e: 'bookSeats'): void;
	}>();
</script>

<template>
	<div v-if="selectedSeats.length" class="selected-seats">
	<h3 class="title">Selected seats:</h3>

	<ul class="list">
		<li
			class="list__item"
			v-for="{ row, seat } of selectedSeats"
			:key="row + seat"
		>
			Row: {{ row }}, Seat: {{ seat }}
		</li>
	</ul>

	<button @click="emit('bookSeats')">
		Book places
	</button>
</div>
</template>

<style scoped lang="scss">
	.selected-seats {
		.title {
			font-size: 25px;
			font-weight: 700;

			margin-bottom: 20px;
		}

		.list {
			list-style: none;
		
			&__item {
				margin-bottom: 10px;
				background: grey;
			}
		}
	}
</style>
