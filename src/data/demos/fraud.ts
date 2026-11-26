// Transparent illustrative rules for the Fraud Detection demo. Not the trained ML models.
export const transactionTypes = ["Payment", "Transfer", "Cash-out", "Debit"] as const;
export type TransactionType = (typeof transactionTypes)[number];

export type SampleTransaction = {
  type: TransactionType;
  amount: number;
  balanceBefore: number;
  hour: number;
  recentCount: number;
  newDevice: boolean;
};

export const samplePresets: { label: string; tx: SampleTransaction }[] = [
  {
    label: "Everyday payment",
    tx: {
      type: "Payment",
      amount: 1200,
      balanceBefore: 48000,
      hour: 14,
      recentCount: 1,
      newDevice: false,
    },
  },
  {
    label: "Large night transfer",
    tx: {
      type: "Transfer",
      amount: 185000,
      balanceBefore: 190000,
      hour: 3,
      recentCount: 2,
      newDevice: true,
    },
  },
  {
    label: "Rapid late-night cash-outs",
    tx: {
      type: "Cash-out",
      amount: 9500,
      balanceBefore: 60000,
      hour: 1,
      recentCount: 7,
      newDevice: false,
    },
  },
];

export type RuleResult = { id: string; label: string; points: number; triggered: boolean };

export const SUSPICIOUS_THRESHOLD = 4;

export function evaluateTransaction(tx: SampleTransaction) {
  const ratio = tx.balanceBefore > 0 ? tx.amount / tx.balanceBefore : tx.amount > 0 ? Infinity : 0;
  const rules: RuleResult[] = [
    {
      id: "exceeds",
      label: "Amount exceeds the available balance",
      points: 3,
      triggered: tx.amount > tx.balanceBefore,
    },
    {
      id: "drain",
      label: "Amount uses 80% or more of the balance",
      points: 2,
      triggered: ratio >= 0.8 && tx.amount <= tx.balanceBefore,
    },
    {
      id: "large",
      label: "Large amount (100,000 or more)",
      points: 2,
      triggered: tx.amount >= 100000,
    },
    {
      id: "type",
      label: "Transfer or cash-out transaction type",
      points: 1,
      triggered: tx.type === "Transfer" || tx.type === "Cash-out",
    },
    {
      id: "night",
      label: "Made between 00:00 and 05:59",
      points: 1,
      triggered: tx.hour >= 0 && tx.hour <= 5,
    },
    {
      id: "velocity",
      label: "5 or more transactions in the past hour",
      points: 2,
      triggered: tx.recentCount >= 5,
    },
    { id: "device", label: "Initiated from a new device", points: 1, triggered: tx.newDevice },
  ];
  const score = rules.reduce((sum, r) => sum + (r.triggered ? r.points : 0), 0);
  return { rules, score, suspicious: score >= SUSPICIOUS_THRESHOLD };
}
