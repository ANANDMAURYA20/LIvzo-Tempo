import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { familyPackage, formatPrice, images } from '../data/packages';
import { fadeUp, slideInRight, staggerContainer, staggerItem, viewportOnce } from './AnimationVariants';

export default function FamilyEscape() {
  return (
    <section className="section-padding bg-offwhite" aria-label="Family Escape">
      <div className="container-editorial px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image — asymmetric, 6 columns */}
          <motion.div
            className="lg:col-span-6 relative"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
              <img
                src={images.family}
                alt="Family enjoying their escape at LIVZO resort"
                className="img-cinematic"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>

            {/* Price badge overlapping image */}
            <motion.div
              className="absolute -bottom-6 -right-2 md:right-6 bg-forest text-offwhite px-6 py-5 md:px-8 md:py-6 z-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-meta text-sand text-[0.6rem] mb-1">All-inclusive</p>
              <span className="font-serif text-3xl md:text-4xl">
                ₹{formatPrice(familyPackage.price)}
              </span>
              <span className="text-offwhite/50 text-xs ml-1">
                / {familyPackage.unit}
              </span>
            </motion.div>
          </motion.div>

          {/* Content — 5 columns, offset */}
          <motion.div
            className="lg:col-span-5 lg:col-start-8 pt-8 lg:pt-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-eyebrow text-earth mb-5">Family Package</p>

            <h2 className="heading-section text-forest text-3xl sm:text-4xl md:text-5xl mb-3">
              Everything You Need,
              <br />
              <span className="italic font-light">In One Escape.</span>
            </h2>

            <p className="text-sm text-charcoal/50 mb-8 leading-relaxed max-w-sm">
              No planning, no worrying. Just arrive and let us take care of
              everything — meals, room, activities, and your peace of mind.
            </p>

            {/* Inclusions */}
            <motion.ul
              className="space-y-3 mb-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {familyPackage.includes.map((inc) => (
                <motion.li
                  key={inc.item}
                  variants={staggerItem}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-sand/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={10} className="text-forest" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-charcoal">
                      {inc.item}
                    </span>
                    <span className="text-xs text-charcoal/40 ml-2">
                      {inc.description}
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <a 
              href="https://wa.me/917046267684"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-fit flex items-center gap-2 px-8 py-4 text-sm"
            >
              Book Family Escape
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
