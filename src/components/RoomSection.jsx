import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { roomPackages, formatPrice, images } from '../data/packages';
import { fadeUp, slideInLeft, viewportOnce } from './AnimationVariants';

export default function RoomSection() {
  const [selectedIdx, setSelectedIdx] = useState(1); // Default to 6H
  const selected = roomPackages[selectedIdx];

  return (
    <section id="stay" className="bg-offwhite overflow-hidden" aria-label="Room Stay">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[700px]">
        {/* Image — 7 columns */}
        <motion.div
          className="relative lg:col-span-7 h-[400px] lg:h-auto overflow-hidden"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.img
            src={images.room}
            alt="LIVZO twin room with natural surroundings"
            className="img-cinematic"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8 }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 to-transparent lg:bg-gradient-to-l" />

          {/* Calligraphic annotation */}
          <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
            <span className="font-script text-offwhite/60 text-xl">
              stay a little longer
            </span>
          </div>
        </motion.div>

        {/* Content — 5 columns */}
        <motion.div
          className="lg:col-span-5 flex flex-col justify-center items-center px-6 md:px-10 lg:px-14 py-12 lg:py-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-eyebrow text-earth mb-5">Twin Room</p>

          <h2 className="heading-section text-forest text-4xl md:text-5xl mb-3">
            Stay A Little
            <br />
            <span className="italic font-light">Longer.</span>
          </h2>

          <p className="text-sm text-charcoal/50 mb-10 leading-relaxed max-w-sm">
            Rest between adventures. Our twin rooms are simple, clean, and
            surrounded by the sounds of nature.
          </p>

          {/* Duration selector */}
          <div className="flex gap-0 border border-sand/50 w-fit mb-8">
            {roomPackages.map((pkg, i) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedIdx(i)}
                className={`relative px-6 py-3 text-meta text-xs transition-all duration-400 ${selectedIdx === i
                  ? 'bg-forest text-offwhite'
                  : 'text-charcoal/60 hover:bg-cream'
                  } ${i > 0 ? 'border-l border-sand/50' : ''}`}
                aria-pressed={selectedIdx === i}
                aria-label={`Select ${pkg.duration} stay`}
              >
                {pkg.durationShort}
              </button>
            ))}
          </div>

          {/* Animated price + description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-serif text-5xl md:text-6xl text-forest">
                  ₹{formatPrice(selected.price)}
                </span>
                <span className="text-xs text-charcoal/40">
                  / {selected.duration.toLowerCase()}
                </span>
              </div>
              <p className="text-sm text-charcoal/50 mb-8 max-w-xs">
                {selected.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <a 
            href="https://wa.me/917046267684"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-fit flex items-center gap-2"
          >
            Book a Room
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
