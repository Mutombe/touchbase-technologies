// Company details — PLACEHOLDERS, to be confirmed with Touchbase before launch.
export const company = {
  name: 'Touchbase Technologies',
  tagline: 'Connect · Innovate · Collaborate',
  phone: '+263 77 000 0000',
  phoneHref: 'tel:+263770000000',
  whatsapp: 'https://wa.me/263770000000',
  email: 'hello@touchbase.co.zw',
  address: 'Harare, Zimbabwe',
  hours: 'Mon–Fri 8:00–17:00 · 24/7 support line',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'WhatsApp', href: 'https://wa.me/263770000000' },
  ],
};

export const nav = [
  { to: '/solutions', label: 'Solutions' },
  { to: '/planner', label: 'Room Planner' },
  { to: '/shop', label: 'Shop' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contacts' },
];

export const solutions = [
  {
    slug: 'video-conferencing',
    icon: 'VideoConference',
    tag: 'Video Conferencing',
    title: 'Meeting rooms where everyone is seen and heard.',
    image: '/img/yealink-camera-setup.webp',
    gallery: ['/img/yealink-wall-camera.webp', '/img/boardroom-ceiling-audio.webp'],
    body: 'Certified Microsoft Teams and Zoom Rooms with 4K cameras, beamforming mics and one-touch join.',
    intro:
      'From huddle spaces to 20-seat boardrooms, we install and support video rooms that just work, so meetings start on time.',
    features: [
      ['Teams & Zoom Rooms', 'Certified video bars and room kits, configured for your tenant and booking system.'],
      ['Auto-framing cameras', '4K PTZ and AI cameras that follow the speaker and frame the whole table.'],
      ['Room-filling audio', 'Ceiling and table microphone arrays with echo cancellation and noise suppression.'],
      ['One-touch join', 'Touch controllers and booking panels so anyone can start a meeting without IT.'],
    ],
  },
  {
    slug: 'audio-visual',
    icon: 'SpeakerHigh',
    tag: 'Boardroom & AV',
    title: 'Displays, sound and control, built into the room.',
    image: '/img/boardroom-ceiling-audio.webp',
    gallery: ['/img/yealink-wall-camera.webp', '/img/event-tent-screens.webp'],
    body: 'Ceiling speakers, large-format displays, wireless presentation and tidy, concealed cabling.',
    intro:
      'Good AV disappears into the room. We plan sightlines, speaker coverage and cable routes before a single bracket goes up, then hand over a space that looks finished and is simple to use.',
    features: [
      ['Large-format displays', 'Commercial 55″–98″ panels, video walls and projection sized to the room.'],
      ['Ceiling & distributed audio', 'Even sound coverage with ceiling speakers and DSP tuning.'],
      ['Wireless presentation', 'Share a laptop or phone to the screen in one click. No dongle hunting.'],
      ['Concealed infrastructure', 'Floor boxes, trunking and labelled racks for a clean, serviceable finish.'],
    ],
  },
  {
    slug: 'events',
    icon: 'ProjectorScreen',
    tag: 'Event AV & Displays',
    title: 'Screens, sound and live feeds for every seat.',
    image: '/img/event-tent-screens.webp',
    gallery: ['/img/boardroom-ceiling-audio.webp', '/img/yealink-camera-setup.webp'],
    body: 'Multi-screen displays, PA and hybrid streaming for conferences and launches.',
    intro:
      'For conferences, launches and outdoor venues we bring the displays, PA, cameras and crew, and run the show on the day.',
    features: [
      ['Multi-screen displays', 'Suspended screens and repeater displays so the back row sees as well as the front.'],
      ['PA & microphones', 'Wireless handheld, lapel and podium mics with a technician on the desk.'],
      ['Hybrid & streaming', 'Camera feeds to YouTube, Teams or Zoom with remote speaker support.'],
      ['Set-up to strike', 'Site visit, rigging, rehearsal, live operation and pack-down.'],
    ],
  },
  {
    slug: 'cctv-security',
    icon: 'SecurityCamera',
    tag: 'CCTV & Security',
    title: 'Surveillance that holds up on site and on your phone.',
    image: '/img/cctv-hikvision.webp',
    gallery: ['/img/cctv-steel-structure.webp', '/img/server-racks.webp'],
    body: 'IP cameras, NVRs and remote viewing for offices, warehouses, plants and perimeters.',
    intro:
      'We survey each site for coverage, light and cable runs, then install IP cameras that record reliably and can be viewed from anywhere.',
    features: [
      ['IP & PTZ cameras', 'Day/night cameras with smart detection, from small offices to large perimeters.'],
      ['Industrial housings', 'Stainless-steel and weatherproof housings for plants and harsh environments.'],
      ['Recording & storage', 'NVRs sized for your retention period, with redundant storage options.'],
      ['Remote viewing', 'Secure mobile and control-room viewing with role-based access.'],
    ],
  },
  {
    slug: 'networking',
    icon: 'Network',
    tag: 'Networking & Cabling',
    title: 'The network everything else depends on.',
    image: '/img/network-cables.webp',
    gallery: ['/img/server-racks.webp', '/img/tablet-server-room.webp'],
    body: 'Structured cabling, fibre, Wi-Fi and server rooms, designed, tested and certified.',
    intro:
      'Video calls, cameras and cloud apps are only as good as the network under them. We design and install structured cabling, fibre links and enterprise Wi-Fi, then test and label every point.',
    features: [
      ['Structured cabling', 'Cat6/Cat6A and fibre installs, tested and documented point by point.'],
      ['Enterprise Wi-Fi', 'Site surveys and access-point layouts for full coverage without dead spots.'],
      ['Switching & firewalls', 'Managed switches, VLANs and firewalls that separate guests, cameras and staff.'],
      ['Server rooms & racks', 'Rack builds, power protection and cooling for on-site equipment.'],
    ],
  },
  {
    slug: 'managed-it',
    icon: 'Headset',
    tag: 'Managed IT & Support',
    title: 'A support desk that already knows your setup.',
    image: '/img/support-desk.webp',
    gallery: ['/img/tablet-server-room.webp', '/img/engineer-datacentre.webp'],
    body: 'Monitoring, maintenance and help-desk plans that keep rooms, cameras and networks online.',
    intro:
      'Once it is installed, we look after it: monitoring, maintenance, firmware updates and a help desk that fixes most issues remotely.',
    features: [
      ['Proactive monitoring', 'Rooms, cameras and network devices watched for faults around the clock.'],
      ['Preventive maintenance', 'Scheduled site visits, cleaning, firmware and health checks.'],
      ['Help desk', 'Phone, email and WhatsApp support with agreed response times.'],
      ['Asset records', 'Up-to-date inventory, warranties and configuration backups for every device.'],
    ],
  },
  {
    slug: 'cloud-collaboration',
    icon: 'Cloud',
    tag: 'Cloud & Collaboration',
    title: 'Microsoft 365 and Teams, set up properly.',
    image: '/img/engineer-laptop-night.webp',
    gallery: ['/img/developer-code-wall.webp', '/img/engineer-code-wall.webp'],
    body: 'Email, Teams, file sharing and security policies, migrated and supported.',
    intro:
      'We move teams onto Microsoft 365 and Teams without the disruption: planned migrations, sensible security defaults, and training so people actually use the tools you are paying for.',
    features: [
      ['Migrations', 'Email, files and calendars moved across with minimal downtime.'],
      ['Teams voice & rooms', 'Calling plans, auto-attendants and Teams Rooms linked to your tenant.'],
      ['Security baseline', 'MFA, device policies and backup configured from day one.'],
      ['User training', 'Short, practical sessions for staff and admins.'],
    ],
  },
];

// PLACEHOLDER figures — confirm real numbers with Touchbase before launch.
export const stats = [
  { value: 350, suffix: '+', label: 'Meeting rooms equipped' },
  { value: 1200, suffix: '+', label: 'Cameras installed' },
  { value: 24, suffix: '/7', label: 'Support line' },
  { value: 4, suffix: 'h', label: 'Target on-site response' },
];

// Work shown with Touchbase's own site photos. Titles are descriptive (no client names).
export const projects = [
  { slug: 'tented-conference', title: 'Tented conference venue', type: 'Events', scope: 'Suspended multi-screen displays · PA · live feed', image: '/img/event-tent-screens.webp', solution: 'events' },
  { slug: 'industrial-cctv', title: 'Industrial site surveillance', type: 'Security', scope: 'Heavy-duty stainless camera housings · NVR', image: '/img/cctv-hikvision.webp', solution: 'cctv-security' },
  { slug: 'boardroom-video', title: 'Boardroom video conferencing', type: 'Collaboration', scope: 'Wall-mounted PTZ camera · video bar', image: '/img/yealink-wall-camera.webp', solution: 'video-conferencing' },
  { slug: 'ceiling-audio', title: 'Ceiling audio meeting room', type: 'Audio-Visual', scope: 'Ceiling speakers · display · lighting integration', image: '/img/boardroom-ceiling-audio.webp', solution: 'audio-visual' },
  { slug: 'structure-cctv', title: 'Plant structure camera install', type: 'Security', scope: 'Bracket-mounted IP cameras on steelwork', image: '/img/cctv-steel-structure.webp', solution: 'cctv-security' },
  { slug: 'camera-commissioning', title: 'Conference camera commissioning', type: 'Collaboration', scope: '4K PTZ camera · configuration & testing', image: '/img/yealink-camera-setup.webp', solution: 'video-conferencing' },
];

export const process = [
  { n: '01', t: 'Site survey', b: 'We visit, measure and test rooms, sightlines, cable routes and network capacity.', image: '/img/tablet-server-room.webp' },
  { n: '02', t: 'Design & proposal', b: 'A clear layout, equipment list and fixed quote, with a delivery timeline you can plan around.', image: '/img/signing-agreement.webp' },
  { n: '03', t: 'Install & commission', b: 'Certified technicians install, configure and test everything, then train your team.', image: '/img/engineer-datacentre.webp' },
  { n: '04', t: 'Support & care', b: 'Monitoring, maintenance and a help desk that already knows your setup.', image: '/img/support-desk.webp' },
];

export const industries = [
  { t: 'Corporate offices', image: '/img/client-on-phone.webp' },
  { t: 'Data & server rooms', image: '/img/server-racks.webp' },
  { t: 'Mining & industrial', image: '/img/cctv-steel-structure.webp' },
  { t: 'Logistics & retail', image: '/img/warehouse-systems.webp' },
  { t: 'Education & labs', image: '/img/hardware-lab.webp' },
  { t: 'Events & venues', image: '/img/event-tent-screens.webp' },
];

export const faqs = [
  { q: 'Do you supply the equipment as well as install it?', a: 'Yes. We specify, supply, install and commission the full system: cameras, displays, audio, network and cabling. One partner is accountable for the result.' },
  { q: 'Can you work with the equipment we already have?', a: 'Usually, yes. During the site survey we test what is already installed and reuse anything that is compatible and in good condition, so you only pay for what you need.' },
  { q: 'Which video platforms do you support?', a: 'We set up rooms for Microsoft Teams, Zoom and bring-your-own-device (BYOD) meetings, so guests can join from Google Meet, Webex and others.' },
  { q: 'How long does an installation take?', a: 'A typical meeting room is installed and tested in one day. Boardrooms take 2–3 days, and larger sites or CCTV projects are scheduled in phases to avoid disrupting your work.' },
  { q: 'What happens after installation?', a: 'Every project includes handover training. You can then choose a support plan with monitoring, preventive maintenance and help-desk response times that suit your business.' },
  { q: 'Do you work outside Harare?', a: 'Yes. We take on projects across the country and can support many issues remotely between site visits.' },
];

// Brands and platforms Touchbase works with — confirm this list before launch.
// Logos are shown white (CSS filter). `h` is the rendered height in px, tuned per logo so they read
// at the same optical size (square icon files carry padding, so they get a larger h and the
// marquee trims the extra with negative margins); `label` adds the name beside icon-only marks.
export const partners = [
  { name: 'Yealink', logo: '/partners/yealink.png', h: 22 },
  { name: 'Hikvision', logo: '/partners/hikvision.svg', h: 20 },
  { name: 'Microsoft Teams', logo: '/partners/teams.svg', h: 30, label: true },
  { name: 'Zoom', logo: '/partners/zoom.svg', h: 92 },
  { name: 'Ubiquiti', logo: '/partners/ubiquiti.svg', h: 30, label: true },
  { name: 'Cisco', logo: '/partners/cisco.svg', h: 66 },
  { name: 'Samsung', logo: '/partners/samsung.svg', h: 92 },
  { name: 'Logitech', logo: '/partners/logitech.svg', h: 56 },
];
