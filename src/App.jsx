import { useState } from "react";
import useIsMobile from "./hooks/useIsMobile";
import { NAVY, GRAY, CARD_BORDER } from "./styles/theme";
import Header from "./components/ui/Header";
import CountdownBar from "./components/ui/CountdownBar";
import Overview from "./components/pages/Overview";
import Rankings from "./components/pages/Rankings";
import ChampionDNA from "./components/pages/ChampionDNA";
import MatchPredictor from "./components/pages/MatchPredictor";
import WinOdds from "./components/pages/WinOdds";
import Simulator from "./components/pages/Simulator";
import "./styles/App.css";

export default function App() {
    const [tab, setTab] = useState("Overview");
    const mobile = useIsMobile();

    return (
        <div className="app" style={{ fontFamily: "'Barlow', sans-serif", background: NAVY, minHeight: "100vh", color: "#e2e5eb", position: "relative", overflow: "hidden" }}>

            <CountdownBar />

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

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: mobile ? "16px 12px 32px" : "24px 24px 48px", position: "relative", zIndex: 1 }}>
                {tab === "Overview" && <Overview />}
                {tab === "Rankings" && <Rankings />}
                {tab === "Champion DNA" && <ChampionDNA />}
                {tab === "Match Predictor" && <MatchPredictor />}
                {tab === "Win Odds" && <WinOdds />}
                {tab === "Simulator" && <Simulator />}
            </div>

            <div style={{ textAlign: "center", padding: "16px 16px 28px", color: GRAY, fontSize: 11, borderTop: `1px solid ${CARD_BORDER}`, position: "relative", zIndex: 1 }}>
                ⚽ Historical data: FIFA World Cup 1974–2022 · Current form: 16 international sources (2023–2026) · BSc Computer Science portfolio project
            </div>
        </div>
    );
}
