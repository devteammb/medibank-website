import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Page } from "../ui";
import { usePageAnims } from "../anim";
import { bySlug, POSTS } from "../blogData";

export default function BlogArticle() {
  const { slug } = useParams();
  const post = bySlug(slug);
  const ref = useRef(null);
  usePageAnims(ref, [slug]);

  if (!post) {
    return (
      <Page>
        <section className="mbp-pad"><div className="mbp">
          <h1 className="mb-h2">Article not found.</h1>
          <Link to="/blog" className="mb-btn" style={{ marginTop: "24px" }}>← Back to Blog</Link>
        </div></section>
      </Page>
    );
  }

  const more = POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  return (
    <Page>
      <div ref={ref}>
        <section className="mbp-pad" style={{ borderBottom: "1px solid rgba(20,18,15,.15)" }}>
          <div className="mbp" style={{ maxWidth: "900px" }}>
            <div className="mb-eyebrow" style={{ display: "flex", gap: "10px" }}>
              <Link to="/blog" style={{ color: "#8C8578" }}>Blog</Link><span>/</span>
              <span style={{ color: "#2E1292" }}>{post.source}</span>
            </div>
            <h1 className="mb-h1 mb-split" style={{ fontSize: "clamp(34px,5vw,72px)", marginTop: "clamp(20px,3vw,36px)" }}>{post.title}</h1>
            <div className="mb-eyebrow" style={{ marginTop: "24px", textTransform: "none", letterSpacing: ".04em" }}>
              {[post.author, post.date].filter(Boolean).join(" · ")}
            </div>
          </div>
        </section>

        <section className="mbp-pad">
          <div className="mbp" style={{ maxWidth: "760px" }}>
            <p className="mb-lead mb-rv" style={{ marginBottom: "28px" }}>{post.summary}</p>
            {post.slug === "article5" && (
              <img src="/images/art5Mb2.png" alt="MediBank hub" className="mb-card mb-rv" style={{ width: "100%", margin: "12px 0 28px" }} />
            )}
            <div className="mb-rv" style={{ borderTop: "1px solid rgba(20,18,15,.14)", paddingTop: "24px", fontFamily: "'IBM Plex Mono',monospace", fontSize: "12px", letterSpacing: ".06em", color: "#8C8578", lineHeight: 1.8 }}>
              {post.third
                ? <>Originally published by <span style={{ color: "#2E1292" }}>{post.source}</span>. This is a short summary — please refer to the original publication for the full article.</>
                : <>Written by the <span style={{ color: "#2E1292" }}>MediBank</span> team.</>}
            </div>
          </div>
        </section>

        <section className="mbp-pad" style={{ borderTop: "1px solid rgba(20,18,15,.14)" }}>
          <div className="mbp">
            <div className="mb-mark"><span className="ln" /><span className="t">More reading</span></div>
            <div className="mb-grid" style={{ marginTop: "24px", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))" }}>
              {more.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", color: "inherit" }}>
                  <span className="mb-tag">{p.source}</span>
                  <span className="mb-h3" style={{ fontSize: "19px" }}>{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}
