import { TEAMS, predictMatch } from "../../data/teams";

// ─── 3-letter country codes ───
export const CODE = {
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

// ─── R32 bracket template ───
const R32_TEMPLATE = {
    left: [
        [["1","A"], ["3",null]], [["2","C"], ["2","D"]],
        [["1","B"], ["3",null]], [["2","A"], ["2","B"]],
        [["1","E"], ["3",null]], [["1","F"], ["2","E"]],
        [["1","G"], ["3",null]], [["1","H"], ["2","F"]],
    ],
    right: [
        [["1","C"], ["3",null]], [["2","I"], ["2","J"]],
        [["1","D"], ["3",null]], [["2","K"], ["2","L"]],
        [["1","I"], ["3",null]], [["1","J"], ["2","G"]],
        [["1","K"], ["3",null]], [["1","L"], ["2","H"]],
    ],
};

const THIRD_FORBIDDEN = ["A","B","E","G","C","D","I","K"];

// ─── Seeded RNG ───
export function createRNG(seed) {
    let s = (seed % 2147483647 + 2147483647) % 2147483647 || 1;
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

// ─── Match simulation ───
export function simMatch(a, b, rng, knockout = false, deterministic = false) {
    if (deterministic) {
        return { a, b, winner: a.elo >= b.elo ? "A" : "B", pen: false };
    }

    const p = predictMatch(a.elo, b.elo);
    const roll = rng() * 100;

    if (roll < p.winA) {
        return { a, b, winner: "A", pen: false };
    } else if (roll < p.winA + p.draw) {
        if (knockout) {
            const bias = 0.5 + (p.winA / 100 - 0.5) * 0.25;
            return { a, b, winner: rng() < bias ? "A" : "B", pen: true };
        }
        return { a, b, winner: "draw", pen: false };
    } else {
        return { a, b, winner: "B", pen: false };
    }
}

// ─── Group stage simulation ───
export function simGroups(rng, deterministic = false) {
    const grouped = {};
    TEAMS.forEach(t => { (grouped[t.group] ||= []).push(t); });

    const results = {};
    for (const [g, teams] of Object.entries(grouped)) {
        if (deterministic) {
            const standings = [...teams].sort((a, b) => b.elo - a.elo);
            const pts = {};
            standings.forEach((t, i) => { pts[t.name] = [9, 6, 3, 0][i]; });
            results[g] = { standings, pts };
        } else {
            const pts = {}, w = {};
            teams.forEach(t => { pts[t.name] = 0; w[t.name] = 0; });
            for (let i = 0; i < teams.length; i++)
                for (let j = i + 1; j < teams.length; j++) {
                    const m = simMatch(teams[i], teams[j], rng, false, false);
                    if (m.winner === "A") { pts[teams[i].name] += 3; w[teams[i].name]++; }
                    else if (m.winner === "B") { pts[teams[j].name] += 3; w[teams[j].name]++; }
                    else { pts[teams[i].name]++; pts[teams[j].name]++; }
                }
            const standings = [...teams].sort((a, b) =>
                (pts[b.name] - pts[a.name]) || (w[b.name] - w[a.name]) || (b.elo - a.elo)
            );
            results[g] = { standings, pts };
        }
    }
    return results;
}

// ─── Build R32 matchups from group results ───
export function buildR32(groupResults) {
    const pos = {};
    const thirds = [];
    for (const [g, { standings }] of Object.entries(groupResults)) {
        pos[`1${g}`] = standings[0];
        pos[`2${g}`] = standings[1];
        thirds.push({ ...standings[2], fromGroup: g, pts: groupResults[g].pts[standings[2].name] });
    }

    thirds.sort((a, b) => (b.pts - a.pts) || (b.elo - a.elo));
    const qual3 = thirds.slice(0, 8);
    const elim3 = new Set(thirds.slice(8).map(t => t.name));

    const assigned = Array(8).fill(null);
    const used = new Set();
    for (let slot = 0; slot < 8; slot++) {
        const forbidden = THIRD_FORBIDDEN[slot];
        const pick = qual3.find(t => t.fromGroup !== forbidden && !used.has(t.name));
        if (pick) { assigned[slot] = pick; used.add(pick.name); }
    }
    qual3.filter(t => !used.has(t.name)).forEach(t => {
        const idx = assigned.indexOf(null);
        if (idx >= 0) { assigned[idx] = t; used.add(t.name); }
    });

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
