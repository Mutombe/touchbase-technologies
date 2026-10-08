import { Certificate, UsersThree, Lightning, Handshake, ShieldCheck, Headset } from '@phosphor-icons/react';
import { Container, Label, Reveal, Counter, Button } from '../components/ui';
import { stats } from '../data/site';
import { CTA, FAQ } from './Home';
import { autoLink } from '../components/ContentLink';

const VALUES = [
  { icon: Lightning, t: 'Designed, not guessed', b: 'Every room, camera layout and network starts with a site survey, never with what happens to be in stock.' },
  { icon: Certificate, t: 'Proven brands only', b: 'We install equipment we can support for years, backed by genuine manufacturer warranties.' },
  { icon: Headset, t: 'One team, for life', b: 'The engineers who design your system are the ones who answer when you call two years later.' },
  { icon: Handshake, t: 'Clear proposals', b: 'Fixed quotes with a full equipment list and timeline, so there are no surprises on the invoice.' },
  { icon: ShieldCheck, t: 'Secure by default', b: 'Cameras, rooms and networks are segmented and locked down before we hand them over.' },
  { icon: UsersThree, t: 'Trained people', b: 'Handover training for staff and admins, so the technology gets used the way it was meant to.' },
];

export default function About() {
  return (
    <>
      <Container className="pt-10 sm:pt-14">
        <div className="grid gap-6 md:grid-cols-2">
          <Label>About Touchbase</Label>
          <h1 className="text-[34px] leading-[1.15] tracking-tight sm:text-[44px]">
            <span className="accent text-red">Connect, innovate, collaborate:</span> <span className="text-muted">technology built around the way your people actually work.</span>
          </h1>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <Reveal className="relative h-[420px] overflow-hidden rounded-[1.75rem]">
            <img src="/img/engineer-datacentre.webp" alt="Engineer with a laptop in a server room" className="absolute inset-0 h-full w-full object-cover object-[65%_center]" />
            <span className="glass-tag absolute bottom-5 left-5 rounded-full px-4 py-2 text-[14px]">Harare · projects nationwide</span>
          </Reveal>
          <div className="grid gap-4">
            <Reveal delay={0.06} className="tex-grid overflow-hidden rounded-[1.75rem] bg-ink p-7 text-white">
              <p className="text-[20px] leading-[1.35] tracking-tight">
                Touchbase exists for one reason: <span className="text-white/45">so that technology brings your team</span> together, instead of getting in the way.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="relative min-h-[200px] overflow-hidden rounded-[1.75rem]">
              <img src="/img/developer-headphones.webp" alt="Team member at her workstation" className="absolute inset-0 h-full w-full object-cover" />
            </Reveal>
          </div>
        </div>
      </Container>

      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[40px] leading-none tracking-tight"><Counter to={s.value} suffix={s.suffix} /></div>
              <div className="mt-3 text-[13px] text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>

      <section className="border-t border-line">
        <Container className="py-16 sm:py-20">
          <div>
            <Label>What we stand for</Label>
            <h2 className="mt-5 text-[34px] leading-[1.1] tracking-tight">What we promise <span className="text-muted">on every project</span></h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.05} className="rounded-[1.5rem] border border-line p-6">
                <v.icon size={26} weight="light" className="text-red" />
                <div className="mt-10 text-lg font-medium">{v.t}</div>
                <p className="mt-1 text-[14.5px] text-muted">{autoLink(v.b, { maxLinks: 1 })}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container className="pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['/img/engineer-code-wall.webp', 'Innovate', 'We keep testing new platforms so you get proven technology, not experiments.'],
            ['/img/developer-code-wall.webp', 'Connect', 'Networks and cloud tools configured so people and systems talk to each other.'],
            ['/img/support-desk.webp', 'Collaborate', 'Rooms and support that make working together easy, in person or remotely.'],
          ].map(([img, tag, body]) => (
            <div key={tag} className="relative h-[300px] overflow-hidden rounded-[1.75rem]">
              <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <span className="glass-tag absolute top-4 left-4 rounded-full px-3 py-1 text-[12.5px]">{tag}</span>
              <p className="absolute right-5 bottom-5 left-5 text-[16px] text-white">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center"><Button to="/contact" variant="red" arrow>Talk to an engineer</Button></div>
      </Container>

      <FAQ />
      <CTA />
    </>
  );
}
