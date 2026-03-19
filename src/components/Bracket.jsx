import { useState, useMemo, useRef, useCallback } from "react";
import { RED, GREEN, WHITE, GRAY, NAVY_MID, NAVY_LIGHT, CARD_BG, CARD_BORDER, OFF_WHITE } from "../styles/theme";
import { TEAMS, predictMatch } from "../data/teams";

// ─── 3-letter codes ───
const CODE = {
    "Algeria":"ALG","Argentina":"ARG","Australia":"AUS","Austria":"AUT","Belgium":"BEL",
    "Brazil":"BRA","Cabo Verde":"CPV","Canada":"CAN","Colombia":"COL","Cote d'Ivoire":"CIV",
    "Croatia":"CRO","Curacao":"CUR","DR Congo":"COD","Denmark":"DEN","Ecuador":"ECU",
    "Egypt":"EGY","England":"ENG","France":"FRA","Germany":"GER","Ghana":"GHA",
    "Haiti":"HAI","Iran":"IRN","Iraq":"IRQ","Italy":"ITA","Japan":"JPN","Jordan":"JOR",
    "Mexico":"MEX","Morocco":"MAR","Netherlands":"NED","New Zealand":"NZL","Norway":"NOR",
    "Panama":"PAN","Paraguay":"PAR","Portugal":"POR","Qatar":"QAT","Saudi Arabia":"KSA",
    "Scotland":"SCO","Senegal":"SEN","South Africa":"RSA","South Korea":"KOR","Spain":"ESP",
    "Switzerland":"SUI","Tunisia":"TUN","Turkey":"TUR","USA":"USA","Ukraine":"UKR",
    "Uruguay":"URU","Uzbekistan":"UZB",
};

// ─── Bracket geometry ───
const MW = 100, MH = 46, GAP = 16, STEP = 58;
const CX = [0, 116, 232, 348, 464, 580, 696, 812, 928];
const R32Y = Array.from({ length: 8 }, (_, i) => i * STEP);
const R16Y = Array.from({ length: 4 }, (_, i) => (R32Y[i * 2] + R32Y[i * 2 + 1]) / 2);
const QFY = Array.from({ length: 2 }, (_, i) => (R16Y[i * 2] + R16Y[i * 2 + 1]) / 2);
const SFY = (QFY[0] + QFY[1]) / 2;
const FY = SFY;
const BW = CX[8] + MW, BH = R32Y[7] + MH + 8;

const GOLD = "#d4af37";

// ─── R32 bracket template: [groupPosition, groupLetter] ───
// 3rd place slots marked as [3, null] — assigned dynamically
const R32_TEMPLATE = {
    left: [
        [["1","A"], ["3",null]],  // L0
        [["2","C"], ["2","D"]],   // L1
        [["1","B"], ["3",null]],  // L2
        [["2","A"], ["2","B"]],   // L3
        [["1","E"], ["3",null]],  // L4
        [["1","F"], ["2","E"]],   // L5
        [["1","G"], ["3",null]],  // L6
        [["1","H"], ["2","F"]],   // L7
    ],
    right: [
        [["1","C"], ["3",null]],  // R0
        [["2","I"], ["2","J"]],   // R1
        [["1","D"], ["3",null]],  // R2
        [["2","K"], ["2","L"]],   // R3
        [["1","I"], ["3",null]],  // R4
        [["1","J"], ["2","G"]],   // R5
        [["1","K"], ["3",null]],  // R6
        [["1","L"], ["2","H"]],   // R7
    ],
};
// Which group winners face 3rd-place teams (to avoid same-group)
const THIRD_FORBIDDEN = ["A","B","E","G","C","D","I","K"];

// ─── Seeded RNG ───
function createRNG(seed) {
    let s = (seed % 2147483647 + 2147483647) % 2147483647 || 1;
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function genGoals(rng) {
    const r = rng();
    return r < 0.28 ? 0 : r < 0.55 ? 1 : r < 0.82 ? 2 : r < 0.95 ? 3 : 4;
}

function simMatch(a, b, rng, knockout = false) {
    const p = predictMatch(a.elo, b.elo);
    const roll = rng() * 100;
    let gA = genGoals(rng), gB = genGoals(rng), pen = false;

    if (roll < p.winA) {
        if (gA <= gB) gA = gB + 1;
    } else if (roll < p.winA + p.draw) {
        gB = gA;
        if (knockout) pen = true;
    } else {
        if (gB <= gA) gB = gA + 1;
    }

    let winner;
    if (pen) {
        const bias = 0.5 + (p.winA / 100 - 0.5) * 0.25;
        winner = rng() < bias ? "A" : "B";
    } else {
        winner = gA > gB ? "A" : "B";
    }

    return { a, b, gA, gB, winner, pen };
}

// ─── Group stage simulation ───
function simGroups(rng) {
    const grouped = {};
    TEAMS.forEach(t => { (grouped[t.group] ||= []).push(t); });

    const results = {};
    for (const [g, teams] of Object.entries(grouped)) {
        const pts = {}, gd = {}, gf = {};
        teams.forEach(t => { pts[t.name] = 0; gd[t.name] = 0; gf[t.name] = 0; });
        const matches = [];
        for (let i = 0; i < teams.length; i++)
            for (let j = i + 1; j < teams.length; j++) {
                const m = simMatch(teams[i], teams[j], rng);
                gf[teams[i].name] += m.gA; gf[teams[j].name] += m.gB;
                gd[teams[i].name] += m.gA - m.gB; gd[teams[j].name] += m.gB - m.gA;
                if (m.winner === "A") pts[teams[i].name] += 3;
                else if (m.winner === "B") pts[teams[j].name] += 3;
                else { pts[teams[i].name]++; pts[teams[j].name]++; }
                matches.push(m);
            }
        const standings = [...teams].sort((a, b) =>
            (pts[b.name] - pts[a.name]) || (gd[b.name] - gd[a.name]) || (gf[b.name] - gf[a.name])
        );
        results[g] = { standings, pts, gd };
    }
    return results;
}

// ─── Build R32 matchups from group results ───
function buildR32(groupResults) {
    const pos = {}; // "1A" → team, "2A" → team, etc.
    const thirds = [];
    for (const [g, { standings }] of Object.entries(groupResults)) {
        pos[`1${g}`] = standings[0];
        pos[`2${g}`] = standings[1];
        thirds.push({ ...standings[2], fromGroup: g, pts: groupResults[g].pts[standings[2].name], gd: groupResults[g].gd[standings[2].name] });
    }
    // Best 8 third-place teams
    thirds.sort((a, b) => (b.pts - a.pts) || (b.gd - a.gd) || (b.elo - a.elo));
    const qual3 = thirds.slice(0, 8);
    const elim3 = new Set(thirds.slice(8).map(t => t.name));

    // Assign 3rd-place teams to bracket slots, avoiding same-group
    const assigned = Array(8).fill(null);
    const used = new Set();
    for (let slot = 0; slot < 8; slot++) {
        const forbidden = THIRD_FORBIDDEN[slot];
        const pick = qual3.find(t => t.fromGroup !== forbidden && !used.has(t.name));
        if (pick) { assigned[slot] = pick; used.add(pick.name); }
    }
    // Fill remaining slots with any unassigned (edge case)
    qual3.filter(t => !used.has(t.name)).forEach(t => {
        const idx = assigned.indexOf(null);
        if (idx >= 0) { assigned[idx] = t; used.add(t.name); }
    });

    // Build R32 matches
    let thirdIdx = 0;
    const resolve = ([position, group]) => {
        if (position === "3") return assigned[thirdIdx++];
        return pos[`${position}${group}`];
    };

    thirdIdx = 0;
    const left = R32_TEMPLATE.left.map(([a, b]) => [resolve(a), resolve(b)]);
    const right = R32_TEMPLATE.right.map(([a, b]) => [resolve(a), resolve(b)]);
    return { left, right, elim3 };
}

// ─── Match slot component ───
function Slot({ match, flip }) {
    if (!match) {
        return (
            <div style={{ width: MW, height: MH, background: "rgba(255,255,255,0.02)", borderRadius: 6, border: `1px solid ${NAVY_LIGHT}33` }} />
        );
    }
    const { a, b, gA, gB, winner, pen } = match;
    const row = (team, goals, isWinner) => (
        <div style={{
            display: "flex", alignItems: "center", gap: 4, padding: "0 6px",
            height: MH / 2, fontSize: 11, fontWeight: isWinner ? 800 : 500,
            color: isWinner ? WHITE : GRAY,
            background: isWinner ? "rgba(200,16,46,0.08)" : "transparent",
        }}>
            <span style={{ fontSize: 13 }}>{team.flag}</span>
            <span style={{ flex: 1, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 0.5 }}>{CODE[team.name] || team.name.slice(0, 3).toUpperCase()}</span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 12 }}>
                {goals}{pen && isWinner ? " ●" : ""}
            </span>
        </div>
    );
    return (
        <div style={{
            width: MW, height: MH, background: CARD_BG, borderRadius: 6,
            border: `1px solid ${NAVY_LIGHT}`, overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}>
            {row(a, gA, winner === "A")}
            <div style={{ height: 1, background: NAVY_LIGHT }} />
            {row(b, gB, winner === "B")}
        </div>
    );
}

// ─── SVG connector lines ───
function Connectors({ phase }) {
    const phases = ["r32", "r16", "qf", "sf", "final"];
    const pi = phases.indexOf(phase);
    const paths = [];
    const hm = MH / 2; // half match height

    const addPair = (cx, nx, yAs, yNext, side, roundPhase) => {
        const visible = pi >= phases.indexOf(roundPhase);
        const opacity = visible ? 0.5 : 0.12;
        for (let i = 0; i < yNext.length; i++) {
            const ya = yAs[i * 2] + hm, yb = yAs[i * 2 + 1] + hm, yn = yNext[i] + hm;
            let xs, xe, mx;
            if (side === "left") {
                xs = cx + MW; xe = nx; mx = (xs + xe) / 2;
            } else {
                xs = cx; xe = nx + MW; mx = (xs + xe) / 2;
            }
            paths.push(<path key={`${roundPhase}-${side}-${i}-a`} d={`M${xs} ${ya} H${mx} V${yn} H${xe}`} stroke={NAVY_LIGHT} fill="none" strokeWidth={1.5} opacity={opacity} />);
            paths.push(<path key={`${roundPhase}-${side}-${i}-b`} d={`M${xs} ${yb} H${mx}`} stroke={NAVY_LIGHT} fill="none" strokeWidth={1.5} opacity={opacity} />);
        }
    };

    const addStraight = (cx, nx, y, side, roundPhase) => {
        const visible = pi >= phases.indexOf(roundPhase);
        const opacity = visible ? 0.5 : 0.12;
        const xs = side === "left" ? cx + MW : cx;
        const xe = side === "left" ? nx : nx + MW;
        paths.push(<path key={`${roundPhase}-${side}-s`} d={`M${xs} ${y + hm} H${xe}`} stroke={NAVY_LIGHT} fill="none" strokeWidth={1.5} opacity={opacity} />);
    };

    // Left side
    addPair(CX[0], CX[1], R32Y, R16Y, "left", "r16");
    addPair(CX[1], CX[2], R16Y, QFY, "left", "qf");
    addPair(CX[2], CX[3], QFY, [SFY], "left", "sf");
    addStraight(CX[3], CX[4], SFY, "left", "final");
    // Right side
    addPair(CX[8], CX[7], R32Y, R16Y, "right", "r16");
    addPair(CX[7], CX[6], R16Y, QFY, "right", "qf");
    addPair(CX[6], CX[5], QFY, [SFY], "right", "sf");
    addStraight(CX[5], CX[4], SFY, "right", "final");

    return <svg style={{ position: "absolute", top: 0, left: 0, width: BW, height: BH, pointerEvents: "none" }}>{paths}</svg>;
}

// ─── Group card ───
function GroupCard({ g, data, elim3, visible }) {
    if (!data || !visible) {
        return (
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "8px 10px", border: `1px solid ${NAVY_LIGHT}33` }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: GRAY, marginBottom: 4 }}>GROUP {g}</div>
                {[0, 1, 2, 3].map(i => <div key={i} style={{ height: 18, borderRadius: 3, background: "rgba(255,255,255,0.02)", marginTop: 3 }} />)}
            </div>
        );
    }
    return (
        <div style={{ background: CARD_BG, borderRadius: 8, padding: "8px 10px", border: `1px solid ${CARD_BORDER}` }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: OFF_WHITE, marginBottom: 4, letterSpacing: 1 }}>GROUP {g}</div>
            {data.standings.map((t, i) => {
                const isElim = i === 3 || (i === 2 && elim3?.has(t.name));
                const color3 = i === 2 && !isElim ? GOLD : null;
                return (
                    <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 0", fontSize: 11, color: isElim ? "#4a5568" : i < 2 ? WHITE : color3 || GRAY }}>
                        <span style={{ fontSize: 12 }}>{t.flag}</span>
                        <span style={{ flex: 1, fontWeight: i < 2 ? 700 : 500 }}>{CODE[t.name] || t.name.slice(0, 3)}</span>
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, width: 16, textAlign: "right" }}>{data.pts[t.name]}</span>
                        <span style={{ fontSize: 10, width: 24, textAlign: "right", color: isElim ? "#4a5568" : GRAY }}>{data.gd[t.name] > 0 ? "+" : ""}{data.gd[t.name]}</span>
                        <span style={{ fontSize: 9, width: 10, textAlign: "center" }}>
                            {isElim ? "" : i < 2 ? "✓" : "✓"}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Main Bracket component ───
export default function Bracket() {
    const [phase, setPhase] = useState("idle");
    const [groups, setGroups] = useState(null);
    const [r32Data, setR32Data] = useState(null);
    const [elim3, setElim3] = useState(null);
    const [matches, setMatches] = useState({ r32: [], r16: [], qf: [], sf: [], final: null });
    const [winner, setWinner] = useState(null);
    const [simCount, setSimCount] = useState(0);
    const timers = useRef([]);

    const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    const delay = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };

    const simulate = useCallback(() => {
        clearTimers();
        const seed = Date.now() + simCount;
        setSimCount(c => c + 1);
        setPhase("idle"); setGroups(null); setR32Data(null); setElim3(null); setWinner(null);
        setMatches({ r32: [], r16: [], qf: [], sf: [], final: null });

        const rng = createRNG(seed);

        delay(() => {
            // Group stage
            const gr = simGroups(rng);
            setGroups(gr);
            setPhase("groups");

            delay(() => {
                // Build & simulate R32
                const { left, right, elim3: e3 } = buildR32(gr);
                setElim3(e3);
                const r32 = [...left, ...right].map(([a, b]) => simMatch(a, b, rng, true));
                setMatches(m => ({ ...m, r32 }));
                setR32Data({ left, right });
                setPhase("r32");

                delay(() => {
                    // R16
                    const r16 = [];
                    for (let i = 0; i < 8; i++) {
                        const w1 = r32[i * 2].winner === "A" ? r32[i * 2].a : r32[i * 2].b;
                        const w2 = r32[i * 2 + 1].winner === "A" ? r32[i * 2 + 1].a : r32[i * 2 + 1].b;
                        r16.push(simMatch(w1, w2, rng, true));
                    }
                    setMatches(m => ({ ...m, r16 }));
                    setPhase("r16");

                    delay(() => {
                        // QF
                        const qf = [];
                        for (let i = 0; i < 4; i++) {
                            const w1 = r16[i * 2].winner === "A" ? r16[i * 2].a : r16[i * 2].b;
                            const w2 = r16[i * 2 + 1].winner === "A" ? r16[i * 2 + 1].a : r16[i * 2 + 1].b;
                            qf.push(simMatch(w1, w2, rng, true));
                        }
                        setMatches(m => ({ ...m, qf }));
                        setPhase("qf");

                        delay(() => {
                            // SF
                            const sf = [];
                            for (let i = 0; i < 2; i++) {
                                const w1 = qf[i * 2].winner === "A" ? qf[i * 2].a : qf[i * 2].b;
                                const w2 = qf[i * 2 + 1].winner === "A" ? qf[i * 2 + 1].a : qf[i * 2 + 1].b;
                                sf.push(simMatch(w1, w2, rng, true));
                            }
                            setMatches(m => ({ ...m, sf }));
                            setPhase("sf");

                            delay(() => {
                                // Final
                                const w1 = sf[0].winner === "A" ? sf[0].a : sf[0].b;
                                const w2 = sf[1].winner === "A" ? sf[1].a : sf[1].b;
                                const f = simMatch(w1, w2, rng, true);
                                setMatches(m => ({ ...m, final: f }));
                                setPhase("final");

                                delay(() => {
                                    const champ = f.winner === "A" ? f.a : f.b;
                                    setWinner(champ);
                                    setPhase("done");
                                }, 1200);
                            }, 1500);
                        }, 1500);
                    }, 1500);
                }, 1500);
            }, 1500);
        }, 800);
    }, [simCount]);

    // Match data lookup for rendering
    const getMatch = (round, idx) => {
        if (round === "final") return matches.final;
        return matches[round]?.[idx] || null;
    };

    // Round labels
    const roundLabel = (col) => {
        const labels = ["R32", "R16", "QF", "SF", "FINAL", "SF", "QF", "R16", "R32"];
        return labels[col];
    };

    const phaseOrder = ["idle", "groups", "r32", "r16", "qf", "sf", "final", "done"];
    const phaseIdx = phaseOrder.indexOf(phase);
    const isRunning = phaseIdx > 0 && phaseIdx < 7;

    return (
        <>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 4 }}>
                TOURNAMENT BRACKET
            </h2>
            <p style={{ color: GRAY, fontSize: 13, marginBottom: 20 }}>
                Simulate a complete World Cup 2026 tournament. Each match uses Elo-based probabilities with randomized outcomes.
            </p>

            {/* Simulate button */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <button onClick={simulate} disabled={isRunning} style={{
                    padding: "10px 28px", borderRadius: 8, fontSize: 14, fontWeight: 800,
                    cursor: isRunning ? "not-allowed" : "pointer", border: "none",
                    background: isRunning ? NAVY_LIGHT : RED, color: WHITE,
                    fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1,
                    opacity: isRunning ? 0.6 : 1, transition: "all 0.2s",
                }}>
                    {phase === "idle" ? "⚡ SIMULATE TOURNAMENT" : isRunning ? "SIMULATING..." : "⚡ RE-SIMULATE"}
                </button>
                {phase !== "idle" && (
                    <span style={{ fontSize: 12, color: GRAY, fontWeight: 600 }}>
                        {phase === "groups" && "📋 Group stage..."}
                        {phase === "r32" && "🏟️ Round of 32..."}
                        {phase === "r16" && "🏟️ Round of 16..."}
                        {phase === "qf" && "🏟️ Quarter-Finals..."}
                        {phase === "sf" && "🏟️ Semi-Finals..."}
                        {phase === "final" && "🏆 The Final..."}
                        {phase === "done" && "✅ Tournament complete"}
                    </span>
                )}
            </div>

            {/* Winner banner */}
            {winner && (
                <div style={{
                    background: `linear-gradient(135deg, rgba(212,175,55,0.15), rgba(200,16,46,0.1))`,
                    borderRadius: 14, padding: "20px 28px", marginBottom: 24,
                    border: `1px solid ${GOLD}44`, textAlign: "center",
                    boxShadow: `0 4px 32px rgba(212,175,55,0.15)`,
                }}>
                    <div style={{ fontSize: 36, marginBottom: 4 }}>🏆</div>
                    <div style={{ fontSize: 48 }}>{winner.flag}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: GOLD, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 2, marginTop: 4 }}>
                        {winner.name.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 13, color: GRAY, marginTop: 4 }}>FIFA World Cup 2026 Champion</div>
                </div>
            )}

            {/* Group stage results */}
            {phaseIdx >= 1 && (
                <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: OFF_WHITE, marginBottom: 10 }}>
                        GROUP STAGE {phaseIdx >= 2 && <span style={{ color: GRAY, fontWeight: 500 }}>— 24 teams + 8 best 3rd advance</span>}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                        {"ABCDEFGHIJKL".split("").map(g => (
                            <GroupCard key={g} g={g} data={groups?.[g]} elim3={elim3} visible={phaseIdx >= 1} />
                        ))}
                    </div>
                </div>
            )}

            {/* Bracket */}
            {phaseIdx >= 2 && (
                <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: OFF_WHITE, marginBottom: 10 }}>KNOCKOUT BRACKET</h3>

                    {/* Round labels */}
                    <div style={{ display: "flex", width: BW, marginBottom: 6 }}>
                        {CX.map((x, i) => (
                            <div key={i} style={{
                                position: "relative", left: x, width: MW,
                                textAlign: "center", fontSize: 10, fontWeight: 800,
                                color: i === 4 ? GOLD : GRAY, letterSpacing: 1,
                                position: "absolute",
                            }}>
                            </div>
                        ))}
                    </div>
                    {/* Round labels bar */}
                    <div style={{ position: "relative", width: BW, height: 20, marginBottom: 8 }}>
                        {CX.map((x, i) => (
                            <div key={i} style={{
                                position: "absolute", left: x, width: MW,
                                textAlign: "center", fontSize: 10, fontWeight: 800,
                                color: i === 4 ? GOLD : GRAY, letterSpacing: 1,
                            }}>
                                {roundLabel(i)}
                            </div>
                        ))}
                    </div>

                    <div style={{ position: "relative", width: BW, height: BH, overflowX: "auto" }}>
                        {/* SVG connector lines */}
                        <Connectors phase={phase} />

                        {/* Left R32 */}
                        {R32Y.map((y, i) => (
                            <div key={`lr32-${i}`} style={{ position: "absolute", left: CX[0], top: y }}>
                                <Slot match={getMatch("r32", i)} />
                            </div>
                        ))}
                        {/* Left R16 */}
                        {R16Y.map((y, i) => (
                            <div key={`lr16-${i}`} style={{ position: "absolute", left: CX[1], top: y }}>
                                <Slot match={getMatch("r16", i)} />
                            </div>
                        ))}
                        {/* Left QF */}
                        {QFY.map((y, i) => (
                            <div key={`lqf-${i}`} style={{ position: "absolute", left: CX[2], top: y }}>
                                <Slot match={getMatch("qf", i)} />
                            </div>
                        ))}
                        {/* Left SF */}
                        <div style={{ position: "absolute", left: CX[3], top: SFY }}>
                            <Slot match={getMatch("sf", 0)} />
                        </div>
                        {/* Final */}
                        <div style={{ position: "absolute", left: CX[4], top: FY }}>
                            <Slot match={getMatch("final", 0)} />
                        </div>
                        {/* Right SF */}
                        <div style={{ position: "absolute", left: CX[5], top: SFY }}>
                            <Slot match={getMatch("sf", 1)} />
                        </div>
                        {/* Right QF */}
                        {QFY.map((y, i) => (
                            <div key={`rqf-${i}`} style={{ position: "absolute", left: CX[6], top: y }}>
                                <Slot match={getMatch("qf", i + 2)} />
                            </div>
                        ))}
                        {/* Right R16 */}
                        {R16Y.map((y, i) => (
                            <div key={`rr16-${i}`} style={{ position: "absolute", left: CX[7], top: y }}>
                                <Slot match={getMatch("r16", i + 4)} />
                            </div>
                        ))}
                        {/* Right R32 */}
                        {R32Y.map((y, i) => (
                            <div key={`rr32-${i}`} style={{ position: "absolute", left: CX[8], top: y }}>
                                <Slot match={getMatch("r32", i + 8)} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Methodology note */}
            <div style={{ background: NAVY_MID, borderRadius: 10, padding: "12px 16px", fontSize: 11, color: GRAY, lineHeight: 1.5, marginTop: 8 }}>
                <strong style={{ color: OFF_WHITE }}>How it works:</strong> Group stage plays full round-robin (6 matches/group).
                Top 2 from each group + 8 best 3rd-place teams advance to a 32-team single-elimination bracket.
                Each match outcome is probabilistic based on Elo difference.
                Draws in knockout rounds go to penalties (compressed toward 50/50). Click Re-Simulate for a different outcome.
                <span style={{ color: GRAY }}> ● = penalty shootout winner</span>
            </div>
        </>
    );
}
