<script setup lang="ts">
defineProps<{
	text: string;
}>();
</script>

<template>
	<div class="label">
		<svg
			width="12"
			height="12"
			viewBox="0 0 8 8"
		>
			<path
				d="M6.67418 1.04879L2.92549 5.14903L1.32583 3.39926C1.02251 3.06759 0.530709 3.06759 0.227491 3.39926C-0.0758304 3.73116 -0.0758304 4.26899 0.227491 4.60078L2.37632 6.95125C2.52793 7.11708 2.72676 7.2 2.92549 7.2C3.12422 7.2 3.32305 7.11708 3.47466 6.95125L7.77242 2.2503C8.07584 1.91852 8.07584 1.38057 7.77252 1.0489C7.4693 0.717113 6.97751 0.717 6.67418 1.04879Z"
				fill="currentColor"
			/>
		</svg>

		<span>
			{{ text }}
		</span>
	</div>
</template>

<style scoped lang="scss">
@use '@/assets/variables.scss' as variables;

.label {
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 115px;
	height: 25px;
	background: variables.$bg-label;
	padding: 6px 8px;
	border-radius: 4px;

	span {
		color: variables.$label-color;
		font-weight: 500;
		font-size: 14px;
		line-height: 17px;
	}

	svg > path {
		fill: variables.$label-color;
	}
}
</style>
