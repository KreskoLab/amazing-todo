<script setup lang="ts">
import { inject } from 'vue';
const completed = inject('completed');
</script>

<template>
	<button class="todo-icon">
		<svg
			class="circle"
			:class="{ active: completed }"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<circle
				cx="10"
				cy="10"
				r="9"
				stroke="#67697A"
				stroke-width="2"
			/>
		</svg>

		<svg
			v-if="completed"
			class="check"
			width="8"
			height="8"
			viewBox="0 0 8 8"
		>
			<path
				d="M6.67418 1.04879L2.92549 5.14903L1.32583 3.39926C1.02251 3.06759 0.530709 3.06759 0.227491 3.39926C-0.0758304 3.73116 -0.0758304 4.26899 0.227491 4.60078L2.37632 6.95125C2.52793 7.11708 2.72676 7.2 2.92549 7.2C3.12422 7.2 3.32305 7.11708 3.47466 6.95125L7.77242 2.2503C8.07584 1.91852 8.07584 1.38057 7.77252 1.0489C7.4693 0.717113 6.97751 0.717 6.67418 1.04879Z"
				fill="currentColor"
			/>
		</svg>
	</button>
</template>

<style scoped lang="scss">
@use '@/assets/variables.scss' as variables;

.active {
	fill: variables.$label-color !important;
	circle {
		stroke: variables.$label-color !important;
	}
}

.todo-icon {
	position: relative;
	width: 20px;
	height: 20px;

	&:hover,
	&:focus,
	&:active {
		outline: 0;
	}

	.circle,
	.check {
		position: absolute;
	}

	.circle {
		top: 0;
		bottom: 0;
		left: 0;
		fill: transparent;
	}

	.check {
		left: 50%;
		transform: translateX(-50%);
		path {
			fill: variables.$bg-basic-90;
		}
	}
}
</style>
