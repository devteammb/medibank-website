import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import design from "./design.html?raw";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ *
 * MediBank — "Health Identity Record" home.
 * Markup + inline styles ported verbatim from the source design; only
 * images/colors are swapped. On top: an editorial type-in intro, Lenis
 * smooth scroll, and a GSAP ScrollTrigger system themed to the dossier —
 * the record assembles itself as you read.
 *
 * Techniques (Awwwards editorial playbook — GSAP + ScrollTrigger + Lenis):
 *  · split-word masked headline reveals (print-in)
 *  · fragments "recover" — staggered rise as the section enters
 *  · case photos revealed with a clip-path wipe (ink being printed)
 *  · staggered list/grid reveals
 *  · scroll-velocity skew on the content column (liquid smooth-scroll feel)
 *  · left rail as a live index — active section + a scroll-progress fill
 * The sidebar itself stays static; only the content column is affected.
 * ------------------------------------------------------------------ */

const REDUCE =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Split an element's text into word units wrapped in overflow-hidden masks.
   Child elements (accent-coloured spans, the "..." etc.) are preserved as
   single units. Idempotent — safe under React StrictMode double-invoke. */
function splitWords(el) {
  if (el.dataset.mbSplit) return [...el.querySelectorAll(".mb-wi")];
  const nodes = [...el.childNodes];
  const frag = document.createDocumentFragment();
  const inners = [];
  const wrap = (child) => {
    const mask = document.createElement("span");
    mask.className = "mb-w";
    const inner = document.createElement("span");
    inner.className = "mb-wi";
    inner.appendChild(child);
    mask.appendChild(inner);
    frag.appendChild(mask);
    inners.push(inner);
  };
  nodes.forEach((node) => {
    if (node.nodeType === 3) {
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (part === "") return;
        if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
        else wrap(document.createTextNode(part));
      });
    } else if (node.nodeType === 1) {
      wrap(node.cloneNode(true));
    }
  });
  el.innerHTML = "";
  el.appendChild(frag);
  el.dataset.mbSplit = "1";
  return inners;
}

/* Editorial "type-in" intro so the page composes itself. */
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
      i += 1;
      setLc(i);
      if (i >= label.length) {
        clearInterval(lt);
        let j = 0;
        const tt = setInterval(() => {
          j += 1;
          setTc(j);
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
        <div className="mb-intro__label">
          {label.slice(0, lc)}
          {lc < label.length && <span className="mb-intro__caret mb-intro__caret--sm" />}
        </div>
        <h1 className="mb-intro__title">
          {title.slice(0, tc)}
          {lc >= label.length && <span className="mb-intro__caret" data-blink={titleDone ? "1" : "0"} />}
        </h1>
      </div>
    </div>
  );
}

export default function App() {
  const ref = useRef(null);
  const [intro, setIntro] = useState(!REDUCE);

  useEffect(() => {
    document.body.style.overflow = intro ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [intro]);

  // Responsive rail/topbar + mobile menu (from the original design logic).
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const rail = root.querySelector("aside");
    const topbar = root.querySelector("header");
    const menu = topbar && topbar.querySelector("nav");
    const toggle = topbar && topbar.querySelector("button");
    let menuOpen = false;
    const applyMenu = () => { if (menu) menu.style.display = menuOpen ? "flex" : "none"; };
    const sync = () => {
      const narrow = window.innerWidth < 980;
      if (rail) rail.style.display = narrow ? "none" : "flex";
      if (topbar) topbar.style.display = narrow ? "flex" : "none";
      if (!narrow) { menuOpen = false; applyMenu(); }
    };
    const onToggle = () => { menuOpen = !menuOpen; applyMenu(); };
    sync();
    window.addEventListener("resize", sync);
    if (toggle) toggle.addEventListener("click", onToggle);
    return () => window.removeEventListener("resize", sync);
  }, []);

  // Lenis + GSAP ScrollTrigger — start once the intro has lifted.
  useEffect(() => {
    if (REDUCE || intro) return;
    const root = ref.current;
    if (!root) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // in-page anchor clicks glide through Lenis
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = root.querySelector(id);
      if (el) { e.preventDefault(); lenis.scrollTo(el, { duration: 1.1 }); }
    };
    root.addEventListener("click", onClick);

    const wrap = root.querySelector('[style*="--ink2"]');
    const content = wrap && [...wrap.children].find((c) => c.tagName === "DIV");
    const rail = root.querySelector("aside");

    const ctx = gsap.context(() => {
      if (!content) return;
      const bands = [...content.children];
      const hero = bands[0];

      // 1) split-word masked headline reveals (skip hero — the intro owns it)
      const heads = [...content.querySelectorAll('[style*="Bodoni Moda"]')]
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) >= 24)
        .filter((el) => !hero.contains(el))
        .filter((el, _i, arr) => !arr.some((o) => o !== el && o.contains(el)));
      heads.forEach((el) => {
        const words = splitWords(el);
        gsap.from(words, {
          yPercent: 118, duration: 0.9, ease: "power4.out", stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // 2) fragments "recover" — staggered rise
      content.querySelectorAll("[data-frag]").forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0, y: 64, duration: 1, ease: "power3.out", delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });

      // 3) case reports — clip-path wipe reveal + (desktop) pinned horizontal gallery
      const caseSection = root.querySelector("#f3");
      if (caseSection) {
        const articles = [...caseSection.querySelectorAll("[data-case]")];
        articles.forEach((c) => {
          const img = c.querySelector("img");
          if (img) gsap.from(img, {
            clipPath: "inset(100% 0% 0% 0%)", duration: 1.15, ease: "power3.out",
            scrollTrigger: { trigger: c, start: "top 82%" },
          });
        });

        // Pin the section and advance the cases horizontally (desktop only).
        if (articles.length && window.innerWidth >= 980) {
          let pin = caseSection.querySelector(".mb-case-pin");
          if (!pin) {
            const parent = articles[0].parentNode;
            pin = document.createElement("div");
            pin.className = "mb-case-pin";
            const head = document.createElement("div");
            head.className = "mb-case-head";
            head.innerHTML =
              '<span>Real consequences — how MediBank fixes them</span>' +
              '<span class="mb-case-count">01&nbsp;/&nbsp;0' + articles.length + "</span>";
            const stage = document.createElement("div");
            stage.className = "mb-case-stage";
            const track = document.createElement("div");
            track.className = "mb-case-track";
            parent.insertBefore(pin, articles[0]);
            articles.forEach((a) => { a.classList.add("mb-case-card"); track.appendChild(a); });
            stage.appendChild(track);
            pin.appendChild(head);
            pin.appendChild(stage);
          }
          const stage = pin.querySelector(".mb-case-stage");
          const track = pin.querySelector(".mb-case-track");
          const countEl = pin.querySelector(".mb-case-count");
          const n = articles.length;
          const amount = () => Math.max(0, track.scrollWidth - stage.clientWidth);
          gsap.to(track, {
            x: () => -amount(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => "+=" + amount(),
              pin: true,
              pinType: "transform", // content column is skew-transformed; keeps the pin holding
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!countEl) return;
                const i = Math.min(n, Math.floor(self.progress * n) + 1);
                countEl.innerHTML = String(i).padStart(2, "0") + "&nbsp;/&nbsp;0" + n;
              },
            },
          });
        }
      }

      // 4) staggered reveals for the list/grid bands (contents, linked, custody, cta, footer)
      const cardBands = new Set();
      content.querySelectorAll("[data-frag],[data-case]").forEach((el) => {
        const b = bands.find((band) => band.contains(el));
        if (b) cardBands.add(b);
      });
      bands.forEach((band, idx) => {
        if (idx === 0 || cardBands.has(band)) return;
        let best = null, bestN = 2;
        band.querySelectorAll("*").forEach((node) => {
          const n = node.children.length;
          if (n > bestN) { bestN = n; best = node; }
        });
        const items = best ? [...best.children] : [band];
        gsap.from(items, {
          autoAlpha: 0, y: 42, duration: 0.8, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: band, start: "top 80%" },
        });
      });

      // 5) left rail as a live index + scroll-progress fill
      const nav = rail && rail.querySelector("nav");
      if (nav) {
        nav.querySelectorAll('a[href^="#f"]').forEach((a) => {
          const sec = root.querySelector(a.getAttribute("href"));
          if (!sec) return;
          ScrollTrigger.create({
            trigger: sec, start: "top 22%", end: "bottom 22%",
            onToggle: (self) => a.classList.toggle("mb-nav-on", self.isActive),
          });
        });
      }
      if (rail && !rail.querySelector(".mb-rail-prog")) {
        const bar = document.createElement("div");
        bar.className = "mb-rail-prog";
        bar.appendChild(document.createElement("i"));
        rail.appendChild(bar);
        gsap.to(bar.firstChild, {
          scaleY: 1, ease: "none", transformOrigin: "top",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });
      }
    }, root);

    // card hover, driven through GSAP so it composes with the reveal transforms
    if (content) {
      content.querySelectorAll("[data-frag]").forEach((el) => {
        if (el.dataset.mbHover) return;
        el.dataset.mbHover = "1";
        const base = gsap.getProperty(el, "rotation");
        el.addEventListener("mouseenter", () =>
          gsap.to(el, { rotation: 0, zIndex: 3, duration: 0.4, ease: "power2.out", overwrite: "auto" }));
        el.addEventListener("mouseleave", () =>
          gsap.to(el, { rotation: base, duration: 0.55, ease: "power2.out", overwrite: "auto" }));
      });
      content.querySelectorAll("[data-case]").forEach((c) => {
        if (c.dataset.mbHover) return;
        c.dataset.mbHover = "1";
        const img = c.querySelector("img");
        const tint = c.querySelector("span[style*='multiply']");
        c.addEventListener("mouseenter", () => {
          if (img) gsap.to(img, { scale: 1.05, duration: 0.5, ease: "power2.out" });
          if (tint) gsap.to(tint, { opacity: 0.2, duration: 0.5 });
        });
        c.addEventListener("mouseleave", () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
          if (tint) gsap.to(tint, { opacity: 0.5, duration: 0.5 });
        });
      });
    }

    // 6) scroll-velocity skew on the content column (rail untouched)
    const skewSetter = content ? gsap.quickTo(content, "skewY", { duration: 0.45, ease: "power3" }) : null;
    const onScroll = (e) => {
      if (skewSetter) skewSetter(gsap.utils.clamp(-3.2, 3.2, (e.velocity || 0) * 0.055));
    };
    lenis.on("scroll", onScroll);

    const refreshT = setTimeout(() => ScrollTrigger.refresh(), 1150);

    return () => {
      clearTimeout(refreshT);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      root.removeEventListener("click", onClick);
      ctx.revert();
      lenis.destroy();
    };
  }, [intro]);

  return (
    <>
      {intro && <Intro onDone={() => setIntro(false)} />}
      <div
        ref={ref}
        className={`mb-page${intro ? " mb-page--pre" : " mb-page--in"}`}
        dangerouslySetInnerHTML={{ __html: design }}
      />
    </>
  );
}
