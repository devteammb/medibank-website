/* Blog metadata + original short summaries (not verbatim reproductions).
   Articles sourced from third-party publications link out to their source. */
export const POSTS = [
  {
    slug: "article1",
    title: "Need of the Hour: India Needs a Nationwide Framework for EHR Adoption",
    source: "The Times of India", author: "Vikram Thaploo", date: "April 30, 2023",
    img: "/images/blogs/blog1.webp",
    summary:
      "A case for a coordinated, nationwide push on electronic health records — covering the state of EHR adoption in India, the ICT infrastructure gap, the need for greater public and private funding, health-information exchange, personal health records, minimum viable standards (like FHIR), and privacy protection.",
    third: true,
  },
  {
    slug: "article2",
    title: "Digitalisation of Healthcare Data Will Be the Next Startup Boom",
    source: "The Economic Times (ET Contributors)", author: "Ayush Jain", date: "",
    img: "/images/blogs/blog2.webp",
    summary:
      "Just as Aadhaar and UPI enabled India's fintech wave, nationwide EHR adoption could power a health-tech boom — opening opportunities in data entry and visualisation, NLP, AI-driven analytics, wearables integration, and next-gen telemedicine that reaches rural India.",
    third: true,
  },
  {
    slug: "article3",
    title: "India Bullish on AI in Healthcare — Without Electronic Health Records",
    source: "ETHealthWorld", author: "", date: "",
    img: "/images/blogs/blog3.webp",
    summary:
      "A reality check: most Indian hospital IT systems handle billing, not true EHRs. Using Kerala's eHealth project and international examples, the piece argues that without foundational, standardised health data there can be no meaningful AI — and that well-designed incentives are key to adoption.",
    third: true,
  },
  {
    slug: "article4",
    title: "Electronic Health Records: Adoption and Overcoming Challenges for India",
    source: "MediBank", author: "MediBank", date: "",
    img: "/images/blogs/blog4new.webp",
    summary:
      "An overview of what EHRs are and why they matter for India — the government's standards journey, the goals of interoperability, the wide-ranging benefits of digitised records, a six-step implementation roadmap, and the security and infrastructure challenges that must be solved.",
    third: false,
  },
  {
    slug: "article5",
    title: "The Future of Healthcare: How EHR Can Transform Patient Care in India",
    source: "MediBank", author: "MediBank Editorial", date: "July 31, 2025",
    img: "/images/art5Mb1.png",
    summary:
      "How EHRs move care from fragmented paper files to a connected digital ecosystem — instant, secure access to a patient's full history, proactive and preventive care, EHR-powered telemedicine, and AI-enhanced insights. Introduces MediBank as India's first dedicated EHR integration platform, built on HL7 FHIR with AES-256 encryption and consent-based access.",
    third: false,
  },
];

export const bySlug = (slug) => POSTS.find((p) => p.slug === slug);
