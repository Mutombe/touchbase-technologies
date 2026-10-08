import { Fragment, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';

// Pages load on demand in the browser. The build-time renderer calls preloadPages() first,
// so every page renders straight to HTML instead of its loading fallback.
const pages = [];
function page(load) {
  const Lazy = lazy(load);
  const entry = { load: () => load().then((m) => (entry.mod = m.default)) };
  pages.push(entry);
  return function Page(props) {
    const Mod = entry.mod;
    return Mod ? <Mod {...props} /> : <Lazy {...props} />;
  };
}
export const preloadPages = () => Promise.all(pages.map((p) => p.load()));

const Solutions = page(() => import('./pages/Solutions'));
const SolutionDetail = page(() => import('./pages/SolutionDetail'));
const Planner = page(() => import('./pages/Planner'));
const Shop = page(() => import('./pages/Shop'));
const ProductDetail = page(() => import('./pages/ProductDetail'));
const Cart = page(() => import('./pages/Cart'));
const Checkout = page(() => import('./pages/Checkout'));
const OrderConfirmation = page(() => import('./pages/OrderConfirmation'));
const Projects = page(() => import('./pages/Projects'));
const About = page(() => import('./pages/About'));
const Contact = page(() => import('./pages/Contact'));
const NotFound = page(() => import('./pages/NotFound'));

// At build time there is no loading state to show: render pages inline so the HTML is complete.
const Boundary = import.meta.env.SSR ? Fragment : Suspense;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const Loader = () => (
  <div className="grid min-h-[60vh] place-items-center">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-mist-2 border-t-red" />
  </div>
);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-[70vh]">
        <Boundary {...(import.meta.env.SSR ? {} : { fallback: <Loader /> })}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:slug" element={<SolutionDetail />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:number" element={<OrderConfirmation />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Boundary>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <Toaster position={typeof window !== 'undefined' && window.innerWidth < 768 ? 'top-center' : 'bottom-center'} offset={16} toastOptions={{ style: { borderRadius: 999, fontFamily: 'Urbanist Variable, sans-serif', fontSize: 14 } }} />
    </>
  );
}
