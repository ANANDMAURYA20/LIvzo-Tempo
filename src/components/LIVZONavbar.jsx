import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Experiences', href: '#experiences' },
  { label: 'Adventure', href: '#adventure' },
  { label: 'Stay', href: '#stay' },
  { label: 'Camping', href: '#camping' },
  { label: 'Groups', href: '#groups' },
];

export default function LIVZONavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-offwhite/95 backdrop-blur-md border-b border-sand/30'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="container-editorial flex items-center justify-between h-16 md:h-20 px-5 md:px-10" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <a
            href="#"
            className={`font-serif text-xl md:text-2xl font-semibold tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-forest' : 'text-offwhite'
            }`}
            aria-label="LIVZO Resorts Home"
          >
            LIVZO
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-meta transition-colors duration-300 hover:opacity-70 ${
                  scrolled ? 'text-charcoal' : 'text-offwhite/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className={`hidden lg:flex items-center gap-2 text-meta px-5 py-2.5 transition-all duration-300 ${
              scrolled
                ? 'bg-forest text-offwhite hover:bg-charcoal'
                : 'bg-offwhite/15 text-offwhite border border-offwhite/30 hover:bg-offwhite/25'
            }`}
          >
            Book Now
            <ArrowRight size={14} />
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              scrolled ? 'text-forest' : 'text-offwhite'
            }`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-forest flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.nav
              className="flex flex-col items-center gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.15 },
                },
              }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-4xl text-offwhite/90 hover:text-sand transition-colors"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/917046267684"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                Book Now
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
