import { motion } from 'framer-motion';
import { Button } from './ui/button';
import type { ButtonHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';

interface AnimatedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof Button> {
  children: React.ReactNode;
  whileTap?: boolean;
  whileHover?: boolean;
}

/**
 * Button with built-in animations
 * Wraps the standard Button component with motion
 */
export function AnimatedButton({
  children,
  whileTap = true,
  whileHover = true,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={whileHover ? { scale: 1.05 } : undefined}
      whileTap={whileTap ? { scale: 0.95 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}
