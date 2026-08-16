import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const APP_URL = "https://app.medibank.in";
const SIGNUP_URL = "https://app.medibank.in/signup";

const NAV = [
  { n: "01", label: "Home", to: "/" },
  { n: "02", label: "For Doctors", to: "/doctors" },
  { n: "03", label: "For Users", to: "/users" },
  { n: "04", label: "ICE", to: "/ice" },
  { n: "05", label: "Partners", to: "/partners" },
  { n: "06", label: "Resources", to: "/resources" },
  { n: "07", label: "About", to: "/about" },
  { n: "08", label: "Blog", to: "/blog" },
];

const RAIL = {
  display: "flex", flex: "0 0 232px", position: "sticky", top: 0, height: "100vh",
  flexDirection: "column", padding: "26px 22px 24px", borderRight: "1px solid rgb(20,18,15)",
  background: "#EFEDE6", zIndex: 30,
};
const linkStyle = {
  display: "flex", gap: "12px", padding: "7px 0",
  borderBottom: "1px solid rgba(20,18,15,.14)", color: "#3A3630",
  fontFamily: "'IBM Plex Mono',monospace", fontSize: "11px", letterSpacing: ".06em",
};

function NavItems({ onClick }) {
  return NAV.map((item) => (
    <NavLink
      key={item.n}
      to={item.to}
      end={item.to === "/"}
      onClick={onClick}
      className={({ isActive }) => (isActive ? "mb-nav-on" : "")}
      style={linkStyle}
    >
      <span style={{ color: "#A8A296" }}>{item.n}</span>
      {item.label}
    </NavLink>
  ));
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const fillRef = useRef(null);

  // scroll-progress fill on the rail
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* desktop rail */}
      <aside className="mb-rail" style={RAIL}>
        <div style={{ marginBottom: "auto" }}>
          <Link to="/" style={{ display: "block", textAlign: "center" }}>
            <img src="/images/medibank-logo.png" alt="MediBank" style={{ height: "88px", width: "auto", margin: "6px auto 0" }} />
          </Link>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px", fontFamily: "'IBM Plex Mono',monospace", fontSize: "9.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8C8578", textAlign: "center" }}>
            <span>FHIR + ABDM aligned</span>
            <span>AES—256</span>
            <span>Consent-based access</span>
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column" }}>
          <NavItems />
        </nav>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
          <a href={SIGNUP_URL} style={{ background: "#2E1292", color: "#EFEDE6", fontFamily: "'IBM Plex Mono',monospace", fontSize: "10.5px", letterSpacing: ".1em", textTransform: "uppercase", padding: "12px 14px", textAlign: "center" }}>Claim Record</a>
          <a href={APP_URL} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "10.5px", letterSpacing: ".1em", textTransform: "uppercase", padding: "0 14px", textAlign: "center", color: "#6B655A" }}>Login</a>
        </div>
        <div className="mb-rail-prog"><i ref={fillRef} /></div>
      </aside>

      {/* mobile topbar */}
      <header className="mb-topbar" style={{ display: "none", position: "sticky", top: 0, zIndex: 40, alignItems: "center", justifyContent: "space-between", padding: "12px clamp(16px,5vw,28px)", background: "rgba(239,237,230,.96)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(20,18,15,.14)" }}>
        <Link to="/"><img src="/images/medibank-logo.png" alt="MediBank" style={{ height: "40px", width: "auto" }} /></Link>
        <button onClick={() => setOpen((v) => !v)} style={{ background: "none", border: 0, fontFamily: "'IBM Plex Mono',monospace", fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", color: "#14120F", cursor: "pointer" }}>{open ? "Close" : "Menu"}</button>
      </header>
      {open && (
        <div className="mb-mobile-menu" style={{ position: "fixed", inset: "60px 0 0", zIndex: 39, background: "#EFEDE6", padding: "20px clamp(16px,5vw,28px)", overflowY: "auto" }}>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            <NavItems onClick={() => setOpen(false)} />
          </nav>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <a href={SIGNUP_URL} style={{ flex: 1, background: "#2E1292", color: "#EFEDE6", fontFamily: "'IBM Plex Mono',monospace", fontSize: "11px", letterSpacing: ".1em", textTransform: "uppercase", padding: "13px", textAlign: "center" }}>Claim Record</a>
            <a href={APP_URL} style={{ border: "1px solid rgba(20,18,15,.3)", fontFamily: "'IBM Plex Mono',monospace", fontSize: "11px", letterSpacing: ".1em", textTransform: "uppercase", padding: "13px 18px", textAlign: "center", color: "#14120F" }}>Login</a>
          </div>
        </div>
      )}
    </>
  );
}
