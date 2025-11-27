import { motion } from 'framer-motion';
import { AnimatedCard } from './AnimatedCard';
import { AnimatedButton } from './AnimatedButton';
import { LoadingSpinner, LoadingDots } from './LoadingSpinner';
import {
  fadeInVariants,
  slideUpVariants,
  scaleVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from '../lib/animations';
import { Button } from './ui/button';

/**
 * Demo component showcasing all available animations
 */
export function AnimationsDemo() {
  return (
    <div className="space-y-12 p-8 bg-background">
      <div>
        <h2 className="text-3xl font-bold mb-6">Framer Motion Animations</h2>
        <p className="text-muted-foreground mb-8">
          Beautiful transitions and animations throughout the app
        </p>
      </div>

      {/* Fade In */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Fade In Animation</h3>
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          className="p-6 bg-card border border-border rounded-lg"
        >
          <p>This element fades in smoothly</p>
        </motion.div>
      </section>

      {/* Slide Up */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Slide Up Animation</h3>
        <motion.div
          variants={slideUpVariants}
          initial="initial"
          animate="animate"
          className="p-6 bg-card border border-border rounded-lg"
        >
          <p>This element slides up from bottom</p>
        </motion.div>
      </section>

      {/* Scale */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Scale Animation</h3>
        <motion.div
          variants={scaleVariants}
          initial="initial"
          animate="animate"
          className="p-6 bg-card border border-border rounded-lg"
        >
          <p>This element scales in</p>
        </motion.div>
      </section>

      {/* Stagger Children */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Stagger Animation</h3>
        <motion.div
          variants={staggerContainerVariants}
          initial="initial"
          animate="animate"
          className="space-y-2"
        >
          {['First item', 'Second item', 'Third item', 'Fourth item'].map((item) => (
            <motion.div
              key={item}
              variants={staggerItemVariants}
              className="p-4 bg-card border border-border rounded-lg"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Hover Effects */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Hover Effects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 bg-card border border-border rounded-lg cursor-pointer"
          >
            <p>Hover over me!</p>
          </motion.div>
          <motion.div
            whileHover={{ rotate: 2 }}
            className="p-6 bg-card border border-border rounded-lg cursor-pointer"
          >
            <p>I rotate on hover</p>
          </motion.div>
        </div>
      </section>

      {/* Animated Cards */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Animated Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedCard className="p-6 bg-card border border-border">
            <h4 className="font-semibold mb-2">Card 1</h4>
            <p className="text-sm text-muted-foreground">
              Hover for animation
            </p>
          </AnimatedCard>
          <AnimatedCard className="p-6 bg-card border border-border">
            <h4 className="font-semibold mb-2">Card 2</h4>
            <p className="text-sm text-muted-foreground">
              Hover for animation
            </p>
          </AnimatedCard>
          <AnimatedCard className="p-6 bg-card border border-border">
            <h4 className="font-semibold mb-2">Card 3</h4>
            <p className="text-sm text-muted-foreground">
              Hover for animation
            </p>
          </AnimatedCard>
        </div>
      </section>

      {/* Animated Buttons */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Animated Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <AnimatedButton>Click me!</AnimatedButton>
          <AnimatedButton variant="outlined" color="gray">Outline Button</AnimatedButton>
          <AnimatedButton variant="contained" color="secondary">Secondary</AnimatedButton>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button variant="contained" color="error">Destructive</Button>
          </motion.div>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Loading Animations</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Small</p>
            <LoadingSpinner size="sm" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Medium</p>
            <LoadingSpinner size="md" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Large</p>
            <LoadingSpinner size="lg" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Dots</p>
            <LoadingDots />
          </div>
        </div>
      </section>

      {/* Continuous Animations */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Continuous Animations</h3>
        <div className="flex gap-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="p-6 bg-primary text-primary-foreground rounded-lg"
          >
            Bouncing
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="p-6 bg-secondary text-secondary-foreground rounded-lg"
          >
            Rotating
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="p-6 bg-accent text-accent-foreground rounded-lg"
          >
            Pulsing
          </motion.div>
        </div>
      </section>
    </div>
  );
}
