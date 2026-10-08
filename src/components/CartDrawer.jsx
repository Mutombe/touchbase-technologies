import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash, Handbag, Truck } from '@phosphor-icons/react';
import { useCart } from '../store';
import { money } from '../lib/format';
import { Button, Qty } from './ui';
import ProductImage from './ProductImage';

export const FREE_DELIVERY = 1500;

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, setQty, remove } = useCart();
  useCart((s) => s.lines); // re-render on change
  const { lines, subtotal } = useCart.getState().totals();
  const nav = useNavigate();
  const pct = Math.min(100, (subtotal / FREE_DELIVERY) * 100);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeDrawer();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeDrawer} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-[440px] flex-col bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="text-xl font-semibold tracking-tight">Your cart</h2>
              <button type="button" onClick={closeDrawer} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full hover:bg-mist">
                <X size={18} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-mist"><Handbag size={28} /></span>
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-muted">Kitting out a meeting room? The Room Planner recommends the full setup.</p>
                <div className="flex gap-2">
                  <Button to="/shop" arrow onClick={closeDrawer}>Browse shop</Button>
                  <Button to="/planner" variant="outline" onClick={closeDrawer}>Room Planner</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="px-6 pt-4">
                  <div className="flex items-center gap-2 text-[13px] text-muted">
                    <Truck size={16} className="text-red" />
                    {subtotal >= FREE_DELIVERY ? <span><b className="text-ink">Free delivery</b> unlocked within Harare</span> : <span>Add <b className="text-ink">{money(FREE_DELIVERY - subtotal)}</b> for free Harare delivery</span>}
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
                    <motion.div className="h-full rounded-full bg-red" initial={false} animate={{ width: `${pct}%` }} />
                  </div>
                </div>
                <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {lines.map((l) => (
                    <li key={l.key} className="flex gap-4">
                      <Link to={l.href} onClick={closeDrawer} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-mist">
                        <ProductImage p={l.product} iconSize={22} />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2">
                          <Link to={l.href} onClick={closeDrawer} className="line-clamp-2 text-[15px] leading-snug font-medium hover:underline">{l.name}</Link>
                          <button type="button" aria-label={`Remove ${l.name}`} onClick={() => remove(l.key)} className="h-7 w-7 shrink-0 rounded-full text-muted hover:bg-mist hover:text-ink">
                            <Trash size={15} className="mx-auto" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-muted">{l.subtitle}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <Qty size="sm" value={l.qty} max={l.product.stock} onChange={(q) => setQty(l.key, q)} />
                          <span className="num font-semibold">{money(l.price * l.qty)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-line px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="num text-2xl font-semibold tracking-tight">{money(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">Delivery, promo codes and installation options at checkout.</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => { closeDrawer(); nav('/cart'); }}>View cart</Button>
                    <Button variant="red" arrow onClick={() => { closeDrawer(); nav('/checkout'); }}>Checkout</Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
