import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus, Check, VideoConference } from '@phosphor-icons/react';
import { Container, Label, Button, Toggle, Reveal, Counter, RoundArrow, Arrow } from '../components/ui';
import { solutions, stats, projects, process, industries, faqs, partners, company } from '../data/site';
import { rooms, platforms, plan } from '../data/planner';
import ProductCard from '../components/ProductCard';
import { solutionIcon } from '../components/icons';
import { products, categories } from '../data/products';
import { cn } from '../lib/format';
import { autoLink } from '../components/ContentLink';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Numbers />
      <Services />
      <Partners />
      <PlannerTeaser />
      <ShopPreview />
      <Process />
      <ProjectsPreview />
      <Industries />
      <FAQ />
      <CTA />
    </>
  );
}

/* ── Hero carousel ────────────────────────────────────────────────── */
// Each slide places its copy where its photo has room, and fades the navy scrim in from that side.
// `pos` / `mpos` are the desktop / phone crops; on phones the copy always sits in a bottom fade.
const SLIDES = [
  {
    image: '/img/engineer-datacentre.webp', pos: '50% 30%', mpos: '74% 20%', place: 'left',
    tag: 'Connect · Innovate · Collaborate', title: <>Technology that keeps your business <span className="accent text-red-bright">connected.</span></>,
    body: 'Video conferencing, boardroom AV, CCTV and networks, designed, installed and supported by one team.',
    cta: { label: 'Explore solutions', to: '/solutions' },
    alt: 'Smiling engineer holding a laptop in a data centre',
  },
  {
    image: '/img/engineer-code-wall.webp', pos: '35% 22%', mpos: '42% 18%', place: 'right',
    tag: 'Cloud & collaboration', title: <>Microsoft 365 and Teams, <span className="accent text-red-bright">set up properly.</span></>,
    body: 'Planned migrations, sensible security and training, so your team actually uses the tools you pay for.',
    cta: { label: 'Cloud & collaboration', to: '/solutions/cloud-collaboration' },
    alt: 'Engineer in front of a wall of code',
  },
  {
    image: '/img/server-racks.webp', pos: '50% 50%', mpos: '62% 50%', place: 'bottom-left',
    tag: 'Networking & cabling', title: <>The network <span className="accent text-red-bright">everything else</span> runs on.</>,
    body: 'Structured cabling, fibre, Wi-Fi and server rooms, tested and labelled point by point.',
    cta: { label: 'See networking', to: '/solutions/networking' },
    alt: 'Rows of server racks with status lights',
  },
  {
    image: '/img/support-desk.webp', pos: '50% 60%', mpos: '80% 62%', place: 'top-left',
    tag: 'Managed IT & support', title: <>A support desk that <span className="accent text-red-bright">already knows</span> your setup.</>,
    body: 'Monitoring, maintenance and a help desk that fixes most issues before they stop a meeting.',
    cta: { label: 'View support plans', to: '/solutions/managed-it' },
    alt: 'Support engineers working at screens in a glass-walled office',
  },
  {
    image: '/img/tablet-server-room.webp', pos: '50% 45%', mpos: '68% 45%', place: 'left',
    tag: 'Touchbase shop', title: <>Meeting-room and security tech, <span className="accent text-red-bright">delivered.</span></>,
    body: 'Video bars, cameras, displays, CCTV and networking gear with warranty, and installation if you want it.',
    cta: { label: 'Visit the shop', to: '/shop' },
    alt: 'Engineer checking a tablet in a server room',
  },
];
const SLIDE_MS = 6500;

const NAVY = '7 21 55';
const SCRIM = {
  left: `linear-gradient(90deg, rgb(${NAVY} / .94) 0%, rgb(${NAVY} / .72) 32%, rgb(${NAVY} / .18) 62%, transparent 80%)`,
  right: `linear-gradient(270deg, rgb(${NAVY} / .94) 0%, rgb(${NAVY} / .72) 32%, rgb(${NAVY} / .18) 62%, transparent 80%)`,
  'bottom-left': `radial-gradient(120% 110% at 0% 100%, rgb(${NAVY} / .95) 0%, rgb(${NAVY} / .7) 35%, rgb(${NAVY} / .1) 65%, transparent 80%)`,
  'top-left': `radial-gradient(120% 110% at 0% 0%, rgb(${NAVY} / .95) 0%, rgb(${NAVY} / .7) 35%, rgb(${NAVY} / .1) 65%, transparent 80%)`,
};
const MOBILE_SCRIM = `linear-gradient(0deg, rgb(${NAVY} / .97) 0%, rgb(${NAVY} / .82) 38%, rgb(${NAVY} / .15) 66%, rgb(${NAVY} / .35) 100%)`;

// Where the copy block sits on desktop, and where the red glow blooms behind it
const PLACE = {
  left: 'sm:justify-center sm:items-start',
  right: 'sm:justify-center sm:items-end sm:text-right',
  'bottom-left': 'sm:justify-end sm:items-start',
  'top-left': 'sm:justify-start sm:items-start',
};
const GLOW = {
  left: 'sm:-left-40 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2',
  right: 'sm:-right-40 sm:left-auto sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2',
  'bottom-left': 'sm:-left-40 sm:-bottom-40',
  'top-left': 'sm:-left-40 sm:-top-40 sm:bottom-auto',
};

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState(null);
  const reduce = useReducedMotion();
  const n = SLIDES.length;
  const sl = SLIDES[i];
  const go = (k) => setI((k + n) % n);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, n, reduce, paused]);

  const item = {
    hide: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    out: { opacity: 0, y: reduce ? 0 : -8, transition: { duration: 0.25 } },
  };

  return (
    <div className="px-1.5 pt-1.5 sm:px-2">
      <section
        className="relative isolate overflow-clip rounded-xl bg-navy-deep text-white"
        aria-roledescription="carousel"
        aria-label="Touchbase highlights"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX === null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 45) go(i + (dx < 0 ? 1 : -1));
          setTouchX(null);
        }}
      >
        <h1 className="sr-only">Touchbase Technologies: video conferencing, AV, CCTV, networking and managed IT</h1>

        {/* Slides: photo + its own scrim, crossfaded */}
        {SLIDES.map((s, k) => (
          <motion.div key={s.image} className="absolute inset-0 -z-10" initial={false} animate={{ opacity: k === i ? 1 : 0 }} transition={{ duration: 1.1, ease: 'easeInOut' }} aria-hidden={k !== i}>
            <motion.img
              src={s.image}
              alt={k === i ? s.alt : ''}
              fetchPriority={k === 0 ? 'high' : 'low'}
              className="h-full w-full object-cover [object-position:var(--mpos)] sm:[object-position:var(--pos)]"
              style={{ '--pos': s.pos, '--mpos': s.mpos }}
              initial={false}
              animate={{ scale: k === i ? 1 : 1.08 }}
              transition={{ duration: k === i && !reduce ? SLIDE_MS / 1000 + 1.1 : 0, ease: 'linear' }}
            />
            {/* Phone: subject up top, copy in a bottom fade */}
            <div className="absolute inset-0 sm:hidden" style={{ background: MOBILE_SCRIM }} />
            {/* Desktop: fade in from the side the copy sits on */}
            <div className="absolute inset-0 hidden sm:block" style={{ background: SCRIM[s.place] }} />
            <div className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-navy-deep/60 to-transparent sm:block" />
          </motion.div>
        ))}

        {/* Red splash that follows the copy */}
        <motion.div
          key={`glow-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className={cn('pointer-events-none absolute -bottom-32 -left-24 -z-10 h-[340px] w-[340px] rounded-full bg-red/35 blur-[100px] sm:h-[460px] sm:w-[460px]', GLOW[sl.place])}
        />

        <div className="flex h-[calc(100svh-84px)] max-h-[860px] min-h-[580px] flex-col px-5 pt-6 pb-5 sm:min-h-[560px] sm:px-12 sm:py-12 lg:px-16">
          {/* Copy block, positioned per slide */}
          <div className={cn('flex flex-1 flex-col justify-end', PLACE[sl.place])}>
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                className={cn('max-w-[34rem]', sl.place === 'right' && 'sm:max-w-[25rem] xl:max-w-[27rem]')}
                initial="hide"
                animate="show"
                exit="out"
                variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
              >
                <motion.div variants={item}>
                  <span className="glass-tag inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] sm:text-[12.5px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-bright" />
                    {sl.tag}
                  </span>
                </motion.div>
                <motion.h2 variants={item} className="mt-4 text-[34px] leading-[1.05] font-normal tracking-tight sm:mt-5 sm:text-[clamp(2.4rem,min(4.6vw,7.4vh),4.1rem)]">
                  {sl.title}
                </motion.h2>
                <motion.p variants={item} className={cn('mt-3 max-w-md text-[15px] leading-relaxed text-white/80 sm:mt-4 sm:text-[16px]', sl.place === 'right' && 'sm:ml-auto')}>
                  {sl.body}
                </motion.p>
                <motion.div variants={item} className="mt-6">
                  <Button to={sl.cta.to} variant="red" size="lg" arrow className="w-full sm:w-auto">{sl.cta.label}</Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 mr-[4.25rem] flex items-center gap-3 sm:mt-10 sm:mr-16 sm:justify-end">
            <RoundArrow dir="left" aria-label="Previous slide" onClick={() => go(i - 1)} className="glass-tag h-10 w-10 shrink-0 hover:bg-white/30" />
            <div className="min-w-0 flex-1 sm:w-72 sm:flex-none">
              <div className="flex items-center justify-between text-[12.5px] text-white/80" aria-live="polite">
                <span className="hidden truncate sm:inline">{sl.tag}</span>
                <span className="num shrink-0 pl-3 text-white/55">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
              </div>
              <div className="mt-2 flex gap-1.5">
                {SLIDES.map((s, k) => (
                  <button key={s.image} type="button" onClick={() => setI(k)} aria-label={`Show slide ${k + 1}: ${s.tag}`} aria-current={k === i} className="relative h-1 flex-1 rounded-full bg-white/25 before:absolute before:-inset-y-3 before:inset-x-0">
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      {k < i && <span className="absolute inset-0 bg-white" />}
                      {k === i && (
                        <motion.span
                          key={`${i}-${paused}`}
                          className="absolute inset-y-0 left-0 bg-red-bright"
                          initial={{ width: reduce || paused ? '100%' : '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: reduce || paused ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <RoundArrow dir="right" aria-label="Next slide" onClick={() => go(i + 1)} className="h-10 w-10 shrink-0 bg-red text-white hover:bg-red-2" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── About + bento ────────────────────────────────────────────────── */
function About() {
  const [live, setLive] = useState(true);
  return (
    <Container className="pt-16 sm:pt-20">
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal><Label>About Touchbase</Label></Reveal>
        <Reveal delay={0.08}>
          <p className="text-[22px] leading-[1.35] tracking-tight sm:text-[26px]">
            {autoLink('At Touchbase, we install the video rooms, CCTV and networks teams use to meet, share and stay secure, then stay on to keep it running.')}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal className="tex-grid flex min-h-[320px] flex-col overflow-hidden rounded-[1.75rem] bg-ink p-7 text-white">
          <VideoConference size={28} weight="light" />
          <p className="mt-auto text-[21px] leading-[1.3] tracking-tight">
            One-touch meeting rooms <span className="text-white/45">with 4K cameras, room-filling audio and</span> join buttons anyone can use.
          </p>
          <div className="mt-6 flex items-center justify-between gap-3">
            <Toggle dark checked={live} onChange={setLive} label="Boardroom" />
            <AnimatePresence mode="wait">
              <motion.span key={String(live)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1.5 text-[12px] text-white/50">
                <span className={cn('h-1.5 w-1.5 rounded-full', live ? 'bg-red-bright' : 'bg-white/40')} />
                {live ? 'In a call · 8 joined' : 'Available · next 14:00'}
              </motion.span>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="group relative min-h-[320px] overflow-hidden rounded-[1.75rem]">
          <img src="/img/yealink-camera-setup.webp" alt="Touchbase technician setting up a conference camera" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-6 grid place-items-center">
            <Link to="/projects" className="glass-tag rounded-full px-5 py-2 text-[14px]">Installed & tested by our team</Link>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="tex-hatch relative flex min-h-[320px] flex-col overflow-hidden rounded-[1.75rem] bg-red p-7 text-white">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <div className="accent relative text-[60px] leading-none">One team</div>
          <div className="relative mt-2 text-[15px] font-medium">From survey to support</div>
          <p className="relative mt-2 max-w-[260px] text-[12.5px] leading-snug text-white/80">No hand-offs between suppliers, installers and help desks. One partner is accountable.</p>
          <ul className="relative mt-auto space-y-2.5 pt-6 text-[14px]">
            {['Survey & design', 'Supply & install', 'Commission & train', 'Monitor & support'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-red"><Check size={11} weight="bold" /></span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Container>
  );
}

/* ── Numbers ──────────────────────────────────────────────────────── */
function Numbers() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="tex-grid relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-white sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-red/45 blur-[90px]" />
        <div className="pointer-events-none absolute -top-24 right-10 h-60 w-60 rounded-full bg-red/25 blur-[90px]" />
        <Reveal><h2 className="relative text-center text-[20px] tracking-tight text-white/80">A few more facts about us in numbers</h2></Reveal>
        <div className="relative mt-10 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-white/10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <div className="text-[38px] leading-none font-normal tracking-tight sm:text-[46px]"><Counter to={s.value} suffix={s.suffix} delay={i * 0.12} /></div>
              <div className="mx-auto mt-3 h-0.5 w-6 rounded-full bg-red-bright" />
              <div className="mt-3 text-[13px] text-white/60">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}

/* ── Services carousel (big card + "up next" card with arrows) ────── */
function Services() {
  const [i, setI] = useState(0);
  const n = solutions.length;
  const cur = solutions[i];
  const next = solutions[(i + 1) % n];
  return (
    <section className="border-t border-line">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr_0.8fr] lg:gap-6">
        <div className="flex flex-col">
          <Reveal><Label>Solutions</Label></Reveal>
          <Reveal delay={0.06}>
            <p className="mt-6 text-[22px] leading-[1.35] tracking-tight">
              Collaboration, AV, security and network services, from the first site survey to day-to-day support.
            </p>
          </Reveal>
          <div className="mt-8 lg:mt-auto">
            <Button to="/solutions" size="sm" arrow>Explore More</Button>
          </div>
        </div>

        <div className="relative h-[400px] overflow-hidden rounded-[1.75rem] lg:h-[440px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={cur.slug} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <img src={cur.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
              <span className="glass-tag absolute top-5 left-5 rounded-full px-3.5 py-1.5 text-[13px]">{cur.tag}</span>
              <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-white">
                <p className="max-w-[280px] text-[17px] leading-snug">{cur.title}</p>
                <Link to={`/solutions/${cur.slug}`} aria-label={`Learn more about ${cur.tag}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red text-white transition hover:bg-red-2"><Arrow className="h-3.5 w-3.5" /></Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col">
          <button type="button" onClick={() => setI((i + 1) % n)} className="relative block h-[210px] overflow-hidden rounded-[1.75rem] text-left">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={next.slug} className="absolute inset-0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }}>
                <img src={next.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
                <span className="glass-tag absolute top-4 left-4 rounded-full px-3 py-1 text-[12.5px]">Up next</span>
                <span className="absolute bottom-4 left-4 text-[17px] font-medium text-white">{next.tag}</span>
              </motion.div>
            </AnimatePresence>
          </button>
          <AnimatePresence mode="wait">
            <motion.p key={cur.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5 max-w-[280px] text-[14px] leading-relaxed text-ink/80">
              {autoLink(cur.body, { exclude: [`/solutions/${cur.slug}`], maxLinks: 2 })}
            </motion.p>
          </AnimatePresence>
          <div className="mt-auto flex items-center gap-2 pt-5">
            <RoundArrow dir="left" aria-label="Previous solution" onClick={() => setI((i - 1 + n) % n)} className="hover:bg-mist" />
            <RoundArrow dir="right" aria-label="Next solution" onClick={() => setI((i + 1) % n)} className="hover:bg-mist" />
            <span className="num ml-auto text-[13px] text-muted">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Partners() {
  const row = [...partners, ...partners];
  return (
    <div className="tex-hatch bg-red py-5 text-white">
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10">
          {row.map((p, i) => (
            <span key={i} className="flex h-12 items-center gap-10 whitespace-nowrap" aria-hidden={i >= partners.length}>
              <span className="flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100">
                <img src={p.logo} alt={p.label ? '' : p.name} style={{ height: p.h, marginBlock: Math.min(0, (48 - p.h) / 2) }} className="w-auto brightness-0 invert" loading="lazy" />
                {p.label && <span className="text-[19px] font-semibold tracking-tight text-white">{p.name}</span>}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mini room planner — the interactive headline feature ─────────── */
function PlannerTeaser() {
  const [room, setRoom] = useState('meeting');
  const [platform, setPlatform] = useState('teams');
  const nav = useNavigate();
  const result = plan(room, platform);

  return (
    <Container className="py-16 sm:py-24">
      <div className="tex-grid overflow-hidden rounded-[2rem] bg-ink text-white">
        <div className="grid lg:grid-cols-[1.25fr_1fr]">
          <div className="p-7 sm:p-12">
            <Label dark>Room Planner</Label>
            <h2 className="mt-6 max-w-xl text-[34px] leading-[1.1] font-normal tracking-tight sm:text-[44px]">
              Tell us about the room. <span className="text-white/45">We’ll recommend the setup.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] text-white/60">Pick a room size and your meeting platform. The recommended kit updates live.</p>

            <div className="mt-8 text-[13px] text-white/50">Room size</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {rooms.map((r) => (
                <motion.button
                  key={r.id}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRoom(r.id)}
                  aria-pressed={room === r.id}
                  className={cn('rounded-full border px-4 py-2 text-left text-[14px] transition', room === r.id ? 'border-red bg-red text-white' : 'border-white/15 text-white/75 hover:border-white/40')}
                >
                  {r.name} <span className={room === r.id ? 'text-white/75' : 'text-white/40'}>· {r.seats}</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-7 text-[13px] text-white/50">Platform</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  aria-pressed={platform === p.id}
                  className={cn('rounded-full border px-4 py-2 text-[14px] transition', platform === p.id ? 'border-white bg-white text-ink' : 'border-white/15 text-white/75 hover:border-white/40')}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div className="mt-10 grid max-w-md grid-cols-2 gap-6 text-[13px] text-white/50">
              <div>
                <div className="num text-[28px] text-white">{result.room.days}</div>
                Typical install time
              </div>
              <div>
                <div className="num text-[28px] text-white">{result.networkPoints}<span className="text-base text-white/50"> points</span></div>
                Network points needed
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-end overflow-hidden p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img key={result.room.image} src={result.room.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
            <AnimatePresence mode="wait">
              <motion.div key={room + platform} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="relative rounded-[1.5rem] bg-white p-6 text-ink">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-red-soft px-3 py-1 text-[12px] font-semibold text-red-2">Recommended setup</span>
                  <span className="text-[12px] text-muted">{result.platform.name}</span>
                </div>
                <h3 className="mt-4 text-2xl font-medium tracking-tight">{result.room.name}</h3>
                <ul className="mt-4 divide-y divide-line text-[13.5px]">
                  {result.kit.map(([k, v]) => (
                    <li key={k} className="grid gap-0.5 py-2 sm:grid-cols-[96px_1fr] sm:gap-3">
                      <span className="text-[12px] text-muted sm:text-[13.5px]">{k}</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-5 w-full" arrow onClick={() => nav(`/planner?room=${room}&platform=${platform}`)}>
                  Customise this room
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Container>
  );
}

/* ── Shop preview ─────────────────────────────────────────────────── */
function ShopPreview() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  return (
    <section className="tex-dots mb-16 bg-mist py-16 sm:mb-24 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>Shop</Label>
            <h2 className="mt-5 text-[34px] leading-[1.1] tracking-tight sm:text-[42px]">Equipment we stock <span className="text-muted">and deliver nationwide</span></h2>
          </div>
          <Button to="/shop" arrow>Visit the shop</Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => {
            const I = solutionIcon(c.icon);
            return (
              <Link key={c.id} to={`/shop?category=${c.id}`} className="group flex items-center gap-2.5 rounded-[1.25rem] bg-white p-2.5 transition hover:shadow-[var(--shadow-soft)] sm:gap-3 sm:p-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-soft text-red transition group-hover:bg-red group-hover:text-white"><I size={20} /></span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] leading-tight font-medium">{c.short}</span>
                  <span className="block text-[12px] text-muted">{products.filter((p) => p.category === c.id).length} items</span>
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </Container>
    </section>
  );
}

/* ── How we work ──────────────────────────────────────────────────── */
function Process() {
  const [i, setI] = useState(0);
  return (
    <Container className="pb-16 sm:pb-24">
      <div className="grid gap-6 md:grid-cols-2 md:items-end">
        <div>
          <Label>How we work</Label>
          <h2 className="mt-5 text-[34px] leading-[1.1] tracking-tight sm:text-[42px]">From the first site visit <span className="accent text-red">to the handover</span></h2>
        </div>
        <p className="text-[15px] leading-relaxed text-muted md:max-w-md md:justify-self-end">
          Every project follows the same path, whether it is a single huddle room or a multi-site camera rollout, so you always know what happens next.
        </p>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid gap-2">
          {process.map((p, n) => (
            <button
              key={p.n}
              type="button"
              onClick={() => setI(n)}
              onMouseEnter={() => setI(n)}
              aria-pressed={i === n}
              className={cn('flex gap-5 rounded-[1.5rem] border p-5 text-left transition sm:p-6', i === n ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink/30')}
            >
              <span className={cn('num text-[13px] font-semibold', i === n ? 'text-red-bright' : 'text-red')}>{p.n}</span>
              <span>
                <span className="block text-[19px] font-medium tracking-tight">{p.t}</span>
                <span className={cn('mt-1 block text-[14.5px]', i === n ? 'text-white/60' : 'text-muted')}>{p.b}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] lg:min-h-0">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img key={process[i].image} src={process[i].image} alt="" className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          <span className="glass-tag absolute bottom-5 left-5 rounded-full px-4 py-2 text-[14px]">Step {process[i].n} · {process[i].t}</span>
        </div>
      </div>
    </Container>
  );
}

/* ── Projects ─────────────────────────────────────────────────────── */
function ProjectsPreview() {
  const list = projects.slice(0, 4);
  return (
    <section className="tex-dots bg-mist py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>Recent work</Label>
            <h2 className="mt-5 text-[34px] leading-[1.1] tracking-tight sm:text-[42px]">Rooms and sites <span className="text-muted">our team has installed</span></h2>
          </div>
          <Button to="/projects" arrow>All projects</Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]">
              <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <span className="glass-tag absolute top-3 left-3 rounded-full px-3 py-1 text-[12px] sm:top-4 sm:left-4">{p.type}</span>
              <div className="absolute right-4 bottom-4 left-4 text-white sm:right-5 sm:bottom-5 sm:left-5">
                <div className="text-[16px] leading-snug sm:text-[18px]">{p.title}</div>
                <div className="mt-1 hidden text-[12.5px] text-white/70 sm:block">{p.scope}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── Industries ───────────────────────────────────────────────────── */
function Industries() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="grid gap-6 md:grid-cols-2 md:items-end">
        <div>
          <Label>Who we work with</Label>
          <h2 className="mt-5 text-[34px] leading-[1.1] tracking-tight sm:text-[42px]">Built for the way <span className="text-muted">your sector works.</span></h2>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {industries.map((x, i) => (
          <Reveal key={x.t} delay={i * 0.05} className="group relative h-[180px] overflow-hidden rounded-[1.5rem] sm:h-[230px]">
            <img src={x.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
            <span className="absolute bottom-4 left-4 text-[16px] font-medium text-white sm:bottom-5 sm:left-5 sm:text-[18px]">{x.t}</span>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────── */
export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Container className="pb-16 sm:pb-24">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
        <div>
          <Label>FAQ</Label>
          <h2 className="mt-5 text-[34px] leading-[1.1] tracking-tight">What clients <span className="text-muted">usually ask us</span></h2>
          <p className="mt-4 max-w-xs text-[15px] text-muted">Still unsure? Our engineers reply on WhatsApp within minutes during working hours.</p>
          <Button href={company.whatsapp} variant="outline" size="sm" arrow className="mt-6">Ask an engineer</Button>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-medium tracking-tight">
                {f.q}
                <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition', open === i && 'rotate-45 border-red bg-red text-white')}><Plus size={14} /></span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">{autoLink(f.a)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

/* ── CTA ──────────────────────────────────────────────────────────── */
export function CTA() {
  return (
    <Container className="pb-4">
      <section className="relative isolate overflow-hidden rounded-[1.75rem] bg-ink">
        <img src="/img/globe-lines.webp" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-bottom" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 to-ink/10" />
        <div className="flex min-h-[380px] flex-col items-center justify-center px-5 py-16 text-center text-white">
          <h2 className="max-w-3xl text-[36px] leading-[1.1] font-normal tracking-tight sm:text-[50px]">Ready to get <span className="accent text-red-bright">connected?</span></h2>
          <p className="mt-4 max-w-md text-[15px] text-white/80">Book a free site survey and get a clear proposal for your rooms, cameras or network. No obligation.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <Button to="/contact" variant="red" arrow>Book a site survey</Button>
            <Button href={company.whatsapp} variant="glass" arrow>WhatsApp us</Button>
          </div>
        </div>
      </section>
      <div className="h-12" />
    </Container>
  );
}
