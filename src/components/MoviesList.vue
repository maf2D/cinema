<script setup lang="ts">
	import type { Movies } from '@/stores/movie';

	withDefaults(
		defineProps<{
			movies: Movies;
		}>(),
		{
			movies: () => [],
		}
	);
</script>

<template>
	<ul class="movie-list">
		<li
			class="movie-list__item"
			v-for="movie of movies"
			:key="movie.id"
		>
			<router-link :to="`/movie/${movie.id}`">
				<img
					class="movie-list__img"
					:src="movie.image"
					:alt="movie.name"
				/>
			</router-link>
		</li>
	</ul>
</template>

<style scoped lang="scss">
	.movie-list {
		list-style: none;
		
		display: flex;
		flex-wrap: wrap;

		row-gap: 20px;
		column-gap: 20px;

		&__item {
			flex-basis: calc(20% - 20px);
			flex-shrink: 0;

			cursor: pointer;
		}

		&__img {
			width: 100%;
			height: 100%;
			border-radius: 10px;
		}
	}
</style>
