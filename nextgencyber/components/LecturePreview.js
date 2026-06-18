import { useState, useEffect } from 'react'

// 7x7 "QR" matrix shown during the break stage
const LEC_QR = [
  1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 0, 0, 1,
  1, 1, 1, 0, 1, 1, 1,
  0, 0, 0, 1, 0, 0, 0,
  1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 0, 0, 1, 0,
  1, 1, 1, 0, 1, 0, 1,
]

const GROUPS = [
  { name: 'Group 1', w: '85%', notes: '6 notes', color: '#3b82f6' },
  { name: 'Group 2', w: '55%', notes: '4 notes', color: '#ec4899' },
  { name: 'Group 3', w: '70%', notes: '5 notes', color: '#10b981' },
  { name: 'Group 4', w: '40%', notes: '3 notes', color: '#f59e0b' },
]

const LB = [
  { medal: '🥇', name: 'Group 1', pts: '980', top: true },
  { medal: '🥈', name: 'Group 3', pts: '910' },
  { medal: '🥉', name: 'Group 2', pts: '840' },
  { medal: '4', name: 'Group 4', pts: '770' },
]

// variant: "card" renders a scaled-down thumbnail for the homepage grid;
// default renders full size for embedding inside an article.
export default function LecturePreview({ variant = 'full' }) {
  const [stage, setStage] = useState(0) // 0 lecture · 1 break/QR · 2 observe · 3 leaderboard · 4 resumed
  const isCard = variant === 'card'

  useEffect(() => {
    let timers = []
    const run = () => {
      setStage(0)
      timers = [
        setTimeout(() => setStage(1), 2200),
        setTimeout(() => setStage(2), 4800),
        setTimeout(() => setStage(3), 7400),
        setTimeout(() => setStage(4), 10000),
      ]
    }
    run()
    const loop = setInterval(() => {
      timers.forEach(clearTimeout)
      run()
    }, 13000)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(loop)
    }
  }, [])

  return (
    <div className={isCard ? 'lecWrap lecWrap--card' : 'lecWrap'}>
      <div className="lecScale">
        <div className="lecPreview">
          <div className="lecBar">
            <span className="lecBarTitle">🎬 Interactive Lecture — Week 6</span>
            <span className="lecLive"><span className="lecLiveDot" /> Live</span>
          </div>

          <div className="lecCanvas">
            {/* Base deck slide */}
            <div className="lecSlide">
              <div className="lecSlideHeading">🔐 The CIA Triad</div>
              <div className="lecSlideRow"><span className="lecSlideDot" /> Confidentiality — keep data private</div>
              <div className="lecSlideRow"><span className="lecSlideDot" /> Integrity — keep data accurate</div>
              <div className="lecSlideRow"><span className="lecSlideDot" /> Availability — keep data accessible</div>
              <div className="lecSlideFoot">
                <span>Slide 7 / 18</span>
                <span>{stage === 4 ? '▶ Resumed' : '⏸ Break after this slide'}</span>
              </div>
            </div>

            {/* Stage 1 — break: QR pops up */}
            <div className={`lecStage lecBreak ${stage === 1 ? 'lecStageOn' : ''}`}>
              <div className="lecBreakBadge">⏸ Break</div>
              <div className="lecBreakTitle">💬 Group Discussion</div>
              <div className="lecQr">
                {LEC_QR.map((c, i) => <span key={i} className={c ? '' : 'off'} />)}
              </div>
              <div className="lecBreakHint">Scan to join your group</div>
              <div className="lecJoined">
                {['#ffc8d8', '#bbd8ff', '#fff0b3', '#b8f0c8', '#ddc8ff'].map(c => (
                  <span key={c} className="lecJoinedDot" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Stage 2 — observe: all groups live */}
            <div className={`lecStage lecObserve ${stage === 2 ? 'lecStageOn' : ''}`}>
              <div className="lecObsHead">👁 Observing · 4 groups live</div>
              <div className="lecObsGrid">
                {GROUPS.map(g => (
                  <div key={g.name} className="lecObsRow">
                    <span className="lecObsName">{g.name}</span>
                    <span className="lecObsBarTrack">
                      <span className="lecObsBarFill" style={{ '--w': g.w, background: g.color }} />
                    </span>
                    <span className="lecObsNotes">{g.notes}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 3 — leaderboard */}
            <div className={`lecStage lecLb ${stage === 3 ? 'lecStageOn' : ''}`}>
              <div className="lecLbHead">🏆 Discussion Leaderboard</div>
              <div className="lecLbRows">
                {LB.map(r => (
                  <div key={r.name} className={`lecLbRow ${r.top ? 'top' : ''}`}>
                    <span className="lecLbMedal">{r.medal}</span>
                    <span className="lecLbName">{r.name}</span>
                    <span className="lecLbPts">{r.pts} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 4 — resumed toast */}
            <div className={`lecToast ${stage === 4 ? 'lecToastOn' : ''}`}>▶ Lecture resumed</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lecWrap {
          display: flex;
          justify-content: center;
          margin: 2rem 0;
        }
        .lecWrap--card {
          margin: 0;
          width: 100%;
          height: 180px;
          background: linear-gradient(135deg, #C1E1D2, #C9D8C4);
          align-items: center;
          overflow: hidden;
        }
        .lecWrap--card .lecScale {
          transform: scale(0.36);
          transform-origin: center;
        }

        .lecPreview {
          width: 320px;
          height: 440px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1e293b;
        }

        .lecBar {
          padding: 12px 16px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .lecBarTitle { font-weight: 600; font-size: 13px; }
        .lecLive {
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
        .lecLiveDot {
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 50%;
          animation: lecPulse 1.6s ease-in-out infinite;
        }

        .lecCanvas {
          flex: 1;
          position: relative;
          background: #ffffff;
          padding: 20px;
        }

        /* Base slide */
        .lecSlide {
          position: absolute;
          inset: 20px;
          display: flex;
          flex-direction: column;
        }
        .lecSlideHeading { font-size: 19px; font-weight: 700; margin-bottom: 18px; }
        .lecSlideRow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          margin: 9px 0;
        }
        .lecSlideDot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3b82f6;
          flex-shrink: 0;
        }
        .lecSlideFoot {
          margin-top: auto;
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
          display: flex;
          justify-content: space-between;
          color: #64748b;
          font-size: 12px;
        }

        /* Stage overlays */
        .lecStage {
          position: absolute;
          inset: 0;
          background: #ffffff;
          padding: 20px;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: scale(0.98);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
        }
        .lecStageOn { opacity: 1; transform: scale(1); }

        /* Break / QR */
        .lecBreak { align-items: center; }
        .lecBreakBadge { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
        .lecBreakTitle { font-size: 14px; color: #64748b; margin-bottom: 14px; }
        .lecQr {
          display: grid;
          grid-template-columns: repeat(7, 18px);
          grid-gap: 3px;
          justify-content: center;
          margin: 6px auto;
        }
        .lecQr span {
          width: 18px;
          height: 18px;
          background: #1e293b;
          border-radius: 2px;
        }
        .lecQr span.off { background: #f1f5f9; }
        .lecBreakHint { font-size: 13px; color: #64748b; margin-top: 14px; }
        .lecJoined { display: flex; gap: 6px; margin-top: 14px; }
        .lecJoinedDot { width: 10px; height: 10px; border-radius: 50%; }

        /* Observe */
        .lecObsHead { font-size: 15px; font-weight: 700; margin-bottom: 16px; }
        .lecObsGrid { display: flex; flex-direction: column; gap: 14px; }
        .lecObsRow { display: flex; align-items: center; font-size: 13px; }
        .lecObsName { width: 64px; font-weight: 500; }
        .lecObsBarTrack {
          flex: 1;
          height: 11px;
          background: #f1f5f9;
          border-radius: 6px;
          margin: 0 10px;
          overflow: hidden;
        }
        .lecObsBarFill {
          display: block;
          height: 100%;
          width: 0;
          border-radius: 6px;
          transition: width 1.4s ease-out;
        }
        .lecStageOn .lecObsBarFill { width: var(--w); }
        .lecObsNotes { width: 52px; text-align: right; color: #64748b; font-size: 12px; }

        /* Leaderboard */
        .lecLbHead { font-size: 15px; font-weight: 700; margin-bottom: 14px; }
        .lecLbRows { display: flex; flex-direction: column; gap: 8px; }
        .lecLbRow {
          display: flex;
          align-items: center;
          padding: 9px 12px;
          background: #f8fafc;
          border-radius: 8px;
          font-size: 13px;
          border: 1px solid transparent;
        }
        .lecLbRow.top {
          background: #fef08a;
          border-color: #fef08a;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(234, 179, 8, 0.15);
        }
        .lecLbMedal { width: 26px; font-size: 15px; }
        .lecLbName { flex: 1; }
        .lecLbPts { font-weight: 600; }

        /* Resumed toast */
        .lecToast {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%) translateY(40px);
          background: #1e293b;
          color: #ffffff;
          padding: 9px 18px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
          z-index: 10;
        }
        .lecToastOn { opacity: 1; transform: translateX(-50%) translateY(0); }

        @keyframes lecPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lecStage, .lecObsBarFill, .lecToast, .lecLiveDot { transition: none; animation: none; }
        }
      `}</style>
    </div>
  )
}
