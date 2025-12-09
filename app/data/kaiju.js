export const kaijuList = [
  {
    id: 1,
    name: 'Godzilla',
    codename: 'Project G-01 "Gojira"',
    threatLevel: 5,
    lastSeen: '2025-12-08 15:22 JST',
    location: 'Tokyo Bay outer waters',
    type: 'Radioactive amphibious',
    tags: ['Heat beam', 'Amphibious', 'High regeneration'],
    notes: 'Awakened by nuclear waste. Often strikes from underwater.',
  },
  {
    id: 2,
    name: 'King Ghidorah',
    codename: 'Project K-03 "Ghidorah"',
    threatLevel: 6,
    lastSeen: '2025-12-08 14:05 JST',
    location: 'Stratosphere, 10,000m',
    type: 'Pterosaur / gravity wave',
    tags: ['Gravity waves', 'Lightning storms', 'Hypersonic'],
    notes: 'Flight path syncs with jet stream; cripples grids.',
  },
  {
    id: 3,
    name: 'Mothra',
    codename: 'Project M-02 "Mothra"',
    threatLevel: 3,
    lastSeen: '2025-12-08 13:40 JST',
    location: 'Boso highlands',
    type: 'Protective giant insect',
    tags: ['Luminous powder', 'Defensive', 'Human-friendly signs'],
    notes: 'Respect shrine perimeter; non-lethal observation only.',
  },
  {
    id: 4,
    name: 'Rodan',
    codename: 'Project R-07 "Rodan"',
    threatLevel: 4,
    lastSeen: '2025-12-08 12:55 JST',
    location: 'Sakurajima airspace',
    type: 'Volcanic pterosaur',
    tags: ['Supersonic shockwave', 'Thermal updraft'],
    notes: 'Shockwaves shatter glass; ground flights.',
  },
  {
    id: 5,
    name: 'Gamera',
    codename: 'Project GA-11 "Guardian"',
    threatLevel: 4,
    lastSeen: '2025-12-08 12:10 JST',
    location: 'Osaka Bay',
    type: 'Colossal chelonian',
    tags: ['Plasma breath', 'Shell spin', 'Aquatic'],
    notes: 'Often defensive toward civilians; monitor ports.',
  },
  {
    id: 6,
    name: 'Megalon',
    codename: 'Project ME-09 "Megalon"',
    threatLevel: 5,
    lastSeen: '2025-12-08 11:45 JST',
    location: 'Ibaraki subterranean',
    type: 'Burrowing kaiju',
    tags: ['Drill arms', 'Burrow', 'Electric blasts'],
    notes: 'Watch for ground collapse; deploy seismic sensors.',
  },
];

export const dashboardOperations = [
  {
    title: 'Tokyo Bay evacuation lanes reinforced',
    time: '15:25',
    level: 'CRITICAL',
    tags: ['Evac', 'Shields'],
    description: 'Bollards and mobile shields set along L3 corridor.',
  },
  {
    title: 'Grid surge mitigation for Ghidorah',
    time: '15:05',
    level: 'HIGH',
    tags: ['Power', 'Storm'],
    description: 'Rerouting substations; transformer swaps in progress.',
  },
  {
    title: 'Rodan airspace lockdown',
    time: '14:55',
    level: 'ELEVATED',
    tags: ['Airspace', 'Shockwave'],
    description: 'Grounded domestic flights; redirecting high-altitude traffic.',
  },
  {
    title: 'Harbor nets deployed for Gamera',
    time: '14:20',
    level: 'INFO',
    tags: ['Harbor', 'Observation'],
    description: 'Non-lethal nets and sonar trackers placed in bay.',
  },
];

export const countermeasureBriefings = [
  {
    id: 1,
    name: 'Godzilla',
    threatLevel: 5,
    type: 'Radioactive amphibious',
    location: 'Tokyo Bay outer waters',
    capabilities: ['Heat beam', 'Amphibious', 'High regeneration'],
    advice: [
      'Keep L3/L4 evacuation corridors clear',
      'Prioritize port infrastructure shielding',
      'Coordinate naval sonar sweeps for submerged approach',
    ],
  },
  {
    id: 2,
    name: 'King Ghidorah',
    threatLevel: 6,
    type: 'Pterosaur / gravity wave',
    location: 'Stratosphere 10,000m',
    capabilities: ['Gravity wave fields', 'Atmospheric lightning', 'Hypersonic flight'],
    advice: [
      'Suspend high-altitude flights; reroute air traffic',
      'Pre-stage mobile transformers; expect grid surge',
      'Track jet stream alignment for intercept planning',
    ],
  },
  {
    id: 3,
    name: 'Mothra',
    threatLevel: 3,
    type: 'Giant insect (protective)',
    location: 'Boso Peninsula highlands',
    capabilities: ['Luminous powder', 'Defensive behavior', 'Human-friendly intent signs'],
    advice: [
      'Keep civilian presence minimal to avoid defensive gusts',
      'Deploy non-lethal observation drones',
      'Respect shrine perimeter; consider protective classification',
    ],
  },
];

export const countermeasureOperations = [
  {
    title: 'Re-checking Tokyo Bay L3 evacuation routes',
    time: '15:25',
    region: 'kanto',
    level: 'CRITICAL',
    tags: ['Evac routes', 'Infrastructure'],
    description:
      'Reinstalling barricades along the L3 line as Godzilla advances. Bridge damage near Shin-Kiba confirmed; heavy machinery on standby.',
  },
  {
    title: 'Power system inspection in underground facility',
    time: '15:10',
    region: 'underground',
    level: 'INFO',
    tags: ['Power', 'Maintenance'],
    description:
      'Inspecting backup power at -40m. Reinforcing surge protection against storm activity and delivering spare transformer parts.',
  },
  {
    title: 'Abnormal EM waves detected offshore Pacific',
    time: '14:55',
    region: 'pacific',
    level: 'HIGH',
    tags: ['Route change', 'Ship evacuation'],
    description:
      'High-output electromagnetic bursts tied to Ghidorah flight. Rerouting lanes south and issuing emergency notices to cargo vessels.',
  },
  {
    title: 'Kanto-wide emergency broadcast drill',
    time: '14:30',
    region: 'kanto',
    level: 'MEDIUM',
    tags: ['Drill', 'Public alert'],
    description:
      'Disaster radio test across the metro area. 15% of zones reported latency; scheduling a repeat test.',
  },
];

export const synopsisSlides = [
  { src: '/synopsis/picture/img1.png', line: 'Unidentified lifeforms have simultaneously appeared across the globe.' },
  { src: '/synopsis/picture/img2.png', line: 'From aerial predators to terrestrial behemoths, they are tearing our world apart.' },
  { src: '/synopsis/picture/img3.png', line: 'Communications are down. Without centralized data, humanity is losing the war.' },
  { src: '/synopsis/picture/img4.png', line: 'Our only hope lies in a digital nexus capable of real-time tracking and global command.' },
  { src: '/synopsis/picture/img5.png', line: 'The Government has formed the "Super Beast Countermeasure Agency" and activated the "Lolo" defense grid.' },
  { src: '/synopsis/picture/img6.png', line: 'Control has been transferred to you. Log in, repel the monsters, and save our civilization.' },
];

export const synopsisAudio = '/synopsis/bgm/yashimasakusen.MP3';
