import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tent, Flame, Sparkles } from 'lucide-react';
import { campingExperiences, images } from '../data/packages';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from './AnimationVariants';

const iconMap = {
  tent: Tent,
  flame: Flame,
  sparkles: Sparkles,
};

export default function CampingSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      id="camping"
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="Camping Experience"
    >
      {/* Full-width cinematic background */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <motion.img
          src={images.camping}
          alt="Camping under the stars at LIVZO Resort"
          className="img-cinematic"
          style={{ y: imageY }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/10" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end px-5 md:px-10 pb-12 md:pb-16">
          <div className="container-editorial">
            <motion.p
              className="text-eyebrow text-sand mb-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Camping Experience
            </motion.p>
            <motion.h2
              className="heading-section text-offwhite text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Sleep Under{' '}
              <br className="hidden sm:block" />
              <span className="italic font-light">the Stars.</span>
            </motion.h2>
            <motion.p
              className="text-offwhite/50 text-sm md:text-base max-w-md"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              Leave the city behind. Experience the night differently.
            </motion.p>
            <motion.span
              className="font-script text-sand/60 text-lg mt-3 block"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              under the stars
            </motion.span>
          </div>
        </div>
      </div>

      {/* Experience tiers */}
      <div className="bg-forest">
        <div className="container-editorial px-5 md:px-10 py-12 md:py-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {campingExperiences.map((exp, i) => {
              const Icon = iconMap[exp.icon];
              return (
                <motion.div
                  key={exp.id}
                  variants={staggerItem}
                  className={`py-8 md:py-0 md:px-8 ${i < campingExperiences.length - 1
                      ? 'border-b md:border-b-0 md:border-r border-offwhite/10'
                      : ''
                    }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={18} className="text-sand" />
                    <h3 className="font-serif text-2xl text-offwhite">
                      {exp.name}
                    </h3>
                  </div>

                  <p className="text-offwhite/40 text-sm mb-4 italic font-serif">
                    {exp.tagline}
                  </p>

                  <ul className="space-y-1.5">
                    {exp.includes.map((item) => (
                      <li key={item} className="text-offwhite/50 text-sm flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-sand mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {exp.price && (
                    <p className="font-serif text-2xl text-sand mt-6">
                      ₹{formatPrice(exp.price)}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
