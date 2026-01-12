# Languages 4 Website Rebuild

> Marketing website for Languages 4 - Indigenous language reclamation through custom software and land-based curriculum.

**Live Site:** https://wonderful-meringue-8520b4.netlify.app  
**Framework:** Astro + Tailwind CSS  
**Deployment:** Netlify (manual deploys to conserve credits)

---

## 🎯 Project Status

### ✅ Completed

**Foundation & Design System**
- [x] Migrated from WordPress/Bootstrap to Astro
- [x] Configured Tailwind CSS v3 with custom design system
- [x] Created comprehensive color palette (9 brand colors with scales)
- [x] Implemented fluid typography system (responsive font sizes)
- [x] Set up custom spacing, shadows, and transitions
- [x] Configured SEO meta tags and structured data

**Navigation & Layout**
- [x] Built modern right-side fixed navigation component
- [x] Implemented triple-pulse animated hamburger menu
- [x] Created slide-out menu panel with toggle functionality
- [x] Added click-outside and escape key to close menu
- [x] Built clean 3-column footer component
- [x] Configured MainLayout with proper spacing

**Deployment**
- [x] Connected to GitHub repository
- [x] Set up Netlify deployment pipeline
- [x] Achieved 99/100 desktop performance score
- [x] Disabled auto-deploy to conserve build credits

---

### 🚧 In Progress

**Hero Section**
- [ ] Rebuild rotated mosaic with Tailwind utilities
- [ ] Remove dependency on legacy `landing-page.css`
- [ ] Optimize animations and transitions
- [x] Current version displays with temporary CSS

**Content Pages**
- [ ] About page (What Are Languages 4?)
- [ ] Services page
- [ ] Contact page
- [ ] Signature Collections page
- [ ] Indigenous Ancestors page
- [ ] Newsletter signup page

---

### 📋 Planned

**Blog System**
- [ ] Set up Astro Content Collections
- [ ] Migrate 50+ blog posts from .php/HTML to markdown
- [ ] Create blog post template
- [ ] Implement categories and tags
- [ ] Add RSS feed

**Optimization**
- [ ] Remove all legacy CSS files
- [ ] Optimize images (convert to WebP, use Astro Image component)
- [ ] Address PageSpeed render-blocking resources
- [ ] Implement lazy loading for images

**Integrations**
- [ ] Google Analytics
- [ ] Microsoft Clarity
- [ ] Constant Contact newsletter integration (~300 subscribers)
- [ ] Contact form functionality

---

## 🐛 Known Issues

**Images**
- `ladies_haka.webp` path incorrect in index.astro line 92 (should be `/fixed/` not `/random/`)
- Some random showcase images return 404s

**CSS**
- Temporarily using `/public/landing-page.css` for hero section
- Will be removed after Tailwind rebuild

**Mobile**
- Hero section needs responsive optimization
- Some spacing needs adjustment for smaller screens

---

## 🎨 Design System

### Brand Colors
- **Primary (Teal):** `#183e4b` - Main brand color
- **Accent (Orange):** `#c7522a` - CTAs and highlights
- **Blue:** `#005485` - Links and secondary actions
- **Red:** `#d74a49` - Alerts
- **Green:** `#74a892` - Success states
- **Neutrals:** Gray scale for UI
- **Warm Accents:** Cream `#fbf2c4`, Wheat `#e5c185`

### Typography
- **Display Font:** Neue Kabel (Adobe Typekit) - Headings
- **Body Font:** Bahnschrift / system fonts - Body text
- **Fluid Sizing:** `text-hero` (40-80px), `text-display` (32-56px), etc.

### Key Utilities
- **Shadows:** `shadow-brand`, `shadow-brand-teal`, `shadow-brand-orange`
- **Transitions:** `duration-brand` (200ms), `ease-brand`
- **Border Radius:** `rounded-brand` (6px)
- **Spacing:** Custom scale with brand-specific values

---

## 🚀 Development

### Local Development
```bash
npm run dev
# Opens http://localhost:4321
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
**Auto-deploy is disabled.** To deploy:
1. Push changes to GitHub: `git push origin main`
2. Go to Netlify dashboard → Trigger deploy manually
3. Deploy only at milestones to conserve build credits

---

## 📁 Project Structure

```
languages4-site/
├── public/              # Static assets
│   ├── images/         # Site images
│   │   ├── showcase/   # Hero section images
│   │   │   ├── fixed/  # Hero images (always shown)
│   │   │   └── random/ # Rotating community images
│   ├── landing-page.css # Legacy CSS (temporary)
│   └── *.css           # Other legacy files
├── src/
│   ├── components/     # Reusable components
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   ├── BaseHead.astro
│   │   └── SchemaOrg.astro
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   └── index.astro # Landing page
│   └── styles/
│       └── global.css  # Tailwind directives
├── tailwind.config.mjs # Design system configuration
├── astro.config.mjs
└── package.json
```

---

## 📚 Documentation

- **Design System Guide:** `/Design Files/DESIGN_SYSTEM_GUIDE.md`
- **Design Enhancements:** `/Design Files/DESIGN_SYSTEM_ENHANCEMENTS.md`
- **Navigation Install:** `/Design Files/NAVIGATION_FOOTER_INSTALL.md`

---

## 🔗 Links

- **GitHub:** https://github.com/dekachin8/languages4-site
- **Netlify:** https://app.netlify.com/
- **Production:** https://wonderful-meringue-8520b4.netlify.app

---

## 📝 Notes

- Using Tailwind CSS v3 (not v4) for compatibility with `@astrojs/tailwind@6.x`
- Neue Kabel font loaded via Adobe Typekit: `https://use.typekit.net/zrh5nnx.css`
- Build credits: ~15 credits per deploy, 300 free per month
- Current credit usage: Monitor to stay under limit

---

## 🙏 Credits

Built with:
- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Netlify](https://www.netlify.com/) - Deployment and hosting

---

*Last updated: January 12, 2026*
