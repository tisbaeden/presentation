"use client";

import { TerminalWidget, type TerminalLine } from "@/components/terminal-widget";

const TERMINAL_LINES: TerminalLine[] = [
  { command: "whoami", output: "Eden Tisba · Bac Pro CIEL" },
  { command: "stage --info", output: "EY Fabernovel" },
  { command: "skills --list", output: "HTML · CSS · JS" },
  { command: "status", output: "✓ Stage validé" },
];

export function PresentationCard() {
  return (
    <section
      data-section="card"
      className="relative flex justify-center items-center px-6 py-20"
      style={{ background: "var(--bg-base)" }}
    >
      <div
        className="w-full max-w-5xl rounded-[28px] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center"
        style={{
          background: "linear-gradient(145deg, var(--bg-surface) 0%, var(--bg-card) 100%)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 40px 100px -20px rgba(0,0,0,0.8), 0 0 60px -30px rgba(16,185,129,0.15)",
        }}
      >
        {/* Left column */}
        <div data-col="left" className="gsap-controlled flex flex-col gap-4">
          <h3
            className="text-2xl md:text-3xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            La formation Bac Pro CIEL
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Le Bac Pro{" "}
            <strong style={{ color: "var(--accent-light)" }}>CIEL</strong>{" "}
            (Cybersécurité, Informatique et Électronique) forme à
            l'installation, la configuration et la sécurisation des systèmes et
            réseaux informatiques.
          </p>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Ce stage chez{" "}
            <strong style={{ color: "var(--accent-light)" }}>EY Fabernovel</strong>{" "}
            m'a permis de mettre en pratique les langages du web :{" "}
            <strong style={{ color: "var(--accent-light)" }}>HTML</strong> pour
            la structure,{" "}
            <strong style={{ color: "var(--accent-light)" }}>CSS</strong> pour
            la mise en forme, et{" "}
            <strong style={{ color: "var(--accent-light)" }}>JavaScript</strong>{" "}
            pour l'interactivité.
          </p>
        </div>

        {/* Right column */}
        <div data-col="right" className="gsap-controlled">
          <TerminalWidget
            lines={TERMINAL_LINES}
            title="eden@ey-fabernovel"
          />
        </div>
      </div>
    </section>
  );
}
