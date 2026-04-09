export type TripState = "Live now" | "Before departure" | "Arriving soon";
export type AlertCategory = "All" | "Boarding" | "Delay" | "Service";
export type AlertSeverity = "Boarding" | "Delay" | "Service";
export type StopState = "done" | "active" | "upcoming";

export type TimetableTrip = {
  id: string;
  routeName: string;
  state: TripState;
  headline: string;
  detail: string;
  accent: string;
  statusTone: string;
  actionLabel: string;
};

export type RouteStop = {
  id: string;
  name: string;
  address: string;
  boarding: string;
  state: StopState;
};

export type RouteJourney = {
  id: string;
  name: string;
  direction: string;
  description: string;
  topLabel: string;
  detailLabel: string;
  progress: string;
  shareCode: string;
  routePath: Array<{
    left: string;
    top: string;
    width: string;
    rotate: string;
  }>;
  markers: Array<{
    label: string;
    left: string;
    top: string;
    active?: boolean;
    complete?: boolean;
  }>;
  stops: RouteStop[];
};

export type MateAlert = {
  id: string;
  category: AlertSeverity;
  title: string;
  detail: string;
  timestamp: string;
  unread?: boolean;
};

export type FamilyMember = {
  id: string;
  name: string;
  role: string;
  route: string;
  status: string;
  badge: string;
  badgeTone: string;
  note: string;
};

export const mateHero = {
  rider: "Jeongheon Woo",
  campus: "Kookmin University shuttle network",
  eta: "Arriving at your stop in 6 min",
  detail: "Shared with one guardian and one campus coordinator.",
};

export const timetableTrips: TimetableTrip[] = [
  {
    id: "bkg-live",
    routeName: "Kookmin University morning line",
    state: "Live now",
    headline: "2 stops away",
    detail: "Approaching Gireum Station Exit 2",
    accent: "bg-[#fff6e7]",
    statusTone: "text-[var(--accent-deep)]",
    actionLabel: "Open live route",
  },
  {
    id: "bkg-next",
    routeName: "Kookmin University return line",
    state: "Before departure",
    headline: "Departs at 15:30",
    detail: "Return trip opens after afternoon classes",
    accent: "bg-[#f5f5f4]",
    statusTone: "text-[var(--foreground)]",
    actionLabel: "View return trip",
  },
  {
    id: "gangnam-live",
    routeName: "Gangnam Campus Connector",
    state: "Arriving soon",
    headline: "1 stop away",
    detail: "Approaching Seoul National University Gate 2",
    accent: "bg-[#fff6e7]",
    statusTone: "text-[var(--accent-deep)]",
    actionLabel: "Track arrival",
  },
];

export const routeJourneys: RouteJourney[] = [
  {
    id: "kookmin-morning",
    name: "Kookmin University morning line",
    direction: "Nowon -> Kookmin University",
    description: "See the live route, stop order, and boarding progress from one shared trip state.",
    topLabel: "Morning trip",
    detailLabel: "Live route",
    progress: "Vehicle is currently between Gireum Station and campus.",
    shareCode: "KMU-ROUTE-03",
    routePath: [
      { left: "14%", top: "20%", width: "22%", rotate: "12deg" },
      { left: "31%", top: "28%", width: "24%", rotate: "22deg" },
      { left: "50%", top: "41%", width: "26%", rotate: "34deg" },
      { left: "69%", top: "57%", width: "16%", rotate: "74deg" },
    ],
    markers: [
      { label: "Nowon", left: "12%", top: "18%", complete: true },
      { label: "Gireum", left: "40%", top: "36%", active: true },
      { label: "Kookmin", left: "78%", top: "68%" },
    ],
    stops: [
      {
        id: "nowon-station",
        name: "Nowon Station Exit 1",
        address: "4-3, Sanggye-ro, Nowon-gu",
        boarding: "12 of 12 boarded",
        state: "done",
      },
      {
        id: "gireum-station",
        name: "Gireum Station Exit 2",
        address: "69-1, Sanggye-ro, Nowon-gu",
        boarding: "3 riders expected at this stop",
        state: "active",
      },
      {
        id: "kookmin-campus",
        name: "Kookmin University Main Gate",
        address: "77, Jeongneung-ro, Seongbuk-gu",
        boarding: "Drop-off only",
        state: "upcoming",
      },
    ],
  },
  {
    id: "kookmin-return",
    name: "Kookmin University return line",
    direction: "Kookmin University -> Bulgwang",
    description: "Return service stays visible before pickup starts, so riders and guardians can plan the trip home.",
    topLabel: "Return trip",
    detailLabel: "Scheduled trip",
    progress: "Departure planned at 15:30",
    shareCode: "KMU-RETURN-11",
    routePath: [
      { left: "18%", top: "26%", width: "22%", rotate: "28deg" },
      { left: "35%", top: "42%", width: "28%", rotate: "8deg" },
      { left: "58%", top: "43%", width: "18%", rotate: "-24deg" },
    ],
    markers: [
      { label: "Kookmin", left: "16%", top: "24%", complete: true },
      { label: "Jeongneung", left: "46%", top: "46%", active: true },
      { label: "Bulgwang", left: "75%", top: "38%" },
    ],
    stops: [
      {
        id: "kookmin-main",
        name: "Kookmin University Main Gate",
        address: "77, Jeongneung-ro, Seongbuk-gu",
        boarding: "Boarding opens in 12 min",
        state: "done",
      },
      {
        id: "jeongneung-market",
        name: "Jeongneung Market",
        address: "18, Arirang-ro, Seongbuk-gu",
        boarding: "Expected load 8 of 12",
        state: "active",
      },
      {
        id: "bulgwang-station",
        name: "Bulgwang Station Exit 1",
        address: "1, Tongil-ro, Eunpyeong-gu",
        boarding: "Expected load 12 of 12",
        state: "upcoming",
      },
    ],
  },
];

export const mateAlerts: MateAlert[] = [
  {
    id: "alert-1",
    category: "Boarding",
    title: "Boarding confirmed at Gireum Station Exit 2",
    detail: "Guardian access received the same confirmation instantly.",
    timestamp: "2 min ago",
    unread: true,
  },
  {
    id: "alert-2",
    category: "Service",
    title: "Afternoon return trip updated",
    detail: "Departure remains 15:30 and the stop order is unchanged.",
    timestamp: "24 min ago",
  },
  {
    id: "alert-3",
    category: "Delay",
    title: "Delay expected near Bulgwang Station",
    detail: "Arrival may shift by up to 4 minutes because of temporary lane congestion.",
    timestamp: "41 min ago",
  },
  {
    id: "alert-4",
    category: "Service",
    title: "Shared access enabled for this rider",
    detail: "One guardian and one campus coordinator are linked to the current trip.",
    timestamp: "Today 07:18",
  },
];

export const familyMembers: FamilyMember[] = [
  {
    id: "minseo-rider",
    name: "Jeongheon Woo",
    role: "Primary rider",
    route: "Kookmin University morning trip",
    status: "In service",
    badge: "2 stops away",
    badgeTone: "bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]",
    note: "Live ETA, boarding records, and route changes are shared with approved contacts.",
  },
  {
    id: "soojin-guardian",
    name: "Kyungmin Yoo",
    role: "Guardian access",
    route: "Receives shared live trip",
    status: "Linked",
    badge: "Notifications on",
    badgeTone: "bg-[rgba(25,184,146,0.12)] text-[var(--success)]",
    note: "Receives boarding confirmation, arrival updates, and service notices in real time.",
  },
  {
    id: "campus-contact",
    name: "Junhyuk Kim",
    role: "Campus coordinator",
    route: "Service contact",
    status: "Available",
    badge: "Ready to assist",
    badgeTone: "bg-[#f1f0ea] text-[var(--foreground-soft)]",
    note: "Acts as the operations contact when route details or stop conditions change.",
  },
];

export const matePreferences = [
  {
    id: "pref-1",
    title: "Boarding confirmation",
    detail: "Send a confirmation when boarding or drop-off is recorded.",
    enabled: true,
  },
  {
    id: "pref-2",
    title: "ETA reminders",
    detail: "Notify 10 and 5 minutes before the vehicle arrives.",
    enabled: true,
  },
  {
    id: "pref-3",
    title: "Delay notices",
    detail: "Share route disruption or detour updates automatically.",
    enabled: false,
  },
];
