import { useRef } from "react";
import { Hero, Section, Page } from "../ui";
import { usePageAnims } from "../anim";

const ROWS = [
  ["Smart Health Overview", "Track appointments, vitals, and daily health insights in one place.",
    "A personalized, multidimensional record of your daily health journey and your vital trends.", "/images/users/phone-mock-1.svg"],
  ["Discover Nearby Healthcare Providers", "Search doctors, labs, and hospitals around your location.",
    "An interactive, map-based directory to explore, view availability, and book appointments with nearby providers.", "/images/users/phonemock2.svg"],
  ["Centralized Health Records", "Access appointments, lab reports, and hospital documents anytime.",
    "A structured record-management center for securely viewing and managing essential reports with clarity.", "/images/users/phonemock3.svg"],
];

const STEPS = [
  ["01", "Claim Your Health Identity", "Create your secure, lifetime health identity in minutes. No paperwork, no hassle.", "/images/UserAdd.png"],
  ["02", "Upload or Pull Records", "Import existing records or connect with hospitals to automatically sync your data.", "/images/UploadOutline.png"],
  ["03", "Share with Consent", "Grant temporary or permanent access to doctors, hospitals, or family members.", "/images/Share.png"],
  ["04", "AI Monitors Trends", "Intelligent analysis spots patterns and potential concerns before they escalate.", "/images/ChartSquareBar.png"],
  ["05", "Stay Protected Always", "Your complete health story stays secure and accessible whenever you need it.", "/images/ShieldCheck.png"],
];

export default function Users() {
  const ref = useRef(null);
  usePageAnims(ref);
  return (
    <Page>
      <div ref={ref}>
        <Hero mark={["03", "For Users"]} title="A sneak peek of what you get."
          lead="See how the app works in just a few scrolls — your whole health record, wherever you are." />

        <Section n="01" label="Inside the app">
          <div style={{ display: "grid", gap: "1px", background: "rgba(20,18,15,.14)", border: "1px solid rgba(20,18,15,.14)" }}>
            {ROWS.map(([title, sub, body, img], i) => (
              <div key={title} className="mb-rv" style={{ background: "#F6F4EE", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0", alignItems: "center" }}>
                <div style={{ padding: "clamp(28px,4vw,56px)" }}>
                  <span className="mb-tag">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mb-h2 mb-split" style={{ marginTop: "16px", maxWidth: "16ch" }}>{title}</h2>
                  <div className="mb-lead" style={{ marginTop: "16px" }}>{sub}</div>
                  <p className="mb-p" style={{ marginTop: "12px" }}>{body}</p>
                </div>
                <div style={{ background: "#EFEDE6", alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(24px,3vw,44px)" }}>
                  <img src={img} alt={title} style={{ maxHeight: "460px", maxWidth: "100%", objectFit: "contain" }} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section n="02" label="How it works" title="Simple, safe, control-focused.">
          <p className="mb-lead mb-rv" style={{ marginBottom: "clamp(28px,3vw,44px)" }}>Your health deserves that.</p>
          <div className="mb-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))" }}>
            {STEPS.map(([n, t, d, icon]) => (
              <div key={n} className="mb-rv" style={{ padding: "clamp(24px,3vw,36px)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="mb-tag">Step {n}</span>
                  <img src={icon} alt="" style={{ height: "26px", width: "26px", objectFit: "contain", opacity: 0.8 }} />
                </div>
                <h3 className="mb-h3">{t}</h3>
                <p className="mb-p" style={{ fontSize: "14px" }}>{d}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </Page>
  );
}
