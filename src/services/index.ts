// PHASE 1: mock data. PHASE 2: har function ke andar MySQL/API call lagayen, screens ko haath nahi lagana.
import { cookies } from "next/headers";
import * as db from "@/lib/mock-data";
import { DRIVER_COOKIE, ROLE_COOKIE, parseRole } from "@/lib/roles";

export const getLoads = async () => db.loads;
export const getLoad = async (id: string) => db.loads.find((x) => x.id === id);
export const getDrivers = async () => db.drivers;
export const getDriver = async (id: string) => db.drivers.find((x) => x.id === id);
export const getVehicles = async () => db.vehicles;
export const getVehicle = async (id: string) => db.vehicles.find((x) => x.id === id);
export const getBrokers = async () => db.brokers;
export const getBroker = async (id: string) => db.brokers.find((x) => x.id === id);
export const getInvoices = async () => db.invoices;
export const getInvoice = async (id: string) => db.invoices.find((x) => x.id === id);
export const getPayStatements = async () => db.payStatements;
export const getPayStatement = async (id: string) => db.payStatements.find((x) => x.id === id);
export const getAlerts = async () => db.alerts;
export const getQuotes = async () => db.quotes;
export const getQuote = async (id: string) => db.quotes.find((x) => x.id === id);
export const getApplications = async () => db.applications;
export const getApplication = async (id: string) => db.applications.find((x) => x.id === id);
export const getUsers = async () => db.users;
export const getCurrentDriverId = async () => (await cookies()).get(DRIVER_COOKIE)?.value || db.CURRENT_DRIVER_ID;
export const getCurrentRole = async () => parseRole((await cookies()).get(ROLE_COOKIE)?.value);
export const getMonthlyFinance = async () => db.monthlyFinance;
export const getDriverPerformance = async () => db.driverPerformance;
