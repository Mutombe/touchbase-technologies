import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, DeviceMobile, CreditCard, Bank, Wallet, Truck, Storefront, Wrench, Lock, CircleNotch, Info } from '@phosphor-icons/react';
import { Container, Button, Field, inputCls, Label } from '../components/ui';
import ProductImage from '../components/ProductImage';
import { FREE_DELIVERY } from '../components/CartDrawer';
import { useCart, useOrders } from '../store';
import { locations } from '../data/products';
import { money, cn, orderNumber } from '../lib/format';

const STEPS = ['Details', 'Delivery', 'Payment'];
const INSTALL_RATE = 0.1;

const PAY = [
  { id: 'ecocash', label: 'EcoCash', icon: DeviceMobile, note: 'Approve the prompt on your phone' },
  { id: 'innbucks', label: 'InnBucks', icon: Wallet, note: 'Pay with an InnBucks code' },
  { id: 'card', label: 'Visa / Mastercard', icon: CreditCard, note: 'Secure card payment' },
  { id: 'bank', label: 'Bank transfer', icon: Bank, note: 'ZIPIT / RTGS / USD FCA' },
];

export default function Checkout() {
  useCart((s) => s.lines);
  const { lines, subtotal, discount } = useCart.getState().totals();
  const clear = useCart((s) => s.clear);
  const coupon = useCart((s) => s.coupon);
  const place = useOrders((s) => s.place);
  const nav = useNavigate();

  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    name: '', company: '', phone: '', email: '', address: '', city: 'Harare', notes: '',
    method: 'delivery', install: false, date: '', pay: 'ecocash', payPhone: '',
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const set = (k) => (e) => setD((s) => ({ ...s, [k]: e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e }));

  useEffect(() => {
    if (!lines.length && !processing) nav('/cart', { replace: true });
  }, [lines.length, processing, nav]);

  const km = locations.find((l) => l.name === d.city)?.km ?? 10;
  const needsAddress = d.method === 'delivery' || d.install;
  const delivery = d.method === 'collect' ? 0 : subtotal >= FREE_DELIVERY && km <= 40 ? 0 : Math.round(15 + km * 0.12);
  const install = d.install ? Math.round(subtotal * INSTALL_RATE) : 0;
  const total = subtotal - discount + delivery + install;

  const minDate = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 2);
    return t.toISOString().slice(0, 10);
  }, []);

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (d.name.trim().length < 2) e.name = 'Enter your full name';
      if (!/^\+?\d[\d\s]{8,}$/.test(d.phone.trim())) e.phone = 'Enter a valid phone number';
      if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) e.email = 'Enter a valid email';
    }
    if (step === 1) {
      if (needsAddress && d.address.trim().length < 5) e.address = 'Enter the street address';
      if (d.install && !d.date) e.date = 'Choose an installation date';
    }
    if (step === 2 && ['ecocash', 'innbucks'].includes(d.pay) && !/^\+?\d[\d\s]{8,}$/.test((d.payPhone || d.phone).trim())) e.payPhone = 'Enter the wallet number';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => validate() && setStep((s) => s + 1);

  const submit = async () => {
    if (!validate()) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2400));
    const number = orderNumber();
    place({
      number,
      date: new Date().toISOString(),
      customer: { name: d.name, company: d.company, phone: d.phone, email: d.email },
      fulfilment: { method: d.method, address: d.address, city: d.city, install: d.install, date: d.date, notes: d.notes },
      payment: { method: d.pay, paid: total },
      lines: lines.map(({ key, id, name, price, qty, subtitle }) => ({ key, id, name, price, qty, subtitle })),
      totals: { subtotal, discount, delivery, install, total, coupon },
    });
    clear();
    nav(`/order/${number}`, { replace: true });
  };

  return (
    <Container className="pt-8 pb-20 sm:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Label>Checkout</Label>
          <h1 className="mt-4 text-[32px] tracking-tight sm:text-[44px]">Almost there.</h1>
        </div>
        <ol className="no-scrollbar flex max-w-full gap-1.5 overflow-x-auto">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                disabled={i > step}
                onClick={() => setStep(i)}
                aria-current={i === step ? 'step' : undefined}
                className={cn('inline-flex items-center gap-2 rounded-full border py-1.5 pr-3.5 pl-1.5 text-[13px] whitespace-nowrap', i === step ? 'border-ink bg-ink text-white' : i < step ? 'border-red/30 bg-red-soft text-red-2' : 'border-line text-ink/50')}
              >
                <span className={cn('grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold', i <= step ? 'bg-red text-white' : 'bg-mist')}>{i < step ? <Check size={12} weight="bold" /> : i + 1}</span>
                {s}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <details className="group mt-6 rounded-[1.25rem] bg-mist px-5 py-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-[14.5px] [&::-webkit-details-marker]:hidden">
          <span>{lines.reduce((n, l) => n + l.qty, 0)} items · <span className="underline underline-offset-4 group-open:hidden">show</span><span className="hidden underline underline-offset-4 group-open:inline">hide</span></span>
          <span className="num text-lg font-semibold">{money(total, { cents: true })}</span>
        </summary>
        <ul className="mt-3 space-y-2 border-t border-line pt-3 text-[13.5px]">
          {lines.map((l) => (
            <li key={l.key} className="flex justify-between gap-3"><span className="truncate">{l.qty} × {l.name}</span><span className="num shrink-0">{money(l.price * l.qty)}</span></li>
          ))}
          {discount > 0 && <li className="flex justify-between text-red-2"><span>Discount</span><span className="num">−{money(discount, { cents: true })}</span></li>}
          {delivery > 0 && <li className="flex justify-between"><span>Delivery</span><span className="num">{money(delivery)}</span></li>}
          {install > 0 && <li className="flex justify-between"><span>Installation</span><span className="num">{money(install)}</span></li>}
        </ul>
      </details>

      <div className="mt-6 grid gap-8 lg:mt-10 lg:grid-cols-[1fr_400px]">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {step === 0 && (
                <Section title="Your details">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name}><input className={inputCls} value={d.name} onChange={set('name')} autoComplete="name" /></Field>
                    <Field label="Company (optional)"><input className={inputCls} value={d.company} onChange={set('company')} autoComplete="organization" /></Field>
                    <Field label="Phone (WhatsApp)" error={errors.phone}><input className={inputCls} value={d.phone} onChange={set('phone')} placeholder="+263 77 123 4567" autoComplete="tel" /></Field>
                    <Field label="Email" error={errors.email}><input className={inputCls} value={d.email} onChange={set('email')} type="email" autoComplete="email" /></Field>
                  </div>
                </Section>
              )}

              {step === 1 && (
                <Section title="Delivery & installation">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { id: 'delivery', icon: Truck, t: 'Deliver to me', b: 'Nationwide, 1–5 working days' },
                      { id: 'collect', icon: Storefront, t: 'Collect in Harare', b: 'Free · ready in 24 hours' },
                    ].map((o) => (
                      <Choice key={o.id} on={d.method === o.id} onClick={() => set('method')(o.id)} icon={o.icon} title={o.t} body={o.b} />
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.25rem] border border-line p-5">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input type="checkbox" checked={d.install} onChange={set('install')} className="mt-1 h-5 w-5 accent-[var(--color-red)]" />
                      <span>
                        <span className="flex items-center gap-2 font-medium"><Wrench size={17} className="text-red" /> Professional installation</span>
                        <span className="block text-[13.5px] text-muted">Mounting, cabling, configuration and handover training: {money(Math.round(subtotal * INSTALL_RATE))} ({INSTALL_RATE * 100}% of equipment).</span>
                      </span>
                    </label>
                    {d.install && (
                      <Field label="Preferred installation date" error={errors.date} className="mt-4 max-w-xs">
                        <input type="date" min={minDate} className={inputCls} value={d.date} onChange={set('date')} />
                      </Field>
                    )}
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {needsAddress && (
                      <Field label={d.method === 'delivery' ? 'Street address' : 'Installation address'} error={errors.address} className="sm:col-span-2">
                        <input className={inputCls} value={d.address} onChange={set('address')} placeholder="Building, street and suburb" autoComplete="street-address" />
                      </Field>
                    )}
                    <Field label="Town / city">
                      <select className={inputCls} value={d.city} onChange={set('city')}>{locations.map((l) => <option key={l.name}>{l.name}</option>)}</select>
                    </Field>
                  </div>
                  <Field label="Notes for our team (optional)" className="mt-5">
                    <textarea className={cn(inputCls, 'h-24 py-3')} value={d.notes} onChange={set('notes')} placeholder="Room details, access times, who to ask for on site…" />
                  </Field>
                </Section>
              )}

              {step === 2 && (
                <Section title="Payment">
                  <div className="mb-5 flex items-start gap-2 rounded-2xl bg-amber-50 p-3 text-[13px] text-amber-800">
                    <Info size={16} className="mt-0.5 shrink-0" /> Demo checkout. No real payment is taken and no payment details are stored.
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {PAY.map((p) => <Choice key={p.id} on={d.pay === p.id} onClick={() => set('pay')(p.id)} icon={p.icon} title={p.label} body={p.note} />)}
                  </div>
                  <div className="mt-5">
                    {['ecocash', 'innbucks'].includes(d.pay) && (
                      <Field label={`${d.pay === 'ecocash' ? 'EcoCash' : 'InnBucks'} number`} error={errors.payPhone} className="max-w-sm">
                        <input className={inputCls} value={d.payPhone || d.phone} onChange={set('payPhone')} />
                      </Field>
                    )}
                    {d.pay === 'card' && <p className="rounded-2xl bg-mist p-4 text-[14px] text-muted">You’ll be redirected to our secure payment partner to enter your card details.</p>}
                    {d.pay === 'bank' && (
                      <div className="rounded-2xl bg-mist p-4 text-[14px]">
                        <div className="font-medium">Bank details are emailed with your order number.</div>
                        <div className="text-muted">Use the order number as your payment reference. Stock is held for 48 hours.</div>
                      </div>
                    )}
                  </div>
                </Section>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-2">
            {step > 0 && <Button variant="outline" size="lg" onClick={() => setStep(step - 1)}>Back</Button>}
            {step < 2 ? (
              <Button arrow size="lg" className="flex-1 sm:flex-none" onClick={next}>Continue</Button>
            ) : (
              <Button variant="red" size="lg" className="flex-1 sm:flex-none" onClick={submit} disabled={processing}><Lock size={16} /> Pay {money(total, { cents: true })}</Button>
            )}
          </div>
        </div>

        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <div className="rounded-[1.75rem] bg-mist p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Summary</h2>
              <Link to="/cart" className="text-[13px] underline underline-offset-4">Edit</Link>
            </div>
            <ul className="mt-4 space-y-3">
              {lines.map((l) => (
                <li key={l.key} className="flex items-center gap-3">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                    <ProductImage p={l.product} iconSize={15} />
                    <span className="absolute top-0 right-0 grid h-5 min-w-5 place-items-center rounded-bl-lg bg-ink px-1 text-[10px] font-bold text-white">{l.qty}</span>
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[14px]">{l.name}</span>
                  <span className="num text-[14px] font-medium">{money(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-[14px]">
              <Row k="Subtotal" v={money(subtotal, { cents: true })} />
              {discount > 0 && <Row k={`Discount (${coupon})`} v={`−${money(discount, { cents: true })}`} red />}
              <Row k="Delivery" v={delivery ? money(delivery) : 'Free'} />
              {install > 0 && <Row k="Installation" v={money(install)} />}
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="font-medium">Total</span>
              <span className="num text-[28px] font-semibold tracking-tight">{money(total, { cents: true })}</span>
            </div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {processing && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div role="status" initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="w-full max-w-sm rounded-[2rem] bg-white p-8 text-center">
              <CircleNotch size={40} className="mx-auto animate-spin text-red" />
              <h2 className="mt-5 text-xl font-semibold">
                {d.pay === 'ecocash' ? 'Check your phone' : d.pay === 'innbucks' ? 'Generating InnBucks code' : d.pay === 'card' ? 'Contacting your bank' : 'Reserving your order'}
              </h2>
              <p className="mt-2 text-[14px] text-muted">
                {d.pay === 'ecocash' ? `Approve the EcoCash prompt sent to ${d.payPhone || d.phone} to pay ${money(total, { cents: true })}.` : 'This only takes a moment…'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}

const Section = ({ title, children }) => (
  <section className="rounded-[1.75rem] border border-line p-5 sm:p-8">
    <h2 className="mb-5 text-xl font-semibold tracking-tight">{title}</h2>
    {children}
  </section>
);

const Choice = ({ on, onClick, icon: I, title, body }) => (
  <button type="button" onClick={onClick} aria-pressed={on} className={cn('flex items-start gap-3 rounded-[1.25rem] border p-4 text-left transition', on ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink/30')}>
    {I && <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', on ? 'bg-red text-white' : 'bg-mist')}><I size={19} /></span>}
    <span className="flex-1">
      <span className="block font-medium">{title}</span>
      <span className={cn('block text-[13px]', on ? 'text-white/60' : 'text-muted')}>{body}</span>
    </span>
    <span className={cn('mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border', on ? 'border-red bg-red' : 'border-line')}>{on && <Check size={11} weight="bold" />}</span>
  </button>
);

const Row = ({ k, v, red }) => (
  <div className={cn('flex justify-between', red && 'text-red-2')}>
    <dt className={red ? '' : 'text-muted'}>{k}</dt>
    <dd className="num">{v}</dd>
  </div>
);
