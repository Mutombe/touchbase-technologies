import { Link } from 'react-router-dom';
import { Phone, EnvelopeSimple, MapPin, Clock } from '@phosphor-icons/react';
import { company, nav, solutions } from '../data/site';
import { Container, Button, Arrow } from './ui';
import { Logo } from './Navbar';

export default function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="tex-grid relative overflow-hidden rounded-[2rem] bg-ink text-white">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-red/20 blur-3xl" />
        <Container className="relative py-12 sm:py-20">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-12">
            <div className="col-span-2 lg:col-span-1">
              <Logo white className="h-11 sm:h-12" />
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
                Video conferencing, AV, security and networks, designed, installed and supported by one team.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button to="/planner" variant="red" size="sm" arrow>Plan a meeting room</Button>
                <Button href={company.whatsapp} variant="glass" size="sm" arrow>Chat on WhatsApp</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/40">Explore</h3>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {nav.map((n) => (
                  <li key={n.to}><Link to={n.to} className="text-white/80 hover:text-white">{n.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/40">Solutions</h3>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {solutions.map((s) => (
                  <li key={s.slug}><Link to={`/solutions/${s.slug}`} className="text-white/80 hover:text-white">{s.tag}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-sm font-semibold text-white/40">Contact</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-white/80">
                <li className="flex gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-red-bright" /><a href={company.phoneHref}>{company.phone}</a></li>
                <li className="flex gap-3"><EnvelopeSimple size={18} className="mt-0.5 shrink-0 text-red-bright" /><a href={`mailto:${company.email}`}>{company.email}</a></li>
                <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-red-bright" />{company.address}</li>
                <li className="flex gap-3"><Clock size={18} className="mt-0.5 shrink-0 text-red-bright" />{company.hours}</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 pb-[env(safe-area-inset-bottom)] text-[13px] text-white/45 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Touchbase Technologies. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {company.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                  {s.label} <Arrow />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
