"use client";

import { useEffect, useRef } from "react";

import styles from "./studio-stage.module.css";

const A = styles;

const FIELD_TYPES = ["Text", "Number", "Date", "Dropdown", "Radio", "Checkbox"];
const FORMS = ["Demographics", "Vital signs", "Laboratory", "Adverse events", "Concomitant meds"];

function AiTag() {
  return (
    <span
      className="font-mono"
      style={{
        fontSize: 10,
        padding: "2px 5px",
        borderRadius: 2,
        background: "#E8EEF5",
        color: "#1F4E79",
      }}
    >
      AI
    </span>
  );
}

export function StudioStage() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        node.classList.toggle(A.paused, !entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef}>
      {/* Desktop / large screens */}
      <div className="hidden xl:block">
        <div
          role="img"
          aria-label="Study Build Studio: a form palette on the left, the AI-drafted Vital signs form in the middle where a new Respiratory rate field is dragged in, and field properties with an AI assistant on the right."
          style={{
            position: "relative",
            width: 1160,
            maxWidth: "100%",
            height: 600,
            background: "#FFFFFF",
            border: "1px solid #D9DCE1",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 16px 40px rgba(16,24,40,0.07)",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              position: "absolute", left: 0, top: 0, width: 1160, height: 52,
              borderBottom: "1px solid #E4E7EB", display: "flex", alignItems: "center",
              justifyContent: "space-between", padding: "0 18px", boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="font-mono" style={{ fontSize: 12, color: "#5D6B7E" }}>SYN-014</span>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Study Build Studio</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 26, height: 52, fontSize: 14, color: "#5D6B7E" }}>
              <span>Visits</span>
              <span style={{ color: "#101828", fontWeight: 600, padding: "15px 0", borderBottom: "2px solid #142B44" }}>Forms</span>
              <span>Edit checks</span>
              <span>Codelists</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, padding: "5px 10px", border: "1px solid #D9DCE1", borderRadius: 3, color: "#475467" }}>
                Design v3 · Draft
              </span>
              <span style={{ fontSize: 13, padding: "8px 12px", borderRadius: 4, color: "#142B44", border: "1px solid #C9CED6" }}>
                Preview
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, padding: "8px 12px", borderRadius: 4, color: "#FFFFFF", background: "#142B44" }}>
                Submit for approval
              </span>
            </div>
          </div>

          {/* Left palette */}
          <div
            style={{
              position: "absolute", left: 0, top: 52, width: 220, height: 548,
              background: "#F6F6F3", borderRight: "1px solid #E4E7EB",
              boxSizing: "border-box", padding: 16,
            }}
          >
            <p style={{ margin: "0 0 8px", fontSize: 13, color: "#5D6B7E" }}>Forms</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 14 }}>
              {FORMS.map((form) => {
                const active = form === "Vital signs";
                return (
                  <div
                    key={form}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "7px 8px",
                      background: active ? "#FFFFFF" : undefined,
                      border: active ? "1px solid #D9DCE1" : undefined,
                      borderRadius: active ? 4 : undefined,
                      fontWeight: active ? 600 : undefined,
                    }}
                  >
                    <span>{form}</span>
                    <AiTag />
                  </div>
                );
              })}
            </div>

            <p style={{ position: "absolute", left: 16, top: 316, margin: 0, fontSize: 13, color: "#5D6B7E" }}>
              Drag a field onto the form
            </p>
            <div
              style={{
                position: "absolute", left: 16, top: 344, width: 188,
                display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 8, fontSize: 13,
              }}
            >
              {FIELD_TYPES.map((type) => (
                <span
                  key={type}
                  style={{
                    height: 38, display: "flex", alignItems: "center", gap: 8, padding: "0 10px",
                    background: "#FFFFFF", borderRadius: 4,
                    border: type === "Number" ? "1px dashed #1F4E79" : "1px solid #D9DCE1",
                    color: type === "Number" ? "#1F4E79" : undefined,
                  }}
                >
                  <span style={{ color: "#98A2B3", letterSpacing: -2 }}>⋮⋮</span>
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div style={{ position: "absolute", left: 220, top: 52, width: 640, height: 548, background: "#EEF0F2" }}>
            <div
              style={{
                position: "absolute", left: 40, top: 24, width: 560, background: "#FFFFFF",
                border: "1px solid #D9DCE1", borderRadius: 6, overflow: "hidden",
              }}
            >
              <div style={{ height: 64, boxSizing: "border-box", padding: "12px 18px", borderBottom: "1px solid #E4E7EB", display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
                <span style={{ fontSize: 17, fontWeight: 600 }}>Vital signs</span>
                <span style={{ fontSize: 12, color: "#5D6B7E" }}>VS · 5 fields drafted from protocol §7.2</span>
              </div>
              <div style={{ height: 40, boxSizing: "border-box", padding: "0 18px", background: "#F2F4F7", borderBottom: "1px solid #E4E7EB", display: "flex", alignItems: "center", fontSize: 13, fontWeight: 600, color: "#344054" }}>
                Measurements
              </div>

              {[
                ["Systolic BP", "mmHg", "SYSBP"],
                ["Diastolic BP", "mmHg", "DIABP"],
                ["Pulse", "beats/min", "PULSE"],
              ].map(([label, unit, code], i) => (
                <div
                  key={code}
                  style={{
                    height: 52, boxSizing: "border-box", padding: "0 16px",
                    display: "grid", gridTemplateColumns: "150px 1fr 90px", alignItems: "center",
                    borderBottom: "1px solid #EEF0F2",
                    outline: i === 0 ? "2px solid #1F4E79" : undefined,
                    outlineOffset: i === 0 ? -2 : undefined,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{label}</span>
                  <span style={{ fontSize: 13, color: "#98A2B3" }}>
                    <span style={{ display: "inline-block", width: 90, height: 28, border: "1px solid #C9CED6", borderRadius: 4, verticalAlign: "middle" }} /> {unit}
                  </span>
                  <span className="font-mono" style={{ fontSize: 12, color: "#A3360A", textAlign: "right" }}>{code}</span>
                </div>
              ))}

              <div style={{ position: "relative", height: 0 }}>
                <div
                  className={A.drop}
                  style={{ position: "absolute", left: 12, right: 12, top: -2, height: 3, borderRadius: 2, background: "#D9480F" }}
                />
              </div>

              <div className={A.row}>
                <div
                  className={A.hi}
                  style={{
                    height: 52, boxSizing: "border-box", padding: "0 16px",
                    display: "grid", gridTemplateColumns: "150px 1fr 90px", alignItems: "center",
                    borderBottom: "1px solid #EEF0F2",
                  }}
                >
                  <span style={{ fontSize: 14 }}>Respiratory rate</span>
                  <span style={{ fontSize: 13, color: "#98A2B3" }}>
                    <span style={{ display: "inline-block", width: 90, height: 28, border: "1px solid #C9CED6", borderRadius: 4, verticalAlign: "middle" }} /> breaths/min
                  </span>
                  <span className="font-mono" style={{ fontSize: 12, color: "#A3360A", textAlign: "right" }}>RESP</span>
                </div>
              </div>

              <div style={{ height: 52, boxSizing: "border-box", padding: "0 16px", display: "grid", gridTemplateColumns: "150px 1fr 90px", alignItems: "center", borderBottom: "1px solid #EEF0F2" }}>
                <span style={{ fontSize: 14 }}>Temperature</span>
                <span style={{ fontSize: 13, color: "#98A2B3" }}>
                  <span style={{ display: "inline-block", width: 90, height: 28, border: "1px solid #C9CED6", borderRadius: 4, verticalAlign: "middle" }} /> °C
                </span>
                <span className="font-mono" style={{ fontSize: 12, color: "#A3360A", textAlign: "right" }}>TEMP</span>
              </div>

              <div style={{ height: 40, boxSizing: "border-box", padding: "0 18px", background: "#F2F4F7", borderBottom: "1px solid #E4E7EB", display: "flex", alignItems: "center", fontSize: 13, fontWeight: 600, color: "#344054" }}>
                Position
              </div>
              <div style={{ height: 52, boxSizing: "border-box", padding: "0 16px", display: "grid", gridTemplateColumns: "150px 1fr 90px", alignItems: "center" }}>
                <span style={{ fontSize: 14 }}>Position</span>
                <span style={{ fontSize: 13, color: "#475467" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", width: 130, height: 28, padding: "0 8px", boxSizing: "border-box", border: "1px solid #C9CED6", borderRadius: 4, verticalAlign: "middle" }}>
                    Sitting <span>▾</span>
                  </span>
                </span>
                <span className="font-mono" style={{ fontSize: 12, color: "#A3360A", textAlign: "right" }}>VSPOS</span>
              </div>
            </div>
          </div>

          {/* Right properties panel */}
          <div
            style={{
              position: "absolute", left: 860, top: 52, width: 300, height: 548,
              borderLeft: "1px solid #E4E7EB", boxSizing: "border-box", padding: 18,
              display: "flex", flexDirection: "column", gap: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#5D6B7E" }}>Field properties</span>
              <span style={{ fontSize: 11, padding: "3px 7px", borderRadius: 3, background: "#FDEDE7", color: "#A3360A" }}>
                Drafted by AI · in review
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Systolic BP</p>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "92px 1fr", rowGap: 9, columnGap: 10, fontSize: 13 }}>
              <dt style={{ color: "#5D6B7E" }}>Control</dt><dd style={{ margin: 0 }}>Number, 3 digits</dd>
              <dt style={{ color: "#5D6B7E" }}>CDASH</dt><dd className="font-mono" style={{ margin: 0, fontSize: 12 }}>VSORRES · SYSBP</dd>
              <dt style={{ color: "#5D6B7E" }}>Unit</dt><dd style={{ margin: 0 }}>mmHg</dd>
              <dt style={{ color: "#5D6B7E" }}>Edit check</dt><dd style={{ margin: 0 }}>60–250, raise query</dd>
              <dt style={{ color: "#5D6B7E" }}>Source</dt>
              <dd style={{ margin: 0, color: "#1F4E79", textDecoration: "underline", textUnderlineOffset: 3 }}>
                Protocol §7.2, p. 34
              </dd>
            </dl>

            <div style={{ marginTop: "auto", border: "1px solid #D9DCE1", borderRadius: 6, padding: 12, display: "flex", flexDirection: "column", gap: 10, background: "#F6F6F3" }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Assistant</span>
              <span style={{ alignSelf: "flex-end", maxWidth: 210, fontSize: 13, lineHeight: 1.4, padding: "8px 10px", borderRadius: "6px 6px 2px 6px", background: "#142B44", color: "#FFFFFF" }}>
                Put Position before the measurements.
              </span>
              <span style={{ maxWidth: 230, fontSize: 13, lineHeight: 1.4, padding: "8px 10px", borderRadius: "6px 6px 6px 2px", background: "#FFFFFF", border: "1px solid #D9DCE1" }}>
                Done as a suggestion. Apply it to Design v3?
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 500, padding: "6px 10px", borderRadius: 4, background: "#142B44", color: "#FFFFFF" }}>Apply</span>
                <span style={{ fontSize: 12, padding: "6px 10px", borderRadius: 4, border: "1px solid #C9CED6" }}>Dismiss</span>
              </div>
            </div>
          </div>

          {/* Dragged field */}
          <div
            className={A.ghost}
            style={{
              position: "absolute", left: 118, top: 343, width: 168, height: 40,
              display: "flex", alignItems: "center", gap: 8, padding: "0 12px",
              boxSizing: "border-box", background: "#FFFFFF", border: "1.5px solid #1F4E79",
              borderRadius: 4, boxShadow: "0 10px 24px rgba(16,24,40,0.18)",
              fontSize: 13, fontWeight: 500, color: "#142B44",
            }}
          >
            <span style={{ color: "#98A2B3", letterSpacing: -2 }}>⋮⋮</span>
            Respiratory rate
            <svg style={{ position: "absolute", right: -14, bottom: -16 }} width="20" height="22" viewBox="0 0 20 22" aria-hidden="true">
              <path d="M2 2l14 8-6 2 4 7-3 1-4-7-5 4z" fill="#101828" stroke="#FFFFFF" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="xl:hidden">
        <div
          role="img"
          aria-label="Study Build Studio on mobile: a Respiratory rate field is dropped into the AI-drafted Vital signs form."
          style={{
            position: "relative", background: "#EEF0F2", border: "1px solid #D9DCE1",
            borderRadius: 8, padding: 14, display: "flex", flexDirection: "column", gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 6, fontSize: 12 }}>
            {["Text", "Number", "Date", "Dropdown"].map((type) => (
              <span
                key={type}
                style={{
                  padding: "7px 9px", background: "#FFFFFF", borderRadius: 4,
                  border: type === "Number" ? "1px dashed #1F4E79" : "1px solid #D9DCE1",
                  color: type === "Number" ? "#1F4E79" : undefined,
                }}
              >
                {type}
              </span>
            ))}
          </div>

          <div style={{ background: "#FFFFFF", border: "1px solid #D9DCE1", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid #E4E7EB" }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Vital signs</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#5D6B7E" }}>VS · drafted from protocol §7.2</p>
            </div>
            <div style={{ padding: "8px 14px", background: "#F2F4F7", borderBottom: "1px solid #E4E7EB", fontSize: 12, fontWeight: 600, color: "#344054" }}>
              Measurements
            </div>
            {[
              ["Systolic BP", "SYSBP"],
              ["Diastolic BP", "DIABP"],
              ["Pulse", "PULSE"],
            ].map(([label, code]) => (
              <div key={code} style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", borderBottom: "1px solid #EEF0F2", fontSize: 13 }}>
                <span>{label}</span>
                <span className="font-mono" style={{ fontSize: 11, color: "#A3360A" }}>{code}</span>
              </div>
            ))}

            <div style={{ position: "relative", height: 0 }}>
              <div className={A.drop} style={{ position: "absolute", left: 8, right: 8, top: -2, height: 3, borderRadius: 2, background: "#D9480F" }} />
            </div>
            <div className={A.row}>
              <div className={A.hi} style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", borderBottom: "1px solid #EEF0F2", fontSize: 13 }}>
                <span>Respiratory rate</span>
                <span className="font-mono" style={{ fontSize: 11, color: "#A3360A" }}>RESP</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", fontSize: 13 }}>
              <span>Temperature</span>
              <span className="font-mono" style={{ fontSize: 11, color: "#A3360A" }}>TEMP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
