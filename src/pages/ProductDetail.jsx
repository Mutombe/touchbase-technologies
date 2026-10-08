import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, Truck, Wrench, Check, Scales, Sparkle, Plus, Package as PackageIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Container, Button, Qty, Label, Arrow } from '../components/ui';
import ProductCard, { WishButton } from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import CompareTray from '../components/CompareTray';
import { productById, products, bundleFor, categories, locations } from '../data/products';
import { useCart, useCompare } from '../store';
import { money, cn } from '../lib/format';
import NotFound from './NotFound';
import { autoLink } from '../components/ContentLink';

const BUNDLE_DISCOUNT = 0.05;
const ROOM_CATEGORIES = ['video-bars', 'cameras', 'audio', 'displays'];

export default function ProductDetail() {
  const { id } = useParams();
  const p = productById[id];
  const add = useCart((s) => s.add);
  const nav = useNavigate();
  const inCompare = useCompare((s) => s.products.includes(id));
  const toggleCompare = useCompare((s) => s.toggle);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('overview');
  const [city, setCity] = useState('Harare');
  const [zoom, setZoom] = useState(null);
  const [picked, setPicked] = useState({});

  useEffect(() => {
    setQty(1);
    setTab('overview');
    setPicked({});
  }, [id]);

  const bundle = useMemo(() => (p ? bundleFor(p) : null), [p]);
  if (!p) return <NotFound />;

  const cat = categories.find((c) => c.id === p.category);
  const sale = p.compareAt && p.compareAt > p.price;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const km = locations.find((l) => l.name === city)?.km ?? 10;
  const eta = km <= 40 ? 'Tomorrow' : km <= 300 ? '2–3 working days' : '3–5 working days';
  const fee = km <= 40 ? 0 : Math.round(15 + km * 0.12);

  const bundleItems = bundle?.filter((b) => b.product.id === p.id || picked[b.product.id] !== false) ?? [];
  const bundleTotal = bundleItems.reduce((s, b) => s + b.product.price * b.qty, 0);

  return (
    <>
      <Container className="pt-6">
        <nav className="truncate text-[13px] text-muted" aria-label="Breadcrumb">
          <Link to="/shop" className="hover:text-ink">Shop</Link> <span className="mx-1">/</span>{' '}
          <Link to={`/shop?category=${p.category}`} className="hover:text-ink">{cat?.name}</Link> <span className="mx-1">/</span> <span className="text-ink">{p.name}</span>
        </nav>
      </Container>

      <Container className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className={cn('relative aspect-square overflow-hidden rounded-[1.75rem] bg-mist', p.image && 'cursor-zoom-in')}
            onMouseMove={(e) => {
              if (!p.image) return;
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            <ProductImage p={p} iconSize={84} zoomStyle={zoom ? { transform: 'scale(1.9)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined} />
            <div className="absolute top-5 left-5 flex gap-1.5">
              {sale && <span className="rounded-full bg-red px-3 py-1 text-[12px] font-semibold text-white">Save {money(p.compareAt - p.price)}</span>}
              {p.badge && <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold">{p.badge}</span>}
            </div>
            <WishButton id={p.id} className="absolute top-5 right-5 h-11 w-11" />
          </div>
        </div>

        <div>
          <div className="text-[14px] text-muted">{p.brand}</div>
          <h1 className="mt-1 text-[30px] leading-[1.1] tracking-tight sm:text-[40px]">{p.name}</h1>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/80">{autoLink(p.summary, { maxLinks: 2 })}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="num text-[34px] leading-none font-semibold tracking-tight sm:text-[40px]">{money(p.price)}</span>
            {sale && <span className="num pb-1 text-lg text-muted line-through">{money(p.compareAt)}</span>}
          </div>
          <div className={cn('mt-2 inline-flex items-center gap-1.5 text-[13.5px]', p.stock <= 5 ? 'text-amber-700' : 'text-emerald-700')}>
            <span className={cn('h-2 w-2 rounded-full', p.stock <= 5 ? 'bg-amber-500' : 'bg-emerald-500')} />
            {p.stock <= 5 ? `Only ${p.stock} left in stock` : `In stock · ${p.stock} available`}
          </div>

          <div className="mt-6 grid grid-cols-[auto_1fr] gap-2 sm:flex">
            <Qty value={qty} onChange={setQty} max={p.stock} />
            <Button arrow className="whitespace-nowrap sm:flex-1" onClick={() => add(p.id, qty)}>Add to cart</Button>
            <Button variant="red" className="col-span-2 whitespace-nowrap" onClick={() => { add(p.id, qty); useCart.getState().closeDrawer(); nav('/checkout'); }}>Buy now</Button>
          </div>
          <div className="mt-3 flex gap-4 text-[13.5px]">
            <button type="button" onClick={() => toggleCompare(p.id)} className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
              {inCompare ? <Check size={15} /> : <Scales size={15} />} {inCompare ? 'In compare' : 'Compare'}
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] bg-mist p-4">
              <label className="flex items-center gap-2 text-[14px] font-medium" htmlFor="pd-city"><Truck size={18} className="text-red" /> Delivery to</label>
              <select id="pd-city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 h-10 w-full rounded-xl border border-line bg-white px-3 text-[14px]">
                {locations.map((l) => <option key={l.name}>{l.name}</option>)}
              </select>
              <div className="mt-2 text-[13px] text-muted"><b className="text-ink">{eta}</b> · {fee ? money(fee) : 'Free'}</div>
            </div>
            <div className="rounded-[1.25rem] bg-mist p-4 text-[13.5px]">
              <div className="flex items-center gap-2 font-medium"><ShieldCheck size={18} className="text-red" /> {p.warrantyYears}-year warranty</div>
              <p className="mt-1 text-muted">Genuine stock with manufacturer warranty, supported locally by Touchbase.</p>
              <div className="mt-3 flex items-center gap-2 font-medium"><Wrench size={18} className="text-red" /> Installation available</div>
              <p className="mt-1 text-muted">Add professional installation at checkout.</p>
            </div>
          </div>

          <div className="no-scrollbar mt-10 flex gap-1 overflow-x-auto border-b border-line" role="tablist">
            {[['overview', 'Overview'], ['specs', 'Specifications']].map(([k, l]) => (
              <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={cn('relative shrink-0 px-4 py-3 text-[14.5px] whitespace-nowrap transition', tab === k ? 'font-medium text-ink' : 'text-muted')}>
                {l}
                {tab === k && <motion.span layoutId="pd-tab" className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-red" />}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-6">
              {tab === 'overview' && (
                <div className="space-y-4 text-[15px] leading-relaxed text-ink/80">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {Object.entries(p.specs).slice(0, 4).map(([k, v]) => (
                      <li key={k} className="flex items-start gap-2"><Check size={15} weight="bold" className="mt-1 shrink-0 text-red" /> <span>{k}: <b className="font-medium">{v}</b></span></li>
                    ))}
                  </ul>
                  {ROOM_CATEGORIES.includes(p.category) ? (
                    <Link to="/planner" className="mt-2 flex items-center gap-3 rounded-[1.25rem] border border-line p-4 hover:border-ink/30">
                      <Sparkle size={22} weight="fill" className="shrink-0 text-red" />
                      <span className="flex-1 text-[14px]"><b>Equipping a whole room?</b> The Room Planner recommends the camera, audio and display together.</span>
                      <Arrow />
                    </Link>
                  ) : (
                    <Link to={`/contact?topic=quote&solution=${p.category === 'cctv' ? 'cctv-security' : 'networking'}`} className="mt-2 flex items-center gap-3 rounded-[1.25rem] border border-line p-4 hover:border-ink/30">
                      <Sparkle size={22} weight="fill" className="shrink-0 text-red" />
                      <span className="flex-1 text-[14px]"><b>Need a full site design?</b> Book a free survey and we’ll specify and install the whole system.</span>
                      <Arrow />
                    </Link>
                  )}
                </div>
              )}
              {tab === 'specs' && (
                <dl className="divide-y divide-line overflow-hidden rounded-[1.25rem] border border-line">
                  {Object.entries(p.specs).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-2 px-4 py-3 text-[14.5px]"><dt className="text-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
                  ))}
                </dl>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      {bundle && (
        <Container className="mt-10">
          <div className="rounded-[1.75rem] bg-mist p-6 sm:p-8">
            <Label>Frequently bought together</Label>
            <h2 className="mt-4 text-[26px] tracking-tight">A matched set</h2>
            <p className="text-[14px] text-muted">Tick what you need. The set saves {BUNDLE_DISCOUNT * 100}%.</p>
            <div className="mt-6 grid items-center gap-4 lg:grid-cols-[1fr_auto]">
              <div className="flex flex-wrap items-center gap-3">
                {bundle.map((b, i) => {
                  const self = b.product.id === p.id;
                  const on = self || picked[b.product.id] !== false;
                  return (
                    <div key={b.product.id} className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:gap-3">
                      {i > 0 && <Plus size={18} className="text-muted" />}
                      <button type="button" disabled={self} aria-pressed={on} onClick={() => setPicked((s) => ({ ...s, [b.product.id]: !on }))} className={cn('flex w-full items-center gap-3 rounded-[1.25rem] border bg-white p-3 text-left transition sm:w-[220px]', on ? 'border-red' : 'border-line opacity-50')}>
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-mist"><ProductImage p={b.product} iconSize={16} /></span>
                        <span className="min-w-0">
                          <span className="line-clamp-2 text-[13px] leading-snug font-medium">{b.qty > 1 ? `${b.qty} × ` : ''}{b.product.name}</span>
                          <span className="num text-[12.5px] text-muted">{money(b.product.price * b.qty)}</span>
                        </span>
                        <span className={cn('ml-auto grid h-5 w-5 shrink-0 place-items-center rounded-full', on ? 'bg-red text-white' : 'border border-line')}>{on && <Check size={11} weight="bold" />}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="w-full rounded-[1.25rem] bg-white p-5 lg:w-64">
                <div className="num text-[13px] text-muted line-through">{money(bundleTotal)}</div>
                <div className="num text-[28px] font-semibold tracking-tight">{money(bundleTotal * (1 - BUNDLE_DISCOUNT))}</div>
                <Button
                  variant="red"
                  className="mt-3 w-full"
                  disabled={bundleItems.length < 2}
                  onClick={() => {
                    bundleItems.forEach((b) => useCart.getState().add(b.product.id, b.qty));
                    useCart.getState().applyCoupon('TOUCHBASE5');
                    toast.success('Set added. 5% code TOUCHBASE5 applied');
                  }}
                >
                  <PackageIcon size={16} /> Add set to cart
                </Button>
              </div>
            </div>
          </div>
        </Container>
      )}

      {related.length > 0 && (
        <Container className="py-16">
          <h2 className="text-[28px] tracking-tight">More {cat?.short.toLowerCase()}</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.id} p={r} />)}
          </div>
        </Container>
      )}
      <CompareTray />
    </>
  );
}
