import { WHITE, GRAY, GREEN, NAVY_LIGHT, CARD_BG } from "../../styles/theme";
import { MW, MH, GOLD } from "./simulatorLayout";
import { CODE } from "./simulatorUtils";

export default function Slot({ match }) {
    if (!match) {
        return (
            <div style={{ width: MW, height: MH, background: "rgba(255,255,255,0.02)", borderRadius: 6, border: `1px solid ${NAVY_LIGHT}33` }} />
        );
    }

    const { a, b, winner, pen } = match;

    const row = (team, isWinner) => (
        <div style={{
            display: "flex", alignItems: "center", gap: 4, padding: "0 6px",
            height: MH / 2, fontSize: 11, fontWeight: isWinner ? 800 : 500,
            color: isWinner ? WHITE : GRAY,
            background: isWinner ? "rgba(200,16,46,0.08)" : "transparent",
        }}>
            <span style={{ fontSize: 13 }}>{team.flag}</span>
            <span style={{ flex: 1, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 0.5 }}>
                {CODE[team.name] || team.name.slice(0, 3).toUpperCase()}
            </span>
            {isWinner && (
                <span style={{ fontSize: 9, color: pen ? GOLD : GREEN }}>
                    {pen ? "PEN" : "✓"}
                </span>
            )}
        </div>
    );

    return (
        <div style={{
            width: MW, height: MH, background: CARD_BG, borderRadius: 6,
            border: `1px solid ${NAVY_LIGHT}`, overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}>
            {row(a, winner === "A")}
            <div style={{ height: 1, background: NAVY_LIGHT }} />
            {row(b, winner === "B")}
        </div>
    );
}
