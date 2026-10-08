import { categories } from '../data/products';
import { solutionIcon } from './icons';
import { cn } from '../lib/format';

// Product photo when one is set, otherwise a branded tile with the category icon.
export default function ProductImage({ p, className, iconSize = 64, zoomStyle }) {
  if (p.image) {
    return <img src={p.image} alt={p.name} loading="lazy" style={zoomStyle} className={cn('absolute inset-0 m-auto h-[78%] w-[78%] object-contain mix-blend-multiply transition-transform duration-500', className)} />;
  }
  const cat = categories.find((c) => c.id === p.category);
  const I = solutionIcon(cat?.icon);
  return (
    <div role="img" aria-label={p.name} style={zoomStyle} className={cn('absolute inset-0 grid place-items-center transition-transform duration-500', className)}>
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-2/3 w-2/3 rounded-full bg-red/10 blur-2xl" />
      <div className="relative grid place-items-center">
        <span className="grid place-items-center rounded-[28%] bg-white text-red shadow-[var(--shadow-soft)]" style={{ width: iconSize * 1.75, height: iconSize * 1.75 }}>
          <I size={iconSize} weight="light" />
        </span>
        {iconSize >= 40 && <span className="mt-3 text-[11px] font-semibold tracking-[0.18em] text-ink/35 uppercase">{p.brand}</span>}
      </div>
    </div>
  );
}
