const token = localStorage.getItem('spotify_auth_token');

if (!token) {
    window.location.href = 'index.html';
}

async function loadPlaylists() {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        displayPlaylists(data.items);
    } catch (error) {
        console.error('Error:', error);
        localStorage.removeItem('spotify_auth_token');
        window.location.href = 'index.html';
    }
}

function displayPlaylists(playlists) {
    const loading = document.getElementById('loading');
    const grid = document.getElementById('playlistGrid');
    
    loading.style.display = 'none';
    
    playlists.forEach(playlist => {
        const card = document.createElement('div');
        card.className = 'playlist-card';
        card.innerHTML = `
            <img src="${playlist.images[0]?.url || ''}" alt="${playlist.name}">
            <h3>${playlist.name}</h3>
            <p>By ${playlist.owner.display_name}</p>
        `;
        
        card.addEventListener('click', () => {
            window.location.href = `swipe.html?playlist=${playlist.id}`;
        });
        
        grid.appendChild(card);
    });
}

loadPlaylists();
