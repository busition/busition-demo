export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export type WeekDay = (typeof weekDays)[number];

export type RouteStatus = "Needs driver" | "Ready" | "Live now" | "Delayed";
export type DriverStatus = "Available" | "On trip" | "Break" | "Review";
export type OrganizationStatus = "Pilot live" | "Ready to onboard" | "Expansion";

export type MapSegment = {
  left: string;
  top: string;
  width: string;
  rotate: string;
};

export type MapMarker = {
  label: string;
  left: string;
  top: string;
  time?: string;
  hub?: boolean;
};

export type RouteAssignment = {
  id: string;
  name: string;
  organization: string;
  departure: string;
  arrival: string;
  departureTime: string;
  serviceWindow: string;
  seats: string;
  load: string;
  vehicle: string;
  zone: string;
  status: RouteStatus;
  punctuality: string;
  health: string;
  notes: string;
  assignedDriverId: string | null;
};

export type DriverRecord = {
  id: string;
  name: string;
  status: DriverStatus;
  zone: string;
  assignedRoute: string;
  vehicle: string;
  phone: string;
  rating: string;
  checkIn: string;
  hoursLeft: string;
  certifications: string[];
  note: string;
};

export type ScheduleStop = {
  name: string;
  time: string;
  left: string;
  top: string;
};

export type ScheduleBlock = {
  id: string;
  name: string;
  window: string;
  capacity: string;
  note: string;
  stops: ScheduleStop[];
};

export type ScheduleRoute = {
  id: string;
  name: string;
  organization: string;
  departure: string;
  arrival: string;
  detail: string;
  status: RouteStatus;
  mapLabel: string;
  segments: MapSegment[];
  markers: MapMarker[];
  days: Record<WeekDay, ScheduleBlock[]>;
};

export type OrganizationRecord = {
  id: string;
  name: string;
  type: string;
  status: OrganizationStatus;
  code: string;
  campuses: number;
  routes: number;
  riders: string;
  coordinator: string;
  coordinatorEmail: string;
  serviceLevel: string;
  notes: string;
  services: string[];
  locations: string[];
};

export const consoleMetrics = [
  {
    label: "Live routes",
    value: "18",
    detail: "5 now boarding · 2 delayed",
  },
  {
    label: "Boarding certainty",
    value: "98.2%",
    detail: "Across academy and campus pilots",
  },
  {
    label: "Driver readiness",
    value: "24 / 26",
    detail: "Two still in document review",
  },
  {
    label: "Organizations online",
    value: "6",
    detail: "3 live now · 3 preparing launch",
  },
];

export const routeAssignments: RouteAssignment[] = [
  {
    id: "hongik-gangnam-1",
    name: "Hongik Univ -> Gangnam 1",
    organization: "Sunrise Academy",
    departure: "Hongik University Main Gate",
    arrival: "Gangnam Station Exit 12",
    departureTime: "07:20",
    serviceWindow: "Morning commute",
    seats: "24 seats",
    load: "21 / 24 riders",
    vehicle: "Solati 12-seater",
    zone: "Seoul West",
    status: "Needs driver",
    punctuality: "94%",
    health: "Tight turnover",
    notes: "Vehicle is ready, but the assigned driver called in sick.",
    assignedDriverId: null,
  },
  {
    id: "kookmin-bulgwang-1",
    name: "Kookmin Univ -> Bulgwang 1",
    organization: "Kookmin Shuttle Pilot",
    departure: "Kookmin University Main Gate",
    arrival: "Bulgwang Station Exit 1",
    departureTime: "07:35",
    serviceWindow: "Student commute",
    seats: "28 seats",
    load: "19 / 28 riders",
    vehicle: "County EV",
    zone: "North Seoul",
    status: "Needs driver",
    punctuality: "97%",
    health: "Coverage gap",
    notes: "The recurring schedule is intact, but this route needs a new assigned driver after the roster update.",
    assignedDriverId: null,
  },
  {
    id: "kookmin-bulgwang-2",
    name: "Kookmin Univ -> Bulgwang 2",
    organization: "Kookmin Shuttle Pilot",
    departure: "Kookmin University Dormitory",
    arrival: "Bulgwang Station Exit 1",
    departureTime: "08:00",
    serviceWindow: "Overflow route",
    seats: "20 seats",
    load: "12 / 20 riders",
    vehicle: "Solati 9-seater",
    zone: "North Seoul",
    status: "Needs driver",
    punctuality: "96%",
    health: "Ready once assigned",
    notes: "Demand is lower today, so this route can share standby coverage.",
    assignedDriverId: null,
  },
  {
    id: "pangyo-gangnam-1",
    name: "Pangyo -> Gangnam 1",
    organization: "Nexen Commute",
    departure: "Pangyo Tech Hub",
    arrival: "Gangnam Finance Center",
    departureTime: "07:10",
    serviceWindow: "Enterprise rush",
    seats: "32 seats",
    load: "27 / 32 riders",
    vehicle: "Universe Prime",
    zone: "Pangyo",
    status: "Live now",
    punctuality: "99%",
    health: "Live trip",
    notes: "Vehicle left on time and has no open exceptions.",
    assignedDriverId: "jeongheon-woo",
  },
  {
    id: "pangyo-gangnam-2",
    name: "Pangyo -> Gangnam 2",
    organization: "Nexen Commute",
    departure: "Pangyo South Gate",
    arrival: "Gangnam Finance Center",
    departureTime: "07:45",
    serviceWindow: "Enterprise rush",
    seats: "28 seats",
    load: "28 / 28 riders",
    vehicle: "Green City EV",
    zone: "Pangyo",
    status: "Delayed",
    punctuality: "88%",
    health: "Swap vehicle",
    notes: "The first bus reported a charging issue. Dispatch needs to confirm the swap.",
    assignedDriverId: "kyungmin-yoo",
  },
  {
    id: "gangnam-snu-1",
    name: "Gangnam -> Seoul National Univ",
    organization: "Campus Connect",
    departure: "Gangnam Station Exit 11",
    arrival: "Seoul National University Gate 2",
    departureTime: "08:20",
    serviceWindow: "Campus loop",
    seats: "26 seats",
    load: "18 / 26 riders",
    vehicle: "Ioniq Shuttle",
    zone: "South Seoul",
    status: "Ready",
    punctuality: "95%",
    health: "Boarding team ready",
    notes: "Guardian alerts are enabled for all freshman riders.",
    assignedDriverId: "junhyuk-kim",
  },
];

export const driverRoster: DriverRecord[] = [
  {
    id: "jeongheon-woo",
    name: "Jeongheon Woo",
    status: "On trip",
    zone: "Pangyo",
    assignedRoute: "Pangyo -> Gangnam 1",
    vehicle: "Universe Prime",
    phone: "+82 10-1234-0001",
    rating: "4.8 / 5",
    checkIn: "06:41",
    hoursLeft: "7h 02m",
    certifications: ["Express route", "Executive shuttle"],
    note: "Already on the road. Strong punctuality score on rush-hour corridors.",
  },
  {
    id: "kyungmin-yoo",
    name: "Kyungmin Yoo",
    status: "Review",
    zone: "Pangyo",
    assignedRoute: "Pangyo -> Gangnam 2",
    vehicle: "Green City EV",
    phone: "+82 10-1234-0002",
    rating: "4.6 / 5",
    checkIn: "06:48",
    hoursLeft: "5h 34m",
    certifications: ["Executive shuttle", "Route recovery"],
    note: "Needs updated vehicle handoff confirmation before the second departure.",
  },
  {
    id: "junhyuk-kim",
    name: "Junhyuk Kim",
    status: "Available",
    zone: "South Seoul",
    assignedRoute: "Gangnam -> Seoul National Univ",
    vehicle: "Ioniq Shuttle",
    phone: "+82 10-1234-0003",
    rating: "4.9 / 5",
    checkIn: "07:02",
    hoursLeft: "6h 45m",
    certifications: ["Campus loop", "Guardian support"],
    note: "Often paired with guardian-heavy routes because of high boarding accuracy.",
  },
  {
    id: "seungmin-lee",
    name: "Seungmin Lee",
    status: "Break",
    zone: "Seoul West",
    assignedRoute: "Standby coverage",
    vehicle: "Solati 12-seater",
    phone: "+82 10-1234-0004",
    rating: "4.7 / 5",
    checkIn: "06:26",
    hoursLeft: "4h 58m",
    certifications: ["Standby swap", "City route"],
    note: "Available in 20 minutes after post-trip debrief and fueling.",
  },
];

export const dashboardAlerts = [
  {
    id: "alert-1",
    severity: "High",
    title: "Hongik Univ -> Gangnam 1 needs a replacement driver",
    detail: "A driver reassignment is required before 07:20 to avoid a manual call cascade.",
    time: "5 min ago",
  },
  {
    id: "alert-2",
    severity: "Medium",
    title: "Pangyo -> Gangnam 2 reported a charging issue",
    detail: "Dispatch should confirm the vehicle swap and update riders before 07:30.",
    time: "12 min ago",
  },
  {
    id: "alert-3",
    severity: "Low",
    title: "Campus Connect added 8 new guardians to notification groups",
    detail: "No action needed. Boarding confirmation rules are already enabled.",
    time: "24 min ago",
  },
];

export const scheduleRoutes: ScheduleRoute[] = [
  {
    id: "kookmin-bulgwang",
    name: "Kookmin Univ -> Bulgwang",
    organization: "Kookmin Shuttle Pilot",
    departure: "Kookmin University Main Gate",
    arrival: "Bulgwang Station Exit 1",
    detail: "Recurring morning student shuttle with two departure waves.",
    status: "Ready",
    mapLabel: "North Seoul service area",
    segments: [
      { left: "16%", top: "61%", width: "22%", rotate: "-20deg" },
      { left: "35%", top: "55%", width: "24%", rotate: "10deg" },
      { left: "54%", top: "48%", width: "21%", rotate: "34deg" },
    ],
    markers: [
      { label: "Kookmin Univ", left: "15%", top: "62%", time: "07:35", hub: true },
      { label: "Jeongneung Cross", left: "38%", top: "57%", time: "07:42" },
      { label: "Bulgwang Station", left: "74%", top: "46%", time: "07:58", hub: true },
    ],
    days: {
      Mon: [
        {
          id: "kmu-mon-1",
          name: "1st schedule",
          window: "07:35 departure",
          capacity: "28 riders",
          note: "Student arrival buffer kept at 7 minutes for first period.",
          stops: [
            { name: "Kookmin University Main Gate", time: "07:35", left: "15%", top: "62%" },
            { name: "Jeongneung Cross", time: "07:42", left: "38%", top: "57%" },
            { name: "Bulgwang Station Exit 1", time: "07:58", left: "74%", top: "46%" },
          ],
        },
        {
          id: "kmu-mon-2",
          name: "2nd schedule",
          window: "08:10 departure",
          capacity: "20 riders",
          note: "Used as overflow when the 1st schedule exceeds 24 seats.",
          stops: [
            { name: "Kookmin University Dormitory", time: "08:10", left: "18%", top: "66%" },
            { name: "Jeongneung Market", time: "08:18", left: "44%", top: "60%" },
            { name: "Bulgwang Station Exit 1", time: "08:31", left: "74%", top: "46%" },
          ],
        },
      ],
      Tue: [
        {
          id: "kmu-tue-1",
          name: "1st schedule",
          window: "07:35 departure",
          capacity: "28 riders",
          note: "Same as Monday with boarding alerts enabled for all registered students.",
          stops: [
            { name: "Kookmin University Main Gate", time: "07:35", left: "15%", top: "62%" },
            { name: "Jeongneung Cross", time: "07:42", left: "38%", top: "57%" },
            { name: "Bulgwang Station Exit 1", time: "07:58", left: "74%", top: "46%" },
          ],
        },
      ],
      Wed: [
        {
          id: "kmu-wed-1",
          name: "1st schedule",
          window: "07:35 departure",
          capacity: "28 riders",
          note: "Wednesday adds a stop check because of construction near the station.",
          stops: [
            { name: "Kookmin University Main Gate", time: "07:35", left: "15%", top: "62%" },
            { name: "Jeongneung Cross", time: "07:42", left: "38%", top: "57%" },
            { name: "Bulgwang Station Exit 1", time: "07:58", left: "74%", top: "46%" },
          ],
        },
        {
          id: "kmu-wed-2",
          name: "2nd schedule",
          window: "08:10 departure",
          capacity: "20 riders",
          note: "Overflow route stays available for late registration riders.",
          stops: [
            { name: "Kookmin University Dormitory", time: "08:10", left: "18%", top: "66%" },
            { name: "Jeongneung Market", time: "08:18", left: "44%", top: "60%" },
            { name: "Bulgwang Station Exit 1", time: "08:31", left: "74%", top: "46%" },
          ],
        },
      ],
      Thu: [
        {
          id: "kmu-thu-1",
          name: "1st schedule",
          window: "07:35 departure",
          capacity: "28 riders",
          note: "Operations team monitors morning delay risk because of a lane restriction.",
          stops: [
            { name: "Kookmin University Main Gate", time: "07:35", left: "15%", top: "62%" },
            { name: "Jeongneung Cross", time: "07:42", left: "38%", top: "57%" },
            { name: "Bulgwang Station Exit 1", time: "07:58", left: "74%", top: "46%" },
          ],
        },
      ],
      Fri: [
        {
          id: "kmu-fri-1",
          name: "Friday schedule",
          window: "07:25 departure",
          capacity: "28 riders",
          note: "Friday departure is 10 minutes earlier to absorb heavier traffic near campus exits.",
          stops: [
            { name: "Kookmin University Main Gate", time: "07:25", left: "15%", top: "62%" },
            { name: "Jeongneung Cross", time: "07:33", left: "38%", top: "57%" },
            { name: "Bulgwang Station Exit 1", time: "07:49", left: "74%", top: "46%" },
          ],
        },
      ],
      Sat: [],
      Sun: [],
    },
  },
  {
    id: "pangyo-gangnam",
    name: "Pangyo -> Gangnam",
    organization: "Nexen Commute",
    departure: "Pangyo Tech Hub",
    arrival: "Gangnam Finance Center",
    detail: "Enterprise express route with higher seat turnover and stricter punctuality targets.",
    status: "Delayed",
    mapLabel: "South commute corridor",
    segments: [
      { left: "12%", top: "71%", width: "24%", rotate: "-26deg" },
      { left: "32%", top: "61%", width: "26%", rotate: "8deg" },
      { left: "55%", top: "46%", width: "24%", rotate: "38deg" },
    ],
    markers: [
      { label: "Pangyo Tech Hub", left: "12%", top: "73%", time: "07:10", hub: true },
      { label: "Yangjae Junction", left: "40%", top: "63%", time: "07:24" },
      { label: "Gangnam Finance Center", left: "78%", top: "45%", time: "07:39", hub: true },
    ],
    days: {
      Mon: [
        {
          id: "pangyo-mon-1",
          name: "Express 1",
          window: "07:10 departure",
          capacity: "32 riders",
          note: "Vehicle swap policy is attached to this route when battery risk appears.",
          stops: [
            { name: "Pangyo Tech Hub", time: "07:10", left: "12%", top: "73%" },
            { name: "Yangjae Junction", time: "07:24", left: "40%", top: "63%" },
            { name: "Gangnam Finance Center", time: "07:39", left: "78%", top: "45%" },
          ],
        },
        {
          id: "pangyo-mon-2",
          name: "Express 2",
          window: "07:45 departure",
          capacity: "28 riders",
          note: "The second departure leaves room for late-shift employees.",
          stops: [
            { name: "Pangyo South Gate", time: "07:45", left: "18%", top: "77%" },
            { name: "Yangjae Junction", time: "07:58", left: "40%", top: "63%" },
            { name: "Gangnam Finance Center", time: "08:14", left: "78%", top: "45%" },
          ],
        },
      ],
      Tue: [
        {
          id: "pangyo-tue-1",
          name: "Express 1",
          window: "07:10 departure",
          capacity: "32 riders",
          note: "Tuesday usually runs with the standard express plan.",
          stops: [
            { name: "Pangyo Tech Hub", time: "07:10", left: "12%", top: "73%" },
            { name: "Yangjae Junction", time: "07:24", left: "40%", top: "63%" },
            { name: "Gangnam Finance Center", time: "07:39", left: "78%", top: "45%" },
          ],
        },
      ],
      Wed: [
        {
          id: "pangyo-wed-1",
          name: "Express 1",
          window: "07:10 departure",
          capacity: "32 riders",
          note: "Wednesday uses the faster corridor when westbound traffic stays below threshold.",
          stops: [
            { name: "Pangyo Tech Hub", time: "07:10", left: "12%", top: "73%" },
            { name: "Yangjae Junction", time: "07:24", left: "40%", top: "63%" },
            { name: "Gangnam Finance Center", time: "07:39", left: "78%", top: "45%" },
          ],
        },
      ],
      Thu: [
        {
          id: "pangyo-thu-1",
          name: "Express 1",
          window: "07:10 departure",
          capacity: "32 riders",
          note: "Thursday mirrors the standard pattern with one standby vehicle nearby.",
          stops: [
            { name: "Pangyo Tech Hub", time: "07:10", left: "12%", top: "73%" },
            { name: "Yangjae Junction", time: "07:24", left: "40%", top: "63%" },
            { name: "Gangnam Finance Center", time: "07:39", left: "78%", top: "45%" },
          ],
        },
      ],
      Fri: [
        {
          id: "pangyo-fri-1",
          name: "Express 1",
          window: "07:00 departure",
          capacity: "32 riders",
          note: "Friday leaves earlier to avoid a recurring bottleneck at the finance center entrance.",
          stops: [
            { name: "Pangyo Tech Hub", time: "07:00", left: "12%", top: "73%" },
            { name: "Yangjae Junction", time: "07:16", left: "40%", top: "63%" },
            { name: "Gangnam Finance Center", time: "07:31", left: "78%", top: "45%" },
          ],
        },
      ],
      Sat: [],
      Sun: [],
    },
  },
  {
    id: "gangnam-snu",
    name: "Gangnam -> Seoul National Univ",
    organization: "Campus Connect",
    departure: "Gangnam Station Exit 11",
    arrival: "Seoul National University Gate 2",
    detail: "Guardian-sensitive campus connector with stop-by-stop alerts.",
    status: "Ready",
    mapLabel: "South Seoul campus corridor",
    segments: [
      { left: "18%", top: "35%", width: "20%", rotate: "14deg" },
      { left: "34%", top: "44%", width: "22%", rotate: "28deg" },
      { left: "51%", top: "58%", width: "26%", rotate: "18deg" },
    ],
    markers: [
      { label: "Gangnam Station", left: "18%", top: "34%", time: "08:20", hub: true },
      { label: "Nambu Bus Terminal", left: "43%", top: "50%", time: "08:35" },
      { label: "SNU Gate 2", left: "79%", top: "61%", time: "08:49", hub: true },
    ],
    days: {
      Mon: [
        {
          id: "snu-mon-1",
          name: "Campus connector",
          window: "08:20 departure",
          capacity: "26 riders",
          note: "Guardian alerts are required at both the departure and arrival hubs.",
          stops: [
            { name: "Gangnam Station Exit 11", time: "08:20", left: "18%", top: "34%" },
            { name: "Nambu Bus Terminal", time: "08:35", left: "43%", top: "50%" },
            { name: "Seoul National Univ Gate 2", time: "08:49", left: "79%", top: "61%" },
          ],
        },
      ],
      Tue: [
        {
          id: "snu-tue-1",
          name: "Campus connector",
          window: "08:20 departure",
          capacity: "26 riders",
          note: "Tuesday mirrors the standard campus connector flow.",
          stops: [
            { name: "Gangnam Station Exit 11", time: "08:20", left: "18%", top: "34%" },
            { name: "Nambu Bus Terminal", time: "08:35", left: "43%", top: "50%" },
            { name: "Seoul National Univ Gate 2", time: "08:49", left: "79%", top: "61%" },
          ],
        },
      ],
      Wed: [
        {
          id: "snu-wed-1",
          name: "Campus connector",
          window: "08:20 departure",
          capacity: "26 riders",
          note: "Midweek departure carries a larger first-year guardian load.",
          stops: [
            { name: "Gangnam Station Exit 11", time: "08:20", left: "18%", top: "34%" },
            { name: "Nambu Bus Terminal", time: "08:35", left: "43%", top: "50%" },
            { name: "Seoul National Univ Gate 2", time: "08:49", left: "79%", top: "61%" },
          ],
        },
      ],
      Thu: [
        {
          id: "snu-thu-1",
          name: "Campus connector",
          window: "08:20 departure",
          capacity: "26 riders",
          note: "Thursday keeps the same plan with a tighter arrival SLA.",
          stops: [
            { name: "Gangnam Station Exit 11", time: "08:20", left: "18%", top: "34%" },
            { name: "Nambu Bus Terminal", time: "08:35", left: "43%", top: "50%" },
            { name: "Seoul National Univ Gate 2", time: "08:49", left: "79%", top: "61%" },
          ],
        },
      ],
      Fri: [
        {
          id: "snu-fri-1",
          name: "Campus connector",
          window: "08:10 departure",
          capacity: "26 riders",
          note: "Friday runs 10 minutes earlier to accommodate a campus event window.",
          stops: [
            { name: "Gangnam Station Exit 11", time: "08:10", left: "18%", top: "34%" },
            { name: "Nambu Bus Terminal", time: "08:24", left: "43%", top: "50%" },
            { name: "Seoul National Univ Gate 2", time: "08:39", left: "79%", top: "61%" },
          ],
        },
      ],
      Sat: [],
      Sun: [],
    },
  },
];

export const organizations: OrganizationRecord[] = [
  {
    id: "sunrise-academy",
    name: "Sunrise Academy",
    type: "Academy group",
    status: "Pilot live",
    code: "SUN-ACA-01",
    campuses: 3,
    routes: 5,
    riders: "164 active riders",
    coordinator: "Mina Park",
    coordinatorEmail: "mina.park@sunrise.example",
    serviceLevel: "Guardian alerts + boarding proof",
    notes: "Requires daily boarding digest before 09:30 and exception review by noon.",
    services: ["Mate access", "Guardian visibility", "Driver assignment", "Attendance export"],
    locations: ["Hongdae campus", "Sinchon campus", "Mapo after-school center"],
  },
  {
    id: "kookmin-pilot",
    name: "Kookmin Shuttle Pilot",
    type: "University transport",
    status: "Pilot live",
    code: "KMU-PILOT",
    campuses: 1,
    routes: 2,
    riders: "83 active riders",
    coordinator: "Jae Kim",
    coordinatorEmail: "jae.kim@kookmin.example",
    serviceLevel: "Student ETA + operator schedule control",
    notes: "Strong fit for recurring commuter schedules and overflow route logic.",
    services: ["Schedule planner", "Operator console", "Mate timetable"],
    locations: ["Main campus gate", "Dormitory entrance"],
  },
  {
    id: "nexen-commute",
    name: "Nexen Commute",
    type: "Enterprise commute",
    status: "Expansion",
    code: "NEX-COM-02",
    campuses: 2,
    routes: 4,
    riders: "211 active riders",
    coordinator: "Daniel Ryu",
    coordinatorEmail: "daniel.ryu@nexen.example",
    serviceLevel: "Punctuality SLA + delay escalation",
    notes: "Wants monthly punctuality reporting and stronger vehicle swap automation.",
    services: ["Route recovery", "Executive shuttle", "Delay alerts", "Usage reporting"],
    locations: ["Pangyo HQ", "Gangnam Finance Center"],
  },
  {
    id: "campus-connect",
    name: "Campus Connect",
    type: "University partner",
    status: "Ready to onboard",
    code: "CAMP-CON-11",
    campuses: 2,
    routes: 3,
    riders: "Pre-launch group of 96",
    coordinator: "Grace Han",
    coordinatorEmail: "grace.han@campusconnect.example",
    serviceLevel: "Guardian support + semester launch kit",
    notes: "Needs a branded rider invite page and onboarding support for faculty admins.",
    services: ["Guardian alerts", "Semester launch", "Campus loop", "Admin access codes"],
    locations: ["Gangnam transfer stop", "Seoul National University"],
  },
];
