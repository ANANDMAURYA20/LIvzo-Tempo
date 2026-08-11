import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '../data/packages';
import { fadeUp, viewportOnce } from './AnimationVariants';

export default function AdventureCard({ pkg, index }) {
  return (
    <motion.article
      className={`group relative flex-shrink-0 w-[320px] sm:w-[340px] md:w-[380px] ${
        pkg.featured ? 'md:w-[420px]' : ''
      }`}
      variants={fadeUp}
      aria-label={`${pkg.name} package`}
    >
      {/* Featured label */}
      {pkg.featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="text-meta text-[0.625rem] bg-sand text-forest px-3 py-1.5 tracking-widest">
            Most Popular
          </span>
        </div>
      )}

      {/* Image container */}
      <div className={`relative overflow-hidden ${pkg.featured ? 'h-[420px]' : 'h-[360px]'} mb-5`}>
        <motion.img
          src={pkg.image}
          alt={`${pkg.name} adventure experience`}
          className="img-cinematic transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />

        {/* Package number overlay */}
        <div className="absolute bottom-4 right-4">
          <span className="font-serif text-6xl font-light text-offwhite/15">
            {pkg.number}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-1">
        {/* Metadata row */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-meta text-earth/60 text-[0.625rem]">
            {pkg.difficulty}
          </span>
          <span className="w-4 h-px bg-sand" />
          <span className="text-meta text-earth/60 text-[0.625rem]">
            {pkg.activities}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-serif text-2xl md:text-[1.75rem] text-forest mb-1">
          {pkg.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-charcoal/50 mb-4 leading-relaxed">
          {pkg.description}
        </p>

        {/* Price + CTA row */}
        <div className="flex items-end justify-between">
          <div>
            <span className="font-serif text-3xl md:text-4xl text-forest">
              ₹{formatPrice(pkg.price)}
            </span>
            <span className="text-xs text-charcoal/40 ml-1">/ person</span>
          </div>

          <a 
            href="https://wa.me/917046267684"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-charcoal shadow-sm hover:bg-forest hover:text-offwhite hover:scale-105 transition-all duration-300"
            aria-label={`Book ${pkg.name} package`}
          >
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
