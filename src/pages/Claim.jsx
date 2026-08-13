import { useRef } from "react";
import { Link } from "react-router-dom";
import { Page } from "../ui";
import { usePageAnims } from "../anim";

const CARDS = [
  ["Secure by design", "Built to keep your health records protected, portable, and always in your control."],
  ["Fast onboarding", "A simpler way to create your lifetime health identity without paperwork or hassle."],
  ["Care-ready access", "Designed so your verified medical information is ready when it matters most."],
];

export default function Claim() {
  const ref = useRef(null);
  usePageAnims(ref);
  return (
    <Page>
      <div ref={ref}>
        <section className="mbp-pad" style={{ borderBottom: "1px solid rgba(20,18,15,.15)" }}>
          <div className="mbp" style={{ maxWidth: "900px" }}>
            <div className="mb-eyebrow">Coming Soon</div>
            <h1 className="mb-h1 mb-split" style={{ marginTop: "clamp(20px,3vw,40px)", maxWidth: "14ch" }}>Claim your Health Identity.</h1>
            <p className="mb-lead mb-rv" style={{ marginTop: "clamp(20px,2.5vw,34px)" }}>
              We are crafting a beautiful, secure, and effortless way for you to activate your MediBank Health Identity. Stay tuned while we put the finishing touches on your lifetime health profile.
            </p>
          </div>
        </section>

        <section className="mbp-pad">
          <div className="mbp">
            <div className="mb-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))" }}>
              {CARDS.map(([t, d], i) => (
                <div key={t} className="mb-rv" style={{ padding: "clamp(28px,3vw,42px)", display: "flex", flexDirection: "column", gap: "16px", minHeight: "200px" }}>
                  <span className="mb-tag">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mb-h3">{t}</h3>
                  <p className="mb-p" style={{ fontSize: "14px", marginTop: "auto" }}>{d}</p>
                </div>
              ))}
            </div>

            <div className="mb-rv" style={{ marginTop: "clamp(32px,4vw,52px)", padding: "clamp(24px,3vw,40px)", background: "#14120F", color: "#F6F4EE", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
              <div>
                <div className="mb-tag" style={{ color: "#8A78E6" }}>Launch update</div>
                <div style={{ marginTop: "8px", fontFamily: "'IBM Plex Sans',sans-serif", fontSize: "16px", color: "#BDB6A6" }}>Registration is temporarily paused while the new claim flow is prepared.</div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <Link to="/" className="mb-btn" style={{ background: "#F6F4EE", color: "#14120F" }}>← Back to Home</Link>
                <Link to="/contact" className="mb-btn" style={{ background: "transparent", border: "1px solid rgba(246,244,238,.5)", color: "#F6F4EE" }}>Contact Us</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}
