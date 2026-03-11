import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { RED, WHITE, GRAY, NAVY_MID, NAVY_LIGHT, CARD_BG, CARD_BORDER, OFF_WHITE } from "../styles/theme";
import { CHAMPION, NON_CHAMP, FEATURE_IMPORTANCE } from "../data/teams";

const TT = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: NAVY_MID, border: `1px solid ${NAVY_LIGHT}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: WHITE, boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>{label}</div>
            {payload.map((p, i) => (
                <div key={i} style={{ marginTop: 2, color: p.color || OFF_WHITE }}>
                    {p.name}: <strong>{typeof p.value === "number" ? p.value.toFixed(1) : p.value}</strong>
                </div>
            ))}
        </div>
    );
};

export default function ChampionDNA() {
    const barCompare = useMemo(() => [
        { metric: "Shot Conv %", Champion: CHAMPION.shot_conversion, "Non-Champion": NON_CHAMP.shot_conversion },
        { metric: "Shot Acc %", Champion: CHAMPION.shot_accuracy, "Non-Champion": NON_CHAMP.shot_accuracy },
        { metric: "Def Save %", Champion: CHAMPION.defensive_save_rate, "Non-Champion": NON_CHAMP.defensive_save_rate },
        { metric: "Possession %", Champion: CHAMPION.possession, "Non-Champion": NON_CHAMP.possession },
        { metric: "Goal Diff", Champion: CHAMPION.goal_difference, "Non-Champion": NON_CHAMP.goal_difference },
        { metric: "Shot Dom.", Champion: CHAMPION.shot_dominance, "Non-Champion": NON_CHAMP.shot_dominance },
    ], []);

    return (
        <>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 16 }}>CHAMPION DNA BREAKDOWN</h2>

            <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}`, marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 12 }}>Champion vs Non-Champion — Full Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barCompare} layout="vertical" margin={{ left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={NAVY_LIGHT} />
                        <XAxis type="number" tick={{ fill: GRAY, fontSize: 11 }} />
                        <YAxis type="category" dataKey="metric" tick={{ fill: OFF_WHITE, fontSize: 12, fontWeight: 600 }} width={100} />
                        <Tooltip content={<TT />} />
                        <Bar dataKey="Champion" fill={RED} fillOpacity={0.9} radius={[0, 4, 4, 0]} />
                        <Bar dataKey="Non-Champion" fill="#5a6480" radius={[0, 4, 4, 0]} />
                        <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}` }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 16 }}>Top Predictive Features</h3>
                    {FEATURE_IMPORTANCE.map((f, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                            <span style={{ fontSize: 12, fontWeight: 800, color: RED, width: 22, fontFamily: "'Barlow Condensed', sans-serif" }}>#{i + 1}</span>
                            <span style={{ fontSize: 13, flex: 1, fontWeight: 500, color: OFF_WHITE }}>{f.feat}</span>
                            <div style={{ width: 120, height: 8, background: NAVY_LIGHT, borderRadius: 4, overflow: "hidden" }}>
                                <div style={{ width: `${f.imp / 13.3 * 100}%`, height: "100%", background: i < 3 ? RED : GRAY, borderRadius: 4 }} />
                            </div>
                            <span style={{ fontSize: 11, color: GRAY, width: 38, textAlign: "right", fontWeight: 600 }}>{f.imp}%</span>
                        </div>
                    ))}
                </div>

                <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}` }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 16 }}>What Doesn't Matter</h3>
                    <div style={{ background: NAVY_MID, borderRadius: 10, padding: 16, marginBottom: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24", marginBottom: 6 }}>🟡 Discipline</div>
                        <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>
                            Champions average 2.67 cards/match vs 2.85 for non-champions. Virtually identical — being "cleaner" doesn't make you a World Cup winner.
                        </div>
                    </div>
                    <div style={{ background: NAVY_MID, borderRadius: 10, padding: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#4a90d9", marginBottom: 6 }}>📊 Model Performance</div>
                        <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>
                            Logistic Regression correctly identified 18 out of 24 champion performances (75% recall) with an ROC-AUC of 84.7%. Simple models outperformed complex ones on this small dataset.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
