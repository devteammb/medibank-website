import { useRef, useState } from "react";
import { Hero, Page } from "../ui";
import { usePageAnims } from "../anim";

const field = { fontFamily: "'IBM Plex Sans',sans-serif", fontSize: "15px", padding: "14px 16px", border: "1px solid rgba(20,18,15,.2)", background: "#F6F4EE", color: "#14120F", width: "100%" };
const label = { fontFamily: "'IBM Plex Mono',monospace", fontSize: "11px", letterSpacing: ".16em", textTransform: "uppercase", color: "#8C8578", marginBottom: "8px", display: "block" };

export default function Contact() {
  const ref = useRef(null);
  usePageAnims(ref);
  const [sent, setSent] = useState(false);

  return (
    <Page>
      <div ref={ref}>
        <Hero mark={["—", "Contact"]} title="Get in touch." lead="Questions, partnerships, or feedback — we'd love to hear from you." />

        <section className="mbp-pad">
          <div className="mbp" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)" }}>
            <form className="mb-rv" onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div><label style={label}>Name</label><input required style={field} placeholder="Eg. Ravi Raj" /></div>
              <div><label style={label}>Email</label><input required type="email" style={field} placeholder="Eg. raviraj@gmail.com" /></div>
              <div><label style={label}>Message</label><textarea required rows={5} style={{ ...field, resize: "vertical" }} placeholder="Please let us know how we can help you!!" /></div>
              <button type="submit" className="mb-btn" style={{ alignSelf: "flex-start" }}>{sent ? "Message Sent ✓" : "Submit"}</button>
              {sent && <div className="mb-tag">Message sent successfully.</div>}
            </form>

            <div className="mb-rv" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "13px", lineHeight: 2, color: "#3A3630" }}>
              <div className="mb-eyebrow" style={{ marginBottom: "16px" }}>Reach us</div>
              <div><span className="mb-tag">Email</span>&nbsp;&nbsp;contact@medibank.in</div>
              <div><span className="mb-tag">Support</span>&nbsp;&nbsp;support@medibank.in</div>
              <div style={{ maxWidth: "34ch" }}><span className="mb-tag">Office</span>&nbsp;&nbsp;WeWork-Raheja Mindspace, Building 9, Madhapur, Hyderabad, Telangana 500081</div>
              <div style={{ marginTop: "24px", aspectRatio: "4/3", border: "1px solid rgba(20,18,15,.16)", overflow: "hidden" }}>
                <iframe title="MediBank location" width="100%" height="100%" style={{ border: 0, filter: "grayscale(1) contrast(1.05)" }} loading="lazy"
                  src="https://www.google.com/maps?q=WeWork+Raheja+Mindspace+Madhapur+Hyderabad&output=embed" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}
