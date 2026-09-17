import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Lines of a headline rising from behind a mask. */
export function MaskLines({
  lines,
  className,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <span ref={ref} className={`inline-block w-full ${className ?? ""}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pt-[0.08em] pb-[0.18em] -my-[0.08em] leading-[1.18]">
          <motion.span
            className="block"
            initial={reduce ? { y: 0 } : { y: "105%" }}
            animate={reduce || inView ? { y: 0 } : { y: "105%" }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Restrained entrance — used sparingly, never on everything. */
export function Rise({
  children,
  className,
  delay = 0,
  distance = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Image that scales down as it enters — cinematic settle. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 60,
  scaleFrom = 1.12,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
  scaleFrom?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bleed = Math.max(Math.abs(strength), 30);
  const y = useTransform(scrollYProgress, [0, 1], [-bleed, bleed]);
  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, 1.02]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={
          reduce
            ? { height: "100%", width: "100%" }
            : {
                y,
                scale,
                top: `-${bleed}px`,
                height: `calc(100% + ${bleed * 2}px)`,
              }
        }
        className={`absolute inset-x-0 w-full object-cover will-change-transform ${imgClassName ?? ""}`}
      />
    </div>
  );
}

/** Counts up once, when scrolled into view. */
export function Counter({
  to,
  duration = 1800,
  className,
  decimals = 0,
  format,
}: {
  to: number;
  duration?: number;
  className?: string;
  decimals?: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  const defaultFormat = (n: number) => {
    if (decimals > 0) {
      return n.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return Math.round(n).toLocaleString();
  };

  const formatter = format ?? defaultFormat;

  return (
    <span ref={ref} className={className}>
      {formatter(inView ? value : 0)}
    </span>
  );
}

/** Thin progress bar for long editorial pages. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-clay"
    />
  );
}

export { motion, EASE };
