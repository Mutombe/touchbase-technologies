import { Link, useParams } from 'react-router-dom';
import { Check } from '@phosphor-icons/react';
import { Container, Label, Button, Reveal, Arrow } from '../components/ui';
import { solutionIcon } from '../components/icons';
import { solutions, projects } from '../data/site';
import { CTA, FAQ } from './Home';
import NotFound from './NotFound';
import { autoLink } from '../components/ContentLink';

export default function SolutionDetail() {
  const { slug } = useParams();
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return <NotFound />;
  const I = solutionIcon(s.icon);
  const idx = solutions.indexOf(s);
  const next = solutions[(idx + 1) % solutions.length];
  const work = projects.filter((p) => p.solution === s.slug);

  return (
    <>
      <Container className="pt-10 sm:pt-14">
        <Link to="/solutions" className="text-[13px] text-muted hover:text-ink">← All solutions</Link>
        <div className="mt-5 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <Label><I size={14} /> {s.tag}</Label>
            <h1 className="mt-5 text-[34px] leading-[1.1] tracking-tight sm:text-[48px]">{s.title}</h1>
          </div>
          <p className="text-[17px] leading-relaxed text-muted md:max-w-xl md:justify-self-end">{autoLink(s.intro, { exclude: [`/solutions/${s.slug}`] })}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <Reveal className="relative h-[360px] overflow-hidden rounded-[1.75rem] sm:h-[480px]">
            <img src={s.image} alt={s.tag} className="absolute inset-0 h-full w-full object-cover" />
            <span className="glass-tag absolute right-5 bottom-5 left-5 hidden w-fit rounded-full px-4 py-2 text-[14px] sm:block">{s.body}</span>
          </Reveal>
          <div className="grid gap-4">
            {s.gallery.map((g, i) => (
              <Reveal key={g} delay={0.06 * (i + 1)} className="relative min-h-[200px] overflow-hidden rounded-[1.75rem]">
                <img src={g} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <div>
            <Label>What’s included</Label>
            <h2 className="mt-5 text-[30px] leading-[1.15] tracking-tight">What every install <span className="text-muted">includes</span></h2>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button to={`/contact?topic=quote&solution=${s.slug}`} variant="red" arrow>Request a quote</Button>
              {s.slug === 'video-conferencing' && <Button to="/planner" variant="outline">Plan a room</Button>}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {s.features.map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.05} className="rounded-[1.5rem] border border-line p-6">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-red-soft text-red-2"><Check size={15} weight="bold" /></span>
                <div className="mt-8 text-lg font-medium">{t}</div>
                <p className="mt-1 text-[14.5px] text-muted">{autoLink(b, { exclude: [`/solutions/${s.slug}`], maxLinks: 1 })}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {work.length > 0 && (
        <section className="tex-dots bg-mist py-16">
          <Container>
            <Label>Recent work</Label>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {work.map((p) => (
                <Link to="/projects" key={p.slug} className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
                  <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute right-4 bottom-4 left-4 text-[16px] leading-snug text-white">{p.title}</div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Container className="py-16">
        <Link to={`/solutions/${next.slug}`} className="group relative flex h-[220px] items-end overflow-hidden rounded-[1.75rem] p-6 text-white sm:p-8">
          <img src={next.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
          <div className="relative flex w-full items-end justify-between gap-4">
            <div>
              <div className="text-[13px] text-white/60">Next solution</div>
              <div className="mt-1 text-[26px] tracking-tight sm:text-[32px]">{next.tag}</div>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-red"><Arrow className="h-3.5 w-3.5" /></span>
          </div>
        </Link>
      </Container>

      <FAQ />
      <CTA />
    </>
  );
}
