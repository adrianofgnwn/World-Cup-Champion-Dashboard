import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { RED, GREEN, WHITE, GRAY, NAVY_MID, NAVY_LIGHT, CARD_BG, CARD_BORDER, OFF_WHITE } from "../../styles/theme.js";
import { CHAMPION, NON_CHAMP, FEATURE_IMPORTANCE } from "../../data/teams.js";

const GOLD = "#d4af37";
const BLUE = "#4a90d9";

const radarData = [
    { key: "shot_conversion", label: "Clinical Finishing", max: 20 },
    { key: "shot_accuracy", label: "Shot Accuracy", max: 55 },
    { key: "defensive_save_rate", label: "Defensive Wall", max: 100 },
    { key: "possession", label: "Possession", max: 70 },
    { key: "shot_dominance", label: "Shot Dominance", max: 2.5 },
    { key: "goal_difference", label: "Goal Diff", max: 2.5 },
].map(x => ({
    metric: x.label,
    Champion: Math.round(CHAMPION[x.key] / x.max * 100),
    "Non-Champion": Math.round(NON_CHAMP[x.key] / x.max * 100),
}));

const metrics = [
    { icon: "⚽", label: "Shot Conversion", champVal: "15.1%", otherVal: "9.7%", desc: "Champions convert 1 in 6.6 shots — non-champions need 10.3", diff: "+56%", accent: RED },
    { icon: "🎯", label: "Shot Accuracy", champVal: "47.5%", otherVal: "37.3%", desc: "Nearly half of champion shots hit the target", diff: "+27%", accent: RED },
    { icon: "🛡️", label: "Defensive Save Rate", champVal: "93.5%", otherVal: "87.0%", desc: "Champions' keepers stop almost everything that comes their way", diff: "+7.5%", accent: BLUE },
    { icon: "👑", label: "Possession", champVal: "53.5%", otherVal: "48.6%", desc: "Control the ball, control the match", diff: "+10%", accent: BLUE },
    { icon: "⚡", label: "xG Overperformance", champVal: "+0.19", otherVal: "-0.13", desc: "Champions score more than expected — the clutch factor", diff: "+0.32", accent: GREEN },
    { icon: "💪", label: "Goal Difference", champVal: "+1.46", otherVal: "-0.56", desc: "Champions don't just win, they dominate by 1.5 goals per match", diff: "+2.02", accent: GOLD },
];

function MetricCard({ m }) {
    const champNum = parseFloat(m.champVal);
    const otherNum = parseFloat(m.otherVal);
    const maxVal = Math.max(Math.abs(champNum), Math.abs(otherNum)) * 1.2;
    const champPct = Math.abs(champNum) / maxVal * 100;
    const otherPct = Math.abs(otherNum) / maxVal * 100;

    return (
        <div style={{
            background: CARD_BG, borderRadius: 12, padding: "18px 20px",
            border: `1px solid ${CARD_BORDER}`, position: "relative", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: m.accent }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 0.5 }}>{m.label.toUpperCase()}</div>
                    <div style={{ fontSize: 11, color: GRAY, marginTop: 2 }}>{m.desc}</div>
                </div>
                <div style={{ background: `${m.accent}18`, borderRadius: 6, padding: "4px 10px" }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: m.accent, fontFamily: "'Barlow Condensed', sans-serif" }}>{m.diff}</span>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: RED, fontWeight: 700, width: 60, textAlign: "right" }}>CHAMP</span>
                <div style={{ flex: 1, height: 8, background: NAVY_LIGHT, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${champPct}%`, height: "100%", background: RED, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 900, color: WHITE, width: 56, textAlign: "right", fontFamily: "'Barlow Condensed', sans-serif" }}>{m.champVal}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, color: GRAY, fontWeight: 700, width: 60, textAlign: "right" }}>OTHER</span>
                <div style={{ flex: 1, height: 8, background: NAVY_LIGHT, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${otherPct}%`, height: "100%", background: "#4a5568", borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 900, color: GRAY, width: 56, textAlign: "right", fontFamily: "'Barlow Condensed', sans-serif" }}>{m.otherVal}</span>
            </div>
        </div>
    );
}

export default function ChampionDNA() {
    const maxImp = FEATURE_IMPORTANCE[0].imp;

    return (
        <>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 4 }}>CHAMPION DNA</h2>
            <p style={{ color: GRAY, fontSize: 13, marginBottom: 24 }}>
                What statistically separates World Cup winners from the rest? Analysis of 86 team performances across 13 tournaments (1974–2022).
            </p>

            {/* Top section: Radar + Model */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
                <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 8 }}>The Champion Profile</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke={NAVY_LIGHT} />
                            <PolarAngleAxis dataKey="metric" tick={{ fill: OFF_WHITE, fontSize: 11, fontWeight: 600 }} />
                            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="Champion" dataKey="Champion" stroke={RED} fill={RED} fillOpacity={0.15} strokeWidth={2.5} />
                            <Radar name="Non-Champion" dataKey="Non-Champion" stroke={GRAY} fill={GRAY} fillOpacity={0.06} strokeWidth={2} strokeDasharray="5 5" />
                            <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, border: `1px solid ${CARD_BORDER}`, flex: 1 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 14 }}>Classification Model</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            {[
                                { label: "MODEL", value: "Logistic Reg.", sub: "Outperformed complex models" },
                                { label: "ROC-AUC", value: "84.7%", sub: "Leave-One-Out CV" },
                                { label: "ACCURACY", value: "77.9%", sub: "LOO Cross-Validation" },
                                { label: "RECALL", value: "75%", sub: "18 of 24 champions detected" },
                            ].map((s, i) => (
                                <div key={i} style={{ background: NAVY_MID, borderRadius: 10, padding: "10px 12px" }}>
                                    <div style={{ fontSize: 9, color: GRAY, letterSpacing: 1.5, fontWeight: 700 }}>{s.label}</div>
                                    <div style={{ fontSize: 20, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", marginTop: 2 }}>{s.value}</div>
                                    <div style={{ fontSize: 10, color: GRAY, marginTop: 2 }}>{s.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: CARD_BG, borderRadius: 14, padding: "16px 20px", border: `1px solid ${CARD_BORDER}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 22 }}>🟡</span>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: GOLD }}>What Doesn't Matter: Discipline</div>
                                <div style={{ fontSize: 11, color: GRAY, marginTop: 2, lineHeight: 1.4 }}>
                                    Champions average 2.67 cards/match vs 2.85 for non-champions. Being "cleaner" doesn't predict success.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metric breakdown cards */}
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: WHITE, marginBottom: 14 }}>THE 6 METRICS THAT DEFINE A CHAMPION</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                {metrics.map((m, i) => <MetricCard key={i} m={m} />)}
            </div>

            {/* Feature importance */}
            <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 16 }}>Feature Importance — What the Model Learned</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
                    {FEATURE_IMPORTANCE.map((f, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: i < 3 ? RED : GRAY, width: 18, fontFamily: "'Barlow Condensed', sans-serif", textAlign: "right" }}>#{i + 1}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: OFF_WHITE, width: 120 }}>{f.feat}</span>
                            <div style={{ flex: 1, height: 6, background: NAVY_LIGHT, borderRadius: 3, overflow: "hidden" }}>
                                <div style={{
                                    width: `${(f.imp / maxImp) * 100}%`, height: "100%",
                                    background: i < 3 ? RED : i < 5 ? BLUE : GRAY,
                                    borderRadius: 3,
                                }} />
                            </div>
                            <span style={{ fontSize: 11, color: GRAY, width: 36, textAlign: "right", fontWeight: 700 }}>{f.imp}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
