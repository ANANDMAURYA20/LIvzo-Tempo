import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { groupPackages, formatPrice, images } from '../data/packages';
import { fadeUp, viewportOnce } from './AnimationVariants';

const groupSizes = [...new Set(groupPackages.map((p) => p.people))];

export default function GroupSection() {
  const [selectedSize, setSelectedSize] = useState(20);

  const selectedPackage = useMemo(
    () => groupPackages.find((p) => p.people === selectedSize) || groupPackages[0],
    [selectedSize]
  );

  const totalPrice = selectedPackage.pricePerPerson * selectedPackage.people;

  return (
    <section id="groups" className="bg-cream overflow-hidden" aria-label="Group Packages">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[700px]">
        {/* Content — 5 columns */}
        <motion.div
          className="lg:col-span-5 flex flex-col justify-center items-center px-6 md:px-12 lg:pl-20 lg:pr-14 py-12 lg:py-16 order-2 lg:order-1"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-eyebrow text-earth mb-5">Group Packages</p>

          <h2 className="heading-section text-forest text-4xl md:text-5xl mb-3">
            Bring Your
            <br />
            <span className="italic font-light">People.</span>
          </h2>

          <p className="text-sm text-charcoal/50 mb-10 leading-relaxed max-w-sm">
            Big experiences are better together. The more you bring, the more
            you save.
          </p>

          {/* Group size selector */}
          <p className="text-meta text-earth/60 text-[0.625rem] mb-3">
            Select your group size
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {groupSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm font-sans transition-all duration-300 ${selectedSize === size
                  ? 'bg-forest text-offwhite'
                  : 'bg-offwhite text-charcoal/60 hover:bg-sand/30 border border-sand/40'
                  }`}
                aria-pressed={selectedSize === size}
                aria-label={`${size} people`}
              >
                {size}{size === 100 ? '+' : ''}
              </button>
            ))}
          </div>

          {/* Animated package details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPackage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <Users size={16} className="text-earth" />
                <h3 className="font-serif text-2xl text-forest">
                  {selectedPackage.name}
                </h3>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif text-4xl md:text-5xl text-forest">
                  ₹{formatPrice(selectedPackage.pricePerPerson)}
                </span>
                <span className="text-xs text-charcoal/40">/ person</span>
              </div>

              <p className="text-sm text-charcoal/40">
                {selectedPackage.people} people · ₹{formatPrice(totalPrice)} total
              </p>

              {selectedPackage.note && (
                <p className="text-xs text-earth/60 mt-2 italic">
                  {selectedPackage.note}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <a 
            href="https://wa.me/917046267684"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-fit flex items-center gap-2"
          >
            Plan for Your Group
            <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Image — 7 columns */}
        <motion.div
          className="relative lg:col-span-7 h-[400px] lg:h-auto overflow-hidden order-1 lg:order-2"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={images.groups}
            alt="Group of friends enjoying LIVZO resort experience"
            className="img-cinematic"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-charcoal/10 to-charcoal/30 lg:bg-gradient-to-r" />
        </motion.div>
      </div>
    </section>
  );
}
