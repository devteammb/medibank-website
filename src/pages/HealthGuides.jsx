import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "../ui";
import { usePageAnims } from "../anim";

/* Concise, original summaries of each guide topic (general wellness guidance). */
const GUIDES = [
  ["Heart Health", "/images/healthguides/Heart-health.png", "Understand your risk and make heart-healthy choices — monitor triglycerides and cholesterol, stay active, and keep your weight in a healthy range."],
  ["Cholesterol", "/images/healthguides/Cholesterol.png", "High cholesterol has no symptoms but raises heart-disease risk. A balanced low-fat diet, regular exercise, and periodic screening keep it in check."],
  ["Kidney Health", "/images/healthguides/Kidneys.png", "Support kidney function by staying hydrated, keeping sodium low, being cautious with NSAIDs, and getting regular check-ups if you're at risk."],
  ["Liver Health", "/images/healthguides/Liver-Health.png", "Protect your liver with regular exercise, a diet rich in fruit and vegetables, and limited alcohol — early detection matters since symptoms can be subtle."],
  ["Women's Health", "/images/healthguides/Women-health.png", "From reproductive and maternal care to chronic-disease and mental well-being — regular check-ups, good nutrition, and awareness lead to better outcomes."],
  ["Children's Health & Nutrition", "/images/healthguides/Childrens-Health.png", "A balanced diet supports development and a healthy weight. Family meals, varied healthy foods, and involving kids build lifelong habits."],
  ["Health & Fitness", "/images/healthguides/Health-Fitness.png", "Regular activity — moderate or vigorous — helps control weight, lowers disease risk, improves mood and sleep, and increases longevity."],
  ["Health Screening & Preventive Care", "/images/healthguides/Health-screening.png", "Screenings catch conditions early, before symptoms appear. Age, sex, and family history guide which tests you need and when."],
  ["Common Screening Tests", "/images/healthguides/Screening-tests.png", "A1C, lipid profile, blood pressure, thyroid, liver function, ECG, Pap smear, prostate and mammograms — common checks that detect disease early."],
];

export default function HealthGuides() {
  const ref = useRef(null);
  usePageAnims(ref);
  const [open, setOpen] = useState(0);
  return (
    <Page>
      <div ref={ref}>
        <section className="mbp-pad" style={{ borderBottom: "1px solid rgba(20,18,15,.15)" }}>
          <div className="mbp">
            <div className="mb-eyebrow" style={{ display: "flex", gap: "10px" }}>
              <Link to="/" style={{ color: "#8C8578" }}>Home</Link><span>/</span>
              <Link to="/resources" style={{ color: "#8C8578" }}>Resources</Link><span>/</span>
              <span style={{ color: "#2E1292" }}>Health Guides</span>
            </div>
            <h1 className="mb-h1 mb-split" style={{ marginTop: "clamp(20px,3vw,40px)", maxWidth: "14ch" }}>Health Guides.</h1>
            <p className="mb-lead mb-rv" style={{ marginTop: "clamp(20px,2.5vw,34px)" }}>
              Prevention first. Practical guidance to help you stay well — general advice only; for specific needs, please consult a doctor.
            </p>
          </div>
        </section>

        <section className="mbp-pad">
          <div className="mbp" style={{ borderTop: "1px solid rgba(20,18,15,.14)" }}>
            {GUIDES.map(([title, img, body], i) => (
              <div key={title} className="mb-rv" style={{ borderBottom: "1px solid rgba(20,18,15,.14)" }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "20px", padding: "22px 0", background: "none", border: 0, cursor: "pointer", textAlign: "left" }}>
                  <span className="mb-tag" style={{ color: "#A8A296" }}>{String(i + 1).padStart(2, "0")}</span>
                  <img src={img} alt="" style={{ height: "48px", width: "48px", objectFit: "contain" }} />
                  <span className="mb-h3" style={{ flex: 1 }}>{title}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "22px", color: "#2E1292" }}>{open === i ? "–" : "+"}</span>
                </button>
                {open === i && <p className="mb-p" style={{ padding: "0 0 26px 88px", maxWidth: "80ch" }}>{body}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
