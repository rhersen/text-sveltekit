import { describe, it, expect } from 'vitest';
import color from '$lib/color';

describe('color', () => {
	it('should', () => {
		expect(
			color({
				TimeAtLocationWithSeconds: '2023-03-24T16:11:29.000+01:00',
				AdvertisedTimeAtLocation: '2023-03-24T16:11:00.000+01:00'
			})
		).toBe('lime');
		expect(
			color({
				TimeAtLocationWithSeconds: '2023-03-24T16:12:00.000+01:00',
				AdvertisedTimeAtLocation: '2023-03-24T16:11:00.000+01:00'
			})
		).toBe('white');
		expect(
			color({
				TimeAtLocationWithSeconds: '2023-03-24T16:13:00.001+01:00',
				AdvertisedTimeAtLocation: '2023-03-24T16:11:00.000+01:00'
			})
		).toBe('yellow');
		expect(
			color({
				TimeAtLocationWithSeconds: '2023-03-24T16:15:00.001+01:00',
				AdvertisedTimeAtLocation: '2023-03-24T16:11:00.000+01:00'
			})
		).toBe('darkorange');
		expect(
			color({
				TimeAtLocationWithSeconds: '2023-03-24T16:23:00.001+01:00',
				AdvertisedTimeAtLocation: '2023-03-24T16:11:00.000+01:00'
			})
		).toBe('orangered');
		expect(
			color({
				TimeAtLocationWithSeconds: '2023-03-24T16:20:00.001+01:00',
				AdvertisedTimeAtLocation: '2023-03-24T16:00:00.000+01:00'
			})
		).toBe('red');
	});
});
