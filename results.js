const token = localStorage.getItem('spotify_auth_token');

if (!token) {
    window.location.href = 'index.html';
}

const keptSongs = JSON.parse(localStorage.getItem('keptSongs') || '[]');
const skippedSongs = JSON.parse(localStorage.getItem('skippedSongs') || '[]');

function displayResults() {
    const keptContainer = document.getElementById('keptSongs');
    const skippedContainer = document.getElementById('skippedSongs');
    
    document.getElementById('keptCount').textContent = keptSongs.length;
    document.getElementById('skippedCount').textContent = skippedSongs.length;
    
    keptSongs.forEach(song => {
        keptContainer.appendChild(createSongItem(song));
    });
    
    skippedSongs.forEach(song => {
        skippedContainer.appendChild(createSongItem(song));
    });
    
    // Clean up localStorage
    localStorage.removeItem('keptSongs');
    localStorage.removeItem('skippedSongs');
}

function createSongItem(song) {
    const item = document.createElement('div');
    item.className = 'song-item';
    item.innerHTML = `
        <img src="${song.album.images[0]?.url}" alt="${song.name}">
        <div>
            <h4>${song.name}</h4>
            <p>${song.artists.map(a => a.name).join(', ')}</p>
        </div>
    `;
    return item;
}

async function createPlaylist() {
    if (keptSongs.length === 0) return;
    
    try {
        // Get user ID
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const user = await userResponse.json();
        
        // Create playlist
        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `My Swiped Songs - ${new Date().toLocaleDateString()}`,
                description: 'Songs I kept from Song Swiper!',
                public: false
            })
        });
        
        const playlist = await playlistResponse.json();
        
        // Add tracks
        const trackUris = keptSongs.map(song => `spotify:track:${song.id}`);
        await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris: trackUris })
        });
        
        alert('Playlist created successfully!');
        document.getElementById('createPlaylistBtn').textContent = 'Playlist Created!';
        document.getElementById('createPlaylistBtn').disabled = true;
        
    } catch (error) {
        console.error('Error creating playlist:', error);
        alert('Error creating playlist. Please try again.');
    }
}

document.getElementById('createPlaylistBtn').addEventListener('click', createPlaylist);
displayResults();
