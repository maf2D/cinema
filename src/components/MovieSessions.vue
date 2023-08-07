<script setup lang="ts">
	import type { MovieSessions } from '@/stores/movie';

	withDefaults(
		defineProps<{
			sessions: MovieSessions;
			movieId: number;
			movieName: string;
		}>(),
		{
			sessions: () => ({}),
			movieId: 0,
			movieName: ''
		}
	);
</script>

<template>
	<div class="schedule">
		<div
			class="schedule-day"
			v-for="(session, idx) of sessions[movieId]"
			:key="idx"
		>
			<p class="date">{{ session.showdate }}:</p>

			<ul class="time">
				<li
					class="time__item"
					v-for="time of session.daytime.split(';')"
					:key="time"
				>
					<router-link
						class="time__link"
						:some="23"
						:to="{
							name: 'Seats',
							query: {
								movieId,
								name: movieName,
								date: session.showdate.toString(),
								time
							},
						}"
					>
						{{ time }}
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.schedule {
		background: gray;

		.schedule-day {
			padding: 10px 0;
			border-bottom: 1px solid #fff;

			display: flex;
		}

		.date {
			text-align: center;
			margin-right: 10px;
			flex-shrink: 0;
		}

		.time {
			list-style: none;

			display: flex;
			flex-wrap: wrap;

			row-gap: 5px;
			column-gap: 5px;

			&__item {
				background-color: green;
			}

			&__link {
				color: #fff;
				padding: 10px;
				border-radius: 3px;
			}
		}
	}
</style>
