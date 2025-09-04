# 🎵 Song Swiper

**Song Swiper** is a modern web app that lets you browse your Spotify playlists in a fun, Tinder-style swipe interface. Keep or pass songs to quickly curate your favorite tracks, then save your curated selection back to Spotify.  

The app is built entirely in the **frontend** (no backend required) and runs seamlessly on **GitHub Pages**.  

---

## 🌟 Features

1. **Spotify Login**
   - Secure login with your own Spotify account.
   - Uses OAuth (implicit grant flow) directly in the browser.
   - No server, no secrets exposed.

2. **Playlist Grid**
   - Displays all your Spotify playlists in a sleek, Spotify-inspired grid.
   - Playlist covers + names are shown.
   - Responsive layout works on desktop and mobile.

3. **Song Swiping**
   - Shuffle songs in a selected playlist.
   - Swipe (or click) **👍 Keep** to add to your curated list.
   - Swipe **👎 Pass** to skip.
   - Original playlists are never modified.

4. **Results Page**
   - Split view of **Kept Songs** and **Skipped Songs**.
   - One-click option to **create a new Spotify playlist** with all Kept Songs.

5. **Settings Page**
   - View account info.
   - Logout (clears your session).
   - Links to my socials:
     - [YouTube](https://www.youtube.com/@AKLJL64)
     - [X (Twitter)](https://x.com/AKLJL64)

6. **Design**
   - Inspired by Spotify’s aesthetic:
     - Green: `#1DB954`
     - Dark: `#191414`
     - Accent: `#282828`
   - Clean card layout, rounded corners, subtle hover effects.
   - Fully responsive.

---

## 📂 Project Structure

```

song-swiper/
│
├── index.html         # Login page
├── playlists.html     # Playlist selection page
├── swipe.html         # Song swiping interface
├── results.html       # Kept vs skipped songs
├── settings.html      # Settings / logout page
├── style.css          # Shared styling (Spotify-inspired)
├── auth.js            # Spotify login + token storage
├── playlists.js       # Fetch & display playlists
├── swipe.js           # Handle swipe logic
├── results.js         # Show results + add playlist
├── favicon.ico        # Favicon
│
└── README.md

```

---

## ⚙️ Setup Instructions

### 1. Fork / Clone Repo
Clone or fork this repository to your own GitHub account.  

### 2. Enable GitHub Pages
1. Go to your repository → **Settings → Pages**.  
2. Under **Branch**, select `main` and `/ (root)`.  
3. Save. Your site will be live at:  

```

[https://YOUR-USERNAME.github.io/song-swiper/](https://YOUR-USERNAME.github.io/song-swiper/)

```

### 3. Spotify Developer Setup
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).  
2. Create a new app.  
3. Copy your **Client ID**.  
4. Add this exact redirect URI in your app settings:  

```

[https://YOUR-USERNAME.github.io/song-swiper/index.html](https://YOUR-USERNAME.github.io/song-swiper/index.html)

````

5. Save changes.

### 4. Configure `auth.js`
Replace `CLIENT_ID` with your Spotify Client ID:

```javascript
const CLIENT_ID = "2557a72b59e140fe98c86ec8e8ec5854"; // your ID here
const REDIRECT_URI = "https://YOUR-USERNAME.github.io/song-swiper/index.html";
````

### 5. Commit & Deploy

Push all files to GitHub → your GitHub Pages site updates automatically.

---

## 🚀 Usage

1. Open the site → **Login with Spotify**.
2. Select a playlist from your grid.
3. Swipe songs left or right.
4. At the end, view **Results** and save your new playlist.
5. Manage account or logout from **Settings**.

---

## 💡 Notes

* Each visitor uses **their own Spotify account** — nothing is shared.
* GitHub Pages is static → all code runs in the browser.
* Spotify API rate limits apply.
* Currently only Spotify is supported (Apple Music / YouTube Music can be added later).

---

## ⚡ License

MIT License — free to fork, modify, and use.

---


