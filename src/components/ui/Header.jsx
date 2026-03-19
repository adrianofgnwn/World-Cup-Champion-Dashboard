import { GRAY, WHITE, RED } from "../../styles/theme";
import useIsMobile from "../../hooks/useIsMobile";

const TABS = ["Overview", "Rankings", "Champion DNA", "Match Predictor", "Win Odds", "Simulator"];

export default function Header({ tab, setTab }) {
    const mobile = useIsMobile();

    return (
        <div style={{ padding: mobile ? "20px 16px 14px" : "32px 24px 18px", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{ fontSize: mobile ? 36 : 48, marginBottom: 4 }}>🏆</div>
                <div style={{ fontSize: mobile ? 9 : 11, textTransform: "uppercase", letterSpacing: mobile ? 2 : 4, color: GRAY, fontWeight: 700, marginBottom: 6 }}>
                    FIFA World Cup 2026 · ML Analysis
                </div>
                <h1 style={{ fontSize: mobile ? 22 : "clamp(22px, 4vw, 36px)", fontWeight: 900, margin: "0 0 6px", color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>
                    FIFA WORLD CUP 2026 PREDICTOR
                </h1>
                {!mobile && (
                    <p style={{ color: GRAY, fontSize: 12, margin: 0 }}>
                        13 World Cups analyzed · 48 teams profiled · 10,000 tournaments simulated · Powered by Elo ratings
                    </p>
                )}
            </div>

            <div style={{
                overflowX: "auto", WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none", marginTop: mobile ? 14 : 20,
            }}>
                <div style={{
                    display: "flex", justifyContent: mobile ? "flex-start" : "center",
                    gap: 4, minWidth: mobile ? "max-content" : "auto",
                    paddingLeft: mobile ? 4 : 0, paddingRight: mobile ? 4 : 0,
                }}>
                    {TABS.map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            padding: mobile ? "8px 14px" : "9px 20px", borderRadius: 8,
                            fontSize: mobile ? 12 : 13, fontWeight: 700, cursor: "pointer",
                            transition: "all 0.2s", border: "none", letterSpacing: 0.5,
                            whiteSpace: "nowrap",
                            background: tab === t ? RED : "rgba(255,255,255,0.06)",
                            color: tab === t ? WHITE : GRAY,
                        }}>{t}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}
