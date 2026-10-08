import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, EnvelopeSimple, MapPin, Clock, WhatsappLogo, Check } from '@phosphor-icons/react';
import { Container, Label, Button, Field, inputCls, Arrow } from '../components/ui';
import { company, solutions } from '../data/site';
import { cn } from '../lib/format';

const TOPICS = [
  { id: 'survey', label: 'Free site survey' },
  { id: 'quote', label: 'Request a quote' },
  { id: 'room', label: 'Meeting room setup' },
  { id: 'support', label: 'Support for my system' },
];

export default function Contact() {
  const [params] = useSearchParams();
  const { state } = useLocation();
  const initialTopic = TOPICS.some((t) => t.id === params.get('topic')) ? params.get('topic') : 'survey';
  const initialSolution = solutions.some((s) => s.slug === params.get('solution')) ? params.get('solution') : '';
  const [topic, setTopic] = useState(initialTopic);
  const blank = { name: '', company: '', phone: '', email: '', solution: initialSolution, message: state?.message || '' };
  const [f, setF] = useState(blank);
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Please enter your name';
    if (!/^\+?\d[\d\s]{8,}$/.test(f.phone.trim())) x.phone = 'Please enter a valid phone number';
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'That email doesn’t look right';
    setErr(x);
    if (!Object.keys(x).length) setSent(true);
  };

  return (
    <Container className="pt-10 pb-16 sm:pt-14">
      <div className="grid gap-6 md:grid-cols-2">
        <Label>Contacts</Label>
        <h1 className="text-[34px] leading-[1.15] tracking-tight sm:text-[44px]">Let’s get you connected. <span className="text-muted">We reply within one working hour.</span></h1>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <div className="grid gap-4">
          <a href={company.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-[1.75rem] bg-[#1DA851] p-6 text-white">
            <WhatsappLogo size={34} weight="fill" />
            <div className="flex-1">
              <div className="text-lg font-medium">Chat on WhatsApp</div>
              <div className="text-[14px] text-white/85">Fastest way to reach an engineer</div>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1DA851]"><Arrow /></span>
          </a>
          <div className="tex-grid overflow-hidden rounded-[1.75rem] bg-ink p-7 text-white">
            <ul className="space-y-5 text-[15px]">
              <li className="flex gap-4"><Phone size={20} className="mt-0.5 shrink-0 text-red-bright" /><div><div className="text-[13px] text-white/50">Call</div><a href={company.phoneHref}>{company.phone}</a></div></li>
              <li className="flex gap-4"><EnvelopeSimple size={20} className="mt-0.5 shrink-0 text-red-bright" /><div><div className="text-[13px] text-white/50">Email</div><a href={`mailto:${company.email}`}>{company.email}</a></div></li>
              <li className="flex gap-4"><MapPin size={20} className="mt-0.5 shrink-0 text-red-bright" /><div><div className="text-[13px] text-white/50">Visit</div>{company.address}</div></li>
              <li className="flex gap-4"><Clock size={20} className="mt-0.5 shrink-0 text-red-bright" /><div><div className="text-[13px] text-white/50">Hours</div>{company.hours}</div></li>
            </ul>
          </div>
          <div className="relative min-h-[200px] overflow-hidden rounded-[1.75rem]">
            <img src="/img/client-on-phone.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <span className="glass-tag absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 text-[13px]">Free site surveys in Harare & surrounds</span>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-line p-6 sm:p-9">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid h-full place-items-center py-16 text-center">
                <div>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red text-white"><Check size={30} weight="bold" /></span>
                  <h2 className="mt-5 text-2xl tracking-tight">Thanks, {f.name.trim().split(' ')[0]}!</h2>
                  <p className="mt-2 max-w-sm text-muted">An engineer will call you on {f.phone} shortly to {topic === 'survey' ? 'book your free site survey' : 'follow up'}.</p>
                  <Button variant="outline" className="mt-6" onClick={() => { setSent(false); setF({ ...blank, message: '' }); }}>Send another message</Button>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} noValidate>
                <h2 className="text-xl font-semibold tracking-tight">How can we help?</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button key={t.id} type="button" onClick={() => setTopic(t.id)} aria-pressed={topic === t.id} className={cn('rounded-full border px-4 py-2 text-[13.5px]', topic === t.id ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink/30')}>
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" error={err.name}><input className={inputCls} value={f.name} onChange={set('name')} autoComplete="name" /></Field>
                  <Field label="Company (optional)"><input className={inputCls} value={f.company} onChange={set('company')} autoComplete="organization" /></Field>
                  <Field label="Phone / WhatsApp" error={err.phone}><input className={inputCls} value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="+263 77 123 4567" /></Field>
                  <Field label="Email (optional)" error={err.email}><input className={inputCls} value={f.email} onChange={set('email')} type="email" autoComplete="email" /></Field>
                  <Field label="Solution" className="sm:col-span-2">
                    <select className={inputCls} value={f.solution} onChange={set('solution')}>
                      <option value="">Not sure yet</option>
                      {solutions.map((s) => <option key={s.slug} value={s.slug}>{s.tag}</option>)}
                    </select>
                  </Field>
                  <Field label="Message" className="sm:col-span-2">
                    <textarea className={cn(inputCls, 'h-36 py-3')} value={f.message} onChange={set('message')} placeholder="Tell us about your site, the rooms or areas involved, and any equipment you already have." />
                  </Field>
                </div>
                <Button type="submit" variant="red" arrow size="lg" className="mt-6">Send message</Button>
                <p className="mt-3 text-[12px] text-muted">Demo form. Messages aren’t sent anywhere yet.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
}
