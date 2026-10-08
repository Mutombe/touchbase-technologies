import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import { company } from '../data/site';

// Floating WhatsApp chat button in Touchbase red, with a one-time greeting bubble.
export default function WhatsAppButton() {
  const [hint, setHint] = useState(false);

  // Greet once, after the visitor has scrolled past the hero (so it never covers the slide controls)
  useEffect(() => {
    let hide;
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.8) return;
      window.removeEventListener('scroll', onScroll);
      setHint(true);
      hide = setTimeout(() => setHint(false), 8000);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(hide); };
  }, []);

  const href = `${company.whatsapp}?text=${encodeURIComponent('Hi Touchbase, I’d like some help with…')}`;

  return (
    <div className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex items-center gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {hint && (
          <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-[13.5px] shadow-[var(--shadow-lift)] sm:block"
          >
            <span className="block font-medium">Questions? Chat with us</span>
            <span className="text-[12px] text-muted">An engineer usually replies in minutes</span>
          </motion.a>
        )}
      </AnimatePresence>
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Touchbase on WhatsApp"
        onMouseEnter={() => setHint(true)}
        onMouseLeave={() => setHint(false)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.6 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-red text-white shadow-[0_10px_30px_-6px_rgb(225_6_0/0.6)] transition-colors hover:bg-red-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
      >
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-red/40" aria-hidden />
        <WhatsappLogo size={30} weight="fill" className="relative" />
      </motion.a>
    </div>
  );
}
