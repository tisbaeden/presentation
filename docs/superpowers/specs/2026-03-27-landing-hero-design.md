# Landing Page Hero — Eden Tisba · Stage Bac Pro CIEL

**Date:** 2026-03-27
**Auteur:** Eden Tisba
**Audience cible:** Professeurs et jury d'évaluation
**Stack:** Next.js (shadcn) · Tailwind CSS · TypeScript · GSAP

---

## Contexte

Page web pour présenter le stage de fin d'école du Bac Pro CIEL (Cybersécurité, Informatique et Électronique) effectué chez **EY Fabernovel**. La page doit être visuellement impactante pour le jury d'évaluation, avec un style dark/vert néon cohérent avec le domaine cybersécurité/dev.

---

## Contenu

| Champ | Valeur |
|---|---|
| Nom | Eden Tisba |
| Entreprise | EY Fabernovel |
| Formation | Bac Pro CIEL |
| Mission principale | Apprendre HTML, CSS et JavaScript |
| Tech stack appris | HTML, CSS, JavaScript, Cybersécurité |

---

## Design System

| Token | Valeur |
|---|---|
| Background | `#060B14` |
| Surface card | `#0D1F1A → #080F16` (gradient) |
| Accent primaire | `#10B981` (vert émeraude) |
| Accent clair | `#34D399` |
| Texte principal | `white` |
| Texte secondaire | `#64748B` |
| Grid overlay | `rgba(16,185,129, 0.05)` |
| Font | Inter (sans-serif) + monospace pour les éléments terminal |

---

## Architecture de la page

### Section 1 — Hero (plein écran, `100vh`)

**Éléments de fond :**
- Grille CSS `48px × 48px` avec masque radial (disparaît vers les bords)
- Halo radial vert centré
- Film grain (opacité 0.03)

**Contenu centré :**
1. **Badge top** — pill `Bac Pro CIEL · Stage de fin d'école` avec dot vert animé (pulse)
2. **Tagline ligne 1** — `Stage @ EY Fabernovel` — blanc, 80px bold
3. **Tagline ligne 2** — `Eden Tisba` — gradient vert néon, 80px black, clip-text
4. **Séparateur** — ligne 48px dégradé vert
5. **Sous-titre** — `Mission / Apprendre HTML, CSS & JavaScript` (monospace vert) + `Formation Cybersécurité · Informatique · Électronique` (gris)
6. **Tech badges** — 4 pills : `HTML` `CSS` `JavaScript` `Cybersécurité`

**Animations :**
- Tagline 1 : `autoAlpha: 0, y: 60, blur(20px)` → reveal au chargement (GSAP, `expo.out`)
- Tagline 2 : clip-path `inset(0 100% 0 0)` → `inset(0 0% 0 0)` (sweep gauche→droite)
- Badges tech : `stagger: 0.1` depuis le bas
- Scroll indicator : float loop `translateY(0) ↔ translateY(6px)`

**Scroll trigger (GSAP ScrollTrigger) :**
- Hero content scale up + blur out → `scale(1.1), blur(20px), opacity(0)` en scrollant
- Transition vers la section carte

---

### Section 2 — Carte de présentation (apparaît au scroll)

**Layout :** grille 2 colonnes (`1fr 1fr`), card arrondie `28px`, fond sombre avec border vert subtil.

**Colonne gauche — Texte :**
- Titre : `La formation Bac Pro CIEL`
- Paragraphe : description du Bac Pro CIEL + lien avec le stage EY Fabernovel
- Mots-clés `HTML`, `CSS`, `JS`, `CIEL` en vert bold

**Colonne droite — Terminal :**
- Fenêtre terminal avec dots macOS (rouge/jaune/vert)
- Titre de barre : `terminal — eden@ey-fabernovel`
- Lignes de commande animées (effet frappe) :
  ```
  $ whoami         → Eden Tisba · Bac Pro CIEL
  $ stage --info   → EY Fabernovel
  $ skills --list  → HTML, CSS, JS
  $ status         → ✓ Stage validé ▌ (curseur clignotant)
  ```

**Animations d'entrée (ScrollTrigger) :**
- Colonne gauche : `x: -50, opacity: 0` → in
- Colonne droite : `x: 50, scale: 0.8, opacity: 0` → in
- Lignes terminal : stagger `0.15s` avec effet frappe JS natif

---

### Section 3 — CTA final

**Contenu :**
- Titre : `Découvrir le rapport complet`
- Sous-titre : `Retrouve l'ensemble de mon stage — missions, compétences acquises, et projets réalisés chez EY Fabernovel.`
- Bouton : `Voir le rapport de stage →` — fond vert sombre, glow shadow

**Animation :**
- Section fade-in au scroll avec `scale: 0.9 → 1`

---

## Composants à créer

| Composant | Fichier | Description |
|---|---|---|
| Page principale | `src/app/page.tsx` | Entrée Next.js, assemble les sections |
| Hero Section | `src/components/hero-section.tsx` | Section 1 complète avec GSAP |
| Presentation Card | `src/components/presentation-card.tsx` | Section 2 avec terminal |
| Terminal Widget | `src/components/terminal-widget.tsx` | Fenêtre terminal animée |
| CTA Section | `src/components/cta-section.tsx` | Section 3 |

---

## Dépendances externes

```bash
npm install gsap
```

---

## Structure de fichiers cible

```
src/
├── app/
│   ├── page.tsx          # Page principale
│   ├── layout.tsx        # Layout (fonts, metadata)
│   └── globals.css       # Variables CSS + reset
├── components/
│   ├── hero-section.tsx
│   ├── presentation-card.tsx
│   ├── terminal-widget.tsx
│   └── cta-section.tsx
└── lib/
    └── utils.ts          # cn() helper (shadcn)
```

---

## Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile (`< 768px`) | Taglines 40px, badges en colonne, card section passe en colonne unique |
| Tablet (`768–1024px`) | Taglines 60px, grid 2 col maintenu |
| Desktop (`> 1024px`) | Design plein écran tel que maquetté |

---

## Contraintes

- Pas de bibliothèques d'animation autres que GSAP
- Tout le texte doit être lisible sans animations (accessibilité)
- `prefers-reduced-motion` : désactiver les animations GSAP si activé
- Pas d'images externes — graphismes 100% CSS/SVG
