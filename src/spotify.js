import axios from 'axios';
const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "590e239df9b74f9890f70c6fb9847f49";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-library-read", "playlist-read-private"];


export const LoginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
   "%20" 
)}$response_type=token&show_dialog=true`;


const apiClient = axios.create