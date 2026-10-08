import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Printer, WhatsappLogo } from '@phosphor-icons/react';
import { Container, Button } from '../components/ui';
import ProductImage from '../components/ProductImage';
import { useOrders } from '../store';
import { productById } from '../data/products';
import { company } from '../data/site';
import { money, cn } from '../lib/format';
import NotFound from './NotFound';

const PAY_LABEL = { ecocash: 'EcoCash', innbucks: 'InnBucks', card: 'Card', bank: 'Bank transfer' };

export default function OrderConfirmation() {
  const { number } = useParams();
  const order = useOrders((s) => s.orders.find((o) => o.number === number));
  if (!order) return <NotFound />;

  const bank = order.payment.method === 'bank';
  const f = order.fulfilment;
  const timeline = [
    { t: 'Order placed', b: new Date(order.date).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }), done: true },
    { t: bank ? 'Awaiting bank transfer' : 'Payment received', b: `${PAY_LABEL[order.payment.method]} · ${money(order.payment.paid, { cents: true })}`, done: !bank },
    { t: 'Confirmation call', b: 'Within one working hour on WhatsApp', done: false },
    { t: f.install ? 'Installation & handover' : f.method === 'collect' ? 'Ready for collection' : 'Out for delivery', b: f.date || f.city, done: false },
  ];

  return (
    <Container className="max-w-4xl py-12 sm:py-16">
      <div className="text-center">
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-red text-white">
          <Check size={38} weight="bold" />
        </motion.span>
        <h1 className="mt-6 text-[36px] tracking-tight sm:text-[44px]">Thank you, {order.customer.name.trim().split(' ')[0]}!</h1>
        <p className="mt-2 text-muted">Order <b className="text-ink">{order.number}</b> is confirmed. A copy is on its way to {order.customer.email}.</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-[1fr_1.2fr]">
        <div className="tex-grid overflow-hidden rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
          <h2 className="font-semibold">What happens next</h2>
          <ol className="mt-5 space-y-5">
            {timeline.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold', s.done ? 'bg-red' : 'border border-white/20 text-white/50')}>{s.done ? <Check size={13} weight="bold" /> : i + 1}</span>
                <div>
                  <div className={s.done ? '' : 'text-white/70'}>{s.t}</div>
                  <div className="text-[13px] text-white/45">{s.b}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-[1.75rem] bg-mist p-6 sm:p-8">
          <h2 className="font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {order.lines.map((l) => (
              <li key={l.key} className="flex items-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white">{productById[l.id] && <ProductImage p={productById[l.id]} iconSize={13} />}</span>
                <span className="flex-1 text-[14px]">{l.qty} × {l.name}</span>
                <span className="num text-[14px]">{money(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-[14px]">
            {order.totals.discount > 0 && <div className="flex justify-between text-red-2"><dt>Discount</dt><dd className="num">−{money(order.totals.discount, { cents: true })}</dd></div>}
            {order.totals.delivery > 0 && <div className="flex justify-between"><dt className="text-muted">Delivery</dt><dd className="num">{money(order.totals.delivery)}</dd></div>}
            {order.totals.install > 0 && <div className="flex justify-between"><dt className="text-muted">Installation</dt><dd className="num">{money(order.totals.install)}</dd></div>}
            <div className="flex justify-between pt-1 text-[16px] font-semibold"><dt>Total</dt><dd className="num">{money(order.totals.total, { cents: true })}</dd></div>
          </dl>
        </div>
      </div>

      <div className="print:hidden mt-8 flex flex-wrap justify-center gap-2">
        <Button onClick={() => window.print()} variant="outline"><Printer size={16} /> Print receipt</Button>
        <Button href={`${company.whatsapp}?text=${encodeURIComponent(`Hi Touchbase, checking on order ${order.number}.`)}`} variant="outline"><WhatsappLogo size={16} /> WhatsApp us</Button>
        <Button to="/shop" variant="red" arrow>Continue shopping</Button>
      </div>
      <p className="mt-6 text-center text-[13px] text-muted"><Link to="/" className="underline">Back to home</Link></p>
    </Container>
  );
}
