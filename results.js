const token = getAccessToken();

if (!token) {
    window.location.href = 'index.html';
}

const keptList = document.getElementById('keptList');
const skippedList = document.getElementById('skippedList');
const keptCount = document.getElementById('keptCount');
const skippedCount = document.getElementById('skippedCount');
const createPlaylistBtn = document.getElementById('createPlaylistBtn');
const playlistSuccess = document.getElementById('playlistSuccess');
const errorEl = document.getElementById('error');

const keptSongs = JSON.parse(localStorage.getItem('kept_songs') || '[]');
const skippedSongs = JSON.parse(localStorage.getItem('skipped_songs') || '[]');
const playlistName = localStorage.getItem('selected_playlist_name') || 'Unknown Playlist';

keptCount.textContent = keptSongs.length;
skippedCount.textContent = skippedSongs.length;

function displaySongs() {
    if (keptSongs.length === 0) {
        keptList.innerHTML = '<li style="color: #b3b3b3;">No songs kept</li>';
    } else {
        keptSongs.forEach(song => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${song.name}</strong><br>
                <span>${song.artists.map(a => a.name).join(', ')}</span>
            `;
            keptList.appendChild(li);
        });
    }
    
    if (skippedSongs.length === 0) {
        skippedList.innerHTML = '<li style="color: #b3b3b3;">No songs skipped</li>';
    } else {
        skippedSongs.forEach(song => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${song.name}</strong><br>
                <span>${song.artists.map(a => a.name).join(', ')}</span>
            `;
            skippedList.appendChild(li);
        });
    }
}

async function createPlaylist() {
    if (keptSongs.length === 0) {
        errorEl.textContent = 'No songs to add to playlist!';
        errorEl.style.display = 'block';
        return;
    }
    
    try {
        createPlaylistBtn.disabled = true;
        createPlaylistBtn.textContent = 'Creating...';
        
        // Get user ID
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const userData = await userResponse.json();
        
        // Create playlist
        const createResponse = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${playlistName} - Kept Songs`,
                description: 'Created with Song Swiper',
                public: false
            })
        });
        
        const newPlaylist = await createResponse.json();
        
        // Add tracks
        const uris = keptSongs.map(song => song.uri);
        
        // Spotify API allows max 100 tracks per request
        for (let i = 0; i < uris.length; i += 100) {
            const batch = uris.slice(i, i + 100);
            await fetch(`https://api.spotify.com/v1/playlists/${newPlaylist.id}/tracks`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uris: batch
                })
            });
        }
        
        playlistSuccess.textContent = `✅ Playlist "${newPlaylist.name}" created successfully with ${keptSongs.length} songs!`;
        playlistSuccess.style.display = 'block';
        createPlaylistBtn.textContent = '✓ Playlist Created';
        
    } catch (error) {
        console.error('Error:', error);
        errorEl.textContent = 'Failed to create playlist. Please try again.';
        errorEl.style.display = 'block';
        createPlaylistBtn.disabled = false;
        createPlaylistBtn.textContent = '➕ Add Kept Songs to New Playlist';
    }
}

createPlaylistBtn.addEventListener('click', createPlaylist);

displaySongs();
