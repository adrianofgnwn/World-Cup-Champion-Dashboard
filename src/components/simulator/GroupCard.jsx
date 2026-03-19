import { WHITE, GRAY, NAVY_LIGHT, CARD_BG, CARD_BORDER, OFF_WHITE } from "../../styles/theme";
import { GOLD } from "./simulatorLayout";
import { CODE } from "./simulatorUtils";

export default function GroupCard({ g, data, elim3, visible }) {
    if (!data || !visible) {
        return (
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "8px 10px", border: `1px solid ${NAVY_LIGHT}33` }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: GRAY, marginBottom: 4 }}>GROUP {g}</div>
                {[0, 1, 2, 3].map(i => (
                    <div key={i} style={{ height: 18, borderRadius: 3, background: "rgba(255,255,255,0.02)", marginTop: 3 }} />
                ))}
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
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, width: 20, textAlign: "right" }}>{data.pts[t.name]}</span>
                        <span style={{ fontSize: 9, color: GRAY, width: 16, textAlign: "center" }}>pts</span>
                    </div>
                );
            })}
        </div>
    );
}
