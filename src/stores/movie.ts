import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api.ts';

// types
import type { ValueOf } from '@/types/ValueOf';
import type {
	MoviesResponse,
	MovieSessionsResponse,
	MovieSeatsResponse
} from '@/types/ApiResponses';
import type {
	MoviesParams,
	MovieSessionsParams,
	MovieSeatsParams,
	BookPlaceParams
} from '@/types/ApiParams';

export type Movies = ValueOf<Pick<MoviesResponse, 'data'>>;
export type MovieSeats = ValueOf<Pick<MovieSeatsResponse, 'data'>>;
export type MovieSessions = ValueOf<Pick<MovieSessionsResponse, 'data'>>;

type State = {
	movies: Movies;
	movieSeats: MovieSeats;
	movieSessions: MovieSessions | null;
};

const initialState: State = {
	movies: [],
	movieSeats: [],
	movieSessions: null
};

export const useMovieStore = defineStore('movie', () => {
	const state = reactive({ ...initialState });

	const movies = computed(() => state.movies);
	const movieSessions = computed(() => state.movieSessions);
	const movieSeats = computed(() => {
		if (state.movieSeats.length) {
			return state.movieSeats.map((s) => ({
				row: s[0].row,
				seats: s[1].map((s2) => ({
					seat: s2.seat,
					isFree: s2.is_free,
					isBooked: false
				}))
			}));
		}

		return [];
	});

	async function getMovies(params?: MoviesParams) {
		try {
			const { data } = await api.getMovies(params);

			state.movies = data.data;
		} catch(err) {
			console.error(err);
		}
	}

	async function getSession(params: MovieSessionsParams) {
		try {
			const { data } = await api.getMovieSessions(params);

			state.movieSessions = data.data;
		} catch(err) {
			console.error(err);
		}
	}

	async function getMovieSeats(params: MovieSeatsParams) {
		try {
			const { data } = await api.getMovieSeats(params);

			state.movieSeats = data.data;
		} catch(err) {
			console.error(err);
		}
	}

	async function bookSeat(params: BookPlaceParams) {
		try {
			const { data } = await api.bookSeat(params);
			console.log(data);
		} catch(err) {
			console.error(err);
		}
	}

	return {
		// getters
		movies,
		movieSeats,
		movieSessions,

		// actions
		getMovies,
		getSession,
		getMovieSeats,
		bookSeat
	};
});
