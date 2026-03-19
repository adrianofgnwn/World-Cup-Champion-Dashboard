import { useState, useEffect } from "react";
import { WHITE, GRAY } from "../../styles/theme";
import useIsMobile from "../../hooks/useIsMobile";

const KICKOFF = new Date("2026-06-11T19:00:00Z").getTime();
function pad(n) { return String(n).padStart(2, "0"); }

export default function CountdownBar() {
    const [now, setNow] = useState(Date.now());
    const mobile = useIsMobile();

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const diff = Math.max(0, KICKOFF - now);
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    const min = Math.floor((diff % 3600000) / 60000);
    const sec = Math.floor((diff % 60000) / 1000);

    if (diff <= 0) return null;

    return (
        <div style={{
            display: "flex", alignItems: "center",
            justifyContent: mobile ? "center" : "flex-end",
            flexWrap: mobile ? "wrap" : "nowrap",
            gap: mobile ? 8 : 16,
            padding: mobile ? "6px 12px" : "8px 24px",
            background: "#0b1120", position: "relative", zIndex: 10,
            borderBottom: "1px solid #1a2a45",
        }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "33.3%", height: 2, background: "#E61D25" }} />
            <div style={{ position: "absolute", top: 0, left: "33.3%", width: "33.3%", height: 2, background: "#2A398D" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: "33.4%", height: 2, background: "#3CAC3B" }} />

            {!mobile && (
                <span style={{ fontSize: 12, color: GRAY, fontWeight: 600, letterSpacing: 0.5 }}>
                    FIFA World Cup 2026 kicks off in
                </span>
            )}

            <div style={{ display: "flex", gap: mobile ? 6 : 10, alignItems: "baseline" }}>
                {[
                    { val: days, label: "DAYS" },
                    { val: pad(hrs), label: "HRS" },
                    { val: pad(min), label: "MIN" },
                    { val: pad(sec), label: "SEC" },
                ].map((u, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        {i > 0 && <span style={{ color: "#1e2d4a", fontSize: 14, fontWeight: 300, marginRight: 3 }}>:</span>}
                        <span style={{
                            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
                            fontSize: mobile ? 14 : 16, color: WHITE,
                        }}>{u.val}</span>
                        <span style={{ fontSize: mobile ? 8 : 10, color: GRAY, fontWeight: 600, letterSpacing: 0.5 }}>{u.label}</span>
                    </div>
                ))}
            </div>
            <span style={{ fontSize: 14 }}>⚽</span>
        </div>
    );
}
