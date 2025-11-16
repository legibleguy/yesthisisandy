# Quick Reference Card

## 🚀 Getting Started (30 seconds)

```bash
cd /Users/andy/Developer/yesthisisandy
npm install
npm run dev
```

Then open: **http://localhost:5173**

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `src/components/Home.jsx` | Main component |
| `src/App.jsx` | App root |
| `src/main.jsx` | Entry point |
| `public/data/projects.json` | Project data |
| `public/images/` | Images (logo, icons) |
| `public/fonts/` | Custom fonts |

---

## 🎨 Component Map

```
Home
├── NavBar              → Top nav with links
├── SectionHeader       → "software engineering..." title
├── ProjectsList        → Fetches & displays projects
│   └── ProjectRow x9   → Individual project entry
├── Logo Image          → Main logo
├── HeroIdentity        → "YES this is andy" hero
└── FooterPrompt        → Blog link CTA
```

---

## 📝 Edit Project Data

File: `public/data/projects.json`

```json
{
  "name": "Project Title",
  "description": "Short description",
  "date": "Year/Date"
}
```

Add/remove items, changes auto-reload in dev!

---

## 🎨 Color Palette

```
#034C3C  →  Teal (primary text/links)
#7C3626  →  Rust (footer links)
#1a1a1a  →  Dark (main text)
#2D080A  →  Dark brown (borders)
#e8d4c4  →  Beige (highlights)
#666    →  Muted gray
```

---

## 🔤 Fonts

```
Redaction 35        →  Headings, displays
Terminal Grotesque  →  Body text, UI
```

Located: `public/fonts/`

---

## 🛠️ Common Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm install       # Install dependencies
```

---

## 📱 Customization Quick Tips

### Change NavBar Links
Edit: `src/components/NavBar.jsx` (lines 7-15)

### Change Section Header Text
Edit: `src/components/SectionHeader.jsx` (line 5)

### Change Hero Identity Text
Edit: `src/components/HeroIdentity.jsx` (lines 6-8)

### Change Footer Prompt
Edit: `src/components/FooterPrompt.jsx` (lines 5-6)

### Add/Remove Projects
Edit: `public/data/projects.json`

### Change Colors
Edit: `src/index.css` or individual component CSS files

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Fonts not loading | Check `public/fonts/` exists |
| Projects not showing | Check `public/data/projects.json` |
| Images missing | Check `public/images/` exists |
| Port 5173 in use | Change in `vite.config.js` |
| Styles not applying | Clear browser cache (Ctrl+Shift+Del) |

---

## 📚 Documentation

- **HOME_SECTION.md** - Complete setup guide
- **COMPONENT_GUIDE.md** - Detailed component docs
- **IMPLEMENTATION.md** - Technical details
- **PROJECT_SUMMARY.md** - Project overview

---

## 🎯 Component Props

### ProjectRow
```jsx
<ProjectRow 
  title="Project Name"
  description="Description"
  year="2023"
/>
```

All other components take no props.

---

## 🌐 Deployment

### Build
```bash
npm run build
```

### Deploy dist/ to:
- GitHub Pages
- Vercel (`vercel deploy dist`)
- Netlify (drag & drop `dist` folder)
- AWS S3
- Any static host

---

## 💡 Pro Tips

1. **HMR**: Changes auto-reload in dev (no refresh needed)
2. **DevTools**: Open with F12 to inspect
3. **Network**: Slow 3G throttling to test performance
4. **Console**: Check for errors with F12 → Console
5. **Mobile**: Preview with DevTools device toolbar

---

## 🔗 Resources

- Vite Docs: https://vitejs.dev
- React Docs: https://react.dev
- Figma Design: See `references/home.png`

---

## ✅ Checklist Before Deploy

- [ ] All projects showing correctly
- [ ] Links working
- [ ] Images loading
- [ ] Fonts displaying
- [ ] No console errors
- [ ] Looks good on target device
- [ ] Built with `npm run build`
- [ ] `dist/` folder ready

---

**Ready to go!** 🚀
