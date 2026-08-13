import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Sidebar from "./Sidebar";

gsap.registerPlugin(ScrollTrigger);
const REDUCE = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Layout() {
  const loc = useLocation();
  const lenisRef = useRef(null);

  // one Lenis instance for the whole app, wired to ScrollTrigger
  useEffect(() => {
    if (REDUCE) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // reset scroll to top + refresh triggers on route change
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => clearTimeout(t);
  }, [loc.pathname]);

  return (
    <div className="mb-app">
      <Sidebar />
      <main className="mb-main">
        <Outlet />
      </main>
    </div>
  );
}
