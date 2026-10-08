import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { List, X, Phone, Handbag, Heart } from '@phosphor-icons/react';
import { nav, company } from '../data/site';
import { useCart, useWishlist } from '../store';
import { Button, Container } from './ui';
import { cn } from '../lib/format';

export const Logo = ({ white, className }) => (
  <img
    src={white ? '/brand/touchbase-logo-white.svg' : '/brand/touchbase-logo.svg'}
    alt="Touchbase Technologies: Connect, Innovate, Collaborate"
    className={cn('h-9 w-auto sm:h-10', className)}
  />
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const openDrawer = useCart((s) => s.openDrawer);
  const wish = useWishlist((s) => s.ids.length);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  // Lock page scroll while the mobile menu is open; Escape closes it
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { root.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={cn('sticky top-0 z-40 bg-white/85 backdrop-blur-xl transition-shadow', scrolled && 'shadow-[0_1px_0_var(--color-line)]')}>
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link to="/" aria-label="Touchbase Technologies home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium tracking-tight transition',
                  isActive ? 'border-line bg-white text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)]' : 'border-transparent text-ink/70 hover:text-ink',
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={company.phoneHref} aria-label={`Call ${company.phone}`} className="hidden h-10 w-10 place-items-center rounded-full border border-line hover:bg-mist xl:grid">
            <Phone size={18} />
          </a>
          <Link to="/shop?wishlist=1" aria-label={`Wishlist (${wish})`} className="relative hidden h-10 w-10 place-items-center rounded-full border border-line hover:bg-mist sm:grid">
            <Heart size={18} />
            {wish > 0 && <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-red px-1 text-[10px] font-bold text-white">{wish}</span>}
          </Link>
          <button type="button" onClick={openDrawer} aria-label={`Cart (${count} items)`} className="relative grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-mist">
            <Handbag size={18} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-red px-1 text-[10px] font-bold text-white">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <span className="hidden sm:block">
            <Button to="/contact" size="sm" variant="red" arrow>Get a quote</Button>
          </span>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="max-h-[calc(100svh-72px)] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden">
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} className={({ isActive }) => cn('rounded-2xl px-4 py-3 text-lg', isActive ? 'bg-mist font-semibold' : '')}>
                  {n.label}
                </NavLink>
              ))}
              <Link to="/shop?wishlist=1" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3 text-lg sm:hidden">
                Wishlist <span className="num rounded-full bg-mist px-2.5 py-0.5 text-sm">{wish}</span>
              </Link>
              <div className="mt-3 flex gap-2 pb-[env(safe-area-inset-bottom)]">
                <Button to="/contact" variant="red" arrow className="flex-1" onClick={() => setOpen(false)}>Get a quote</Button>
                <Button href={company.whatsapp} variant="outline">WhatsApp</Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
