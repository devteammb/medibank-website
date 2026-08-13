import { useRef, useState } from "react";
import { Hero, Section, Page } from "../ui";
import { usePageAnims } from "../anim";

const TABS = [
  ["Doctors", "/images/doctorIcon.png", ["General Physician", "Cardiologist", "Dermatologist", "Dentist", "ENT Specialist", "Ophthalmologist", "Gynaecologist"]],
  ["Labs", "/images/microscope.png", ["Pathology", "Radiology", "Biochemistry", "Microbiology"]],
  ["Hospitals", "/images/hospital.png", ["Government", "Private", "Multispecialty", "Children's"]],
];

export default function Partners() {
  const ref = useRef(null);
  usePageAnims(ref);
  const [tab, setTab] = useState(0);
  return (
    <Page>
      <div ref={ref}>
        <Hero mark={["05", "Partners"]} title="Our partners."
          lead="A growing network of doctors, labs, and hospitals across India — coming online with MediBank." />

        <Section n="01" label="The network">
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "clamp(28px,3vw,44px)" }} className="mb-rv">
            {TABS.map(([label, icon], i) => (
              <button key={label} onClick={() => setTab(i)} style={{
                display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 20px", cursor: "pointer",
                background: tab === i ? "#2E1292" : "transparent", color: tab === i ? "#F6F4EE" : "#3A3630",
                border: "1px solid " + (tab === i ? "#2E1292" : "rgba(20,18,15,.2)"),
                fontFamily: "'IBM Plex Mono',monospace", fontSize: "12px", letterSpacing: ".12em", textTransform: "uppercase",
              }}>
                <img src={icon} alt="" style={{ height: "18px", width: "18px", objectFit: "contain", filter: tab === i ? "brightness(0) invert(1)" : "none" }} />
                {label}
              </button>
            ))}
          </div>

          <div className="mb-grid mb-rv" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", position: "relative" }}>
            {TABS[tab][2].map((cat, i) => (
              <div key={cat} style={{ padding: "clamp(22px,2.5vw,32px)", display: "flex", flexDirection: "column", gap: "14px", minHeight: "150px" }}>
                <span className="mb-tag">#{String(i + 1).padStart(2, "0")}</span>
                <span className="mb-h3" style={{ marginTop: "auto", fontSize: "20px" }}>{cat}</span>
                <span className="mb-eyebrow" style={{ textTransform: "none", letterSpacing: ".02em" }}>Details for {TABS[tab][0].toLowerCase()}</span>
              </div>
            ))}
            {/* locked overlay */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(246,244,238,.72)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <a href="https://app.medibank.in/signup" className="mb-btn" style={{ gap: "10px" }}>
                <img src="/images/lock.png" alt="" style={{ height: "16px", width: "16px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                Join Betalist
              </a>
            </div>
          </div>
        </Section>

        <Section n="02" label="Coverage" title="Across India, state by state.">
          <p className="mb-lead mb-rv">
            MediBank is onboarding partners across states including Andhra Pradesh, Telangana, Maharashtra, Gujarat, Karnataka, Tamil Nadu, Delhi and more — building the connective tissue for a truly portable health record.
          </p>
        </Section>
      </div>
    </Page>
  );
}
