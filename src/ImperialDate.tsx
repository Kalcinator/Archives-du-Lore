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
 * Anime le texte cible en "scramblant" les caractères frame par frame,
 * révélant progressivement le texte final.
 *
 * @param lockedSuffix - Si fourni et que `target` se termine par cette valeur,
 *   seule la partie précédant le suffixe est scramblée ; le suffixe reste fixe.
 */
function scrambleText(
  target: string,
  spanRef: RefObject<HTMLSpanElement | null>,
  rafIdRef: MutableRefObject<number>,
  lockedSuffix?: string,
): void {
  cancelAnimationFrame(rafIdRef.current);

  // Fix B — 60 frames @ 60fps = exactement 1 seconde réelle
  const totalFrames = 144;
  let frame = 0;

  // Fix A — Séparation scramblePart / fixedPart
  const hasLock = lockedSuffix !== undefined && target.endsWith(lockedSuffix);
  const scramblePart = hasLock
    ? target.slice(0, target.length - lockedSuffix!.length)
    : target;
  const fixedPart = hasLock ? lockedSuffix! : "";

  // B3 — Tableau de stabilité : ~60% des glitch-chars restent stables d'une frame à l'autre
  const currentChars: string[] = Array.from(
    { length: scramblePart.length },
    () => CHARSET[Math.floor(Math.random() * CHARSET.length)],
  );

  function tick() {
    if (!spanRef.current) return;

    const progress = frame / totalFrames; // 0 → 1

    const scrambled = scramblePart
      .split("")
      .map((char, i) => {
        // B2 — Révélation avec jitter aléatoire : dé-synchronise les caractères
        const charRevealThreshold = i / scramblePart.length;
        if (progress > charRevealThreshold + Math.random() * 0.15) {
          return char; // révélé
        }
        // B3 — 40% de chance de changer le glitch-char, sinon conserver le précédent
        if (Math.random() > 0.4) {
          currentChars[i] = CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
        return currentChars[i];
      })
      .join("");

    // Fix A — Le suffixe est toujours rendu tel quel
    spanRef.current.textContent = scrambled + fixedPart;

    if (frame < totalFrames) {
      frame++;
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }

  rafIdRef.current = requestAnimationFrame(tick);
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export default function ImperialDate() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const rafIdRef = useRef<number>(0);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // 1. Affichage initial (immédiat, sans animation)
    if (spanRef.current) {
      spanRef.current.textContent = getImperialDate();
    }

    // Fix C — Boucle récursive de setTimeout à intervalle aléatoire [4200, 7800] ms
    function scheduleNext() {
      const delay = Math.random() * (7800 - 4200) + 4200;
      timeoutIdRef.current = setTimeout(() => {
        // Phase A : scramble → date impériale, suffixe .M{millennium} verrouillé
        const imperialDate = getImperialDate();
        const millennium = Math.floor(new Date().getFullYear() / 1000) + 1;
        scrambleText(imperialDate, spanRef, rafIdRef, `.M${millennium}`);

        // Phase B : après 2s, scramble → simple année grégorienne (flash d'ancrage)
        // Puis reprogram le cycle suivant ~1s plus tard (durée Phase B ≈ 60fps/60frames)
        timeoutIdRef.current = setTimeout(() => {
          scrambleText(String(new Date().getFullYear()), spanRef, rafIdRef);
          timeoutIdRef.current = setTimeout(scheduleNext, 1200);
        }, 2000);
      }, delay);
    }

    // 2. Délai d'amorçage : laisser Framer Motion terminer ses entrées (~2s)
    initTimeoutRef.current = setTimeout(() => {
      scheduleNext();
    }, 2000);

    // Cleanup
    return () => {
      if (initTimeoutRef.current) clearTimeout(initTimeoutRef.current);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return <span ref={spanRef} />;
}
