"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./pipeline-stage.module.css";

const A = styles;

const CHECK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

const CHECKLIST = [
  "Objectives & endpoints",
  "Eligibility criteria",
  "Visit schedule & windows",
  "Assessments per visit",
  "Safety reporting",
];

const DELAYS = [0.6, 1.0, 1.4, 1.9, 2.4];

const SOA_ROWS: { label: string; dots: number[]; signal?: boolean }[] = [
  { label: "Informed consent", dots: [0] },
  { label: "Demographics", dots: [0] },
  { label: "Vital signs", dots: [0, 1, 2, 3, 4] },
  { label: "Laboratory", dots: [0, 1, 3, 4] },
  { label: "ECG", dots: [0, 4] },
  { label: "Adverse events", dots: [1, 2, 3, 4], signal: true },
];

const DOTS = [3.9, 3.95, 4.0, 4.03, 4.06, 4.31, 4.22, 4.25, 4.44, 4.53, 4.66, 4.69, 4.75, 4.88, 4.91, 4.94, 4.97];

const SITES = [
  { name: "Site 101", city: "Boston, MA", top: 100, delay: 9.15 },
  { name: "Site 102", city: "Austin, TX", top: 190, delay: 9.3 },
  { name: "Site 103", city: "Toronto, ON", top: 280, delay: 9.45 },
];

function CheckIcon({ size = 26 }: { size?: number }) {
  return (
    <span
      style={{
        flex: "0 0 auto",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#0E7C5A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {CHECK}
    </span>
  );
}

function Arrow({ left, top, delay, width = 28, height = 20 }: { left: number; top: number; delay: number; width?: number; height?: number }) {
  return (
    <svg className={`absolute ${A.fade}`} style={{ left, top, animationDelay: `${delay}s` }} width={width} height={height} viewBox="0 0 28 20" aria-hidden="true">
      <path d="M2 10h22M17 3l7 7-7 7" fill="none" stroke="#D9480F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PipelineStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 720;
      setScale(Math.min(width / 720, 1));
    });
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        stage.classList.toggle(A.paused, !entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div
        ref={wrapRef}
        className="relative mx-auto max-w-[720px] overflow-hidden"
        style={{ aspectRatio: "720 / 520" }}
      >
        <div
          ref={stageRef}
          role="img"
          aria-label="Animated walkthrough in five steps: the protocol is read, the study design is analyzed, forms and specs are extracted and approved, sites collect data, and a validated submission package is produced."
          className="absolute top-0 left-0 rounded-[8px] border border-rule bg-white shadow-card"
          style={{
            width: 720,
            height: 520,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          {/* Progress rail */}
          <div className="absolute" style={{ left: 28, top: 22, width: 664, display: "flex", gap: 8 }}>
            {["01 READ", "02 ANALYZE", "03 EXTRACT", "04 COLLECT", "05 SUBMIT"].map((label, i) => (
              <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ height: 4, borderRadius: 2, background: "#E4E7EB", overflow: "hidden" }}>
                  <div className={`${A.fillbar} ${A[`fill${i + 1}` as keyof typeof A]}`} />
                </div>
                <span
                  className={`font-mono ${A.lab}`}
                  style={{ fontSize: 12, letterSpacing: "0.08em", animationDelay: `${i * 3}s` }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Act 1 — read */}
          <div className={`absolute ${A.act}`} style={{ left: 0, top: 0, width: 720, height: 420, animationDelay: "0s" }}>
            <div className="absolute" style={{ left: 88, top: 98, width: 236, height: 296, background: "#EEF0F2", border: "1px solid #D9DCE1", borderRadius: 6 }} />
            <div className="absolute" style={{ left: 79, top: 91, width: 236, height: 296, background: "#F5F6F7", border: "1px solid #D9DCE1", borderRadius: 6 }} />
            <div className="absolute" style={{ left: 70, top: 84, width: 236, height: 296, perspective: 900 }}>
              <div className="absolute overflow-hidden rounded-[6px] border" style={{ left: 0, top: 0, width: 236, height: 296, background: "#FFFFFF", borderColor: "#C9CED6", boxSizing: "border-box" }}>
                <p className="absolute font-mono" style={{ margin: 0, left: 16, top: 14, fontSize: 10, color: "#5D6B7E" }}>PROTOCOL SYN-014 · v2.0</p>
                <div className="absolute" style={{ left: 16, top: 34, width: 150, height: 8, borderRadius: 4, background: "#142B44" }} />
                <div className={`absolute ${A.fade}`} style={{ left: 12, top: 54, width: 210, height: 16, borderRadius: 3, background: "rgba(31,78,121,0.12)", animationDelay: "1.5s" }} />
                <p className="absolute" style={{ margin: 0, left: 16, top: 55, fontSize: 11, fontWeight: 600, color: "#142B44" }}>5&nbsp; Study population</p>
                <div className="absolute" style={{ left: 16, top: 78, width: 200, height: 5, background: "#E1E4E8" }} />
                <div className="absolute" style={{ left: 16, top: 90, width: 176, height: 5, background: "#E1E4E8" }} />
                <div className="absolute" style={{ left: 16, top: 102, width: 188, height: 5, background: "#E1E4E8" }} />
                <div className={`absolute ${A.fade}`} style={{ left: 12, top: 120, width: 212, height: 96, borderRadius: 3, background: "rgba(31,78,121,0.09)", animationDelay: "1.9s" }} />
                <p className="absolute" style={{ margin: 0, left: 16, top: 122, fontSize: 11, fontWeight: 600, color: "#142B44" }}>7&nbsp; Schedule of assessments</p>
                <div
                  className="absolute"
                  style={{
                    left: 16, top: 142, width: 202, height: 68, border: "1px solid #C9CED6", boxSizing: "border-box",
                    backgroundColor: "#FFFFFF",
                    backgroundImage: "linear-gradient(#E4E7EB 1px, transparent 1px), linear-gradient(90deg, #E4E7EB 1px, transparent 1px)",
                    backgroundSize: "33px 17px",
                  }}
                />
                <div className={`absolute ${A.fade}`} style={{ left: 12, top: 226, width: 210, height: 16, borderRadius: 3, background: "rgba(31,78,121,0.12)", animationDelay: "2.5s" }} />
                <p className="absolute" style={{ margin: 0, left: 16, top: 227, fontSize: 11, fontWeight: 600, color: "#142B44" }}>9&nbsp; Safety reporting</p>
                <div className="absolute" style={{ left: 16, top: 250, width: 196, height: 5, background: "#E1E4E8" }} />
                <div className="absolute" style={{ left: 16, top: 262, width: 170, height: 5, background: "#E1E4E8" }} />
                <div className={`absolute ${A.beam}`} style={{ left: 0, top: 0, width: 236, height: 22, background: "rgba(217,72,15,0.10)", borderBottom: "2px solid #D9480F", animationDelay: "0.95s" }} />
              </div>
              {[0.1, 0.45].map((delay, i) => (
                <div key={delay} className={`absolute ${A.turn}`} style={{ left: 0, top: 0, width: 236, height: 296, background: "#FFFFFF", border: "1px solid #C9CED6", borderRadius: 6, boxSizing: "border-box", animationDelay: `${delay}s` }}>
                  <div style={{ margin: "34px 16px 0", height: 8, width: i === 0 ? 120 : 90, borderRadius: 4, background: "#142B44" }} />
                  <div style={{ margin: "18px 16px 0", height: 5, width: i === 0 ? undefined : 180, background: "#E1E4E8" }} />
                  <div style={{ margin: "7px 16px 0", height: 5, width: i === 0 ? 150 : undefined, background: "#E1E4E8" }} />
                  <div style={{ margin: "7px 16px 0", height: 5, background: "#E1E4E8" }} />
                </div>
              ))}
            </div>

            <div className="absolute" style={{ left: 368, top: 96, width: 310, display: "flex", flexDirection: "column", gap: 16 }}>
              <p className="font-mono" style={{ margin: 0, fontSize: 12, letterSpacing: "0.08em", color: "#A3360A" }}>PARSING PROTOCOL</p>
              {CHECKLIST.map((item, i) => (
                <div key={item} className={`${A.rt} flex items-center`} style={{ gap: 12, animationDelay: `${DELAYS[i]}s` }}>
                  <CheckIcon />
                  <span style={{ fontSize: 17, fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Act 2 — analyze */}
          <div className={`absolute ${A.act}`} style={{ left: 0, top: 0, width: 720, height: 420, animationDelay: "3s" }}>
            <div className="absolute rounded-[6px] border bg-white" style={{ left: 36, top: 150, width: 112, height: 144, borderColor: "#C9CED6" }}>
              <div style={{ margin: "16px 12px 0", height: 6, width: 64, borderRadius: 3, background: "#142B44" }} />
              <div style={{ margin: "12px 12px 0", height: 4, background: "#E1E4E8" }} />
              <div style={{ margin: "6px 12px 0", height: 4, width: 60, background: "#E1E4E8" }} />
              <div style={{ margin: "10px 12px 0", height: 40, border: "1px solid #F3B9A3", background: "rgba(31,78,121,0.08)" }} />
              <div style={{ margin: "10px 12px 0", height: 4, background: "#E1E4E8" }} />
            </div>
            <p className="absolute font-mono" style={{ margin: 0, left: 36, top: 304, fontSize: 12, color: "#5D6B7E" }}>protocol.pdf</p>
            <div className={`absolute ${A.fade}`} style={{ left: 156, top: 222, width: 74, height: 0, borderTop: "2px dashed #D9480F", animationDelay: "3.2s" }} />
            <svg className={`absolute ${A.fade}`} style={{ left: 222, top: 215, animationDelay: "3.2s" }} width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
              <path d="M2 2l9 6-9 6" fill="none" stroke="#D9480F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="absolute" style={{ left: 246, top: 84, width: 444 }}>
              <div className={`${A.fade} font-mono`} style={{ display: "grid", gridTemplateColumns: "150px repeat(5, minmax(0, 1fr))", height: 30, alignItems: "center", fontSize: 12, color: "#5D6B7E", animationDelay: "3.15s" }}>
                <span>ASSESSMENT</span>
                {["SCR", "D1", "D8", "D15", "EOT"].map((v) => (
                  <span key={v} style={{ textAlign: "center" }}>{v}</span>
                ))}
              </div>

              {SOA_ROWS.map((row, rowIndex) => (
                <div
                  key={row.label}
                  className={`${A.rt}`}
                  style={{
                    display: "grid", gridTemplateColumns: "150px repeat(5, minmax(0, 1fr))", height: 38, alignItems: "center",
                    borderTop: "1px solid #E4E7EB",
                    borderBottom: rowIndex === SOA_ROWS.length - 1 ? "1px solid #E4E7EB" : undefined,
                    animationDelay: `${3.3 + rowIndex * 0.1}s`,
                  }}
                >
                  <span style={{ fontSize: 15 }}>{row.label}</span>
                  {[0, 1, 2, 3, 4].map((col) => (
                    <span key={col} style={{ display: "flex", justifyContent: "center" }}>
                      {row.dots.includes(col) ? (
                        <span
                          className={A.pop}
                          style={{
                            width: 14, height: 14, borderRadius: "50%",
                            background: row.signal ? "#D9480F" : "#142B44",
                            animationDelay: `${DOTS[(rowIndex * 5 + col) % DOTS.length]}s`,
                          }}
                        />
                      ) : null}
                    </span>
                  ))}
                </div>
              ))}

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                <span className={`${A.pop} font-mono`} style={{ padding: "7px 12px", borderRadius: 3, background: "#142B44", color: "#FFFFFF", fontSize: 13, animationDelay: "5.1s" }}>5 visits</span>
                <span className={`${A.pop} font-mono`} style={{ padding: "7px 12px", borderRadius: 3, background: "#FFFFFF", border: "1px solid #D9DCE1", fontSize: 13, animationDelay: "5.3s" }}>6 assessments</span>
                <span className={`${A.pop} font-mono`} style={{ padding: "7px 12px", borderRadius: 3, background: "#FDEDE7", border: "1px solid #F3B9A3", color: "#A3360A", fontSize: 13, animationDelay: "5.5s" }}>window ±2 days</span>
              </div>
            </div>
          </div>

          {/* Act 3 — extract */}
          <div className={`absolute ${A.act}`} style={{ left: 0, top: 0, width: 720, height: 420, animationDelay: "6s" }}>
            <div className="absolute flex flex-col overflow-hidden rounded-[6px] border bg-white" style={{ left: 36, top: 84, width: 340, boxSizing: "border-box", borderColor: "#D9DCE1", padding: 18, gap: 12 }}>
              <div className="flex items-center justify-between" style={{ gap: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 600 }}>Vital Signs <span className="font-mono" style={{ fontSize: 13, color: "#5D6B7E" }}>· VS</span></span>
                <span className="font-mono" style={{ fontSize: 11, padding: "4px 8px", borderRadius: 3, background: "#E0F3EA", color: "#0B6B4D" }}>CDASH</span>
              </div>
              {[
                ["Systolic BP", "128 mmHg", "SYSBP", 6.3],
                ["Diastolic BP", "82 mmHg", "DIABP", 6.6],
                ["Pulse", "71 bpm", "PULSE", 6.9],
                ["Position", "Sitting", "VSPOS", 7.2],
              ].map(([label, value, code, delay]) => (
                <div key={label as string} className={A.up} style={{ display: "grid", gridTemplateColumns: "112px 104px 1fr", alignItems: "center", gap: 10, animationDelay: `${delay}s` }}>
                  <span style={{ fontSize: 15 }}>{label}</span>
                  <span className="font-mono" style={{ height: 34, border: "1px solid #C9CED6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: label === "Position" ? "space-between" : "flex-start", padding: "0 10px", fontSize: 14 }}>
                    {value}{label === "Position" ? <span>▾</span> : null}
                  </span>
                  <span className="font-mono" style={{ fontSize: 12, color: "#A3360A" }}>{code}</span>
                </div>
              ))}
            </div>

            <div className="absolute flex flex-col" style={{ left: 400, top: 84, width: 290, gap: 10 }}>
              <p className="font-mono" style={{ margin: "0 0 2px", fontSize: 12, letterSpacing: "0.08em", color: "#A3360A" }}>GENERATED SPEC</p>
              {[
                ["VSTESTCD = SYSBP · DIABP · PULSE", 6.8, "#FFFFFF", "#D9DCE1", undefined],
                ["VSORRESU = mmHg · beats/min", 7.1, "#FFFFFF", "#D9DCE1", undefined],
                ["Edit check: 60 ≤ SYSBP ≤ 250", 7.4, "#FDEDE7", "#F3B9A3", "#A3360A"],
                ["Codelist POSITION\nSITTING · STANDING · SUPINE", 7.7, "#142B44", undefined, "#FFFFFF"],
              ].map(([text, delay, bg, border, color]) => (
                <div key={text as string} className={`${A.rt} font-mono`} style={{ background: bg as string, border: border ? `1px solid ${border}` : undefined, borderRadius: 4, padding: "10px 12px", fontSize: 13, lineHeight: 1.5, color: color as string, whiteSpace: "pre-line", animationDelay: `${delay}s` }}>
                  {text}
                </div>
              ))}
            </div>

            <div className={`absolute ${A.stamp} flex flex-col items-center justify-center`} style={{ left: 262, top: 262, width: 114, height: 114, borderRadius: "50%", border: "3px solid #0E7C5A", background: "rgba(255,255,255,0.96)", gap: 2, animationDelay: "8.0s" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0B6B4D" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
              <span className="font-mono" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: "#0B6B4D" }}>APPROVED</span>
              <span className="font-mono" style={{ fontSize: 10, color: "#0B6B4D" }}>DM review</span>
            </div>
          </div>

          {/* Act 4 — collect */}
          <div className={`absolute ${A.act}`} style={{ left: 0, top: 0, width: 720, height: 420, animationDelay: "9s" }}>
            {SITES.map((site) => (
              <div key={site.name} className={`absolute ${A.rt} flex items-center`} style={{ left: 30, top: site.top, width: 168, height: 66, boxSizing: "border-box", background: "#FFFFFF", border: "1px solid #D9DCE1", borderRadius: 6, padding: "12px 14px", gap: 10, animationDelay: `${site.delay}s` }}>
                <span className={A.live} style={{ flex: "0 0 auto", width: 10, height: 10, borderRadius: "50%", background: "#0E7C5A" }} />
                <span>
                  <span style={{ display: "block", fontSize: 16, fontWeight: 600 }}>{site.name}</span>
                  <span style={{ display: "block", fontSize: 13, color: "#5D6B7E" }}>{site.city}</span>
                </span>
              </div>
            ))}
            {[133, 223, 313].map((top) => (
              <div key={top} className={`absolute ${A.fade}`} style={{ left: 202, top, width: 152, height: 0, borderTop: "2px dashed #C9CED6", animationDelay: "9.4s" }} />
            ))}
            {[128, 218, 308].flatMap((top, i) =>
              [9.55 + i * 0.35, 10.55 + i * 0.35].map((delay) => (
                <div key={`${top}-${delay}`} className={`absolute ${A.pkt}`} style={{ left: 200, top, width: 12, height: 12, borderRadius: "50%", background: "#D9480F", animationDelay: `${delay}s` }} />
              )),
            )}

            <div className="absolute flex flex-col rounded-[6px] border bg-white" style={{ left: 360, top: 84, width: 330, boxSizing: "border-box", borderColor: "#D9DCE1", padding: "14px 16px", gap: 6 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                <span className="flex items-center" style={{ gap: 8, fontSize: 15, fontWeight: 600 }}>
                  <span className={A.live} style={{ width: 8, height: 8, borderRadius: "50%", background: "#0E7C5A" }} />
                  FlashEDC · live
                </span>
                <span className="font-mono" style={{ fontSize: 11, color: "#5D6B7E" }}>SYN-014</span>
              </div>
              <div className="font-mono" style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr 0.8fr 1.2fr", fontSize: 11, color: "#5D6B7E", padding: "0 8px" }}>
                <span>SUBJECT</span><span>VISIT</span><span>SYSBP</span><span>STATUS</span>
              </div>
              {[
                ["101-001", "D1", "128", "✓ Clean", 9.6, "#0B6B4D"],
                ["102-004", "D1", "134", "✓ Clean", 9.95, "#0B6B4D"],
                ["101-003", "D8", "119", "✓ Clean", 10.95, "#0B6B4D"],
              ].slice(0, 2).map(([subject, visit, sysbp, status, delay, color]) => (
                <div key={subject as string} className={`${A.up} font-mono`} style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr 0.8fr 1.2fr", alignItems: "center", height: 34, padding: "0 8px", borderRadius: 8, fontSize: 13, animationDelay: `${delay}s` }}>
                  <span>{subject}</span><span>{visit}</span><span>{sysbp}</span><span style={{ color: color as string }}>{status}</span>
                </div>
              ))}
              <div className={`${A.qrow} font-mono`} style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr 0.8fr 1.2fr", alignItems: "center", height: 34, padding: "0 8px", borderRadius: 8, fontSize: 13, animationDelay: "10.0s" }}>
                <span>103-002</span><span>D8</span>
                <span style={{ display: "grid" }}>
                  <span className={A.qa} style={{ gridArea: "1 / 1", color: "#A3360A", fontWeight: 600, animationDelay: "10.0s" }}>260</span>
                  <span className={A.qb} style={{ gridArea: "1 / 1", animationDelay: "10.0s" }}>126</span>
                </span>
                <span style={{ display: "grid" }}>
                  <span className={A.qa} style={{ gridArea: "1 / 1", color: "#A3360A", fontWeight: 600, animationDelay: "10.0s" }}>⚠ Query</span>
                  <span className={A.qb} style={{ gridArea: "1 / 1", color: "#0B6B4D", animationDelay: "10.0s" }}>✓ Resolved</span>
                </span>
              </div>
              <div className={`${A.up} font-mono`} style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr 0.8fr 1.2fr", alignItems: "center", height: 34, padding: "0 8px", borderRadius: 8, fontSize: 13, animationDelay: "10.95s" }}>
                <span>101-003</span><span>D8</span><span>119</span><span style={{ color: "#0B6B4D" }}>✓ Clean</span>
              </div>
              <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#5D6B7E" }}>Enrollment</span><span className="font-mono">24 / 36</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: "#EEF0F2", overflow: "hidden" }}>
                <div className={A.bar} style={{ height: 8, borderRadius: 4, background: "#0E7C5A", animationDelay: "9.3s" }} />
              </div>
            </div>
          </div>

          {/* Act 5 — submit */}
          <div className={`absolute ${A.act} ${A.final}`} style={{ left: 0, top: 0, width: 720, height: 420, animationDelay: "12s" }}>
            <div className="absolute flex flex-col" style={{ left: 36, top: 88, width: 118, gap: 8 }}>
              <p className="font-mono" style={{ margin: "0 0 2px", fontSize: 12, letterSpacing: "0.08em", color: "#5D6B7E" }}>SDTM</p>
              {["DM", "VS", "AE", "LB"].map((tile, i) => (
                <span key={tile} className={`${A.pop} font-mono flex items-center justify-center`} style={{ height: 40, borderRadius: 4, background: "#FFFFFF", border: "1px solid #D9DCE1", fontSize: 15, fontWeight: 600, animationDelay: `${12.15 + i * 0.1}s` }}>{tile}</span>
              ))}
            </div>
            <Arrow left={164} top={186} delay={12.6} />
            <div className="absolute flex flex-col" style={{ left: 202, top: 88, width: 118, gap: 8 }}>
              <p className="font-mono" style={{ margin: "0 0 2px", fontSize: 12, letterSpacing: "0.08em", color: "#5D6B7E" }}>ADaM</p>
              {["ADSL", "ADVS", "ADAE"].map((tile, i) => (
                <span key={tile} className={`${A.pop} font-mono flex items-center justify-center`} style={{ height: 40, borderRadius: 4, background: "#142B44", color: "#FFFFFF", fontSize: 15, fontWeight: 600, animationDelay: `${12.7 + i * 0.1}s` }}>{tile}</span>
              ))}
            </div>
            <Arrow left={330} top={186} delay={13.0} />
            <div className="absolute flex flex-col" style={{ left: 368, top: 88, width: 138, gap: 8 }}>
              <p className="font-mono" style={{ margin: "0 0 2px", fontSize: 12, letterSpacing: "0.08em", color: "#5D6B7E" }}>TLFs</p>
              {["T 14.1.1", "T 14.3.1", "F 14.2.1"].map((tile, i) => (
                <span key={tile} className={`${A.pop} font-mono flex items-center justify-center`} style={{ height: 40, borderRadius: 4, background: "#FDEDE7", border: "1px solid #F3B9A3", color: "#A3360A", fontSize: 14, fontWeight: 600, animationDelay: `${13.1 + i * 0.1}s` }}>{tile}</span>
              ))}
            </div>
            <div className={`absolute ${A.pop} flex flex-col rounded-[6px] bg-white`} style={{ left: 530, top: 84, width: 160, boxSizing: "border-box", border: "2px solid #142B44", padding: 16, gap: 10, animationDelay: "13.5s" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#142B44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" />
              </svg>
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>Submission package</span>
              <span className="font-mono" style={{ fontSize: 12, lineHeight: 1.7, color: "#475467" }}>define.xml<br />acrf.pdf<br />csdrg.pdf<br />adrg.pdf</span>
              <span className={`${A.pop} font-mono`} style={{ fontSize: 11, padding: "5px 8px", borderRadius: 3, background: "#E0F3EA", color: "#0B6B4D", textAlign: "center", animationDelay: "13.9s" }}>0 conformance errors</span>
              <span className={A.pop} style={{ fontSize: 13, fontWeight: 600, padding: 8, borderRadius: 3, background: "#142B44", color: "#FFFFFF", textAlign: "center", animationDelay: "14.2s" }}>Ready to file ✓</span>
            </div>
          </div>

          {/* Mascot + bubbles */}
          <Image src="/images/clindaddy-mark.png" alt="" width={259} height={447} className={`absolute ${A.bob}`} style={{ left: 26, top: 424, width: 52, height: 90, objectFit: "contain" }} />
          <div className={`absolute ${A.bub}`} style={{ left: 70, top: 384, padding: "8px 12px", background: "#FFFFFF", border: "1.5px solid #0E7C5A", borderRadius: "6px 14px 14px 4px", fontSize: 14, fontWeight: 600, color: "#0B6B4D", whiteSpace: "nowrap", animationDelay: "8.05s" }}>Looks right. Approved.</div>
          <div className={`absolute ${A.bub}`} style={{ left: 70, top: 384, padding: "8px 12px", background: "#FFFFFF", border: "1.5px solid #142B44", borderRadius: "6px 14px 14px 4px", fontSize: 14, fontWeight: 600, color: "#142B44", whiteSpace: "nowrap", animationDelay: "14.0s" }}>Ready to file!</div>

          {/* Captions */}
          <div className="absolute" style={{ left: 94, top: 436, width: 600, height: 64 }}>
            {[
              ["Reading the protocol", "Every page: objectives, eligibility, visit schedule, endpoints.", 0],
              ["Analyzing the design", "Visits, assessments and timing become a structured study model.", 3],
              ["Extracting the build", "A review-ready draft in minutes: CDASH forms, codelists, edit checks.", 6],
              ["Collecting the data", "Sites enter data in FlashEDC; edit checks raise queries instantly.", 9],
              ["Submitting with confidence", "SDTM, ADaM, TLFs and Define-XML, validated and packaged.", 12],
            ].map(([title, subtitle, delay], i) => (
              <div key={title as string} className={`absolute ${A.act} ${i === 4 ? A.final : ""}`} style={{ left: 0, top: 0, animationDelay: `${delay}s` }}>
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500 }}>{title}</p>
                <p style={{ margin: "4px 0 0", fontSize: 15, color: "#475467" }}>{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-3 max-w-[720px] text-xs text-text-3">Illustrative example</p>

      <ol className="sr-only">
        <li>Reading the protocol: every page, objectives, eligibility, visit schedule and endpoints.</li>
        <li>Analyzing the design: visits, assessments and timing become a structured study model.</li>
        <li>Extracting the build: a review-ready draft in minutes — CDASH forms, codelists, edit checks.</li>
        <li>Collecting the data: sites enter data in FlashEDC; edit checks raise queries instantly.</li>
        <li>Submitting with confidence: SDTM, ADaM, TLFs and Define-XML, validated and packaged.</li>
      </ol>
    </div>
  );
}
