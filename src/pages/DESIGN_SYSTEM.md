# Languages 4 Design System

Official design language for www.languages4.com - Last updated: February 4, 2026

---

## 🎨 Brand Colors

### Primary Palette

**Primary Teal (Dark)**

- Hex: `#183E4B`
- Usage: Main headers, body text, primary brand color
- Tailwind: `primary-900`

**Primary Teal (Medium)**

- Hex: `#2D5F6D`
- Usage: Secondary elements, hover states
- Tailwind: `primary-800`, `primary-700`, `primary-600`

**Accent Orange**

- Hex: `#C7522A`
- Usage: CTAs, highlights, active states, buttons
- Tailwind: `accent-600`, `accent-700`

**Brand Blue**

- Hex: `#005485`
- Usage: Links, underlines, secondary CTAs
- Custom: `bg-[#005485]`, `text-[#005485]`

**Teal Green**

- Hex: `#74a892`
- Usage: Accents, decorative elements, team member colors
- Custom: `bg-[#74a892]`, `text-[#74a892]`

### Tan/Wheat Tones

**Logo Tan (Light)** ⭐ NEW

- Hex: `#fbf2c4`
- Usage: Section labels, warm accents, logo color
- Custom: `bg-[#fbf2c4]`, `text-[#fbf2c4]`
- Note: This is the exact tan from the L4 logo badge

**Wheat (Darker)**

- Hex: `#e5c185`
- Usage: Alternative warm accent, navigation highlights
- Custom: `bg-[#e5c185]`, `text-[#e5c185]`

### Neutral Palette

**White**

- Hex: `#FFFFFF`
- Usage: Backgrounds, text on dark backgrounds
- Tailwind: `white`, `bg-white`

**Neutral Gray (Light to Dark)**

- Range: `#F5F5F5` → `#737373` → `#404040` → `#262626`
- Usage: Backgrounds, borders, secondary text
- Tailwind: `neutral-50` through `neutral-900`

---

## 📐 Typography

### Font Families

**Display Font: "Neue Kabel"**

- Usage: Headings, hero text, navigation
- Weight: 900 (Black), 600 (SemiBold)
- Fallback: system-ui, sans-serif
- Tailwind: `font-display`

**Body Font: "Bahnschrift"**

- Usage: Body text, paragraphs, descriptions
- Weight: 300 (Light) to 600 (SemiBold)
- Fallback: Arial, Segoe UI, sans-serif
- Default body text: 1.5rem, weight 300, line-height 2

---

## 🎯 Component Patterns

### Buttons

**Primary CTA (Orange)**

```css
bg-accent-600 text-white
hover:bg-accent-700 hover:-translate-y-1 hover:shadow-brand-orange
```

**Secondary CTA (Blue)**

```css
border-2 border-[#005485] text-[#005485]
hover:bg-[#005485] hover:text-white
```

**White CTA (on dark backgrounds)**

```css
bg-white text-primary-900
hover:bg-neutral-100 hover:-translate-y-1 hover:shadow-xl
```

### Cards

**Standard Card**

```css
bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]
hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:-translate-y-2
transition-all duration-300
```

### Navigation

**Menu Background**

- Color: `primary-800` (#2D5F6D)
- Width: 440px (mobile), 480px (desktop)

**Section Labels**

- Color: Logo Tan `#fbf2c4`
- Style: Uppercase, tracking-widest, text-xs

**Hover Underline**

- Color: Brand Blue `#005485`
- Animation: Slide from left, 0.5px height

**Active Page**

- Color: Accent Orange `text-accent-400`

---

## 🌊 Shadows & Effects

### Custom Shadows

**Brand Teal Shadow**

```css
shadow-brand-teal: 0 20px 60px rgba(24, 62, 75, 0.15);
```

**Brand Orange Shadow**

```css
shadow-brand-orange: 0 20px 60px rgba(199, 82, 42, 0.15);
```

**Standard Card Shadow**

```css
shadow-brand: 0 10px 40px rgba(0, 0, 0, 0.1);
```

### Gradients

**Primary Gradient (Hero sections)**

```css
bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900
```

**Teal Gradient (Decorative)**

```css
bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900
```

---

## 📱 Responsive Breakpoints

Following Tailwind defaults:

- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px

---

## ♿ Accessibility

### Color Contrast

- All text meets WCAG AA standards (4.5:1 minimum)
- Primary teal on white: ✅ 9.2:1
- Orange accent on white: ✅ 4.8:1
- White text on primary teal: ✅ 9.2:1

### Interactive Elements

- All clickable elements have `cursor-pointer`
- Hover states provide clear visual feedback
- Focus states visible for keyboard navigation
- Minimum touch target: 44x44px (mobile)

---

## 🎨 Design Principles

1. **Visual Hierarchy** - Large circles/images draw attention first
2. **Whitespace** - Generous padding for breathing room
3. **Consistency** - Reuse patterns across components
4. **Smooth Animations** - 300ms transitions, subtle hover effects
5. **Cultural Respect** - Imagery and language honor Indigenous communities
6. **Mobile-First** - Design for mobile, enhance for desktop

---

## 📝 Usage Notes

### When to Use Logo Tan (`#fbf2c4`)

✅ Section labels and headers
✅ Warm accent elements
✅ Navigation highlights
✅ Decorative borders
❌ Body text (too light, poor contrast)
❌ Primary buttons (use orange or blue)

### When to Use Brand Blue (`#005485`)

✅ Text links
✅ Hover underlines
✅ Secondary CTAs
✅ Icon colors
✅ Borders and dividers

### When to Use Accent Orange (`#C7522A`)

✅ Primary CTAs
✅ Active/selected states
✅ Important highlights
✅ Read more buttons
✅ Download buttons

---

## 🔄 Recent Changes

**February 4, 2026**

- Added logo tan color (`#fbf2c4`) from official L4 logo
- Updated navigation section labels to use logo tan
- Documented brand blue (`#005485`) for links/underlines
- Consolidated all brand colors in one reference doc

---

## 📚 Resources

- **Figma/Design Files**: [Add link when available]
- **Logo Assets**: `/public/images/logo/`
- **Tailwind Config**: `/tailwind.config.cjs`
- **CSS Theme**: `/src/styles/Languages4_theme.css`

---

_For questions or updates to this design system, contact: Tim O'Hagan_
