import { motion } from 'framer-motion';
import { Globe, Phone, Mail, MapPin } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from './AnimationVariants';

const footerLinks = [
  {
    title: 'Experience',
    links: ['Adventure', 'Stay', 'Camping', 'Groups', 'Family'],
  },
  {
    title: 'LIVZO',
    links: ['About Us', 'Gallery', 'Careers', 'Blog'],
  },
  {
    title: 'Help',
    links: ['Contact', 'FAQ', 'Cancellation', 'Terms'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-offwhite/60" role="contentinfo">
      <div className="container-editorial px-5 md:px-10 py-16 md:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Brand column */}
          <motion.div variants={staggerItem} className="lg:col-span-4">
            <h3 className="font-serif text-2xl text-offwhite mb-4">LIVZO</h3>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Adventure, stay, food and moments worth remembering. A premium
              nature resort experience.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-offwhite/15 hover:border-sand hover:text-sand transition-all duration-300"
                aria-label="Instagram"
              >
                <Globe size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-offwhite/15 hover:border-sand hover:text-sand transition-all duration-300"
                aria-label="Phone"
              >
                <Phone size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-offwhite/15 hover:border-sand hover:text-sand transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <motion.div
              key={col.title}
              variants={staggerItem}
              className="lg:col-span-2"
            >
              <h4 className="text-meta text-offwhite/80 text-[0.65rem] mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-sand transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div variants={staggerItem} className="lg:col-span-2">
            <h4 className="text-meta text-offwhite/80 text-[0.65rem] mb-5">
              Visit Us
            </h4>
            <div className="flex items-start gap-2 text-sm">
              <MapPin size={14} className="mt-1 flex-shrink-0" />
              <p>LIVZO Resorts,<br />Gujarat, India</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-offwhite/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-offwhite/30">
            © {new Date().getFullYear()} LIVZO India. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-offwhite/30 hover:text-offwhite/60 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-offwhite/30 hover:text-offwhite/60 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
