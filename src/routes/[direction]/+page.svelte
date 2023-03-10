<script>
	import { onDestroy, onMount } from 'svelte';
	import Branch from '$lib/components/Branch.svelte';
	import { line1, line2 } from '$lib/formatLatestAnnouncement';

	export let data;
	let eventSource;

	onMount(() => {
		if (!data.sseUrl) return;

		eventSource = new EventSource(data.sseUrl);
		eventSource.onmessage = ({ data: s }) => {
			const { RESPONSE } = JSON.parse(s);
			const [{ TrainAnnouncement }] = RESPONSE.RESULT;
			// const updated = data.announcements;
			for (let i = 0; i < TrainAnnouncement.length; i++)
				console.log(line1(TrainAnnouncement[i]), line2(TrainAnnouncement[i]));
			// const found = data.announcements.findIndex(
			// 		({ AdvertisedTrainIdent }) =>
			// 				AdvertisedTrainIdent === TrainAnnouncement[i].AdvertisedTrainIdent
			// );
			// if (found >= 0) updated[found] = TrainAnnouncement[i];

			// data.announcements = updated;
		};
	});

	onDestroy(() => {
		if (eventSource) eventSource.close();
	});
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
