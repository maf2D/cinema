<script setup lang="ts"></script>

<template>
	<header class="header">
		<div class="container">
			<h1 class="header__title">Movies</h1>
		</div>
	</header>

  <main class="main">
		<div class="container">
			<router-view />
		</div>
  </main>
</template>

<style scoped lang="scss">
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;

		height: 90px;
		text-align: center;
		
		padding: 20px 0;
		background: #000;
		border-bottom: 1px solid #fff;

		&__title {
			font-size: 30px;
			font-weight: 700;
		}
	}

	.main {
		margin-top: 140px;
		margin-bottom: 50px;
	}

	.container {
		max-width: 1280px;
		margin: 0 auto;
	}
</style>
