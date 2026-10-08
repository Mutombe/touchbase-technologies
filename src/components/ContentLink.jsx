import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { crossLinks } from '../data/crossLinks';

// Ask before sending a visitor off-site; goes ahead on its own after 4 seconds.
export function confirmExternalNavigation(url, e) {
  if (e) e.preventDefault();
  let domain = url;
  try {
    domain = new URL(url).hostname.replace('www.', '');
  } catch {
    /* keep the raw url */
  }
  let gone = false;
  const go = () => {
    if (gone) return;
    gone = true;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  toast('Leaving Touchbase', {
    description: `Taking you to ${domain}`,
    duration: 4000,
    action: { label: 'Proceed', onClick: go },
    cancel: { label: 'Cancel', onClick: () => {} },
    onAutoClose: go,
  });
}

const linkCls =
  'rounded-sm font-medium text-red underline decoration-red/40 decoration-dotted decoration-1 underline-offset-[3px] transition-all duration-200 hover:bg-red/[0.06] hover:decoration-solid hover:decoration-2 hover:decoration-red';

// Inline link inside body copy: dotted underline that turns solid on hover.
export default function ContentLink({ to, href, children, className = '' }) {
  if (href) {
    return (
      <a href={href} onClick={(e) => confirmExternalNavigation(href, e)} className={`${linkCls} cursor-pointer ${className}`}>
        {children}
        <ArrowUpRight size={11} weight="bold" className="ml-0.5 inline-block align-baseline opacity-60" aria-hidden />
        <span className="sr-only"> (opens another site)</span>
      </a>
    );
  }
  return (
    <Link to={to} className={`${linkCls} ${className}`}>
      {children}
    </Link>
  );
}

const BOUNDARY = /[\s,.:;!?()/-]/;
const KEYS = Object.keys(crossLinks).sort((a, b) => b.length - a.length);

/**
 * autoLink: turn known phrases in a string into ContentLinks.
 *   <p>{autoLink(text, { exclude: ['/solutions/networking'] })}</p>
 * maxLinks caps links per block so copy never turns into a wall of underlines;
 * exclude takes destinations (usually the current page) that should not be linked.
 */
export function autoLink(text, { maxLinks = 3, exclude = [] } = {}) {
  if (!text || typeof text !== 'string') return text;
  const lower = text.toLowerCase();
  const matches = [];
  const usedTargets = new Set();

  for (const key of KEYS) {
    if (matches.length >= maxLinks) break;
    const link = crossLinks[key];
    const target = link.to || link.href;
    if (exclude.some((x) => target.startsWith(x)) || usedTargets.has(target)) continue;
    let from = 0;
    while (from < lower.length) {
      const i = lower.indexOf(key, from);
      if (i === -1) break;
      const before = i > 0 ? lower[i - 1] : ' ';
      const after = i + key.length < lower.length ? lower[i + key.length] : ' ';
      const free = !matches.some((m) => i < m.end && i + key.length > m.start);
      if (BOUNDARY.test(before) && BOUNDARY.test(after) && free) {
        matches.push({ start: i, end: i + key.length, link });
        usedTargets.add(target);
        break;
      }
      from = i + 1;
    }
  }
  if (!matches.length) return text;

  matches.sort((a, b) => a.start - b.start);
  const out = [];
  let last = 0;
  matches.forEach((m, k) => {
    if (m.start > last) out.push(text.slice(last, m.start));
    out.push(
      <ContentLink key={k} to={m.link.to} href={m.link.href}>
        {text.slice(m.start, m.end)}
      </ContentLink>,
    );
    last = m.end;
  });
  if (last < text.length) out.push(text.slice(last));
  return out;
}
