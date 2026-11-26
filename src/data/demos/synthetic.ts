// Rule-based sample templates for the Synthetic Data Generator demo (no GPT-4 involved).
export type SyntheticRecord = Record<string, string | number>;

export type SyntheticTemplate = {
  id: string;
  label: string;
  columns: string[];
  build: (rand: () => number, index: number) => SyntheticRecord;
};

export const SYNTHETIC_MAX_RECORDS = 100;

const firstNames = [
  "Aarav",
  "Diya",
  "Kabir",
  "Meera",
  "Rohan",
  "Anaya",
  "Vikram",
  "Isha",
  "Arjun",
  "Sara",
  "Neil",
  "Priya",
];
const lastNames = [
  "Sharma",
  "Iyer",
  "Patel",
  "Nair",
  "Reddy",
  "Das",
  "Menon",
  "Gupta",
  "Rao",
  "Khan",
];
const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Jaipur",
];
const segments = ["Retail", "SME", "Enterprise"];
const categories = ["Electronics", "Grocery", "Apparel", "Home", "Books"];
const payments = ["Card", "UPI", "Net banking", "Wallet"];
const statuses = ["Completed", "Completed", "Completed", "Refunded", "Pending"];
const departments = ["Engineering", "Finance", "Operations", "Marketing", "HR"];
const roles = ["Analyst", "Associate", "Engineer", "Manager", "Specialist"];

const pick = <T>(rand: () => number, list: readonly T[]) => list[Math.floor(rand() * list.length)];
const between = (rand: () => number, min: number, max: number) =>
  Math.floor(rand() * (max - min + 1)) + min;
const pad = (n: number) => String(n).padStart(2, "0");
const sampleDate = (rand: () => number) =>
  `2024-${pad(between(rand, 1, 12))}-${pad(between(rand, 1, 28))}`;

export const syntheticTemplates: SyntheticTemplate[] = [
  {
    id: "customers",
    label: "Customer profiles",
    columns: ["customer_id", "name", "age", "city", "segment", "signup_date"],
    build: (rand, i) => {
      const first = pick(rand, firstNames);
      return {
        customer_id: `CUST-${String(1001 + i)}`,
        name: `${first} ${pick(rand, lastNames)}`,
        age: between(rand, 19, 72),
        city: pick(rand, cities),
        segment: pick(rand, segments),
        signup_date: sampleDate(rand),
      };
    },
  },
  {
    id: "transactions",
    label: "Sales transactions",
    columns: [
      "transaction_id",
      "customer_id",
      "category",
      "amount",
      "payment_method",
      "status",
      "date",
    ],
    build: (rand, i) => ({
      transaction_id: `TXN-${String(50001 + i)}`,
      customer_id: `CUST-${between(rand, 1001, 1500)}`,
      category: pick(rand, categories),
      amount: +(rand() * 9900 + 100).toFixed(2),
      payment_method: pick(rand, payments),
      status: pick(rand, statuses),
      date: sampleDate(rand),
    }),
  },
  {
    id: "employees",
    label: "Employee records",
    columns: ["employee_id", "name", "department", "role", "years_experience", "location"],
    build: (rand, i) => ({
      employee_id: `EMP-${String(201 + i)}`,
      name: `${pick(rand, firstNames)} ${pick(rand, lastNames)}`,
      department: pick(rand, departments),
      role: pick(rand, roles),
      years_experience: between(rand, 0, 25),
      location: pick(rand, cities),
    }),
  },
];

// Small seeded PRNG (mulberry32) so a seed always reproduces the same sample set.
export function createRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateRecords(template: SyntheticTemplate, count: number, seed: number) {
  const rand = createRandom(seed);
  return Array.from({ length: count }, (_, i) => template.build(rand, i));
}

export function parseRecordCount(value: string): { count: number } | { error: string } {
  if (value.trim() === "") return { error: "Enter how many records to generate." };
  const n = Number(value);
  if (!Number.isInteger(n)) return { error: "Use a whole number." };
  if (n < 1 || n > SYNTHETIC_MAX_RECORDS)
    return { error: `Choose between 1 and ${SYNTHETIC_MAX_RECORDS} records.` };
  return { count: n };
}
