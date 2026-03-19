// ─── Bracket geometry constants ───
export const MW = 100;
export const MH = 46;
export const GAP = 16;
export const STEP = 58;

export const CX = [0, 116, 232, 348, 464, 580, 696, 812, 928];

export const R32Y = Array.from({ length: 8 }, (_, i) => i * STEP);
export const R16Y = Array.from({ length: 4 }, (_, i) => (R32Y[i * 2] + R32Y[i * 2 + 1]) / 2);
export const QFY = Array.from({ length: 2 }, (_, i) => (R16Y[i * 2] + R16Y[i * 2 + 1]) / 2);
export const SFY = (QFY[0] + QFY[1]) / 2;
export const FY = SFY;

export const BW = CX[8] + MW;
export const BH = R32Y[7] + MH + 8;

export const GOLD = "#d4af37";

export const ROUND_LABELS = ["R32", "R16", "QF", "SF", "FINAL", "SF", "QF", "R16", "R32"];
