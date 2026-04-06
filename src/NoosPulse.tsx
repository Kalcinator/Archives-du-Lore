import { useEffect, useRef } from "react";

// #region INTERFACES
interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  glyph: string;
  angle: number;
}
// #endregion

const GLYPHS = "01".split("");

/**
 * Réinitialise une particule existante (Object Pooling).
 * @param p La particule à réinitialiser
 * @param w Largeur du canvas
 * @param h Hauteur du canvas
 */
function resetParticle(p: Particle, w: number, h: number) {
  const angle = Math.random() * Math.PI * 2;
  const dist = Math.random() * 40;
  const cx = w / 2;
  const cy = h / 2;
  p.x = cx + Math.cos(angle) * dist;
  p.y = cy + Math.sin(angle) * dist;
  p.size = 4 + Math.random() * 2;
  p.speed = 0.4 + Math.random() * 0.4;
  p.opacity = 0.6 + Math.random() * 0.02;
  p.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  p.angle = angle;
}

/**
 * Crée une nouvelle particule au centre du canvas.
 * @param w Largeur du canvas
 * @param h Hauteur du canvas
 * @returns Une instance de Particle initialisée
 */
function createParticle(w: number, h: number): Particle {
  const p = {} as Particle;
  resetParticle(p, w, h);
  return p;
}

/**
 * Composant NoosPulse - Un effet visuel de "pouls" de particules binaires.
 * Conçu pour s'intégrer dans l'esthétique Grimdark du Nexus.
 */
// #region COMPOSANT
export default function NoosPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect de la préférence système reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let particles: Particle[] = [];
    const MAX = 2;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < MAX; i++) {
      particles.push(createParticle(canvas.width, canvas.height));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const maxDist = Math.max(canvas.width, canvas.height) * 0.55;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const currentDist = Math.hypot(p.x - cx, p.y - cy);
        const progress = currentDist / maxDist;

        // fade in puis fade out vers la périphérie
        const opacity =
          progress < 0.3
            ? p.opacity * (progress / 0.3)
            : p.opacity * (1 - (progress - 0.3) / 0.7);

        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = `rgba(184, 134, 11, ${Math.max(0, opacity * 0.5)})`;
        ctx.fillText(p.glyph, p.x, p.y);

        const newSize = p.size + p.speed * 0.15;
        const nx = cx + Math.cos(p.angle) * (currentDist + p.speed);
        const ny = cy + Math.sin(p.angle) * (currentDist + p.speed);

        if (progress >= 1) {
          resetParticle(p, canvas.width, canvas.height);
        } else {
          p.x = nx;
          p.y = ny;
          p.size = newSize;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
}
// #endregion
