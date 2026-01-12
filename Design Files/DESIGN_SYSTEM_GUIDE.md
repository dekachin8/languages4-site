# Languages 4 Design System Guide

## 🎨 Color System

### Primary Colors
```html
<!-- Teal (Main Brand Color) -->
<div class="bg-primary-900 text-white">Dark teal background</div>
<div class="text-primary-900">Dark teal text</div>
<button class="bg-primary-900 hover:bg-primary-800">Primary button</button>

<!-- Orange (Accent/CTA Color) -->
<button class="bg-accent-600 hover:bg-accent-700 text-white">Call to Action</button>
<div class="border-accent-600">Orange border</div>
```

### Secondary Colors
```html
<!-- Blue (Links, Secondary Actions) -->
<a href="#" class="text-blue-600 hover:text-blue-700">Link text</a>

<!-- Red (Alerts, Errors) -->
<div class="bg-red-100 text-red-600 border-red-600">Error message</div>

<!-- Green (Success) -->
<div class="bg-green-100 text-green-600">Success message</div>
```

### Neutral Colors
```html
<!-- Gray scale for UI elements -->
<p class="text-neutral-700">Body text (your dark gray)</p>
<div class="border-neutral-500">Light gray border</div>
<div class="bg-neutral-100">Very light gray background</div>
```

### Warm Accent Colors
```html
<!-- Cream (Subtle highlights) -->
<section class="bg-cream-200">Cream section background</section>

<!-- Wheat (Warm sections) -->
<div class="bg-wheat-200">Wheat background</div>
```

### Semantic Aliases (Shortcuts)
```html
<!-- Quick access to common brand colors -->
<p class="text-body">Body text (neutral-700)</p>
<h1 class="text-heading">Heading (primary-900)</h1>
<div class="border-border">Default border (neutral-500)</div>
<div class="bg-background">White background</div>
```

---

## 📝 Typography

### Font Families
```html
<!-- Display font (Neue Kabel) for headings -->
<h1 class="font-display">Major Heading</h1>

<!-- Sans font (Bahnschrift/system) for body -->
<p class="font-sans">Body text (default)</p>

<!-- Monospace for code -->
<code class="font-mono">const code = true;</code>
```

### Responsive Fluid Typography
```html
<!-- Hero text (40px-80px, scales with viewport) -->
<h1 class="text-hero font-display">Languages 4</h1>

<!-- Display heading (32px-56px) -->
<h1 class="text-display font-display">Welcome</h1>

<!-- Standard headings (responsive) -->
<h1 class="text-heading-1 font-display">H1 Heading</h1>
<h2 class="text-heading-2 font-display">H2 Heading</h2>
<h3 class="text-heading-3 font-display">H3 Heading</h3>

<!-- Body text sizes -->
<p class="text-body-lg">Large body text (18px)</p>
<p class="text-body">Normal body text (16px)</p>
<p class="text-body-sm">Small body text (14px)</p>
```

---

## 🎯 Common Patterns

### Buttons
```html
<!-- Primary CTA button -->
<button class="bg-accent-600 hover:bg-accent-700 active:bg-accent-800 
               text-white font-semibold 
               px-6 py-3 rounded-brand 
               transition-colors duration-brand 
               shadow-brand-sm hover:shadow-brand">
  Get Started
</button>

<!-- Secondary button -->
<button class="bg-primary-900 hover:bg-primary-800 
               text-white font-semibold 
               px-6 py-3 rounded-brand 
               transition-colors duration-brand">
  Learn More
</button>

<!-- Outline button -->
<button class="border-2 border-primary-900 text-primary-900 
               hover:bg-primary-900 hover:text-white 
               font-semibold px-6 py-3 rounded-brand 
               transition-all duration-brand">
  Secondary Action
</button>
```

### Cards
```html
<div class="bg-white rounded-brand shadow-brand p-6 
            hover:shadow-brand-lg transition-shadow duration-brand">
  <h3 class="text-heading-3 font-display text-heading mb-4">Card Title</h3>
  <p class="text-body text-body">Card content goes here.</p>
</div>
```

### Sections
```html
<!-- Standard section -->
<section class="py-16 px-4">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-display font-display text-heading mb-8">Section Title</h2>
    <!-- Content -->
  </div>
</section>

<!-- Alternating background sections -->
<section class="bg-cream-200 py-16 px-4">
  <!-- Light cream background -->
</section>

<section class="bg-wheat-200 py-16 px-4">
  <!-- Wheat background -->
</section>
```

### Links
```html
<!-- Primary link -->
<a href="#" class="text-blue-600 hover:text-blue-700 
                   underline underline-offset-4 
                   transition-colors duration-brand">
  Link text
</a>

<!-- No underline link -->
<a href="#" class="text-primary-900 hover:text-primary-800 
                   transition-colors duration-brand">
  Clean link
</a>
```

### Images with Brand Shadow
```html
<img src="..." alt="..." 
     class="rounded-brand shadow-brand hover:shadow-brand-lg 
            transition-shadow duration-brand">
```

---

## 🎭 Shadows & Effects

```html
<!-- Standard brand shadow -->
<div class="shadow-brand">Standard depth</div>

<!-- Lighter shadow -->
<div class="shadow-brand-sm">Subtle depth</div>

<!-- Stronger shadow -->
<div class="shadow-brand-lg">Deep depth</div>

<!-- Brand color glows -->
<div class="shadow-brand-teal">Teal glow effect</div>
<div class="shadow-brand-orange">Orange glow effect</div>
```

---

## 📱 Responsive Design

```html
<!-- Mobile-first approach -->
<div class="text-sm md:text-base lg:text-lg">
  <!-- Scales: 14px → 16px → 18px -->
</div>

<div class="p-4 md:p-6 lg:p-8">
  <!-- Padding scales: 16px → 24px → 32px -->
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 1 column mobile, 2 tablet, 3 desktop -->
</div>
```

---

## ♿ Accessibility

```html
<!-- Focus states -->
<button class="focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2">
  Accessible button
</button>

<!-- Skip to main content -->
<a href="#main-content" 
   class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
          bg-primary-900 text-white px-4 py-2 rounded-brand">
  Skip to main content
</a>
```

---

## 🚀 Quick Examples

### Hero Section
```html
<section class="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-24 px-4">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-hero font-display mb-6">
      Indigenous Language Reclamation
    </h1>
    <p class="text-body-lg mb-8 max-w-2xl">
      Custom software and land-based curriculum for Indigenous communities.
    </p>
    <button class="bg-accent-600 hover:bg-accent-700 
                   text-white font-semibold px-8 py-4 rounded-brand 
                   shadow-brand-orange transition-all duration-brand">
      Start Your Journey
    </button>
  </div>
</section>
```

### Feature Cards
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="bg-white rounded-brand shadow-brand p-8 
              hover:shadow-brand-lg transition-all duration-brand 
              hover:-translate-y-1">
    <h3 class="text-heading-2 font-display text-heading mb-4">
      Community-Led
    </h3>
    <p class="text-body text-body">
      Your community drives the process from start to finish.
    </p>
  </div>
  <!-- Repeat for other cards -->
</div>
```

---

## 💡 Pro Tips

1. **Always use semantic colors first**: Use `primary`, `accent`, `neutral` instead of specific color names
2. **Use fluid typography**: The `text-hero`, `text-display` utilities scale automatically
3. **Add hover states**: Use `hover:` prefix for interactive elements
4. **Use transitions**: Add `transition-colors duration-brand` for smooth changes
5. **Mobile-first**: Start with mobile layout, add `md:` and `lg:` prefixes for larger screens
6. **Consistent spacing**: Use the Tailwind spacing scale (4, 6, 8, 12, 16, 24, 32...)
7. **Shadow for depth**: Use `shadow-brand` on cards and images
8. **Focus states**: Always add focus rings for accessibility

---

## 🔧 Customizing

Need a new color shade? Add it to `tailwind.config.mjs`:
```javascript
colors: {
  primary: {
    // Add custom shades here
    450: '#your-color-hex',
  }
}
```

Need a new font size? Add to `fontSize`:
```javascript
fontSize: {
  'your-size': ['1.5rem', { lineHeight: '1.6' }],
}
```
