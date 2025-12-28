# Love Proposal Website 💖

A magical, fully responsive, and romantic website to propose to your special someone.

## ✨ Features
- **Romantic Hero Section**: Typing animation and floating hearts.
- **Our Story Timeline**: Scroll-revealed memories.
- **Why I Love You**: Interactive flip cards.
- **Photo Gallery**: Romantic grid with heart overlays.
- **Love Letter**: Handwritten style emotional note.
- **The Big Question**: "Will You Be Mine?" with a playful "No" button that runs away.
- **Celebration**: Confetti explosion and music support.

## 🚀 How to Run Locally
1.  **Install Dependencies** (if not done):
    ```bash
    npm install
    ```
2.  **Start the Website**:
    ```bash
    npm run dev
    ```
    Click the link (usually `http://localhost:5173`) to view it.

## 🎨 How to Customize (Important!)

### 1. Add Your Photos
1.  Go to the `index.html` file.
2.  Search for `<!-- gallery-section -->` or `timeline-content`.
3.  Replace the `src` links (Unsplash placeholders) with your own photo files.
    *   *Tip:* Put your photos in a `public/images` folder for easier organization.

### 2. Add Your Song 🎵
1.  Find a romantic MP3 file (e.g., `perfect.mp3`).
2.  Place it in the project root folder.
3.  Open `index.html`.
4.  Find `<audio id="bg-music" loop>`.
5.  Update the source: `<source src="perfect.mp3" type="audio/mp3">`.

### 3. Change the Text
*   **Timeline**: Edit the text inside the `timeline-content` divs in `index.html`.
*   **Love Letter**: Edit the text inside the `paper` div.

## 📱 Deployment
To share this with her online:
1.  Run `npm run build`.
2.  Deploy the `dist` folder to Netlify, Vercel, or GitHub Pages.

Good luck! She will love it. 💍❤️
