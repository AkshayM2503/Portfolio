import { useEffect, useState } from "react";

export function TypingText({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 40 : 90;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, sub.length + 1);
        setSub(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, sub.length - 1);
        setSub(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [sub, deleting, index, words]);

  return (
    <span className={className} aria-live="polite">
      <span className="text-gradient">{sub}</span>
      <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-primary align-middle" />
    </span>
  );
}
