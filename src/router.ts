import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
			name: 'Movies',
      component: () => import('@/views/Movies.vue')
    },
		{
      path: '/movie/:id',
			name: 'Movie',
      component: () => import('@/views/Movie.vue')
		},
		{
			path: '/seats',
			name: 'Seats',
			component: () => import('@/views/Seats.vue')
		}
  ]
});