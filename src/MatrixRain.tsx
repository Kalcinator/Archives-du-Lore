import { useEffect, useRef } from "react";

const GLYPHS = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθλξπσφψω01".split("");

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const FONT_SIZE = 14;
    let cols: number[] = [];
    let animId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor(canvas.width / FONT_SIZE);
      cols = Array.from({ length: count }, () =>
        Math.floor(Math.random() * canvas.height / FONT_SIZE)
      );
    };

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      cols.forEach((y, i) => {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * FONT_SIZE;

        // tête de colonne : plus lumineuse
        ctx.fillStyle = "rgba(220, 40, 40, 0.9)";
        ctx.fillText(glyph, x, y * FONT_SIZE);

        // corps de colonne : rouge sombre
        ctx.fillStyle = "rgba(120, 10, 10, 0.5)";
        const bodyGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillText(bodyGlyph, x, (y - 1) * FONT_SIZE);

        // reset aléatoire de la colonne
        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          cols[i] = 0;
        }
        cols[i]++;
      });
    };

    let lastTime = 0;
    const interval = 1000 / 15; // 15 FPS

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;

      if (deltaTime > interval) {
        lastTime = timestamp - (deltaTime % interval);
        draw();
      }
      animId = requestAnimationFrame(animate);
    };

    init();
    window.addEventListener("resize", init);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
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
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.18,
      }}
    />
  );
}
