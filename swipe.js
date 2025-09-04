const token = localStorage.getItem('spotify_auth_token');
const urlParams = new URLSearchParams(window.location.search);
const playlistId = urlParams.get('playlist');

if (!token || !playlistId) {
    window.location.href = 'index.html';
}

let songs = [];
let currentIndex = 0;
let keptSongs = [];
let skippedSongs = [];

async function loadSongs() {
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        songs = data.items.map(item => item.track).filter(track => track);
        
        // Shuffle songs
        for (let i = songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [songs[i], songs[j]] = [songs[j], songs[i]];
        }
        
        document.getElementById('loading').style.display = 'none';
        document.getElementById('swipeArea').style.display = 'block';
        showCurrentSong();
    } catch (error) {
        console.error('Error:', error);
        window.location.href = 'playlists.html';
    }
}

function showCurrentSong() {
    if (currentIndex >= songs.length) {
        showCompletionModal();
        return;
    }
    
    const song = songs[currentIndex];
    const card = document.getElementById('songCard');
    const progress = document.getElementById('progress');
    
    card.innerHTML = `
        <img src="${song.album.images[0]?.url}" alt="${song.name}">
        <h3>${song.name}</h3>
        <p>${song.artists.map(a => a.name).join(', ')}</p>
        <p class="album">${song.album.name}</p>
    `;
    
    progress.textContent = `Song ${currentIndex + 1} of ${songs.length}`;
}

function swipeSong(keep) {
    const song = songs[currentIndex];
    
    if (keep) {
        keptSongs.push(song);
    } else {
        skippedSongs.push(song);
    }
    
    currentIndex++;
    showCurrentSong();
}

function showCompletionModal() {
    localStorage.setItem('keptSongs', JSON.stringify(keptSongs));
    localStorage.setItem('skippedSongs', JSON.stringify(skippedSongs));
    document.getElementById('completionModal').style.display = 'flex';
}

// Event listeners
document.getElementById('keepBtn').addEventListener('click', () => swipeSong(true));
document.getElementById('passBtn').addEventListener('click', () => swipeSong(false));

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') swipeSong(true);
    if (e.key === 'ArrowLeft') swipeSong(false);
});

loadSongs();
