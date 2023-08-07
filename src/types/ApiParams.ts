export type MoviesParams = Partial<{
	movie_id: string;
	name: string;
	genres: string;
}>;

export type MovieSessionsParams = {
	movie_id: string;
};

export type MovieSeatsParams = {
	movie_id: string;
	daytime: string;
	showdate: string;
};

export type BookPlaceParams = {
	movie_id: string;
	row: string;
	seat: string;
	showdate: string;
	daytime: string;
};
