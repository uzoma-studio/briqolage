import { v4 as uuidv4 } from "uuid";
import { spotifyAuth } from "./utils/spotify";
  
const playlistIds = ['6goFMVAPb0YwQ26Tbt5ITX']

const handleGetPlaylist = (accessToken) => {

    return window.fetch(`https://api.spotify.com/v1/playlists/${playlistIds[0]}`, {
      method: 'GET',
	  headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	  }
    })
    .then((data) => data.json())
  }

{/*const getTracks = () => {	
	return spotifyAuth()
		.then((data) => {
			handleGetPlaylist(data.access_token)
				.then((res) => {
					getTrackInfo(res.tracks.items)
				})
	})
}*/}

const getTrackInfo = (songs) => {
	let tracks = []
	for (const {track} of songs) {
		tracks.push({
			name: track.name,
			audio: track.external_urls.spotify,
			artist: track.artists[0].name
		})
	}

	return tracks
}


function getTracks() {
	return [
		{
			cover:
				"https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
			artist: "Aso, Middle School, Aviino",
			audio: "https://mp3.chillhop.com/serve.php/?mp3=10075",
			color: ["#205950", "#2ab3bf"],
			id: uuidv4(),
			active: true,
		},
		{
			name: "Daylight",
			cover:
				"https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
			artist: "Aiguille",
			audio: "https://mp3.chillhop.com/serve.php/?mp3=9272",
			color: ["#EF8EA9", "#ab417f"],
			id: uuidv4(),
			active: false,
		},
		{
			name: "Keep Going",
			cover:
				"https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg",
			artist: "Swørn",
			audio: "https://mp3.chillhop.com/serve.php/?mp3=9222",
			color: ["#CD607D", "#c94043"],
			id: uuidv4(),
			active: false,
		},
		{
			name: "Nightfall",
			cover:
				"https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
			artist: "Aiguille",
			audio: "https://mp3.chillhop.com/serve.php/?mp3=9148",
			color: ["#EF8EA9", "#ab417f"],
			id: uuidv4(),
			active: false,
		},
		{
			name: "Reflection",
			cover:
				"https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg",
			artist: "Swørn",
			audio: "https://mp3.chillhop.com/serve.php/?mp3=9228",
			color: ["#CD607D", "#c94043"],
			id: uuidv4(),
			active: false,
		},
		{
			name: "Under the City Stars",
			cover:
				"https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
			artist: "Aso, Middle School, Aviino",
			audio: "https://mp3.chillhop.com/serve.php/?mp3=10074",
			color: ["#205950", "#2ab3bf"],
			id: uuidv4(),
			active: false,
		},
		//ADD MORE HERE
	];
}


export { getTracks };