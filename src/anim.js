import { useEffect } from "react";

const REDUCE = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Split an element's text into word units wrapped in overflow-hidden masks.
   Child elements are preserved as single units. Idempotent. */
export function splitWords(el) {
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

/* Per-page reveal: split-word headings (.mb-split) + block reveals (.mb-rv),
   driven by IntersectionObserver so it works cleanly across route changes.
   No GSAP dependency — pure CSS transitions. */
export function usePageAnims(ref, deps = []) {
  useEffect(() => {
    const root = ref.current;
    if (!root || REDUCE) return;

    const heads = [...root.querySelectorAll(".mb-split")];
    heads.forEach((el) => {
      const words = splitWords(el);
      words.forEach((w, i) => {
        w.style.transition = `transform .85s cubic-bezier(.22,.8,.24,1) ${i * 45}ms`;
        w.style.transform = "translateY(110%)";
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target.classList.contains("mb-split")) {
            e.target.querySelectorAll(".mb-wi").forEach((w) => { w.style.transform = "translateY(0)"; });
          } else {
            e.target.classList.add("in");
          }
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    heads.forEach((el) => io.observe(el));
    root.querySelectorAll(".mb-rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
