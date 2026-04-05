# 🏠 ExpoConstrucción 2026 — Analizador de Créditos Hipotecarios

An interactive mortgage rate analyzer for Costa Rica's ExpoConstrucción 2026, built with React. Compare loan conditions across 9 banks and cooperatives, with real-time monthly payment and total cost calculations.

> Data sourced from direct quotes obtained by [RIP Wallet](https://ripwallet.co) (ripwallet.notion.site/expo).

---

## Features

- **Interactive sliders** for loan amount, term (years), and currency (CRC / USD)
- **Real-time calculations** of fixed and variable monthly payments
- **Total cost breakdown** including interest and formalization fees
- **Auto-sorted results** from lowest to highest grand total
- **Detail panel** with full amortization context per option
- **Best deal banner** highlighting the cheapest option for your parameters

---

## Institutions Covered

| Institution | Type |
|---|---|
| BCR – Mi Casa BCR | State bank |
| BCR – Casa Fácil | State bank (subsidized) |
| Banco Popular | State bank |
| Banco Nacional | State bank |
| Davibank | Private bank |
| BAC | Private bank |
| Davivienda | Private bank |
| MUCAP | Other |
| Coopecaja | Cooperative |
| Coopeande | Cooperative |
| CredINVU | Other |

---

## Reference Rates Used

These are the benchmark rates used to estimate variable-rate payments. They reflect approximate values at the time of the expo (March 2026) and will change over time.

| Rate | Value |
|---|---|
| TBP (Tasa Básica Pasiva) | 4.55% |
| SOFR 3M | 5.33% |
| SOFR 6M | 5.28% |
| NY Prime Rate (NYPR) | 7.50% |
| TRI 3M | 5.10% |

---

## Getting Started

This is a single-file React component. To run it locally:

```bash
# With Vite
npm create vite@latest my-app -- --template react
cd my-app
cp expo-construccion-2026.jsx src/App.jsx
npm install
npm run dev
```

Or drop it into any React environment that supports JSX and hooks (`useState`, `useMemo`). No external dependencies required beyond React itself.

---

## How Calculations Work

**Fixed period monthly payment** uses the standard amortization formula:

```
M = P × [r(1+r)^n] / [(1+r)^n − 1]
```

Where `P` = principal, `r` = monthly rate, `n` = total months.

**Variable rate estimate** = reference benchmark + spread (floored at the stated minimum where applicable).

**Grand total** = sum of all fixed-period payments + sum of all variable-period payments + formalization cost.

> ⚠️ Variable rate payments are estimates based on current benchmark values. Actual payments will fluctuate over the life of the loan.

---

## Disclaimer

This tool is for informational and educational purposes only. All data was gathered from direct quotes during ExpoConstrucción 2026 and may not reflect current or final offer terms. Always verify conditions directly with the financial institution and consult a licensed financial advisor before making any borrowing decision.
