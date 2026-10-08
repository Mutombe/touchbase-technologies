// Phrases that become links wherever autoLink() runs over body copy.
// `to` is a page on this site; `href` leaves the site (the visitor confirms first).
// Longer phrases are matched before shorter ones, and each phrase links once per block.
export const crossLinks = {
  // Solutions
  'video conferencing': { to: '/solutions/video-conferencing' },
  'video rooms': { to: '/solutions/video-conferencing' },
  'teams rooms': { to: '/solutions/video-conferencing' },
  'zoom rooms': { to: '/solutions/video-conferencing' },
  'boardroom av': { to: '/solutions/audio-visual' },
  'ceiling speakers': { to: '/solutions/audio-visual' },
  'wireless presentation': { to: '/solutions/audio-visual' },
  'conferences': { to: '/solutions/events' },
  'live streaming': { to: '/solutions/events' },
  'hybrid streaming': { to: '/solutions/events' },
  'cctv': { to: '/solutions/cctv-security' },
  'ip cameras': { to: '/solutions/cctv-security' },
  'ip camera systems': { to: '/solutions/cctv-security' },
  'camera rollout': { to: '/solutions/cctv-security' },
  'structured cabling': { to: '/solutions/networking' },
  'networks': { to: '/solutions/networking' },
  'enterprise wi-fi': { to: '/solutions/networking' },
  'server rooms': { to: '/solutions/networking' },
  'help desk': { to: '/solutions/managed-it' },
  'support plans': { to: '/solutions/managed-it' },
  'preventive maintenance': { to: '/solutions/managed-it' },
  'microsoft 365': { to: '/solutions/cloud-collaboration' },
  'migrations': { to: '/solutions/cloud-collaboration' },

  // Tools and pages
  'meeting room': { to: '/planner' },
  'huddle room': { to: '/planner' },
  'site survey': { to: '/contact?topic=survey' },
  'free site survey': { to: '/contact?topic=survey' },
  'handover training': { to: '/about' },

  // Shop
  'video bars': { to: '/shop?category=video-bars' },
  'video bar': { to: '/shop?category=video-bars' },
  'ptz camera': { to: '/shop?category=cameras' },
  '4k ptz camera': { to: '/shop?category=cameras' },
  'speakerphone': { to: '/shop?category=audio' },
  'commercial display': { to: '/shop?category=displays' },
  'nvrs': { to: '/shop?category=cctv' },
  'access point': { to: '/shop?category=networking' },

  // Leaving the site
  'microsoft teams': { href: 'https://www.microsoft.com/microsoft-teams' },
};
