export type DriverStopState = "completed" | "current" | "upcoming";
export type RiderBoardingState = "Boarded" | "Waiting" | "Manual check" | "No show";

export type DriverStop = {
  id: string;
  name: string;
  address: string;
  boarding: string;
  state: DriverStopState;
};

export type DriverRider = {
  id: string;
  name: string;
  state: RiderBoardingState;
  note: string;
};

export type DriverNotice = {
  id: string;
  title: string;
  detail: string;
  tone: string;
};

export const driverShift = {
  driverName: "Jeongheon Woo",
  routeName: "Gangnam -> Seoul National Univ",
  vehicle: "Ioniq Shuttle",
  vehicleCode: "BU-IONIQ-12",
  plate: "12 BUS 1024",
  startTime: "08:20",
  status: "Driving now",
  seats: "18 / 26 riders",
  nextStop: "Nambu Bus Terminal",
  nextStopEta: "5 min",
  shiftWindow: "08:00 - 17:00",
};

export const driverRoutePath = [
  { left: "16%", top: "18%", width: "22%", rotate: "18deg" },
  { left: "33%", top: "30%", width: "24%", rotate: "30deg" },
  { left: "51%", top: "46%", width: "23%", rotate: "22deg" },
  { left: "69%", top: "55%", width: "15%", rotate: "74deg" },
];

export const driverMapMarkers = [
  { label: "Gangnam", left: "15%", top: "16%", complete: true },
  { label: "Nambu", left: "46%", top: "42%", active: true },
  { label: "SNU", left: "79%", top: "67%" },
];

export const driverStops: DriverStop[] = [
  {
    id: "gangnam-exit11",
    name: "Gangnam Station Exit 11",
    address: "225, Gangnam-daero, Seocho-gu",
    boarding: "12 / 12 boarded",
    state: "completed",
  },
  {
    id: "nambu-terminal",
    name: "Nambu Bus Terminal",
    address: "1947, Nambusunhwan-ro, Seocho-gu",
    boarding: "3 / 6 boarding",
    state: "current",
  },
  {
    id: "snu-gate2",
    name: "Seoul National Univ Gate 2",
    address: "1, Gwanak-ro, Gwanak-gu",
    boarding: "0 / 8 boarded",
    state: "upcoming",
  },
];

export const boardingRiders: DriverRider[] = [
  {
    id: "rider-1",
    name: "Kyungmin Yoo",
    state: "Boarded",
    note: "Boarded automatically at Gangnam Station.",
  },
  {
    id: "rider-2",
    name: "Seungwon Lee",
    state: "Waiting",
    note: "Guardian confirmed arrival at the curb 2 minutes ago.",
  },
  {
    id: "rider-3",
    name: "Junhyuk Kim",
    state: "Manual check",
    note: "QR scan failed once. Manual confirmation is allowed.",
  },
  {
    id: "rider-4",
    name: "Ronny Woo",
    state: "No show",
    note: "Campus contact reported the rider will skip this stop today.",
  },
];

export const driverNotices: DriverNotice[] = [
  {
    id: "notice-1",
    title: "Arrival delay should stay under 3 minutes",
    detail: "Traffic near Nambu Bus Terminal is slightly slower than the standard morning pattern.",
    tone: "bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]",
  },
  {
    id: "notice-2",
    title: "Guardian alerts are active for 8 riders",
    detail: "Boarding confirmation will be pushed as soon as each rider is marked complete.",
    tone: "bg-[rgba(25,184,146,0.12)] text-[var(--success)]",
  },
  {
    id: "notice-3",
    title: "Campus desk is available on in-app support",
    detail: "Use support if a stop needs a manual reroute or a rider exception is unclear.",
    tone: "bg-[#f1f0ea] text-[var(--foreground-soft)]",
  },
];

export const driverQuickActions = [
  "Confirm current stop",
  "Open live navigation",
  "Call support desk",
  "Report no-show rider",
];

export const driverProfile = {
  email: "contact@wookingwoo.com",
  company: "Busition Operations",
  phone: "+82 10-1234-0010",
  certifications: ["Campus loop", "Guardian support", "Morning commuter"],
  checkItems: [
    { label: "Vehicle charge", status: "92% ready" },
    { label: "Daily safety check", status: "Submitted at 07:44" },
    { label: "Passenger tablet", status: "Synced" },
  ],
};
