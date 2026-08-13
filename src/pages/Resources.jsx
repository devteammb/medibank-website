import { useRef } from "react";
import { Link } from "react-router-dom";
import { Hero, Section, Page } from "../ui";
import { usePageAnims } from "../anim";

const ITEMS = [
  {
    tag: "ABHA / ABDM", title: "Your national digital health ID.",
    body: "The Ayushman Bharat Digital Mission (ABDM) builds the backbone for India's integrated digital health infrastructure. Your ABHA number is a 14-digit ID that uniquely identifies you across the country's healthcare ecosystem and lets you link records and benefits in one place.",
    cta: ["Register on ABHA →", "https://abha.abdm.gov.in/abha/v3/register", true], img: "/images/abha-pic.png",
  },
  {
    tag: "Health Guides", title: "Learn to stay well.",
    body: "A knowledge base of articles curated from doctors, medical journals and trustworthy sources — practical tips and precautions to help you lead a healthier life. General guidance only; for specific needs, please consult a doctor.",
    cta: ["View Guides →", "/health-guides", false], img: "/images/health-guides.png",
  },
  {
    tag: "Blog", title: "The case for EHR in India.",
    body: "Perspectives on electronic health records, digital health infrastructure, and the future of connected care in India — from our team and from the wider healthcare conversation.",
    cta: ["Read the Blog →", "/blog", false], img: "/images/blogs/blog4new.webp",
  },
  {
    tag: "Privacy & Security", title: "Built on trust.",
    body: "MediBank is developed on HL7 FHIR standards with AES-256 encryption and multi-factor authentication, so no health record is accessed without your permission. Read exactly what we collect, how we store it, and how it's shared.",
    cta: ["Read Privacy Policy →", "/privacy-policy", false], img: "/images/privacy-policy.png",
  },
];

export default function Resources() {
  const ref = useRef(null);
  usePageAnims(ref);
  return (
    <Page>
      <div ref={ref}>
        <Hero mark={["06", "Resources"]} title="Resources."
          lead="Everything around your health identity — the national ID, health guides, our writing, and how we keep your data safe." />

        {ITEMS.map((it, i) => {
          const [label, href, ext] = it.cta;
          const flip = i % 2 === 1;
          return (
            <Section key={it.tag} n={String(i + 1).padStart(2, "0")} label={it.tag}>
              <div className="mb-rv" style={{ display: "grid", gridTemplateColumns: flip ? "1fr 1.2fr" : "1.2fr 1fr", gap: "clamp(28px,4vw,60px)", alignItems: "center" }}>
                {flip && <img src={it.img} alt={it.tag} className="mb-card" style={{ width: "100%", objectFit: "cover", order: 0 }} />}
                <div>
                  <h2 className="mb-h2">{it.title}</h2>
                  <p className="mb-p" style={{ marginTop: "18px" }}>{it.body}</p>
                  {ext
                    ? <a href={href} target="_blank" rel="noreferrer" className="mb-btn" style={{ marginTop: "24px" }}>{label}</a>
                    : <Link to={href} className="mb-btn" style={{ marginTop: "24px" }}>{label}</Link>}
                </div>
                {!flip && <img src={it.img} alt={it.tag} className="mb-card" style={{ width: "100%", objectFit: "cover" }} />}
              </div>
            </Section>
          );
        })}
      </div>
    </Page>
  );
}
