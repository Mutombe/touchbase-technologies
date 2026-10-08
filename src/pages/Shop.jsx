import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MagnifyingGlass, SquaresFour, Rows, Funnel, X, Heart } from '@phosphor-icons/react';
import { Container, PageHeader, Button, Toggle } from '../components/ui';
import ProductCard from '../components/ProductCard';
import CompareTray from '../components/CompareTray';
import { solutionIcon } from '../components/icons';
import { products, categories, brands } from '../data/products';
import { useWishlist } from '../store';
import { money, cn } from '../lib/format';

const SORTS = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  name: 'Name: A–Z',
};
const PRICE_MAX = Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = categories.some((c) => c.id === params.get('category')) ? params.get('category') : 'all';
  const wishOnly = params.get('wishlist') === '1';
  const wish = useWishlist((s) => s.ids);

  const [q, setQ] = useState('');
  const [selBrands, setSelBrands] = useState([]);
  const [price, setPrice] = useState([0, PRICE_MAX]);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [sort, setSort] = useState('featured');
  const [layout, setLayout] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const setParam = (k, v) => {
    const next = new URLSearchParams(params);
    if (v === null || v === 'all') next.delete(k);
    else next.set(k, v);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const l = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!selBrands.length || selBrands.includes(p.brand)) &&
        p.price >= price[0] &&
        p.price <= price[1] &&
        (!inStock || p.stock > 0) &&
        (!onSale || (p.compareAt && p.compareAt > p.price)) &&
        (!wishOnly || wish.includes(p.id)) &&
        (!term || `${p.name} ${p.brand} ${p.summary} ${Object.values(p.specs).join(' ')}`.toLowerCase().includes(term)),
    );
    const s = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name),
      featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
    }[sort];
    return [...l].sort(s);
  }, [category, selBrands, price, inStock, onSale, wishOnly, wish, q, sort]);

  const chips = [
    category !== 'all' && { label: categories.find((c) => c.id === category)?.short, clear: () => setParam('category', null) },
    ...selBrands.map((b) => ({ label: b, clear: () => setSelBrands((s) => s.filter((x) => x !== b)) })),
    (price[0] > 0 || price[1] < PRICE_MAX) && { label: `${money(price[0])}–${money(price[1])}`, clear: () => setPrice([0, PRICE_MAX]) },
    inStock && { label: 'In stock', clear: () => setInStock(false) },
    onSale && { label: 'On sale', clear: () => setOnSale(false) },
    wishOnly && { label: 'Wishlist', clear: () => setParam('wishlist', null) },
  ].filter(Boolean);

  const resetAll = () => {
    setSelBrands([]);
    setPrice([0, PRICE_MAX]);
    setInStock(false);
    setOnSale(false);
    setQ('');
    setParams({}, { replace: true });
  };

  const filters = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        <div className="space-y-1">
          {[{ id: 'all', name: 'All products' }, ...categories].map((c) => {
            const count = c.id === 'all' ? products.length : products.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setParam('category', c.id)}
                className={cn('flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-[14px] transition', category === c.id ? 'bg-ink text-white' : 'hover:bg-mist')}
              >
                {c.name}
                <span className={cn('num text-[12px]', category === c.id ? 'text-white/60' : 'text-muted')}>{count}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Brand">
        <div className="flex flex-wrap gap-1.5">
          {brands.map((b) => {
            const on = selBrands.includes(b);
            return (
              <button key={b} type="button" aria-pressed={on} onClick={() => setSelBrands((s) => (on ? s.filter((x) => x !== b) : [...s, b]))} className={cn('rounded-full border px-3 py-1.5 text-[13px] transition', on ? 'border-red bg-red text-white' : 'border-line hover:border-ink/30')}>
                {b}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="num flex justify-between text-[13px]"><span>{money(price[0])}</span><span>{money(price[1])}</span></div>
        <div className="relative mt-3 h-6">
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-mist-2" />
          <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-red" style={{ left: `${(price[0] / PRICE_MAX) * 100}%`, right: `${100 - (price[1] / PRICE_MAX) * 100}%` }} />
          <input aria-label="Minimum price" type="range" min={0} max={PRICE_MAX} step={50} value={price[0]} onChange={(e) => setPrice([Math.min(+e.target.value, price[1] - 50), price[1]])} className="range-thumb pointer-events-none absolute inset-0 w-full appearance-none bg-transparent" />
          <input aria-label="Maximum price" type="range" min={0} max={PRICE_MAX} step={50} value={price[1]} onChange={(e) => setPrice([price[0], Math.max(+e.target.value, price[0] + 50)])} className="range-thumb pointer-events-none absolute inset-0 w-full appearance-none bg-transparent" />
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <div className="flex flex-col items-start gap-3">
          <Toggle checked={inStock} onChange={setInStock} label="In stock only" />
          <Toggle checked={onSale} onChange={setOnSale} label="On sale" />
          <Toggle checked={wishOnly} onChange={(v) => setParam('wishlist', v ? '1' : null)} label={`Wishlist (${wish.length})`} />
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <>
      <PageHeader label="Shop" title={<>Meeting-room & security tech, <span className="text-muted">delivered nationwide.</span></>}>
        Video bars, cameras, audio, displays, CCTV and networking. Genuine stock with warranty, and installation if you want it.
      </PageHeader>

      <Container className="pb-6">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {categories.map((c) => {
            const I = solutionIcon(c.icon);
            const on = category === c.id;
            return (
              <button key={c.id} type="button" onClick={() => setParam('category', on ? null : c.id)} aria-pressed={on} className={cn('flex shrink-0 items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-1.5 text-[14px] transition', on ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink/30')}>
                <span className={cn('grid h-8 w-8 place-items-center rounded-full', on ? 'bg-red text-white' : 'bg-mist text-red')}><I size={16} /></span>
                {c.short}
              </button>
            );
          })}
        </div>
      </Container>

      <Container className="grid gap-8 pb-28 lg:grid-cols-[260px_1fr]">
        <aside className="no-scrollbar hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-2">{filters}</aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <label className="relative min-w-[220px] flex-1">
              <span className="sr-only">Search products</span>
              <MagnifyingGlass size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands, specs…" className="h-11 w-full rounded-full border border-line bg-white pr-4 pl-11 text-[14.5px] outline-none focus:border-red focus:ring-4 focus:ring-red/15" />
            </label>
            <button type="button" onClick={() => setFiltersOpen(true)} className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-[14px] lg:hidden">
              <Funnel size={16} /> Filters {chips.length > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red px-1 text-[11px] font-bold text-white">{chips.length}</span>}
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-11 rounded-full border border-line bg-white px-4 text-[14px]" aria-label="Sort by">
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <div className="flex rounded-full border border-line p-1" role="group" aria-label="Layout">
              {[['grid', SquaresFour], ['list', Rows]].map(([id, I]) => (
                <button key={id} type="button" aria-pressed={layout === id} aria-label={`${id} view`} onClick={() => setLayout(id)} className={cn('grid h-9 w-9 place-items-center rounded-full', layout === id ? 'bg-ink text-white' : 'text-muted')}>
                  <I size={17} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
            <span className="text-muted"><b className="num text-ink">{list.length}</b> products</span>
            {chips.map((c) => (
              <button key={c.label} type="button" onClick={c.clear} className="inline-flex items-center gap-1.5 rounded-full bg-mist py-1 pr-2 pl-3 hover:bg-mist-2">
                {c.label} <X size={12} />
              </button>
            ))}
            {chips.length > 0 && <button type="button" onClick={resetAll} className="underline underline-offset-4">Clear all</button>}
          </div>

          {list.length ? (
            <motion.div layout className={cn('mt-6', layout === 'grid' ? 'grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 xl:grid-cols-3' : 'grid gap-3')}>
              <AnimatePresence>
                {list.map((p) => (
                  <motion.div layout key={p.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
                    <ProductCard p={p} layout={layout} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="mt-8 rounded-[1.75rem] bg-mist p-12 text-center">
              {wishOnly && !wish.length ? (
                <>
                  <Heart size={32} className="mx-auto text-muted" />
                  <p className="mt-3 text-lg">Your wishlist is empty</p>
                  <p className="text-muted">Tap the heart on any product to save it here.</p>
                </>
              ) : (
                <p className="text-lg">Nothing matches those filters.</p>
              )}
              <Button variant="outline" className="mt-5" onClick={resetAll}>Reset filters</Button>
            </div>
          )}
        </div>
      </Container>

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} />
            <motion.div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-[2rem] bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="grid h-9 w-9 place-items-center rounded-full bg-mist"><X size={16} /></button>
              </div>
              {filters}
              <Button className="mt-8 w-full" onClick={() => setFiltersOpen(false)}>Show {list.length} products</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CompareTray />
    </>
  );
}

const FilterGroup = ({ title, children }) => (
  <div>
    <h3 className="mb-3 text-[13px] font-semibold tracking-wide text-muted uppercase">{title}</h3>
    {children}
  </div>
);
