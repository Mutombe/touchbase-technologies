// Meeting Room Planner — maps a room size, platform and add-ons to a recommended kit.
// Kit lines are categories, not fixed models; the final spec comes from the site survey.

export const rooms = [
  {
    id: 'huddle',
    name: 'Huddle room',
    seats: '2–6 people',
    image: '/img/yealink-wall-camera.webp',
    days: '1 day',
    points: 2,
    kit: [
      ['Camera & audio', 'All-in-one 4K video bar with mics'],
      ['Display', 'One 55″ commercial display'],
      ['Control', 'Table touch controller'],
    ],
  },
  {
    id: 'meeting',
    name: 'Meeting room',
    seats: '6–12 people',
    image: '/img/boardroom-ceiling-audio.webp',
    days: '1 day',
    points: 3,
    kit: [
      ['Camera & audio', 'AI-framing video bar and table mic'],
      ['Display', 'One 65″ to 75″ display'],
      ['Control', 'Table touch controller'],
    ],
  },
  {
    id: 'boardroom',
    name: 'Boardroom',
    seats: '12–20 people',
    image: '/img/yealink-camera-setup.webp',
    days: '2–3 days',
    points: 4,
    kit: [
      ['Camera', '4K PTZ camera, speaker tracking'],
      ['Microphones', 'Ceiling microphone array'],
      ['Speakers', 'Ceiling speakers with DSP'],
      ['Display', 'One 86″ or two 75″ displays'],
      ['Control', 'Touch controller and room PC'],
    ],
  },
  {
    id: 'training',
    name: 'Training room',
    seats: '20–100+ people',
    image: '/img/event-tent-screens.webp',
    days: '3–5 days',
    points: 6,
    kit: [
      ['Cameras', 'PTZ cameras on presenter and room'],
      ['Microphones', 'Handheld, lapel and ceiling mics'],
      ['Speakers', 'Distributed PA, mixer and DSP'],
      ['Display', 'Projector, LED wall or repeaters'],
      ['Control', 'Lectern panel, source switching'],
    ],
  },
];

export const platforms = [
  { id: 'teams', name: 'Microsoft Teams' },
  { id: 'zoom', name: 'Zoom' },
  { id: 'byod', name: 'Bring your own device' },
];

export const addons = [
  { id: 'wireless', name: 'Wireless presentation', line: ['Sharing', 'Wireless presentation'] },
  { id: 'booking', name: 'Room booking panel', line: ['Booking', 'Door panel linked to calendars'] },
  { id: 'whiteboard', name: 'Digital whiteboard', line: ['Whiteboard', 'Touch display or content camera'] },
  { id: 'recording', name: 'Recording & streaming', line: ['Recording', 'Recording and live-stream encoder'], points: 1 },
  { id: 'dual', name: 'Second display', line: ['Second display', 'Content plus far-end video'] },
  { id: 'network', name: 'New network points', line: ['Network', 'Cat6 points, PoE switch, VLAN'] },
];

export const included = ['Site survey & design', 'Concealed cabling', 'Installation & testing', 'User training', 'Handover documentation'];

export function plan(roomId, platformId, addonIds = []) {
  const room = rooms.find((r) => r.id === roomId) || rooms[0];
  const platform = platforms.find((p) => p.id === platformId) || platforms[0];
  const extras = addons.filter((a) => addonIds.includes(a.id));
  const platformLine =
    platform.id === 'byod'
      ? ['Platform', 'USB hub for any laptop and app']
      : ['Platform', `Certified ${platform.name} Rooms`];
  return {
    room,
    platform,
    kit: [...room.kit, platformLine, ...extras.map((a) => a.line)],
    networkPoints: room.points + extras.reduce((n, a) => n + (a.points || 0), 0) + (addonIds.includes('booking') ? 1 : 0),
  };
}
