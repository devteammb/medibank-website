import Footer from "./Footer";

export function Eyebrow({ children }) {
  return <div className="mb-eyebrow">{children}</div>;
}

export function Mark({ n, children }) {
  return (
    <div className="mb-mark">
      <span className="n">{n}</span>
      <span className="ln" />
      <span className="t">{children}</span>
    </div>
  );
}

/* Editorial page hero */
export function Hero({ kicker, title, lead, mark }) {
  return (
    <section className="mbp-pad" style={{ borderBottom: "1px solid rgba(20,18,15,.15)" }}>
      <div className="mbp">
        {mark ? <Mark n={mark[0]}>{mark[1]}</Mark> : kicker ? <Eyebrow>{kicker}</Eyebrow> : null}
        <h1 className="mb-h1 mb-split" style={{ marginTop: "clamp(20px,3vw,40px)", maxWidth: "16ch" }}>{title}</h1>
        {lead && <p className="mb-lead mb-rv" style={{ marginTop: "clamp(20px,2.5vw,34px)" }}>{lead}</p>}
      </div>
    </section>
  );
}

/* Standard content section with a section mark + heading */
export function Section({ n, label, title, children, style }) {
  return (
    <section className="mbp-pad" style={{ borderBottom: "1px solid rgba(20,18,15,.14)", ...style }}>
      <div className="mbp">
        {(n || label) && <Mark n={n}>{label}</Mark>}
        {title && <h2 className="mb-h2 mb-split" style={{ marginTop: "18px", maxWidth: "20ch" }}>{title}</h2>}
        <div style={{ marginTop: title ? "clamp(28px,3vw,44px)" : "18px" }}>{children}</div>
      </div>
    </section>
  );
}

export function Page({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
