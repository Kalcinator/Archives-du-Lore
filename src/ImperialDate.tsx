/**
 * ImperialDate.tsx
 * Affiche la date impériale (Format de l'Administratum) avec un effet de glitch périodique.
 * Architecture : zéro useState — mutation DOM directe via spanRef.
 */

import {
  useEffect,
  useRef,
  type RefObject,
  type MutableRefObject,
} from "react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Calcule la date impériale à l'instant T. */
function getImperialDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const millennium = Math.floor(year / 1000) + 1;

  // Jours écoulés depuis le 1er janvier (1-indexed)
  const startOfYear = new Date(year, 0, 1);
  const diffMs = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  const currentHour = now.getHours() + now.getMinutes() / 60;
  const totalHours = (dayOfYear - 1) * 24 + currentHour;
  const yearFraction = Math.floor(totalHours * 0.11407955)
    .toString()
    .padStart(3, "0");

  const yearSuffix = String(year).slice(-3); // "026"

  return `0.${yearFraction}.${yearSuffix}.M${millennium}`;
}

// ---------------------------------------------------------------------------
// Glitch engine
// ---------------------------------------------------------------------------

const CHARSET = "0123456789.MΩ†#";

/**
 * Anime le texte cible en "scramblant" les caractères sur une durée fixe (ms),
 * révélant progressivement le texte final. Version Time-Based SOTA.
 */
/**
 * Anime le texte cible en "scramblant" les caractères sur une durée fixe (ms),
 * révélant progressivement le texte final. Version Promise-Based.
 */
function scrambleText(
  target: string,
  spanRef: RefObject<HTMLSpanElement | null>,
  rafIdRef: MutableRefObject<number>,
  durationMs: number,
  mode: "collapse" | "expand",
): Promise<void> {
  return new Promise((resolve) => {
    cancelAnimationFrame(rafIdRef.current);

    if (!spanRef.current) {
      resolve();
      return;
    }

    // 2. Accessibilité (A11y)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      spanRef.current.textContent = target;
      resolve();
      return;
    }

    let startTime: number | null = null;

    const currentChars: string[] = Array.from(
      { length: target.length },
      () => CHARSET[Math.floor(Math.random() * CHARSET.length)],
    );

    function tick(timestamp: number) {
      if (!spanRef.current) {
        resolve();
        return;
      }

      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      const scrambled = target
        .split("")
        .map((char, i) => {
          if (progress === 1) return char;

          // Formule d'érosion bidirectionnelle (Collapse/Expand)
          const centerIndex = (target.length - 1) / 2;
          const distanceToCenter = Math.abs(i - centerIndex);
          const normalizedDistance = centerIndex === 0 ? 0 : distanceToCenter / centerIndex;
          const baseThreshold = mode === "collapse" ? 1 - normalizedDistance : normalizedDistance;
          const charRevealThreshold = baseThreshold * 0.8;

          // GESTION DE LA VISIBILITÉ (Fix Expand) : Propagation d'onde
          // En mode 'expand', l'onde "pousse" vers l'extérieur. Si le front n'est pas là, on reste invisible.
          if (mode === "expand" && progress < charRevealThreshold - 0.1) {
            return "\u2007";
          }

          if (progress > charRevealThreshold + Math.random() * 0.2) {
            return char;
          }
          if (Math.random() > 0.4) {
            currentChars[i] = CHARSET[Math.floor(Math.random() * CHARSET.length)];
          }
          return currentChars[i];
        })
        .join("");

      spanRef.current.textContent = scrambled;

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        resolve();
      }
    }

    rafIdRef.current = requestAnimationFrame(tick);
  });
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export default function ImperialDate() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    let isActive = true;
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    async function runSequence() {
      // Attente initiale pour laisser les animations d'entrée se stabiliser
      await delay(2000);

      while (isActive) {
        // Étape 1 : Repos sur la Date Impériale
        await delay(Math.random() * (7800 - 4200) + 4200);
        if (!isActive) break;

        // Étape 2 : Préparation de l'année Grégorienne avec Figure Space (Padding stable)
        const year = new Date().getFullYear();
        const paddedGregorian = `\u2007\u2007\u2007\u2007${year}\u2007\u2007\u2007\u2007`;

        // Étape 3 : Scramble vers l'Ancien Calendrier (Érosion vers le centre)
        await scrambleText(paddedGregorian, spanRef, rafIdRef, 2000, "collapse");
        if (!isActive) break;

        // Étape 4 : Suspension sur l'année Grégorienne
        await delay(Math.random() * (7800 - 4200) + 4200);
        if (!isActive) break;

        // Étape 5 : Scramble Retour vers l'Ère Impériale (Expansion depuis le centre)
        const imperialDate = getImperialDate();
        await scrambleText(imperialDate, spanRef, rafIdRef, 2000, "expand");
      }
    }

    runSequence();

    // Cleanup
    return () => {
      isActive = false;
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <span
      ref={spanRef}
      style={{
        display: "inline-flex",
        width: "13rem", // Empreinte immuable (Bunker Style)
        height: "1.5rem",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        contain: "strict", // ISOLATION TOTALE (Size + Layout + Paint)
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {getImperialDate()}
    </span>
  );
}
