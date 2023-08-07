import axios, { AxiosResponse } from 'axios';

// types
import type {
	MoviesResponse,
	MovieSessionsResponse,
	MovieSeatsResponse,
	BookPlaceResponse
} from '@/types/ApiResponses';
import type {
	MoviesParams,
	MovieSessionsParams,
	MovieSeatsParams,
	BookPlaceParams
} from '@/types/ApiParams';

const baseURL = import.meta.env.VITE_API_URL;
const http = axios.create({ baseURL });

export const api = {
  getMovies(params?: MoviesParams): Promise<AxiosResponse<MoviesResponse>> {
    return http.get(`/movies?${new URLSearchParams(params)}`);
  },

	getMovieSessions(params: MovieSessionsParams): Promise<AxiosResponse<MovieSessionsResponse>> {
		return http.get(`/movieShows?${new URLSearchParams(params)}`);
	},

	getMovieSeats(params: MovieSeatsParams): Promise<AxiosResponse<MovieSeatsResponse>> {
		return http.get(`/showPlaces?${new URLSearchParams(params)}`);
	},

	bookSeat(params: BookPlaceParams): Promise<AxiosResponse<BookPlaceResponse>> {
		return http.post('/bookPlace', params);
	}
};
