import { RED, WHITE, GRAY, CARD_BG, CARD_BORDER } from "../../styles/theme.js";

export default function StatCard({ label, value, sub, accent = RED }) {
    return (
        <div style={{
            background: CARD_BG, borderRadius: 14, padding: "20px 22px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.2)", border: `1px solid ${CARD_BORDER}`,
            flex: "1 1 160px", minWidth: 160, position: "relative", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: accent, borderRadius: "14px 0 0 14px" }} />
            <div style={{ fontSize: 11, color: GRAY, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: WHITE, fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</div>
            {sub && <div style={{ fontSize: 12, color: GRAY, marginTop: 6 }}>{sub}</div>}
        </div>
    );
}
