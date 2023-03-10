import { differenceInSeconds, parseISO } from 'date-fns';

export default function color(a) {
	const delay = seconds();

	return `rgb(${r(delay)},${g(delay)},${b(delay)})`;

	function r(d) {
		if (d < 30) return 0;
		return 256;
	}

	function g(d) {
		if (d < 120) return 256;
		if (d < 240) return 128 + ((240 - d) * 128) / 120;
		const span = 960;
		if (d < 240 + span) return ((240 + span - d) * 128) / span;
		return 0;
	}

	function b(d) {
		if (d < 30) return 0;
		if (d < 120) return 256;
		return 0;
	}

	function seconds() {
		return differenceInSeconds(
			parseISO(a.TimeAtLocationWithSeconds),
			parseISO(a.AdvertisedTimeAtLocation)
		);
	}
}
