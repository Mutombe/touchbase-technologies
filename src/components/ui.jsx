import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import { Minus, Plus } from '@phosphor-icons/react';
import { cn } from '../lib/format';

export const Container = ({ className, children }) => (
  <div className={cn('mx-auto w-full max-w-[1240px] px-4 sm:px-6', className)}>{children}</div>
);

// Small outlined label pill above section headings
export const Label = ({ children, dark, className }) => (
  <span
    className={cn(
      'inline-flex w-fit items-center gap-2 self-start justify-self-start rounded-full border px-3 py-1 text-[13px] font-medium tracking-tight',
      dark ? 'border-white/20 text-white/80' : 'border-line bg-white text-ink/80',
      className,
    )}
  >
    <span className={cn('h-1.5 w-1.5 rounded-full', dark ? 'bg-red-bright' : 'bg-red')} />
    {children}
  </span>
);

export const Arrow = ({ className }) => (
  <svg viewBox="0 0 12 12" fill="none" className={cn('h-3 w-3', className)} aria-hidden>
    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const btnBase =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red';
const btnVariants = {
  dark: 'bg-ink text-white hover:bg-ink-2',
  red: 'bg-red text-white hover:bg-red-2',
  light: 'bg-white text-ink hover:bg-mist',
  outline: 'border border-line bg-white text-ink hover:border-ink/30',
  ghost: 'text-ink hover:bg-mist',
  glass: 'glass-tag hover:bg-white/30',
};
const btnSizes = { sm: 'h-9 px-4 text-[13px]', md: 'h-11 px-5 text-sm', lg: 'h-[52px] px-7 text-[15px]' };

export function Button({ to, href, variant = 'dark', size = 'md', arrow, className, children, type = 'button', ...rest }) {
  const cls = cn(btnBase, btnVariants[variant], btnSizes[size], className);
  const content = (
    <>
      {children}
      {arrow && <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) {
    const external = /^https?:/.test(href);
    return <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>{content}</a>;
  }
  return <button type={type} className={cls} {...rest}>{content}</button>;
}

// Circular arrow button used on image cards and carousels
export const RoundArrow = ({ dir = 'up-right', className, ...rest }) => {
  const rot = { 'up-right': '', left: '-rotate-[135deg]', right: 'rotate-45' }[dir];
  return (
    <button type="button" className={cn('grid h-9 w-9 place-items-center rounded-full transition', className)} {...rest}>
      <Arrow className={cn('h-3.5 w-3.5', rot)} />
    </button>
  );
};

export function Toggle({ checked, onChange, label, dark }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="inline-flex items-center gap-3 text-sm">
      <span className={cn('relative h-6 w-11 rounded-full transition-colors', checked ? 'bg-red' : dark ? 'bg-white/15' : 'bg-mist-2')}>
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
          className={cn('absolute top-1 h-4 w-4 rounded-full bg-white shadow', checked ? 'left-6' : 'left-1')}
        />
      </span>
      {label && <span className={dark ? 'text-white/60' : 'text-muted'}>{label}</span>}
    </button>
  );
}

// Row of dots used as a compact bar chart
export function DotBar({ value, max = 60, dots = 10, label }) {
  const filled = Math.round((value / max) * dots);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className="flex items-center gap-3 text-[13px]">
      <span className="w-28 shrink-0 text-ink/80">{label}</span>
      <div className="flex min-w-0 flex-1 gap-[5px] overflow-hidden">
        {Array.from({ length: dots }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.3, opacity: 0.2 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.04 }}
            className={cn('h-2.5 w-2.5 shrink-0 rounded-full', i < filled ? 'bg-red' : 'bg-mist-2')}
          />
        ))}
      </div>
    </div>
  );
}

export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const M = motion[as];
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </M>
  );
}

export function Counter({ to, suffix = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -22% 0px' });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, delay, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="num">
      {Math.round(v).toLocaleString('en-US').replace(/,/g, ' ')}
      {suffix}
    </span>
  );
}

export const PageHeader = ({ label, title, children, className }) => (
  <Container className={cn('pt-10 pb-8 sm:pt-14', className)}>
    <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end">
      <div>
        <Label>{label}</Label>
        <h1 className="mt-5 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">{title}</h1>
      </div>
      {children && <div className="text-[17px] leading-relaxed text-muted md:max-w-xl md:justify-self-end">{children}</div>}
    </div>
  </Container>
);

export function Field({ label, error, children, className }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 block text-[13px] font-medium text-ink/70">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-2">{error}</span>}
    </label>
  );
}

export const inputCls =
  'h-12 w-full rounded-2xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-muted/70 outline-none transition focus:border-red focus:ring-4 focus:ring-red/15';

export function Qty({ value, onChange, min = 1, max = Infinity, size = 'md' }) {
  const s = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11';
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white">
      <button type="button" aria-label="Decrease" className={cn(s, 'grid place-items-center rounded-full hover:bg-mist')} onClick={() => onChange(Math.max(min, value - 1))}>
        <Minus size={14} />
      </button>
      <span className="num min-w-8 text-center text-sm font-semibold">{value}</span>
      <button type="button" aria-label="Increase" className={cn(s, 'grid place-items-center rounded-full hover:bg-mist')} onClick={() => onChange(Math.min(max, value + 1))}>
        <Plus size={14} />
      </button>
    </div>
  );
}
