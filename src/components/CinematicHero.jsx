import { useEffect, useRef } from 'react';
import './CinematicHero.css';
import ExperienceNav from './ExperienceNav';

// Exact URLs enforced by the prompt
const SKY_URL = 'https://raft-blast-61784561.figma.site/_assets/v11/16b5007d9c93971e26ffe4e0e3e37946f6bd538c.png';
const SPLIT_LEFT = 'https://raft-blast-61784561.figma.site/_assets/v11/7536d7b60a1fce482cf6edf3f0bffd3bad5d0f8a.png';
const SPLIT_RIGHT = 'https://raft-blast-61784561.figma.site/_assets/v11/392db6a6a6b98e868bd7f8d3f55bb719d51e5028.png';
const BRIDGE = 'https://raft-blast-61784561.figma.site/_assets/v11/c6a6d8ef49bca43f708aa852692942c45ec950d4.png';
const FRAME_TWO = 'https://raft-blast-61784561.figma.site/_assets/v11/ba75252bab2b1c510987b74837770f7bc8a6b2d4.png';

// Math helpers
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (e0, e1, v) => {
  const x = clamp((v - e0) / (e1 - e0));
  return x * x * (3 - 2 * x);
};
const lerp = (a, b, t) => a + (b - a) * t;
const segmentInOut = (s, a, b, c, d) => {
  const enter = smoothstep(a, b, s);
  const exit = smoothstep(c, d, s);
  return { enter, exit, active: enter * (1 - exit) };
};

export default function CinematicHero() {
  const scrollContainerRef = useRef(null);

  // Animation state ref to avoid React renders in the hot loop
  const state = useRef({
    targetMouseX: 0,
    targetMouseY: 0,
    mouseX: 0,
    mouseY: 0,
    targetScroll: 0,
    smoothScroll: 0,
    initialized: false,
    rafPending: false,
    reduceMotion: false
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    state.current.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getScrollDistance = () => {
      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      return clamp(-rect.top, 0, maxScroll);
    };

    const update = () => {
      const s = state.current;
      s.rafPending = false;

      s.targetScroll = getScrollDistance();

      if (!s.initialized || s.reduceMotion) {
        s.smoothScroll = s.targetScroll;
        s.mouseX = s.targetMouseX;
        s.mouseY = s.targetMouseY;
        s.initialized = true;
      } else {
        // Lowered lerp value for silkier, smoother inertia
        s.smoothScroll = lerp(s.smoothScroll, s.targetScroll, 0.08);
        s.mouseX = lerp(s.mouseX, s.targetMouseX, 0.05);
        s.mouseY = lerp(s.mouseY, s.targetMouseY, 0.05);
      }

      if (Math.abs(s.smoothScroll - s.targetScroll) < 0.01) s.smoothScroll = s.targetScroll;

      // Compressed animation math for faster scroll completion (finishes in 800px)
      const frame2 = segmentInOut(s.smoothScroll, 150, 350, 550, 700);
      const progress = clamp(s.smoothScroll / 1000);
      const introExit = smoothstep(50, 250, s.smoothScroll);
      
      const blurActive = clamp(frame2.active); // Simplified since we removed frame3
      const frame2Opacity = frame2.active;
      const splitDrift = Math.pow(frame2.enter, 1.5);
      
      const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18;
      const sharedHeroY = progress * -74;
      const sharedHeroScale = progress * 0.23;

      const mX = s.reduceMotion ? 0 : s.mouseX;
      const mY = s.reduceMotion ? 0 : s.mouseY;

      // Write CSS variables directly to the container
      container.style.setProperty('--mx', mX);
      container.style.setProperty('--my', mY);

      container.style.setProperty('--back-opacity', 1 - frame2.active * 0.06);
      container.style.setProperty('--back-x', `${mX * -12}px`);
      container.style.setProperty('--back-y', `${mY * -4}px`);
      container.style.setProperty('--back-scale', backScale);
      container.style.setProperty('--blur-px', `${blurActive * 14}px`);
      container.style.setProperty('--back-brightness', 1 - blurActive * 0.255);

      container.style.setProperty('--shade-opacity', '1');
      container.style.setProperty('--shade-z', frame2.active > 0.02 ? '2' : '0');
      container.style.setProperty('--shade-top-alpha', blurActive * 0.465);
      container.style.setProperty('--shade-mid-alpha', blurActive * 0.42);
      container.style.setProperty('--shade-bottom-alpha', blurActive * 0.51);

      container.style.setProperty('--title-y', `0px`);
      container.style.setProperty('--title-scale', `1`);
      container.style.setProperty('--title-opacity', `1`);

      container.style.setProperty('--bridge-x', `calc(-50% + ${mX * 18}px)`);
      container.style.setProperty('--bridge-y', `${mY * 8 + sharedHeroY - frame2.exit * 760}px`);
      container.style.setProperty('--bridge-bottom', `${5 - frame2.enter * 13}vh`);
      container.style.setProperty('--bridge-width', `${67.2 + frame2.enter * 37.8}vw`);
      container.style.setProperty('--bridge-scale', 1.02 + sharedHeroScale + frame2.exit * 0.46);

      container.style.setProperty('--split-left-x', `calc(-50% + ${-splitDrift * 46}vw + ${mX * 22}px)`);
      container.style.setProperty('--split-left-y', `${mY * 10 + sharedHeroY - splitDrift * 180}px`);
      container.style.setProperty('--split-left-scale', 1 + sharedHeroScale + frame2.enter * 0.74);

      container.style.setProperty('--split-right-x', `calc(-50% + ${splitDrift * 46}vw + ${mX * 22}px)`);
      container.style.setProperty('--split-right-y', `${mY * 10 + sharedHeroY - splitDrift * 180}px`);
      container.style.setProperty('--split-right-scale', 1 + sharedHeroScale + frame2.enter * 0.74);

      container.style.setProperty('--frame2-opacity', frame2Opacity);
      container.style.setProperty('--frame2-x', `calc(-50% + ${mX * 10}px)`);
      container.style.setProperty('--frame2-y', `calc(-50% + ${mY * 8 - frame2.exit * 150}px)`);
      container.style.setProperty('--frame2-scale', 1.06 + frame2.enter * 0.08 + frame2.exit * 0.08);

      container.style.setProperty('--intro-copy-y', `${introExit * 90}px`);
      container.style.setProperty('--intro-copy-opacity', 1 - introExit);

      const navEnter = smoothstep(650, 800, s.smoothScroll);
      container.style.setProperty('--nav-y', `${(1 - navEnter) * 100}%`);
      container.style.setProperty('--nav-opacity', `${navEnter}`);

      // Continue loop if moving
      if (
        Math.abs(s.smoothScroll - s.targetScroll) > 0.01 ||
        Math.abs(s.mouseX - s.targetMouseX) > 0.001 ||
        Math.abs(s.mouseY - s.targetMouseY) > 0.001
      ) {
        requestTick();
      }
    };

    const requestTick = () => {
      if (!state.current.rafPending) {
        state.current.rafPending = true;
        requestAnimationFrame(update);
      }
    };

    const handleScroll = () => {
      requestTick();
    };

    const handlePointerMove = (e) => {
      state.current.targetMouseX = e.clientX / window.innerWidth - 0.5;
      state.current.targetMouseY = e.clientY / window.innerHeight - 0.5;
      requestTick();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', requestTick);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Initial frame
    requestTick();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', requestTick);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <section className="cinema-scroll" ref={scrollContainerRef} aria-label="Cinematic scroll story">
      <div className="cinema-stage">
        <div className="cinema-world">
          <img src={SKY_URL} className="scene-img sky-img" alt="" />

          <h1 className="cinema-title">LIVZO</h1>

          <img src={SPLIT_LEFT} className="scene-img splitframe-img splitframe-left" alt="" />
          <img src={SPLIT_RIGHT} className="scene-img splitframe-img splitframe-right" alt="" />

          <img src={BRIDGE} className="scene-img bridge-img" alt="" />
          <img src={FRAME_TWO} className="scene-img frame-two-img" alt="" />

          <div className="cinema-shade" />
        </div>

        <section className="cinema-intro" aria-label="Overview">
          <p>Live the Adventure. Live the Experience. Live the moment. Livzo</p>
          <div className="hero-tags" aria-label="Highlights">
            <span>Premium Stay</span>
            <span>Wild Adventure</span>
            <span>Family Escapes</span>
          </div>
        </section>

        <div className="cinema-nav-wrapper">
           <ExperienceNav />
        </div>
      </div>
    </section>
  );
}
