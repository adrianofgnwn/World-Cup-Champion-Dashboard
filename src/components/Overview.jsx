import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { RED, GREEN, WHITE, GRAY, NAVY_LIGHT, NAVY_MID, CARD_BG, CARD_BORDER, OFF_WHITE } from "../styles/theme";
import { CHAMPION, NON_CHAMP } from "../data/teams";
import StatCard from "./StatCard";

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

const traits = [
    { icon: "⚽", title: "CLINICAL FINISHING", stat: "15.1% vs 9.7%", desc: "Shot conversion rate — champions are ruthlessly efficient", color: RED },
    { icon: "🛡️", title: "DEFENSIVE WALL", stat: "93.5% vs 87.0%", desc: "Save rate — almost impossible to score against", color: "#4a90d9" },
    { icon: "⚡", title: "CLUTCH FACTOR", stat: "+0.19 vs -0.13", desc: "xG overperformance — they deliver when it matters", color: GREEN },
    { icon: "👑", title: "TOTAL DOMINANCE", stat: "+1.5 vs -0.6", desc: "Goal difference — they control matches, not just survive", color: "#d4af37" },
];

const comparisons = [
    { label: "Goals / Match", champ: "2.25", other: "1.35" },
    { label: "Goals Conceded", champ: "0.79", other: "1.92" },
    { label: "Shot Conversion", champ: "15.1%", other: "9.7%" },
    { label: "xG Overperformance", champ: "+0.19", other: "-0.13" },
    { label: "Defensive Save Rate", champ: "93.5%", other: "87.0%" },
    { label: "Possession", champ: "53.5%", other: "48.6%" },
];

export default function Overview() {
    return (
        <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                <StatCard label="Best Model" value="Logistic Reg." sub="77.9% accuracy · LOO CV" accent={NAVY_LIGHT} />
                <StatCard label="ROC-AUC" value="84.7%" sub="Leave-One-Out CV" accent={RED} />
                <StatCard label="Detection" value="18/24" sub="75% champion recall" accent={GREEN} />
                <StatCard label="Data Sources" value="16" sub="946 team entries" accent={GRAY} />
            </div>

            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 16, letterSpacing: 0.5 }}>THE 4 TRAITS OF A CHAMPION</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 32 }}>
                {traits.map((t, i) => (
                    <div key={i} style={{ background: CARD_BG, borderRadius: 14, padding: "20px 18px", boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}`, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: `${t.color}10`, borderRadius: "0 14px 0 60px" }} />
                        <div style={{ fontSize: 26, marginBottom: 8 }}>{t.icon}</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: t.color, letterSpacing: 1, marginBottom: 6, fontFamily: "'Barlow Condensed', sans-serif" }}>{t.title}</div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>{t.stat}</div>
                        <div style={{ fontSize: 11, color: GRAY, marginTop: 6, lineHeight: 1.4 }}>{t.desc}</div>
                    </div>
                ))}
            </div>

            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 16 }}>CHAMPION vs NON-CHAMPION</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}` }}>
                    <ResponsiveContainer width="100%" height={350}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke={NAVY_LIGHT} />
                            <PolarAngleAxis dataKey="metric" tick={{ fill: OFF_WHITE, fontSize: 11, fontWeight: 600 }} />
                            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="Champion" dataKey="Champion" stroke={RED} fill={RED} fillOpacity={0.15} strokeWidth={2.5} />
                            <Radar name="Non-Champion" dataKey="Non-Champion" stroke={GRAY} fill={GRAY} fillOpacity={0.06} strokeWidth={2} />
                            <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}` }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 16 }}>Key Metrics Comparison</h3>
                    {comparisons.map((c, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: i < comparisons.length - 1 ? `1px solid ${NAVY_LIGHT}` : "none" }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: OFF_WHITE, flex: 1 }}>{c.label}</span>
                            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                                <div style={{ textAlign: "center", minWidth: 70 }}>
                                    <div style={{ fontSize: 18, fontWeight: 900, color: RED, fontFamily: "'Barlow Condensed', sans-serif" }}>{c.champ}</div>
                                    {i === 0 && <div style={{ fontSize: 9, color: GRAY, marginTop: 2 }}>CHAMPION</div>}
                                </div>
                                <span style={{ color: GRAY, fontSize: 11 }}>vs</span>
                                <div style={{ textAlign: "center", minWidth: 70 }}>
                                    <div style={{ fontSize: 18, fontWeight: 900, color: GRAY, fontFamily: "'Barlow Condensed', sans-serif" }}>{c.other}</div>
                                    {i === 0 && <div style={{ fontSize: 9, color: GRAY, marginTop: 2 }}>OTHER</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
