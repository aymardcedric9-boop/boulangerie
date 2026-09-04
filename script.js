/* La Fournée Dorée — Animations GSAP + Lenis */
(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* Hero cinematic scroll */
  const heroWrap = document.getElementById("hero-wrap");
  const heroVideo = document.getElementById("hero-video");

  if (heroWrap && heroVideo) {
    gsap.to(heroVideo, {
      scale: 1.18,
      ease: "none",
      scrollTrigger: {
        trigger: heroWrap,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.to(".hud", {
      opacity: 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: heroWrap,
        start: "60% top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  /* Hero entrance */
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".hud-top", { y: -20, opacity: 0, duration: 0.8 })
    .from(".hero-content .kicker", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
    .from(".hero-content h1", { y: 40, opacity: 0, duration: 0.9 }, "-=0.5")
    .from(".hero-line", { scaleX: 0, transformOrigin: "left", duration: 0.6 }, "-=0.5")
    .from(".hero-content p", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
    .from(".hero-content .btn", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3");

  function reveal(selector, opts = {}) {
    const { y = 50, x = 0, duration = 0.9, stagger = 0.12, start = "top 82%" } = opts;
    gsap.from(selector, {
      y, x, opacity: 0, duration, stagger, ease: "power3.out",
      scrollTrigger: { trigger: selector, start, toggleActions: "play none none none" },
    });
  }

  document.querySelectorAll(".section-heading").forEach((heading) => {
    gsap.from(heading.children, {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: heading, start: "top 85%" },
    });
  });

  reveal("#avantages .why", { y: 60, stagger: 0.15 });
  gsap.from("#avantages .icon", {
    scale: 0, rotation: -15, opacity: 0, duration: 0.7, stagger: 0.15,
    ease: "back.out(1.7)",
    scrollTrigger: { trigger: "#avantages .grid4", start: "top 80%" },
  });

  reveal("#specialites .card", { y: 70, stagger: 0.14 });
  gsap.from("#specialites .card-icon", {
    scale: 0, opacity: 0, duration: 0.6, stagger: 0.14, ease: "back.out(2)", delay: 0.3,
    scrollTrigger: { trigger: "#specialites .grid4", start: "top 78%" },
  });

  reveal("#pourquoi .why", { y: 55, stagger: 0.13 });
  reveal("#produits .product", { y: 65, stagger: 0.1 });
  gsap.from("#produits .btn.center", {
    y: 30, opacity: 0, duration: 0.7, ease: "power2.out",
    scrollTrigger: { trigger: "#produits .btn.center", start: "top 90%" },
  });

  gsap.from("#apropos .about-img", {
    x: -80, opacity: 0, duration: 1.1, ease: "power3.out",
    scrollTrigger: { trigger: "#apropos .grid2", start: "top 75%" },
  });
  gsap.from("#apropos .grid2 > div:last-child > *", {
    x: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
    scrollTrigger: { trigger: "#apropos .grid2", start: "top 75%" },
  });

  gsap.from("#galerie .gallery-track-wrap", {
    opacity: 0, y: 40, duration: 1, ease: "power2.out",
    scrollTrigger: { trigger: "#galerie", start: "top 80%" },
  });

  gsap.utils.toArray("#avis .review").forEach((card, i) => {
    gsap.from(card, {
      x: i % 2 === 0 ? -50 : 50, y: 30, opacity: 0, duration: 0.85, ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 88%" },
    });
  });

  reveal("#contact .contact", { y: 50, stagger: 0.12 });
  gsap.from(".footer-bottom", {
    y: 20, opacity: 0, duration: 0.7, ease: "power2.out",
    scrollTrigger: { trigger: ".footer", start: "top 95%" },
  });

  /* Nav active */
  const sections = document.querySelectorAll("section[id], .hero-sticky[id]");
  const navLinks = document.querySelectorAll(".desktop-nav a");
  sections.forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: "top center", end: "bottom center",
      onEnter: () => setActive(sec.id),
      onEnterBack: () => setActive(sec.id),
    });
  });
  function setActive(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }

  document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      const toggle = document.getElementById("menu-toggle");
      if (toggle) toggle.checked = false;
    });
  });
})();

/* ===== 02 AVANTAGES - ANIMATION CAPTIVANTE AU SCROLL ===== */
(() => {
  const section = document.getElementById("avantages");
  const cards = document.querySelectorAll("#avantages .why");
  if (!section || !cards.length) return;

  // État initial pour GSAP (évite le flash)
  gsap.set(cards, { y: 80, opacity: 0, scale: 0.92 });
  gsap.set("#avantages .why .icon i", { scale: 0, rotation: -90 });

  // Timeline au scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#avantages",
      start: "top 78%",
      toggleActions: "play none none reverse"
    }
  });

  tl.to(cards, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out"
  })
  .to("#avantages .why .icon i", {
    scale: 1,
    rotation: 0,
    duration: 0.5,
    stagger: 0.12,
    ease: "back.out(2)"
  }, "-=0.4");

  // Hover luxe - ne touche pas ton CSS
  cards.forEach(card => {
    const icon = card.querySelector(".icon");
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { y: -10, scale: 1.02, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      if(icon) gsap.to(icon, { y: -4, scale: 1.08, backgroundColor: "#C5A059", borderColor: "#C5A059", duration: 0.35 });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      if(icon) gsap.to(icon, { y: 0, scale: 1, backgroundColor: "var(--bg3)", borderColor: "var(--line)", duration: 0.35 });
    });
  });
})();


/* ===== 03 PRODUITS POPULAIRES - #produits ===== */
(() => {
  const section = document.getElementById("produits");
  const cards = document.querySelectorAll("#produits .product");
  if (!section || !cards.length) return;

  gsap.set(cards, { y: 80, opacity: 0, scale: 0.95 });
  gsap.set("#produits .section-heading", { y: 40, opacity: 0 });

  gsap.timeline({
    scrollTrigger: {
      trigger: "#produits",
      start: "top 70%",
      toggleActions: "play none none reverse"
    }
  })
  .to("#produits .section-heading", {
    y: 0, opacity: 1, duration: 0.7, ease: "power3.out"
  })
  .to(cards, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 0.8,
    stagger: {
      each: 0.1,
      grid: [2, 3],
      from: "start"
    },
    ease: "power3.out"
  }, "-=0.3");

  cards.forEach(card => {
    const img = card.querySelector("img");
    card.style.overflow = "hidden";
    
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { y: -10, duration: 0.4, ease: "power2.out" });
      if(img) gsap.to(img, { scale: 1.12, duration: 0.6, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });
      if(img) gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
    });
  });
})();


/* ===== 04 A PROPOS - #apropos ===== */
(() => {
  const sec = document.getElementById("apropos");
  if (!sec) return;

  const imgWrap = sec.querySelector(".about-img");
  const img = sec.querySelector(".about-img img");
  const label = sec.querySelector(".label");
  const title = sec.querySelector("h2");
  const para = sec.querySelector("p");

  if (!imgWrap || !img) return;

  gsap.set(imgWrap, { clipPath: "inset(0 100% 0 0)" });
  gsap.set(img, { scale: 1.25 });
  gsap.set([label, title, para], { y: 40, opacity: 0 });

  gsap.timeline({
    scrollTrigger: {
      trigger: "#apropos",
      start: "top 70%",
      toggleActions: "play none none reverse"
    }
  })
  .to(imgWrap, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.inOut" })
  .to(img, { scale: 1, duration: 1.1, ease: "power4.inOut" }, "<")
  .to(label, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.6")
  .to(title, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
  .to(para, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");
})();

