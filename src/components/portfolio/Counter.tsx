import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function Counter({
  to,
  duration = 1800,
  suffix = "",
  prefix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const precision = Number.isInteger(to) ? 1 : 100;
      setValue(Math.round(eased * to * precision));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {Number.isInteger(to) ? value : (value / 100).toFixed(2)}
      {suffix}
    </span>
  );
}
