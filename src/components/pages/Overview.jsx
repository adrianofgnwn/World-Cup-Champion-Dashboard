import { RED, GREEN, WHITE, GRAY, NAVY_LIGHT, CARD_BG, CARD_BORDER, OFF_WHITE } from "../../styles/theme";
import { TEAMS } from "../../data/teams";
import StatCard from "../ui/StatCard";
import useIsMobile from "../../hooks/useIsMobile";

const GOLD = "#d4af37";
const BLUE = "#4a90d9";
const PODIUM_COLORS = [RED, BLUE, GREEN];
const PODIUM_LABELS = ["1ST FAVOURITE", "2ND FAVOURITE", "3RD FAVOURITE"];

const top3 = [...TEAMS].sort((a, b) => b.sim.winner - a.sim.winner).slice(0, 3);
const tier2 = [...TEAMS].sort((a, b) => b.sim.winner - a.sim.winner).slice(3, 8);

export default function Overview() {
    const mobile = useIsMobile();

    return (
        <>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: mobile ? 8 : 12, marginBottom: mobile ? 24 : 32 }}>
                <StatCard label="Qualified Teams" value="48" sub="All profiled with Elo ratings" accent={RED} />
                <StatCard label="Simulations" value="10,000" sub="Monte Carlo tournament runs" accent={GREEN} />
                <StatCard label="Data Sources" value="16" sub="International matches 2023–2026" accent={BLUE} />
                <StatCard label="World Cups" value="13" sub="1974–2022 champion analysis" accent={GOLD} />
            </div>

            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: mobile ? 18 : 22, fontWeight: 800, color: WHITE, marginBottom: mobile ? 12 : 16, letterSpacing: 0.5 }}>
                PREDICTED FAVOURITES
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: mobile ? 12 : 16, marginBottom: mobile ? 24 : 32 }}>
                {top3.map((t, i) => (
                    <div key={t.name} style={{
                        background: CARD_BG, borderRadius: 14, padding: mobile ? "20px 16px" : "28px 22px",
                        border: `1px solid ${i === 0 ? RED + "44" : CARD_BORDER}`,
                        boxShadow: i === 0 ? "0 4px 32px rgba(200,16,46,0.1)" : "0 2px 16px rgba(0,0,0,0.2)",
                        textAlign: "center", position: "relative", overflow: "hidden",
                    }}>
                        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: PODIUM_COLORS[i] }} />
                        <div style={{ fontSize: 10, fontWeight: 800, color: PODIUM_COLORS[i], letterSpacing: 2, marginBottom: mobile ? 8 : 12, fontFamily: "'Barlow Condensed', sans-serif" }}>
                            {PODIUM_LABELS[i]}
                        </div>
                        <div style={{ fontSize: mobile ? 40 : 56, marginBottom: mobile ? 4 : 8 }}>{t.flag}</div>
                        <div style={{ fontSize: mobile ? 20 : 24, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>
                            {t.name.toUpperCase()}
                        </div>
                        <div style={{ fontSize: mobile ? 32 : 42, fontWeight: 900, color: PODIUM_COLORS[i], fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1, marginTop: mobile ? 4 : 8 }}>
                            {t.sim.winner}%
                        </div>
                        <div style={{ fontSize: 11, color: GRAY, marginTop: 4 }}>chance to win it all</div>
                        <div style={{ display: "flex", justifyContent: "center", gap: mobile ? 12 : 16, marginTop: mobile ? 12 : 16 }}>
                            <div>
                                <div style={{ fontSize: mobile ? 16 : 18, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>{t.elo}</div>
                                <div style={{ fontSize: 9, color: GRAY, letterSpacing: 1 }}>ELO</div>
                            </div>
                            <div style={{ width: 1, background: NAVY_LIGHT }} />
                            <div>
                                <div style={{ fontSize: mobile ? 16 : 18, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>{t.sim.final}%</div>
                                <div style={{ fontSize: 9, color: GRAY, letterSpacing: 1 }}>REACH FINAL</div>
                            </div>
                            <div style={{ width: 1, background: NAVY_LIGHT }} />
                            <div>
                                <div style={{ fontSize: mobile ? 16 : 18, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>Grp {t.group}</div>
                                <div style={{ fontSize: 9, color: GRAY, letterSpacing: 1 }}>GROUP</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Key insight */}
            <div style={{
                background: `linear-gradient(135deg, rgba(200,16,46,0.04), rgba(42,57,141,0.04))`,
                borderRadius: 14, padding: mobile ? "18px 16px" : "24px 28px", marginBottom: mobile ? 24 : 32,
                border: `1px solid ${NAVY_LIGHT}`,
            }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: mobile ? 10 : 16 }}>
                    <div style={{ fontSize: mobile ? 24 : 32, lineHeight: 1 }}>📊</div>
                    <div>
                        <div style={{ fontSize: mobile ? 14 : 16, fontWeight: 800, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 0.5, marginBottom: 8 }}>
                            KEY FINDING: THE BIG 3 ARE IN A DEAD HEAT
                        </div>
                        <p style={{ fontSize: mobile ? 12 : 13, color: OFF_WHITE, lineHeight: 1.6, margin: 0 }}>
                            After 10,000 simulated tournaments, Spain, Argentina, and France are separated by less than 1 percentage point — well within the margin of statistical noise.
                            The model says there is no clear favourite. What separates them isn't team quality — it's group draw luck and bracket path.
                        </p>
                        {!mobile && (
                            <p style={{ fontSize: 12, color: GRAY, lineHeight: 1.5, margin: "10px 0 0" }}>
                                Argentina edges ahead due to an easier bracket path (right side, weaker group).
                                Spain has the highest Elo but faces tougher opponents earlier.
                                France gets two routes to the trophy depending on whether they finish 1st or 2nd in their group.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Dark horses */}
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: mobile ? 18 : 22, fontWeight: 800, color: WHITE, marginBottom: mobile ? 12 : 16 }}>
                DARK HORSES
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 10, marginBottom: 16 }}>
                {tier2.map(t => (
                    <div key={t.name} style={{
                        background: CARD_BG, borderRadius: 12, padding: mobile ? "12px 10px" : "16px 14px",
                        border: `1px solid ${CARD_BORDER}`, textAlign: "center",
                    }}>
                        <div style={{ fontSize: mobile ? 28 : 32, marginBottom: 6 }}>{t.flag}</div>
                        <div style={{ fontSize: mobile ? 12 : 13, fontWeight: 800, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>{t.name}</div>
                        <div style={{ fontSize: mobile ? 20 : 24, fontWeight: 900, color: GOLD, fontFamily: "'Barlow Condensed', sans-serif", marginTop: 4 }}>{t.sim.winner}%</div>
                        <div style={{ fontSize: 10, color: GRAY, marginTop: 2 }}>Elo {t.elo}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
