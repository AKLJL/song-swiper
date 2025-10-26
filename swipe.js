const token = getAccessToken();

if (!token) {
    window.location.href = 'index.html';
}

const playlistId = localStorage.getItem('selected_playlist_id');
if (!playlistId) {
    window.location.href = 'playlists.html';
}

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const swipeContainer = document.getElementById('swipeContainer');
const completeMessage = document.getElementById('completeMessage');

const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumName = document.getElementById('albumName');
const currentIndexEl = document.getElementById('currentIndex');
const totalSongsEl = document.getElementById('totalSongs');
const progressFill = document.getElementById('progressFill');

const passBtn = document.getElementById('passBtn');
const keepBtn = document.getElementById('keepBtn');

let songs = [];
let currentIndex = 0;
let keptSongs = [];
let skippedSongs = [];

async function fetchPlaylistTracks() {
    try {
        let allTracks = [];
        let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        
        while (url) {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch tracks');
            }
            
            const data = await response.json();
            allTracks = allTracks.concat(data.items);
            url = data.next;
        }
        
        // Filter out null tracks and extract track info
        songs = allTracks
            .filter(item => item.track && item.track.id)
            .map(item => item.track);
        
        // Shuffle songs
        shuffleArray(songs);
        
        if (songs.length === 0) {
            throw new Error('No songs found in playlist');
        }
        
        startSwiping();
        
    } catch (error) {
        console.error('Error:', error);
        loadingEl.style.display = 'none';
        errorEl.textContent = 'Failed to load songs. Please try again.';
        errorEl.style.display = 'block';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startSwiping() {
    loadingEl.style.display = 'none';
    swipeContainer.style.display = 'block';
    totalSongsEl.textContent = songs.length;
    displayCurrentSong();
}

function displayCurrentSong() {
    if (currentIndex >= songs.length) {
        showComplete();
        return;
    }
    
    const song = songs[currentIndex];
    
    albumArt.src = song.album.images && song.album.images.length > 0 
        ? song.album.images[0].url 
        : 'https://via.placeholder.com/300?text=No+Image';
    songTitle.textContent = song.name;
    artistName.textContent = song.artists.map(a => a.name).join(', ');
    albumName.textContent = song.album.name;
    
    currentIndexEl.textContent = currentIndex + 1;
    
    const progress = ((currentIndex + 1) / songs.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function handleKeep() {
    keptSongs.push(songs[currentIndex]);
    nextSong();
}

function handlePass() {
    skippedSongs.push(songs[currentIndex]);
    nextSong();
}

function nextSong() {
    currentIndex++;
    displayCurrentSong();
}

function showComplete() {
    swipeContainer.style.display = 'none';
    completeMessage.style.display = 'block';
    
    // Save results
    localStorage.setItem('kept_songs', JSON.stringify(keptSongs));
    localStorage.setItem('skipped_songs', JSON.stringify(skippedSongs));
}

passBtn.addEventListener('click', handlePass);
keepBtn.addEventListener('click', handleKeep);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        handlePass();
    } else if (e.key === 'ArrowRight') {
        handleKeep();
    }
});

fetchPlaylistTracks();
