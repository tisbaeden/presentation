"use client";

export function CTASection() {
  return (
    <section
      data-section="cta"
      className="gsap-controlled flex flex-col items-center justify-center text-center px-6 py-24 gap-6"
      style={{ borderTop: "1px solid rgba(16,185,129,0.06)" }}
    >
      <h2
        className="text-4xl md:text-5xl font-extrabold tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        Découvrir le rapport complet
      </h2>
      <p
        className="text-base md:text-lg max-w-lg leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        Retrouve l'ensemble de mon stage — missions, compétences acquises, et
        projets réalisés chez EY Fabernovel.
      </p>
      <button
        className="rounded-xl px-8 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #065F46 0%, #047857 100%)",
          color: "#ECFDF5",
          border: "1px solid rgba(16,185,129,0.4)",
          boxShadow: "0 8px 32px -8px rgba(16,185,129,0.4)",
        }}
      >
        Voir le rapport de stage →
      </button>
    </section>
  );
}
