import { useRef } from "react";
import { Hero, Section, Page } from "../ui";
import { usePageAnims } from "../anim";

const STEPS = [
  ["01", "Enter mobile number and OTP", "Verify yourself in seconds to gain emergency access."],
  ["02", "Scan the QR code or enter MID", "Pull up the patient's record by scanning their MediBank QR or entering their MID."],
  ["03", "See the full medical history", "View the patient's complete medical history and any ongoing consultation — instantly."],
];

export default function Ice() {
  const ref = useRef(null);
  usePageAnims(ref);
  return (
    <Page>
      <div ref={ref}>
        <Hero mark={["04", "ICE"]} title="In case of emergencies."
          lead="Medical history instantly accessible when it matters the most. Simply scan a QR code or ID to view vital health information — fast and secure." />

        <Section n="01" label="Access in seconds">
          <a href="https://app.medibank.in" className="mb-btn mb-rv">Check it now →</a>
        </Section>

        <Section n="02" label="How it works" title="Three steps to a life-saving record.">
          <div className="mb-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))" }}>
            {STEPS.map(([n, t, d]) => (
              <div key={n} className="mb-rv" style={{ padding: "clamp(26px,3vw,40px)", display: "flex", flexDirection: "column", gap: "16px", minHeight: "220px" }}>
                <span className="mb-tag">Step {n}</span>
                <h3 className="mb-h3">{t}</h3>
                <p className="mb-p" style={{ fontSize: "14px", marginTop: "auto" }}>{d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section n="03" label="Who can access" title="Citizens, doctors & emergency staff.">
          <p className="mb-lead mb-rv">
            ICE access is available to verified citizens (via mobile OTP) and to doctors and emergency staff (via secure credentials), so the right people can see the right information the moment it&apos;s needed.
          </p>
        </Section>
      </div>
    </Page>
  );
}
