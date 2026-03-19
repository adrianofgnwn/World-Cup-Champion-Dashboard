import { useState } from "react";
import { NAVY, GRAY, CARD_BORDER } from "../styles/theme";
import Header from "./components/Header";
import Overview from "./components/Overview";
import Rankings from "./components/Rankings";
import ChampionDNA from "./components/ChampionDNA";
import Simulator from "./components/Simulator";
import "./App.css";

export default function App() {
    const [tab, setTab] = useState("Overview");

    return (
        <div className="app" style={{ fontFamily: "'Barlow', sans-serif", background: NAVY, minHeight: "100vh", color: "#e2e5eb", position: "relative", overflow: "hidden" }}>

            {/* Global floating orbs */}
            <div className="orbs-container">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="orb orb-4" />
                <div className="orb orb-5" />
                <div className="orb orb-6" />
            </div>

            <Header tab={tab} setTab={setTab} />

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 48px", position: "relative", zIndex: 1 }}>
                {tab === "Overview" && <Overview />}
                {tab === "Rankings" && <Rankings />}
                {tab === "Champion DNA" && <ChampionDNA />}
                {tab === "Simulator" && <Simulator />}
            </div>

            <div style={{ textAlign: "center", padding: "16px 16px 28px", color: GRAY, fontSize: 11, borderTop: `1px solid ${CARD_BORDER}`, position: "relative", zIndex: 1 }}>
                🏆 Data: FIFA World Cup 1974–2022 + 16 recent international sources (2023–2026) · Built as a BSc Computer Science portfolio project
            </div>
        </div>
    );
}
