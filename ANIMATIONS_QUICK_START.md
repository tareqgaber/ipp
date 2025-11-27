# Framer Motion - Quick Start Guide

Beautiful animations are now integrated throughout your app! 🎬

## ⚡ Quick Examples

### 1. Animated Page

```tsx
import { AnimatedPage } from '@/components/AnimatedPage';

export function MyPage() {
  return (
    <AnimatedPage>
      {/* Your content - automatically animates on enter/exit */}
    </AnimatedPage>
  );
}
```

### 2. Stagger Animation (Items appear one by one)

```tsx
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

<motion.div
  variants={staggerContainerVariants}
  initial="initial"
  animate="animate"
>
  <motion.h1 variants={staggerItemVariants}>Title</motion.h1>
  <motion.p variants={staggerItemVariants}>Description</motion.p>
  <motion.button variants={staggerItemVariants}>Action</motion.button>
</motion.div>
```

### 3. Hover Effects

```tsx
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="cursor-pointer"
>
  Hover me!
</motion.div>
```

### 4. Animated Card

```tsx
import { AnimatedCard } from '@/components/AnimatedCard';

<AnimatedCard className="p-6 bg-card">
  <h3>Card Title</h3>
  <p>Automatically has hover animation!</p>
</AnimatedCard>
```

### 5. Animated Button

```tsx
import { AnimatedButton } from '@/components/AnimatedButton';

<AnimatedButton onClick={handleClick}>
  Click Me
</AnimatedButton>
```

### 6. Loading Spinner

```tsx
import { LoadingSpinner } from '@/components/LoadingSpinner';

{isLoading && <LoadingSpinner />}
```

## 🎯 Common Patterns

### Card Grid with Hover

```tsx
import { AnimatedCard } from '@/components/AnimatedCard';

<div className="grid grid-cols-3 gap-4">
  {items.map(item => (
    <AnimatedCard key={item.id} className="p-6">
      <h3>{item.title}</h3>
    </AnimatedCard>
  ))}
</div>
```

### Button with Loading

```tsx
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/LoadingSpinner';

<motion.button whileTap={{ scale: 0.95 }} disabled={loading}>
  {loading ? <LoadingSpinner size="sm" /> : 'Submit'}
</motion.button>
```

### Fade In Element

```tsx
import { motion } from 'framer-motion';
import { fadeInVariants } from '@/lib/animations';

<motion.div
  variants={fadeInVariants}
  initial="initial"
  animate="animate"
>
  Fades in smoothly
</motion.div>
```

## 📦 Pre-built Animations

Import from `@/lib/animations`:

- `pageVariants` - Page transitions
- `fadeInVariants` - Fade in animation
- `slideUpVariants` - Slide up from bottom
- `scaleVariants` - Scale animation
- `staggerContainerVariants` - Parent for staggered children
- `staggerItemVariants` - Child items that stagger
- `cardHoverVariants` - Card hover effects
- `buttonVariants` - Button interactions
- `modalVariants` - Modal/dialog animations

## 🎨 Ready-to-Use Components

All in `@/components`:

- `<AnimatedPage>` - Wrap pages for transitions
- `<AnimatedCard>` - Card with hover effect
- `<AnimatedButton>` - Button with press animation
- `<LoadingSpinner>` - Circular spinner
- `<LoadingDots>` - Dot animation
- `<LoadingOverlay>` - Full-page loading

## 📖 Full Documentation

See `ANIMATIONS.md` for complete guide with all options, examples, and best practices.

## 🎬 Live Demo

The AnimationsDemo component is added to the Dashboard page. Log in to see all animations in action!

## 🔗 Quick Links

- Landing Page - Staggered hero
- Login Page - Form animations  
- Dashboard - Card effects & staggered lists
- Theme Switcher - Icon transitions

---

**Tip:** All pages use `AnimatedPage` for smooth navigation transitions! 🚀
