import { useState, useMemo } from "react";

const TBP = 4.55; // Tasa Básica Pasiva actual aprox
const SOFR3M = 5.33; // SOFR 3 meses actual aprox
const SOFR6M = 5.28;
const NYPR = 7.5; // NY Prime Rate actual
const TRI3M = 5.1; // TRI 3 meses aprox

const banks = [
  {
    id: "bcr-micasa",
    name: "BCR – Mi Casa",
    tipo: "Estatal",
    color: "#003087",
    options: [
      {
        label: "Colones Op.1 – 7.95% fijo 2 años",
        currency: "CRC",
        fixedRate: 7.95,
        fixedYears: 2,
        varBase: TBP,
        varSpread: 4.85,
        formCost: 2,
        penalty: "2% primeros 5 años",
        finance: "90-95%",
      },
      {
        label: "Colones Op.2 – 9.35% fijo 5 años",
        currency: "CRC",
        fixedRate: 9.35,
        fixedYears: 5,
        varBase: TBP,
        varSpread: 4.85,
        formCost: 2,
        penalty: "2% primeros 5 años",
        finance: "90-95%",
      },
      {
        label: "Colones Op.3 – 9.80% fijo 8 años",
        currency: "CRC",
        fixedRate: 9.8,
        fixedYears: 8,
        varBase: TBP,
        varSpread: 4.85,
        formCost: 2,
        penalty: "2% primeros 5 años",
        finance: "90-95%",
      },
      {
        label: "Dólares – 7.35% fijo 2 años",
        currency: "USD",
        fixedRate: 7.35,
        fixedYears: 2,
        varBase: NYPR,
        varSpread: 1.75,
        formCost: 2,
        penalty: "2% primeros 5 años",
        finance: "90-95%",
      },
    ],
  },
  {
    id: "bcr-casafacil",
    name: "BCR – Casa Fácil",
    tipo: "Estatal",
    color: "#003087",
    options: [
      {
        label: "Colones – 8.20% fijo 4 años (ingreso bajo)",
        currency: "CRC",
        fixedRate: 8.2,
        fixedYears: 4,
        varBase: TBP,
        varSpread: 4.5,
        formCost: 1.75,
        penalty: "Ninguna mencionada",
        finance: "90-95%",
        note: "Ingreso bruto ¢323K–¢808K",
      },
      {
        label: "Colones – TBP+4% todo el plazo (ingreso medio)",
        currency: "CRC",
        fixedRate: TBP + 4,
        fixedYears: 0,
        varBase: TBP,
        varSpread: 4,
        formCost: 1.75,
        penalty: "Ninguna mencionada",
        finance: "90-95%",
        note: "Ingreso bruto ¢808K–¢1.94M. Casa máx ¢76.5M",
      },
    ],
  },
  {
    id: "popular",
    name: "Banco Popular",
    tipo: "Estatal",
    color: "#E87722",
    options: [
      {
        label: "Dólares preferencial – 6.75% fijo 2 años",
        currency: "USD",
        fixedRate: 6.75,
        fixedYears: 2,
        varBase: TRI3M,
        varSpread: 4,
        formCost: 2,
        penalty: "2% primeros 5 años",
        finance: "90%",
        note: "Solo clientes preferenciales",
      },
      {
        label: "Dólares – 8.11% fijo 2 años",
        currency: "USD",
        fixedRate: 8.11,
        fixedYears: 2,
        varBase: TRI3M,
        varSpread: 4,
        formCost: 2,
        penalty: "2% primeros 5 años",
        finance: "90%",
      },
    ],
  },
  {
    id: "nacional",
    name: "Banco Nacional",
    tipo: "Estatal",
    color: "#006747",
    options: [
      {
        label: "Colones Op.1 – 8.80% fijo 2 años",
        currency: "CRC",
        fixedRate: 8.8,
        fixedYears: 2,
        varBase: TBP,
        varSpread: 5.5,
        formCost: 0,
        penalty: "2% primeros 5 años",
        finance: "No especificado",
        note: "Expo: 0% formalización + avalúo reembolsable + 2 seguros",
      },
      {
        label: "Colones Op.2 – TBP+4.80% todo el plazo",
        currency: "CRC",
        fixedRate: TBP + 4.8,
        fixedYears: 0,
        varBase: TBP,
        varSpread: 4.8,
        formCost: 0,
        penalty: "2% primeros 5 años",
        finance: "No especificado",
        note: "Expo: 0% formalización + avalúo reembolsable + 2 seguros",
      },
      {
        label: "Dólares – 9.70% fijo 3 años",
        currency: "USD",
        fixedRate: 9.7,
        fixedYears: 3,
        varBase: TRI3M,
        varSpread: 10.2,
        formCost: 0,
        penalty: "2% primeros 5 años",
        finance: "No especificado",
        note: "Tasa variable muy alta",
      },
    ],
  },
  {
    id: "davibank",
    name: "Davibank",
    tipo: "Privado",
    color: "#C8102E",
    options: [
      {
        label: "Colones – 7.85% fijo 2 años",
        currency: "CRC",
        fixedRate: 7.85,
        fixedYears: 2,
        varBase: TBP,
        varSpread: 4,
        floor: 8.25,
        formCost: 1,
        penalty: "Solo abonos >$10,000",
        finance: "No especificado",
      },
      {
        label: "Dólares – 7.50% fijo 3 años",
        currency: "USD",
        fixedRate: 7.5,
        fixedYears: 3,
        varBase: NYPR,
        varSpread: 2,
        floor: 8,
        formCost: 0,
        penalty: "Solo abonos >$10,000",
        finance: "No especificado",
        note: "Fideicomiso: 0% formalización",
      },
    ],
  },
  {
    id: "bac",
    name: "BAC",
    tipo: "Privado",
    color: "#00529B",
    options: [
      {
        label: "Colones – 8.75% fijo 8 años",
        currency: "CRC",
        fixedRate: 8.75,
        fixedYears: 8,
        varBase: TBP,
        varSpread: 4.35,
        floor: 8,
        formCost: 3.13,
        penalty: "Solo abonos >$10,000",
        finance: "80%",
      },
      {
        label: "Dólares Op.1 – 7.95% fijo 3 años",
        currency: "USD",
        fixedRate: 7.95,
        fixedYears: 3,
        varBase: SOFR3M,
        varSpread: 4.9,
        formCost: 3.13,
        penalty: "Solo abonos >$10,000",
        finance: "80%",
      },
      {
        label: "Dólares Op.2 – 8.50% fijo 7 años",
        currency: "USD",
        fixedRate: 8.5,
        fixedYears: 7,
        varBase: SOFR3M,
        varSpread: 4.9,
        formCost: 3.13,
        penalty: "Solo abonos >$10,000",
        finance: "80%",
        note: "Mejor estabilidad del mercado",
      },
    ],
  },
  {
    id: "davivienda",
    name: "Davivienda",
    tipo: "Privado",
    color: "#E31837",
    options: [
      {
        label: "Colones – 8.50% fijo 2 años",
        currency: "CRC",
        fixedRate: 8.5,
        fixedYears: 2,
        varBase: TRI3M,
        varSpread: 4.7,
        floor: 9,
        formCost: 1.5,
        penalty: "Solo abonos >$10,000",
        finance: "85-90%",
        note: "⚠️ Casa debe ser concreto, <15 años, sin zonas costeras",
      },
      {
        label: "Dólares – 10% fijo 2 años",
        currency: "USD",
        fixedRate: 10,
        fixedYears: 2,
        varBase: SOFR3M,
        varSpread: 5.92,
        floor: 8.1,
        formCost: 1.5,
        penalty: "Solo abonos >$10,000",
        finance: "85-90%",
        note: "⚠️ Casa debe ser concreto, <15 años, sin zonas costeras",
      },
    ],
  },
  {
    id: "mucap",
    name: "MUCAP",
    tipo: "Otra",
    color: "#4B2D83",
    options: [
      {
        label: "Colones – 7.80% fijo 2 años",
        currency: "CRC",
        fixedRate: 7.8,
        fixedYears: 2,
        varBase: TBP,
        varSpread: 4.95,
        formCost: 1,
        penalty: "Sin penalización",
        finance: "90%",
      },
      {
        label: "Dólares – 7.25% fijo 2 años",
        currency: "USD",
        fixedRate: 7.25,
        fixedYears: 2,
        varBase: SOFR3M,
        varSpread: 5,
        formCost: 1,
        penalty: "Sin penalización",
        finance: "90%",
        note: "Años 3-4: SOFR+4%, año 5+: SOFR+5%",
      },
    ],
  },
  {
    id: "coopecaja",
    name: "Coopecaja",
    tipo: "Cooperativa",
    color: "#006B3F",
    options: [
      {
        label: "Colones – 8.45% fijo 5 años",
        currency: "CRC",
        fixedRate: 8.45,
        fixedYears: 5,
        varBase: 0,
        varSpread: 0,
        floor: 8.45,
        formCost: 1,
        penalty: "Sin penalización",
        finance: "90%",
        note: "⚠️ Variable puede llegar a 13.45% según 'factores económicos'. Afiliación: ¢11,500/mes",
      },
    ],
  },
  {
    id: "coopeande",
    name: "Coopeande",
    tipo: "Cooperativa",
    color: "#1B5E20",
    options: [
      {
        label: "Colones – 7.5% fijo 3 años",
        currency: "CRC",
        fixedRate: 7.5,
        fixedYears: 3,
        varBase: TBP,
        varSpread: 4.25,
        formCost: 0,
        penalty: "Solo abonos >$10,000",
        finance: "90%",
        note: "Años 4-5: TBP+3.85%. Afiliación: ¢11,000/mes",
      },
      {
        label: "Dólares – 7.25% fijo 3 años",
        currency: "USD",
        fixedRate: 7.25,
        fixedYears: 3,
        varBase: SOFR6M,
        varSpread: 3.85,
        formCost: 0,
        penalty: "Solo abonos >$10,000",
        finance: "90%",
        note: "Afiliación: ¢11,000/mes",
      },
    ],
  },
  {
    id: "credinvu",
    name: "CredINVU",
    tipo: "Otra",
    color: "#7B3F00",
    options: [
      {
        label: "Colones – 7% fijo 3 años, luego 10%",
        currency: "CRC",
        fixedRate: 7,
        fixedYears: 3,
        varBase: 10,
        varSpread: 0,
        formCost: 0,
        penalty: "Sin penalización",
        finance: "80%",
        note: "⚠️ Máximo ¢120M financiado. Plazo máximo 20 años",
      },
    ],
  },
];

function calcMonthly(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function fmt(val, currency) {
  if (currency === "USD") return "$" + val.toLocaleString("es-CR", { maximumFractionDigits: 0 });
  return "₡" + val.toLocaleString("es-CR", { maximumFractionDigits: 0 });
}

const tipoColors = {
  Estatal: "#1565C0",
  Privado: "#6A1B9A",
  Cooperativa: "#2E7D32",
  Otra: "#BF360C",
};

export default function App() {
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState("CRC");
  const [years, setYears] = useState(20);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const principal = currency === "CRC" ? amount * 1_000_000 : amount * 1000;

  const results = useMemo(() => {
    return banks.flatMap((bank) =>
      bank.options
        .filter((o) => o.currency === currency)
        .map((opt) => {
          const fixedMonthly = calcMonthly(principal, opt.fixedRate, years);
          const varRate = Math.max(opt.varBase + opt.varSpread, opt.floor || 0);
          const varMonthly = calcMonthly(principal, varRate, years);

          const fixedMonths = Math.min(opt.fixedYears * 12, years * 12);
          const varMonths = years * 12 - fixedMonths;

          const totalFixed = fixedMonthly * fixedMonths;
          const totalVar = varMonthly * varMonths;
          const totalPaid = totalFixed + totalVar;
          const totalInterest = totalPaid - principal;
          const formCostAmt = (principal * opt.formCost) / 100;

          return {
            bankId: bank.id,
            bankName: bank.name,
            bankColor: bank.color,
            tipo: bank.tipo,
            label: opt.label,
            fixedRate: opt.fixedRate,
            fixedYears: opt.fixedYears,
            varRate,
            fixedMonthly,
            varMonthly,
            totalPaid,
            totalInterest,
            formCostAmt,
            grandTotal: totalPaid + formCostAmt,
            note: opt.note,
            penalty: opt.penalty,
            finance: opt.finance,
          };
        })
    );
  }, [principal, currency, years]);

  const sorted = [...results].sort((a, b) => a.grandTotal - b.grandTotal);
  const best = sorted[0];

  const detail = selectedBank && selectedOption !== null
    ? results.find(r => r.bankId === selectedBank && r.label === selectedOption)
    : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e2e8f0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #1e3a5f, #0f2744)",
        borderBottom: "2px solid #f59e0b",
        padding: "32px 40px 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
            <span style={{ fontSize: 40 }}>🏠</span>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: 28,
                fontWeight: "bold",
                color: "#f59e0b",
                letterSpacing: "-0.5px",
              }}>ExpoConstrucción 2026</h1>
              <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase" }}>
                Analizador de Créditos Hipotecarios · Costa Rica
              </p>
            </div>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 14, color: "#64748b" }}>
            Condiciones cotizadas directamente a entidades financieras por RIP Wallet. TBP ref: {TBP}% · SOFR: {SOFR3M}% · Prime NY: {NYPR}%
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* Controls */}
        <div style={{
          background: "rgba(30,58,95,0.5)",
          border: "1px solid #334155",
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 32,
          backdropFilter: "blur(10px)",
        }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 16, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 2 }}>
            ⚙ Parámetros del Préstamo
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                Moneda
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                {["CRC", "USD"].map(c => (
                  <button key={c} onClick={() => setCurrency(c)} style={{
                    flex: 1,
                    padding: "10px 0",
                    borderRadius: 8,
                    border: "2px solid " + (currency === c ? "#f59e0b" : "#334155"),
                    background: currency === c ? "rgba(245,158,11,0.15)" : "rgba(15,23,42,0.5)",
                    color: currency === c ? "#f59e0b" : "#64748b",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: 15,
                    transition: "all 0.2s",
                  }}>
                    {c === "CRC" ? "₡ Colones" : "$ Dólares"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                Monto {currency === "CRC" ? "(millones ₡)" : "(miles USD)"}
              </label>
              <input
                type="range"
                min={currency === "CRC" ? 20 : 20}
                max={currency === "CRC" ? 500 : 500}
                step={currency === "CRC" ? 5 : 5}
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#f59e0b", marginBottom: 6 }}
              />
              <div style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#f59e0b" }}>
                {currency === "CRC" ? `₡${amount.toLocaleString()}M` : `$${amount.toLocaleString()}K`}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                Plazo (años)
              </label>
              <input
                type="range" min={5} max={30} step={1} value={years}
                onChange={e => setYears(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#f59e0b", marginBottom: 6 }}
              />
              <div style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#f59e0b" }}>
                {years} años
              </div>
            </div>
          </div>
        </div>

        {/* Best deal banner */}
        {best && (
          <div style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))",
            border: "1.5px solid #f59e0b",
            borderRadius: 14,
            padding: "16px 24px",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}>
            <span style={{ fontSize: 28 }}>🏆</span>
            <div>
              <div style={{ fontSize: 12, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 2 }}>Mejor opción disponible</div>
              <div style={{ fontSize: 17, fontWeight: "bold", color: "#fff" }}>{best.bankName} — {best.label}</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>Cuota inicial</div>
              <div style={{ fontSize: 20, fontWeight: "bold", color: "#34d399" }}>{fmt(best.fixedMonthly, currency)}/mes</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>Total a pagar</div>
              <div style={{ fontSize: 20, fontWeight: "bold", color: "#f87171" }}>{fmt(best.grandTotal, currency)}</div>
            </div>
          </div>
        )}

        {/* Results grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {sorted.map((r, i) => {
            const isSelected = selectedBank === r.bankId && selectedOption === r.label;
            const isBest = i === 0;
            return (
              <div
                key={r.bankId + r.label}
                onClick={() => {
                  if (isSelected) { setSelectedBank(null); setSelectedOption(null); }
                  else { setSelectedBank(r.bankId); setSelectedOption(r.label); }
                }}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, rgba(245,158,11,0.15), rgba(30,58,95,0.8))`
                    : "rgba(15,23,42,0.7)",
                  border: isSelected ? "2px solid #f59e0b" : isBest ? "1.5px solid #34d399" : "1px solid #1e293b",
                  borderRadius: 14,
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  position: "relative",
                  backdropFilter: "blur(6px)",
                }}
              >
                {isBest && (
                  <div style={{
                    position: "absolute", top: -10, left: 16,
                    background: "#34d399", color: "#0f172a",
                    fontSize: 10, fontWeight: "bold", padding: "2px 10px",
                    borderRadius: 20, textTransform: "uppercase", letterSpacing: 1,
                  }}>✓ Mejor precio</div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{
                      display: "inline-block",
                      fontSize: 10, padding: "2px 8px", borderRadius: 20, marginBottom: 6,
                      background: tipoColors[r.tipo] + "33",
                      color: tipoColors[r.tipo],
                      border: `1px solid ${tipoColors[r.tipo]}55`,
                      textTransform: "uppercase", letterSpacing: 1,
                    }}>{r.tipo}</div>
                    <div style={{ fontSize: 16, fontWeight: "bold", color: "#e2e8f0" }}>{r.bankName}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{r.label}</div>
                  </div>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: r.bankColor, marginTop: 6, flexShrink: 0,
                  }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div style={{ background: "rgba(52,211,153,0.1)", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#6ee7b7", textTransform: "uppercase", letterSpacing: 1 }}>Cuota fija inicial</div>
                    <div style={{ fontSize: 16, fontWeight: "bold", color: "#34d399" }}>{fmt(r.fixedMonthly, currency)}</div>
                    <div style={{ fontSize: 10, color: "#6ee7b7" }}>{r.fixedYears > 0 ? `${r.fixedYears} años @ ${r.fixedRate}%` : "Todo el plazo"}</div>
                  </div>
                  <div style={{ background: "rgba(248,113,113,0.1)", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, color: "#fca5a5", textTransform: "uppercase", letterSpacing: 1 }}>Cuota variable est.</div>
                    <div style={{ fontSize: 16, fontWeight: "bold", color: "#f87171" }}>{r.fixedYears < years ? fmt(r.varMonthly, currency) : "—"}</div>
                    <div style={{ fontSize: 10, color: "#fca5a5" }}>{r.fixedYears < years ? `@ ${r.varRate.toFixed(2)}%` : "N/A"}</div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #1e293b", paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Total intereses</div>
                    <div style={{ fontSize: 13, color: "#f87171", fontWeight: "bold" }}>{fmt(r.totalInterest, currency)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Formalización</div>
                    <div style={{ fontSize: 13, color: "#fbbf24" }}>{fmt(r.formCostAmt, currency)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>Gran total</div>
                    <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: "bold" }}>{fmt(r.grandTotal, currency)}</div>
                  </div>
                </div>

                {r.note && (
                  <div style={{
                    marginTop: 10, padding: "6px 10px",
                    background: "rgba(251,191,36,0.08)",
                    borderLeft: "3px solid #f59e0b",
                    borderRadius: "0 6px 6px 0",
                    fontSize: 11, color: "#fbbf24",
                  }}>{r.note}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {detail && (
          <div style={{
            marginTop: 32,
            background: "rgba(30,58,95,0.6)",
            border: "2px solid #f59e0b",
            borderRadius: 16,
            padding: "28px 32px",
          }}>
            <h3 style={{ margin: "0 0 20px", color: "#f59e0b", fontSize: 18 }}>
              📊 Detalle completo — {detail.bankName}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {[
                { label: "Tasa fija inicial", val: `${detail.fixedRate}% × ${detail.fixedYears} años` },
                { label: "Tasa variable estimada", val: `${detail.varRate.toFixed(2)}%` },
                { label: "Cuota fija mensual", val: fmt(detail.fixedMonthly, currency) },
                { label: "Cuota variable mensual", val: detail.fixedYears < years ? fmt(detail.varMonthly, currency) : "N/A" },
                { label: "Total pagado en cuotas", val: fmt(detail.totalPaid, currency) },
                { label: "Total en intereses", val: fmt(detail.totalInterest, currency) },
                { label: "Gastos de formalización", val: fmt(detail.formCostAmt, currency) },
                { label: "GRAN TOTAL a pagar", val: fmt(detail.grandTotal, currency), highlight: true },
                { label: "Penalización abonos", val: detail.penalty },
                { label: "Financiamiento máx.", val: detail.finance },
              ].map((item, i) => (
                <div key={i} style={{
                  background: item.highlight ? "rgba(245,158,11,0.1)" : "rgba(15,23,42,0.5)",
                  border: item.highlight ? "1px solid #f59e0b" : "1px solid #1e293b",
                  borderRadius: 10, padding: "12px 16px",
                }}>
                  <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: item.highlight ? 18 : 15, fontWeight: "bold", color: item.highlight ? "#f59e0b" : "#e2e8f0" }}>{item.val}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(15,23,42,0.5)", borderRadius: 10, fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>
              <strong style={{ color: "#94a3b8" }}>⚠️ Nota importante:</strong> Las tasas variables (TBP, SOFR, NYPR, TRI) son referencias actuales y <em>pueden cambiar</em> durante la vida del préstamo.
              Los cálculos de cuota variable asumen las tasas actuales de referencia. Consulte siempre con un asesor financiero antes de decidir.
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: "center", fontSize: 12, color: "#334155" }}>
          Datos tomados de cotizaciones directas a entidades durante la ExpoConstrucción 2026 · RIP Wallet (ripwallet.co)
        </div>
      </div>
    </div>
  );
}
