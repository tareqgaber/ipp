# Framer Motion Animations Guide

Complete animation system using Framer Motion for smooth, professional transitions throughout the app.

## 🎬 What Was Added

### Core Files

1. **Animation Library** (`src/lib/animations.ts`)
   - Pre-configured animation variants
   - Transition presets
   - Reusable animation configurations

2. **Animated Components**
   - `AnimatedPage` - Page transition wrapper
   - `AnimatedCard` - Card with hover effects
   - `AnimatedButton` - Button with press/hover animations
   - `LoadingSpinner` - Multiple loading states
   - `AnimationsDemo` - Showcase all animations

3. **Enhanced Pages**
   - ✅ Landing Page - Staggered hero animations
   - ✅ Login Page - Form animations
   - ✅ Dashboard Page - Card and list animations

## 🚀 Quick Start

### Basic Page Animation

Wrap any page with `AnimatedPage` for automatic enter/exit transitions:

```tsx
import { AnimatedPage } from '@/components/AnimatedPage';

export function MyPage() {
  return (
    <AnimatedPage>
      <h1>My Content</h1>
    </AnimatedPage>
  );
}
```

### Stagger Animation (Sequential Items)

```tsx
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

<motion.div
  variants={staggerContainerVariants}
  initial="initial"
  animate="animate"
>
  <motion.div variants={staggerItemVariants}>Item 1</motion.div>
  <motion.div variants={staggerItemVariants}>Item 2</motion.div>
  <motion.div variants={staggerItemVariants}>Item 3</motion.div>
</motion.div>
```

### Hover Effects

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive element
</motion.div>
```

### Animated Cards

```tsx
import { AnimatedCard } from '@/components/AnimatedCard';

<AnimatedCard className="p-6 bg-card">
  <h3>Card Title</h3>
  <p>Card content with hover animation</p>
</AnimatedCard>
```

### Animated Buttons

```tsx
import { AnimatedButton } from '@/components/AnimatedButton';

<AnimatedButton onClick={handleClick}>
  Click Me
</AnimatedButton>
```

## 📦 Available Animation Variants

All variants are exported from `src/lib/animations.ts`:

### Page Transitions

```tsx
import { pageVariants } from '@/lib/animations';

<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
  Page content
</motion.div>
```

### Fade Animations

```tsx
import { fadeInVariants } from '@/lib/animations';

<motion.div variants={fadeInVariants} initial="initial" animate="animate">
  Fades in
</motion.div>
```

### Slide Animations

```tsx
import { slideUpVariants, slideInVariants } from '@/lib/animations';

// Slide up from bottom
<motion.div variants={slideUpVariants} initial="initial" animate="animate">
  Slides up
</motion.div>

// Slide from left/right (RTL aware)
<motion.div variants={slideInVariants('ltr')} initial="initial" animate="animate">
  Slides in
</motion.div>
```

### Scale Animations

```tsx
import { scaleVariants } from '@/lib/animations';

<motion.div variants={scaleVariants} initial="initial" animate="animate">
  Scales in
</motion.div>
```

### Card Hover

```tsx
import { cardHoverVariants } from '@/lib/animations';

<motion.div variants={cardHoverVariants} whileHover="hover" whileTap="tap">
  Hover for effect
</motion.div>
```

### List Items (Staggered)

```tsx
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

<motion.ul variants={staggerContainerVariants} initial="initial" animate="animate">
  {items.map(item => (
    <motion.li key={item.id} variants={staggerItemVariants}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

## 🎨 Loading States

### Spinner

```tsx
import { LoadingSpinner } from '@/components/LoadingSpinner';

<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
```

### Dots Animation

```tsx
import { LoadingDots } from '@/components/LoadingSpinner';

<LoadingDots />
```

### Full Page Overlay

```tsx
import { LoadingOverlay } from '@/components/LoadingSpinner';

{isLoading && <LoadingOverlay />}
```

## 🎯 Common Patterns

### 1. Page with Staggered Content

```tsx
import { AnimatedPage } from '@/components/AnimatedPage';
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

export function MyPage() {
  return (
    <AnimatedPage>
      <motion.div
        variants={staggerContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1 variants={staggerItemVariants}>Title</motion.h1>
        <motion.p variants={staggerItemVariants}>Description</motion.p>
        <motion.div variants={staggerItemVariants}>
          <button>Action</button>
        </motion.div>
      </motion.div>
    </AnimatedPage>
  );
}
```

### 2. Interactive Card Grid

```tsx
import { AnimatedCard } from '@/components/AnimatedCard';

<div className="grid grid-cols-3 gap-4">
  {cards.map(card => (
    <AnimatedCard key={card.id} className="p-6">
      <h3>{card.title}</h3>
      <p>{card.description}</p>
    </AnimatedCard>
  ))}
</div>
```

### 3. Form with Animations

```tsx
import { motion } from 'framer-motion';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

<motion.form
  variants={staggerContainerVariants}
  initial="initial"
  animate="animate"
  onSubmit={handleSubmit}
>
  <motion.div variants={staggerItemVariants}>
    <label>Email</label>
    <input type="email" />
  </motion.div>
  
  <motion.div variants={staggerItemVariants}>
    <label>Password</label>
    <input type="password" />
  </motion.div>
  
  <motion.div variants={staggerItemVariants} whileTap={{ scale: 0.98 }}>
    <button type="submit">Submit</button>
  </motion.div>
</motion.form>
```

### 4. Modal/Dialog Animation

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants, backdropVariants } from '@/lib/animations';

<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 m-auto w-96 h-64 bg-white rounded-lg"
      >
        Modal content
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### 5. Button with Loading State

```tsx
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/LoadingSpinner';

<motion.button
  whileTap={{ scale: 0.95 }}
  disabled={isLoading}
>
  {isLoading ? <LoadingSpinner size="sm" /> : 'Submit'}
</motion.button>
```

## ⚙️ Transition Presets

Use pre-configured transitions from `src/lib/animations.ts`:

```tsx
import { transitions } from '@/lib/animations';

<motion.div
  animate={{ x: 100 }}
  transition={transitions.default}  // 0.3s ease
/>

<motion.div
  animate={{ x: 100 }}
  transition={transitions.fast}     // 0.15s fast
/>

<motion.div
  animate={{ x: 100 }}
  transition={transitions.spring}   // Spring physics
/>

<motion.div
  animate={{ x: 100 }}
  transition={transitions.bounce}   // Bouncy spring
/>
```

## 🎨 Custom Animations

Create your own animations:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 100 }}
  transition={{ duration: 0.5, ease: 'easeInOut' }}
>
  Custom animation
</motion.div>
```

## 🔄 Route Transitions

For animated route changes, use `AnimatePresence`:

```tsx
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router';

function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* routes */}
      </Routes>
    </AnimatePresence>
  );
}
```

## 📱 Performance Tips

1. **Use `transform` properties** (x, y, scale, rotate) - GPU accelerated
2. **Avoid animating** `width`, `height`, `top`, `left` - causes layout recalculation
3. **Use `will-change`** for elements that animate frequently
4. **Reduce motion** for accessibility:

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={shouldReduceMotion ? {} : { x: 100 }}
>
  Respects user preferences
</motion.div>
```

## 🎓 Demo Component

View all animations in action:

```tsx
import { AnimationsDemo } from '@/components/AnimationsDemo';

<AnimationsDemo />
```

The demo is already added to the Dashboard page for reference.

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Examples](https://www.framer.com/motion/examples/)
- [Gestures Guide](https://www.framer.com/motion/gestures/)

## 🎯 Best Practices

1. **Keep animations subtle** - 200-400ms is usually ideal
2. **Use consistent timing** - Stick to your transition presets
3. **Animate on interaction** - Provide feedback for user actions
4. **Test on mobile** - Ensure smooth performance
5. **Consider accessibility** - Respect reduced motion preferences
6. **Use semantic motion** - Animations should have purpose

## ✨ Examples in the Codebase

- **Landing Page** - Staggered hero section
- **Login Page** - Form field animations
- **Dashboard Page** - Card hover effects and staggered content
- **Theme Switcher** - Icon transitions

Enjoy creating beautiful, smooth animations! 🎬
