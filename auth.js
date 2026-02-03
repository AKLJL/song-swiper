const CLIENT_ID = '2557a72b59e140fe98c86ec8e8ec5854';
const REDIRECT_URI = new URL('index.html', window.location.href).toString();
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

function buildAuthUrl(state) {
    const params = new URLSearchParams({
        response_type: 'token',
        client_id: CLIENT_ID,
        scope: SCOPES.join(' '),
        redirect_uri: REDIRECT_URI,
        state: state,
        show_dialog: true
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function redirectToSpotifyAuth() {
    const state = generateRandomString(16);
    localStorage.setItem('spotify_auth_state', state);
    
    const authUrl = buildAuthUrl(state);
    
    console.log('Redirecting to:', authUrl);
    
    window.location.href = authUrl;
}

// Initialize when DOM is ready
window.addEventListener('load', function() {
    const isLoginPage = window.location.pathname.includes('index.html') || 
                        window.location.pathname.endsWith('/song-swiper/') || 
                        window.location.pathname.endsWith('/song-swiper');
    
    if (isLoginPage) {
        // Check if we have a token
        const token = getAccessToken();
        
        if (token && !window.location.hash) {
            // Redirect to playlists
            window.location.href = 'playlists.html';
            return;
        }
        
        // Setup login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.onclick = function() {
                console.log('Login button clicked');
                redirectToSpotifyAuth();
                return false; // Prevent any default action
            };
        }

        const testLink = document.getElementById('testAuthLink');
        if (testLink) {
            testLink.href = buildAuthUrl('test123');
        }
    } else {
        // Check auth on other pages
        const token = getAccessToken();
        if (!token) {
            window.location.href = 'index.html';
        }
    }
});
