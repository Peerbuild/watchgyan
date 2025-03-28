'use client';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const AnimatedText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <p className={className} ref={ref}>
      {isInView && (
        <>
          {text.split('').map((letter, i) => (
            <motion.span
              key={i}
              className=""
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                ease: 'easeOut',
                duration: 1.2,
                delay: 0.5 + i * 0.03,
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </>
      )}
    </p>
  );
};

export default AnimatedText;
