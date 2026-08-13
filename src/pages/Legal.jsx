import { useRef } from "react";
import { Page } from "../ui";
import { usePageAnims } from "../anim";
import { TERMS, PRIVACY } from "../legalData";

export default function Legal({ which }) {
  const doc = which === "terms" ? TERMS : PRIVACY;
  const ref = useRef(null);
  usePageAnims(ref, [which]);
  return (
    <Page>
      <div ref={ref}>
        <section className="mbp-pad" style={{ borderBottom: "1px solid rgba(20,18,15,.15)" }}>
          <div className="mbp" style={{ maxWidth: "860px" }}>
            <div className="mb-eyebrow">Legal</div>
            <h1 className="mb-h1 mb-split" style={{ fontSize: "clamp(36px,5.5vw,82px)", marginTop: "clamp(18px,3vw,32px)" }}>{doc.title}.</h1>
            {doc.meta && <div className="mb-eyebrow" style={{ marginTop: "22px", textTransform: "none", letterSpacing: ".04em" }}>{doc.meta}</div>}
            <div style={{ marginTop: "26px" }}>
              {doc.intro.map((p, i) => <p key={i} className="mb-p mb-rv">{p}</p>)}
            </div>
          </div>
        </section>

        <section className="mbp-pad">
          <div className="mbp" style={{ maxWidth: "860px" }}>
            {doc.sections.map(([heading, items], i) => (
              <div key={heading} className="mb-rv" style={{ paddingTop: i ? "clamp(30px,3.5vw,52px)" : 0, marginTop: i ? "clamp(30px,3.5vw,52px)" : 0, borderTop: i ? "1px solid rgba(20,18,15,.14)" : "none" }}>
                <h2 className="mb-h3" style={{ fontSize: "clamp(20px,2.4vw,28px)" }}>{heading}</h2>
                <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {items.map((it, j) => (
                    <li key={j} style={{ display: "flex", gap: "14px" }}>
                      <span className="mb-tag" style={{ flexShrink: 0, marginTop: "3px" }}>—</span>
                      <span className="mb-p" style={{ margin: 0 }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
