import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './ExperienceTour.css';

// ── Tour step data (matches existing CATEGORIES in ExperienceExplorer) ──
export const TOUR_STEPS = [
  {
    tabId: 'per-person',
    title: 'Per Person',
    description: 'Individual packages with adventure, stay, and meals — priced per person.',
  },
  {
    tabId: 'group',
    title: 'Groups',
    description: 'Bring your people. The more you bring, the better the price.',
  },
  {
    tabId: 'short-stay',
    title: 'Short Stay',
    description: 'Quick escapes — from a few hours to an overnight getaway.',
  },
  {
    tabId: 'camping',
    title: 'Camping',
    description: 'Experience LIVZO under the open sky — tents, bonfires, and stars.',
  },
  {
    tabId: 'classic',
    title: 'Classic',
    description: 'The essential LIVZO family experience with pool, meals, and comfort.',
  },
  {
    tabId: 'adventure',
    title: 'Adventure',
    description: '46 unique activities — from kayaking to jeep safaris to archery.',
  },
];

export const TOUR_KEY = 'livzo-experience-tour-completed';

// ── Shared animation config ──
const EASE = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: EASE } },
};

const fadeScale = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: EASE } },
};

// ── Tour Intro ──
function TourIntro({ onStart, onSkip }) {
  return (
    <motion.div className="tour-intro" {...fadeUp}>
      <p className="tour-intro__eyebrow">Explore LIVZO</p>
      <h3 className="tour-intro__heading">
        Discover the different ways to experience LIVZO.
      </h3>
      <div className="tour-intro__actions">
        <button className="tour-intro__cta" onClick={onStart} aria-label="Start the guided tour">
          Let's explore <ArrowRight size={15} />
        </button>
        <button className="tour-skip" onClick={onSkip} aria-label="Skip the tour">
          Skip
        </button>
      </div>
    </motion.div>
  );
}

// ── Progress Dots ──
function TourProgress({ current, total }) {
  return (
    <div className="tour-progress" aria-label={`Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`tour-dot${i === current ? ' tour-dot--active' : ''}`}
        />
      ))}
    </div>
  );
}

// ── Guide Card ──
function TourGuide({ step, stepIndex, totalSteps, onNext, onBack, onSkip }) {
  const guideRef = useRef(null);

  // Focus the guide card on step change for accessibility
  useEffect(() => {
    if (guideRef.current) {
      guideRef.current.focus({ preventScroll: true });
    }
  }, [stepIndex]);

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === totalSteps - 1;

  return (
    <motion.div
      ref={guideRef}
      className="tour-guide"
      tabIndex={-1}
      role="dialog"
      aria-label={`Tour: ${step.title}`}
      {...fadeScale}
      key={`guide-${stepIndex}`}
    >
      <div className="tour-guide__header">
        <p className="tour-guide__eyebrow">
          {String(stepIndex + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
        </p>
        <button className="tour-skip" onClick={onSkip} aria-label="Skip the tour">
          Skip
        </button>
      </div>

      <h4 className="tour-guide__title">{step.title}</h4>
      <p className="tour-guide__description">{step.description}</p>

      <div className="tour-guide__footer">
        <TourProgress current={stepIndex} total={totalSteps} />

        <div className="tour-nav">
          {!isFirst && (
            <button
              className="tour-nav__btn tour-nav__btn--back"
              onClick={onBack}
              aria-label="Go to previous step"
            >
              <ArrowLeft size={13} /> Back
            </button>
          )}
          <button
            className={`tour-nav__btn tour-nav__btn--primary`}
            onClick={onNext}
            aria-label={isLast ? 'Finish tour and start exploring' : 'Go to next step'}
          >
            {isLast ? 'Start Exploring' : 'Next'} <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Tour Completion ──
function TourComplete() {
  return (
    <motion.div className="tour-complete" {...fadeUp}>
      <h3 className="tour-complete__heading">You're in.</h3>
      <p className="tour-complete__sub">
        Find the experience that feels like you.
      </p>
    </motion.div>
  );
}

// ── Main ExperienceTour Component ──
export default function ExperienceTour({
  phase,       // 'intro' | 'active' | 'complete' | null
  tourStep,
  onStart,
  onNext,
  onBack,
  onSkip,
}) {
  const totalSteps = TOUR_STEPS.length;
  const currentStep = TOUR_STEPS[tourStep] || TOUR_STEPS[0];

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (phase !== 'active') return;

    switch (e.key) {
      case 'ArrowRight':
      case 'Enter':
        e.preventDefault();
        onNext();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (tourStep > 0) onBack();
        break;
      case 'Escape':
        e.preventDefault();
        onSkip();
        break;
      default:
        break;
    }
  }, [phase, tourStep, onNext, onBack, onSkip]);

  useEffect(() => {
    if (phase === 'active' || phase === 'intro') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [phase, handleKeyDown]);

  if (!phase) return null;

  return (
    <>
      {/* Subtle backdrop */}
      <AnimatePresence>
        {(phase === 'intro' || phase === 'active') && (
          <motion.div
            className="tour-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Tour content */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <TourIntro key="intro" onStart={onStart} onSkip={onSkip} />
        )}

        {phase === 'active' && (
          <TourGuide
            key={`step-${tourStep}`}
            step={currentStep}
            stepIndex={tourStep}
            totalSteps={totalSteps}
            onNext={onNext}
            onBack={onBack}
            onSkip={onSkip}
          />
        )}

        {phase === 'complete' && (
          <TourComplete key="complete" />
        )}
      </AnimatePresence>
    </>
  );
}
