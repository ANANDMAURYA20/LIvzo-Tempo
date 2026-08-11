import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { images } from '../data/packages';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 0.65]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: imageScale, y: imageY }}
      >
        <img
          src={images.hero}
          alt="LIVZO Resort surrounded by nature"
          className="img-cinematic"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-charcoal"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-20 lg:pb-24 px-5 md:px-10 lg:px-16">
        <div className="container-editorial">
          {/* Eyebrow */}
          <motion.p
            className="text-eyebrow text-sand mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            LIVZO Resorts
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="heading-display text-offwhite text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Choose Your{' '}
            <br className="hidden sm:block" />
            <span className="text-sand">LIVZO</span> Experience.
          </motion.h1>

          {/* Italic subline */}
          <motion.p
            className="font-serif italic text-lg md:text-xl text-offwhite/65 mt-4 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Adventure, stay, food and moments worth remembering.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <a href="#adventure" className="btn-primary">
              Explore Packages
              <ArrowRight size={16} />
            </a>
            <a href="#experiences" className="btn-ghost text-offwhite/75 hover:text-offwhite border-b-offwhite/30">
              View All
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
