import { Link } from "react-router-dom";

const QUICK = [
  ["Health Guides", "/health-guides"],
  ["Blog", "/blog"],
  ["Resources", "/resources"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms & Conditions", "/terms-and-conditions"],
  ["About Us", "/about"],
];
const SOCIAL = [
  ["LinkedIn", "/images/LinkedIn.png", "https://linkedin.com/"],
  ["WhatsApp", "/images/wa.png", "https://www.whatsapp.com/"],
  ["Instagram", "/images/Instagram.png", "https://instagram.com/"],
  ["Twitter", "/images/twitter.png", "https://x.com/"],
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgb(20,18,15)", background: "#EFEDE6", padding: "clamp(48px,6vw,72px) clamp(20px,5vw,72px)" }}>
      <div className="mbp">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) 1fr 1fr", gap: "40px" }} className="mb-foot-grid">
          <div>
            <img src="/images/medibank-logo.png" alt="MediBank" style={{ height: "40px", width: "auto" }} />
            <p className="mb-p" style={{ marginTop: "18px", maxWidth: "34ch" }}>
              India&apos;s First Health Identity Infrastructure. Your complete medical history — secure, portable, and always with you.
            </p>
            <div style={{ marginTop: "26px", fontFamily: "'IBM Plex Mono',monospace", fontSize: "12px", lineHeight: 1.7, color: "#8C8578" }}>
              <div style={{ letterSpacing: ".16em", textTransform: "uppercase", color: "#3A3630" }}>Contact</div>
              <div style={{ marginTop: "8px" }}>contact@medibank.in</div>
              <div style={{ marginTop: "4px", maxWidth: "30ch" }}>WeWork-Raheja Mindspace, Building 9, Madhapur, Hyderabad, Telangana 500081</div>
            </div>
          </div>
          <div>
            <div className="mb-eyebrow">Quick Links</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
              {QUICK.map(([l, to]) => (
                <li key={l}><Link to={to} style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: "14px", color: "#3A3630" }}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-eyebrow">Follow</div>
            <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
              {SOCIAL.map(([label, src, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} style={{ width: "54px", height: "54px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(20,18,15,.15)", background: "#F6F4EE", transition: "border-color .3s" }}>
                  <img src={src} alt={label} style={{ width: "28px", height: "28px", objectFit: "contain" }} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid rgba(20,18,15,.14)", display: "flex", justifyContent: "space-between", gap: "10px", flexWrap: "wrap", fontFamily: "'IBM Plex Mono',monospace", fontSize: "11px", letterSpacing: ".12em", textTransform: "uppercase", color: "#8C8578" }}>
          <span>© 2026 MediBank. All rights reserved.</span>
          <span>Made with ♥ in India</span>
        </div>
      </div>
    </footer>
  );
}
