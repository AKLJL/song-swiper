# Song Swiper

A Spotify-inspired web app that lets you swipe through your playlists **Tinder-style**! Keep the songs you love, skip the ones you don't, and create a new playlist from your favorites.

---

## Features

- **Spotify Authentication** - Securely login with your Spotify account
- **Playlist Selection** - Browse all your playlists with beautiful cover art
- **Tinder-Style Swiping** - Swipe through songs with Keep/Pass buttons
- **Shuffled Songs** - Songs are randomized for a fresh experience
- **Results Page** - See your kept and skipped songs
- **Create Playlists** - Add kept songs to a new Spotify playlist
- **Settings Page** - View user info and logout
- **Dark Theme** - Modern Spotify-inspired design
- **Mobile Responsive** - Works great on all devices

---

## File Structure

```
song-swiper/
│
├── index.html         # Login page
├── playlists.html     # Playlist selection page
├── swipe.html         # Song swiping interface
├── results.html       # Kept vs skipped songs
├── settings.html      # Settings / logout page
├── style.css          # Shared styling
├── auth.js            # Spotify login + token storage
├── playlists.js       # Fetch & display playlists
├── swipe.js           # Handle swipe logic
├── results.js         # Show results + add playlist
├── favicon.ico        # Favicon
│
└── README.md
```

---

## Setup Instructions

### 1. Create Repository

1. Create a new GitHub repository named `song-swiper`
2. Make it **public**
3. Clone it to your local machine or upload files directly

### 2. Add Files

Upload all the files from this project to your repository.

### 3. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select `main` branch
3. Click **Save**
4. Your site will be available at: `https://YOUR_USERNAME.github.io/song-swiper/`

### 4. Configure Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **Create an App**
3. Fill in:
   - **App Name**: Song Swiper
   - **App Description**: Tinder-style playlist swiper
   - **Redirect URI**: `https://YOUR_USERNAME.github.io/song-swiper/index.html`
   - **Important**: Make sure the redirect URI ends with `/index.html`
4. Copy your **Client ID** and replace it in `auth.js`:
   ```javascript
   const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
   ```
5. Also update the `REDIRECT_URI` in `auth.js` to match your GitHub Pages URL

### 5. Deploy

1. Commit and push all files to GitHub
2. Wait a few minutes for GitHub Pages to deploy
3. Visit your app at `https://YOUR_USERNAME.github.io/song-swiper/`

---

## How to Use

1. **Login** - Click "Login with Spotify" on the home page
2. **Choose Playlist** - Select any of your Spotify playlists
3. **Swipe** - Use 👍 Keep or 👎 Pass buttons (or arrow keys!)
4. **View Results** - See your kept and skipped songs
5. **Create Playlist** - Add kept songs to a new Spotify playlist

---

## Privacy & Security

- **Frontend-only** - No backend server required
- **Your data stays private** - All processing happens in your browser
- **Secure OAuth** - Uses official Spotify authentication
- **No data collection** - We don't store or track anything
- **Safe for GitHub Pages** - Designed to work with static hosting

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Spotify Web API
- GitHub Pages

---

## Social Media

- [YouTube - @AKLJL64](https://www.youtube.com/@AKLJL64)
- [X/Twitter - @AKLJL64](https://x.com/AKLJL64)

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 AKLJL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Enjoy Swiping!

Built with ❤️ by [AKLJL](https://github.com/AKLJL)
```
