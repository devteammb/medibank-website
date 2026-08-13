import { useRef } from "react";
import { Hero, Section, Page } from "../ui";
import { usePageAnims } from "../anim";

const ADV = [
  ["01", "Access Existing Test History"],
  ["02", "A Full Picture Of Every Patient"],
  ["03", "Higher Patient Trust"],
  ["04", "Reduced Liability"],
  ["05", "Time Saved In Every Consultation"],
  ["06", "Better-Informed Decisions"],
];

const SLIDES = [
  ["Basic Plan", "Follow-Up Appointments Dashboard", "Centralized view of patient visits with real-time status tracking",
    "A clean, structured doctor dashboard displaying scheduled follow-up appointments, patient details (MID, date, time, reason, type), and color-coded status indicators (Past Due, Upcoming, Completed) to streamline daily consultation management.", "/images/doctors/screenshot1.svg"],
  ["Pro Plan", "Daily Appointments Dashboard", "Advanced appointment intelligence for high-efficiency practices",
    "An exclusive Pro feature providing a centralized, real-time view of scheduled and follow-up appointments with patient details and color-coded status indicators to help doctors manage consultations with precision and speed.", "/images/doctors/screenshot2.svg"],
];

export default function Doctors() {
  const ref = useRef(null);
  usePageAnims(ref);
  return (
    <Page>
      <div ref={ref}>
        <Hero mark={["02", "For Doctors"]} title="Blind consultations are dangerous consultations."
          lead="When doctors don't have complete patient history, they are forced to guess. Was this condition chronic? Was there a serious allergy or prior complication? MediBank removes the guesswork." />

        <Section n="01" label="MediBank's advantage" title="MediBank eliminates uncertainty.">
          <p className="mb-lead mb-rv" style={{ marginBottom: "clamp(28px,3vw,44px)" }}>You see the whole patient, not fragments.</p>
          <div className="mb-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))" }}>
            {ADV.map(([n, t]) => (
              <div key={n} className="mb-rv" style={{ padding: "clamp(24px,3vw,38px)", display: "flex", flexDirection: "column", gap: "18px", minHeight: "170px" }}>
                <span className="mb-tag">{n}</span>
                <span className="mb-h3" style={{ marginTop: "auto" }}>{t}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section n="02" label="Doctor portal preview" title="Built for doctors. Designed for clinical clarity.">
          <p className="mb-lead mb-rv" style={{ marginBottom: "clamp(28px,3vw,44px)" }}>
            MediBank isn&apos;t another software dashboard. It&apos;s a clinical decision-support system built around real consultation workflows.
          </p>
          <div style={{ display: "grid", gap: "clamp(20px,2.5vw,32px)" }}>
            {SLIDES.map(([badge, title, sub, desc, img]) => (
              <div key={title} className="mb-card mb-rv" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "0", overflow: "hidden" }}>
                <div style={{ padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", gap: "14px", borderRight: "1px solid rgba(20,18,15,.14)" }}>
                  <span className="mb-tag">{badge}</span>
                  <h3 className="mb-h3">{title}</h3>
                  <div className="mb-eyebrow" style={{ textTransform: "none", letterSpacing: ".02em", color: "#8C8578" }}>{sub}</div>
                  <p className="mb-p" style={{ marginTop: "6px", fontSize: "14px" }}>{desc}</p>
                </div>
                <div style={{ background: "#EFEDE6", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                  <img src={img} alt={title} style={{ maxWidth: "100%", maxHeight: "340px", objectFit: "contain" }} />
                </div>
              </div>
            ))}
          </div>
          <a href="https://doctor-portal-c4qbq7eraq-el.a.run.app" target="_blank" rel="noreferrer" className="mb-btn mb-rv" style={{ marginTop: "clamp(28px,3vw,40px)" }}>Register Now →</a>
        </Section>
      </div>
    </Page>
  );
}
