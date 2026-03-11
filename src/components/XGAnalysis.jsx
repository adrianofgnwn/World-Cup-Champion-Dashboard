import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, ReferenceLine, Tooltip } from "recharts";
import { RED, GREEN, WHITE, GRAY, NAVY_MID, NAVY_LIGHT, CARD_BG, CARD_BORDER } from "../styles/theme";
import { TEAMS } from "../data/teams";

export default function XGAnalysis() {
    return (
        <>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 4 }}>xG DEEP DIVE — THE CLUTCH FACTOR</h2>
            <p style={{ color: GRAY, fontSize: 13, marginBottom: 20 }}>
                Teams above the diagonal score more than expected. The gap between xG and actual goals reveals who has the "clutch factor."
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}` }}>
                    <ResponsiveContainer width="100%" height={520}>
                        <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={NAVY_LIGHT} />
                            <XAxis type="number" dataKey="xg" name="xG" domain={[0.8, 2.2]} tick={{ fill: GRAY, fontSize: 11 }} label={{ value: "Expected Goals (xG)", position: "bottom", fill: GRAY, fontSize: 12, offset: 15 }} />
                            <YAxis type="number" dataKey="goals" name="Goals" domain={[0.5, 3.5]} tick={{ fill: GRAY, fontSize: 11 }} label={{ value: "Actual Goals", angle: -90, position: "insideLeft", fill: GRAY, fontSize: 12 }} />
                            <ReferenceLine segment={[{ x: 0.8, y: 0.8 }, { x: 3.5, y: 3.5 }]} stroke={GRAY} strokeDasharray="5 5" strokeOpacity={0.4} />
                            <Tooltip content={({ active, payload }) => {
                                if (!active || !payload?.length) return null;
                                const d = payload[0]?.payload;
                                return (
                                    <div style={{ background: NAVY_MID, border: `1px solid ${NAVY_LIGHT}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: WHITE, boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
                                        <div style={{ fontWeight: 800 }}>{d.flag} {d.name} ({d.conf})</div>
                                        <div style={{ color: GRAY }}>xG: {d.xg} → Goals: {d.goals}</div>
                                        <div style={{ color: d.xgOver > 0 ? "#4ade80" : "#f87171", fontWeight: 700 }}>
                                            {d.xgOver > 0 ? `Overperforms +${d.xgOver}` : `Underperforms ${d.xgOver}`}
                                        </div>
                                    </div>
                                );
                            }} />
                            <Scatter data={TEAMS}>
                                {TEAMS.map((t, i) => (
                                    <Cell key={i} fill={t.xgOver > 0.3 ? RED : t.xgOver > 0 ? GREEN : GRAY} r={Math.max(5, Math.min(12, t.matches / 4))} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8, fontSize: 11, color: GRAY }}>
                        <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: RED, marginRight: 4 }} />Strong overperformer</span>
                        <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: GREEN, marginRight: 4 }} />Mild overperformer</span>
                        <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: GRAY, marginRight: 4 }} />Underperformer</span>
                    </div>
                </div>

                <div>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, color: WHITE, marginBottom: 14 }}>CLUTCH FACTOR RANKINGS</h3>
                    <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}` }}>
                        {[...TEAMS].sort((a, b) => b.xgOver - a.xgOver).slice(0, 10).map((t, i) => (
                            <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 9 ? `1px solid ${NAVY_LIGHT}` : "none" }}>
                                <span style={{ fontSize: 22 }}>{t.flag}</span>
                                <span style={{ fontSize: 13, fontWeight: 700, flex: 1, color: WHITE }}>{t.name}</span>
                                <div style={{ width: 140, height: 8, background: NAVY_LIGHT, borderRadius: 4, position: "relative", flexShrink: 0 }}>
                                    <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: 8, background: GRAY }} />
                                    <div style={{
                                        position: "absolute", top: 0, height: 8, borderRadius: 4,
                                        left: t.xgOver >= 0 ? "50%" : `${50 + Math.max(t.xgOver / 3.5, -0.5) * 100}%`,
                                        width: `${Math.min(Math.abs(t.xgOver) / 3.5 * 100, 50)}%`,
                                        background: t.xgOver >= 0 ? GREEN : RED,
                                    }} />
                                </div>
                                <span style={{ fontSize: 14, fontWeight: 800, color: t.xgOver >= 0 ? GREEN : RED, width: 60, textAlign: "right", fontFamily: "'Barlow Condensed', sans-serif", flexShrink: 0 }}>
                  {t.xgOver > 0 ? "+" : ""}{t.xgOver}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
