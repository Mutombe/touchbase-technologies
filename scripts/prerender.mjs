// Writes dist/<route>/index.html for every page, filled with server-rendered markup.
// The browser bundle then takes over (createRoot), so interactive features work as before.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const { render, solutions, products } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const routes = [
  '/', '/solutions', '/planner', '/shop', '/cart', '/projects', '/about', '/contact',
  ...solutions.map((s) => `/solutions/${s.slug}`),
  ...products.map((p) => `/shop/${p.id}`),
];

// Entrance animations start from opacity 0 (often plus an offset). Without JavaScript they
// never play, so drop that starting state from the static markup. Elements hidden on purpose
// (inactive carousel slides) carry aria-hidden="true" and are left alone.
const reveal = (html) =>
  html.replace(/<[a-z][^>]*\sstyle="[^"]*opacity:\s*0(?![.\d])[^"]*"[^>]*>/g, (tag) =>
    /aria-hidden="true"/.test(tag)
      ? tag
      : tag.replace(/style="([^"]*)"/, (m, css) => `style="${css.replace(/opacity:\s*0(?![.\d]);?/, '').replace(/transform:[^;"]*;?/, '')}"`),
  );

for (const route of routes) {
  const body = reveal(await render(route));
  const out = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  // Hosts differ on /about vs /about/; a sibling about.html covers the slash-less form too.
  if (route !== '/') fs.writeFileSync(path.join(dist, `${route}.html`), out);
}
// Unknown URLs fall back to a page-less shell; the app renders its 404 or route client-side.
fs.writeFileSync(path.join(dist, '200.html'), template);
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes`);
