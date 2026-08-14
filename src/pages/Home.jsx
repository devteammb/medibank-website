import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "../anim";
import Footer from "../Footer";
import rawDesign from "../design.html?raw";

/* Home ports the source design markup, but the shared <Sidebar> now provides
   the rail — so strip the injected <aside> (rail) and <header> (mobile topbar).
   What remains is the flex wrapper + the content column. */
const design = rawDesign
  .replace(/<aside[\s\S]*?<\/aside>/, "")
  .replace(/<header[\s\S]*?<\/header>/, "")
  .replace(/<footer[\s\S]*?<\/footer>/, ""); // use the shared React <Footer> instead

const REDUCE = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let introPlayed = false; // once per session

function Intro({ onDone }) {
  const label = "MEDIBANK · YOUR HEALTH IDENTITY FOR LIFE";
  const title = "Your Health Identity for Life.";
  const [lc, setLc] = useState(0);
  const [tc, setTc] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const timers = [];
    let i = 0;
    const lt = setInterval(() => {
      i += 1; setLc(i);
      if (i >= label.length) {
        clearInterval(lt);
        let j = 0;
        const tt = setInterval(() => {
          j += 1; setTc(j);
          if (j >= title.length) {
            clearInterval(tt);
            timers.push(setTimeout(() => setLeaving(true), 650));
            timers.push(setTimeout(onDone, 650 + 950));
          }
        }, 60);
        timers.push(tt);
      }
    }, 26);
    timers.push(lt);
    return () => timers.forEach((t) => clearInterval(t) || clearTimeout(t));
  }, [onDone]);
  const titleDone = tc >= title.length;
  return (
    <div className={`mb-intro${leaving ? " mb-intro--out" : ""}`} aria-hidden="true">
      <div className="mb-intro__inner">
        <div className="mb-intro__rule" />
        <div className="mb-intro__label">{label.slice(0, lc)}{lc < label.length && <span className="mb-intro__caret mb-intro__caret--sm" />}</div>
        <h1 className="mb-intro__title">{title.slice(0, tc)}{lc >= label.length && <span className="mb-intro__caret" data-blink={titleDone ? "1" : "0"} />}</h1>
      </div>
    </div>
  );
}

export default function Home() {
  const ref = useRef(null);
  const [intro, setIntro] = useState(!REDUCE && !introPlayed);

  useEffect(() => {
    if (intro) document.body.style.overflow = "hidden";
    else { document.body.style.overflow = ""; introPlayed = true; }
    return () => { document.body.style.overflow = ""; };
  }, [intro]);

  useEffect(() => {
    if (REDUCE || intro) return;
    const root = ref.current;
    if (!root) return;

    const content = root.querySelector('[style*="flex: 1 1 640px"]') || root.querySelector('[style*="--ink2"]')?.firstElementChild;
    if (!content) return;

    const ctx = gsap.context(() => {
      const bands = [...content.children];
      const hero = bands[0];

      // split-word headline reveals (skip hero — intro owns it)
      [...content.querySelectorAll('[style*="Bodoni Moda"]')]
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) >= 24)
        .filter((el) => !hero.contains(el))
        .filter((el, _i, arr) => !arr.some((o) => o !== el && o.contains(el)))
        .forEach((el) => {
          const words = splitWords(el);
          gsap.from(words, { yPercent: 118, duration: 0.9, ease: "power4.out", stagger: 0.045, scrollTrigger: { trigger: el, start: "top 88%" } });
        });

      // fragments "recover"
      content.querySelectorAll("[data-frag]").forEach((el, i) => {
        gsap.from(el, { autoAlpha: 0, y: 64, duration: 1, ease: "power3.out", delay: (i % 3) * 0.06, scrollTrigger: { trigger: el, start: "top 92%" } });
      });

      // case reports — clip-wipe + pinned horizontal gallery
      const caseSection = root.querySelector("#f3");
      if (caseSection) {
        const articles = [...caseSection.querySelectorAll("[data-case]")];
        articles.forEach((c) => {
          const img = c.querySelector("img");
          if (img) gsap.from(img, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: c, start: "top 82%" } });
        });
        if (articles.length && window.innerWidth >= 980) {
          let pin = caseSection.querySelector(".mb-case-pin");
          if (!pin) {
            const parent = articles[0].parentNode;
            pin = document.createElement("div"); pin.className = "mb-case-pin";
            const head = document.createElement("div"); head.className = "mb-case-head";
            head.innerHTML = '<span>Real consequences — how MediBank fixes them</span><span class="mb-case-count">01&nbsp;/&nbsp;0' + articles.length + "</span>";
            const stage = document.createElement("div"); stage.className = "mb-case-stage";
            const track = document.createElement("div"); track.className = "mb-case-track";
            parent.insertBefore(pin, articles[0]);
            articles.forEach((a) => { a.classList.add("mb-case-card"); track.appendChild(a); });
            stage.appendChild(track); pin.appendChild(head); pin.appendChild(stage);
          }
          const stage = pin.querySelector(".mb-case-stage");
          const track = pin.querySelector(".mb-case-track");
          const countEl = pin.querySelector(".mb-case-count");
          const n = articles.length;
          const amount = () => Math.max(0, track.scrollWidth - stage.clientWidth);
          gsap.to(track, {
            x: () => -amount(), ease: "none",
            scrollTrigger: {
              trigger: pin, start: "top top", end: () => "+=" + amount(),
              pin: true, pinType: "transform", scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
              onUpdate: (self) => { if (countEl) countEl.innerHTML = String(Math.min(n, Math.floor(self.progress * n) + 1)).padStart(2, "0") + "&nbsp;/&nbsp;0" + n; },
            },
          });
        }
      }

      // staggered reveals for the list/grid bands
      const cardBands = new Set();
      content.querySelectorAll("[data-frag],[data-case]").forEach((el) => {
        const b = bands.find((band) => band.contains(el)); if (b) cardBands.add(b);
      });
      bands.forEach((band, idx) => {
        if (idx === 0 || cardBands.has(band)) return;
        let best = null, bestN = 2;
        band.querySelectorAll("*").forEach((node) => { const c = node.children.length; if (c > bestN) { bestN = c; best = node; } });
        const items = best ? [...best.children] : [band];
        gsap.from(items, { autoAlpha: 0, y: 42, duration: 0.8, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: band, start: "top 80%" } });
      });
    }, root);

    // card hover through GSAP
    content.querySelectorAll("[data-frag]").forEach((el) => {
      if (el.dataset.mbHover) return; el.dataset.mbHover = "1";
      const base = gsap.getProperty(el, "rotation");
      el.addEventListener("mouseenter", () => gsap.to(el, { rotation: 0, zIndex: 3, duration: 0.4, ease: "power2.out", overwrite: "auto" }));
      el.addEventListener("mouseleave", () => gsap.to(el, { rotation: base, duration: 0.55, ease: "power2.out", overwrite: "auto" }));
    });
    content.querySelectorAll("[data-case]").forEach((c) => {
      if (c.dataset.mbHover) return; c.dataset.mbHover = "1";
      const img = c.querySelector("img");
      c.addEventListener("mouseenter", () => { if (img) gsap.to(img, { scale: 1.05, duration: 0.5 }); });
      c.addEventListener("mouseleave", () => { if (img) gsap.to(img, { scale: 1, duration: 0.5 }); });
    });

    // scroll-velocity skew on the content column
    const skewSetter = gsap.quickTo(content, "skewY", { duration: 0.45, ease: "power3" });
    const st = ScrollTrigger.create({
      onUpdate: (self) => skewSetter(gsap.utils.clamp(-3.2, 3.2, self.getVelocity() * -0.0016)),
    });

    const refreshT = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(refreshT); st.kill(); ctx.revert(); };
  }, [intro]);

  return (
    <>
      {intro && <Intro onDone={() => setIntro(false)} />}
      <div ref={ref} className={`mb-page${intro ? " mb-page--pre" : " mb-page--in"}`} dangerouslySetInnerHTML={{ __html: design }} />
      <Footer />
    </>
  );
}
