import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, AnimationControls } from 'framer-motion';

export const useAnimationOnScroll = (
  threshold: number = 0.1, 
  triggerOnce: boolean = true
): [any, AnimationControls] => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [controls, inView, triggerOnce]);

  return [ref, controls];
};

export default useAnimationOnScroll;