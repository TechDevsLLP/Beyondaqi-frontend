const fs = require('fs');

let html = fs.readFileSync('beyondaqi-redesign.html', 'utf8');

// Replace CSS
const newCss = `
:root {
  --bg: #09090b; --surface: #18181b; --surface2: #27272a; --surface3: #3f3f46;
  --border: rgba(255, 255, 255, 0.08); --border-hover: rgba(255, 255, 255, 0.15);
  --text: #fafafa; --text-muted: #a1a1aa; --text-dim: #71717a;
  --good: #10b981; --moderate: #eab308; --poor: #f97316; --unhealthy: #ef4444; --severe: #d946ef; --hazardous: #9333ea;
  --good-bg: rgba(16, 185, 129, 0.15); --moderate-bg: rgba(234, 179, 8, 0.15); --poor-bg: rgba(249, 115, 22, 0.15);
  --unhealthy-bg: rgba(239, 68, 68, 0.15); --severe-bg: rgba(217, 70, 239, 0.15); --hazardous-bg: rgba(147, 51, 234, 0.15);
  --accent: #3b82f6; --accent-hover: #2563eb; --accent2: #60a5fa;
  --radius: 16px; --radius-sm: 12px; --radius-xs: 8px;
}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'Inter',system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;min-height:100vh;letter-spacing:-0.01em}

/* ── Sticky top bar ── */
.sticky-bar{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(9,9,11,0.8);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:64px;transition:all 0.3s ease;}
.sticky-logo-img{height:28px;display:block;}
.sticky-aqi-pill{display:flex;align-items:center;gap:10px;background:var(--surface2);border:1px solid var(--border);border-radius:50px;padding:6px 16px;font-size:.85rem;font-weight:500;box-shadow:0 2px 10px rgba(0,0,0,0.2)}
.sticky-aqi-pill .dot{width:8px;height:8px;border-radius:50%;background:var(--poor);animation:pulse 2s infinite;box-shadow:0 0 8px var(--poor)}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.sticky-aqi-pill .val{font-weight:700;font-size:1rem;color:var(--poor);font-family:'Fira Code',monospace;}
.sticky-nav{display:flex;gap:28px;font-size:.9rem;color:var(--text-muted);font-weight:500}
.sticky-nav a{color:var(--text-muted);text-decoration:none;transition:color .2s}
.sticky-nav a:hover{color:var(--text)}
.sticky-search{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:8px 16px;font-size:.85rem;color:var(--text-muted);transition:border-color 0.2s}
.sticky-search:hover{border-color:var(--border-hover)}

/* ── Layout ── */
main{padding-top:64px}
.container{max-width:1160px;margin:0 auto;padding:0 24px}
section{padding:48px 0}

/* ── Section headings ── */
.section-label{font-size:.75rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent2);margin-bottom:8px}
.section-title{font-size:1.75rem;font-weight:700;color:var(--text);margin-bottom:32px;letter-spacing:-0.02em}

/* ── AQI severity helpers ── */
.sev-good{color:var(--good)}
.sev-moderate{color:var(--moderate)}
.sev-poor{color:var(--poor)}
.sev-unhealthy{color:var(--unhealthy)}
.sev-severe{color:var(--severe)}
.badge{display:inline-flex;align-items:center;justify-content:center;padding:4px 12px;border-radius:50px;font-size:.75rem;font-weight:600;letter-spacing:.3px;text-transform:uppercase;}
.badge-good{background:var(--good-bg);color:var(--good);border:1px solid rgba(16,185,129,0.3)}
.badge-moderate{background:var(--moderate-bg);color:var(--moderate);border:1px solid rgba(234,179,8,0.3)}
.badge-poor{background:var(--poor-bg);color:var(--poor);border:1px solid rgba(249,115,22,0.3)}
.badge-unhealthy{background:var(--unhealthy-bg);color:var(--unhealthy);border:1px solid rgba(239,68,68,0.3)}
.badge-severe{background:var(--severe-bg);color:var(--severe);border:1px solid rgba(217,70,239,0.3)}

/* ══ HERO SECTION ══ */
.hero{background:radial-gradient(ellipse at top,#111827 0%,#09090b 100%);border-bottom:1px solid var(--border);padding:56px 0 48px}
.hero-inner{display:grid;grid-template-columns:1fr 1fr 340px;gap:32px;align-items:start}
.hero-meta .live-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.15);color:#fca5a5;border:1px solid rgba(239,68,68,.3);border-radius:50px;padding:4px 12px;font-size:.75rem;font-weight:700;letter-spacing:1px;margin-bottom:16px}
.hero-meta .live-badge::before{content:'';width:8px;height:8px;border-radius:50%;background:#ef4444;animation:pulse 1.5s infinite;box-shadow: 0 0 8px #ef4444;}
.hero-meta h1{font-size:2.5rem;font-weight:800;color:var(--text);line-height:1.2;letter-spacing:-0.03em;margin-bottom:12px}
.hero-meta p{font-size:1.05rem;color:var(--text-muted);margin-bottom:8px}
.hero-meta .updated{font-size:.8rem;color:var(--text-dim);font-weight:500;}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:10px;padding:10px 18px;font-size:.85rem;font-weight:600;cursor:pointer;transition:all 0.2s;}
.btn-primary{background:var(--accent);border:1px solid var(--accent);color:#fff;box-shadow:0 4px 12px rgba(59,130,246,0.25);}
.btn-primary:hover{background:var(--accent-hover);transform:translateY(-1px);box-shadow:0 6px 16px rgba(59,130,246,0.35);}
.btn-secondary{background:var(--surface);border:1px solid var(--border);color:var(--text);}
.btn-secondary:hover{background:var(--surface2);border-color:var(--border-hover);transform:translateY(-1px);}

/* AQI number block */
.hero-aqi-block{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px 32px;position:relative;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,0.4)}
.hero-aqi-block::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--good) 0%,var(--moderate) 20%,var(--poor) 40%,var(--unhealthy) 60%,var(--severe) 80%,var(--hazardous) 100%)}
.aqi-label-sm{font-size:.75rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-dim);margin-bottom:4px}
.aqi-number{font-family:'Fira Code',monospace;font-size:4.5rem;font-weight:800;line-height:1;color:var(--poor);margin-bottom:8px;text-shadow:0 4px 20px rgba(249,115,22,0.3)}
.aqi-quality-badge{display:inline-flex;align-items:center;padding:6px 18px;border-radius:8px;font-size:.9rem;font-weight:700;background:var(--poor-bg);color:var(--poor);border:1px solid rgba(249,115,22,.4);margin-bottom:24px}
.pm-row{display:flex;gap:16px;margin-bottom:28px}
.pm-item{background:var(--surface2);border-radius:10px;padding:12px 16px;flex:1;border-left:3px solid var(--moderate);box-shadow:inset 0 1px 0 rgba(255,255,255,0.05)}
.pm-item.unhealthy-border{border-left-color:var(--unhealthy)}
.pm-item .pm-name{font-size:.75rem;color:var(--text-dim);font-weight:600;letter-spacing:.5px;margin-bottom:4px}
.pm-item .pm-val{font-size:1.25rem;font-weight:700;color:var(--text);font-family:'Fira Code',monospace;}
.pm-item .pm-badge{margin-top:6px}

/* Spectrum bar */
.spectrum-wrap{position:relative}
.spectrum-bar{height:12px;border-radius:6px;background:linear-gradient(90deg,var(--good) 0%,var(--moderate) 17%,var(--poor) 33%,var(--unhealthy) 50%,var(--severe) 67%,var(--hazardous) 100%);margin-bottom:8px;position:relative;box-shadow:inset 0 2px 4px rgba(0,0,0,0.3)}
.spectrum-needle{position:absolute;top:-6px;width:4px;height:24px;background:#fff;border-radius:2px;transform:translateX(-50%);box-shadow:0 0 10px rgba(255,255,255,1),0 0 4px rgba(0,0,0,0.5)}
.spectrum-needle::after{content:attr(data-val);position:absolute;top:-26px;left:50%;transform:translateX(-50%);background:#fff;color:#000;font-size:.7rem;font-weight:800;font-family:'Fira Code',monospace;padding:2px 6px;border-radius:4px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.2)}
.spectrum-labels{display:flex;justify-content:space-between;font-size:.7rem;font-weight:600;}
.spectrum-numbers{display:flex;justify-content:space-between;font-size:.65rem;color:var(--text-dim);margin-top:4px;font-family:'Fira Code',monospace;}

/* Weather card */
.weather-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;box-shadow:0 8px 24px rgba(0,0,0,0.2)}
.weather-temp-row{display:flex;align-items:center;gap:16px;margin-bottom:20px}
.weather-icon{font-size:2.5rem;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3))}
.weather-temp{font-family:'Fira Code',monospace;font-size:2.5rem;font-weight:800;color:var(--text);line-height:1}
.weather-desc{font-size:.9rem;color:var(--text-muted);font-weight:500;margin-top:4px}
.weather-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.weather-item{background:var(--surface2);border-radius:10px;padding:12px 14px}
.weather-item .w-label{font-size:.7rem;color:var(--text-dim);font-weight:600;margin-bottom:4px;letter-spacing:0.5px}
.weather-item .w-val{font-size:1rem;font-weight:600;color:var(--text);font-family:'Fira Code',monospace;}

/* ══ POLLUTANTS ══ */
.pollutants-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pollutant-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;position:relative;overflow:hidden;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.1)}
.pollutant-card:hover{border-color:var(--border-hover);transform:translateY(-4px);box-shadow:0 12px 24px rgba(0,0,0,0.2)}
.pollutant-card .pc-accent{position:absolute;left:0;top:0;bottom:0;width:4px;border-radius:var(--radius) 0 0 var(--radius)}
.pollutant-card .pc-name{font-size:.9rem;font-weight:600;color:var(--text-muted);margin-bottom:4px;padding-left:12px}
.pollutant-card .pc-val{font-family:'Fira Code',monospace;font-size:1.75rem;font-weight:800;color:var(--text);padding-left:12px;margin-bottom:12px}
.pollutant-card .pc-unit{font-size:.8rem;font-weight:500;color:var(--text-dim);font-family:'Inter',sans-serif;}
.progress-wrap{padding-left:12px}
.progress-track{height:8px;background:var(--surface3);border-radius:4px;overflow:visible;position:relative;margin-bottom:8px}
.progress-fill{height:100%;border-radius:4px;transition:width .6s cubic-bezier(0.4, 0, 0.2, 1);box-shadow:0 0 8px currentColor}
.progress-threshold{position:absolute;top:-6px;bottom:-6px;width:2px;background:#fff;border-radius:1px;box-shadow:0 0 4px rgba(0,0,0,0.5)}
.progress-threshold::after{content:'Safe';position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:.65rem;font-weight:600;color:#fff;background:rgba(0,0,0,0.6);padding:2px 4px;border-radius:4px;white-space:nowrap}
.progress-labels{display:flex;justify-content:space-between;font-size:.7rem;color:var(--text-dim);font-weight:500}
.pc-footer{display:flex;align-items:center;justify-content:space-between;padding-left:12px;margin-top:16px}
.pc-limit{font-size:.7rem;color:var(--text-dim);font-weight:500}

/* ══ CHART ══ */
.chart-section{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:28px;box-shadow:0 8px 24px rgba(0,0,0,0.15)}
.chart-controls{display:flex;align-items:center;gap:12px;margin-bottom:24px;flex-wrap:wrap}
.chart-title-block{flex:1}
.chart-title-block h2{font-size:1.25rem;font-weight:700;margin-bottom:4px}
.chart-title-block p{font-size:.85rem;color:var(--text-muted)}
.tab-group{display:flex;background:var(--surface2);border-radius:10px;padding:4px;gap:2px}
.tab-btn{padding:8px 16px;border-radius:8px;border:none;background:transparent;color:var(--text-muted);font-size:.85rem;font-weight:600;cursor:pointer;transition:all .2s}
.tab-btn:hover{color:var(--text)}
.tab-btn.active{background:var(--surface3);color:var(--text);box-shadow:0 2px 4px rgba(0,0,0,.2)}
.select-pill{background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:8px 16px;font-size:.85rem;font-weight:500;cursor:pointer;appearance:none;-webkit-appearance:none;outline:none;transition:border-color 0.2s}
.select-pill:focus{border-color:var(--accent)}
.chart-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px}
.chart-stat{background:var(--surface2);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:4px;border:1px solid transparent;transition:border-color 0.2s}
.chart-stat:hover{border-color:var(--border)}
.chart-stat .cs-label{font-size:.7rem;color:var(--text-dim);font-weight:600;letter-spacing:0.5px}
.chart-stat .cs-val{font-size:1.25rem;font-weight:800;font-family:'Fira Code',monospace;}
.chart-stat .cs-date{font-size:.75rem;color:var(--text-dim);font-weight:500}
.chart-stat.cs-min .cs-val{color:var(--good)}
.chart-stat.cs-max .cs-val{color:var(--unhealthy)}
.chart-stat.cs-avg .cs-val{color:var(--moderate)}
.chart-stat.cs-today .cs-val{color:var(--poor)}
.chart-wrap{position:relative;height:320px}
.chart-legend-bands{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;justify-content:center}
.band-item{display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--text-muted);font-weight:500}
.band-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}

/* ══ METRO CITIES ══ */
.metro-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.metro-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:24px;cursor:pointer;transition:all .3s ease;position:relative;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1)}
.metro-card:hover{border-color:var(--border-hover);transform:translateY(-4px);box-shadow:0 12px 24px rgba(0,0,0,0.2)}
.metro-card::before{content:'';position:absolute;left:0;top:-1px;bottom:0;width:4px}
.metro-card.mc-good::before{background:var(--good)}
.metro-card.mc-moderate::before{background:var(--moderate)}
.metro-card.mc-poor::before{background:var(--poor)}
.metro-card.mc-unhealthy::before{background:var(--unhealthy)}
.metro-card.mc-severe::before{background:var(--severe)}
.metro-card .mc-city{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:4px;padding-left:12px}
.metro-card .mc-rank{position:absolute;top:16px;right:16px;font-size:.7rem;font-weight:600;color:var(--text-muted);background:var(--surface2);border-radius:50px;padding:4px 10px;border:1px solid var(--border)}
.metro-card .mc-aqi{font-size:2.5rem;font-weight:800;padding-left:12px;margin-bottom:8px;font-family:'Fira Code',monospace;}
.metro-card .mc-badge{margin-left:12px;margin-bottom:16px}
.metro-card .mc-pms{display:flex;gap:16px;padding-left:12px;margin-bottom:12px}
.metro-card .mc-pm{font-size:.8rem;color:var(--text-dim);font-weight:500}
.metro-card .mc-pm span{color:var(--text);font-weight:700;font-family:'Fira Code',monospace;}
.metro-card .mc-trend{font-size:.75rem;position:absolute;bottom:24px;right:16px;color:var(--text-muted);font-weight:600}
.metro-card canvas{width:100%!important;height:45px!important}

/* ══ LEADERBOARD ══ */
.leaderboard-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:16px}
.lb-controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.lb-search{background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:10px 16px;font-size:.85rem;width:240px;outline:none;transition:border-color 0.2s}
.lb-search:focus{border-color:var(--accent)}
.lb-select{background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:10px 16px;font-size:.85rem;cursor:pointer;outline:none;transition:border-color 0.2s}
.lb-select:focus{border-color:var(--accent)}
.leaderboard-table{width:100%;border-collapse:separate;border-spacing:0 8px}
.leaderboard-table thead th{font-size:.75rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-dim);padding:12px 20px;text-align:left;}
.leaderboard-table tbody tr{background:var(--surface);cursor:pointer;transition:all .2s ease;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.leaderboard-table tbody tr:hover{background:var(--surface2);transform:scale(1.005)}
.leaderboard-table tbody td{padding:16px 20px;font-size:.95rem;vertical-align:middle;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.leaderboard-table tbody td:first-child{border-radius:10px 0 0 10px;border-left:4px solid transparent}
.leaderboard-table tbody td:last-child{border-radius:0 10px 10px 0;border-right:1px solid var(--border)}
.lb-rank{font-weight:800;color:var(--text-dim);font-size:1rem;font-family:'Fira Code',monospace;}
.lb-rank.gold{color:#fbbf24;text-shadow:0 0 10px rgba(251,191,36,0.3)}
.lb-rank.silver{color:#9ca3af}
.lb-rank.bronze{color:#b45309}
.lb-city-name{font-weight:600;color:var(--text)}
.lb-aqi-badge{display:inline-block;padding:6px 16px;border-radius:8px;font-weight:800;font-size:1rem;font-family:'Fira Code',monospace;min-width:64px;text-align:center}
.lb-aqi-badge.good{background:var(--good-bg);color:var(--good);border:1px solid rgba(16,185,129,.35)}
.lb-aqi-badge.moderate{background:var(--moderate-bg);color:var(--moderate);border:1px solid rgba(234,179,8,.35)}
.lb-aqi-badge.poor{background:var(--poor-bg);color:var(--poor);border:1px solid rgba(249,115,22,.35)}
.lb-aqi-badge.unhealthy{background:var(--unhealthy-bg);color:var(--unhealthy);border:1px solid rgba(239,68,68,.35)}
.lb-aqi-badge.severe{background:var(--severe-bg);color:var(--severe);border:1px solid rgba(217,70,239,.35)}
.lb-aqi-badge.hazardous{background:var(--hazardous-bg);color:var(--hazardous);border:1px solid rgba(147,51,234,.35)}
.lb-status{font-size:.85rem;font-weight:700}
.lb-trend{font-size:1rem;font-weight:800}
.lb-trend.up{color:var(--unhealthy)}
.lb-trend.down{color:var(--good)}
.lb-trend.flat{color:var(--text-dim)}
.puff-bar-wrap{display:flex;align-items:center;gap:12px}
.puff-track{height:6px;background:var(--surface3);border-radius:3px;width:100px;overflow:hidden}
.puff-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--accent2),var(--accent))}
.puff-val{font-size:.9rem;font-weight:700;color:var(--text);min-width:32px;font-family:'Fira Code',monospace;}

/* Row severity left-border */
.row-severe td:first-child{border-left-color:var(--severe)!important}
.row-unhealthy td:first-child{border-left-color:var(--unhealthy)!important}
.row-poor td:first-child{border-left-color:var(--poor)!important}
.row-moderate td:first-child{border-left-color:var(--moderate)!important}
.row-good td:first-child{border-left-color:var(--good)!important}

/* Pagination */
.pagination{display:flex;align-items:center;gap:8px;justify-content:flex-end;margin-top:20px}
.page-btn{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:var(--surface2);color:var(--text-muted);font-size:.85rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:'Fira Code',monospace;}
.page-btn:hover{background:var(--surface3);color:var(--text)}
.page-btn.active{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 4px 10px rgba(59,130,246,0.3)}
.page-info{font-size:.85rem;color:var(--text-dim);font-weight:500;margin-right:12px}

/* ══ HEALTH ADVICE ══ */
.health-section{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:32px;box-shadow:0 8px 24px rgba(0,0,0,0.15)}
.audience-tabs{display:flex;gap:12px;margin-bottom:32px;flex-wrap:wrap}
.aud-tab{padding:10px 20px;border-radius:50px;border:1px solid var(--border);background:var(--surface2);color:var(--text-muted);font-size:.85rem;font-weight:600;cursor:pointer;transition:all .2s}
.aud-tab:hover{background:var(--surface3);color:var(--text)}
.aud-tab.active{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 4px 12px rgba(59,130,246,0.3)}
.health-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}
.health-card{border-radius:var(--radius-sm);padding:24px;border:1px solid transparent;transition:transform 0.2s}
.health-card:hover{transform:translateY(-2px)}
.health-card.hc-current{background:var(--surface2);border-color:var(--border)}
.health-card.hc-warning{background:rgba(239,68,68,.05);border-color:rgba(239,68,68,.2)}
.health-card.hc-advice{background:rgba(59,130,246,.05);border-color:rgba(59,130,246,.2)}
.health-card h4{font-size:.85rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px}
.health-card.hc-current h4{color:var(--text-dim)}
.health-card.hc-warning h4{color:#fca5a5}
.health-card.hc-advice h4{color:#93c5fd}
.health-card p{font-size:.9rem;color:var(--text-muted);line-height:1.6}
.health-card .hc-aqi-val{font-size:3rem;font-weight:800;color:var(--poor);line-height:1;font-family:'Fira Code',monospace;}
.advice-content{display:none}
.advice-content.active{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px}

/* ══ FAQ ══ */
.faq-list{display:flex;flex-direction:column;gap:12px}
.faq-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;transition:border-color 0.2s}
.faq-item:hover{border-color:var(--border-hover)}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;cursor:pointer;font-size:1rem;font-weight:600;color:var(--text);transition:background .2s}
.faq-q:hover{background:var(--surface2)}
.faq-q .faq-icon{color:var(--accent);font-size:1.5rem;flex-shrink:0;transition:transform .3s ease;line-height:1}
.faq-item.open .faq-icon{transform:rotate(45deg)}
.faq-a{display:none;padding:0 24px 20px;font-size:.95rem;color:var(--text-muted);line-height:1.7;border-top:1px solid var(--border);margin-top:16px;padding-top:16px}
.faq-item.open .faq-a{display:block;animation:fadeIn 0.3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}

/* ══ SUBSCRIBE ══ */
.subscribe-section{background:linear-gradient(135deg,var(--surface),var(--bg));border-top:1px solid var(--border);padding:80px 0}
.subscribe-inner{display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:center;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:48px;box-shadow:0 12px 32px rgba(0,0,0,0.2)}
.sub-title{font-size:2.5rem;font-weight:800;line-height:1.1;margin-bottom:16px;letter-spacing:-0.03em}
.sub-desc{color:var(--text-muted);font-size:1rem;margin-bottom:8px}
.sub-features{display:flex;gap:20px;flex-wrap:wrap;font-size:.85rem;color:var(--text-dim);font-weight:500;margin-top:24px}
.sub-features span{display:flex;align-items:center;gap:6px}
.sub-form{display:flex;gap:12px;flex-direction:column}
.sub-input{background:var(--surface3);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:16px 20px;font-size:1rem;width:100%;outline:none;transition:border-color 0.2s}
.sub-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(59,130,246,0.2)}
.sub-btn{background:var(--accent);color:#fff;border:none;border-radius:12px;padding:16px 24px;font-size:1rem;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 12px rgba(59,130,246,0.3)}
.sub-btn:hover{background:var(--accent-hover);transform:translateY(-2px);box-shadow:0 6px 16px rgba(59,130,246,0.4)}

/* ══ FOOTER ══ */
footer{background:var(--bg);border-top:1px solid var(--border);padding:48px 0 24px;}
.footer-inner{display:grid;grid-template-columns:2fr 1fr 1fr;gap:48px}
.footer-desc{font-size:.9rem;color:var(--text-dim);line-height:1.7;max-width:300px}
.footer-col h5{font-size:.8rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--text);margin-bottom:16px}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:12px}
.footer-col ul li a{font-size:.9rem;color:var(--text-muted);text-decoration:none;transition:color .2s;font-weight:500}
.footer-col ul li a:hover{color:var(--accent2)}
.footer-bottom{margin-top:40px;padding-top:24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;font-size:.8rem;color:var(--text-dim);font-weight:500}

/* ── RESPONSIVE DESIGN ── */
.table-responsive { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom:12px;}
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr 1fr; }
  .pollutants-grid { grid-template-columns: repeat(2, 1fr); }
  .metro-grid { grid-template-columns: repeat(2, 1fr); }
  .advice-content.active { grid-template-columns: repeat(2, 1fr); }
  .subscribe-inner { grid-template-columns: 1fr; gap:32px; padding:32px;}
}
@media (max-width: 768px) {
  .sticky-nav, .sticky-search { display: none; }
  .sticky-bar { padding: 0 20px; }
  .container { padding: 0 20px; }
  section { padding: 32px 0; }
  .hero-inner { grid-template-columns: 1fr; gap: 32px; }
  .hero-aqi-block, .weather-card { padding: 24px; }
  .pollutants-grid, .metro-grid { grid-template-columns: 1fr; }
  .chart-controls { gap: 12px; }
  .chart-title-block, .tab-group { flex: 1 1 100%; }
  .select-pill { flex: 1; text-align: center; }
  .chart-wrap { height: 260px; }
  .leaderboard-header { flex-direction: column; align-items: flex-start; }
  .lb-controls, .lb-search, .lb-select { width: 100%; }
  .health-section { padding: 20px; }
  .advice-content.active { grid-template-columns: 1fr; }
  .footer-inner { grid-template-columns: 1fr; gap: 32px; text-align: left; }
  .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
}
@media (max-width: 480px) {
  .aqi-number { font-size: 3.5rem; }
  .pm-row { flex-direction: column; gap: 12px; }
  .sticky-aqi-pill span:nth-child(2) { display: none; }
  .hero-meta h1 { font-size: 2rem; }
}
`;

html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${newCss}\n</style>`);

// Replace BeyondAQI instances with logo
html = html.replace(/<div class="sticky-logo">Beyond<span>AQI<\/span><\/div>/g, `<a href="#" style="display: flex; align-items: center;"><img src="beyond-white-logo.png" alt="BeyondAQI Logo" class="sticky-logo-img"></a>`);
html = html.replace(/<div class="footer-logo">Beyond<span>AQI<\/span><\/div>/g, `<div style="margin-bottom: 20px;"><img src="beyond-white-logo.png" alt="BeyondAQI Logo" style="height: 36px; display: block;"></div>`);

// Add the AQI map button to hero
const heroButtonsStr = `<div style="display:flex;gap:10px;margin-top:20px">
          <button style="background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:8px 16px;font-size:.8rem;cursor:pointer">📍 Locate Me</button>
          <button style="background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:8px 16px;font-size:.8rem;cursor:pointer">↗ Share</button>
        </div>`;

const newHeroButtons = `<div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="alert('Opening India AQI Map...')">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
            India AQI Map
          </button>
          <button class="btn btn-secondary">📍 Locate Me</button>
          <button class="btn btn-secondary">↗ Share</button>
        </div>`;

html = html.replace(heroButtonsStr, newHeroButtons);

fs.writeFileSync('beyondaqi-redesign.html', html);
console.log('Done patching.');
