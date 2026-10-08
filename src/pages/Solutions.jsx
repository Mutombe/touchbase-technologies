import { Link } from 'react-router-dom';
import { Container, PageHeader, Reveal, Arrow } from '../components/ui';
import { solutionIcon } from '../components/icons';
import { solutions } from '../data/site';
import { cn } from '../lib/format';
import { CTA } from './Home';

export default function Solutions() {
  return (
    <>
      <PageHeader label="Solutions" title={<>Everything your team needs <span className="text-muted">to connect.</span></>}>
        Seven connected services, one accountable team. Choose a solution to see what is included, or combine them into a single project.
      </PageHeader>
      <Container className="pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => {
            const I = solutionIcon(s.icon);
            return (
              <Reveal key={s.slug} delay={(i % 3) * 0.06} className={cn(i === 0 && 'sm:col-span-2 lg:col-span-2')}>
                <Link to={`/solutions/${s.slug}`} className="group relative flex h-[380px] flex-col overflow-hidden rounded-[1.75rem] text-white">
                  <img src={s.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="relative flex items-start justify-between p-5">
                    <span className="glass-tag inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px]"><I size={15} /> {s.tag}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition group-hover:bg-red group-hover:text-white"><Arrow className="h-3.5 w-3.5" /></span>
                  </div>
                  <div className="relative mt-auto p-5 sm:p-6">
                    <h2 className="max-w-md text-[22px] leading-snug tracking-tight">{s.title}</h2>
                    <p className="mt-2 max-w-md text-[14px] text-white/70">{s.body}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
          <Reveal delay={0.12} className="tex-hatch relative flex h-[380px] flex-col overflow-hidden rounded-[1.75rem] bg-red p-7 text-white">
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/15 blur-2xl" />
            <span className="relative text-[13px] text-white/75">Not sure where to start?</span>
            <p className="relative mt-auto text-[22px] leading-snug tracking-tight">Use the Room Planner <span className="text-white/70">to get a recommended meeting-room setup in under a minute.</span></p>
            <Link to="/planner" className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-red hover:bg-red-soft">Open the planner <Arrow /></Link>
          </Reveal>
        </div>
      </Container>
      <CTA />
    </>
  );
}
