import { useState, useRef, useCallback } from "react";
import { RED, GREEN, WHITE, GRAY, NAVY_MID, NAVY_LIGHT, OFF_WHITE } from "../../styles/theme";
import { createRNG, simMatch, simGroups, buildR32 } from "../simulator/simulatorUtils";
import { MW, CX, R32Y, R16Y, QFY, SFY, FY, BW, BH, GOLD, ROUND_LABELS } from "../simulator/simulatorLayout";
import Slot from "../simulator/Slot";
import GroupCard from "../simulator/GroupCard";
import Connectors from "../simulator/Connectors";

export default function Simulator() {
    const [phase, setPhase] = useState("idle");
    const [mode, setMode] = useState("likely");
    const [groups, setGroups] = useState(null);
    const [r32Data, setR32Data] = useState(null);
    const [elim3, setElim3] = useState(null);
    const [matches, setMatches] = useState({ r32: [], r16: [], qf: [], sf: [], final: null });
    const [winner, setWinner] = useState(null);
    const [simCount, setSimCount] = useState(0);
    const timers = useRef([]);

    const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    const delay = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };

    const runBracket = useCallback((deterministic) => {
        clearTimers();
        const seed = Date.now() + simCount;
        setSimCount(c => c + 1);
        setMode(deterministic ? "likely" : "random");
        setPhase("idle"); setGroups(null); setR32Data(null); setElim3(null); setWinner(null);
        setMatches({ r32: [], r16: [], qf: [], sf: [], final: null });

        const rng = createRNG(seed);

        delay(() => {
            const gr = simGroups(rng, deterministic);
            setGroups(gr);
            setPhase("groups");

            delay(() => {
                const { left, right, elim3: e3 } = buildR32(gr);
                setElim3(e3);
                const r32 = [...left, ...right].map(([a, b]) => simMatch(a, b, rng, true, deterministic));
                setMatches(m => ({ ...m, r32 }));
                setR32Data({ left, right });
                setPhase("r32");

                delay(() => {
                    const r16 = [];
                    for (let i = 0; i < 8; i++) {
                        const w1 = r32[i * 2].winner === "A" ? r32[i * 2].a : r32[i * 2].b;
                        const w2 = r32[i * 2 + 1].winner === "A" ? r32[i * 2 + 1].a : r32[i * 2 + 1].b;
                        r16.push(simMatch(w1, w2, rng, true, deterministic));
                    }
                    setMatches(m => ({ ...m, r16 }));
                    setPhase("r16");

                    delay(() => {
                        const qf = [];
                        for (let i = 0; i < 4; i++) {
                            const w1 = r16[i * 2].winner === "A" ? r16[i * 2].a : r16[i * 2].b;
                            const w2 = r16[i * 2 + 1].winner === "A" ? r16[i * 2 + 1].a : r16[i * 2 + 1].b;
                            qf.push(simMatch(w1, w2, rng, true, deterministic));
                        }
                        setMatches(m => ({ ...m, qf }));
                        setPhase("qf");

                        delay(() => {
                            const sf = [];
                            for (let i = 0; i < 2; i++) {
                                const w1 = qf[i * 2].winner === "A" ? qf[i * 2].a : qf[i * 2].b;
                                const w2 = qf[i * 2 + 1].winner === "A" ? qf[i * 2 + 1].a : qf[i * 2 + 1].b;
                                sf.push(simMatch(w1, w2, rng, true, deterministic));
                            }
                            setMatches(m => ({ ...m, sf }));
                            setPhase("sf");

                            delay(() => {
                                const w1 = sf[0].winner === "A" ? sf[0].a : sf[0].b;
                                const w2 = sf[1].winner === "A" ? sf[1].a : sf[1].b;
                                const f = simMatch(w1, w2, rng, true, deterministic);
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

    const getMatch = (round, idx) => {
        if (round === "final") return matches.final;
        return matches[round]?.[idx] || null;
    };

    const phaseOrder = ["idle", "groups", "r32", "r16", "qf", "sf", "final", "done"];
    const phaseIdx = phaseOrder.indexOf(phase);
    const isRunning = phaseIdx > 0 && phaseIdx < 7;

    return (
        <>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 4 }}>
                TOURNAMENT SIMULATOR
            </h2>
            <p style={{ color: GRAY, fontSize: 13, marginBottom: 20 }}>
                Simulate a complete World Cup 2026 tournament. Each match uses Elo-based probabilities with randomized outcomes.
            </p>

            {/* Mode buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <button onClick={() => runBracket(true)} disabled={isRunning} style={{
                    padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 800,
                    cursor: isRunning ? "not-allowed" : "pointer",
                    background: isRunning ? NAVY_LIGHT : mode === "likely" && phase === "done" ? NAVY_MID : RED,
                    color: WHITE,
                    fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1,
                    opacity: isRunning ? 0.6 : 1, transition: "all 0.2s",
                    border: mode === "likely" && phase === "done" ? `1px solid ${RED}` : "1px solid transparent",
                }}>
                    🏆 MOST LIKELY OUTCOME
                </button>
                <button onClick={() => runBracket(false)} disabled={isRunning} style={{
                    padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 800,
                    cursor: isRunning ? "not-allowed" : "pointer", border: "none",
                    background: isRunning ? NAVY_LIGHT : "rgba(255,255,255,0.06)",
                    color: isRunning ? GRAY : WHITE,
                    fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1,
                    opacity: isRunning ? 0.6 : 1, transition: "all 0.2s",
                }}>
                    ⚡ RANDOM SIMULATION
                </button>
                {phase !== "idle" && (
                    <span style={{ fontSize: 12, color: GRAY, fontWeight: 600 }}>
                        {phase === "groups" && "📋 Group stage..."}
                        {phase === "r32" && "🏟️ Round of 32..."}
                        {phase === "r16" && "🏟️ Round of 16..."}
                        {phase === "qf" && "🏟️ Quarter-Finals..."}
                        {phase === "sf" && "🏟️ Semi-Finals..."}
                        {phase === "final" && "🏆 The Final..."}
                        {phase === "done" && (mode === "likely" ? "📊 Based on Elo ratings — the stronger team always wins" : "🎲 Random outcome — click again for a different result")}
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

            {/* Knockout bracket */}
            {phaseIdx >= 2 && (
                <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: OFF_WHITE, marginBottom: 10 }}>KNOCKOUT BRACKET</h3>
                    <div style={{ position: "relative", width: BW, height: 20, marginBottom: 8 }}>
                        {CX.map((x, i) => (
                            <div key={i} style={{
                                position: "absolute", left: x, width: MW,
                                textAlign: "center", fontSize: 10, fontWeight: 800,
                                color: i === 4 ? GOLD : GRAY, letterSpacing: 1,
                            }}>
                                {ROUND_LABELS[i]}
                            </div>
                        ))}
                    </div>
                    <div style={{ position: "relative", width: BW, height: BH, overflowX: "auto" }}>
                        <Connectors phase={phase} />

                        {/* Left bracket: R32 → R16 → QF → SF */}
                        {R32Y.map((y, i) => <div key={`lr32-${i}`} style={{ position: "absolute", left: CX[0], top: y }}><Slot match={getMatch("r32", i)} /></div>)}
                        {R16Y.map((y, i) => <div key={`lr16-${i}`} style={{ position: "absolute", left: CX[1], top: y }}><Slot match={getMatch("r16", i)} /></div>)}
                        {QFY.map((y, i) => <div key={`lqf-${i}`} style={{ position: "absolute", left: CX[2], top: y }}><Slot match={getMatch("qf", i)} /></div>)}
                        <div style={{ position: "absolute", left: CX[3], top: SFY }}><Slot match={getMatch("sf", 0)} /></div>

                        {/* Final */}
                        <div style={{ position: "absolute", left: CX[4], top: FY }}><Slot match={getMatch("final", 0)} /></div>

                        {/* Right bracket: SF → QF → R16 → R32 */}
                        <div style={{ position: "absolute", left: CX[5], top: SFY }}><Slot match={getMatch("sf", 1)} /></div>
                        {QFY.map((y, i) => <div key={`rqf-${i}`} style={{ position: "absolute", left: CX[6], top: y }}><Slot match={getMatch("qf", i + 2)} /></div>)}
                        {R16Y.map((y, i) => <div key={`rr16-${i}`} style={{ position: "absolute", left: CX[7], top: y }}><Slot match={getMatch("r16", i + 4)} /></div>)}
                        {R32Y.map((y, i) => <div key={`rr32-${i}`} style={{ position: "absolute", left: CX[8], top: y }}><Slot match={getMatch("r32", i + 8)} /></div>)}
                    </div>
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

            {/* Methodology note */}
            <div style={{ background: NAVY_MID, borderRadius: 10, padding: "12px 16px", fontSize: 11, color: GRAY, lineHeight: 1.5, marginTop: 8 }}>
                <strong style={{ color: OFF_WHITE }}>How it works:</strong> <strong style={{ color: RED }}>Most Likely</strong> shows the predicted outcome where the higher-Elo team always wins — this is what the model says should happen.
                <strong style={{ color: OFF_WHITE }}> Random Simulation</strong> introduces probabilistic outcomes using the Elo formula — upsets can happen, just like in real football.
                Group stage plays round-robin, top 2 + best 8 third-place teams advance to a 32-team bracket.
                <span style={{ color: GREEN }}> ✓ = win</span> <span style={{ color: GOLD, marginLeft: 8 }}> PEN = penalty shootout</span>
            </div>
        </>
    );
}
