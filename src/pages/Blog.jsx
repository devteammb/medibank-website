import { useRef } from "react";
import { Link } from "react-router-dom";
import { Page } from "../ui";
import { usePageAnims } from "../anim";
import { POSTS } from "../blogData";

export default function Blog() {
  const ref = useRef(null);
  usePageAnims(ref);
  return (
    <Page>
      <div ref={ref}>
        <section className="mbp-pad" style={{ borderBottom: "1px solid rgba(20,18,15,.15)" }}>
          <div className="mbp">
            <div className="mb-mark"><span className="n">08</span><span className="ln" /><span className="t">Blog</span></div>
            <h1 className="mb-h1 mb-split" style={{ marginTop: "clamp(20px,3vw,40px)", maxWidth: "14ch" }}>Notes on digital health.</h1>
          </div>
        </section>

        <section className="mbp-pad">
          <div className="mbp mb-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))" }}>
            {POSTS.map((p, i) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="mb-rv" style={{ display: "flex", flexDirection: "column", color: "inherit" }}>
                <div style={{ aspectRatio: "16/10", overflow: "hidden", background: "#EFEDE6" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "22px clamp(20px,2vw,26px) 28px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                  <span className="mb-tag">{String(i + 1).padStart(2, "0")} · {p.source}</span>
                  <h3 className="mb-h3" style={{ fontSize: "22px" }}>{p.title}</h3>
                  <span className="mb-eyebrow" style={{ marginTop: "auto", textTransform: "none", letterSpacing: ".04em", color: "#2E1292" }}>Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
