import { motion } from 'framer-motion';
import { adventurePackages, formatPrice } from '../data/packages';
import { fadeUp, lineGrow, staggerContainer, staggerItem, viewportOnce } from './AnimationVariants';

const progressionSteps = adventurePackages.map((pkg) => ({
  id: pkg.id,
  name: pkg.name.replace('LIVZO ', ''),
  difficulty: pkg.difficulty,
  price: pkg.price,
}));

export default function AdventureProgression() {
  return (
    <section className="section-padding bg-cream" aria-label="Adventure Progression">
      <div className="container-editorial px-5 md:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="text-eyebrow text-earth mb-4">The Journey</p>
          <h2 className="heading-section text-forest text-3xl md:text-4xl">
            Easy <span className="font-serif italic font-light mx-2">to</span> Extreme
          </h2>
        </motion.div>

        {/* Progression timeline */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Vertical line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-sand/60 md:-translate-x-px"
            variants={lineGrow}
            style={{ transformOrigin: 'top' }}
          />

          {progressionSteps.map((step, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={step.id}
                variants={staggerItem}
                className={`relative flex items-start mb-10 md:mb-12 last:mb-0 ${
                  isLeft
                    ? 'md:flex-row md:text-right'
                    : 'md:flex-row-reverse md:text-left'
                } pl-12 md:pl-0`}
              >
                {/* Dot on the line */}
                <div className="absolute left-4 md:left-1/2 top-1 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-forest border-2 border-sand z-10" />

                {/* Content */}
                <div
                  className={`md:w-1/2 ${
                    isLeft ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className={`flex items-baseline gap-3 mb-1 ${isLeft ? 'md:justify-end' : ''}`}>
                    <h3 className="font-serif text-xl md:text-2xl text-forest">
                      {step.name}
                    </h3>
                    <span className="text-meta text-earth/40 text-[0.6rem]">
                      {step.difficulty}
                    </span>
                  </div>
                  <p className="font-serif text-lg text-earth">
                    ₹{formatPrice(step.price)}
                  </p>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
