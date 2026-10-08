// Build-time renderer: turns each route into static HTML so pages work without JavaScript
// and are readable by search engines. Used only by scripts/prerender.mjs.
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App, { preloadPages } from './App';

export async function render(url) {
  await preloadPages();
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}

export { solutions, projects } from './data/site';
export { products } from './data/products';
