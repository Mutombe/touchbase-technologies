// Shop catalogue — DEMO data. Prices (USD), stock and specs are placeholders to be
// replaced with Touchbase's real price list. Add `image: '/products/<file>'` to any
// product to show a photo instead of the icon tile.
export const categories = [
  { id: 'video-bars', name: 'Video Bars & Room Kits', short: 'Video bars', icon: 'VideoConference', blurb: 'All-in-one cameras, mics and speakers for meeting rooms' },
  { id: 'cameras', name: 'Conference Cameras', short: 'Cameras', icon: 'VideoCamera', blurb: 'PTZ and USB cameras for boardrooms and desks' },
  { id: 'audio', name: 'Audio & Headsets', short: 'Audio', icon: 'Headset', blurb: 'Speakerphones, microphones and headsets' },
  { id: 'displays', name: 'Displays & Presentation', short: 'Displays', icon: 'Monitor', blurb: 'Commercial displays, mounts and wireless sharing' },
  { id: 'cctv', name: 'CCTV & Recorders', short: 'CCTV', icon: 'SecurityCamera', blurb: 'IP cameras, NVRs and storage' },
  { id: 'networking', name: 'Networking', short: 'Networking', icon: 'WifiHigh', blurb: 'Wi-Fi access points, PoE switches and cabling' },
];

const P = (o) => ({ stock: 12, compareAt: null, warrantyYears: 2, ...o });

export const products = [
  // ── Video bars & room kits ───────────────────────────────────
  P({
    id: 'yealink-meetingbar-a20', name: 'Yealink MeetingBar A20', brand: 'Yealink', category: 'video-bars',
    price: 1690, compareAt: 1850, featured: true, badge: 'Best seller',
    summary: 'All-in-one Android video bar for huddle rooms: 4K camera, beamforming mics and speakers in one tidy unit. Runs Teams or Zoom natively.',
    specs: { 'Room size': 'Huddle, 2–6 people', Camera: '4K, 120° field of view', 'Auto-framing': 'Yes', Microphones: '8-mic beamforming array', Platforms: 'Microsoft Teams, Zoom', Mounting: 'Wall or display mount', Warranty: '2 years' },
  }),
  P({
    id: 'yealink-meetingbar-a30', name: 'Yealink MeetingBar A30', brand: 'Yealink', category: 'video-bars',
    price: 2390, featured: true,
    summary: 'Video bar for medium meeting rooms with a dual-camera system for sharp close-ups and AI speaker framing.',
    specs: { 'Room size': 'Medium, 6–12 people', Camera: 'Dual 4K cameras', 'Auto-framing': 'Speaker & group framing', Microphones: '8-mic beamforming array', Platforms: 'Microsoft Teams, Zoom', Mounting: 'Wall or display mount', Warranty: '2 years' },
  }),
  P({
    id: 'logitech-rally-bar', name: 'Logitech Rally Bar', brand: 'Logitech', category: 'video-bars',
    price: 3650, stock: 4,
    summary: 'Premium video bar for mid-size rooms with optical zoom, motorised pan and tilt, and room-filling audio.',
    specs: { 'Room size': 'Medium, up to 12 people', Camera: '4K with 5× optical zoom', 'Auto-framing': 'RightSight', Microphones: '6-element beamforming', Platforms: 'Teams, Zoom, BYOD', Mounting: 'Table, wall or display', Warranty: '2 years' },
  }),

  // ── Cameras ──────────────────────────────────────────────────
  P({
    id: 'yealink-uvc86', name: 'Yealink UVC86 4K PTZ Camera', brand: 'Yealink', category: 'cameras',
    price: 1450, featured: true, badge: 'Boardrooms',
    summary: 'Dual-eye 4K PTZ camera with 12× hybrid zoom and auto speaker tracking, built for boardrooms and training rooms.',
    specs: { Resolution: '4K', Zoom: '12× hybrid', 'Auto-tracking': 'Speaker & group', Connection: 'USB 3.0 / HDMI', 'Room size': 'Large, 12–20 people', Warranty: '2 years' },
  }),
  P({
    id: 'yealink-uvc40', name: 'Yealink UVC40 USB Video Bar', brand: 'Yealink', category: 'cameras',
    price: 690,
    summary: 'Plug-and-play USB camera with built-in mics and speaker for small rooms run from a laptop or room PC.',
    specs: { Resolution: '4K', 'Field of view': '120°', 'Auto-framing': 'Yes', Connection: 'USB', 'Room size': 'Small, 2–6 people', Warranty: '2 years' },
  }),
  P({
    id: 'logitech-c925e', name: 'Logitech C925e Webcam', brand: 'Logitech', category: 'cameras',
    price: 95, stock: 40,
    summary: 'Reliable 1080p business webcam with privacy shutter for desks and home offices.',
    specs: { Resolution: '1080p / 30fps', 'Field of view': '78°', Microphones: 'Stereo', Connection: 'USB-A', 'Privacy shutter': 'Yes', Warranty: '2 years' },
  }),

  // ── Audio & headsets ─────────────────────────────────────────
  P({
    id: 'yealink-cp900', name: 'Yealink CP900 Speakerphone', brand: 'Yealink', category: 'audio',
    price: 220, featured: true,
    summary: 'Portable USB and Bluetooth speakerphone with 360° voice pickup. Turns any table into a conference call.',
    specs: { Pickup: '360°, up to 3 m', Connection: 'USB, Bluetooth', Battery: 'Up to 14 hours', Certified: 'Microsoft Teams', Warranty: '2 years' },
  }),
  P({
    id: 'yealink-vcm38', name: 'Yealink VCM38 Ceiling Microphone', brand: 'Yealink', category: 'audio',
    price: 890, stock: 6,
    summary: 'Ceiling microphone array that keeps tables clear and picks up every seat in larger rooms.',
    specs: { Pickup: 'Up to 6 m radius', Elements: '8-mic array', Connection: 'PoE', Mounting: 'Ceiling or suspended', Warranty: '2 years' },
  }),
  P({
    id: 'yealink-bh72', name: 'Yealink BH72 Bluetooth Headset', brand: 'Yealink', category: 'audio',
    price: 175, stock: 25,
    summary: 'Wireless noise-cancelling headset for calls in open-plan offices, with a busy light and charging stand.',
    specs: { Connection: 'Bluetooth, USB dongle', 'Noise cancelling': 'Mic & ear', Battery: 'Up to 35 hours talk time', Certified: 'Microsoft Teams', Warranty: '2 years' },
  }),

  // ── Displays & presentation ──────────────────────────────────
  P({
    id: 'samsung-qm65', name: 'Samsung 65″ 4K Commercial Display', brand: 'Samsung', category: 'displays',
    price: 1290, compareAt: 1390, featured: true,
    summary: 'Commercial-grade 4K display rated for long daily use, for meeting rooms and digital signage.',
    specs: { Size: '65″', Resolution: '4K UHD', 'Duty cycle': '16/7', Brightness: '500 nits', Inputs: 'HDMI × 3, USB', Warranty: '3 years' },
    warrantyYears: 3,
  }),
  P({
    id: 'samsung-qm85', name: 'Samsung 85″ 4K Commercial Display', brand: 'Samsung', category: 'displays',
    price: 2690, stock: 3,
    summary: 'Large-format 4K display for boardrooms and training rooms where the back row needs to read the slides.',
    specs: { Size: '85″', Resolution: '4K UHD', 'Duty cycle': '16/7', Brightness: '500 nits', Inputs: 'HDMI × 3, USB', Warranty: '3 years' },
    warrantyYears: 3,
  }),
  P({
    id: 'yealink-wpp30', name: 'Yealink WPP30 Wireless Presentation Pod', brand: 'Yealink', category: 'displays',
    price: 320,
    summary: 'Plug the pod into a laptop and press once to share to the room display. No cables, no drivers.',
    specs: { Connection: 'USB-C / USB-A', Resolution: 'Up to 4K', 'Works with': 'Yealink MeetingBars', Warranty: '2 years' },
  }),

  // ── CCTV ─────────────────────────────────────────────────────
  P({
    id: 'hikvision-dome-4mp', name: 'Hikvision 4MP AcuSense Dome Camera', brand: 'Hikvision', category: 'cctv',
    price: 115, stock: 60, featured: true,
    summary: 'Indoor/outdoor IP dome with smart human and vehicle detection to cut false alarms.',
    specs: { Resolution: '4MP', 'Night vision': 'IR up to 30 m', Detection: 'Human & vehicle', Power: 'PoE', Rating: 'IP67', Warranty: '2 years' },
  }),
  P({
    id: 'hikvision-colorvu-bullet', name: 'Hikvision 4MP ColorVu Bullet Camera', brand: 'Hikvision', category: 'cctv',
    price: 135, stock: 45,
    summary: 'Full-colour images at night for perimeters, yards and car parks, with built-in supplemental light.',
    specs: { Resolution: '4MP', 'Night image': 'Full colour', Detection: 'Human & vehicle', Power: 'PoE', Rating: 'IP67', Warranty: '2 years' },
  }),
  P({
    id: 'hikvision-nvr-8', name: 'Hikvision 8-Channel PoE NVR', brand: 'Hikvision', category: 'cctv',
    price: 285,
    summary: 'Records up to eight IP cameras with built-in PoE, so each camera needs just one cable.',
    specs: { Channels: '8', PoE: '8 ports', 'Max resolution': '8MP', 'Drive bays': '1 (up to 10 TB)', 'Remote view': 'Hik-Connect app', Warranty: '2 years' },
  }),
  P({
    id: 'surveillance-hdd-4tb', name: '4TB Surveillance Hard Drive', brand: 'Seagate', category: 'cctv',
    price: 125, stock: 30,
    summary: 'Hard drive built for 24/7 recording, the right storage for your NVR.',
    specs: { Capacity: '4 TB', Workload: '24/7 surveillance', Interface: 'SATA', Warranty: '3 years' },
    warrantyYears: 3,
  }),

  // ── Networking ───────────────────────────────────────────────
  P({
    id: 'ubiquiti-u6-pro', name: 'Ubiquiti UniFi U6 Pro Access Point', brand: 'Ubiquiti', category: 'networking',
    price: 210, stock: 20, featured: true,
    summary: 'Wi-Fi 6 ceiling access point for offices: fast, stable coverage managed from one dashboard.',
    specs: { Standard: 'Wi-Fi 6', Clients: '300+', Power: 'PoE+', Mounting: 'Ceiling or wall', Management: 'UniFi', Warranty: '1 year' },
    warrantyYears: 1,
  }),
  P({
    id: 'ubiquiti-switch-16-poe', name: 'Ubiquiti UniFi 16-Port PoE Switch', brand: 'Ubiquiti', category: 'networking',
    price: 360,
    summary: 'Managed gigabit switch that powers access points, cameras and phones over the network cable.',
    specs: { Ports: '16 × Gigabit', PoE: '8 × PoE+', Uplinks: '2 × SFP', Management: 'UniFi', Mounting: 'Desktop or rack', Warranty: '1 year' },
    warrantyYears: 1,
  }),
  P({
    id: 'cat6-box-305', name: 'Cat6 UTP Cable, 305 m Box', brand: 'Touchbase', category: 'networking',
    price: 145, stock: 50,
    summary: 'Solid-copper Cat6 cable for structured cabling, cameras and access points.',
    specs: { Category: 'Cat6 UTP', Length: '305 m', Conductor: 'Solid copper, 23 AWG', Jacket: 'PVC', Warranty: '1 year' },
    warrantyYears: 1,
  }),
];

export const brands = [...new Set(products.map((p) => p.brand))];

export const productById = Object.fromEntries(products.map((p) => [p.id, p]));

// "Frequently bought together" sets, by the product being viewed
const BUNDLES = {
  'yealink-meetingbar-a20': [['samsung-qm65', 1], ['yealink-wpp30', 1]],
  'yealink-meetingbar-a30': [['samsung-qm65', 1], ['yealink-wpp30', 1]],
  'logitech-rally-bar': [['samsung-qm85', 1]],
  'yealink-uvc86': [['yealink-vcm38', 1], ['samsung-qm85', 1]],
  'hikvision-dome-4mp': [['hikvision-nvr-8', 1], ['surveillance-hdd-4tb', 1]],
  'hikvision-colorvu-bullet': [['hikvision-nvr-8', 1], ['surveillance-hdd-4tb', 1]],
  'hikvision-nvr-8': [['hikvision-dome-4mp', 4], ['surveillance-hdd-4tb', 1]],
  'ubiquiti-u6-pro': [['ubiquiti-switch-16-poe', 1], ['cat6-box-305', 1]],
};

export function bundleFor(product) {
  const set = BUNDLES[product.id];
  if (!set) return null;
  return [{ product, qty: 1 }, ...set.map(([id, qty]) => ({ product: productById[id], qty }))];
}

export const locations = [
  { name: 'Harare', km: 10 },
  { name: 'Chitungwiza', km: 30 },
  { name: 'Norton', km: 40 },
  { name: 'Marondera', km: 75 },
  { name: 'Bindura', km: 88 },
  { name: 'Chinhoyi', km: 116 },
  { name: 'Kadoma', km: 141 },
  { name: 'Kwekwe', km: 213 },
  { name: 'Mutare', km: 263 },
  { name: 'Gweru', km: 275 },
  { name: 'Masvingo', km: 292 },
  { name: 'Bulawayo', km: 439 },
  { name: 'Victoria Falls', km: 878 },
];
