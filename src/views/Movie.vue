<script setup lang="ts">
	import { onMounted, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { useMovieStore } from '@/stores/movie';
	import { genres } from '@/constants/genres';

	// componets
	import Loader from '@/components/Loader.vue';
	import MovieSessions from '@/components/MovieSessions.vue';

	const route = useRoute();
	const movieStore = useMovieStore();

	const { movies, movieSessions } = storeToRefs(movieStore);
	const movie = computed(() => movies.value[0]);
	const movieId = parseInt(route.params.id as string);

	const genreName = computed(() => {
		return genres.find((g) => g.id === movies.value[0].genre)?.name;
	});

	onMounted(async () => {
		Promise.all([
			movieStore.getMovies({ movie_id: movieId.toString() }),
			movieStore.getSession({ movie_id: movieId.toString() })
		]);
	});
</script>

<template>
	<div class="movie">
		<Loader v-if="!movie || !movieSessions" />

		<div v-if="movie && movieSessions" class="info">
			<div class="info__image">
				<img :src="movie.image" :alt="movie.name" />
			</div>

			<h2 class="info__title">{{ movie.name }}: ({{ genreName }})</h2>
			<p class="info__description">{{ movie.description }}</p>

			<!-- additional html content that comes from an api -->
			<div class="info__additional" v-html="movie.additional" />

			<MovieSessions
				:sessions="movieSessions"
				:movieId="movie.id"
				:movieName="movie.name"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.movie {
		.info {
			font-size: 20px;

			&__image {
				text-align: center;

				margin-bottom: 20px;
				height: 400px;

				img {
					height: 100%;
					border-radius: 10px;
				}
			}

			&__title {
				text-align: center;
				margin-bottom: 20px;
			}

			&__description {
				margin-bottom: 20px;
			}

			&__additional {
				:deep(ul) {
					list-style: none;
				}

				:deep(li),
				:deep(.val) {
					display: flex;
				}

				:deep(.key) {
					padding-right: 10px;
					flex-shrink: 0;
				}
			}
		}
	}
</style>
