const CLIENT_ID = '2557a72b59e140fe98c86ec8e8ec5854';
const REDIRECT_URI = 'https://akljl.github.io/song-swiper/index.html';
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private'
];

function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

function getAccessToken() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    if (params.get('access_token')) {
        const token = params.get('access_token');
        localStorage.setItem('spotify_access_token', token);
        window.location.hash = '';
        return token;
    }
    
    return localStorage.getItem('spotify_access_token');
}

function redirectToSpotifyAuth() {
    const state = generateRandomString(16);
    localStorage.setItem('spotify_auth_state', state);
    
    const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
        response_type: 'token',
        client_id: CLIENT_ID,
        scope: SCOPES.join(' '),
        redirect_uri: REDIRECT_URI,
        state: state
    });
    
    window.location.href = authUrl;
}

// Auto-redirect if on login page and already have token
if (window.location.pathname.includes('index.html') || window.location.pathname === '/song-swiper/' || window.location.pathname === '/song-swiper') {
    const token = getAccessToken();
    
    if (token && !window.location.hash) {
        window.location.href = 'playlists.html';
    }
    
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', redirectToSpotifyAuth);
    }
}

// Check auth on other pages
if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/song-swiper/' && window.location.pathname !== '/song-swiper') {
    const token = getAccessToken();
    if (!token) {
        window.location.href = 'index.html';
    }
}
