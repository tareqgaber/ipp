import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

/**
 * Animated card component with hover effects
 */
export function AnimatedCard({
  children,
  hover = true,
  className,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn('rounded-lg shadow-md', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
