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

export const TEAMS = [
    { rank:1, name:"Argentina", flag:"🇦🇷", score:97, matches:34, goals:2.12, conceded:0.38, poss:64.6, shotConv:16.4, shotAcc:47.2, xg:1.70, xgOver:0.42, defSave:92.5, goalDiff:1.74, shotDom:1.68, conf:"CONMEBOL" },
    { rank:2, name:"Japan", flag:"🇯🇵", score:90, matches:32, goals:3.16, conceded:0.56, poss:58.2, shotConv:30.4, shotAcc:52.1, xg:1.48, xgOver:1.68, defSave:92.1, goalDiff:2.60, shotDom:1.85, conf:"AFC" },
    { rank:3, name:"Senegal", flag:"🇸🇳", score:87, matches:34, goals:2.00, conceded:0.53, poss:52.3, shotConv:19.6, shotAcc:44.8, xg:1.45, xgOver:0.55, defSave:93.2, goalDiff:1.47, shotDom:1.52, conf:"CAF" },
    { rank:4, name:"Colombia", flag:"🇨🇴", score:78, matches:38, goals:1.89, conceded:0.76, poss:55.6, shotConv:17.3, shotAcc:42.5, xg:1.42, xgOver:0.47, defSave:91.1, goalDiff:1.13, shotDom:1.45, conf:"CONMEBOL" },
    { rank:5, name:"Spain", flag:"🇪🇸", score:78, matches:35, goals:2.40, conceded:0.91, poss:63.5, shotConv:15.0, shotAcc:42.8, xg:1.86, xgOver:0.54, defSave:88.5, goalDiff:1.49, shotDom:1.72, conf:"UEFA" },
    { rank:6, name:"South Korea", flag:"🇰🇷", score:77, matches:31, goals:2.10, conceded:0.68, poss:63.6, shotConv:23.9, shotAcc:46.3, xg:1.40, xgOver:0.70, defSave:91.3, goalDiff:1.42, shotDom:1.55, conf:"AFC" },
    { rank:7, name:"Austria", flag:"🇦🇹", score:71, matches:32, goals:2.00, conceded:1.00, poss:57.0, shotConv:15.8, shotAcc:42.1, xg:1.55, xgOver:0.45, defSave:89.7, goalDiff:1.00, shotDom:1.48, conf:"UEFA" },
    { rank:8, name:"Croatia", flag:"🇭🇷", score:71, matches:31, goals:1.94, conceded:1.00, poss:56.6, shotConv:14.0, shotAcc:40.8, xg:1.74, xgOver:0.20, defSave:91.2, goalDiff:0.94, shotDom:1.42, conf:"UEFA" },
    { rank:9, name:"Portugal", flag:"🇵🇹", score:71, matches:32, goals:2.22, conceded:1.00, poss:60.5, shotConv:14.3, shotAcc:41.5, xg:1.88, xgOver:0.34, defSave:89.2, goalDiff:1.22, shotDom:1.55, conf:"UEFA" },
    { rank:10, name:"England", flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", score:71, matches:35, goals:1.80, conceded:0.77, poss:64.3, shotConv:13.6, shotAcc:40.2, xg:1.57, xgOver:0.23, defSave:88.5, goalDiff:1.03, shotDom:1.50, conf:"UEFA" },
    { rank:11, name:"Netherlands", flag:"🇳🇱", score:70, matches:34, goals:2.53, conceded:1.12, poss:58.0, shotConv:18.4, shotAcc:44.0, xg:1.66, xgOver:0.87, defSave:88.1, goalDiff:1.41, shotDom:1.58, conf:"UEFA" },
    { rank:12, name:"Belgium", flag:"🇧🇪", score:67, matches:32, goals:1.97, conceded:1.03, poss:60.5, shotConv:13.2, shotAcc:39.5, xg:1.53, xgOver:0.44, defSave:87.7, goalDiff:0.94, shotDom:1.42, conf:"UEFA" },
    { rank:13, name:"Morocco", flag:"🇲🇦", score:67, matches:32, goals:1.66, conceded:0.31, poss:61.2, shotConv:12.0, shotAcc:38.8, xg:1.64, xgOver:0.02, defSave:93.7, goalDiff:1.35, shotDom:1.38, conf:"CAF" },
    { rank:14, name:"Switzerland", flag:"🇨🇭", score:66, matches:31, goals:1.68, conceded:1.10, poss:54.4, shotConv:16.8, shotAcc:41.2, xg:1.30, xgOver:0.38, defSave:88.0, goalDiff:0.58, shotDom:1.35, conf:"UEFA" },
    { rank:15, name:"Germany", flag:"🇩🇪", score:65, matches:42, goals:2.02, conceded:1.24, poss:63.7, shotConv:14.8, shotAcc:41.0, xg:1.70, xgOver:0.32, defSave:87.2, goalDiff:0.78, shotDom:1.50, conf:"UEFA" },
    { rank:16, name:"Brazil", flag:"🇧🇷", score:60, matches:33, goals:1.64, conceded:1.09, poss:59.9, shotConv:14.7, shotAcc:40.5, xg:1.37, xgOver:0.27, defSave:87.0, goalDiff:0.55, shotDom:1.38, conf:"CONMEBOL" },
    { rank:17, name:"Denmark", flag:"🇩🇰", score:60, matches:30, goals:1.70, conceded:0.97, poss:53.3, shotConv:12.6, shotAcc:38.2, xg:1.51, xgOver:0.19, defSave:90.1, goalDiff:0.73, shotDom:1.32, conf:"UEFA" },
    { rank:18, name:"Uruguay", flag:"🇺🇾", score:59, matches:35, goals:1.40, conceded:0.77, poss:52.1, shotConv:14.9, shotAcc:40.0, xg:1.11, xgOver:0.29, defSave:91.0, goalDiff:0.63, shotDom:1.25, conf:"CONMEBOL" },
    { rank:19, name:"Italy", flag:"🇮🇹", score:45, matches:32, goals:1.81, conceded:1.31, poss:52.4, shotConv:13.2, shotAcc:39.0, xg:1.51, xgOver:0.30, defSave:88.2, goalDiff:0.50, shotDom:1.28, conf:"UEFA" },
    { rank:20, name:"Ecuador", flag:"🇪🇨", score:44, matches:35, goals:1.06, conceded:0.60, poss:53.1, shotConv:10.2, shotAcc:36.5, xg:1.28, xgOver:-0.22, defSave:93.2, goalDiff:0.46, shotDom:1.18, conf:"CONMEBOL" },
    { rank:21, name:"Mexico", flag:"🇲🇽", score:42, matches:25, goals:1.28, conceded:1.36, poss:53.4, shotConv:11.6, shotAcc:37.8, xg:1.20, xgOver:0.08, defSave:80.6, goalDiff:-0.08, shotDom:1.15, conf:"CONCACAF" },
    { rank:22, name:"Serbia", flag:"🇷🇸", score:35, matches:32, goals:1.22, conceded:1.06, poss:49.9, shotConv:12.1, shotAcc:37.5, xg:1.16, xgOver:0.06, defSave:90.6, goalDiff:0.16, shotDom:1.10, conf:"UEFA" },
    { rank:23, name:"France", flag:"🇫🇷", score:30, matches:34, goals:1.65, conceded:1.00, poss:57.0, shotConv:10.2, shotAcc:36.8, xg:1.84, xgOver:-0.19, defSave:85.9, goalDiff:0.65, shotDom:1.35, conf:"UEFA" },
    { rank:24, name:"Canada", flag:"🇨🇦", score:14, matches:19, goals:0.89, conceded:0.95, poss:45.1, shotConv:9.7, shotAcc:35.2, xg:1.11, xgOver:-0.22, defSave:89.4, goalDiff:-0.06, shotDom:1.02, conf:"CONCACAF" },
    { rank:25, name:"USA", flag:"🇺🇸", score:13, matches:3, goals:1.00, conceded:1.00, poss:46.0, shotConv:8.8, shotAcc:34.5, xg:1.36, xgOver:-0.36, defSave:87.8, goalDiff:0.00, shotDom:1.00, conf:"CONCACAF" },
];

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
