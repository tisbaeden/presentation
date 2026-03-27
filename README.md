# Stage de Fin d'École — Eden Tisba

Landing page cinématique pour la présentation de mon stage de fin de Bac Pro CIEL chez **EY Fabernovel**.

## Aperçu

Page web à trois sections avec animations GSAP scroll-driven :

1. **Hero** — plein écran, fond grille dark, animations d'entrée et effet de fondu au scroll
2. **Présentation** — carte deux colonnes : description de la formation + terminal animé
3. **CTA** — conclusion avec bouton vers le rapport de stage

## Stack technique

| Technologie | Rôle |
|---|---|
| Next.js 14 (App Router) | Framework React |
| Tailwind CSS v4 | Styles utilitaires |
| TypeScript | Typage statique |
| GSAP + ScrollTrigger | Animations cinématiques |
| shadcn/ui | Composants UI de base |
| Jest + React Testing Library | Tests unitaires |

## Lancer le projet

```bash
# Installer les dépendances
npm install

# Démarrer en développement
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Démarrer le build de production
npm test         # Lancer les tests
npm run lint     # Vérifier le code
```

## Tests

20 tests unitaires répartis sur 4 composants :

```bash
npm test
```

| Suite | Tests |
|---|---|
| `terminal-widget` | 5 |
| `hero-section` | 6 |
| `presentation-card` | 5 |
| `cta-section` | 4 |

## Structure du projet

```
src/
├── app/
│   ├── page.tsx          # Page principale (assemblage + animations scroll)
│   ├── layout.tsx        # Layout, police Inter, métadonnées
│   └── globals.css       # Design tokens CSS, Tailwind
├── components/
│   ├── hero-section.tsx       # Section hero plein écran
│   ├── presentation-card.tsx  # Carte de présentation 2 colonnes
│   ├── terminal-widget.tsx    # Fenêtre terminal animée
│   └── cta-section.tsx        # Section conclusion
└── lib/
    └── utils.ts          # Utilitaire cn() (shadcn)
```

## Accessibilité

- `prefers-reduced-motion` : toutes les animations GSAP sont désactivées si l'utilisateur a activé la réduction de mouvement
- Éléments décoratifs marqués `aria-hidden="true"`
- Contraste des textes respecté sur fond sombre

## Formation

**Bac Pro CIEL** — Cybersécurité, Informatique et Électronique

Langages appris durant ce stage :
- **HTML** — Structure des pages web
- **CSS** — Mise en forme et style
- **JavaScript** — Interactivité et animations
