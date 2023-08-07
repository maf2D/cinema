export type Genre = {
	id: number;
	name: string;
};

export type Genres = Genre[];

export const genres = [
	{ id: 0, name: 'Action' },
	{ id: 1, name: 'Adventrues' },
	{ id: 2, name: 'Comedy' },
	{ id: 3, name: 'Drama' },
	{ id: 4, name: 'Horror' },
	{ id: 5, name: 'Westerns' }
];
