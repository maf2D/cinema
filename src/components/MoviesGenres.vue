<script setup lang="ts">
	import type { Genres } from '@/constants/genres';

	withDefaults(
		defineProps<{
			genres: Genres;
		}>(),
		{
			genres: () => [],
		}
	);

	const emit = defineEmits<{
		(e: 'isGenreSelected', id: number): boolean;
		(e: 'onGenreChange', id: number): void;
	}>();
</script>

<template>
	<ul class="genre-list">
		<li
			class="genre-list__item"
			v-for="{ id, name } of genres"
			:key="id"
		>
			<label>
				{{ name }}

				<input
					type="checkbox"
					:checked="emit('isGenreSelected', id)"
					@change="emit('onGenreChange', id)"
				/>
			</label>
		</li>
	</ul>
</template>

<style scoped lang="scss">
	.genre-list {
		list-style: none;
		
		display: flex;
		justify-content: center;
		column-gap: 20px;

		&__item {
			cursor: pointer;

			label {
				font-size: 20px;
				cursor: pointer;
			}

			input {
				cursor: pointer;
			}
		}

		&__img {
			width: 100%;
			height: 100%;
			border-radius: 10px;
		}
	}
</style>
