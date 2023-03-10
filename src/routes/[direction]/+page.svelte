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
		grid-column-gap: 0;
		grid-row-gap: 0;
	}
</style>
