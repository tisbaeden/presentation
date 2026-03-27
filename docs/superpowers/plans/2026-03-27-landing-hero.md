# Landing Page Hero — Eden Tisba Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic dark/vert-néon landing page hero for Eden Tisba's Bac Pro CIEL internship at EY Fabernovel, using Next.js + Tailwind + GSAP.

**Architecture:** Three sections assembled in `src/app/page.tsx`: fullscreen Hero with GSAP intro + scroll animations, a 2-column Presentation Card with an animated terminal widget, and a CTA section. GSAP ScrollTrigger pins the page during scroll-driven transitions. All animations are disabled when `prefers-reduced-motion` is active.

**Tech Stack:** Next.js 14 (App Router) · Tailwind CSS · TypeScript · GSAP + ScrollTrigger · shadcn/ui · Jest + React Testing Library

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/app/layout.tsx` | Create | HTML shell, Inter font, metadata |
| `src/app/globals.css` | Create | Design tokens as CSS vars, Tailwind base |
| `src/app/page.tsx` | Create | Assembles the 3 sections |
| `src/components/terminal-widget.tsx` | Create | Animated terminal window (typing effect) |
| `src/components/hero-section.tsx` | Create | Fullscreen hero, GSAP intro + ScrollTrigger |
| `src/components/presentation-card.tsx` | Create | 2-col card with TerminalWidget |
| `src/components/cta-section.tsx` | Create | CTA with scroll fade-in |
| `src/lib/utils.ts` | Create | `cn()` helper from shadcn |
| `src/__tests__/terminal-widget.test.tsx` | Create | Unit tests for terminal component |
| `src/__tests__/hero-section.test.tsx` | Create | Render tests for hero |
| `src/__tests__/presentation-card.test.tsx` | Create | Render tests for card |
| `src/__tests__/cta-section.test.tsx` | Create | Render tests for CTA |

---

## Task 1: Bootstrap Next.js project with shadcn + GSAP

**Files:**
- Create: root project scaffolded by CLI

- [ ] **Step 1: Scaffold the Next.js project**

Run in `/Users/andy.tisba/Work/Eden/LastDayVibeCOde`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```
Expected output: `✓ Success! Created Next.js app`

- [ ] **Step 2: Initialize shadcn/ui**

```bash
npx shadcn@latest init --defaults
```
When prompted: choose `Default` style, `Zinc` base color, CSS variables `yes`.

- [ ] **Step 3: Install GSAP**

```bash
npm install gsap
npm install --save-dev @types/gsap
```

- [ ] **Step 4: Install React Testing Library**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom ts-jest
```

- [ ] **Step 5: Create Jest config**

Create `jest.config.ts`:
```ts
import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterFramework: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/__tests__/**/*.test.tsx"],
};

export default config;
```

Create `jest.setup.ts`:
```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 6: Add test script to package.json**

Open `package.json`, add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: bootstrap Next.js + shadcn + GSAP + Jest"
```

---

## Task 2: Design tokens and global styles

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace globals.css with design tokens**

Replace the entire content of `src/app/globals.css`:
```css
@import "tailwindcss";

:root {
  --bg-base: #060B14;
  --bg-surface: #0D1F1A;
  --bg-card: #080F16;
  --accent: #10B981;
  --accent-light: #34D399;
  --accent-lighter: #6EE7B7;
  --text-primary: #ffffff;
  --text-secondary: #64748B;
  --text-muted: #334155;
  --grid-color: rgba(16, 185, 129, 0.05);
  --border-subtle: rgba(16, 185, 129, 0.12);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .gsap-controlled {
    visibility: visible !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    clip-path: none !important;
  }
}
```

- [ ] **Step 2: Update layout.tsx with Inter font and metadata**

Replace `src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Eden Tisba — Stage Bac Pro CIEL @ EY Fabernovel",
  description:
    "Rapport de stage de fin d'école — Formation Cybersécurité, Informatique et Électronique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build compiles**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add design tokens and Inter font layout"
```

---

## Task 3: TerminalWidget component (TDD)

**Files:**
- Create: `src/components/terminal-widget.tsx`
- Create: `src/__tests__/terminal-widget.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/__tests__/terminal-widget.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { TerminalWidget } from "@/components/terminal-widget";

const defaultLines = [
  { command: "whoami", output: "Eden Tisba · Bac Pro CIEL" },
  { command: "stage --info", output: "EY Fabernovel" },
  { command: "skills --list", output: "HTML · CSS · JS" },
  { command: "status", output: "✓ Stage validé" },
];

describe("TerminalWidget", () => {
  it("renders the terminal title bar", () => {
    render(<TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />);
    expect(screen.getByText("terminal — eden@ey-fabernovel")).toBeInTheDocument();
  });

  it("renders all command lines", () => {
    render(<TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />);
    expect(screen.getByText("whoami")).toBeInTheDocument();
    expect(screen.getByText("stage --info")).toBeInTheDocument();
    expect(screen.getByText("skills --list")).toBeInTheDocument();
    expect(screen.getByText("status")).toBeInTheDocument();
  });

  it("renders all output lines", () => {
    render(<TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />);
    expect(screen.getByText("Eden Tisba · Bac Pro CIEL")).toBeInTheDocument();
    expect(screen.getByText("EY Fabernovel")).toBeInTheDocument();
  });

  it("renders macOS traffic-light dots", () => {
    const { container } = render(
      <TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />
    );
    const dots = container.querySelectorAll("[data-testid='traffic-dot']");
    expect(dots).toHaveLength(3);
  });

  it("renders a blinking cursor on the last line", () => {
    const { container } = render(
      <TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />
    );
    expect(container.querySelector("[data-testid='cursor']")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- terminal-widget
```
Expected: `FAIL` — `Cannot find module '@/components/terminal-widget'`

- [ ] **Step 3: Implement TerminalWidget**

Create `src/components/terminal-widget.tsx`:
```tsx
"use client";

export interface TerminalLine {
  command: string;
  output: string;
}

interface TerminalWidgetProps {
  lines: TerminalLine[];
  title: string;
}

export function TerminalWidget({ lines, title }: TerminalWidgetProps) {
  return (
    <div
      className="rounded-[14px] overflow-hidden border"
      style={{
        background: "#050A0E",
        borderColor: "rgba(16,185,129,0.15)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.03)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 border-b"
        style={{ background: "#0A1020", borderColor: "rgba(16,185,129,0.08)" }}
      >
        {(["#EF4444", "#F59E0B", "#10B981"] as const).map((color) => (
          <div
            key={color}
            data-testid="traffic-dot"
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: color }}
          />
        ))}
        <span
          className="ml-2 font-mono text-[11px]"
          style={{ color: "#475569" }}
        >
          terminal — {title}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 font-mono text-[13px] leading-[1.9]">
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          return (
            <div key={i}>
              <div>
                <span style={{ color: "#34D399" }}>$</span>{" "}
                <span style={{ color: "#6EE7B7" }}>{line.command}</span>
              </div>
              <div style={{ color: "#64748B", paddingLeft: "1rem" }}>
                <strong style={{ color: "#94A3B8" }}>{line.output}</strong>
                {isLast && (
                  <span
                    data-testid="cursor"
                    className="inline-block w-1.5 h-[14px] ml-1 align-middle animate-pulse"
                    style={{ background: "#10B981" }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- terminal-widget
```
Expected: `PASS` — 5 tests green

- [ ] **Step 5: Commit**

```bash
git add src/components/terminal-widget.tsx src/__tests__/terminal-widget.test.tsx
git commit -m "feat: add TerminalWidget component with tests"
```

---

## Task 4: CTASection component (TDD)

**Files:**
- Create: `src/components/cta-section.tsx`
- Create: `src/__tests__/cta-section.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/__tests__/cta-section.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { CTASection } from "@/components/cta-section";

describe("CTASection", () => {
  it("renders the heading", () => {
    render(<CTASection />);
    expect(
      screen.getByRole("heading", { name: /découvrir le rapport complet/i })
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<CTASection />);
    expect(screen.getByText(/EY Fabernovel/)).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    render(<CTASection />);
    expect(
      screen.getByRole("button", { name: /voir le rapport/i })
    ).toBeInTheDocument();
  });

  it("has a data-section attribute for GSAP targeting", () => {
    const { container } = render(<CTASection />);
    expect(container.querySelector("[data-section='cta']")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- cta-section
```
Expected: `FAIL`

- [ ] **Step 3: Implement CTASection**

Create `src/components/cta-section.tsx`:
```tsx
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
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- cta-section
```
Expected: `PASS` — 4 tests green

- [ ] **Step 5: Commit**

```bash
git add src/components/cta-section.tsx src/__tests__/cta-section.test.tsx
git commit -m "feat: add CTASection component with tests"
```

---

## Task 5: PresentationCard component (TDD)

**Files:**
- Create: `src/components/presentation-card.tsx`
- Create: `src/__tests__/presentation-card.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/__tests__/presentation-card.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { PresentationCard } from "@/components/presentation-card";

describe("PresentationCard", () => {
  it("renders the section heading", () => {
    render(<PresentationCard />);
    expect(
      screen.getByRole("heading", { name: /formation bac pro ciel/i })
    ).toBeInTheDocument();
  });

  it("renders the description mentioning EY Fabernovel", () => {
    render(<PresentationCard />);
    expect(screen.getByText(/EY Fabernovel/)).toBeInTheDocument();
  });

  it("renders the terminal widget with whoami command", () => {
    render(<PresentationCard />);
    expect(screen.getByText("whoami")).toBeInTheDocument();
  });

  it("has data-section attribute for GSAP targeting", () => {
    const { container } = render(<PresentationCard />);
    expect(
      container.querySelector("[data-section='card']")
    ).toBeInTheDocument();
  });

  it("renders card left and card right columns", () => {
    const { container } = render(<PresentationCard />);
    expect(container.querySelector("[data-col='left']")).toBeInTheDocument();
    expect(container.querySelector("[data-col='right']")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- presentation-card
```
Expected: `FAIL`

- [ ] **Step 3: Implement PresentationCard**

Create `src/components/presentation-card.tsx`:
```tsx
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
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- presentation-card
```
Expected: `PASS` — 5 tests green

- [ ] **Step 5: Commit**

```bash
git add src/components/presentation-card.tsx src/__tests__/presentation-card.test.tsx
git commit -m "feat: add PresentationCard with TerminalWidget"
```

---

## Task 6: HeroSection component (TDD — render only, animations tested separately)

**Files:**
- Create: `src/components/hero-section.tsx`
- Create: `src/__tests__/hero-section.test.tsx`

> Note: GSAP is mocked in tests — we test that the DOM is correct, not animation timing.

- [ ] **Step 1: Create GSAP mock**

Create `src/__mocks__/gsap.ts`:
```ts
const gsap = {
  registerPlugin: jest.fn(),
  set: jest.fn(),
  to: jest.fn(),
  fromTo: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    delay: jest.fn().mockReturnThis(),
  })),
  context: jest.fn((fn: () => void) => {
    fn();
    return { revert: jest.fn() };
  }),
  matchMedia: jest.fn(),
};

export const ScrollTrigger = { create: jest.fn(), refresh: jest.fn() };
export default gsap;
```

- [ ] **Step 2: Write failing tests**

Create `src/__tests__/hero-section.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/hero-section";

jest.mock("gsap", () => require("../__mocks__/gsap").default);
jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: require("../__mocks__/gsap").ScrollTrigger,
}));

describe("HeroSection", () => {
  it("renders the top badge", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Bac Pro CIEL/i)).toBeInTheDocument();
  });

  it("renders the company tagline", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Stage @ EY Fabernovel/)).toBeInTheDocument();
  });

  it("renders the name in green gradient", () => {
    render(<HeroSection />);
    expect(screen.getByText("Eden Tisba")).toBeInTheDocument();
  });

  it("renders all 4 tech badges", () => {
    render(<HeroSection />);
    expect(screen.getByText("HTML")).toBeInTheDocument();
    expect(screen.getByText("CSS")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Cybersécurité")).toBeInTheDocument();
  });

  it("renders the scroll indicator", () => {
    render(<HeroSection />);
    expect(screen.getByText(/scroll/i)).toBeInTheDocument();
  });

  it("has data-section attribute for GSAP targeting", () => {
    const { container } = render(<HeroSection />);
    expect(
      container.querySelector("[data-section='hero']")
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests to confirm they fail**

```bash
npm test -- hero-section
```
Expected: `FAIL`

- [ ] **Step 4: Implement HeroSection**

Create `src/components/hero-section.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TECH_BADGES = ["HTML", "CSS", "JavaScript", "Cybersécurité"];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagline1Ref = useRef<HTMLDivElement>(null);
  const tagline2Ref = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Intro: tagline 1 fades up from blur
      gsap.set(tagline1Ref.current, {
        autoAlpha: 0,
        y: 60,
        filter: "blur(20px)",
      });
      gsap.to(tagline1Ref.current, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.6,
        delay: 0.3,
        ease: "expo.out",
      });

      // Intro: tagline 2 sweeps in from right
      gsap.set(tagline2Ref.current, {
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.to(tagline2Ref.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4,
        delay: 1.0,
        ease: "power4.inOut",
      });

      // Intro: badges stagger up
      const badges = badgesRef.current?.querySelectorAll("[data-badge]");
      if (badges) {
        gsap.set(badges, { autoAlpha: 0, y: 20 });
        gsap.to(badges, {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          delay: 1.5,
          ease: "back.out(1.2)",
        });
      }

      // ScrollTrigger: hero content blurs out as user scrolls
      if (contentRef.current && sectionRef.current) {
        gsap.to(contentRef.current, {
          scale: 1.1,
          filter: "blur(20px)",
          opacity: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=600",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          background:
            "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/></svg>')",
        }}
      />

      {/* Hero content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center gap-5 px-6"
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[3px] uppercase font-mono"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.25)",
            color: "var(--accent-light)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
            }}
          />
          Bac Pro CIEL · Stage de fin d'école
        </div>

        {/* Taglines */}
        <div className="flex flex-col items-center gap-1">
          <div
            ref={tagline1Ref}
            className="text-[clamp(36px,7vw,80px)] font-black tracking-tight leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            Stage @ EY Fabernovel
          </div>
          <div
            ref={tagline2Ref}
            className="text-[clamp(36px,7vw,80px)] font-black tracking-tight leading-none"
            style={{
              background:
                "linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 50%, var(--accent-lighter) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(16,185,129,0.4))",
            }}
          >
            Eden Tisba
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-12 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="font-mono text-sm md:text-base"
            style={{ color: "var(--accent)" }}
          >
            Mission /{" "}
            <span style={{ color: "var(--accent-light)" }}>
              Apprendre HTML, CSS &amp; JavaScript
            </span>
          </span>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Formation Cybersécurité · Informatique · Électronique
          </span>
        </div>

        {/* Tech badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap justify-center gap-2 mt-1"
        >
          {TECH_BADGES.map((label) => (
            <span
              key={label}
              data-badge
              className="rounded-lg px-4 py-2 font-mono text-sm transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "var(--text-secondary)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce z-10"
        aria-hidden="true"
      >
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
        <span
          className="font-mono text-[9px] tracking-[3px] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
npm test -- hero-section
```
Expected: `PASS` — 6 tests green

- [ ] **Step 6: Commit**

```bash
git add src/components/hero-section.tsx src/__tests__/hero-section.test.tsx src/__mocks__/gsap.ts
git commit -m "feat: add HeroSection with GSAP intro and scroll animations"
```

---

## Task 7: Assemble page and add ScrollTrigger for card/CTA sections

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: Create the page**

Create `src/app/page.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/hero-section";
import { PresentationCard } from "@/components/presentation-card";
import { CTASection } from "@/components/cta-section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Card columns slide in
      const cardLeft = document.querySelector("[data-col='left']");
      const cardRight = document.querySelector("[data-col='right']");
      const cardSection = document.querySelector("[data-section='card']");

      if (cardLeft && cardRight && cardSection) {
        gsap.fromTo(
          cardLeft,
          { x: -50, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardSection,
              start: "top 75%",
            },
          }
        );
        gsap.fromTo(
          cardRight,
          { x: 50, scale: 0.9, autoAlpha: 0 },
          {
            x: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardSection,
              start: "top 75%",
            },
          }
        );
      }

      // CTA fades in
      const ctaSection = document.querySelector("[data-section='cta']");
      if (ctaSection) {
        gsap.fromTo(
          ctaSection,
          { scale: 0.95, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ctaSection,
              start: "top 80%",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-hidden">
      <HeroSection />
      <PresentationCard />
      <CTASection />
    </div>
  );
}
```

- [ ] **Step 2: Start dev server and verify visual result**

```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

Verify:
- Hero fills the screen with grid background and green glow
- `Stage @ EY Fabernovel` fades up on load
- `Eden Tisba` sweeps in from right in green gradient
- Tech badges appear with stagger
- Scrolling blurs the hero content out
- PresentationCard slides in from left/right
- Terminal widget shows all commands with blinking cursor
- CTA section fades in
- "Scroll" label at bottom of hero

- [ ] **Step 3: Run all tests**

```bash
npm test
```
Expected: all suites `PASS`

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: `✓ Compiled successfully` with no type errors

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble page with ScrollTrigger animations for card and CTA"
```

---

## Task 8: Responsive polish

**Files:**
- Modify: `src/components/hero-section.tsx`
- Modify: `src/components/presentation-card.tsx`

- [ ] **Step 1: Verify mobile layout (768px breakpoint)**

In the browser, open DevTools → toggle device toolbar → set width to 375px.

Check these are already correct (Tailwind responsive classes applied in Tasks 4–6):
- Hero taglines scale down via `clamp(36px, 7vw, 80px)` — no change needed
- Tech badges wrap (`flex-wrap`) — no change needed
- PresentationCard grid switches to single column via `grid-cols-1 md:grid-cols-2` — no change needed

- [ ] **Step 2: Check reduced-motion**

In DevTools → Rendering → Emulate CSS media feature → `prefers-reduced-motion: reduce`.

Verify: page loads with all content visible and no animations. The `gsap-controlled` class combined with the CSS rule in `globals.css` ensures this.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete landing hero page — responsive + reduced-motion"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered in task |
|---|---|
| Badge top with pulse dot | Task 6 (HeroSection) |
| Tagline 1 blur-up intro | Task 6 |
| Tagline 2 clip-path sweep | Task 6 |
| Tech badges stagger | Task 6 |
| Scroll indicator float | Task 6 (CSS animate-bounce) |
| Hero ScrollTrigger blur-out | Task 6 |
| PresentationCard 2-col layout | Task 5 |
| Terminal widget with typing style | Task 3 |
| Card columns slide in from sides | Task 7 |
| CTASection heading + button | Task 4 |
| CTA fade-in at scroll | Task 7 |
| Design tokens as CSS variables | Task 2 |
| Inter font | Task 2 |
| `prefers-reduced-motion` | Task 2 (CSS) + Tasks 6–7 (JS guard) |
| No external images | All tasks — 100% CSS/SVG |
| Mobile responsive | Task 8 |

All requirements covered. No gaps found.

**Placeholder scan:** No TBD, TODO, or vague steps. All code blocks are complete and self-contained.

**Type consistency:** `TerminalLine` exported from `terminal-widget.tsx` and imported in `presentation-card.tsx` (Task 5). `data-section` and `data-col` attributes consistent across Tasks 5, 6, 7. `data-badge` attribute used in Task 6 and targeted in same component — no cross-task mismatch.
