import { RED, GREEN, WHITE, GRAY, CARD_BG, CARD_BORDER, NAVY_LIGHT } from "../../styles/theme.js";

// Elo range for progress bar scaling (min qualified team to max)
const ELO_MIN = 1350;
const ELO_MAX = 1900;

function eloColor(elo) {
    if (elo >= 1750) return RED;     // Elite tier
    if (elo >= 1600) return GREEN;   // Contender tier
    return GRAY;                      // Outsider tier
}

export default function TeamRow({ team, selected, onClick }) {
    const isTop3 = team.rank <= 3;
    const pct = Math.max(0, Math.min(100, ((team.elo - ELO_MIN) / (ELO_MAX - ELO_MIN)) * 100));
    const color = eloColor(team.elo);

    return (
        <button onClick={onClick} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 12,
            cursor: "pointer", width: "100%", textAlign: "left", transition: "all 0.2s",
            border: selected ? `2px solid ${RED}` : `1px solid ${CARD_BORDER}`,
            background: selected ? "rgba(200,16,46,0.1)" : CARD_BG,
            boxShadow: selected ? `0 2px 16px rgba(200,16,46,0.2)` : "0 1px 4px rgba(0,0,0,0.15)",
        }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: isTop3 ? RED : GRAY, width: 28, fontFamily: "'Barlow Condensed', sans-serif" }}>#{team.rank}</span>
            <span style={{ fontSize: 28 }}>{team.flag}</span>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: WHITE }}>{team.name}</div>
                <div style={{ fontSize: 11, color: GRAY }}>Group {team.group} · {team.conf}</div>
            </div>
            <div style={{ position: "relative", width: 140, height: 10, background: NAVY_LIGHT, borderRadius: 5, overflow: "hidden" }}>
                <div style={{
                    width: `${pct}%`, height: "100%", borderRadius: 5,
                    background: color,
                    transition: "width 0.5s ease",
                }} />
            </div>
            <span style={{ fontSize: 20, fontWeight: 900, color: color, minWidth: 48, textAlign: "right", fontFamily: "'Barlow Condensed', sans-serif" }}>{team.elo}</span>
        </button>
    );
}
