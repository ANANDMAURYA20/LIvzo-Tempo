import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { images } from '../data/packages';
import { fadeUp, viewportOnce } from './AnimationVariants';

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative h-[600px] md:h-[700px] overflow-hidden"
      aria-label="Plan Your Visit"
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <img
          src={images.cta}
          alt="LIVZO resort mountain view"
          className="img-cinematic"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-charcoal/55" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
        <motion.p
          className="text-eyebrow text-sand mb-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Your Journey Begins
        </motion.p>

        <motion.h2
          className="heading-display text-offwhite text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl mb-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Your Next Memory{' '}
          <br />
          <span className="italic font-light">Starts Here.</span>
        </motion.h2>

        <motion.p
          className="text-offwhite/50 text-sm md:text-base max-w-md mb-3 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Come for the adventure.
          <br />
          Stay for the moments.
        </motion.p>

        <motion.span
          className="font-script text-sand/50 text-lg mb-10 block"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          escape the ordinary
        </motion.span>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <a 
            href="https://wa.me/917046267684"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Plan Your Visit
          </a>
          <a
            href="#"
            className="btn-secondary border-offwhite/30 text-offwhite hover:bg-offwhite/10 hover:text-offwhite"
          >
            Contact LIVZO
          </a>
        </motion.div>
      </div>
    </section>
  );
}
