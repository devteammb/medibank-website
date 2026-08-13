import { useRef } from "react";
import { Page } from "../ui";
import { usePageAnims } from "../anim";

const field = { fontFamily: "'IBM Plex Sans',sans-serif", fontSize: "15px", padding: "13px 16px", border: "1px solid rgba(20,18,15,.2)", background: "#EFEDE6", color: "#8C8578", width: "100%" };
const label = { fontFamily: "'IBM Plex Mono',monospace", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", color: "#8C8578", marginBottom: "8px", display: "block" };

function Panel({ tag, children, note }) {
  return (
    <div className="mb-card mb-rv" style={{ padding: "clamp(28px,3vw,44px)", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <div className="mb-tag">{tag}</div>
        <h2 className="mb-h3" style={{ marginTop: "10px" }}>Sign in</h2>
        <div className="mb-eyebrow" style={{ marginTop: "8px", textTransform: "none", letterSpacing: ".02em" }}>Beta version access — coming soon</div>
      </div>
      {children}
      <a href="https://app.medibank.in" className="mb-btn" style={{ alignSelf: "flex-start" }}>Sign in →</a>
      {note}
    </div>
  );
}

export default function Login() {
  const ref = useRef(null);
  usePageAnims(ref);
  return (
    <Page>
      <div ref={ref}>
        <section className="mbp-pad" style={{ borderBottom: "1px solid rgba(20,18,15,.15)" }}>
          <div className="mbp">
            <div className="mb-eyebrow">Access</div>
            <h1 className="mb-h1 mb-split" style={{ marginTop: "clamp(20px,3vw,40px)", maxWidth: "12ch" }}>Sign in.</h1>
          </div>
        </section>

        <section className="mbp-pad">
          <div className="mbp" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,3vw,40px)" }}>
            <Panel tag="Individual User"
              note={<div className="mb-eyebrow" style={{ textTransform: "none", letterSpacing: ".02em" }}>Don&apos;t have an account? <a href="https://app.medibank.in/signup" style={{ color: "#2E1292" }}>Sign up →</a></div>}>
              <div><label style={label}>Email</label><input disabled style={field} placeholder="email" /></div>
              <div><label style={label}>Password</label><input disabled type="password" style={field} placeholder="**********" /></div>
            </Panel>

            <Panel tag="Doctor / Clinic"
              note={<div className="mb-eyebrow" style={{ textTransform: "none", letterSpacing: ".02em", maxWidth: "42ch" }}>Doctors not yet onboarded can reach us at <a href="mailto:support@medibank.in" style={{ color: "#2E1292" }}>support@medibank.in</a> to begin the process.</div>}>
              <div style={{ display: "flex", gap: "18px", fontFamily: "'IBM Plex Mono',monospace", fontSize: "12px", color: "#3A3630" }}>
                <label style={{ display: "flex", gap: "8px", alignItems: "center" }}><input type="checkbox" /> Doctor</label>
                <label style={{ display: "flex", gap: "8px", alignItems: "center" }}><input type="checkbox" /> Clinic</label>
              </div>
              <div><label style={label}>Email</label><input disabled style={field} placeholder="email" /></div>
              <div><label style={label}>Password</label><input disabled type="password" style={field} placeholder="**********" /></div>
            </Panel>
          </div>

          <div className="mbp mb-rv" style={{ marginTop: "clamp(32px,4vw,52px)", display: "flex", gap: "clamp(20px,3vw,40px)", alignItems: "center", flexWrap: "wrap", borderTop: "1px solid rgba(20,18,15,.14)", paddingTop: "clamp(28px,3vw,44px)" }}>
            <div>
              <div className="mb-h3" style={{ fontSize: "22px" }}>Keep your records on hand.</div>
              <p className="mb-p" style={{ marginTop: "10px" }}>Download the app to carry your health identity everywhere.</p>
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <img src="/images/playstore.png" alt="Play Store" style={{ height: "44px", width: "auto" }} />
                <img src="/images/appstore.png" alt="App Store" style={{ height: "44px", width: "auto" }} />
              </div>
            </div>
            <img src="/images/QR.png" alt="QR" style={{ height: "120px", width: "120px", objectFit: "contain", marginLeft: "auto" }} />
          </div>
        </section>
      </div>
    </Page>
  );
}
