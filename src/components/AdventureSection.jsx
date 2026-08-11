import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { adventurePackages, formatPrice } from '../data/packages';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from './AnimationVariants';

export default function AdventureSection() {
  return (
    <section id="adventure" className="section-padding bg-offwhite" aria-label="Adventure Packages">
      <div className="container-editorial">
        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-eyebrow text-earth mb-4">Adventure Packages</p>
          <h2 className="heading-section text-forest text-3xl sm:text-4xl md:text-5xl mb-4">
            Find Your Level{' '}
            <span className="italic font-light">of Adventure.</span>
          </h2>
          <p className="text-charcoal/50 text-base leading-relaxed">
            From your first thrill to your ultimate challenge. Choose the package that matches how far you want to go.
          </p>
        </motion.div>

        {/* Pricing Grid — 3 columns desktop, 2 tablet, 1 mobile */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {adventurePackages.map((pkg) => (
            <motion.article
              key={pkg.id}
              variants={staggerItem}
              className={`group relative bg-white border transition-all duration-300 hover:shadow-lg ${
                pkg.featured
                  ? 'border-forest ring-1 ring-forest/20'
                  : 'border-sand/30 hover:border-sand/60'
              }`}
            >
              {/* Featured label */}
              {pkg.featured && (
                <div className="bg-forest text-offwhite text-center py-2">
                  <span className="text-meta text-[0.625rem] tracking-widest">Most Popular</span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 sm:h-44 lg:h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={`${pkg.name} adventure`}
                  className="img-cinematic transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-4 font-serif text-4xl text-white/20">
                  {pkg.number}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                {/* Difficulty badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-meta text-[0.625rem] text-earth/60 bg-cream px-2.5 py-1">
                    {pkg.difficulty}
                  </span>
                  <span className="text-[0.625rem] text-charcoal/40">
                    {pkg.activities}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-serif text-2xl text-forest mb-2">
                  {pkg.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-charcoal/50 leading-relaxed mb-5 min-h-[2.5rem]">
                  {pkg.description}
                </p>

                {/* Price — large and clear */}
                <div className="border-t border-sand/20 pt-4 mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-3xl md:text-[2rem] text-forest font-medium">
                      ₹{formatPrice(pkg.price)}
                    </span>
                    <span className="text-sm text-charcoal/40">/ person</span>
                  </div>
                </div>

                {/* CTA */}
                <a 
                  href="https://wa.me/917046267684"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary text-center text-xs py-3 block flex items-center justify-center gap-1.5"
                >
                  Book Now
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Calligraphic note */}
        <motion.p
          className="font-script text-earth/40 text-lg mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          crafted for you
        </motion.p>
      </div>
    </section>
  );
}
