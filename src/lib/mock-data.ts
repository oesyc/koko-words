import type * as T from "@/types";

export const CURRENT_DRIVER_ID = "d1"; // driver pages demo ke liye

export const brokers: T.Broker[] = [
  { id: "b1", name: "Lone Star Freight Brokers", contact: "Sarah Mitchell", phone: "(214) 555-0101", billingEmail: "ap@lonestarfreight.com", paymentTerms: "Net 30" },
  { id: "b2", name: "Gulf Coast Logistics", contact: "Tom Reynolds", phone: "(713) 555-0144", billingEmail: "billing@gulfcoastlog.com", paymentTerms: "Net 15" },
  { id: "b3", name: "Bluebonnet Brokerage", contact: "Linda Garza", phone: "(512) 555-0188", billingEmail: "invoices@bluebonnetbrk.com", paymentTerms: "Net 30" },
  { id: "b4", name: "Midwest Load Partners", contact: "Kevin Brooks", phone: "(405) 555-0190", billingEmail: "ar@midwestload.com", paymentTerms: "Net 45" },
];

export const drivers: T.Driver[] = [
  { id: "d1", name: "Marcus Johnson", phone: "(832) 555-0141", email: "marcus@kokosworldllc.com", truckId: "v1", trailerId: "v4", cdlNumber: "TX-48291037", cdlExpiry: "2027-06-14", medicalExpiry: "2026-11-20", loadedRate: 0.62, emptyRate: 0.45, status: "On duty" },
  { id: "d2", name: "Carlos Rivera", phone: "(713) 555-0178", email: "carlos@kokosworldllc.com", truckId: "v2", trailerId: "v5", cdlNumber: "TX-55120984", cdlExpiry: "2028-02-09", medicalExpiry: "2027-03-30", loadedRate: 0.6, emptyRate: 0.6, status: "On duty" },
  { id: "d3", name: "David Miller", phone: "(281) 555-0123", email: "david@kokosworldllc.com", truckId: "v3", cdlNumber: "TX-39874421", cdlExpiry: "2026-11-05", medicalExpiry: "2027-08-01", loadedRate: 0.58, emptyRate: 0.4, status: "Off duty" },
];

export const vehicles: T.Vehicle[] = [
  { id: "v1", type: "Truck", unit: "Unit 101", make: "Freightliner Cascadia 2022", plate: "TX LKP-4821", vin: "1FUJGLDR5NLAB1234", inspectionDate: "2026-03-12", nextServiceDate: "2026-11-08", registrationExpiry: "2027-01-31", insuranceExpiry: "2026-12-15" },
  { id: "v2", type: "Truck", unit: "Unit 102", make: "Kenworth T680 2021", plate: "TX MRN-7730", vin: "1XKYD49X5MJ445566", inspectionDate: "2026-05-02", nextServiceDate: "2027-01-10", registrationExpiry: "2027-04-30", insuranceExpiry: "2026-12-15" },
  { id: "v3", type: "Truck", unit: "Unit 103", make: "Volvo VNL 760 2020", plate: "TX QWE-1198", vin: "4V4NC9EH5LN778899", inspectionDate: "2026-01-20", nextServiceDate: "2026-12-01", registrationExpiry: "2026-11-30", insuranceExpiry: "2026-12-15" },
  { id: "v4", type: "Trailer", unit: "Trailer 201", make: "Utility 53' Dry Van", plate: "TX TRL-2010", vin: "1UYVS2538LU112233", inspectionDate: "2026-04-18", nextServiceDate: "2027-02-01", registrationExpiry: "2027-03-31", insuranceExpiry: "2026-12-15" },
  { id: "v5", type: "Trailer", unit: "Trailer 202", make: "Great Dane 53' Reefer", plate: "TX TRL-2024", vin: "1GRAA0624LB445577", inspectionDate: "2026-06-05", nextServiceDate: "2026-12-20", registrationExpiry: "2027-05-31", insuranceExpiry: "2026-12-15" },
];

export const loads: T.Load[] = [
  { id: "l1", loadNumber: "KW-1042", brokerId: "b1", driverId: "d1", truckId: "v1", pickup: { address: "Port Houston, 1500 Port Rd, Houston, TX 77015", city: "Houston, TX", date: "2026-10-29" }, delivery: { address: "DFW Distribution, 2200 Logistics Blvd, Dallas, TX 75261", city: "Dallas, TX", date: "2026-10-30" }, rate: 1450, loadedMiles: 239, emptyMiles: 18, status: "Delivered", hasRateCon: true, hasBol: true },
  { id: "l2", loadNumber: "KW-1043", brokerId: "b2", driverId: "d2", truckId: "v2", pickup: { address: "Alamo Foods, 410 Commerce St, San Antonio, TX 78205", city: "San Antonio, TX", date: "2026-10-30" }, delivery: { address: "Austin Retail Hub, 9100 Burnet Rd, Austin, TX 78758", city: "Austin, TX", date: "2026-10-31" }, rate: 780, loadedMiles: 80, emptyMiles: 12, status: "Delivered", hasRateCon: true, hasBol: false },
  { id: "l3", loadNumber: "KW-1044", brokerId: "b1", driverId: "d1", truckId: "v1", pickup: { address: "DFW Distribution, 2200 Logistics Blvd, Dallas, TX 75261", city: "Dallas, TX", date: "2026-10-31" }, delivery: { address: "Mid-South Warehouse, 3300 Airways Blvd, Memphis, TN 38116", city: "Memphis, TN", date: "2026-11-01" }, rate: 2100, loadedMiles: 452, emptyMiles: 9, status: "In transit", hasRateCon: true, hasBol: false },
  { id: "l4", loadNumber: "KW-1045", brokerId: "b3", driverId: "d3", truckId: "v3", pickup: { address: "Baytown Chemical Dock, 100 Bay Rd, Baytown, TX 77520", city: "Baytown, TX", date: "2026-11-01" }, delivery: { address: "Crescent Supply, 77 River Rd, New Orleans, LA 70115", city: "New Orleans, LA", date: "2026-11-02" }, rate: 1250, loadedMiles: 350, emptyMiles: 22, status: "Booked", hasRateCon: true, hasBol: false },
  { id: "l5", loadNumber: "KW-1046", brokerId: "b4", driverId: "d2", truckId: "v2", pickup: { address: "Austin Retail Hub, 9100 Burnet Rd, Austin, TX 78758", city: "Austin, TX", date: "2026-11-02" }, delivery: { address: "OKC Freight Center, 800 Meridian Ave, Oklahoma City, OK 73108", city: "Oklahoma City, OK", date: "2026-11-03" }, rate: 1900, loadedMiles: 400, emptyMiles: 30, status: "Booked", hasRateCon: true, hasBol: false },
  { id: "l6", loadNumber: "KW-1047", brokerId: "b2", driverId: "d1", truckId: "v1", pickup: { address: "Mid-South Warehouse, 3300 Airways Blvd, Memphis, TN 38116", city: "Memphis, TN", date: "2026-11-02" }, delivery: { address: "Peach State DC, 500 Fulton Ind Blvd, Atlanta, GA 30336", city: "Atlanta, GA", date: "2026-11-03" }, rate: 1600, loadedMiles: 380, emptyMiles: 14, status: "Delayed", note: "Weather delay on I-40, ETA pushed 4 hours", hasRateCon: true, hasBol: false },
];

export const invoices: T.Invoice[] = [
  { id: "i1", number: "INV-2026-031", loadNumber: "KW-1042", route: "Houston, TX → Dallas, TX", brokerId: "b1", issueDate: "2026-10-30", dueDate: "2026-11-29", linehaul: 1450, extras: [{ label: "Detention (2 hrs)", amount: 75 }], status: "Sent" },
  { id: "i2", number: "INV-2026-030", loadNumber: "KW-1037", route: "Dallas, TX → Little Rock, AR", brokerId: "b2", issueDate: "2026-10-22", dueDate: "2026-11-06", linehaul: 1320, extras: [], status: "Paid" },
  { id: "i3", number: "INV-2026-027", loadNumber: "KW-1031", route: "Houston, TX → Laredo, TX", brokerId: "b4", issueDate: "2026-09-28", dueDate: "2026-10-13", linehaul: 1180, extras: [{ label: "Lumper fee", amount: 120 }], status: "Overdue" },
  { id: "i4", number: "INV-2026-032", loadNumber: "KW-1043", route: "San Antonio, TX → Austin, TX", brokerId: "b2", issueDate: "2026-10-31", dueDate: "2026-11-15", linehaul: 780, extras: [], status: "Draft" },
];

export const payStatements: T.PayStatement[] = [
  { id: "s1", weekLabel: "Oct 19 – Oct 25, 2026", driverId: "d1", status: "Approved",
    lines: [
      { loadNumber: "KW-1036", route: "Houston, TX → Laredo, TX", deliveredOn: "2026-10-21", loadedMiles: 340, emptyMiles: 20 },
      { loadNumber: "KW-1038", route: "Laredo, TX → San Antonio, TX", deliveredOn: "2026-10-23", loadedMiles: 160, emptyMiles: 10 },
    ],
    extras: [{ label: "Detention – KW-1036", amount: 75 }], deductions: [{ label: "Cash advance", amount: 100 }] },
  { id: "s2", weekLabel: "Oct 19 – Oct 25, 2026", driverId: "d2", status: "Approved",
    lines: [{ loadNumber: "KW-1037", route: "Dallas, TX → Little Rock, AR", deliveredOn: "2026-10-22", loadedMiles: 320, emptyMiles: 25 }],
    extras: [], deductions: [] },
  { id: "s3", weekLabel: "Oct 26 – Nov 1, 2026", driverId: "d1", status: "Pending",
    lines: [{ loadNumber: "KW-1042", route: "Houston, TX → Dallas, TX", deliveredOn: "2026-10-30", loadedMiles: 239, emptyMiles: 18 }],
    extras: [{ label: "Detention – KW-1042", amount: 75 }], deductions: [] },
  { id: "s4", weekLabel: "Oct 26 – Nov 1, 2026", driverId: "d2", status: "Pending",
    lines: [{ loadNumber: "KW-1043", route: "San Antonio, TX → Austin, TX", deliveredOn: "2026-10-31", loadedMiles: 80, emptyMiles: 12 }],
    extras: [{ label: "Stop pay", amount: 50 }], deductions: [{ label: "Cash advance", amount: 150 }] },
  { id: "s5", weekLabel: "Oct 26 – Nov 1, 2026", driverId: "d3", status: "Pending",
    lines: [{ loadNumber: "KW-1040", route: "Houston, TX → Beaumont, TX", deliveredOn: "2026-10-28", loadedMiles: 85, emptyMiles: 10 }],
    extras: [], deductions: [] },
];

export const alerts: T.AlertItem[] = [
  { id: "a1", type: "Late load", title: "KW-1047 running late", detail: "Memphis, TN → Atlanta, GA · Weather delay, ETA +4 hrs", severity: "High", date: "2026-10-31" },
  { id: "a2", type: "CDL expiry", title: "David Miller – CDL expires in 5 days", detail: "CDL TX-39874421 expires Nov 5, 2026", severity: "High", date: "2026-11-05" },
  { id: "a3", type: "Medical card", title: "Marcus Johnson – medical card expires in 20 days", detail: "Expires Nov 20, 2026", severity: "Medium", date: "2026-11-20" },
  { id: "a4", type: "Service due", title: "Unit 101 – service due in 8 days", detail: "Next service Nov 8, 2026", severity: "Medium", date: "2026-11-08" },
  { id: "a5", type: "Registration", title: "Unit 103 – registration expires in 30 days", detail: "Expires Nov 30, 2026", severity: "Medium", date: "2026-11-30" },
  { id: "a6", type: "Insurance", title: "Insurance renewal due Dec 15", detail: "Policy covers 3 trucks and 2 trailers", severity: "Low", date: "2026-12-15" },
];

export const quotes: T.QuoteRequest[] = [
  { id: "q1", name: "Jennifer Adams", company: "Adams Produce Co.", phone: "(979) 555-0133", email: "jen@adamsproduce.com", pickup: "Houston, TX", delivery: "Atlanta, GA", date: "2026-11-05", details: "22 pallets, dry goods, approx 24,000 lbs. Liftgate not needed.", status: "New", receivedAt: "2026-10-31" },
  { id: "q2", name: "Robert Chen", company: "Chen Imports LLC", phone: "(346) 555-0166", email: "robert@chenimports.com", pickup: "Port Houston, TX", delivery: "Chicago, IL", date: "2026-11-10", details: "Full truckload, 40,000 lbs, palletized goods.", status: "Contacted", receivedAt: "2026-10-29" },
  { id: "q3", name: "Maria Lopez", company: "Lopez Building Supply", phone: "(210) 555-0121", email: "maria@lopezsupply.com", pickup: "San Antonio, TX", delivery: "Denver, CO", date: "2026-11-12", details: "Palletized building materials, 18 pallets.", status: "Quoted", receivedAt: "2026-10-27" },
];

export const applications: T.DriverApplication[] = [
  { id: "ap1", name: "Anthony Brooks", phone: "(832) 555-0199", email: "anthony.b@email.com", cdlClass: "Class A", experience: "6 years", endorsements: "Hazmat, Tanker", status: "New", receivedAt: "2026-10-30" },
  { id: "ap2", name: "Luis Hernandez", phone: "(713) 555-0155", email: "luis.h@email.com", cdlClass: "Class A", experience: "3 years", endorsements: "None", status: "Reviewing", receivedAt: "2026-10-26" },
  { id: "ap3", name: "Daniel Foster", phone: "(281) 555-0102", email: "d.foster@email.com", cdlClass: "Class A", experience: "10 years", endorsements: "Doubles/Triples", status: "Hired", receivedAt: "2026-10-12" },
];

export const users: T.AppUser[] = [
  { id: "u1", name: "Fola", email: "admin@kokosworldllc.com", role: "Admin", active: true },
  { id: "u2", name: "Aisha Khan", email: "dispatch@kokosworldllc.com", role: "Dispatcher", active: true },
  { id: "u3", name: "Marcus Johnson", email: "marcus@kokosworldllc.com", role: "Driver", active: true },
  { id: "u4", name: "Carlos Rivera", email: "carlos@kokosworldllc.com", role: "Driver", active: true },
  { id: "u5", name: "David Miller", email: "david@kokosworldllc.com", role: "Driver", active: false },
];

export const monthlyFinance = [
  { month: "Jun", revenue: 62000, expenses: 41000 },
  { month: "Jul", revenue: 68000, expenses: 45000 },
  { month: "Aug", revenue: 64000, expenses: 43000 },
  { month: "Sep", revenue: 76000, expenses: 48000 },
  { month: "Oct", revenue: 82000, expenses: 52000 },
  { month: "Nov", revenue: 86420, expenses: 53000 },
];
export const driverPerformance: Record<string, { onTime: number; rating: number }> = {
  d1: { onTime: 97, rating: 4.9 }, d2: { onTime: 94, rating: 4.7 }, d3: { onTime: 91, rating: 4.5 },
};
