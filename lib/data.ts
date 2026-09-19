export const profile = {
  name: "Vimalraji K",
  role: "Software Engineer",
  tagline:
    "Building full-stack enterprise applications with .NET, React, Next.js, and cloud-backed architecture.",
  email: "vimalraji1122@gmail.com",
  phone: "+91 7373882863",
  location: "Pondicherry, India",
  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:vimalraji1122@gmail.com",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Contact", href: "#contact" },
];

export const aboutRoles = [
  "Software Engineer",
  ".NET & React Developer",
  "Backend Lead",
];

export const expertise = [
  ".NET 8",
  "C#",
  "React.js",
  "Next.js",
  "ASP.NET Core Web API",
  "AWS S3",
  "MySQL",
  "MongoDB",
  "Microservices",
  "RESTful APIs",
];

export const stats = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Enterprise Projects", value: 4, suffix: "+" },
  { label: "Core Technologies", value: 20, suffix: "+" },
  { label: "Leadership Areas", value: 7, suffix: "" },
];

export type Skill = {
  name: string;
  category: "backend" | "frontend" | "cloud" | "tools";
  level: number; // 0-100
};

export const skills: Skill[] = [
  { name: ".NET 8", category: "backend", level: 95 },
  { name: "C#", category: "backend", level: 93 },
  { name: "ASP.NET Core Web API", category: "backend", level: 92 },
  { name: "Entity Framework", category: "backend", level: 88 },
  { name: "Node.js", category: "backend", level: 82 },
  { name: "Microservices", category: "backend", level: 85 },
  { name: "RESTful APIs", category: "backend", level: 94 },
  { name: "MySQL", category: "backend", level: 88 },
  { name: "MongoDB", category: "backend", level: 78 },
  { name: "React.js", category: "frontend", level: 88 },
  { name: "Next.js", category: "frontend", level: 82 },
  { name: "TypeScript", category: "frontend", level: 85 },
  { name: "HTML5", category: "frontend", level: 90 },
  { name: "CSS", category: "frontend", level: 88 },
  { name: "Tailwind CSS", category: "frontend", level: 84 },
  { name: "Ant Design", category: "frontend", level: 80 },
  { name: "AWS S3", category: "cloud", level: 83 },
  { name: "GitHub", category: "tools", level: 90 },
  { name: "GitLab", category: "tools", level: 82 },
  { name: "Swagger", category: "tools", level: 85 },
  { name: "Postman", category: "tools", level: 88 },
  { name: "API Integration", category: "tools", level: 90 },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  summary: string;
  achievements: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Backend Lead",
    org: "Patient Diet Order Management System (PDOMS)",
    period: "Current",
    summary:
      "Leading backend development of a multi-facility patient diet ordering platform, from API design to production support.",
    achievements: [
      "Built REST APIs for Orders, Tray Slip, Reports, Facility Configuration, and Language Management",
      "Implemented multilingual configuration and translation support",
      "Delivered order creation, update, cancellation, bed change, and diet change workflows",
      "Built tray slip preview, bulk PDF generation, and QR code integration",
      "Integrated AWS S3 for PDF storage and retrieval",
      "Implemented tenant-based data isolation and role-based authorization",
      "Built scheduler and notification services for automated processing",
      "Optimized API performance and SQL queries; led code reviews and mentoring",
    ],
  },
  {
    role: "Frontend Lead",
    org: "Hindu Endowment Board (HEB) Online Booking",
    period: "Ongoing",
    summary:
      "Led the frontend for an online booking system covering events, services, and hall reservations for temples under HEB.",
    achievements: [
      "Built real-time slot booking, rescheduling, and cancellation features",
      "Designed responsive interfaces for web and mobile booking",
      "Delivered KIOSK integration for walk-in, self-service bookings",
      "Building POS integration for in-person payments and transaction sync",
    ],
  },
  {
    role: "Full-Stack Developer",
    org: "NMS – Netkathir Management Service",
    period: "Earlier",
    summary:
      "Built and maintained an internal HR platform covering employee records, leave, and payroll, using .NET and React.",
    achievements: [
      "Built a leave management system with manager/admin approval workflows",
      "Generated monthly and annual leave reports and holiday tracking",
      "Handled employee permission and late requests",
      "Processed salary details, deductions, earnings, and payroll generation",
    ],
  },
  {
    role: ".NET Developer",
    org: "KBS – Transport",
    period: "Foundations",
    summary:
      "Built a transport management application covering vehicle maintenance, staff billing, and travel bookings.",
    achievements: [
      "Implemented vehicle maintenance logging, bills, and staff salary tracking",
      "Built travel booking management features",
      "Generated reports on vehicle usage, maintenance history, and bookings",
      "Designed user-friendly interfaces to streamline navigation",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  tech: string[];
  features: string[];
  overview: string;
  architecture: string;
  challenges: string;
  results: string;
  color: string;
};

export const projects: Project[] = [
  {
    slug: "patient-diet-order-management",
    name: "Patient Diet Order Management System",
    tagline: "End-to-end diet ordering platform for multi-facility healthcare providers.",
    tech: [".NET 8", "Entity Framework", "MySQL", "AWS S3", "RESTful APIs"],
    features: [
      "Order Management",
      "Tray Slip & QR Generation",
      "Facility Configuration",
      "Multilingual Support",
      "PDF/Excel Reports",
      "Scheduler & Notifications",
    ],
    overview:
      "A backend-led platform that digitizes patient diet ordering across healthcare facilities — orders, tray slips, reports, facility configuration, and language management, all exposed through RESTful APIs.",
    architecture:
      "Built on .NET 8 with Entity Framework and MySQL for transactional data, AWS S3 for PDF storage and retrieval, and tenant-based data isolation with role-based authorization across facilities.",
    challenges:
      "Coordinating multilingual configuration, bulk PDF/QR tray slip generation, and bed/diet change workflows while keeping tenant data isolated and query performance high under multi-facility load.",
    results:
      "Shipped production plan, order summary, waiter, ward, session, and diet-wise reports with PDF/Excel export, automated scheduler and notification processing, plus ongoing code reviews, deployment support, and mentoring.",
    color: "cyan",
  },
  {
    slug: "heb-online-booking",
    name: "Hindu Endowment Board Online Booking",
    tagline: "Online booking system for temple events, services, and hall reservations.",
    tech: ["React.js", "API Integration"],
    features: [
      "Real-Time Slot Booking",
      "Rescheduling & Cancellation",
      "KIOSK Integration",
      "POS Integration (in progress)",
    ],
    overview:
      "A booking platform for the Hindu Endowment Board covering event, service, and hall reservations, built for seamless web, mobile, and in-temple use.",
    architecture:
      "React front end integrating real-time slot booking, reservation, rescheduling, and cancellation APIs, extended with KIOSK-based interfaces for walk-in, self-service bookings.",
    challenges:
      "Ensuring secure, compliant transactions across web, mobile, and KIOSK channels while extending the system to support in-person POS payments and transaction synchronization.",
    results:
      "Delivered a user-friendly booking experience across web, mobile, and KIOSK; POS integration for in-person payments is in active development.",
    color: "blue",
  },
  {
    slug: "nms-netkathir-management-service",
    name: "NMS – Netkathir Management Service",
    tagline: "Internal HR platform for employee records, leave, and payroll.",
    tech: [".NET", "React.js"],
    features: [
      "Leave Management",
      "Permission & Late Requests",
      "Payroll & Salary Processing",
      "Leave & Holiday Reports",
    ],
    overview:
      "An internal management application for handling comprehensive employee details, leave workflows, and administrative functions.",
    architecture:
      ".NET backend with a React front end managing leave requests, manager/admin approvals, permission and late-request tracking, and payroll generation.",
    challenges:
      "Building an accurate approval workflow for leave and permission requests alongside payroll processing, while maintaining data security and confidentiality.",
    results:
      "Streamlined leave and permission approvals, generated monthly and annual leave reports, and delivered accurate, timely payroll processing.",
    color: "violet",
  },
  {
    slug: "kbs-transport",
    name: "KBS – Transport",
    tagline: "Vehicle, maintenance, and travel booking management system.",
    tech: [".NET"],
    features: [
      "Vehicle Maintenance Logging",
      "Travel Booking Management",
      "Staff Salary & Bills",
      "Usage Reports",
    ],
    overview:
      "An application for managing vehicle details, maintenance schedules, and travel bookings for a transport fleet.",
    architecture:
      ".NET application handling vehicle maintenance logs, staff salary and bills, and travel booking management, with reporting on usage and maintenance history.",
    challenges:
      "Keeping vehicle usage, maintenance history, and booking data accurate and reliable through regular updates and troubleshooting.",
    results:
      "Delivered streamlined navigation and reporting on vehicle usage, maintenance history, and travel bookings, improving day-to-day fleet operations.",
    color: "amber",
  },
];

export type ArchitectureNode = {
  id: string;
  label: string;
  group: "core" | "infra";
};

export const architectureNodes: ArchitectureNode[] = [
  { id: "auth", label: "Authentication", group: "core" },
  { id: "orders", label: "Orders", group: "core" },
  { id: "facility-config", label: "Facility Config", group: "core" },
  { id: "tray-slip", label: "Tray Slip", group: "core" },
  { id: "reports", label: "Reports", group: "core" },
  { id: "notifications", label: "Notifications", group: "core" },
  { id: "aws", label: "AWS S3", group: "infra" },
  { id: "mysql", label: "MySQL", group: "infra" },
];

export const architectureLinks: [string, string][] = [
  ["auth", "orders"],
  ["auth", "facility-config"],
  ["orders", "facility-config"],
  ["orders", "tray-slip"],
  ["orders", "reports"],
  ["orders", "notifications"],
  ["tray-slip", "reports"],
  ["auth", "mysql"],
  ["orders", "mysql"],
  ["reports", "aws"],
  ["tray-slip", "aws"],
  ["notifications", "mysql"],
];

export type Certification = {
  name: string;
  issuer: string;
};

export const certifications: Certification[] = [
  { name: "Code Reviews", issuer: "Quality & Mentorship" },
  { name: "Mentoring", issuer: "Team Growth" },
  { name: "Sprint Planning", issuer: "Delivery Process" },
  { name: "Task Allocation", issuer: "Team Management" },
  { name: "Production Deployments (OKD)", issuer: "Release Ownership" },
  { name: "Team Size Managed", issuer: "People Management" },
  { name: "Problem Solving", issuer: "Engineering Practice" },
];
