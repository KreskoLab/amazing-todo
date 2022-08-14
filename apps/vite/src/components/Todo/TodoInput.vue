<script setup lang="ts">
import { computed, ref } from 'vue';
import { TodoVariant } from '@/types';
import TodoBase from '@/components/Todo/TodoBase.vue';
import AppInput from '@/components/App/AppInput.vue';

const emit = defineEmits<{
	(event: 'input', text: string): void;
}>();

const todo = ref<string>('');
const active = ref<boolean>(false);

const activeVariant = computed<TodoVariant>(() => (active.value ? 'active' : 'transparent'));

function addTodo() {
	emit('input', todo.value);
	todo.value = '';
}
</script>

<template>
	<TodoBase :variant="activeVariant">
		<template #icon>
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
			>
				<path
					d="M20 8.75H11.25V0H8.75V8.75H0V11.25H8.75V20H11.25V11.25H20V8.75Z"
					fill="#7A7C8D"
				/>
			</svg>
		</template>

		<template #default>
			<AppInput
				v-model="todo"
				placeholder="Add task"
				@focus="active = true"
				@focusout="active = false"
				@enter="addTodo()"
			/>
		</template>
	</TodoBase>
</template>
