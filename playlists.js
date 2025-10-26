const token = getAccessToken();

if (!token) {
    window.location.href = 'index.html';
}

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const playlistsGrid = document.getElementById('playlistsGrid');

async function fetchPlaylists() {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch playlists');
        }
        
        const data = await response.json();
        displayPlaylists(data.items);
        
    } catch (error) {
        console.error('Error:', error);
        loadingEl.style.display = 'none';
        errorEl.textContent = 'Failed to load playlists. Please try logging in again.';
        errorEl.style.display = 'block';
    }
}

function displayPlaylists(playlists) {
    loadingEl.style.display = 'none';
    
    if (playlists.length === 0) {
        playlistsGrid.innerHTML = '<p style="text-align: center; color: #b3b3b3;">No playlists found.</p>';
        return;
    }
    
    playlists.forEach(playlist => {
        const card = document.createElement('div');
        card.className = 'playlist-card';
        
        const img = playlist.images && playlist.images.length > 0 
            ? playlist.images[0].url 
            : 'https://via.placeholder.com/200?text=No+Image';
        
        card.innerHTML = `
            <img src="${img}" alt="${playlist.name}">
            <h3>${playlist.name}</h3>
        `;
        
        card.addEventListener('click', () => {
            localStorage.setItem('selected_playlist_id', playlist.id);
            localStorage.setItem('selected_playlist_name', playlist.name);
            window.location.href = 'swipe.html';
        });
        
        playlistsGrid.appendChild(card);
    });
}

fetchPlaylists();
