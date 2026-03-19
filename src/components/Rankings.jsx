import { useState, useMemo } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { RED, GREEN, WHITE, GRAY, NAVY_MID, NAVY_LIGHT, CARD_BG, CARD_BORDER, OFF_WHITE } from "../styles/theme";
import { CHAMPION, TEAMS } from "../data/teams";
import TeamRow from "./TeamRow";

export default function Rankings() {
    const [selectedTeam, setSelectedTeam] = useState("Spain");
    const team = TEAMS.find(t => t.name === selectedTeam) || TEAMS[0];

    const radarData = useMemo(() => {
        const metrics = [
            { key: "shotConv", cKey: "shot_conversion", label: "Clinical Finishing", max: 22 },
            { key: "shotAcc", cKey: "shot_accuracy", label: "Shot Accuracy", max: 55 },
            { key: "defSave", cKey: "defensive_save_rate", label: "Defensive Wall", max: 100 },
            { key: "poss", cKey: "possession", label: "Possession", max: 70 },
            { key: "shotDom", cKey: "shot_dominance", label: "Shot Dominance", max: 2.5 },
            { key: "goalDiff", cKey: "goal_difference", label: "Goal Difference", max: 2.5 },
        ];
        return metrics.map(m => ({
            metric: m.label,
            Champion: Math.round((CHAMPION[m.cKey] / m.max) * 100),
            [team.name]: Math.round((team[m.key] / m.max) * 100),
        }));
    }, [team]);

    return (
        <>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 4 }}>2026 CONTENDER RANKINGS</h2>
            <p style={{ color: GRAY, fontSize: 13, marginBottom: 20 }}>
                All 48 qualified teams ranked by FIFA Elo rating. Team profiles built from 16 data sources covering friendlies, qualifiers, Nations League, and continental tournaments (2023–2026). Click a team to compare their profile against the World Cup champion DNA.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 620, overflowY: "auto", paddingRight: 8 }}>
                    {TEAMS.map(t => (
                        <TeamRow key={t.name} team={t} selected={selectedTeam === t.name} onClick={() => setSelectedTeam(t.name)} />
                    ))}
                </div>

                <div style={{ background: CARD_BG, borderRadius: 14, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <span style={{ fontSize: 40 }}>{team.flag}</span>
                        <div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>{team.name}</div>
                            <div style={{ fontSize: 12, color: GRAY }}>
                                Group {team.group} · {team.conf} · {team.matches} matches · Elo: <strong style={{ color: RED, fontSize: 16 }}>{team.elo}</strong>
                            </div>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={280}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke={NAVY_LIGHT} />
                            <PolarAngleAxis dataKey="metric" tick={{ fill: OFF_WHITE, fontSize: 10, fontWeight: 600 }} />
                            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="Champion" dataKey="Champion" stroke={RED} fill={RED} fillOpacity={0.08} strokeWidth={2} strokeDasharray="5 5" />
                            <Radar name={team.name} dataKey={team.name} stroke="#4a90d9" fill="#4a90d9" fillOpacity={0.18} strokeWidth={2.5} />
                            <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                        </RadarChart>
                    </ResponsiveContainer>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
                        {[
                            { l: "Shot Conv.", v: `${team.shotConv}%`, b: `${CHAMPION.shot_conversion}%`, ok: team.shotConv >= CHAMPION.shot_conversion * 0.9 },
                            { l: "Def. Save", v: `${team.defSave}%`, b: `${CHAMPION.defensive_save_rate}%`, ok: team.defSave >= CHAMPION.defensive_save_rate * 0.98 },
                            { l: "xG Overperf.", v: `${team.xgOver > 0 ? "+" : ""}${team.xgOver}`, b: `+${CHAMPION.xg_overperformance}`, ok: team.xgOver >= 0 },
                            { l: "Goal Diff", v: `${team.goalDiff >= 0 ? "+" : ""}${team.goalDiff}`, b: `+${CHAMPION.goal_difference}`, ok: team.goalDiff >= 1.0 },
                        ].map((s, i) => (
                            <div key={i} style={{ background: NAVY_MID, borderRadius: 10, padding: "10px 12px", borderLeft: `3px solid ${s.ok ? GREEN : RED}` }}>
                                <div style={{ fontSize: 10, color: GRAY, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>{s.l}</div>
                                <div style={{ fontSize: 20, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>{s.v}</div>
                                <div style={{ fontSize: 10, color: GRAY }}>Benchmark: {s.b}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
