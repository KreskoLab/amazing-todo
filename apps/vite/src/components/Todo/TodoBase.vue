<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
	variant: 'base' | 'transparent' | 'active';
}

const props = withDefaults(defineProps<Props>(), {
	variant: 'base',
});

const activeVariant = computed<Props['variant']>(() => {
	switch (props.variant) {
		case 'active':
			return 'active';

		case 'transparent':
			return 'transparent';

		case 'base':
		default:
			return 'base';
	}
});
</script>

<template>
	<div
		class="wrapper"
		:class="activeVariant"
	>
		<div class="icon-left">
			<slot name="icon" />
		</div>

		<div class="content">
			<slot />
		</div>

		<div class="icon icon-right">
			<slot name="icon-right" />
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '@/assets/variables.scss' as variables;

%icon {
	position: absolute;
	display: flex;
	align-items: center;
	top: 0;
	bottom: 0;
}

.base {
	background-color: variables.$bg-basic-80;
}

.transparent {
	border-color: variables.$todo-add-default-border !important;
	background-color: transparent;
}

.active {
	background-color: variables.$bg-basic-80 !important;
	border-color: variables.$bg-basic-70 !important;
}

.wrapper {
	position: relative;
	width: 100%;
	padding-top: 20px;
	padding-bottom: 20px;
	border: 2px solid transparent;
	border-radius: 0.5rem;

	.icon-left {
		@extend %icon;
		padding-left: 20px;
		left: 0;
	}

	.icon-right {
		@extend %icon;
		padding-right: 20px;
		right: 0;
	}

	.content {
		padding: 0 60px;
		height: 20px;
	}
}
</style>
