export type LoadStatus = "Booked" | "At pickup" | "Loaded" | "In transit" | "Delivered" | "Delayed" | "Other";
export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";
export type Role = "Admin" | "Dispatcher" | "Driver";

export interface Broker { id: string; name: string; contact: string; phone: string; billingEmail: string; paymentTerms: string }
export interface Driver {
  id: string; name: string; phone: string; email: string; truckId: string; trailerId?: string; cdlNumber: string;
  cdlExpiry: string; medicalExpiry: string; loadedRate: number; emptyRate: number; status: "On duty" | "Off duty" | "Inactive";
}
export interface Vehicle {
  id: string; type: "Truck" | "Trailer"; unit: string; make: string; plate: string; vin: string;
  inspectionDate: string; nextServiceDate: string; registrationExpiry: string; insuranceExpiry: string;
}
export interface Stop { address: string; city: string; date: string }
export interface Load {
  id: string; loadNumber: string; brokerId: string; driverId: string; truckId: string;
  pickup: Stop; delivery: Stop; rate: number; loadedMiles: number; emptyMiles: number;
  status: LoadStatus; note?: string; hasRateCon: boolean; hasBol: boolean;
}
export interface Invoice {
  id: string; number: string; loadNumber: string; route: string; brokerId: string; issueDate: string; dueDate: string;
  linehaul: number; extras: { label: string; amount: number }[]; status: InvoiceStatus;
}
export interface PayLine { loadNumber: string; route: string; deliveredOn: string; loadedMiles: number; emptyMiles: number }
export interface PayStatement {
  id: string; weekLabel: string; driverId: string; status: "Pending" | "Approved"; lines: PayLine[];
  extras: { label: string; amount: number }[]; deductions: { label: string; amount: number }[];
}
export interface AlertItem {
  id: string; type: "Late load" | "CDL expiry" | "Medical card" | "Registration" | "Insurance" | "Service due";
  title: string; detail: string; severity: "High" | "Medium" | "Low"; date: string;
}
export interface QuoteRequest {
  id: string; name: string; company: string; phone: string; email: string; pickup: string; delivery: string;
  date: string; details: string; status: "New" | "Contacted" | "Quoted"; receivedAt: string;
}
export interface DriverApplication {
  id: string; name: string; phone: string; email: string; cdlClass: string; experience: string;
  endorsements: string; status: "New" | "Reviewing" | "Hired" | "Rejected"; receivedAt: string;
}
export interface AppUser { id: string; name: string; email: string; role: Role; active: boolean }
