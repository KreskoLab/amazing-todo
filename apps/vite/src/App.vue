<script setup lang="ts">
import TodoInput from '@/components/Todo/TodoInput.vue';
import TodoList from '@/components/Todo/TodoList.vue';
import AppLabel from '@/components/App/AppLabel.vue';
import { useTodosStore } from '@/stores/main';
import { computed, onBeforeMount, onMounted } from 'vue';

const store = useTodosStore();

const pendingTodos = computed(() => store.pending);
const completedTodos = computed(() => store.completed);

const pendingFull = computed<boolean>(() => !!store.pending.length);
const completedFull = computed<boolean>(() => !!store.completed.length);

onMounted(async () => {
	await store.fetch();
	store.openWS();
});

onBeforeMount(() => store.closeWS());
</script>

<template>
	<main>
		<div class="container">
			<header>
				<h1>Awesome Todo List</h1>
				<TodoInput @input="store.add($event)" />
			</header>

			<section>
				<TodoList
					:todos="pendingTodos"
					:full="pendingFull && !completedFull"
				/>
			</section>

			<section
				v-if="completedFull"
				id="completed"
			>
				<hr v-if="pendingFull" />

				<AppLabel text="Completed" />

				<TodoList
					:todos="completedTodos"
					:full="completedFull && !pendingFull"
				/>
			</section>
		</div>
	</main>
</template>

<style lang="scss">
@use '@/assets/variables.scss' as variables;
@import '@/assets/media.scss';
@import '@/assets/main.scss';

main {
	min-height: 100vh;
	width: 100%;
	background-color: transparent;
	display: flex;
	justify-content: center;
}

hr {
	height: 1px;
	width: variables.$width;
	background: variables.$bg-basic-80;
	border: 0;
}

header {
	width: variables.$width;

	h1 {
		font-weight: 700;
		font-size: 30px;
		line-height: 36px;
		text-align: center;
		color: variables.$bg-basic-70;
		margin-bottom: 30px;
	}
}

.container {
	display: flex;
	flex-direction: column;
	height: calc(100vh - 80px);
	padding: 40px 0;
	gap: 20px;
}

#completed {
	display: flex;
	flex-direction: column;
	gap: 20px;
	overflow-y: auto;

	.list {
		max-height: 100% !important;
	}
}

@include xs {
	.container {
		width: 100% !important;
		padding: 40px 30px !important;
	}

	hr {
		width: 100% !important;
	}

	header {
		width: 100% !important;
	}
}
</style>
