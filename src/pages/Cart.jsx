import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash, Heart, Tag, Handbag, ShieldCheck, Truck, Lock } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Container, PageHeader, Button, Qty, inputCls } from '../components/ui';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import { FREE_DELIVERY } from '../components/CartDrawer';
import { useCart, useWishlist, COUPONS } from '../store';
import { products } from '../data/products';
import { money, cn } from '../lib/format';

// Accessories that go with what is already in the cart
const GOES_WITH = { 'video-bars': ['displays', 'audio'], cameras: ['audio', 'displays'], cctv: ['cctv', 'networking'], networking: ['networking'], audio: ['audio'], displays: ['video-bars'] };

export default function Cart() {
  const { setQty, remove, coupon, applyCoupon, removeCoupon } = useCart();
  useCart((s) => s.lines);
  useCart((s) => s.coupon);
  const { lines, subtotal, discount, count } = useCart.getState().totals();
  const toggleWish = useWishlist((s) => s.toggle);
  const wishIds = useWishlist((s) => s.ids);
  const [code, setCode] = useState('');

  const inCart = new Set(lines.map((l) => l.id));
  const wanted = new Set(lines.flatMap((l) => GOES_WITH[l.product.category] || []));
  const suggestions = products.filter((p) => !inCart.has(p.id) && (wanted.size ? wanted.has(p.category) : p.featured)).slice(0, 4);

  if (!lines.length) {
    return (
      <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
        <div>
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mist"><Handbag size={34} /></span>
          <h1 className="mt-6 text-3xl tracking-tight">Your cart is empty</h1>
          <p className="mt-2 text-muted">Browse the shop, or let the Room Planner recommend a complete meeting-room setup.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Button to="/shop" variant="red" arrow>Browse shop</Button>
            <Button to="/planner" variant="outline">Room Planner</Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <PageHeader label="Cart" title={<>Your cart <span className="text-muted">({count} {count === 1 ? 'item' : 'items'})</span></>} />
      <Container className="grid gap-8 pb-16 lg:grid-cols-[1fr_400px]">
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {lines.map((l) => (
              <motion.li key={l.key} layout exit={{ opacity: 0, x: -30 }} className="flex gap-4 rounded-[1.5rem] border border-line p-3 sm:gap-5 sm:p-4">
                <Link to={l.href} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.1rem] bg-mist sm:h-28 sm:w-28">
                  <ProductImage p={l.product} iconSize={26} />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link to={l.href} className="block text-[16px] leading-snug font-medium hover:underline">{l.name}</Link>
                      <div className="text-[13px] text-muted">{l.subtitle}</div>
                    </div>
                    <div className="num text-right text-[17px] font-semibold">{money(l.price * l.qty)}</div>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                    <Qty size="sm" value={l.qty} max={l.product.stock} onChange={(q) => setQty(l.key, q)} />
                    {l.qty > 1 && <span className="num text-[12.5px] text-muted">{money(l.price)} each</span>}
                    <div className="ml-auto flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (!wishIds.includes(l.id)) toggleWish(l.id);
                          remove(l.key);
                          toast('Moved to wishlist');
                        }}
                        className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] text-muted hover:bg-mist hover:text-ink"
                      >
                        <Heart size={14} /> Save for later
                      </button>
                      <button type="button" onClick={() => remove(l.key)} className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] text-muted hover:bg-mist hover:text-ink">
                        <Trash size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.75rem] bg-mist p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const r = applyCoupon(code);
                r.ok ? toast.success(`Code applied: ${r.message}`) : toast.error(r.message);
              }}
            >
              <label className="relative flex-1">
                <span className="sr-only">Promo code</span>
                <Tag size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" className={cn(inputCls, 'h-11 rounded-full pl-10 uppercase placeholder:normal-case')} />
              </label>
              <Button type="submit" variant="outline" size="md">Apply</Button>
            </form>
            {coupon ? (
              <div className="mt-2 flex items-center justify-between rounded-full bg-red-soft px-3 py-1.5 text-[13px] text-red-2">
                <span><b>{coupon}</b> · {COUPONS[coupon].label}</span>
                <button type="button" onClick={removeCoupon} className="underline">Remove</button>
              </div>
            ) : (
              <p className="mt-2 text-[12px] text-muted">Try <b>TOUCHBASE5</b> or <b>CONNECT10</b> (demo codes).</p>
            )}
            <dl className="mt-5 space-y-2.5 text-[14.5px]">
              <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="num">{money(subtotal, { cents: true })}</dd></div>
              {discount > 0 && <div className="flex justify-between text-red-2"><dt>Discount</dt><dd className="num">−{money(discount, { cents: true })}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="text-muted">Calculated at checkout</dd></div>
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="font-medium">Total</span>
              <span className="num text-[28px] font-semibold tracking-tight">{money(subtotal - discount, { cents: true })}</span>
            </div>
            <Button to="/checkout" variant="red" arrow size="lg" className="mt-5 w-full">Secure checkout</Button>
            <div className="mt-5 space-y-2 text-[12.5px] text-muted">
              <div className="flex items-center gap-2"><Lock size={15} /> Encrypted checkout · EcoCash, InnBucks, card & bank</div>
              <div className="flex items-center gap-2"><Truck size={15} /> Free delivery in Harare over {money(FREE_DELIVERY)}</div>
              <div className="flex items-center gap-2"><ShieldCheck size={15} /> Genuine stock with local warranty support</div>
            </div>
          </div>
        </aside>
      </Container>

      {suggestions.length > 0 && (
        <Container className="pb-20">
          <h2 className="text-[26px] tracking-tight">{wanted.size ? 'Goes well with your order' : 'Popular right now'}</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {suggestions.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </Container>
      )}
    </>
  );
}
