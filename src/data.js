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

const getTracks = () => {	
	return spotifyAuth()
		.then((data) => {
			handleGetPlaylist(data.access_token)
				.then((res) => {
					getTrackInfo(res.tracks.items)
				})
	})
}

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

export { getTracks };
