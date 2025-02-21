'use client';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'motion/react';
export default function HeroParalaxBg({
  bgUrl,
  className,
}: {
  bgUrl: string;
  className?: string;
}) {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 900], [0, 400]);

  return (
    <motion.div
      style={{ y, backgroundImage: `url(${bgUrl})` }}
      className={cn('absolute inset-0 -z-10 h-full w-full', className)}
    ></motion.div>
  );
}
