import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Scales } from '@phosphor-icons/react';
import { useCart, useCompare } from '../store';
import { productById } from '../data/products';
import { money } from '../lib/format';
import { Button } from './ui';
import ProductImage from './ProductImage';

// Floating tray + side-by-side comparison table
export default function CompareTray() {
  const ids = useCompare((s) => s.products);
  const toggle = useCompare((s) => s.toggle);
  const clear = useCompare((s) => s.clear);
  const add = useCart((s) => s.add);
  const [open, setOpen] = useState(false);
  const items = ids.map((id) => productById[id]).filter(Boolean);

  const rows = [
    ['Price', (p) => money(p.price)],
    ['Brand', (p) => p.brand],
    ['Warranty', (p) => `${p.warrantyYears} years`],
    ['Availability', (p) => (p.stock <= 5 ? `Only ${p.stock} left` : 'In stock')],
    ...[...new Set(items.flatMap((p) => Object.keys(p.specs)))].filter((k) => k !== 'Warranty').map((k) => [k, (p) => p.specs[k] ?? 'n/a']),
  ];

  return (
    <>
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-3 right-[5.25rem] z-30 mx-auto max-w-3xl rounded-full bg-ink p-2 pl-5 text-white shadow-2xl sm:right-24"
          >
            <div className="flex items-center gap-3">
              <Scales size={18} className="shrink-0 text-red-bright" />
              <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
                {items.map((p) => (
                  <span key={p.id} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 py-1 pr-1.5 pl-3 text-[12.5px]">
                    <span className="max-w-[140px] truncate">{p.name}</span>
                    <button type="button" aria-label={`Remove ${p.name}`} onClick={() => toggle(p.id)} className="grid h-5 w-5 place-items-center rounded-full hover:bg-white/20"><X size={11} /></button>
                  </span>
                ))}
                <span className="shrink-0 text-[12px] text-white/40">{items.length}/4</span>
              </div>
              <button type="button" onClick={clear} className="hidden shrink-0 px-2 text-[12.5px] text-white/50 hover:text-white sm:block">Clear</button>
              <Button variant="red" size="sm" arrow disabled={items.length < 2} onClick={() => setOpen(true)} className="shrink-0">Compare</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 p-3 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div role="dialog" aria-modal="true" aria-label="Compare products" onClick={(e) => e.stopPropagation()} initial={{ y: 24 }} animate={{ y: 0 }} className="max-h-[90dvh] w-full max-w-5xl overflow-auto rounded-[2rem] bg-white p-5 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl tracking-tight">Side-by-side comparison</h2>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full hover:bg-mist"><X size={18} /></button>
              </div>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-[14px]">
                  <thead>
                    <tr>
                      <th className="w-40" />
                      {items.map((p) => (
                        <th key={p.id} className="px-3 pb-4 align-top font-normal">
                          <div className="relative mb-3 h-28 overflow-hidden rounded-2xl bg-mist"><ProductImage p={p} iconSize={28} /></div>
                          <Link to={`/shop/${p.id}`} onClick={() => setOpen(false)} className="text-[15px] font-medium hover:underline">{p.name}</Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(([label, fn]) => (
                      <tr key={label}>
                        <td className="border-t border-line py-3 pr-3 text-muted">{label}</td>
                        {items.map((p) => <td key={p.id} className="num border-t border-line px-3 py-3">{fn(p)}</td>)}
                      </tr>
                    ))}
                    <tr>
                      <td />
                      {items.map((p) => (
                        <td key={p.id} className="px-3 pt-4">
                          <Button size="sm" arrow className="w-full" onClick={() => { add(p.id); setOpen(false); }}>Add to cart</Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
