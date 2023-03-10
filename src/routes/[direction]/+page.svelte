<script>
	import { onDestroy, onMount } from 'svelte';
	import Branch from '$lib/components/Branch.svelte';
	import grouped from '$lib/branches.js';

	export let data;
	let branches = grouped(data.TrainAnnouncement);
	let eventSource;

	onMount(() => {
		if (!data.sseUrl) return;

		eventSource = new EventSource(data.sseUrl);
		eventSource.onmessage = ({ data: s }) => {
			const { RESPONSE } = JSON.parse(s);
			const [{ TrainAnnouncement }] = RESPONSE.RESULT;
			data.TrainAnnouncement = [...TrainAnnouncement, ...data.TrainAnnouncement];
			branches = grouped(data.TrainAnnouncement);
		};
	});

	onDestroy(() => {
		if (eventSource) eventSource.close();
	});
</script>

<div class="parent">
	<Branch trains={branches.nw ?? []} div="1" />
	<Branch trains={branches.ne ?? []} div="2" />
	<Branch trains={branches.c ?? []} div="3" />
	<Branch trains={branches.sw ?? []} div="4" />
	<Branch trains={branches.se ?? []} div="5" />
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
