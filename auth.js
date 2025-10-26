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

console.log('🎵 Song Swiper - Auth.js loaded');
console.log('Client ID:', CLIENT_ID);
console.log('Redirect URI:', REDIRECT_URI);
console.log('Current Page:', window.location.href);

function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

function getAccessToken() {
    // Check URL hash for token
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    if (params.get('access_token')) {
        const token = params.get('access_token');
        console.log('✅ Token found in URL hash');
        localStorage.setItem('spotify_access_token', token);
        window.location.hash = '';
        return token;
    }
    
    // Check localStorage
    const storedToken = localStorage.getItem('spotify_access_token');
    if (storedToken) {
        console.log('✅ Token found in localStorage');
    } else {
        console.log('❌ No token found');
    }
    return storedToken;
}

function redirectToSpotifyAuth() {
    console.log('🚀 Redirecting to Spotify auth...');
    
    const state = generateRandomString(16);
    localStorage.setItem('spotify_auth_state', state);
    
    const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
        response_type: 'token',
        client_id: CLIENT_ID,
        scope: SCOPES.join(' '),
        redirect_uri: REDIRECT_URI,
        state: state
    });
    
    console.log('Auth URL:', authUrl);
    console.log('⚠️ Make sure this redirect URI is in Spotify Dashboard:', REDIRECT_URI);
    
    // Add small delay to ensure console logs show
    setTimeout(() => {
        window.location.href = authUrl;
    }, 100);
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded');
    
    const currentPath = window.location.pathname;
    console.log('Current path:', currentPath);
    
    // Check if we're on the login page
    const isLoginPage = currentPath.includes('index.html') || 
                        currentPath === '/song-swiper/' || 
                        currentPath === '/song-swiper';
    
    if (isLoginPage) {
        console.log('📍 On login page');
        
        const token = getAccessToken();
        
        // If we have a token and no hash, redirect to playlists
        if (token && !window.location.hash) {
            console.log('🔄 Token exists, redirecting to playlists...');
            window.location.href = 'playlists.html';
            return;
        }
        
        // Setup login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            console.log('✅ Login button found');
            loginBtn.addEventListener('click', function(e) {
                console.log('🖱️ Login button clicked!');
                e.preventDefault();
                redirectToSpotifyAuth();
            });
        } else {
            console.error('❌ Login button NOT found!');
        }
    } else {
        // On other pages, check for token
        console.log('📍 On protected page');
        const token = getAccessToken();
        if (!token) {
            console.log('🔄 No token, redirecting to login...');
            window.location.href = 'index.html';
        }
    }
});
