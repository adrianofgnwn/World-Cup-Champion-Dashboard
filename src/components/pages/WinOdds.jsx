import { useState, useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { RED, GREEN, WHITE, GRAY, NAVY_MID, NAVY_LIGHT, CARD_BG, CARD_BORDER, OFF_WHITE } from "../../styles/theme.js";
import { TEAMS } from "../../data/teams.js";

const STAGES = ["R32", "R16", "QF", "SF", "Final", "Winner"];
const STAGE_KEYS = ["r32", "r16", "qf", "sf", "final", "winner"];

const TEAM_COLORS = [
    "#c8102e", "#4a90d9", "#00843d", "#d4af37",
    "#e06030", "#9b59b6", "#1abc9c", "#e74c8b",
];

const TT = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: NAVY_MID, border: `1px solid ${NAVY_LIGHT}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: WHITE, boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>{label}</div>
            {payload
                .sort((a, b) => b.value - a.value)
                .map((p, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginTop: 2 }}>
                        <span style={{ color: p.color }}>{p.name}</span>
                        <strong>{p.value}%</strong>
                    </div>
                ))}
        </div>
    );
};

export default function WinOdds() {
    const [showCount, setShowCount] = useState(8);

    // Teams sorted by win probability for this tab
    const simRanked = useMemo(() =>
            [...TEAMS].sort((a, b) => b.sim.winner - a.sim.winner),
        []);

    const topTeams = simRanked.slice(0, showCount);

    // Build progression data for the area chart
    const progressionData = useMemo(() =>
            STAGES.map((stage, i) => {
                const row = { stage };
                topTeams.forEach(t => { row[t.name] = t.sim[STAGE_KEYS[i]]; });
                return row;
            }),
        [topTeams]);

    const maxWin = simRanked[0]?.sim.winner || 1;

    return (
        <>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 4 }}>
                MONTE CARLO TOURNAMENT SIMULATOR
            </h2>
            <p style={{ color: GRAY, fontSize: 13, marginBottom: 24 }}>
                10,000 simulated tournaments using pure Elo ratings. Each match outcome drawn from P(win/draw/loss) based on Elo difference.
            </p>

            {/* Top 3 hero cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
                {simRanked.slice(0, 3).map((t, i) => (
                    <div key={t.name} style={{
                        background: CARD_BG, borderRadius: 14, padding: "22px 20px",
                        border: `1px solid ${i === 0 ? RED : CARD_BORDER}`,
                        boxShadow: i === 0 ? "0 4px 24px rgba(200,16,46,0.15)" : "0 2px 16px rgba(0,0,0,0.2)",
                        position: "relative", overflow: "hidden",
                    }}>
                        <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: TEAM_COLORS[i], borderRadius: "14px 0 0 14px" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                            <span style={{ fontSize: 32 }}>{t.flag}</span>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>{t.name}</div>
                                <div style={{ fontSize: 11, color: GRAY }}>Elo {t.elo} · Group {t.group}</div>
                            </div>
                        </div>
                        <div style={{ fontSize: 42, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>
                            {t.sim.winner}%
                        </div>
                        <div style={{ fontSize: 11, color: GRAY, marginTop: 4 }}>chance to win it all</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                            {[
                                { label: "R32", val: t.sim.r32 },
                                { label: "R16", val: t.sim.r16 },
                                { label: "QF", val: t.sim.qf },
                                { label: "SF", val: t.sim.sf },
                                { label: "Final", val: t.sim.final },
                            ].map(s => (
                                <div key={s.label} style={{ background: NAVY_MID, borderRadius: 6, padding: "4px 8px", fontSize: 10, color: OFF_WHITE }}>
                                    <span style={{ color: GRAY }}>{s.label}</span> <strong>{s.val}%</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Progression chart */}
            <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}`, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>Tournament Progression — Survival Probability</h3>
                    <div style={{ display: "flex", gap: 4 }}>
                        {[4, 8, 12].map(n => (
                            <button key={n} onClick={() => setShowCount(n)} style={{
                                padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700,
                                cursor: "pointer", border: "none", transition: "all 0.2s",
                                background: showCount === n ? RED : "rgba(255,255,255,0.06)",
                                color: showCount === n ? WHITE : GRAY,
                            }}>Top {n}</button>
                        ))}
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={340}>
                    <AreaChart data={progressionData} margin={{ left: 0, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={NAVY_LIGHT} />
                        <XAxis dataKey="stage" tick={{ fill: OFF_WHITE, fontSize: 12, fontWeight: 700 }} />
                        <YAxis tick={{ fill: GRAY, fontSize: 11 }} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                        <Tooltip content={<TT />} />
                        {topTeams.map((t, i) => (
                            <Area
                                key={t.name}
                                type="monotone"
                                dataKey={t.name}
                                stroke={TEAM_COLORS[i % TEAM_COLORS.length]}
                                fill={TEAM_COLORS[i % TEAM_COLORS.length]}
                                fillOpacity={0.06}
                                strokeWidth={2.5}
                            />
                        ))}
                        <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Full rankings */}
            <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}` }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 16 }}>Full Win Probability Rankings</h3>

                {/* Column headers */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 4px 10px", borderBottom: `1px solid ${NAVY_LIGHT}`, marginBottom: 6 }}>
                    <span style={{ width: 22, fontSize: 10, color: GRAY, fontWeight: 700 }}>#</span>
                    <span style={{ width: 28 }} />
                    <span style={{ flex: 1, fontSize: 10, color: GRAY, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Team</span>
                    <span style={{ width: 44, fontSize: 10, color: GRAY, fontWeight: 700, textAlign: "right" }}>Elo</span>
                    <span style={{ width: 200, fontSize: 10, color: GRAY, fontWeight: 700, textAlign: "center" }}>Win Probability</span>
                    <span style={{ width: 50, fontSize: 10, color: GRAY, fontWeight: 700, textAlign: "right" }}>Win %</span>
                </div>

                <div style={{ maxHeight: 520, overflowY: "auto", paddingRight: 4 }}>
                    {simRanked.map((t, i) => {
                        const barPct = (t.sim.winner / maxWin) * 100;
                        const isElite = t.sim.winner >= 7;
                        const isContender = t.sim.winner >= 2;
                        const barColor = isElite ? RED : isContender ? GREEN : GRAY;

                        return (
                            <div key={t.name} style={{
                                display: "flex", alignItems: "center", gap: 10, padding: "8px 4px",
                                borderBottom: i < simRanked.length - 1 ? `1px solid ${NAVY_LIGHT}22` : "none",
                            }}>
                                <span style={{ width: 22, fontSize: 12, fontWeight: 800, color: i < 3 ? RED : GRAY, fontFamily: "'Barlow Condensed', sans-serif" }}>{i + 1}</span>
                                <span style={{ width: 28, fontSize: 20 }}>{t.flag}</span>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: WHITE }}>{t.name}</span>
                                    <span style={{ fontSize: 11, color: GRAY, marginLeft: 6 }}>Grp {t.group}</span>
                                </div>
                                <span style={{ width: 44, fontSize: 12, color: GRAY, textAlign: "right", fontFamily: "'Barlow Condensed', sans-serif" }}>{t.elo}</span>
                                <div style={{ width: 200, height: 10, background: NAVY_LIGHT, borderRadius: 5, overflow: "hidden" }}>
                                    <div style={{
                                        width: `${barPct}%`, height: "100%", borderRadius: 5,
                                        background: barColor, transition: "width 0.5s ease",
                                        minWidth: t.sim.winner > 0 ? 3 : 0,
                                    }} />
                                </div>
                                <span style={{ width: 50, fontSize: 14, fontWeight: 900, color: barColor, textAlign: "right", fontFamily: "'Barlow Condensed', sans-serif" }}>
                                    {t.sim.winner}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
