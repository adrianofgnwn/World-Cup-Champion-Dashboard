import { useState, useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { RED, GREEN, WHITE, GRAY, NAVY_MID, NAVY_LIGHT, CARD_BG, CARD_BORDER, OFF_WHITE } from "../styles/theme";
import { TEAMS, predictMatch } from "../data/teams";

const BLUE = "#4a90d9";
const GOLD = "#d4af37";

function TeamPicker({ label, selected, onSelect, otherSelected }) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const filtered = TEAMS.filter(t =>
        t.name !== otherSelected &&
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    const team = TEAMS.find(t => t.name === selected);

    return (
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: GRAY, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>{label}</div>

            {/* Selected team display / dropdown trigger */}
            <button onClick={() => setOpen(!open)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                background: CARD_BG, border: `1px solid ${open ? RED : CARD_BORDER}`,
                transition: "all 0.2s",
            }}>
                {team ? (
                    <>
                        <span style={{ fontSize: 32 }}>{team.flag}</span>
                        <div style={{ flex: 1, textAlign: "left" }}>
                            <div style={{ fontSize: 16, fontWeight: 800, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>{team.name}</div>
                            <div style={{ fontSize: 11, color: GRAY }}>Elo {team.elo} · Group {team.group} · {team.conf}</div>
                        </div>
                    </>
                ) : (
                    <span style={{ flex: 1, textAlign: "left", fontSize: 14, color: GRAY }}>Select a team...</span>
                )}
                <span style={{ fontSize: 12, color: GRAY }}>{open ? "▲" : "▼"}</span>
            </button>

            {/* Dropdown */}
            {open && (
                <div style={{
                    background: NAVY_MID, border: `1px solid ${CARD_BORDER}`, borderRadius: 12,
                    marginTop: 4, overflow: "hidden", position: "relative", zIndex: 10,
                }}>
                    <input
                        type="text"
                        placeholder="Search teams..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        autoFocus
                        style={{
                            width: "100%", padding: "10px 14px", background: "transparent",
                            border: "none", borderBottom: `1px solid ${NAVY_LIGHT}`,
                            color: WHITE, fontSize: 13, outline: "none",
                        }}
                    />
                    <div style={{ maxHeight: 240, overflowY: "auto" }}>
                        {filtered.map(t => (
                            <button key={t.name} onClick={() => { onSelect(t.name); setOpen(false); setSearch(""); }} style={{
                                width: "100%", display: "flex", alignItems: "center", gap: 10,
                                padding: "8px 14px", cursor: "pointer", border: "none",
                                background: t.name === selected ? "rgba(200,16,46,0.1)" : "transparent",
                                transition: "background 0.15s",
                            }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                                    onMouseLeave={e => e.currentTarget.style.background = t.name === selected ? "rgba(200,16,46,0.1)" : "transparent"}
                            >
                                <span style={{ fontSize: 20 }}>{t.flag}</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: WHITE, flex: 1, textAlign: "left" }}>{t.name}</span>
                                <span style={{ fontSize: 11, color: GRAY }}>{t.elo}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function ProbBar({ label, value, color }) {
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900, color, fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>
                {value}%
            </div>
            <div style={{ fontSize: 11, color: GRAY, marginTop: 4, fontWeight: 600 }}>{label}</div>
            <div style={{ height: 6, background: NAVY_LIGHT, borderRadius: 3, marginTop: 8, overflow: "hidden" }}>
                <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
            </div>
        </div>
    );
}

export default function MatchPredictor() {
    const [teamA, setTeamA] = useState("Spain");
    const [teamB, setTeamB] = useState("Argentina");

    const a = TEAMS.find(t => t.name === teamA);
    const b = TEAMS.find(t => t.name === teamB);

    const result = useMemo(() => {
        if (!a || !b) return null;
        return predictMatch(a.elo, b.elo);
    }, [a, b]);

    const comparisonData = useMemo(() => {
        if (!a || !b) return [];
        return [
            { metric: "Shot Conv %", a: a.shotConv, b: b.shotConv },
            { metric: "Shot Acc %", a: a.shotAcc, b: b.shotAcc },
            { metric: "Def Save %", a: a.defSave, b: b.defSave },
            { metric: "Possession %", a: a.poss, b: b.poss },
            { metric: "Goal Diff", a: a.goalDiff, b: b.goalDiff },
            { metric: "Shot Dom.", a: a.shotDom, b: b.shotDom },
        ];
    }, [a, b]);

    const h2hStats = useMemo(() => {
        if (!a || !b) return [];
        return [
            { label: "Elo Rating", va: a.elo, vb: b.elo, better: a.elo >= b.elo ? "a" : "b" },
            { label: "Goals / Match", va: a.goals, vb: b.goals, better: a.goals >= b.goals ? "a" : "b" },
            { label: "Conceded / Match", va: a.conceded, vb: b.conceded, better: a.conceded <= b.conceded ? "a" : "b" },
            { label: "Shot Conversion", va: `${a.shotConv}%`, vb: `${b.shotConv}%`, better: a.shotConv >= b.shotConv ? "a" : "b" },
            { label: "Def. Save Rate", va: `${a.defSave}%`, vb: `${b.defSave}%`, better: a.defSave >= b.defSave ? "a" : "b" },
            { label: "xG Overperf.", va: `${a.xgOver > 0 ? "+" : ""}${a.xgOver}`, vb: `${b.xgOver > 0 ? "+" : ""}${b.xgOver}`, better: a.xgOver >= b.xgOver ? "a" : "b" },
            { label: "Win Sim %", va: `${a.sim.winner}%`, vb: `${b.sim.winner}%`, better: a.sim.winner >= b.sim.winner ? "a" : "b" },
        ];
    }, [a, b]);

    return (
        <>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 4 }}>
                MATCH PREDICTOR
            </h2>
            <p style={{ color: GRAY, fontSize: 13, marginBottom: 24 }}>
                Pick any two teams to see win/draw/loss probabilities calculated from their Elo ratings using the FIFA expected score formula.
            </p>

            {/* Team pickers */}
            <div style={{ display: "flex", gap: 20, marginBottom: 28, alignItems: "flex-start" }}>
                <TeamPicker label="Home Team" selected={teamA} onSelect={setTeamA} otherSelected={teamB} />
                <div style={{ display: "flex", alignItems: "center", paddingTop: 28, fontSize: 20, fontWeight: 900, color: GRAY, fontFamily: "'Barlow Condensed', sans-serif" }}>
                    VS
                </div>
                <TeamPicker label="Away Team" selected={teamB} onSelect={setTeamB} otherSelected={teamA} />
            </div>

            {/* Prediction result */}
            {result && a && b && (
                <>
                    {/* Probability bar */}
                    <div style={{
                        background: CARD_BG, borderRadius: 14, padding: "24px 28px",
                        border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                        marginBottom: 24,
                    }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 20, textAlign: "center" }}>Match Outcome Probabilities</h3>

                        {/* Stacked horizontal bar */}
                        <div style={{ display: "flex", height: 40, borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
                            <div style={{ width: `${result.winA}%`, background: RED, transition: "width 0.4s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {result.winA >= 10 && <span style={{ fontSize: 13, fontWeight: 800, color: WHITE }}>{result.winA}%</span>}
                            </div>
                            <div style={{ width: `${result.draw}%`, background: GOLD, transition: "width 0.4s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {result.draw >= 10 && <span style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1a" }}>{result.draw}%</span>}
                            </div>
                            <div style={{ width: `${result.winB}%`, background: BLUE, transition: "width 0.4s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {result.winB >= 10 && <span style={{ fontSize: 13, fontWeight: 800, color: WHITE }}>{result.winB}%</span>}
                            </div>
                        </div>

                        {/* Labels below */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                            <ProbBar label={`${a.name} Win`} value={result.winA} color={RED} />
                            <ProbBar label="Draw" value={result.draw} color={GOLD} />
                            <ProbBar label={`${b.name} Win`} value={result.winB} color={BLUE} />
                        </div>

                        {/* Elo difference explanation */}
                        <div style={{ background: NAVY_MID, borderRadius: 10, padding: "12px 16px", marginTop: 20, textAlign: "center" }}>
                            <span style={{ fontSize: 12, color: GRAY }}>
                                Elo difference: <strong style={{ color: WHITE }}>{Math.abs(a.elo - b.elo)} points</strong>
                                {Math.abs(a.elo - b.elo) < 20 && <span style={{ color: GOLD, marginLeft: 8 }}>— Essentially a coin flip</span>}
                                {Math.abs(a.elo - b.elo) >= 20 && Math.abs(a.elo - b.elo) < 100 && <span style={{ color: OFF_WHITE, marginLeft: 8 }}>— Slight edge to {a.elo > b.elo ? a.name : b.name}</span>}
                                {Math.abs(a.elo - b.elo) >= 100 && Math.abs(a.elo - b.elo) < 250 && <span style={{ color: GREEN, marginLeft: 8 }}>— Clear favourite: {a.elo > b.elo ? a.name : b.name}</span>}
                                {Math.abs(a.elo - b.elo) >= 250 && <span style={{ color: RED, marginLeft: 8 }}>— Heavy mismatch</span>}
                            </span>
                        </div>
                    </div>

                    {/* Head to head comparison */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        {/* Stats table */}
                        <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 16 }}>Head to Head — Stats Comparison</h3>

                            {/* Table header */}
                            <div style={{ display: "flex", alignItems: "center", padding: "0 0 10px", borderBottom: `1px solid ${NAVY_LIGHT}`, marginBottom: 4 }}>
                                <span style={{ flex: 1, fontSize: 10, color: GRAY, fontWeight: 700 }}>METRIC</span>
                                <span style={{ width: 80, textAlign: "center", fontSize: 11, fontWeight: 800, color: RED }}>{a.flag} {a.name.length > 8 ? a.name.slice(0, 7) + "." : a.name}</span>
                                <span style={{ width: 80, textAlign: "center", fontSize: 11, fontWeight: 800, color: BLUE }}>{b.flag} {b.name.length > 8 ? b.name.slice(0, 7) + "." : b.name}</span>
                            </div>

                            {h2hStats.map((s, i) => (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", padding: "10px 0",
                                    borderBottom: i < h2hStats.length - 1 ? `1px solid ${NAVY_LIGHT}22` : "none",
                                }}>
                                    <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: OFF_WHITE }}>{s.label}</span>
                                    <span style={{
                                        width: 80, textAlign: "center", fontSize: 14, fontWeight: 900,
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        color: s.better === "a" ? RED : GRAY,
                                    }}>{s.va}</span>
                                    <span style={{
                                        width: 80, textAlign: "center", fontSize: 14, fontWeight: 900,
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        color: s.better === "b" ? BLUE : GRAY,
                                    }}>{s.vb}</span>
                                </div>
                            ))}
                        </div>

                        {/* Profile comparison bar chart */}
                        <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, border: `1px solid ${CARD_BORDER}`, boxShadow: "0 2px 16px rgba(0,0,0,0.2)" }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE, marginBottom: 16 }}>Profile Comparison</h3>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={comparisonData} layout="vertical" margin={{ left: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={NAVY_LIGHT} />
                                    <XAxis type="number" tick={{ fill: GRAY, fontSize: 11 }} />
                                    <YAxis type="category" dataKey="metric" tick={{ fill: OFF_WHITE, fontSize: 11, fontWeight: 600 }} width={95} />
                                    <Tooltip content={({ active, payload, label }) => {
                                        if (!active || !payload?.length) return null;
                                        return (
                                            <div style={{ background: NAVY_MID, border: `1px solid ${NAVY_LIGHT}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: WHITE, boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
                                                <div style={{ fontWeight: 800, marginBottom: 4 }}>{label}</div>
                                                {payload.map((p, i) => (
                                                    <div key={i} style={{ color: p.fill }}>
                                                        {p.name}: <strong>{typeof p.value === "number" ? p.value.toFixed(1) : p.value}</strong>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }} />
                                    <Bar dataKey="a" name={a.name} fill={RED} fillOpacity={0.9} radius={[0, 4, 4, 0]} />
                                    <Bar dataKey="b" name={b.name} fill={BLUE} fillOpacity={0.9} radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
