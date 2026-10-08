import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { Container, PageHeader, Button } from '../components/ui';
import { projects, solutions } from '../data/site';
import { cn } from '../lib/format';
import { CTA } from './Home';
import { autoLink } from '../components/ContentLink';

export default function Projects() {
  const types = ['All', ...new Set(projects.map((p) => p.type))];
  const [type, setType] = useState('All');
  const [open, setOpen] = useState(null);
  const list = projects.filter((p) => type === 'All' || p.type === type);
  const sol = open && solutions.find((s) => s.slug === open.solution);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <PageHeader label="Projects" title={<>Rooms and sites <span className="text-muted">our team has installed</span></>}>
        A selection of meeting rooms, venues and industrial sites our technicians have equipped, photographed on the job.
      </PageHeader>
      <Container>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {types.map((t) => (
            <button key={t} type="button" onClick={() => setType(t)} className={cn('shrink-0 rounded-full border px-4 py-2 text-[13.5px]', type === t ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink/30')}>{t}</button>
          ))}
        </div>
        <motion.div layout className="mt-8 grid grid-cols-2 gap-3 pb-20 sm:gap-4 lg:grid-cols-3">
          <AnimatePresence>
            {list.map((p) => (
              <motion.button
                layout
                key={p.slug}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(p)}
                className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] text-left sm:rounded-[1.75rem]"
              >
                <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
                <span className="glass-tag absolute top-3 left-3 rounded-full px-3 py-1 text-[12px] sm:top-4 sm:left-4 sm:text-[12.5px]">{p.type}</span>
                <div className="absolute right-4 bottom-4 left-4 text-white sm:right-5 sm:bottom-5 sm:left-5">
                  <div className="text-[16px] leading-snug sm:text-[20px]">{p.title}</div>
                  <div className="mt-1 hidden text-[13px] text-white/70 sm:block">{p.scope}</div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div role="dialog" aria-modal="true" aria-label={open.title} onClick={(e) => e.stopPropagation()} initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white md:grid-cols-[0.9fr_1fr]">
              <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow"><X size={18} /></button>
              <img src={open.image} alt={open.title} className="h-[300px] w-full object-cover md:h-full md:max-h-[90vh]" />
              <div className="flex flex-col p-6 sm:p-8">
                <div className="text-[13px] text-muted">{open.type}</div>
                <h2 className="mt-1 text-[28px] leading-tight tracking-tight">{open.title}</h2>
                <p className="mt-3 text-[15px] text-muted">{open.scope}</p>
                {sol && <p className="mt-6 text-[15px] leading-relaxed">{autoLink(sol.intro, { exclude: [`/solutions/${sol.slug}`] })}</p>}
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {sol && <Button to={`/solutions/${sol.slug}`} variant="outline">{sol.tag}</Button>}
                  <Button to={`/contact?topic=quote${sol ? `&solution=${sol.slug}` : ''}`} variant="red" arrow>Get a setup like this</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <CTA />
    </>
  );
}
