// Self-contained interactive lecture animation, rendered inside a sandboxed
// iframe so its global CSS stays fully isolated from the article page.
// Embed it in an article by typing the marker [[lecture-demo]] in the editor.

const DEMO_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Lecture Preview</title>
  <style>
    :root {
      --bg-primary: #ffffff;
      --bg-app: #f8fafc;
      --border-color: #e2e8f0;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --accent-green: #22c55e;
      --accent-blue: #3b82f6;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    /* Main Container representing the app window */
    .app-container {
      width: 420px;
      height: 520px;
      background: var(--bg-primary);
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }

    /* Top Navigation Bar */
    .app-header {
      padding: 14px 18px;
      background: var(--bg-app);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .app-title {
      font-weight: 600;
      font-size: 14px;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .live-badge {
      background: #dcfce7;
      color: #15803d;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .live-badge::before {
      content: '';
      width: 6px;
      height: 6px;
      background: var(--accent-green);
      border-radius: 50%;
      display: inline-block;
    }

    /* Content Area & Stage Setup */
    .app-content {
      flex: 1;
      position: relative;
      background: #ffffff;
      padding: 24px;
    }

    .stage {
      position: absolute;
      top: 24px;
      left: 24px;
      right: 24px;
      bottom: 24px;
      opacity: 0;
      transform: scale(0.98);
      transition: all 0.4s ease-in-out;
      pointer-events: none;
      display: flex;
      flex-direction: column;
    }

    /* --- STAGE 0: BASE DECK SLIDE --- */
    .slide-title {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 20px;
      color: var(--text-main);
    }

    .slide-bullet {
      font-size: 15px;
      color: var(--text-main);
      margin: 10px 0;
      padding-left: 8px;
      border-left: 3px solid var(--accent-blue);
    }

    .slide-footer {
      margin-top: auto;
      border-top: 1px solid var(--border-color);
      padding-top: 14px;
      display: flex;
      justify-content: space-between;
      color: var(--text-muted);
      font-size: 13px;
    }

    /* --- STAGE 1: BREAK / QR CODE --- */
    .break-title {
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      color: var(--text-main);
      margin-bottom: 4px;
    }
    .break-subtitle {
      font-size: 14px;
      color: var(--text-muted);
      text-align: center;
      margin-bottom: 16px;
    }

    /* QR Code representation using your exact 7x7 matrix */
    .qr-grid {
      display: grid;
      grid-template-columns: repeat(7, 18px);
      grid-gap: 3px;
      justify-content: center;
      margin: 10px auto;
    }

    .qr-grid span {
      width: 18px;
      height: 18px;
      background-color: #1e293b;
      border-radius: 2px;
    }

    .qr-grid span.off {
      background-color: #f1f5f9;
    }

    .joined-users {
      display: flex;
      justify-content: center;
      gap: 6px;
      margin-top: 16px;
    }

    .user-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      animation: popIn 0.3s ease forwards;
    }

    /* --- STAGE 2: OBSERVE GROUPS --- */
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 16px;
    }

    .group-row {
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      font-size: 14px;
    }

    .group-name {
      width: 70px;
      font-weight: 500;
    }

    .group-bar-container {
      flex: 1;
      height: 12px;
      background: #f1f5f9;
      border-radius: 6px;
      margin: 0 12px;
      overflow: hidden;
      position: relative;
    }

    .group-bar-fill {
      height: 100%;
      background: var(--accent-blue);
      border-radius: 6px;
      width: 0;
      transition: width 1.5s ease-out;
    }

    .group-notes {
      width: 55px;
      text-align: right;
      color: var(--text-muted);
      font-size: 13px;
    }

    /* --- STAGE 3: LEADERBOARD --- */
    .lb-row {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      background: #f8fafc;
      border-radius: 8px;
      margin-bottom: 8px;
      font-size: 14px;
      border: 1px solid transparent;
    }

    .lb-row.top {
      background: #fef08a;
      border-color: #fef08a;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(234, 179, 8, 0.15);
    }

    .lb-medal { width: 28px; font-size: 16px; }
    .lb-name { flex: 1; }
    .lb-pts { color: var(--text-main); font-weight: 600; }

    /* --- STAGE 4: RESUMED TOAST --- */
    .toast-overlay {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #1e293b;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 8px;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 10;
    }

    /* --- CSS MASTER TIMELINE INTERPOLATION --- */
    @keyframes cycleStages {
      /* Stage 0: Slide Deck (0s - 2.2s) */
      0%, 15% { opacity: 1; transform: scale(1); pointer-events: auto; }
      17% { opacity: 0; transform: scale(0.98); pointer-events: none; }

      /* Stage 1: Break & QR (2.2s - 4.8s) */
      20%, 35% { opacity: 1; transform: scale(1); pointer-events: auto; }
      37% { opacity: 0; transform: scale(0.98); pointer-events: none; }

      /* Stage 2: Live Group Tracking (4.8s - 7.4s) */
      40%, 55% { opacity: 1; transform: scale(1); pointer-events: auto; }
      57% { opacity: 0; transform: scale(0.98); pointer-events: none; }

      /* Stage 3: Leaderboard (7.4s - 10s) */
      60%, 75% { opacity: 1; transform: scale(1); pointer-events: auto; }
      77% { opacity: 0; transform: scale(0.98); pointer-events: none; }

      /* Stage 4: Back to Deck Slide + Toast (10s - 13s) */
      80%, 100% { opacity: 1; transform: scale(1); pointer-events: auto; }
    }

    /* Apply timeline loops to stages */
    .st-0 { animation: cycleStages 13s infinite; }
    .st-1 { animation: cycleStages 13s infinite; opacity: 0; }
    .st-2 { animation: cycleStages 13s infinite; opacity: 0; }
    .st-3 { animation: cycleStages 13s infinite; opacity: 0; }
    .st-4 { animation: cycleStages 13s infinite; opacity: 0; }

    /* Match internal delay logic for sub-animations */
    .st-0 { animation-delay: 0s; }
    .st-1 { animation-delay: -2.2s; }
    .st-2 { animation-delay: -4.8s; }
    .st-3 { animation-delay: -7.4s; }
    .st-4 { animation-delay: -10s; }

    /* Animating the progress bars relative to Stage 2 timeline loop */
    @keyframes fillG1 { 0%, 40% { width: 0; } 50%, 100% { width: 85%; } }
    @keyframes fillG2 { 0%, 40% { width: 0; } 50%, 100% { width: 55%; } }
    @keyframes fillG3 { 0%, 40% { width: 0; } 50%, 100% { width: 70%; } }
    @keyframes fillG4 { 0%, 40% { width: 0; } 50%, 100% { width: 40%; } }

    .st-2 .b1 { animation: fillG1 13s infinite; }
    .st-2 .b2 { animation: fillG2 13s infinite; }
    .st-2 .b3 { animation: fillG3 13s infinite; }
    .st-2 .b4 { animation: fillG4 13s infinite; }

    /* Toast notification logic matching Stage 4 */
    @keyframes toastPop {
      0%, 76% { opacity: 0; transform: translateX(-50%) translateY(40px); }
      80%, 95% { opacity: 1; transform: translateX(-50%) translateY(0); }
      100% { opacity: 0; transform: translateX(-50%) translateY(40px); }
    }
    .toast-overlay { animation: toastPop 13s infinite; }

    /* Dynamic text switcher to handle the status shift in footer */
    @keyframes footerText {
      0%, 76% { content: '⏸ Break after this slide'; }
      80%, 100% { content: '▶ Resumed'; color: var(--accent-green); font-weight: 600; }
    }
    .dynamic-status::after {
      content: '⏸ Break after this slide';
      animation: footerText 13s infinite;
    }

    /* Scale the fixed-size card down so it fits narrow screens */
    @media (max-width: 480px) {
      body { align-items: flex-start; padding-top: 10px; }
      .app-container { transform: scale(0.82); transform-origin: top center; }
    }
  </style>
</head>
<body>

  <div class="app-container">
    <div class="app-header">
      <div class="app-title">\u{1f3ac} Interactive Lecture — Week 6</div>
      <div class="live-badge">Live</div>
    </div>

    <div class="app-content">

      <div class="stage st-0">
        <div class="slide-title">\u{1f510} The CIA Triad</div>
        <div class="slide-bullet"><strong>Confidentiality</strong> — keep data private</div>
        <div class="slide-bullet"><strong>Integrity</strong> — keep data accurate</div>
        <div class="slide-bullet"><strong>Availability</strong> — keep data accessible</div>

        <div class="slide-footer">
          <span>Slide 7 / 18</span>
          <span class="dynamic-status"></span>
        </div>
      </div>

      <div class="stage st-1">
        <div class="break-title">⏸ Break</div>
        <div class="break-subtitle">\u{1f4ac} Group Discussion</div>

        <div class="qr-grid">
          <span></span><span></span><span></span><span class="off"></span><span></span><span></span><span></span>
          <span></span><span class="off"></span><span></span><span class="off"></span><span class="off"></span><span class="off"></span><span></span>
          <span></span><span></span><span></span><span class="off"></span><span></span><span></span><span></span>
          <span class="off"></span><span class="off"></span><span class="off"></span><span></span><span class="off"></span><span class="off"></span><span class="off"></span>
          <span></span><span></span><span class="off"></span><span></span><span></span><span class="off"></span><span></span>
          <span></span><span class="off"></span><span></span><span class="off"></span><span class="off"></span><span></span><span class="off"></span>
          <span></span><span></span><span></span><span class="off"></span><span></span><span class="off"></span><span></span>
        </div>

        <div class="break-subtitle" style="margin-top:12px;">Scan to join your group</div>
        <div class="joined-users">
          <span class="user-dot" style="background: #ffc8d8;"></span>
          <span class="user-dot" style="background: #bbd8ff;"></span>
          <span class="user-dot" style="background: #fff0b3;"></span>
          <span class="user-dot" style="background: #b8f0c8;"></span>
          <span class="user-dot" style="background: #ddc8ff;"></span>
        </div>
      </div>

      <div class="stage st-2">
        <div class="section-title">\u{1f441} Observing · 4 groups live</div>

        <div class="group-row">
          <div class="group-name">Group 1</div>
          <div class="group-bar-container"><div class="group-bar-fill b1"></div></div>
          <div class="group-notes">6 notes</div>
        </div>
        <div class="group-row">
          <div class="group-name">Group 2</div>
          <div class="group-bar-container"><div class="group-bar-fill b2" style="background:#ec4899;"></div></div>
          <div class="group-notes">4 notes</div>
        </div>
        <div class="group-row">
          <div class="group-name">Group 3</div>
          <div class="group-bar-container"><div class="group-bar-fill b3" style="background:#10b981;"></div></div>
          <div class="group-notes">5 notes</div>
        </div>
        <div class="group-row">
          <div class="group-name">Group 4</div>
          <div class="group-bar-container"><div class="group-bar-fill b4" style="background:#f59e0b;"></div></div>
          <div class="group-notes">3 notes</div>
        </div>
      </div>

      <div class="stage st-3">
        <div class="section-title">\u{1f3c6} Discussion Leaderboard</div>

        <div class="lb-row top">
          <span class="lb-medal">\u{1f947}</span>
          <span class="lb-name">Group 1</span>
          <span class="lb-pts">980 pts</span>
        </div>
        <div class="lb-row">
          <span class="lb-medal">\u{1f948}</span>
          <span class="lb-name">Group 3</span>
          <span class="lb-pts">910 pts</span>
        </div>
        <div class="lb-row">
          <span class="lb-medal">\u{1f949}</span>
          <span class="lb-name">Group 2</span>
          <span class="lb-pts">840 pts</span>
        </div>
        <div class="lb-row">
          <span class="lb-medal">4</span>
          <span class="lb-name">Group 4</span>
          <span class="lb-pts">770 pts</span>
        </div>
      </div>

      <div class="toast-overlay">
        <span>▶</span> Lecture resumed
      </div>

    </div>
  </div>

</body>
</html>`

export default function LectureDemo() {
  return (
    <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center' }}>
      <iframe
        title="Interactive Lecture Preview"
        srcDoc={DEMO_HTML}
        loading="lazy"
        sandbox=""
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '560px',
          border: 'none',
          borderRadius: '16px',
        }}
      />
    </div>
  )
}
