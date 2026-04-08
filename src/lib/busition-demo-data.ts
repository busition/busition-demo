export type ScenarioId = "academy" | "campus" | "enterprise";
export type StageId =
  | "scheduled"
  | "approaching"
  | "boarding"
  | "disruption"
  | "completed";

export type Tone = "stable" | "attention" | "critical" | "complete";

export type StageSnapshot = {
  statusLabel: string;
  statusTone: Tone;
  progress: number;
  busPosition: number;
  activeStopIndex: number;
  delayLabel: string;
  utilizationLabel: string;
  nextStop: string;
  nextStopEta: string;
  arrivalEta: string;
  seatsLeft: string;
  driverAction: string;
  driverActionNote: string;
  driverChecklist: string[];
  riderEta: string;
  riderHeadline: string;
  riderStatus: string;
  riderNotice: string;
  riderPermissions: string;
  consoleAlert: string;
  consoleDetail: string;
  consoleRecommendation: string;
  eventLog: string[];
  stopEtas: string[];
  stopLoads: string[];
};

export type Scenario = {
  id: ScenarioId;
  label: string;
  segment: string;
  strapline: string;
  organization: string;
  deployment: string;
  routeName: string;
  vehicleName: string;
  guardianGroup: string;
  summary: string;
  outcomes: string[];
  metrics: Array<{
    label: string;
    value: string;
    hint: string;
  }>;
  liveSignals: string[];
  stops: Array<{
    name: string;
    zone: string;
  }>;
  plannerSeed: {
    riders: number;
    vehicles: number;
    maxRideTime: number;
  };
  stages: Record<StageId, StageSnapshot>;
};

export const stageOrder: StageId[] = [
  "scheduled",
  "approaching",
  "boarding",
  "disruption",
  "completed",
];

export const stageLabels: Record<StageId, string> = {
  scheduled: "Scheduled",
  approaching: "Approaching",
  boarding: "Boarding",
  disruption: "Disruption",
  completed: "Completed",
};

export const scenarios: Record<ScenarioId, Scenario> = {
  academy: {
    id: "academy",
    label: "Academy Morning Run",
    segment: "Academy / K-12",
    strapline: "Guardian trust, boarding proof, and fewer phone calls.",
    organization: "Maple Lane Academy",
    deployment: "2 buses, 5 neighborhood stops, morning pickup",
    routeName: "Morning East Loop",
    vehicleName: "Bus 03 · 12 seats",
    guardianGroup: "Parents, homeroom staff, front desk",
    summary:
      "Busition replaces spreadsheet dispatch and guardian phone calls with one synchronized route view before, during, and after pickup.",
    outcomes: [
      "Pre-mark absences and late riders from Mate before departure.",
      "Keep the driver focused on the next stop, not inbound calls.",
      "Give the academy one live board with ETA, occupancy, and alert history.",
    ],
    metrics: [
      {
        label: "Expected riders",
        value: "18",
        hint: "2 riders already marked absent in Mate",
      },
      {
        label: "Launch model",
        value: "No hardware",
        hint: "Driver phone plus rider and guardian app",
      },
      {
        label: "Primary KPI",
        value: "Boarding proof",
        hint: "Every guardian sees the same boarding event",
      },
    ],
    liveSignals: [
      "bus.trip.started",
      "rider.boarded.confirmed",
      "route.delay.detected",
    ],
    stops: [
      { name: "Depot", zone: "Dispatch" },
      { name: "Evergreen Apartments", zone: "Stop A" },
      { name: "Oakview Library", zone: "Stop B" },
      { name: "Hillcrest Gate", zone: "Stop C" },
      { name: "Maple Lane Academy", zone: "Campus" },
    ],
    plannerSeed: {
      riders: 48,
      vehicles: 4,
      maxRideTime: 35,
    },
    stages: {
      scheduled: {
        statusLabel: "Trip armed and ready",
        statusTone: "stable",
        progress: 12,
        busPosition: 8,
        activeStopIndex: 0,
        delayLabel: "On time",
        utilizationLabel: "18 planned riders · overflow watch enabled",
        nextStop: "Evergreen Apartments",
        nextStopEta: "07:18",
        arrivalEta: "07:46",
        seatsLeft: "12 seats before pickup",
        driverAction: "Start trip",
        driverActionNote:
          "The driver sees two absences and one 3-minute late note before leaving the depot.",
        driverChecklist: [
          "Route briefing synced",
          "Absence list preloaded",
          "Fallback manual boarding ready",
        ],
        riderEta: "12 min",
        riderHeadline: "The bus is warming up for your stop.",
        riderStatus:
          "Guardians and school staff can see the same countdown before the first pickup.",
        riderNotice: "10-minute and 5-minute alerts are already armed.",
        riderPermissions: "Shared with mother, father, and homeroom staff",
        consoleAlert:
          "Morning run is live with 18 planned riders and 2 recorded absences.",
        consoleDetail:
          "Console is watching first-stop punctuality and expected seat pressure without extra hardware.",
        consoleRecommendation:
          "Invite the three guardians who have not linked their Mate accounts yet.",
        eventLog: [
          "Trip activated from the driver app.",
          "Two riders pre-marked absent in Mate.",
          "Operations board confirmed route and stop order.",
        ],
        stopEtas: ["07:10", "07:18", "07:26", "07:34", "07:46"],
        stopLoads: ["0/12", "0/12", "0/12", "0/12", "0/12"],
      },
      approaching: {
        statusLabel: "Approaching first pickup",
        statusTone: "stable",
        progress: 29,
        busPosition: 26,
        activeStopIndex: 1,
        delayLabel: "On time",
        utilizationLabel: "5 boarded · 7 seats remaining",
        nextStop: "Oakview Library",
        nextStopEta: "07:26",
        arrivalEta: "07:46",
        seatsLeft: "7 seats remaining",
        driverAction: "Confirm pickup",
        driverActionNote:
          "Driver sees one guardian-added note about a wheelchair-side pickup at Oakview.",
        driverChecklist: [
          "Guardian note pinned",
          "Stop order locked",
          "Voice cue for next stop",
        ],
        riderEta: "5 min",
        riderHeadline: "Bus is five minutes away from Evergreen.",
        riderStatus:
          "Mate switches from rough ETA to precise stop countdown as the bus nears pickup.",
        riderNotice:
          "The school desk receives the same approach alert as the guardian group.",
        riderPermissions: "Shared with mother, grandfather, and front desk",
        consoleAlert:
          "First pickup completed with 5 riders confirmed and zero inbound calls.",
        consoleDetail:
          "Console highlights stop-level boarding and live seat availability before the second pickup.",
        consoleRecommendation:
          "Prepare overflow notice if Oakview adds more than four late boardings.",
        eventLog: [
          "Evergreen pickup completed.",
          "Five boarding events confirmed.",
          "No-show list synchronized back to the console.",
        ],
        stopEtas: ["07:10", "07:18", "07:26", "07:34", "07:46"],
        stopLoads: ["0/12", "5/12", "5/12", "5/12", "5/12"],
      },
      boarding: {
        statusLabel: "Boarding certainty in flight",
        statusTone: "attention",
        progress: 48,
        busPosition: 48,
        activeStopIndex: 2,
        delayLabel: "2 min late",
        utilizationLabel: "8 boarded · 4 seats remaining",
        nextStop: "Hillcrest Gate",
        nextStopEta: "07:36",
        arrivalEta: "07:48",
        seatsLeft: "4 seats remaining",
        driverAction: "Correct boarding list",
        driverActionNote:
          "A predicted boarding was missed automatically, so the driver gets a one-tap correction button.",
        driverChecklist: [
          "Predicted rider needs confirmation",
          "Late rider note still active",
          "Seat cap warning at 67%",
        ],
        riderEta: "11 min",
        riderHeadline: "Boarded and safely on the way.",
        riderStatus:
          "Mate changes from waiting mode to in-trip mode with destination ETA and guardian proof.",
        riderNotice:
          "A boarding confirmation has already been delivered to guardians and staff.",
        riderPermissions: "Shared with mother, aunt, and homeroom staff",
        consoleAlert:
          "Boarding confidence held through a manual correction at Oakview Library.",
        consoleDetail:
          "Operations sees the correction instantly and keeps the route moving without extra calls.",
        consoleRecommendation:
          "Review Oakview scan quality later and keep manual correction enabled for this week.",
        eventLog: [
          "Oakview boarding confirmed after one manual correction.",
          "Destination ETA recalculated for all riders.",
          "Occupancy now above 65% with four seats left.",
        ],
        stopEtas: ["07:10", "07:18", "07:27", "07:36", "07:48"],
        stopLoads: ["0/12", "5/12", "8/12", "8/12", "8/12"],
      },
      disruption: {
        statusLabel: "Delay handled in one flow",
        statusTone: "critical",
        progress: 71,
        busPosition: 71,
        activeStopIndex: 3,
        delayLabel: "6 min late",
        utilizationLabel: "11 boarded · 1 seat remaining",
        nextStop: "Maple Lane Academy",
        nextStopEta: "07:52",
        arrivalEta: "07:54",
        seatsLeft: "1 seat remaining",
        driverAction: "Broadcast delay",
        driverActionNote:
          "Traffic slowdown at Hillcrest triggers a delay alert and sends the updated ETA to guardians automatically.",
        driverChecklist: [
          "Delay reason logged",
          "Guardian alert pushed",
          "Overflow fallback still available",
        ],
        riderEta: "6 min",
        riderHeadline: "Slight delay detected, ETA updated.",
        riderStatus:
          "Guardians no longer need to call because the revised arrival time is already synced.",
        riderNotice:
          "Delay notice sent with updated campus arrival and current stop count remaining.",
        riderPermissions: "Shared with mother, father, and school transport desk",
        consoleAlert:
          "Hillcrest traffic added 6 minutes. Guardians and staff were notified automatically.",
        consoleDetail:
          "Console keeps the academy informed, shows one seat left, and captures the delay reason for reporting.",
        consoleRecommendation:
          "Flag Hillcrest as a repeat delay corridor and suggest an alternate stop window tomorrow.",
        eventLog: [
          "Delay detected at Hillcrest Gate.",
          "ETA refreshed in Driver, Mate, and Console.",
          "Operations board logged the reason for weekly reporting.",
        ],
        stopEtas: ["07:10", "07:18", "07:27", "07:40", "07:54"],
        stopLoads: ["0/12", "5/12", "8/12", "11/12", "11/12"],
      },
      completed: {
        statusLabel: "Trip closed with proof",
        statusTone: "complete",
        progress: 100,
        busPosition: 96,
        activeStopIndex: 4,
        delayLabel: "Closed",
        utilizationLabel: "16 arrivals confirmed",
        nextStop: "Trip complete",
        nextStopEta: "Done",
        arrivalEta: "07:54",
        seatsLeft: "Trip completed",
        driverAction: "Run completion checklist",
        driverActionNote:
          "The driver finishes with a residual-seat check and the academy receives a complete arrival ledger.",
        driverChecklist: [
          "Final rider sweep",
          "Arrival proof recorded",
          "Vehicle clear check complete",
        ],
        riderEta: "Arrived",
        riderHeadline: "Arrival confirmed for every linked guardian.",
        riderStatus:
          "Mate closes the loop with an arrival confirmation instead of leaving guardians guessing.",
        riderNotice:
          "Route history is now available for the academy admin report.",
        riderPermissions: "Shared with guardian circle and academy transport desk",
        consoleAlert:
          "Morning run closed with full boarding and arrival history attached to the route record.",
        consoleDetail:
          "Operations can review delay reason, boarding corrections, and guardian notification timestamps in one place.",
        consoleRecommendation:
          "Use this route in the pilot report to prove complaint reduction and boarding visibility.",
        eventLog: [
          "All rider arrivals recorded.",
          "Delay reason attached to the route history.",
          "Weekly admin report draft updated automatically.",
        ],
        stopEtas: ["07:10", "07:18", "07:27", "07:40", "07:54"],
        stopLoads: ["0/12", "5/12", "8/12", "11/12", "16 arrived"],
      },
    },
  },
  campus: {
    id: "campus",
    label: "Campus Express",
    segment: "University Shuttle",
    strapline: "Live seats, stop pressure, and fewer wasted waits.",
    organization: "Northbridge University",
    deployment: "4 loop routes, station express, student-facing seat visibility",
    routeName: "Station Express Red",
    vehicleName: "Shuttle 07 · 28 seats",
    guardianGroup: "Students, dorm staff, campus operations",
    summary:
      "Busition turns shuttle uncertainty into live ETA, route progress, and seat visibility that students can act on before they walk to the stop.",
    outcomes: [
      "Show seat pressure before students leave the library or station.",
      "Detect route slowdown early and redirect students to alternate loops.",
      "Let campus ops compare stop demand and route utilization in real time.",
    ],
    metrics: [
      {
        label: "Peak demand",
        value: "24 riders",
        hint: "Express route nearing capacity in the morning window",
      },
      {
        label: "Decision layer",
        value: "Seat visibility",
        hint: "Students see whether the next shuttle is worth waiting for",
      },
      {
        label: "Ops model",
        value: "Multi-route",
        hint: "Operations board compares routes side by side",
      },
    ],
    liveSignals: ["bus.location.updated", "seat.capacity.updated", "route.delay.detected"],
    stops: [
      { name: "Central Station", zone: "Transit" },
      { name: "East Dorms", zone: "Stop A" },
      { name: "Library Plaza", zone: "Stop B" },
      { name: "Engineering Gate", zone: "Stop C" },
      { name: "Northbridge Hub", zone: "Campus" },
    ],
    plannerSeed: {
      riders: 180,
      vehicles: 6,
      maxRideTime: 28,
    },
    stages: {
      scheduled: {
        statusLabel: "Rush hour preload ready",
        statusTone: "stable",
        progress: 9,
        busPosition: 8,
        activeStopIndex: 0,
        delayLabel: "On time",
        utilizationLabel: "24 riders forecasted · 28-seat capacity",
        nextStop: "East Dorms",
        nextStopEta: "08:12",
        arrivalEta: "08:26",
        seatsLeft: "28 seats before boarding",
        driverAction: "Begin express route",
        driverActionNote:
          "Driver starts with route pressure estimates and predicted queue size at East Dorms.",
        driverChecklist: [
          "Crowd estimate synced",
          "Dorm stop load forecast ready",
          "Alternate route pinned",
        ],
        riderEta: "7 min",
        riderHeadline: "Station Express leaves Central Station in seven minutes.",
        riderStatus:
          "Students can choose whether to wait here or catch the next loop at another stop.",
        riderNotice:
          "Live seat availability will update after every pickup, not just at departure.",
        riderPermissions: "Shared with student, roommate, and dorm desk",
        consoleAlert:
          "Morning express armed. East Dorms is predicted to be the heaviest stop this run.",
        consoleDetail:
          "Campus ops sees forecasted stop pressure before the first rider boards.",
        consoleRecommendation:
          "Keep the blue loop ready as overflow coverage if East Dorms exceeds 26 riders.",
        eventLog: [
          "Central Station dispatch armed.",
          "Peak route pressure prediction loaded.",
          "Blue loop marked as overflow backup.",
        ],
        stopEtas: ["08:05", "08:12", "08:16", "08:21", "08:26"],
        stopLoads: ["0/28", "0/28", "0/28", "0/28", "0/28"],
      },
      approaching: {
        statusLabel: "Seat visibility is live",
        statusTone: "stable",
        progress: 27,
        busPosition: 24,
        activeStopIndex: 1,
        delayLabel: "On time",
        utilizationLabel: "11 riders onboard · 17 seats left",
        nextStop: "Library Plaza",
        nextStopEta: "08:16",
        arrivalEta: "08:26",
        seatsLeft: "17 seats remaining",
        driverAction: "Open boarding window",
        driverActionNote:
          "The driver sees that one wheelchair bay must stay open for a later stop.",
        driverChecklist: [
          "Seat reserve active",
          "Dorm queue updated live",
          "Overflow backup still idle",
        ],
        riderEta: "3 min",
        riderHeadline: "17 seats remain after East Dorms.",
        riderStatus:
          "Students walking from the station already know whether this bus is worth catching.",
        riderNotice:
          "Mate updates seat count after every stop instead of relying on a static timetable.",
        riderPermissions: "Shared with student and dorm staff",
        consoleAlert:
          "Seat count is live. East Dorms absorbed 11 riders without overflow.",
        consoleDetail:
          "Operations board uses stop-by-stop occupancy to decide whether another loop should be advanced.",
        consoleRecommendation:
          "Keep the blue loop 4 minutes behind as a cushion for Engineering Gate demand.",
        eventLog: [
          "East Dorms boarding complete.",
          "Seat count pushed to Mate for all linked students.",
          "Accessibility reserve preserved for later stop.",
        ],
        stopEtas: ["08:05", "08:12", "08:16", "08:21", "08:26"],
        stopLoads: ["0/28", "11/28", "11/28", "11/28", "11/28"],
      },
      boarding: {
        statusLabel: "Route pressure is visible",
        statusTone: "attention",
        progress: 51,
        busPosition: 49,
        activeStopIndex: 2,
        delayLabel: "1 min late",
        utilizationLabel: "19 riders onboard · 9 seats left",
        nextStop: "Engineering Gate",
        nextStopEta: "08:22",
        arrivalEta: "08:27",
        seatsLeft: "9 seats remaining",
        driverAction: "Lock next-stop boarding plan",
        driverActionNote:
          "Mate now shows whether Engineering students should wait for this bus or the overflow loop.",
        driverChecklist: [
          "Seat advisory published",
          "Next-stop queue estimated",
          "Alternate loop standing by",
        ],
        riderEta: "6 min",
        riderHeadline: "Capacity is tightening but this run is still boardable.",
        riderStatus:
          "Students see live seat pressure before leaving the library or engineering labs.",
        riderNotice:
          "Busition warns students when a route is getting tight instead of letting them waste the walk.",
        riderPermissions: "Shared with student and department coordinator",
        consoleAlert:
          "Station Express is now at 68% capacity and the next stop is the biggest risk point.",
        consoleDetail:
          "Campus operations can trigger an alternate stop message before the platform gets crowded.",
        consoleRecommendation:
          "Push a rider advisory that Blue Loop is a backup option for Engineering riders.",
        eventLog: [
          "Library Plaza boarding complete.",
          "Seat pressure threshold crossed.",
          "Alternate-loop recommendation prepared for Engineering riders.",
        ],
        stopEtas: ["08:05", "08:12", "08:16", "08:22", "08:27"],
        stopLoads: ["0/28", "11/28", "19/28", "19/28", "19/28"],
      },
      disruption: {
        statusLabel: "Delay is routed, not guessed",
        statusTone: "critical",
        progress: 74,
        busPosition: 74,
        activeStopIndex: 3,
        delayLabel: "5 min late",
        utilizationLabel: "24 riders onboard · 4 seats left",
        nextStop: "Northbridge Hub",
        nextStopEta: "08:31",
        arrivalEta: "08:32",
        seatsLeft: "4 seats remaining",
        driverAction: "Confirm alternate stop message",
        driverActionNote:
          "Traffic near Engineering Gate adds five minutes, so Mate sends an alternate-route nudge to waiting students.",
        driverChecklist: [
          "Delay message sent",
          "Alternate route suggested",
          "Ops board tracking queue spillover",
        ],
        riderEta: "8 min",
        riderHeadline: "Express route delayed. Blue Loop is now the faster option for North Annex riders.",
        riderStatus:
          "Mate changes from a static ETA screen to an actual decision tool when the route slows down.",
        riderNotice:
          "Students waiting downstream get a route-choice message instead of another vague apology.",
        riderPermissions: "Shared with student and residence desk",
        consoleAlert:
          "Engineering corridor slowed the route by five minutes and triggered an alternate-route rider advisory.",
        consoleDetail:
          "Operations board protects the student experience by shifting demand, not just reporting the delay.",
        consoleRecommendation:
          "Advance Blue Loop by 3 minutes and compare downstream wait times in the report.",
        eventLog: [
          "Delay detected at Engineering Gate.",
          "Mate sent alternate-route guidance to downstream riders.",
          "Console started route comparison logging for post-run analysis.",
        ],
        stopEtas: ["08:05", "08:12", "08:16", "08:25", "08:32"],
        stopLoads: ["0/28", "11/28", "19/28", "24/28", "24/28"],
      },
      completed: {
        statusLabel: "Rush hour closed with demand history",
        statusTone: "complete",
        progress: 100,
        busPosition: 96,
        activeStopIndex: 4,
        delayLabel: "Closed",
        utilizationLabel: "24 riders delivered · demand history stored",
        nextStop: "Trip complete",
        nextStopEta: "Done",
        arrivalEta: "08:32",
        seatsLeft: "Trip completed",
        driverAction: "Finish route",
        driverActionNote:
          "Driver wraps with a clean handoff while operations now owns the utilization and delay history.",
        driverChecklist: [
          "Final arrival confirmed",
          "Vehicle clear check complete",
          "Delay reason closed",
        ],
        riderEta: "Arrived",
        riderHeadline: "Students reached campus with complete seat and delay history.",
        riderStatus:
          "Busition closes the loop with a real route record, not just a vanished live map.",
        riderNotice:
          "Operations now knows which stop generated pressure and how many riders shifted to backup routes.",
        riderPermissions: "Shared with student, residence desk, and campus ops",
        consoleAlert:
          "Station Express closed with usable demand, seat, and delay data for the next schedule review.",
        consoleDetail:
          "This run now feeds stop pressure, utilization, and route comparison into the optimization layer.",
        consoleRecommendation:
          "Use this route history to rebalance East Dorms and Engineering Gate in the next schedule cycle.",
        eventLog: [
          "Route completed at Northbridge Hub.",
          "Stop pressure and delay history captured.",
          "Optimization inputs added for tomorrow's route review.",
        ],
        stopEtas: ["08:05", "08:12", "08:16", "08:25", "08:32"],
        stopLoads: ["0/28", "11/28", "19/28", "24/28", "24 arrived"],
      },
    },
  },
  enterprise: {
    id: "enterprise",
    label: "Shift Connector",
    segment: "Enterprise Commute",
    strapline: "Shift punctuality, route control, and auditable operations.",
    organization: "Helix Fabrication",
    deployment: "5 routes, night-shift arrivals, multi-site operations desk",
    routeName: "Night Shift Connector",
    vehicleName: "Coach 12 · 32 seats",
    guardianGroup: "Workers, supervisors, site operations",
    summary:
      "Busition gives enterprise transport teams one operating layer for shift arrivals, route exceptions, and multi-stop workforce visibility.",
    outcomes: [
      "Protect shift punctuality with live ETA and exception handling.",
      "Let supervisors see whether late arrivals came from traffic, no-show clusters, or route imbalance.",
      "Turn route history into concrete optimization and staffing decisions.",
    ],
    metrics: [
      {
        label: "Route priority",
        value: "Shift punctuality",
        hint: "Every minute matters at shift handoff",
      },
      {
        label: "Operations scope",
        value: "Multi-site",
        hint: "One console for plant, yard, and warehouse stops",
      },
      {
        label: "Optimization layer",
        value: "AI-ready",
        hint: "Delay and demand history are captured for route redesign",
      },
    ],
    liveSignals: ["trip.completed", "route.delay.detected", "stop.arrived"],
    stops: [
      { name: "Transit Center", zone: "Hub" },
      { name: "River Plant", zone: "Stop A" },
      { name: "Packaging Yard", zone: "Stop B" },
      { name: "Assembly Hall", zone: "Stop C" },
      { name: "Helix South Gate", zone: "Factory" },
    ],
    plannerSeed: {
      riders: 132,
      vehicles: 5,
      maxRideTime: 40,
    },
    stages: {
      scheduled: {
        statusLabel: "Shift run staged",
        statusTone: "stable",
        progress: 11,
        busPosition: 8,
        activeStopIndex: 0,
        delayLabel: "On time",
        utilizationLabel: "27 workers forecasted · 32-seat coach",
        nextStop: "River Plant",
        nextStopEta: "18:14",
        arrivalEta: "18:37",
        seatsLeft: "32 seats before pickup",
        driverAction: "Begin shift connector",
        driverActionNote:
          "Driver starts with stop-level headcount and shift urgency already loaded from the operations desk.",
        driverChecklist: [
          "Shift priority tagged",
          "Supervisor visibility enabled",
          "Reroute fallback pinned",
        ],
        riderEta: "9 min",
        riderHeadline: "Night shift connector leaves the transit center in nine minutes.",
        riderStatus:
          "Workers and supervisors see the same route start instead of waiting on dispatch calls.",
        riderNotice:
          "South Gate ETA is visible before the first worker boards.",
        riderPermissions: "Shared with worker and shift supervisor",
        consoleAlert:
          "Night shift connector staged with shift-handoff priority and supervisor visibility enabled.",
        consoleDetail:
          "Operations desk is tracking punctuality risk from the first minute, not after the site starts asking questions.",
        consoleRecommendation:
          "Keep the warehouse feeder route visible as a reroute fallback if Assembly Hall traffic spikes.",
        eventLog: [
          "Shift connector staged for departure.",
          "Supervisor visibility enabled for South Gate.",
          "Reroute fallback pinned for later use.",
        ],
        stopEtas: ["18:05", "18:14", "18:21", "18:29", "18:37"],
        stopLoads: ["0/32", "0/32", "0/32", "0/32", "0/32"],
      },
      approaching: {
        statusLabel: "Workforce view is live",
        statusTone: "stable",
        progress: 31,
        busPosition: 28,
        activeStopIndex: 1,
        delayLabel: "On time",
        utilizationLabel: "9 workers onboard · 23 seats remaining",
        nextStop: "Packaging Yard",
        nextStopEta: "18:21",
        arrivalEta: "18:37",
        seatsLeft: "23 seats remaining",
        driverAction: "Confirm stop roster",
        driverActionNote:
          "Driver sees exactly how many riders still need pickup at Packaging Yard and Assembly Hall.",
        driverChecklist: [
          "Roster verified",
          "Supervisor note synced",
          "Site arrival ETA healthy",
        ],
        riderEta: "7 min",
        riderHeadline: "Packaging Yard pickup stays on schedule.",
        riderStatus:
          "Workers know if they should leave the locker room or wait two more minutes.",
        riderNotice:
          "Site supervisors can watch the same ETA without asking transport dispatch for updates.",
        riderPermissions: "Shared with worker and shift supervisor",
        consoleAlert:
          "River Plant pickup completed with nine workers confirmed and no route drift.",
        consoleDetail:
          "The operations desk already sees whether this coach is pacing toward a clean shift handoff.",
        consoleRecommendation:
          "Prepare a reroute notice only if the Assembly corridor exceeds a three-minute slowdown.",
        eventLog: [
          "River Plant pickup complete.",
          "Nine workers confirmed onboard.",
          "Supervisor ETA view refreshed automatically.",
        ],
        stopEtas: ["18:05", "18:14", "18:21", "18:29", "18:37"],
        stopLoads: ["0/32", "9/32", "9/32", "9/32", "9/32"],
      },
      boarding: {
        statusLabel: "Punctuality risk is measurable",
        statusTone: "attention",
        progress: 52,
        busPosition: 51,
        activeStopIndex: 2,
        delayLabel: "2 min late",
        utilizationLabel: "18 workers onboard · 14 seats remaining",
        nextStop: "Assembly Hall",
        nextStopEta: "18:31",
        arrivalEta: "18:39",
        seatsLeft: "14 seats remaining",
        driverAction: "Confirm shift-critical riders",
        driverActionNote:
          "Operations flags three shift-critical workers, so the driver sees their pickup status before the final corridor.",
        driverChecklist: [
          "Critical riders highlighted",
          "Delay threshold monitored",
          "Reroute option prepared",
        ],
        riderEta: "10 min",
        riderHeadline: "Connector is slightly late but still pacing inside shift buffer.",
        riderStatus:
          "Workers and supervisors get a quantified ETA with risk level instead of vague reassurance.",
        riderNotice:
          "Busition marks the route as yellow before it becomes a shift-handoff problem.",
        riderPermissions: "Shared with worker, team lead, and transport desk",
        consoleAlert:
          "Three shift-critical riders remain ahead. Route is inside buffer but no longer fully clean.",
        consoleDetail:
          "The desk now sees punctuality risk before the site start time is impacted.",
        consoleRecommendation:
          "Hold the warehouse feeder route for one more minute before deciding on a reroute.",
        eventLog: [
          "Packaging Yard pickup completed.",
          "Shift-critical riders highlighted for Assembly Hall.",
          "Delay threshold moved from green to yellow.",
        ],
        stopEtas: ["18:05", "18:14", "18:22", "18:31", "18:39"],
        stopLoads: ["0/32", "9/32", "18/32", "18/32", "18/32"],
      },
      disruption: {
        statusLabel: "Reroute recommended",
        statusTone: "critical",
        progress: 77,
        busPosition: 77,
        activeStopIndex: 3,
        delayLabel: "7 min late",
        utilizationLabel: "26 workers onboard · 6 seats remaining",
        nextStop: "Helix South Gate",
        nextStopEta: "18:43",
        arrivalEta: "18:46",
        seatsLeft: "6 seats remaining",
        driverAction: "Accept reroute",
        driverActionNote:
          "Assembly corridor congestion pushes the route outside the target buffer, so Console recommends a feeder-route assist.",
        driverChecklist: [
          "Reroute assist offered",
          "Supervisor alert sent",
          "Exception reason captured",
        ],
        riderEta: "9 min",
        riderHeadline: "Shift route delayed. A feeder assist is now covering the final corridor.",
        riderStatus:
          "Workers and supervisors see the recovery plan immediately instead of escalating on radio or phone.",
        riderNotice:
          "The ETA is slower, but the route now carries a recovery action instead of a silent delay.",
        riderPermissions: "Shared with worker, team lead, and site operations",
        consoleAlert:
          "Assembly Hall congestion pushed the route outside buffer. Console recommended feeder assist to protect shift arrival.",
        consoleDetail:
          "Busition captures the exception, notifies the site, and turns the problem into a measurable recovery action.",
        consoleRecommendation:
          "Compare Assembly corridor delay history this week and model a new split-stop pattern for tomorrow.",
        eventLog: [
          "Delay exceeded shift buffer at Assembly Hall.",
          "Feeder assist recommendation issued from Console.",
          "Supervisor and site operations received the recovery notice.",
        ],
        stopEtas: ["18:05", "18:14", "18:22", "18:36", "18:46"],
        stopLoads: ["0/32", "9/32", "18/32", "26/32", "26/32"],
      },
      completed: {
        statusLabel: "Shift handoff logged",
        statusTone: "complete",
        progress: 100,
        busPosition: 96,
        activeStopIndex: 4,
        delayLabel: "Closed",
        utilizationLabel: "26 workers delivered · exception audit saved",
        nextStop: "Trip complete",
        nextStopEta: "Done",
        arrivalEta: "18:46",
        seatsLeft: "Trip completed",
        driverAction: "Close shift run",
        driverActionNote:
          "The driver exits with a route log that already includes delay reason, reroute assist, and completion proof.",
        driverChecklist: [
          "Final arrival confirmed",
          "Exception audit stored",
          "Vehicle clear check complete",
        ],
        riderEta: "Arrived",
        riderHeadline: "Shift connector closed with a full arrival and exception record.",
        riderStatus:
          "Busition gives enterprise transport teams auditability, not just a transient live map.",
        riderNotice:
          "Operations can now compare punctuality, reroute recovery, and stop pressure in the weekly report.",
        riderPermissions: "Shared with worker, team lead, and site operations",
        consoleAlert:
          "Night shift connector closed with arrival proof, exception reason, and recovery action history attached.",
        consoleDetail:
          "This route now feeds site punctuality reporting and tomorrow's route redesign proposal.",
        consoleRecommendation:
          "Use the exception record to test a split stop or alternate corridor on the next night shift.",
        eventLog: [
          "South Gate arrival confirmed.",
          "Exception audit stored for the route history.",
          "Optimization model updated with corridor and delay data.",
        ],
        stopEtas: ["18:05", "18:14", "18:22", "18:36", "18:46"],
        stopLoads: ["0/32", "9/32", "18/32", "26/32", "26 arrived"],
      },
    },
  },
};
