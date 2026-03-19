import { NAVY_LIGHT } from "../../styles/theme";
import { MW, MH, CX, R32Y, R16Y, QFY, SFY, BW, BH } from "./simulatorLayout";

export default function Connectors({ phase }) {
    const phases = ["r32", "r16", "qf", "sf", "final"];
    const pi = phases.indexOf(phase);
    const paths = [];
    const hm = MH / 2;

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
