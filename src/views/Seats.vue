<script setup lang="ts">
	import { onMounted, watch, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { useMovieStore } from '@/stores/movie';

	// components
	import Loader from '@/components/Loader.vue';
	import SeatsSchema from '@/components/SeatsSchema.vue';
	import SeatsSelected from '@/components/SeatsSelected.vue';

	type QueryParams = {
		[key: string]: string;
	};

	export type Seat = {
		row: number;
		seat: number;
	};

	export type MovieSeats = typeof movieSeats.value;

	const route = useRoute();
	const movieStore = useMovieStore();

	const { movieId, date, time, name } = route.query as QueryParams;
	const { movieSeats } = storeToRefs(movieStore);
	const movieSeatsCopy = ref<MovieSeats>([]);
	
	onMounted(async () => {
		await movieStore.getMovieSeats({
			movie_id: movieId, daytime: time, showdate: date
		});
	});

	watch(movieSeats, (newVal) => {
		movieSeatsCopy.value = [...newVal];
	});

	// select seat logic
	const selectedSeats = ref<Seat[]>([]);

	function selectSeat(selectedSeat: Seat) {
		const rowIndex = movieSeatsCopy.value.findIndex(
			(r) => r.row === selectedSeat.row
		);
		const seatIndex = movieSeatsCopy.value[rowIndex].seats.findIndex(
			(s) => s.seat === selectedSeat.seat
		);

		const rowItem = movieSeatsCopy.value[rowIndex];
		const seatItem = rowItem.seats[seatIndex];
		const { row } = rowItem;
		const { seat, isFree, isBooked } = seatItem;

		if (!isBooked && isFree) {
			selectedSeats.value.push({ row, seat });
			seatItem.isBooked = true;
		}

		if (isBooked) {
			selectedSeats.value.splice(row - 1, 1);
			seatItem.isBooked = false;
		}
	}

	// book logic
	async function bookSeats() {
		const selectedSeatsPromises = selectedSeats.value.map(
			(s) => movieStore.bookSeat({
				movie_id: movieId,
				showdate: date,
				daytime: time,
				row: s.row.toString(),
				seat: s.seat.toString()
			})
		);

		await Promise.all(selectedSeatsPromises);
		await movieStore.getMovieSeats({
			movie_id: movieId, daytime: time, showdate: date
		});

		alert('All your seats are booked!');

		selectedSeats.value = [];
	}
</script>

<template>
	<div class="movie-sits">
		<Loader v-if="!movieSeatsCopy" />

		<div v-else class="seats-info">
			<h2 class="movie-name">{{ name }}</h2>

			<SeatsSchema
				:movieSeats="movieSeatsCopy"
				@selectSeat="selectSeat"
			/>

			<SeatsSelected
				@bookSeats="bookSeats"
				:selectedSeats="selectedSeats"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.movie-name {
		font-size: 30px;
		font-weight: 700;
		margin-bottom: 30px;
		text-align: center;
	}
</style>
