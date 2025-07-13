import { useRef, memo } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

const VelocityText = memo(({
  children,
  baseVelocity,
  className = "",
  numCopies,
}) => {
    const baseX = useMotionValue(0);
    const copyRef = useRef(null);
    const animationId = useRef(null);

    // Fixed width to prevent dynamic calculations
    const estimatedWidth = 2000;

    function wrap(min, max, v) {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, (v) => {
      return `${wrap(-estimatedWidth, 0, v)}px`;
    });

    const directionFactor = useRef(baseVelocity > 0 ? 1 : -1);
    const isRunning = useRef(true);
    
    // Prevent re-initialization on re-renders
    if (!animationId.current) {
      animationId.current = Math.random();
    }
    
    useAnimationFrame((t, delta) => {
      // Only run if not interrupted and this is the active animation
      if (!isRunning.current) return;
      
      // Pure time-based movement without any external dependencies
      let moveBy = directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < (numCopies ?? 8); i++) {
      spans.push(
        <span
          className={`flex-shrink-0 ${className}`}
          key={i}
          ref={i === 0 ? copyRef : null}
        >
          {children}
        </span>
      );
    }

    return (
      <div className="relative overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]"
          style={{ x }}
        >
          {spans}
        </motion.div>
      </div>
    );
});

export const TextBackground = memo(({
  texts = [],
  velocity = 100,
  className = "",
  numCopies = 6,
}) => {
  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={`${text}-${velocity}-${index}`} // More stable key
          className={className}
          baseVelocity={velocity}
          numCopies={numCopies}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
});

export default TextBackground;