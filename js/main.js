/* ============================================================
   Tanuja Sadgir — Cybersecurity Portfolio
   Interactions: nav toggle, scroll state, reveal, counters, form
   ============================================================ */

(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  /* ---------- Mobile nav toggle ---------- */
  function closeNav() {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* ---------- Navbar scrolled state ---------- */
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Active link highlighting ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const linkMap = {};
  navLinks.querySelectorAll("a").forEach(function (link) {
    const id = link.getAttribute("href").replace("#", "");
    linkMap[id] = link;
  });

  const navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        const link = linkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.values(linkMap).forEach(function (l) { l.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach(function (s) { navObserver.observe(s); });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll(".stat-num[data-count]");
  const counterObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach(function (c) { counterObserver.observe(c); });

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Contact form (mailto fallback) ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        note.textContent = "Please fill in all fields.";
        note.className = "form-note error";
        return;
      }

      const subject = encodeURIComponent("Portfolio inquiry from " + name);
      const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href =
        "mailto:tanujasadgir21@gmail.com?subject=" + subject + "&body=" + body;

      note.textContent = "Opening your email client...";
      note.className = "form-note success";
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
