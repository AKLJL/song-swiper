const CLIENT_ID = '2557a72b59e140fe98c86ec8e8ec5854'; // Your Spotify Client ID
const REDIRECT_URI = 'https://akljl.github.io/song-swiper/'; // Change this to your GitHub Pages URL
const SCOPES = [
    'playlist-read-private',
    'playlist-modify-public', 
    'playlist-modify-private',
    'user-read-email',
    'user-read-private'
];

// Check if returning from Spotify with auth token
function handleCallback() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    
    if (token) {
        localStorage.setItem('spotify_auth_token', token);
        window.location.hash = '';
        window.location.href = 'playlists.html';
    }
}

// Redirect to Spotify authorization
function login() {
    const authUrl = `https://accounts.spotify.com/authorize?` +
        `client_id=${CLIENT_ID}&` +
        `response_type=token&` +
        `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
        `scope=${encodeURIComponent(SCOPES.join(' '))}`;
    
    window.location.href = authUrl;
}

// Check for existing token or callback
window.addEventListener('load', () => {
    if (window.location.hash) {
        handleCallback();
    } else if (localStorage.getItem('spotify_auth_token')) {
        window.location.href = 'playlists.html';
    }
    
    document.getElementById('loginBtn').addEventListener('click', login);
});
