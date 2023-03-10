import { error } from '@sveltejs/kit';
import { formatISO, sub } from 'date-fns';
import locations from '$lib/filtered.json';
import currentTrains from '$lib/currentTrains.js';
import _ from 'lodash';
import branchDivider from '$lib/branchDivider.js';

// noinspection JSUnusedGlobalSymbols
export const load = async ({ params }) => {
	const response = await fetchAnnouncements(params);
	const trains = currentTrains(locations, response);
	const grouped = _.groupBy(trains, branchDivider(locations));

	return {
		trains,
		...grouped
	};
};

async function fetchAnnouncements({ direction }) {
	console.time('fetch');
	const r = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
		method: 'POST',
		body: getBody(direction),
		headers: {
			'Content-Type': 'application/xml',
			Accept: 'application/json'
		}
	});
	console.timeEnd('fetch');
	if (!r.ok) {
		console.log(await r.text());
		throw error(r.status, r.statusText);
	}

	const { RESPONSE } = await r.json();
	const [announcements] = RESPONSE.RESULT;
	return announcements.TrainAnnouncement;
}

const locationSignature = [
	'Söd,Öte,Rön,Tu,Tul,Flb,Hu,Sta',
	'Äs,Åbe,Sst,Sci,Sod',
	'So,Udl,Hel,Sol,Hgv,Nvk,R,Upv,Rs,Mr',
	'Nyc,Gdv,Ngd,Öso,Ss,Hfa,Ts,Kda,Vhe,Jbo,Hnd,Vga,Skg,Tåd,Fas',
	'Sub,Spå,Bkb,Jkb,Khä'
];
const signatures = locationSignature.join(',');

function getBody(direction) {
	const now = Date.now();
	const since = formatISO(sub(now, { minutes: 16 }));
	return `
        <REQUEST>
            <LOGIN authenticationkey='${process.env.TRAFIKVERKET_API_KEY}'/>
            <QUERY sseurl='false' objecttype='TrainAnnouncement' orderby='TimeAtLocationWithSeconds' schemaversion='1.6'>
                <FILTER>
                    <OR>
                        <AND>
                            <IN name='LocationSignature' value='${signatures}'/>
                            <EQ name='ProductInformation.Code' value='PNA054'/>
                        </AND>
                        <IN name='LocationSignature' value='Tmö,Kmy,Skby,Bra,Gau,Södy,Uts,Kng,Hön,Huv,Duo'/>
                    </OR>
                    <LIKE name='AdvertisedTrainIdent' value='/[${
											direction === 'n' ? '02468' : '13579'
										}]$/'/>
                    <GT name='TimeAtLocation' value='${since}'/>
                </FILTER>
                <INCLUDE>ActivityType</INCLUDE>
                <INCLUDE>AdvertisedTrainIdent</INCLUDE>
                <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
                <INCLUDE>LocationSignature</INCLUDE>
                <INCLUDE>ProductInformation</INCLUDE>
                <INCLUDE>TimeAtLocation</INCLUDE>
                <INCLUDE>TimeAtLocationWithSeconds</INCLUDE>
                <INCLUDE>ToLocation</INCLUDE>
            </QUERY>
        </REQUEST>`;
}
