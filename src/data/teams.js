// ─── Champion DNA benchmarks (from NB01 — unchanged) ───
export const CHAMPION = {
    goals: 2.25, goals_conceded: 0.79, possession: 53.54, shot_conversion: 15.12,
    shot_accuracy: 47.46, xg: 2.06, xg_overperformance: 0.19,
    defensive_save_rate: 93.54, goal_difference: 1.46, shot_dominance: 1.75,
};

export const NON_CHAMP = {
    goals: 1.35, goals_conceded: 1.92, possession: 48.63, shot_conversion: 9.67,
    shot_accuracy: 37.26, xg: 1.49, xg_overperformance: -0.13,
    defensive_save_rate: 86.98, goal_difference: -0.56, shot_dominance: 1.30,
};

export const FEATURE_IMPORTANCE = [
    { feat: "Shot Accuracy", imp: 13.3 },
    { feat: "Goal Difference", imp: 11.7 },
    { feat: "Expected Goals", imp: 11.2 },
    { feat: "Stage Level", imp: 8.2 },
    { feat: "Def. xG Overperf.", imp: 7.4 },
    { feat: "Def. Save Rate", imp: 6.8 },
    { feat: "Possession", imp: 6.3 },
    { feat: "Shots on Target", imp: 5.5 },
];

// ─── Flags & confederations for all 48 qualified teams ───
const META = {
    "Algeria":       { flag: "🇩🇿", conf: "CAF" },
    "Argentina":     { flag: "🇦🇷", conf: "CONMEBOL" },
    "Australia":     { flag: "🇦🇺", conf: "AFC" },
    "Austria":       { flag: "🇦🇹", conf: "UEFA" },
    "Belgium":       { flag: "🇧🇪", conf: "UEFA" },
    "Brazil":        { flag: "🇧🇷", conf: "CONMEBOL" },
    "Cabo Verde":    { flag: "🇨🇻", conf: "CAF" },
    "Canada":        { flag: "🇨🇦", conf: "CONCACAF" },
    "Colombia":      { flag: "🇨🇴", conf: "CONMEBOL" },
    "Cote d'Ivoire": { flag: "🇨🇮", conf: "CAF" },
    "Croatia":       { flag: "🇭🇷", conf: "UEFA" },
    "Curacao":       { flag: "🇨🇼", conf: "CONCACAF" },
    "DR Congo":      { flag: "🇨🇩", conf: "CAF" },
    "Denmark":       { flag: "🇩🇰", conf: "UEFA" },
    "Ecuador":       { flag: "🇪🇨", conf: "CONMEBOL" },
    "Egypt":         { flag: "🇪🇬", conf: "CAF" },
    "England":       { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", conf: "UEFA" },
    "France":        { flag: "🇫🇷", conf: "UEFA" },
    "Germany":       { flag: "🇩🇪", conf: "UEFA" },
    "Ghana":         { flag: "🇬🇭", conf: "CAF" },
    "Haiti":         { flag: "🇭🇹", conf: "CONCACAF" },
    "Iran":          { flag: "🇮🇷", conf: "AFC" },
    "Iraq":          { flag: "🇮🇶", conf: "AFC" },
    "Italy":         { flag: "🇮🇹", conf: "UEFA" },
    "Japan":         { flag: "🇯🇵", conf: "AFC" },
    "Jordan":        { flag: "🇯🇴", conf: "AFC" },
    "Mexico":        { flag: "🇲🇽", conf: "CONCACAF" },
    "Morocco":       { flag: "🇲🇦", conf: "CAF" },
    "Netherlands":   { flag: "🇳🇱", conf: "UEFA" },
    "New Zealand":   { flag: "🇳🇿", conf: "OFC" },
    "Norway":        { flag: "🇳🇴", conf: "UEFA" },
    "Panama":        { flag: "🇵🇦", conf: "CONCACAF" },
    "Paraguay":      { flag: "🇵🇾", conf: "CONMEBOL" },
    "Portugal":      { flag: "🇵🇹", conf: "UEFA" },
    "Qatar":         { flag: "🇶🇦", conf: "AFC" },
    "Saudi Arabia":  { flag: "🇸🇦", conf: "AFC" },
    "Scotland":      { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", conf: "UEFA" },
    "Senegal":       { flag: "🇸🇳", conf: "CAF" },
    "South Africa":  { flag: "🇿🇦", conf: "CAF" },
    "South Korea":   { flag: "🇰🇷", conf: "AFC" },
    "Spain":         { flag: "🇪🇸", conf: "UEFA" },
    "Switzerland":   { flag: "🇨🇭", conf: "UEFA" },
    "Tunisia":       { flag: "🇹🇳", conf: "CAF" },
    "Turkey":        { flag: "🇹🇷", conf: "UEFA" },
    "USA":           { flag: "🇺🇸", conf: "CONCACAF" },
    "Ukraine":       { flag: "🇺🇦", conf: "UEFA" },
    "Uruguay":       { flag: "🇺🇾", conf: "CONMEBOL" },
    "Uzbekistan":    { flag: "🇺🇿", conf: "AFC" },
};

// ─── Team profiles (from NB02 — team_profiles.json) ───
// Each team has: elo, group, profile metrics, matches_analyzed
const PROFILES_RAW = [
    { team: "Spain", group: "H", elo: 1877, matches: 35, profile: { shot_conversion: 14.97, shot_accuracy: 42.42, defensive_save_rate: 88.48, xg_overperformance: 0.5, goal_difference: 1.49, possession: 63.46, shot_dominance: 2.03, goals_per_match: 2.4, conceded_per_match: 0.91 } },
    { team: "Argentina", group: "J", elo: 1873, matches: 34, profile: { shot_conversion: 16.42, shot_accuracy: 49.65, defensive_save_rate: 92.55, xg_overperformance: 0.42, goal_difference: 1.74, possession: 64.62, shot_dominance: 2.53, goals_per_match: 2.12, conceded_per_match: 0.38 } },
    { team: "France", group: "I", elo: 1870, matches: 34, profile: { shot_conversion: 10.2, shot_accuracy: 37.82, defensive_save_rate: 85.92, xg_overperformance: -0.19, goal_difference: 0.65, possession: 57.0, shot_dominance: 2.28, goals_per_match: 1.65, conceded_per_match: 1.0 } },
    { team: "England", group: "L", elo: 1834, matches: 35, profile: { shot_conversion: 13.63, shot_accuracy: 41.7, defensive_save_rate: 88.49, xg_overperformance: 0.23, goal_difference: 1.03, possession: 64.29, shot_dominance: 2.25, goals_per_match: 1.8, conceded_per_match: 0.77 } },
    { team: "Brazil", group: "C", elo: 1760, matches: 33, profile: { shot_conversion: 14.72, shot_accuracy: 40.64, defensive_save_rate: 86.96, xg_overperformance: 0.27, goal_difference: 0.55, possession: 59.94, shot_dominance: 2.1, goals_per_match: 1.64, conceded_per_match: 1.09 } },
    { team: "Portugal", group: "K", elo: 1760, matches: 32, profile: { shot_conversion: 14.3, shot_accuracy: 42.91, defensive_save_rate: 89.23, xg_overperformance: 0.34, goal_difference: 1.22, possession: 60.47, shot_dominance: 2.16, goals_per_match: 2.22, conceded_per_match: 1.0 } },
    { team: "Netherlands", group: "F", elo: 1756, matches: 34, profile: { shot_conversion: 18.41, shot_accuracy: 44.57, defensive_save_rate: 88.06, xg_overperformance: 0.87, goal_difference: 1.41, possession: 57.97, shot_dominance: 1.89, goals_per_match: 2.53, conceded_per_match: 1.12 } },
    { team: "Morocco", group: "C", elo: 1736, matches: 32, profile: { shot_conversion: 11.96, shot_accuracy: 37.84, defensive_save_rate: 93.71, xg_overperformance: 0.02, goal_difference: 1.34, possession: 61.24, shot_dominance: 2.26, goals_per_match: 1.66, conceded_per_match: 0.31 } },
    { team: "Belgium", group: "G", elo: 1730, matches: 32, profile: { shot_conversion: 13.18, shot_accuracy: 40.42, defensive_save_rate: 87.65, xg_overperformance: 0.44, goal_difference: 0.94, possession: 60.47, shot_dominance: 2.08, goals_per_match: 1.97, conceded_per_match: 1.03 } },
    { team: "Germany", group: "E", elo: 1724, matches: 42, profile: { shot_conversion: 14.76, shot_accuracy: 40.6, defensive_save_rate: 87.24, xg_overperformance: 0.32, goal_difference: 0.79, possession: 63.67, shot_dominance: 2.25, goals_per_match: 2.02, conceded_per_match: 1.24 } },
    { team: "Croatia", group: "L", elo: 1716, matches: 31, profile: { shot_conversion: 14.01, shot_accuracy: 42.02, defensive_save_rate: 91.25, xg_overperformance: 0.2, goal_difference: 0.94, possession: 56.55, shot_dominance: 1.84, goals_per_match: 1.94, conceded_per_match: 1.0 } },
    { team: "Senegal", group: "I", elo: 1706, matches: 34, profile: { shot_conversion: 19.55, shot_accuracy: 43.96, defensive_save_rate: 93.17, xg_overperformance: 0.55, goal_difference: 1.47, possession: 52.34, shot_dominance: 1.39, goals_per_match: 2.0, conceded_per_match: 0.53 } },
    { team: "Italy", group: "B", elo: 1702, matches: 32, profile: { shot_conversion: 13.25, shot_accuracy: 40.09, defensive_save_rate: 88.22, xg_overperformance: 0.3, goal_difference: 0.5, possession: 52.44, shot_dominance: 1.46, goals_per_match: 1.81, conceded_per_match: 1.31 } },
    { team: "Colombia", group: "K", elo: 1701, matches: 38, profile: { shot_conversion: 17.28, shot_accuracy: 42.89, defensive_save_rate: 91.09, xg_overperformance: 0.47, goal_difference: 1.13, possession: 55.63, shot_dominance: 1.64, goals_per_match: 1.89, conceded_per_match: 0.76 } },
    { team: "USA", group: "D", elo: 1681, matches: 3, profile: { shot_conversion: 8.82, shot_accuracy: 34.29, defensive_save_rate: 87.76, xg_overperformance: -0.36, goal_difference: 0.0, possession: 46.0, shot_dominance: 0.92, goals_per_match: 1.0, conceded_per_match: 1.0 } },
    { team: "Mexico", group: "A", elo: 1675, matches: 25, profile: { shot_conversion: 11.58, shot_accuracy: 37.33, defensive_save_rate: 80.59, xg_overperformance: 0.08, goal_difference: -0.08, possession: 53.44, shot_dominance: 1.37, goals_per_match: 1.28, conceded_per_match: 1.36 } },
    { team: "Uruguay", group: "H", elo: 1672, matches: 35, profile: { shot_conversion: 14.9, shot_accuracy: 40.44, defensive_save_rate: 91.05, xg_overperformance: 0.29, goal_difference: 0.63, possession: 52.09, shot_dominance: 1.27, goals_per_match: 1.4, conceded_per_match: 0.77 } },
    { team: "Switzerland", group: "B", elo: 1654, matches: 31, profile: { shot_conversion: 16.75, shot_accuracy: 44.67, defensive_save_rate: 88.04, xg_overperformance: 0.38, goal_difference: 0.58, possession: 54.42, shot_dominance: 1.09, goals_per_match: 1.68, conceded_per_match: 1.1 } },
    { team: "Japan", group: "F", elo: 1650, matches: 32, profile: { shot_conversion: 30.43, shot_accuracy: 52.06, defensive_save_rate: 92.06, xg_overperformance: 1.68, goal_difference: 2.59, possession: 58.16, shot_dominance: 1.76, goals_per_match: 3.16, conceded_per_match: 0.56 } },
    { team: "Iran", group: "G", elo: 1617, matches: 24, profile: { shot_conversion: 14.55, shot_accuracy: 39.06, defensive_save_rate: 88.06, xg_overperformance: 0.26, goal_difference: 0.79, possession: 54.21, shot_dominance: 1.62, goals_per_match: 1.67, conceded_per_match: 0.88 } },
    { team: "Denmark", group: "A", elo: 1616, matches: 30, profile: { shot_conversion: 12.61, shot_accuracy: 39.08, defensive_save_rate: 90.08, xg_overperformance: 0.19, goal_difference: 0.73, possession: 53.27, shot_dominance: 1.63, goals_per_match: 1.7, conceded_per_match: 0.97 } },
    { team: "South Korea", group: "A", elo: 1599, matches: 31, profile: { shot_conversion: 23.88, shot_accuracy: 46.67, defensive_save_rate: 91.33, xg_overperformance: 0.7, goal_difference: 1.42, possession: 63.55, shot_dominance: 2.12, goals_per_match: 2.1, conceded_per_match: 0.68 } },
    { team: "Ecuador", group: "E", elo: 1591, matches: 35, profile: { shot_conversion: 10.17, shot_accuracy: 36.28, defensive_save_rate: 93.17, xg_overperformance: -0.23, goal_difference: 0.46, possession: 53.14, shot_dominance: 1.36, goals_per_match: 1.06, conceded_per_match: 0.6 } },
    { team: "Austria", group: "J", elo: 1585, matches: 32, profile: { shot_conversion: 15.81, shot_accuracy: 42.28, defensive_save_rate: 89.71, xg_overperformance: 0.45, goal_difference: 1.0, possession: 57.0, shot_dominance: 1.68, goals_per_match: 2.0, conceded_per_match: 1.0 } },
    { team: "Turkey", group: "D", elo: 1582, matches: 30, profile: { shot_conversion: 13.1, shot_accuracy: 38.57, defensive_save_rate: 86.74, xg_overperformance: 0.19, goal_difference: 0.6, possession: 52.0, shot_dominance: 1.52, goals_per_match: 1.7, conceded_per_match: 1.1 } },
    { team: "Australia", group: "D", elo: 1574, matches: 26, profile: { shot_conversion: 12.57, shot_accuracy: 37.62, defensive_save_rate: 87.43, xg_overperformance: 0.14, goal_difference: 0.46, possession: 50.85, shot_dominance: 1.33, goals_per_match: 1.42, conceded_per_match: 0.96 } },
    { team: "Algeria", group: "J", elo: 1560, matches: 28, profile: { shot_conversion: 12.86, shot_accuracy: 38.1, defensive_save_rate: 89.52, xg_overperformance: 0.18, goal_difference: 0.75, possession: 54.29, shot_dominance: 1.55, goals_per_match: 1.57, conceded_per_match: 0.82 } },
    { team: "Canada", group: "B", elo: 1559, matches: 19, profile: { shot_conversion: 9.69, shot_accuracy: 35.87, defensive_save_rate: 89.44, xg_overperformance: -0.22, goal_difference: -0.05, possession: 45.11, shot_dominance: 0.98, goals_per_match: 0.89, conceded_per_match: 0.95 } },
    { team: "Ukraine", group: "F", elo: 1557, matches: 28, profile: { shot_conversion: 11.67, shot_accuracy: 37.0, defensive_save_rate: 88.0, xg_overperformance: 0.04, goal_difference: 0.36, possession: 50.71, shot_dominance: 1.35, goals_per_match: 1.36, conceded_per_match: 1.0 } },
    { team: "Egypt", group: "G", elo: 1556, matches: 26, profile: { shot_conversion: 11.54, shot_accuracy: 36.54, defensive_save_rate: 88.85, xg_overperformance: 0.08, goal_difference: 0.5, possession: 51.92, shot_dominance: 1.38, goals_per_match: 1.35, conceded_per_match: 0.85 } },
    { team: "Norway", group: "I", elo: 1553, matches: 28, profile: { shot_conversion: 13.33, shot_accuracy: 38.89, defensive_save_rate: 87.78, xg_overperformance: 0.21, goal_difference: 0.5, possession: 51.43, shot_dominance: 1.4, goals_per_match: 1.57, conceded_per_match: 1.07 } },
    { team: "Panama", group: "L", elo: 1539, matches: 22, profile: { shot_conversion: 10.45, shot_accuracy: 35.0, defensive_save_rate: 87.27, xg_overperformance: -0.05, goal_difference: 0.18, possession: 47.27, shot_dominance: 1.1, goals_per_match: 1.14, conceded_per_match: 0.95 } },
    { team: "Scotland", group: "C", elo: 1533, matches: 26, profile: { shot_conversion: 11.15, shot_accuracy: 36.15, defensive_save_rate: 87.69, xg_overperformance: 0.0, goal_difference: 0.23, possession: 49.62, shot_dominance: 1.28, goals_per_match: 1.23, conceded_per_match: 1.0 } },
    { team: "Paraguay", group: "D", elo: 1528, matches: 30, profile: { shot_conversion: 10.67, shot_accuracy: 35.67, defensive_save_rate: 88.0, xg_overperformance: -0.03, goal_difference: 0.13, possession: 48.33, shot_dominance: 1.15, goals_per_match: 1.1, conceded_per_match: 0.97 } },
    { team: "South Africa", group: "A", elo: 1512, matches: 24, profile: { shot_conversion: 11.25, shot_accuracy: 36.25, defensive_save_rate: 88.33, xg_overperformance: 0.04, goal_difference: 0.29, possession: 49.17, shot_dominance: 1.21, goals_per_match: 1.21, conceded_per_match: 0.92 } },
    { team: "Saudi Arabia", group: "H", elo: 1500, matches: 22, profile: { shot_conversion: 10.91, shot_accuracy: 35.45, defensive_save_rate: 87.73, xg_overperformance: -0.05, goal_difference: 0.14, possession: 47.73, shot_dominance: 1.12, goals_per_match: 1.09, conceded_per_match: 0.95 } },
    { team: "Tunisia", group: "F", elo: 1498, matches: 24, profile: { shot_conversion: 10.42, shot_accuracy: 35.0, defensive_save_rate: 87.5, xg_overperformance: -0.08, goal_difference: 0.08, possession: 47.08, shot_dominance: 1.08, goals_per_match: 1.04, conceded_per_match: 0.96 } },
    { team: "Uzbekistan", group: "K", elo: 1489, matches: 22, profile: { shot_conversion: 11.36, shot_accuracy: 36.36, defensive_save_rate: 87.27, xg_overperformance: 0.05, goal_difference: 0.27, possession: 48.64, shot_dominance: 1.14, goals_per_match: 1.18, conceded_per_match: 0.91 } },
    { team: "Haiti", group: "C", elo: 1470, matches: 18, profile: { shot_conversion: 9.44, shot_accuracy: 33.89, defensive_save_rate: 86.67, xg_overperformance: -0.17, goal_difference: -0.17, possession: 45.0, shot_dominance: 0.95, goals_per_match: 0.89, conceded_per_match: 1.06 } },
    { team: "Cote d'Ivoire", group: "E", elo: 1467, matches: 24, profile: { shot_conversion: 10.83, shot_accuracy: 35.83, defensive_save_rate: 87.08, xg_overperformance: 0.0, goal_difference: 0.13, possession: 48.33, shot_dominance: 1.1, goals_per_match: 1.08, conceded_per_match: 0.96 } },
    { team: "Ghana", group: "L", elo: 1460, matches: 22, profile: { shot_conversion: 10.0, shot_accuracy: 34.55, defensive_save_rate: 86.82, xg_overperformance: -0.09, goal_difference: -0.05, possession: 46.82, shot_dominance: 1.05, goals_per_match: 1.0, conceded_per_match: 1.05 } },
    { team: "Iraq", group: "I", elo: 1450, matches: 20, profile: { shot_conversion: 10.0, shot_accuracy: 34.5, defensive_save_rate: 86.5, xg_overperformance: -0.1, goal_difference: -0.05, possession: 46.5, shot_dominance: 1.03, goals_per_match: 0.95, conceded_per_match: 1.0 } },
    { team: "DR Congo", group: "K", elo: 1450, matches: 20, profile: { shot_conversion: 10.0, shot_accuracy: 34.5, defensive_save_rate: 86.5, xg_overperformance: -0.1, goal_difference: -0.05, possession: 46.5, shot_dominance: 1.03, goals_per_match: 0.95, conceded_per_match: 1.0 } },
    { team: "New Zealand", group: "G", elo: 1440, matches: 18, profile: { shot_conversion: 9.44, shot_accuracy: 33.89, defensive_save_rate: 86.11, xg_overperformance: -0.17, goal_difference: -0.22, possession: 45.56, shot_dominance: 0.97, goals_per_match: 0.89, conceded_per_match: 1.11 } },
    { team: "Qatar", group: "B", elo: 1434, matches: 18, profile: { shot_conversion: 9.44, shot_accuracy: 33.89, defensive_save_rate: 86.11, xg_overperformance: -0.17, goal_difference: -0.22, possession: 45.56, shot_dominance: 0.97, goals_per_match: 0.89, conceded_per_match: 1.11 } },
    { team: "Jordan", group: "J", elo: 1427, matches: 18, profile: { shot_conversion: 9.17, shot_accuracy: 33.33, defensive_save_rate: 85.83, xg_overperformance: -0.22, goal_difference: -0.33, possession: 44.72, shot_dominance: 0.93, goals_per_match: 0.83, conceded_per_match: 1.17 } },
    { team: "Curacao", group: "E", elo: 1382, matches: 16, profile: { shot_conversion: 8.75, shot_accuracy: 32.5, defensive_save_rate: 85.0, xg_overperformance: -0.28, goal_difference: -0.5, possession: 43.75, shot_dominance: 0.88, goals_per_match: 0.75, conceded_per_match: 1.25 } },
    { team: "Cabo Verde", group: "H", elo: 1360, matches: 16, profile: { shot_conversion: 8.44, shot_accuracy: 32.19, defensive_save_rate: 84.69, xg_overperformance: -0.31, goal_difference: -0.56, possession: 43.44, shot_dominance: 0.85, goals_per_match: 0.69, conceded_per_match: 1.25 } },
];

// ─── Simulation results (from NB04 — simulation_results.json) ───
const SIMULATION_RAW = [
    { team: "Argentina", r32: 94.5, r16: 60.7, qf: 41.3, sf: 27.7, final: 17.8, winner: 11.3 },
    { team: "Spain", r32: 95.4, r16: 62.4, qf: 41.3, sf: 27.6, final: 17.7, winner: 11.2 },
    { team: "France", r32: 93.2, r16: 64.6, qf: 42.8, sf: 27.0, final: 17.0, winner: 10.4 },
    { team: "England", r32: 91.1, r16: 60.0, qf: 38.0, sf: 23.2, final: 13.2, winner: 7.3 },
    { team: "Brazil", r32: 87.2, r16: 50.6, qf: 30.2, sf: 17.4, final: 9.0, winner: 4.8 },
    { team: "Portugal", r32: 88.3, r16: 52.2, qf: 29.9, sf: 16.2, final: 8.9, winner: 4.7 },
    { team: "Netherlands", r32: 86.4, r16: 48.8, qf: 28.8, sf: 15.6, final: 8.1, winner: 4.2 },
    { team: "Morocco", r32: 83.9, r16: 48.3, qf: 27.2, sf: 14.9, final: 7.6, winner: 3.7 },
    { team: "Croatia", r32: 80.3, r16: 45.6, qf: 24.5, sf: 12.8, final: 6.7, winner: 3.4 },
    { team: "Belgium", r32: 86.9, r16: 51.0, qf: 27.8, sf: 14.4, final: 7.6, winner: 3.3 },
    { team: "Germany", r32: 89.9, r16: 50.6, qf: 26.1, sf: 14.0, final: 7.0, winner: 3.3 },
    { team: "Italy", r32: 84.0, r16: 50.0, qf: 25.8, sf: 12.8, final: 6.2, winner: 3.1 },
    { team: "Senegal", r32: 78.4, r16: 45.4, qf: 24.8, sf: 13.0, final: 6.4, winner: 3.0 },
    { team: "Colombia", r32: 83.4, r16: 45.6, qf: 24.1, sf: 11.9, final: 5.9, winner: 2.9 },
    { team: "Mexico", r32: 79.5, r16: 44.7, qf: 21.6, sf: 10.3, final: 4.8, winner: 2.2 },
    { team: "Uruguay", r32: 80.8, r16: 39.0, qf: 20.5, sf: 10.4, final: 5.1, winner: 2.1 },
    { team: "USA", r32: 80.8, r16: 44.6, qf: 22.4, sf: 10.5, final: 4.8, winner: 2.0 },
    { team: "Switzerland", r32: 79.4, r16: 43.9, qf: 21.1, sf: 9.8, final: 4.2, winner: 1.8 },
    { team: "Japan", r32: 73.8, r16: 35.9, qf: 18.2, sf: 8.4, final: 3.9, winner: 1.7 },
    { team: "Denmark", r32: 70.4, r16: 36.3, qf: 16.4, sf: 7.0, final: 2.8, winner: 1.2 },
    { team: "Iran", r32: 73.8, r16: 36.7, qf: 16.5, sf: 7.3, final: 3.2, winner: 1.2 },
    { team: "South Korea", r32: 68.0, r16: 33.5, qf: 15.0, sf: 6.2, final: 2.5, winner: 1.1 },
    { team: "Ecuador", r32: 77.3, r16: 35.5, qf: 15.3, sf: 6.5, final: 2.4, winner: 0.9 },
    { team: "Turkey", r32: 67.5, r16: 31.6, qf: 13.2, sf: 5.7, final: 2.3, winner: 0.9 },
    { team: "Egypt", r32: 65.1, r16: 29.0, qf: 11.6, sf: 4.3, final: 1.7, winner: 0.8 },
    { team: "Australia", r32: 64.8, r16: 29.7, qf: 12.0, sf: 4.8, final: 2.0, winner: 0.8 },
    { team: "Canada", r32: 64.4, r16: 30.5, qf: 12.4, sf: 5.1, final: 2.1, winner: 0.8 },
    { team: "Austria", r32: 66.4, r16: 26.8, qf: 12.2, sf: 5.1, final: 2.1, winner: 0.7 },
    { team: "Algeria", r32: 63.7, r16: 25.2, qf: 11.0, sf: 4.5, final: 1.8, winner: 0.6 },
    { team: "Norway", r32: 55.0, r16: 24.7, qf: 10.2, sf: 4.2, final: 1.5, winner: 0.5 },
    { team: "Paraguay", r32: 57.9, r16: 24.2, qf: 9.6, sf: 3.5, final: 1.2, winner: 0.5 },
    { team: "Panama", r32: 53.9, r16: 22.7, qf: 9.1, sf: 3.9, final: 1.4, winner: 0.5 },
    { team: "Tunisia", r32: 49.5, r16: 18.8, qf: 7.1, sf: 2.4, final: 1.0, winner: 0.4 },
    { team: "Ukraine", r32: 60.2, r16: 25.1, qf: 11.0, sf: 4.4, final: 1.7, winner: 0.4 },
    { team: "Scotland", r32: 52.6, r16: 21.3, qf: 8.8, sf: 3.4, final: 1.1, winner: 0.4 },
    { team: "Uzbekistan", r32: 50.7, r16: 18.8, qf: 7.0, sf: 2.5, final: 1.0, winner: 0.3 },
    { team: "Cote d'Ivoire", r32: 57.1, r16: 20.8, qf: 7.2, sf: 2.4, final: 0.8, winner: 0.3 },
    { team: "South Africa", r32: 54.1, r16: 23.4, qf: 8.5, sf: 2.9, final: 1.0, winner: 0.3 },
    { team: "Saudi Arabia", r32: 54.1, r16: 19.5, qf: 8.0, sf: 2.8, final: 0.9, winner: 0.3 },
    { team: "Haiti", r32: 42.8, r16: 15.4, qf: 6.2, sf: 2.3, final: 0.7, winner: 0.2 },
    { team: "Jordan", r32: 38.3, r16: 11.4, qf: 3.7, sf: 1.2, final: 0.4, winner: 0.1 },
    { team: "DR Congo", r32: 42.7, r16: 14.6, qf: 5.1, sf: 1.7, final: 0.5, winner: 0.1 },
    { team: "New Zealand", r32: 42.9, r16: 16.1, qf: 5.1, sf: 1.4, final: 0.5, winner: 0.1 },
    { team: "Ghana", r32: 39.1, r16: 14.0, qf: 4.8, sf: 1.6, final: 0.5, winner: 0.1 },
    { team: "Curacao", r32: 41.7, r16: 13.3, qf: 3.9, sf: 1.0, final: 0.3, winner: 0.1 },
    { team: "Iraq", r32: 37.0, r16: 14.5, qf: 4.9, sf: 1.5, final: 0.4, winner: 0.1 },
    { team: "Cabo Verde", r32: 30.0, r16: 7.9, qf: 2.5, sf: 0.6, final: 0.2, winner: 0.1 },
    { team: "Qatar", r32: 41.8, r16: 15.2, qf: 5.2, sf: 1.7, final: 0.5, winner: 0.1 },
];

// ─── Merge profiles + simulation + meta into unified TEAMS array ───
// Ranked by simulation win probability (the honest ranking)
const simMap = Object.fromEntries(SIMULATION_RAW.map(s => [s.team, s]));

export const TEAMS = PROFILES_RAW
    .map((p, i) => {
        const sim = simMap[p.team] || { r32: 0, r16: 0, qf: 0, sf: 0, final: 0, winner: 0 };
        const meta = META[p.team] || { flag: "🏳️", conf: "—" };
        return {
            name: p.team,
            flag: meta.flag,
            conf: meta.conf,
            group: p.group,
            elo: p.elo,
            matches: p.matches,
            // Profile metrics (from NB02)
            shotConv: p.profile.shot_conversion,
            shotAcc: p.profile.shot_accuracy,
            defSave: p.profile.defensive_save_rate,
            xgOver: p.profile.xg_overperformance,
            goalDiff: p.profile.goal_difference,
            poss: p.profile.possession,
            shotDom: p.profile.shot_dominance,
            goals: p.profile.goals_per_match,
            conceded: p.profile.conceded_per_match,
            // Simulation results (from NB04)
            sim: {
                r32: sim.r32,
                r16: sim.r16,
                qf: sim.qf,
                sf: sim.sf,
                final: sim.final,
                winner: sim.winner,
            },
        };
    })
    // Sort by Elo rating (team strength ranking)
    .sort((a, b) => b.elo - a.elo)
    .map((t, i) => ({ ...t, rank: i + 1 }));

// ─── Elo match prediction (from NB03 — pure Elo formula) ───
export function predictMatch(eloA, eloB) {
    const dr = eloA - eloB;
    const expectedA = 1 / (1 + Math.pow(10, -dr / 400));
    const expectedB = 1 - expectedA;
    // Draw probability peaks when teams are close in Elo
    const drawProb = Math.min(0.38, 0.28 * Math.exp(-Math.abs(dr) / 600));
    const winA = expectedA * (1 - drawProb);
    const winB = expectedB * (1 - drawProb);
    return { winA: +(winA * 100).toFixed(1), draw: +(drawProb * 100).toFixed(1), winB: +(winB * 100).toFixed(1) };
}