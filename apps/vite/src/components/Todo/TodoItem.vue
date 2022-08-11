<script setup lang="ts">
import { nextTick, provide, reactive, ref, watch } from 'vue';
import { useTodosStore } from '@/stores/main';
import TodoBase from '@/components/Todo/TodoBase.vue';
import TodoIcon from '@/components/Todo/TodoIcon.vue';
import AppInput from '@/components/App/AppInput.vue';

export interface Props {
	id: string;
	title: string;
	completed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	completed: false,
});

provide('completed', props.completed);

const store = useTodosStore();
const input = ref<InstanceType<typeof AppInput> | null>(null);

const edit = reactive({
	active: false,
	value: '',
});

watch(
	() => edit.active,
	async (val) => {
		if (val) {
			await nextTick();
			input.value?.setFocus();
		}
	},
);

function toggleTodo() {
	store.update(props.id, { completed: !props.completed });
}

function removeTodo() {
	store.remove(props.id);
}

function updateTodo() {
	store.update(props.id, { title: edit.value });

	edit.active = false;
	edit.value = '';
}
</script>

<template>
	<TodoBase variant="base">
		<template #icon>
			<TodoIcon
				:completed="completed"
				@click="toggleTodo()"
			/>
		</template>

		<template #default>
			<p
				v-if="!edit.active"
				:class="{ completed: completed }"
				@click="edit.active = !edit.active"
			>
				{{ title }}
			</p>

			<AppInput
				v-else
				ref="input"
				v-model="edit.value"
				@focusout="edit.active = false"
				@enter="updateTodo()"
			/>
		</template>

		<template #icon-right>
			<button @click="removeTodo()">
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
				>
					<path
						d="M11.5745 0.434321C11.4092 0.268631 11.1848 0.175516 10.9507 0.175516C10.7167 0.175516 10.4922 0.268631 10.3269 0.434321L6.00002 4.75236L1.67313 0.425472C1.50782 0.259783 1.28338 0.166668 1.04932 0.166668C0.815262 0.166668 0.590821 0.259783 0.425504 0.425472C0.0804147 0.770562 0.0804147 1.32801 0.425504 1.6731L4.75239 6L0.425504 10.3269C0.0804147 10.672 0.0804147 11.2294 0.425504 11.5745C0.770593 11.9196 1.32804 11.9196 1.67313 11.5745L6.00002 7.24763L10.3269 11.5745C10.672 11.9196 11.2294 11.9196 11.5745 11.5745C11.9196 11.2294 11.9196 10.672 11.5745 10.3269L7.24765 6L11.5745 1.6731C11.9108 1.33686 11.9108 0.770562 11.5745 0.434321Z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</template>
	</TodoBase>
</template>

<style scoped lang="scss">
@use '@/assets/variables.scss' as variables;

button {
	display: flex;
	align-items: center;
	border: none;
	background-color: transparent;
	cursor: pointer;

	svg > path {
		fill: variables.$bg-basic-40 !important;
	}

	&:hover,
	&:focus,
	&:active {
		outline: 0;
		svg > path {
			fill: variables.$cross !important;
		}
	}
}

p {
	color: variables.$text-active;
	font-weight: 500;
	font-size: 16px;
	line-height: 20px;
}

.completed {
	text-decoration-style: solid;
	text-decoration-line: line-through;
	text-decoration-color: variables.$bg-basic-40;
	color: variables.$bg-basic-40;
}
</style>
