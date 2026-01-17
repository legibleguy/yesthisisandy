# GitHub Pages Deployment Fixes - Summary

## Issues Identified

Your website was broken on GitHub Pages because of **absolute path issues**. When deployed to `https://username.github.io/yesthisisandy/`, all assets referenced with paths starting with `/` were resolving to the root domain instead of the subdirectory.

### Specific Problems:

1. **Absolute paths in HTML** - `/logo.svg`, `/videos/...` resolved to `https://username.github.io/logo.svg` instead of `https://username.github.io/yesthisisandy/logo.svg`
2. **No Vite base configuration** - Vite didn't know about the subdirectory deployment
3. **Hardcoded paths in JavaScript** - Video and image sources weren't using the base URL

## Fixes Applied

### 1. Created `vite.config.js`
- Set `base: '/yesthisisandy/'` to handle GitHub Pages subdirectory
- Configured proper build output settings
- This automatically prefixes all static assets in HTML

### 2. Updated `src/main.js`
- Added `const BASE_URL = import.meta.env.BASE_URL;`
- Updated all dynamic asset loading to use `BASE_URL + path.replace(/^\//, '')`
- Fixed:
  - Main video sources
  - Background video sources  
  - Screenshot image sources

### 3. Created `.github/workflows/deploy.yml`
- Automated GitHub Actions workflow
- Builds and deploys on every push to main
- Uses official GitHub Pages actions

### 4. Created `README.md`
- Complete deployment instructions
- Troubleshooting guide
- Local development setup

## How to Deploy

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Fix GitHub Pages deployment"
   git push origin main
   ```

3. **Wait for deployment:**
   - Check the Actions tab for progress
   - Site will be live at: `https://legibleguy.github.io/yesthisisandy/`

## Testing Locally

You can preview the production build locally:

```bash
npm run build
npm run preview
```

This will serve the built site with the correct base path, simulating the GitHub Pages environment.

## What Changed in the Build

**Before:**
- Assets referenced as `/logo.svg`
- Videos loaded from `/videos/file.mp4`
- Would work locally but break on GitHub Pages

**After:**
- Assets referenced as `/yesthisisandy/logo.svg`
- Videos loaded from `/yesthisisandy/videos/file.mp4`
- Works both locally (with preview) and on GitHub Pages

## Files Modified

- ✅ Created `vite.config.js`
- ✅ Updated `src/main.js` (added BASE_URL support)
- ✅ Created `.github/workflows/deploy.yml`
- ✅ Created `README.md`
- ✅ Rebuilt `dist/` directory with correct paths

## Next Steps

1. Commit and push all changes
2. Verify GitHub Actions workflow runs successfully
3. Check your live site at the GitHub Pages URL
4. If using a custom domain, update `base: '/'` in `vite.config.js`
