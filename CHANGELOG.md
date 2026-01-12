# Changelog

All notable changes to the Languages 4 website rebuild will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### In Progress
- Hero section Tailwind rebuild
- Remove legacy CSS dependencies

---

## [2026-01-12] - Navigation & Footer Complete

### Added
- Modern right-side fixed navigation component
- Triple-pulse animated hamburger menu (pulse-pulse-pulse pattern with 5-second pause)
- Slide-out menu panel with smooth animations
- Click-outside-to-close functionality
- Hamburger toggle (click to open/close)
- Escape key to close menu
- Clean 3-column footer with contact info and social links
- Comprehensive project documentation (README.md)
- Repository cleanup (.gitignore)

### Changed
- Disabled Netlify auto-deploy to conserve build credits
- Updated MainLayout to use new Navigation and Footer components

### Fixed
- Menu now properly slides from right side next to navigation bar
- Hamburger button now visible with clear three-line icon
- Menu closes on link click, outside click, escape key, and hamburger toggle

---

## [2026-01-11] - Foundation & Design System

### Added
- Complete Tailwind CSS v3 design system
- 9 brand colors with full scales (50-950)
- Fluid responsive typography system
- Custom spacing, shadows, and transitions
- Font weight scale and letter spacing
- Line height options and max-width constraints
- Z-index layering system
- Aspect ratio helpers
- Container configuration with responsive padding

### Changed
- Migrated from WordPress + Bootstrap to Astro + Tailwind
- Resolved Tailwind v3/v4 dependency conflicts
- Configured proper Astro + Tailwind integration

### Performance
- Achieved 99/100 desktop performance score
- Achieved 100/100 SEO score
- Set up automatic sitemap generation
- Configured structured data and Open Graph tags

---

## Notes

### Current Known Issues
- `ladies_haka.webp` incorrect path in index.astro line 92 (should be `/fixed/` not `/random/`)
- Temporarily using legacy `landing-page.css` for hero section
- Some showcase random images return 404s
- Mobile hero section needs responsive optimization

### Credits Management
- Each production deploy: 15 credits
- Monthly limit: 300 credits (free tier)
- Strategy: Manual deploys only at milestones
- Current usage: 165 credits (11 deploys)

---

*This changelog follows semantic versioning and documents all significant changes to the project.*