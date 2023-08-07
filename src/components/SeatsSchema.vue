<script setup lang="ts">
	import type { Seat, MovieSeats } from '@/views/Seats.vue'

	withDefaults(
		defineProps<{
			movieSeats: MovieSeats;
		}>(),
		{
			movieSeats: () => [],
		}
	);

	const emit = defineEmits<{
		(e: 'selectSeat', seat: Seat): void;
	}>();
</script>

<template>
	<div class="seats-schema">
		<div
			class="seats-schema__row"
			v-for="{ row, seats } of movieSeats"
			:key="row"
		>
			<div
				class="seats-schema__cell"
				:class="{ 'is-free': isFree, 'is-booked': isBooked }"
				v-for="{ seat, isFree, isBooked } of seats"
				:key="row + seat"
				@click="emit('selectSeat', { row, seat })"
			>
				{{ seat }}
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.seats-schema {
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		margin-bottom: 20px;

		&__row {
			display: flex;
			justify-content: space-between;
			column-gap: 5px;
			
		}

		&__cell {
			flex-basis: 25px;
			height: 25px;
			border-radius: 10px;
			
			display: flex;
			justify-content: center;
			align-items: center;

			background: red;
			cursor: pointer;

			&.is-free {
				background: blue;
			}

			&.is-booked {
				background: yellow;
				color: black;
			}
		}
	}
</style>
