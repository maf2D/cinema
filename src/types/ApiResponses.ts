type ApiResponse<T> = {
	error_code: number;
	error_message: string;
	data: T;
};

export type Movie = {
	id: number;
	name: string;
	description: string;
	genre: number;
	image: string;
	additional: string;
};
export type MoviesResponse = ApiResponse<Movie[]>;

export type MovieSessionsResponse = ApiResponse<{
	// key - is an id of the movie
	[key: string]: {
		showdate: Date;
		daytime: string;
	}[];
}>;

export type MovieSeatsResponse = ApiResponse<[
	{ row: number; },
	{ seat: number; is_free: boolean; }[]
][]>;

export type BookPlaceResponse = ApiResponse<{
	movie_id: string;
	row: number;
	seat: number;
	showdate: string;
	daytime: string;
	ticketkey: string;
}>;
