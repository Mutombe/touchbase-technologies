import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Eye, Scales, Plus, X, Check, ShieldCheck, Truck } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { useCart, useWishlist, useCompare } from '../store';
import { money, cn } from '../lib/format';
import { Button, Qty } from './ui';
import ProductImage from './ProductImage';

export function WishButton({ id, className }) {
  const on = useWishlist((s) => s.ids.includes(id));
  const toggle = useWishlist((s) => s.toggle);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={(e) => {
        e.preventDefault();
        toggle(id);
        toast(on ? 'Removed from wishlist' : 'Saved to wishlist');
      }}
      className={cn('grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm transition hover:scale-105', on ? 'text-red' : 'text-ink/70', className)}
    >
      <Heart size={17} weight={on ? 'fill' : 'regular'} />
    </button>
  );
}

export const StockNote = ({ p, className }) => {
  const low = p.stock <= 5;
  return <div className={cn('text-xs', low ? 'text-amber-700' : 'text-emerald-700', className)}>{low ? `Only ${p.stock} left` : 'In stock'}</div>;
};

export default function ProductCard({ p, layout = 'grid' }) {
  const add = useCart((s) => s.add);
  const compare = useCompare((s) => s.products.includes(p.id));
  const toggleCompare = useCompare((s) => s.toggle);
  const [quick, setQuick] = useState(false);
  const sale = p.compareAt && p.compareAt > p.price;

  const actions = (
    <div className="absolute right-2.5 bottom-2.5 flex gap-1.5 md:inset-x-3 md:right-3 md:bottom-3 md:translate-y-2 md:gap-2 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
      <button type="button" aria-label="Quick view" onClick={(e) => { e.preventDefault(); setQuick(true); }} className="glass-dark flex h-9 w-9 items-center justify-center gap-1.5 rounded-full text-[13px] text-white md:w-auto md:flex-1">
        <Eye size={16} /> <span className="hidden md:inline">Quick view</span>
      </button>
      <button
        type="button"
        aria-pressed={compare}
        aria-label={compare ? 'Remove from compare' : 'Add to compare'}
        onClick={(e) => { e.preventDefault(); toggleCompare(p.id); }}
        className={cn('flex h-9 w-9 items-center justify-center gap-1.5 rounded-full text-[13px] md:w-auto md:px-3', compare ? 'bg-red text-white' : 'glass-dark text-white')}
      >
        {compare ? <Check size={16} /> : <Scales size={16} />} <span className="hidden md:inline">Compare</span>
      </button>
    </div>
  );

  return (
    <>
      <Link to={`/shop/${p.id}`} className={cn('group relative flex rounded-[1.75rem] bg-white transition', layout === 'list' ? 'flex-row gap-5 border border-line p-3' : 'flex-col p-2')}>
        <div className={cn('relative overflow-hidden rounded-[1.5rem] bg-mist', layout === 'list' ? 'aspect-square w-28 shrink-0 sm:w-52' : 'aspect-[4/4.2]')}>
          <ProductImage p={p} iconSize={layout === 'list' ? 30 : 44} className="group-hover:scale-105" />
          <div className="absolute top-2.5 left-2.5 flex max-w-[calc(100%-3.5rem)] flex-wrap gap-1.5 sm:top-3 sm:left-3">
            {sale && <span className="rounded-full bg-red px-2.5 py-1 text-[11px] font-semibold text-white">−{Math.round((1 - p.price / p.compareAt) * 100)}%</span>}
            {p.badge && <span className={cn('rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap', sale && 'hidden sm:inline')}>{p.badge}</span>}
          </div>
          <WishButton id={p.id} className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3" />
          {layout === 'grid' && actions}
        </div>
        <div className={cn('flex flex-1 flex-col', layout === 'list' ? 'py-2 pr-2' : 'px-2 pt-4 pb-1')}>
          <div className="truncate text-[12.5px] text-muted">{p.brand}</div>
          <h3 className="mt-1.5 line-clamp-2 text-[15px] leading-snug font-medium tracking-tight sm:text-[16px]">{p.name}</h3>
          {layout === 'list' && <p className="mt-2 line-clamp-2 text-sm text-muted">{p.summary}</p>}
          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <div>
              <div className="num text-[16px] font-semibold tracking-tight sm:text-lg">{money(p.price)}</div>
              {sale ? <div className="num text-xs text-muted line-through">{money(p.compareAt)}</div> : <StockNote p={p} />}
            </div>
            <button
              type="button"
              aria-label={`Add ${p.name} to cart`}
              onClick={(e) => { e.preventDefault(); add(p.id); }}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:bg-red"
            >
              <Plus size={17} />
            </button>
          </div>
          {layout === 'list' && (
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={(e) => { e.preventDefault(); setQuick(true); }} className="rounded-full border border-line px-3 py-1.5 text-[13px]">Quick view</button>
              <button type="button" onClick={(e) => { e.preventDefault(); toggleCompare(p.id); }} className={cn('rounded-full border px-3 py-1.5 text-[13px]', compare ? 'border-red bg-red text-white' : 'border-line')}>{compare ? 'Comparing' : 'Compare'}</button>
            </div>
          )}
        </div>
      </Link>
      <QuickView p={p} open={quick} onClose={() => setQuick(false)} />
    </>
  );
}

export function QuickView({ p, open, onClose }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-end bg-ink/45 backdrop-blur-[2px] sm:place-items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={p.name}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 30, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-white pb-[env(safe-area-inset-bottom)] sm:rounded-[2rem] md:grid-cols-2"
          >
            <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow"><X size={18} /></button>
            <div className="relative aspect-[4/3] overflow-hidden bg-mist sm:aspect-square">
              <ProductImage p={p} iconSize={64} />
            </div>
            <div className="flex flex-col p-6 sm:p-9">
              <span className="text-sm text-muted">{p.brand}</span>
              <h3 className="mt-1 text-2xl leading-tight font-medium tracking-tight">{p.name}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.summary}</p>
              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {Object.entries(p.specs).slice(0, 6).map(([k, v]) => (
                  <div key={k}><dt className="text-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
                ))}
              </dl>
              <div className="mt-6 flex items-center gap-3">
                <span className="num text-3xl font-semibold tracking-tight">{money(p.price)}</span>
                {p.compareAt && <span className="num text-muted line-through">{money(p.compareAt)}</span>}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Qty value={qty} onChange={setQty} max={p.stock} />
                <Button arrow className="flex-1" onClick={() => { add(p.id, qty); onClose(); }}>Add to cart</Button>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-[13px] text-muted">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={16} className="text-red" /> {p.warrantyYears}-year warranty</span>
                <span className="inline-flex items-center gap-1.5"><Truck size={16} className="text-red" /> Delivery nationwide</span>
              </div>
              <Link to={`/shop/${p.id}`} className="mt-5 text-sm font-medium underline underline-offset-4" onClick={onClose}>View full details</Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
