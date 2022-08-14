<script setup lang="ts">
import type { Todo } from '@/types';
import TodoItem from '@/components/Todo/TodoItem.vue';

defineProps<{
	todos: Todo[];
	full: boolean;
}>();
</script>

<template>
	<div
		class="list"
		:class="{ full: full }"
	>
		<TransitionGroup
			tag="ul"
			appear
		>
			<li
				v-for="todo in todos"
				:key="todo._id"
			>
				<TodoItem
					:id="todo._id"
					:title="todo.title"
					:completed="todo.completed"
				/>
			</li>
		</TransitionGroup>
	</div>
</template>

<style scoped lang="scss">
@use '@/assets/variables.scss' as variables;
@import '@/assets/media.scss';

.list {
	max-height: calc(variables.$todo-height + variables.$todo-gap) * variables.$todo-list-max-items;
	width: variables.$width + 5px;
	flex-grow: 0;
	overflow-y: scroll;
	overflow-x: hidden;
	padding-right: 20px;

	ul {
		list-style: none;
	}

	li:not(:last-child) {
		margin-bottom: variables.$todo-gap;
	}

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 6px;
		background: transparent;
	}

	&:hover::-webkit-scrollbar-thumb {
		background: variables.$bg-basic-80;
	}
}

.full {
	max-height: 100%;
}

@include xs {
	.list {
		width: 100% !important;
		padding-right: 0 !important;

		&::-webkit-scrollbar {
			width: 0 !important;
		}
	}
}

.v-move,
.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.v-leave-active {
	position: absolute;
}
</style>
