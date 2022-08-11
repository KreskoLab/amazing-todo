<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
	modelValue?: string;
	placeholder?: string;
}>();

defineEmits<{
	(event: 'update:modelValue', text: string): void;
	(event: 'enter'): void;
	(event: 'focus'): void;
	(event: 'focusout'): void;
}>();

const input = ref<HTMLInputElement | null>(null);

function setFocus() {
	input.value?.focus();
}

defineExpose({
	setFocus,
});
</script>

<template>
	<input
		ref="input"
		type="text"
		:value="modelValue || ''"
		:placeholder="placeholder"
		@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
		@keyup.enter="$emit('enter')"
		@keyup.escape="$emit('focusout')"
		@focus="$emit('focus')"
		@focusout="$emit('focusout')"
	/>
</template>

<style scoped lang="scss">
@use '@/assets/variables.scss' as variables;

input {
	width: 100%;
	outline: none;
	appearance: none;
	-webkit-appearance: none;
	background-color: transparent;
	border: 0;
	color: variables.$text-input;
	font-size: 16px;
	line-height: 19px;
}
</style>
