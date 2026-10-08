import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus } from '@phosphor-icons/react';
import { Container, Label, Button } from '../components/ui';
import { rooms, platforms, addons, included, plan } from '../data/planner';
import { cn } from '../lib/format';

const Step = ({ n, title, children }) => (
  <div className="rounded-[1.75rem] border border-line p-6 sm:p-8">
    <div className="flex items-center gap-3">
      <span className="num grid h-8 w-8 place-items-center rounded-full bg-red text-[13px] font-semibold text-white">{n}</span>
      <h2 className="text-[19px] font-medium tracking-tight">{title}</h2>
    </div>
    <div className="mt-6">{children}</div>
  </div>
);

export default function Planner() {
  const [params] = useSearchParams();
  const [room, setRoom] = useState(rooms.some((r) => r.id === params.get('room')) ? params.get('room') : 'meeting');
  const [platform, setPlatform] = useState(platforms.some((p) => p.id === params.get('platform')) ? params.get('platform') : 'teams');
  const [extras, setExtras] = useState(['wireless']);
  const nav = useNavigate();
  const result = plan(room, platform, extras);
  const toggle = (id) => setExtras((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const quote = () => {
    const summary = `Room Planner request:\n${result.room.name} (${result.room.seats}) on ${result.platform.name}.\n` + result.kit.map(([k, v]) => `• ${k}: ${v}`).join('\n');
    nav('/contact?topic=room', { state: { message: summary } });
  };

  return (
    <>
      <div className="px-1.5 pt-1.5 sm:px-2">
        <section className="relative isolate overflow-hidden rounded-xl bg-ink text-white">
          <img src="/img/data-streams.webp" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
          <Container className="py-14 sm:py-20">
            <Label dark>Room Planner</Label>
            <h1 className="mt-6 max-w-2xl text-[36px] leading-[1.08] font-normal tracking-tight sm:text-[54px]">
              Plan your meeting room <span className="accent text-red-bright">in three taps</span>
            </h1>
            <p className="mt-4 max-w-lg text-[15.5px] text-white/70">
              Choose the room size, your platform and any extras. We’ll recommend the kit, then confirm it on a free site survey.
            </p>
          </Container>
        </section>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="grid gap-4">
            <Step n="1" title="How big is the room?">
              <div className="grid grid-cols-2 gap-3">
                {rooms.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoom(r.id)}
                    aria-pressed={room === r.id}
                    className={cn('group relative h-[150px] overflow-hidden rounded-[1.25rem] text-left text-white ring-2 transition sm:h-[180px]', room === r.id ? 'ring-red' : 'ring-transparent')}
                  >
                    <img src={r.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className={cn('absolute inset-0 bg-gradient-to-t transition', room === r.id ? 'from-ink/85 via-ink/40 to-ink/10' : 'from-ink/80 via-ink/30 to-transparent')} />
                    {room === r.id && <span className="absolute top-3 right-3 grid h-6 w-6 place-items-center rounded-full bg-red"><Check size={13} weight="bold" /></span>}
                    <span className="absolute right-4 bottom-4 left-4">
                      <span className="block text-[16px] font-medium">{r.name}</span>
                      <span className="block text-[12.5px] text-white/70">{r.seats}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Step>

            <Step n="2" title="Which platform do you meet on?">
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button key={p.id} type="button" onClick={() => setPlatform(p.id)} aria-pressed={platform === p.id} className={cn('rounded-full border px-4 py-2 text-[14px] transition', platform === p.id ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink/30')}>
                    {p.name}
                  </button>
                ))}
              </div>
            </Step>

            <Step n="3" title="Any extras?">
              <div className="grid gap-2 sm:grid-cols-2">
                {addons.map((a) => {
                  const on = extras.includes(a.id);
                  return (
                    <button key={a.id} type="button" onClick={() => toggle(a.id)} aria-pressed={on} className={cn('flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-[14.5px] transition', on ? 'border-red bg-red-soft' : 'border-line hover:border-ink/30')}>
                      {a.name}
                      <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-full transition', on ? 'bg-red text-white' : 'border border-line')}>
                        {on ? <Check size={12} weight="bold" /> : <Plus size={12} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Step>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="tex-grid overflow-hidden rounded-[1.75rem] bg-ink text-white">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-red px-3 py-1 text-[12px] font-semibold">Recommended setup</span>
                  <span className="text-[12px] text-white/50">{result.platform.name}</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.h3 key={room} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-5 text-[28px] tracking-tight">
                    {result.room.name} <span className="text-white/45">· {result.room.seats}</span>
                  </motion.h3>
                </AnimatePresence>
                <ul className="mt-5 divide-y divide-white/10 text-[14px]">
                  <AnimatePresence initial={false}>
                    {result.kit.map(([k, v]) => (
                      <motion.li key={k + v} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="grid gap-0.5 overflow-hidden py-2.5 sm:grid-cols-[110px_1fr] sm:gap-3">
                        <span className="text-[12px] text-white/45 sm:text-[14px]">{k}</span>
                        <span>{v}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <div className="num text-[22px]">{result.room.days}</div>
                    <div className="text-[12px] text-white/50">Typical install</div>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <div className="num text-[22px]">{result.networkPoints}</div>
                    <div className="text-[12px] text-white/50">Network points</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="text-[13px] text-white/50">Every room includes</div>
                <ul className="mt-3 flex flex-wrap gap-2 text-[13px]">
                  {included.map((t) => (
                    <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1"><Check size={12} className="text-red-bright" /> {t}</li>
                  ))}
                </ul>
                <Button variant="red" size="lg" arrow className="mt-6 w-full" onClick={quote}>Request a quote for this room</Button>
                <p className="mt-3 text-center text-[12px] text-white/40">Final equipment is confirmed after a free site survey.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
