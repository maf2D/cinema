<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useMovieStore } from '@/stores/movie';
	import { debounce } from '@/helpers/debounce';
	import { genres } from '@/constants/genres';

	// components
	import Loader from '@/components/Loader.vue';
	import MoviesList from '@/components/MoviesList.vue';
	import MoviesGenres from '@/components/MoviesGenres.vue';

	const movieStore = useMovieStore();
	const { movies } = storeToRefs(movieStore);

	onMounted(async () => {
		await movieStore.getMovies();
	});

	// search logic
	const search = ref('');

	const getSearchedMovies = debounce(async () => {
		// there is a problem with a genres paremeter in an api
		await movieStore.getMovies({
			name: search.value, genres: selectedGenres.value[0].toString()
		});
	}, 500);

	// genres logic
	const selectedGenres = ref<number[]>([]);

	function onGenreChange(id: number) {
		const idx = selectedGenres.value.findIndex(
			(genreId) => genreId === id
		);

		if (idx >= 0) {
			selectedGenres.value.splice(idx, 1);
		} else {
			selectedGenres.value.push(id);
		}
	}

	function isGenreSelected(id: number) {
		return selectedGenres.value.includes(id);
	}
</script>

<template>
	<Loader v-if="!movies" />

	<div v-else class="movies">
		<div class="search">
			<input
				class="search__input"
				type="search"
				v-model="search"
				@input="getSearchedMovies"
			/>
		</div>

		<MoviesGenres
			:genres="genres"
			@onGenreChange="onGenreChange"
			@isGenreSelected="isGenreSelected"
		/>

		<MoviesList :movies="movies" />
	</div>
</template>

<style scoped lang="scss">
	.search {
		margin-bottom: 20px;
		text-align: center;

		&__input {
			padding: 10px;
			font-size: 30px;
		}
	}

	.genre-list {
		margin-bottom: 50px;
	}
</style>
