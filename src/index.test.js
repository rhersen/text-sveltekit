import { describe, it, expect } from 'vitest';
import locations from '$lib/locations.json';

function north([, { Geometry }]) {
	return Number.parseFloat(Geometry.WGS84.split(' ')[2]);
}

function east([, { Geometry }]) {
	return Number.parseFloat(Geometry.WGS84.split(' ')[1].substring(1));
}

describe('locations', () => {
	it('should', () => {
		const entries = Object.entries(locations);
		expect(entries).toHaveLength(1716);
		const entry = entries[23];
		expect(entry[1]).toEqual({
			AdvertisedShortLocationName: 'Arlanda nedre',
			Geometry: {
				SWEREF99TM: 'POINT (664813 6614137)',
				WGS84: 'POINT (17.923106648878097 59.63271292158976)'
			}
		});
		expect(east(entry)).toBe(17.923106648878097);
		expect(north(entry)).toBe(59.63271292158976);
		expect(
			inside([
				'Söd',
				{
					AdvertisedShortLocationName: 'Södertälje hamn',
					Geometry: {
						SWEREF99TM: 'POINT (651279 6562834)',
						WGS84: 'POINT (17.64721545709819 59.17763490847209)'
					}
				}
			])
		).toBe(true);
		expect(
			inside([
				'Mr',
				{
					AdvertisedShortLocationName: 'Märsta',
					Geometry: {
						SWEREF99TM: 'POINT (661368 6613430)',
						WGS84: 'POINT (17.861556068154965 59.627719092214846)'
					}
				}
			])
		).toBe(true);
		expect(
			inside([
				'Gn',
				{
					AdvertisedShortLocationName: 'Gnesta',
					Geometry: {
						SWEREF99TM: 'POINT (632674 6547755)',
						WGS84: 'POINT (17.312841134340005 59.04854927680454)'
					}
				}
			])
		).toBe(true);
		expect(
			inside([
				'U',
				{
					AdvertisedShortLocationName: 'Uppsala',
					Geometry: {
						SWEREF99TM: 'POINT (648345 6638550)',
						WGS84: 'POINT (17.64869381436992 59.85788169781748)'
					}
				}
			])
		).toBe(true);
		// const filtered = entries.filter(inside);
		// expect(JSON.stringify(Object.fromEntries(filtered))).toBe('');
	});
});

function inside(entry) {
	return east(entry) > 17.31 && north(entry) < 59.86;
}
