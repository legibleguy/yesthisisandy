# Component Development Guide

## Overview of Components

This document describes each React component in the home section and how to use/modify them.

---

## 🏠 Home Component

**File:** `src/components/Home.jsx`

The main container component that orchestrates all sub-components.

### Usage
```jsx
import { Home } from './components/Home';

function App() {
  return <Home />;
}
```

### Props
None - this is a container component

### Responsibilities
- Renders all sub-components in proper order
- Manages overall layout with absolute positioning
- Handles logo display

---

## 📍 NavBar Component

**File:** `src/components/NavBar.jsx`

Displays navigation links and position subtitle at the top-left.

### Usage
```jsx
import { NavBar } from './components/NavBar';

<NavBar />
```

### Props
None - uses hardcoded links and text

### Features
- Three navigation links: LinkedIn, Itch, CV
- Recent position subtitle
- Hover effects on links

### Styling
- Located at top-left (left: 449px, top: 37px)
- Terminal Grotesque font
- Color: #034C3C

### Customization
To change links, edit `NavBar.jsx`:
```jsx
<a href="https://your-linkedin.com" target="_blank">linkedin</a>
```

---

## 📋 SectionHeader Component

**File:** `src/components/SectionHeader.jsx`

Displays the main section heading.

### Usage
```jsx
import { SectionHeader } from './components/SectionHeader';

<SectionHeader />
```

### Props
None - uses hardcoded text

### Features
- Bold Redaction 35 font
- Teal color (#034C3C)
- Positioned below NavBar

### Customization
Edit the text in `SectionHeader.jsx`:
```jsx
<h2 className="section-header">
  Your custom heading here
</h2>
```

---

## 📚 ProjectsList Component

**File:** `src/components/ProjectsList.jsx`

Manages the entire projects list container and fetches data.

### Usage
```jsx
import { ProjectsList } from './components/ProjectsList';

<ProjectsList />
```

### Props
None - fetches data from `public/data/projects.json`

### Features
- Fetches projects from JSON file
- Renders ProjectRow for each project
- Bordered container with 1px solid border
- Flex layout with vertical direction

### Data Source
File: `public/data/projects.json`

```json
[
  {
    "name": "Project Name",
    "description": "Description",
    "date": "Year"
  }
]
```

### Customization

**Change border style:**
Edit `ProjectsList.css`:
```css
.projects-list-border {
  border: 2px solid #000; /* Change border */
  background-color: #f5f5f5; /* Change background */
}
```

**Change data source:**
Modify `useEffect` in `ProjectsList.jsx`:
```jsx
fetch('/path/to/your/projects.json')
  .then(res => res.json())
  .then(data => setProjects(data))
```

---

## 🎯 ProjectRow Component

**File:** `src/components/ProjectRow.jsx`

Individual project entry row.

### Usage
```jsx
import { ProjectRow } from './components/ProjectRow';

<ProjectRow 
  title="Project Name"
  description="Description"
  year="2023"
/>
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Project title |
| `description` | string | Short description |
| `year` | string | Year or date |

### Features
- File icon
- Title (left-aligned)
- Description (center)
- Year (right-aligned)
- Flex layout for alignment
- Bottom border separator

### Icon
Uses `public/images/file-alt.png` - easily replaceable

### Customization

**Change icon:**
Replace the image path in `ProjectRow.jsx`:
```jsx
<img src="/images/your-icon.png" alt="icon" />
```

**Change layout:**
Adjust flex properties in `ProjectRow.css`:
```css
.project-row {
  display: grid;
  grid-template-columns: 30px 1fr 2fr 100px;
}
```

---

## ⭐ HeroIdentity Component

**File:** `src/components/HeroIdentity.jsx`

The decorative "YES this is andy" hero section.

### Usage
```jsx
import { HeroIdentity } from './components/HeroIdentity';

<HeroIdentity />
```

### Props
None - uses hardcoded text

### Features
- Blurred "yes" background text (opacity: 0.4)
- Beige highlight box
- "this is andy" layered text
- Positioned below projects list

### Styling Details
- Background blur: 2px
- Highlight color: #e8d4c4
- Main text color: #1a1a1a
- Subtitle color: #666

### Customization

**Change blur amount:**
Edit `HeroIdentity.css`:
```css
.hero-yes-blurred {
  filter: blur(4px); /* Increase blur */
}
```

**Change text:**
Edit `HeroIdentity.jsx`:
```jsx
<span className="hero-yes-blurred">custom text</span>
```

**Change highlight color:**
Edit `HeroIdentity.css`:
```css
.hero-highlight {
  background-color: #your-color;
}
```

---

## 🔗 FooterPrompt Component

**File:** `src/components/FooterPrompt.jsx`

Call-to-action prompt at the bottom.

### Usage
```jsx
import { FooterPrompt } from './components/FooterPrompt';

<FooterPrompt />
```

### Props
None - uses hardcoded text

### Features
- Underlined text
- Link to blog
- Rust/brown color (#7C3626)
- Terminal Grotesque font
- Large font size (24px)

### Customization

**Change link:**
Edit `FooterPrompt.jsx`:
```jsx
<a href="https://yourblog.com">your blog text</a>
```

**Change text:**
```jsx
<p className="footer-prompt">
  Your custom text here
  <a href="#link">with links</a>
</p>
```

**Change color:**
Edit `FooterPrompt.css`:
```css
.footer-prompt {
  color: #your-color;
}
```

---

## 🎨 Styling System

### Global Styles
File: `src/index.css`

Contains:
- Font imports
- Root CSS variables
- Base element styles
- Utility classes

### Component Styles
Each component has a corresponding `.css` file with scoped styles.

**Example structure:**
```css
.navbar { /* Component wrapper */ }
.nav-links { /* Sub-element */ }
.nav-links a { /* Specific element */ }
```

### CSS Variables (Consider Adding)

To improve maintainability, add CSS variables:

```css
:root {
  --color-primary: #034C3C;
  --color-secondary: #7C3626;
  --font-display: 'Redaction 35';
  --font-body: 'Terminal Grotesque';
  --spacing-unit: 8px;
}
```

Then use:
```css
.navbar {
  color: var(--color-primary);
  font-family: var(--font-body);
}
```

---

## 🔄 Component Communication

### Data Flow

```
Home (Props: none)
├── NavBar (Props: none) → hardcoded links
├── SectionHeader (Props: none) → hardcoded text
├── ProjectsList (Props: none) → fetches /data/projects.json
│   └── ProjectRow (Props: title, description, year) ← mapped from data
├── Logo (Props: none) → static image
├── HeroIdentity (Props: none) → hardcoded text
└── FooterPrompt (Props: none) → hardcoded text + link
```

### State Management

Currently using local component state with `useState` in `ProjectsList`:
```jsx
const [projects, setProjects] = useState([]);
```

If components grow more complex, consider:
- React Context API
- Zustand
- Redux

---

## 📝 Adding New Components

### Template

```jsx
// src/components/MyComponent.jsx
import './MyComponent.css';

export function MyComponent({ prop1, prop2 }) {
  return (
    <div className="my-component">
      <p>{prop1}</p>
      <p>{prop2}</p>
    </div>
  );
}
```

```css
/* src/components/MyComponent.css */
.my-component {
  /* Styles here */
}
```

### Integration

1. Create component files
2. Import in `Home.jsx`
3. Render in appropriate location
4. Add to `components/index.js` exports

---

## 🐛 Common Issues & Solutions

### Issue: Fonts not loading
**Solution:** Check that font files exist in `public/fonts/` and paths in `index.css` are correct.

### Issue: Projects not showing
**Solution:** Verify `public/data/projects.json` exists and has correct structure.

### Issue: Images not displaying
**Solution:** Ensure images are in `public/images/` and paths start with `/`.

### Issue: Styling not applied
**Solution:** Check CSS file is imported and class names match between JSX and CSS.

### Issue: Layout broken on different screen sizes
**Solution:** Add media queries to CSS files or use responsive units instead of fixed px values.

---

## 🚀 Best Practices

1. **Keep components focused** - One responsibility per component
2. **Use meaningful names** - Component names should describe what they do
3. **Document props** - Add comments explaining component props
4. **Separate concerns** - Keep styles in CSS files, logic in JSX
5. **Reuse components** - ProjectRow is used multiple times for each project
6. **Handle errors** - Add error handling to data fetches
7. **Optimize performance** - Use React DevTools to check for unnecessary renders

---

## 📚 References

- Figma Design: `references/home.png`
- Design Guide: `.github/instructions/`
- Component Instructions: `IMPLEMENTATION.md`
