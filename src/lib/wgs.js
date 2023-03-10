export function east(location, locations) {
	const match = /POINT \(([\d\\.]+) ([\d\\.]+)\)/.exec(locations[location]?.Geometry?.WGS84);
	return match ? parseFloat(match[1]) : 0;
}

export function north(location, locations) {
	const match = /POINT \(([\d\\.]+) ([\d\\.]+)\)/.exec(locations[location]?.Geometry?.WGS84);
	return match ? parseFloat(match[2]) : 0;
}
