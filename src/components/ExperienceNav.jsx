import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportOnce } from './AnimationVariants';

const experiences = [
  {
    id: 'adventure',
    number: '01',
    label: 'Adventure',
    description: 'Climb, zip, trek — find your edge in the wild.',
    href: '#adventure',
  },
  {
    id: 'stay',
    number: '02',
    label: 'Stay',
    description: 'Comfortable rooms surrounded by nature\'s quiet.',
    href: '#stay',
  },
  {
    id: 'camp',
    number: '03',
    label: 'Camp',
    description: 'Sleep under the stars. Wake up to birdsong.',
    href: '#camping',
  },
  {
    id: 'groups',
    number: '04',
    label: 'Groups',
    description: 'Big experiences are better together.',
    href: '#groups',
  },
];

export default function ExperienceNav() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="experiences" className="section-padding bg-cream" aria-label="Experience Categories">
      <div className="container-editorial">
        <motion.p
          className="text-eyebrow text-earth mb-10 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          How do you want to experience LIVZO?
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {experiences.map((exp, i) => (
            <motion.a
              key={exp.id}
              href={exp.href}
              variants={staggerItem}
              className={`group block py-8 px-6 lg:px-8 transition-colors duration-300 ${i < experiences.length - 1
                  ? 'border-b sm:border-b lg:border-b-0 lg:border-r border-sand/40'
                  : ''
                } ${i === 1 ? 'sm:border-r sm:border-sand/40 lg:border-r' : ''} ${hoveredId === exp.id ? 'bg-forest' : 'hover:bg-forest/5'
                }`}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span className={`text-meta text-xs block mb-3 transition-colors duration-300 ${hoveredId === exp.id ? 'text-sand/60' : 'text-earth/40'
                }`}>
                {exp.number}
              </span>

              <h3 className={`font-serif text-3xl md:text-4xl font-light mb-2 transition-colors duration-300 ${hoveredId === exp.id ? 'text-offwhite' : 'text-forest'
                }`}>
                {exp.label}
              </h3>

              <p className={`text-sm leading-relaxed transition-colors duration-300 ${hoveredId === exp.id ? 'text-offwhite/50' : 'text-charcoal/50'
                }`}>
                {exp.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
