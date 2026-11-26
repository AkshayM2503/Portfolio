// Fictional sample inventory and demo codes for the MedConnect walkthrough. No real prescriptions.
export type DemoMedicine = { id: string; name: string; form: string; stock: number };

export const demoInventory: DemoMedicine[] = [
  { id: "m1", name: "Sample Medicine A", form: "Tablet strip", stock: 6 },
  { id: "m2", name: "Sample Medicine B", form: "Capsule strip", stock: 2 },
  { id: "m3", name: "Sample Medicine C", form: "Syrup bottle", stock: 0 },
  { id: "m4", name: "Sample Medicine D", form: "Sachet", stock: 9 },
];

export const demoCodes: Record<string, { allowed: string[] }> = {
  "DEMO-1234": { allowed: ["m1", "m2", "m3"] },
  "DEMO-5678": { allowed: ["m2", "m4"] },
};

export const MAX_QTY_PER_ITEM = 3;

export const medSteps = ["Start", "Verify", "Select", "Review", "Dispense"] as const;

export function verifyDemoCode(code: string) {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return { error: "Enter one of the demo codes shown below." };
  const match = demoCodes[normalized];
  if (!match)
    return { error: "Code not recognised. This demo only accepts the sample codes listed." };
  return { code: normalized, allowed: match.allowed };
}
