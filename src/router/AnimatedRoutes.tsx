import { AnimatePresence } from 'framer-motion';
import { useLocation, useRoutes } from 'react-router';
import type { RouteObject } from 'react-router';

interface AnimatedRoutesProps {
  routes: RouteObject[];
}

/**
 * Wrapper for route transitions with AnimatePresence
 * Enables smooth page transitions when navigating
 */
export function AnimatedRoutes({ routes }: AnimatedRoutesProps) {
  const location = useLocation();
  const element = useRoutes(routes);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={location.pathname}>{element}</div>
    </AnimatePresence>
  );
}
