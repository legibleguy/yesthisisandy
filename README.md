# Andy Solovyov - Portfolio Website

Portfolio website for game developer Andy Solovyov, showcasing projects, videos, and professional experience.

## 🚀 Deployment to GitHub Pages

This site is configured to deploy automatically to GitHub Pages. Follow these steps:

### Initial Setup

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"
   - Save the settings

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

3. **Automatic Deployment:**
   - The GitHub Actions workflow will automatically build and deploy your site
   - Check the "Actions" tab in your repository to monitor the deployment
   - Once complete, your site will be available at: `https://legibleguy.github.io/yesthisisandy/`

### Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the site
npm run build

# The built files will be in the 'dist' directory
# You can deploy these files to any static hosting service
```

### Important Configuration Notes

- **Base URL**: The site is configured with `base: '/yesthisisandy/'` in `vite.config.js`
- **Custom Domain**: If you're using a custom domain, change the base to `'/'` in `vite.config.js`
- **Branch**: The workflow deploys from the `main` branch. If your default branch is `master`, update `.github/workflows/deploy.yml`

## 🛠️ Local Development

### Prerequisites
- Node.js (v20 or higher recommended)
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
yesthisisandy/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/                     # Static assets (copied as-is)
│   ├── fonts/                  # Custom fonts
│   ├── media/                  # Game screenshots
│   ├── videos/                 # Video files
│   ├── logo.svg
│   └── logo_base.svg
├── src/
│   ├── main.js                 # Main JavaScript logic
│   ├── style.css               # Tailwind CSS styles
│   └── data.json               # Content data for hero section
├── index.html                  # Main HTML file
├── vite.config.js              # Vite configuration (includes base path)
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json
```

## 🎨 Technologies Used

- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No framework, pure JS
- **GitHub Actions** - Automated deployment

## 🐛 Troubleshooting

### Assets not loading on GitHub Pages

If images, videos, or styles aren't loading after deployment:

1. Verify the `base` setting in `vite.config.js` matches your repository name
2. Check that all asset paths in your code use relative paths or `import.meta.env.BASE_URL`
3. Clear your browser cache and hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Videos not playing

- Ensure video files are in the `public/videos/` directory
- Check browser console for any CORS or loading errors
- Verify video file formats are web-compatible (MP4 with H.264 codec recommended)

### Deployment failing

1. Check the Actions tab in GitHub for error messages
2. Verify `package.json` has all required dependencies
3. Ensure the workflow has proper permissions (Settings → Actions → General → Workflow permissions)

## 📝 License

© Andy Solovyov, 2026
