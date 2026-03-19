import { GRAY, WHITE, RED } from "../styles/theme";

const TABS = ["Overview", "Rankings", "Champion DNA", "Simulator", "Bracket", "Match Predictor"];

export default function Header({ tab, setTab }) {
    return (
        <div style={{ padding: "32px 24px 18px", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{ fontSize: 48, marginBottom: 4 }}>🏆</div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 4, color: GRAY, fontWeight: 700, marginBottom: 6 }}>
                    FIFA World Cup 2026 · ML Analysis
                </div>
                <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, margin: "0 0 6px", color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>
                    WHAT MAKES A WORLD CUP CHAMPION?
                </h1>
                <p style={{ color: GRAY, fontSize: 12, margin: 0 }}>
                    Analyzing 86 performances across 13 World Cups · Scoring 25 contenders from 16 data sources
                </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 20 }}>
                {TABS.map(t => (
                    <button key={t} onClick={() => setTab(t)} style={{
                        padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
                        transition: "all 0.2s", border: "none", letterSpacing: 0.5,
                        background: tab === t ? RED : "rgba(255,255,255,0.06)",
                        color: tab === t ? WHITE : GRAY,
                    }}>{t}</button>
                ))}
            </div>
        </div>
    );
}
