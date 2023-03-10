<script>
	import Branch from '$lib/components/Branch.svelte';

	export let data;
</script>

<div class="parent">
	<Branch trains={data.nw ?? []} div="1" />
	<Branch trains={data.ne ?? []} div="2" />
	<Branch trains={data.c ?? []} div="3" />
	<Branch trains={data.sw ?? []} div="4" />
	<Branch trains={data.se ?? []} div="5" />
</div>

<style>
	.parent {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	.div1 {
		grid-area: 1 / 1 / 2 / 3;
	}
	.div2 {
		grid-area: 1 / 3 / 2 / 5;
	}
	.div3 {
		grid-area: 2 / 2 / 3 / 4;
	}
	.div4 {
		grid-area: 3 / 1 / 4 / 3;
	}
	.div5 {
		grid-area: 3 / 3 / 4 / 5;
	}
</style>
