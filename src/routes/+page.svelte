<script>
	import { onDestroy, onMount } from 'svelte';
	import grouped from '$lib/branches.js';
	import Direction from '$lib/components/Direction.svelte';

	export let data;

	let eventSource;

	onMount(() => {
		if (!data.sseUrl) return;

		eventSource = new EventSource(data.sseUrl);
		eventSource.onmessage = ({ data: s }) => {
			const { RESPONSE } = JSON.parse(s);
			const [{ TrainAnnouncement }] = RESPONSE.RESULT;
			data.TrainAnnouncement = [...TrainAnnouncement, ...data.TrainAnnouncement];
			// branches = grouped(data.TrainAnnouncement);
		};
	});

	onDestroy(() => {
		if (eventSource) eventSource.close();
	});
</script>

<div>Norrgående</div>
<Direction
	branches={grouped(
		data.TrainAnnouncement.filter(({ AdvertisedTrainIdent }) =>
			/[02468]$/.test(AdvertisedTrainIdent)
		)
	)}
/>

<div>Södergående</div>
<Direction
	branches={grouped(
		data.TrainAnnouncement.filter(({ AdvertisedTrainIdent }) =>
			/[13579]$/.test(AdvertisedTrainIdent)
		)
	)}
/>

<style>
	div {
		text-align: center;
		font-family: Arial, sans-serif;
		font-weight: bold;
	}

	div:not(:first-child) {
		margin-top: 1em;
	}
</style>
