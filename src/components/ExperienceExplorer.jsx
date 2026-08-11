import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  adventurePackages,
  roomPackages,
  campingExperiences,
  groupPackages,
  familyPackage,
  formatPrice,
  images,
} from '../data/packages';
import { adventureCarouselItems } from '../data/adventures';
import DepthCarousel from './DepthCarousel';
import './ExperienceExplorer.css';

// ─── Data-driven tab definitions ───
const CATEGORIES = [
  { id: 'per-person', label: 'Per Person' },
  { id: 'group', label: 'Groups' },
  { id: 'short-stay', label: 'Short Stay' },
  { id: 'camping', label: 'Camping' },
  { id: 'classic', label: 'Classic' },
  { id: 'adventure', label: 'Adventure' },
];

// ─── Shared animation config ───
const TRANSITION = { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] };

const panelVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { ...TRANSITION, staggerChildren: 0.06, delayChildren: 0.1 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariant = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: TRANSITION },
};

// ─── Reusable Package Card ───
function PackageCard({ pkg, index, total, featured = false, dark = false }) {
  const cardClass = [
    'experience-card',
    featured && 'experience-card--featured',
    dark && 'experience-card--dark',
  ].filter(Boolean).join(' ');

  const inclusions = pkg.activities || pkg.tagline || '';

  return (
    <motion.article className={cardClass} variants={cardVariant}>
      {pkg.image && (
        <div className="card-image">
          <img
            src={pkg.image}
            alt={pkg.name}
            loading="lazy"
          />
          <div className="card-image-overlay" />
          {total > 1 && (
            <span className="card-counter">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          )}
        </div>
      )}

      <div className="card-body">
        {pkg.difficulty && (
          <p className="card-eyebrow">{pkg.difficulty}</p>
        )}
        <h3 className="card-title">{pkg.name}</h3>
        <p className="card-description">{pkg.description}</p>

        {inclusions && (
          <div className="card-inclusions">
            {typeof inclusions === 'string'
              ? inclusions.split('+').map((s, i) => <span key={i}>{s.trim()}</span>)
              : null}
          </div>
        )}

        <div className="card-footer">
          <div>
            <div className="card-price">
              {pkg.price !== null && pkg.price !== undefined
                ? `₹${formatPrice(pkg.price)}`
                : 'Price on request'}
            </div>
            <div className="card-price-unit">{pkg.unit || 'per person'}</div>
          </div>
          <a
            href="https://wa.me/917046267684"
            target="_blank"
            rel="noopener noreferrer"
            className="card-cta"
          >
            Explore <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Per Person Panel ───
function PerPersonPanel() {
  // User requested all current adventure packages to be shown in the Per Person tab
  const featured = adventurePackages.find(p => p.featured) || adventurePackages[0];
  const rest = adventurePackages.filter(p => p.id !== featured.id);

  return (
    <motion.div variants={panelVariants} initial="enter" animate="center" exit="exit">
      {/* Featured hero card */}
      <div className="mb-6">
        <PackageCard pkg={featured} index={0} total={adventurePackages.length} featured />
      </div>

      {/* Remaining cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((pkg, i) => (
          <PackageCard key={pkg.id} pkg={pkg} index={i + 1} total={adventurePackages.length} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Group Panel ───
function GroupPanel() {
  return (
    <motion.div variants={panelVariants} initial="enter" animate="center" exit="exit">
      {/* Hero image for groups */}
      <motion.div
        className="experience-card mb-6"
        variants={cardVariant}
        style={{ overflow: 'hidden' }}
      >
        <div className="card-image" style={{ aspectRatio: '21 / 9' }}>
          <img src={images.groups} alt="Group experiences at LIVZO" loading="lazy" />
          <div className="card-image-overlay" />
        </div>
        <div className="card-body">
          <p className="card-eyebrow">Group Experiences</p>
          <h3 className="card-title" style={{ fontSize: '2rem' }}>
            Better together.
          </h3>
          <p className="card-description" style={{ maxWidth: '520px' }}>
            From intimate gatherings to full-scale events. The more you bring, the better the price.
          </p>
        </div>
      </motion.div>

      {/* Group pricing table */}
      <motion.div className="group-grid" variants={cardVariant}>
        {groupPackages.map((g) => (
          <a
            key={g.id}
            href="https://wa.me/917046267684"
            target="_blank"
            rel="noopener noreferrer"
            className="group-row"
            style={{ textDecoration: 'none' }}
          >
            <div>
              <div className="group-name">{g.name}</div>
              <div className="group-people">{g.people} people{g.note ? ` · ${g.note}` : ''}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="group-price">₹{formatPrice(g.pricePerPerson)}</div>
              <div className="group-price-unit">per person</div>
            </div>
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── Short Stay Panel ───
function ShortStayPanel() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={panelVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {roomPackages.map((room, i) => (
        <motion.article key={room.id} className="experience-card" variants={cardVariant}>
          <div className="card-image">
            <img src={images.room} alt={`${room.duration} room stay`} loading="lazy" />
            <div className="card-image-overlay" />
            <span className="card-counter">{room.durationShort}</span>
          </div>
          <div className="card-body">
            <p className="card-eyebrow">Short Stay</p>
            <h3 className="card-title">{room.duration}</h3>
            <p className="card-description">{room.description}</p>
            <div className="card-footer">
              <div>
                <div className="card-price">₹{formatPrice(room.price)}</div>
                <div className="card-price-unit">per stay</div>
              </div>
              <a
                href="https://wa.me/917046267684"
                target="_blank"
                rel="noopener noreferrer"
                className="card-cta"
              >
                Book <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

// ─── Camping Panel ───
function CampingPanel() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={panelVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {campingExperiences.map((exp, i) => (
        <motion.article key={exp.id} className="experience-card experience-card--dark" variants={cardVariant}>
          <div className="card-image">
            <img src={exp.image} alt={exp.name} loading="lazy" />
            <div className="card-image-overlay" />
          </div>
          <div className="card-body">
            <p className="card-eyebrow">{exp.tagline}</p>
            <h3 className="card-title">{exp.name}</h3>
            <div className="card-inclusions">
              {exp.includes.map((item, j) => <span key={j}>{item}</span>)}
            </div>
            <div className="card-footer">
              <div>
                <div className="card-price">
                  {exp.price ? `₹${formatPrice(exp.price)}` : 'Price on request'}
                </div>
                <div className="card-price-unit">per person</div>
              </div>
              <a
                href="https://wa.me/917046267684"
                target="_blank"
                rel="noopener noreferrer"
                className="card-cta"
              >
                Enquire <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

// ─── Classic Panel ───
function ClassicPanel() {
  const fp = familyPackage;
  return (
    <motion.div variants={panelVariants} initial="enter" animate="center" exit="exit">
      <motion.article className="experience-card experience-card--featured" variants={cardVariant}>
        <div className="card-image">
          <img src={fp.image} alt="LIVZO Classic — Family Escape" loading="lazy" />
          <div className="card-image-overlay" />
        </div>
        <div className="card-body">
          <p className="card-eyebrow">Classic Experience</p>
          <h3 className="card-title">{fp.name}</h3>
          <p className="card-description" style={{ fontStyle: 'italic', opacity: 0.55 }}>
            {fp.tagline}
          </p>
          <div className="card-inclusions">
            {fp.includes.slice(0, 4).map((item, i) => <span key={i}>{item.item}</span>)}
          </div>
          <div className="card-footer">
            <div>
              <div className="card-price">₹{formatPrice(fp.price)}</div>
              <div className="card-price-unit">{fp.unit}</div>
            </div>
            <a
              href="https://wa.me/917046267684"
              target="_blank"
              rel="noopener noreferrer"
              className="card-cta"
            >
              Explore <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

// ─── Adventure Panel ───
function AdventurePanel() {
  return (
    <motion.div variants={panelVariants} initial="enter" animate="center" exit="exit">
      <motion.div variants={cardVariant}>
        <p className="card-eyebrow" style={{ marginBottom: '0.75rem' }}>46 Adventures & Experiences</p>
        <h3 className="card-title" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
          Swipe to explore what awaits you.
        </h3>
        <div style={{ height: '520px', position: 'relative' }}>
          <DepthCarousel
            items={adventureCarouselItems}
            cardWidth={320}
            cardHeight={420}
            radius={20}
            depth={200}
            spread={85}
            tilt={20}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.2}
            blur={5}
            autoplay
            autoplayDelay={3500}
            loop
            showControls
            showIndicators={false}
            showLabels
            tint="#1b3a32"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Panel router ───
const PANELS = {
  'per-person': PerPersonPanel,
  'group': GroupPanel,
  'short-stay': ShortStayPanel,
  'camping': CampingPanel,
  'classic': ClassicPanel,
  'adventure': AdventurePanel,
};

// ─── Main Component ───
export default function ExperienceExplorer() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const tabsRef = useRef(null);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (!tabsRef.current) return;
    const activeBtn = tabsRef.current.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeId]);

  const ActivePanel = PANELS[activeId];

  return (
    <section className="experience-section" id="experiences" aria-label="LIVZO Experiences">
      <div className="container-editorial">

        {/* ── Section Header ── */}
        <header className="mb-10 md:mb-14" style={{ maxWidth: '560px' }}>
          <p className="text-eyebrow text-earth mb-4" style={{ opacity: 0.5 }}>Experience</p>
          <h2 className="heading-section text-forest" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Choose how you want{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>to experience LIVZO.</span>
          </h2>
        </header>

        {/* ── Tab Navigation ── */}
        <nav ref={tabsRef} className="experience-tabs mb-10 md:mb-14" aria-label="Experience categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="experience-tab"
              data-active={activeId === cat.id}
              onClick={() => setActiveId(cat.id)}
              aria-selected={activeId === cat.id}
              role="tab"
            >
              {cat.label}
              {activeId === cat.id && (
                <motion.div
                  className="tab-indicator"
                  layoutId="tabIndicator"
                  style={{ left: 0, right: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* ── Content Panel ── */}
        <div style={{ minHeight: '420px' }}>
          <AnimatePresence mode="wait">
            <ActivePanel key={activeId} />
          </AnimatePresence>
        </div>

        {/* ── Editorial accent ── */}
        <p
          className="font-script text-earth mt-12 md:mt-16 text-center"
          style={{ opacity: 0.25, fontSize: '1.125rem' }}
        >
          crafted for your escape
        </p>

      </div>
    </section>
  );
}
