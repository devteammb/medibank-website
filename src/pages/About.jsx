import { useRef } from "react";
import { Hero, Section, Page } from "../ui";
import { usePageAnims } from "../anim";

const DOCTORS = [
  ["Dr Navin Bhambhani", "M.S., D.N.B., M.R.C.S. (Oncology)", "/images/doctors/Dr-Navin-B.png"],
  ["Dr Ajay Dave", "MBBS, MS – Ophthalmology", "/images/doctors/Dr-Ajay-D.png"],
  ["Dr Anjali Nagpal", "MBBS, MD (Psychiatry)", "/images/doctors/Dr-Anjali-N.png"],
  ["Dr Kartikeya Kohli", "MBBS, DNB - Gen Med, MRCP (UK)", "/images/doctors/Dr-Kartikeya-K.png"],
  ["Dr Anupam Bhargava", "BDS, MDS - Operative Dentistry", "/images/doctors/Dr-Anupam-B.png"],
  ["Dr Urmi Sanyal", "MBBS, MD (Psychiatry)", "/images/doctors/Dr-Urmi-S.png"],
  ["Dr Anurag Agarwal", "MBBS, MS – Ophthalmology", "/images/doctors/Dr-Anurag-A.png"],
  ["Dr Khushi Bhambhani", "MBBS, DNB – Anaesthesiology", "/images/doctors/Dr-Khushi-B.png"],
];

export default function About() {
  const ref = useRef(null);
  usePageAnims(ref);
  return (
    <Page>
      <div ref={ref}>
        <Hero mark={["07", "About"]} title="Our Story."
          lead="India's first patient-centric Electronic Health Record platform — built to bring your medical history out of folders and into your hands." />

        <Section n="01" label="Our Story">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "clamp(28px,4vw,60px)", alignItems: "start" }} className="mb-foot-grid">
            <div className="mb-rv">
              <p className="mb-p">India has witnessed remarkable digital advancements across various sectors, yet health records remain largely confined to pen, paper &amp; folders, making them difficult to maintain and track.</p>
              <p className="mb-p">To bridge this gap and align with the nation&apos;s digitisation trend, Medibank was created as India&apos;s first patient-centric Electronic Health Record platform. By digitising healthcare records and utilising AI to generate health analysis charts of those records, Medibank aims to simplify access, streamline communication, and improve the overall experience for both patients and doctors.</p>
              <p className="mb-p">We are working towards a healthcare system in India, where citizens have the option to visit any healthcare provider or institution in any part of the country without the need to carry physical medical records.</p>
            </div>
            <img src="/images/ourstorynew.webp" alt="Our Story" className="mb-rv mb-card" style={{ width: "100%", objectFit: "cover" }} />
          </div>
        </Section>

        <Section n="02" label="The doctors who helped us initially" title="Guided by practising clinicians.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "clamp(20px,2.5vw,32px)" }}>
            {DOCTORS.map(([name, deg, img]) => (
              <div key={name} className="mb-rv">
                <div className="mb-card" style={{ aspectRatio: "3/3.4", overflow: "hidden", background: "#EFEDE6" }}>
                  <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ marginTop: "12px" }} className="mb-h3">{name}</div>
                <div className="mb-eyebrow" style={{ marginTop: "6px", textTransform: "none", letterSpacing: ".02em", color: "#8C8578" }}>{deg}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section n="03" label="Careers" title="Come build with us.">
          <div className="mb-rv" style={{ background: "#14120F", color: "#F6F4EE", padding: "clamp(28px,4vw,52px)", "--ink2": "#8A78E6" }}>
            <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: "clamp(16px,1.5vw,20px)", lineHeight: 1.6, color: "#BDB6A6", maxWidth: "60ch" }}>
              If you&apos;re passionate about joining our team and believe you&apos;d be a great fit, we&apos;d love to hear from you. Send your resume to{" "}
              <a href="mailto:careers@medibank.in" style={{ color: "#F6F4EE", textDecoration: "underline", fontStyle: "italic" }}>careers@medibank.in</a>, and let&apos;s explore the opportunities together.
            </p>
          </div>
        </Section>

        <Section n="04" label="Get in touch" title="Reach the team.">
          <div className="mb-rv" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "13px", lineHeight: 1.9, color: "#3A3630" }}>
            <div><span className="mb-tag">Email</span>&nbsp;&nbsp;contact@medibank.in</div>
            <div><span className="mb-tag">Careers</span>&nbsp;&nbsp;careers@medibank.in</div>
            <div style={{ maxWidth: "40ch" }}><span className="mb-tag">Office</span>&nbsp;&nbsp;WeWork-Raheja Mindspace, Building 9, Madhapur, Hyderabad, Telangana 500081</div>
            <a href="/contact" className="mb-btn" style={{ marginTop: "24px" }}>Open contact form →</a>
          </div>
        </Section>
      </div>
    </Page>
  );
}
