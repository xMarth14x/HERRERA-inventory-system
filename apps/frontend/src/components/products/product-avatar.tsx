const TONE_CLASSES = [
  "bg-blue-50 text-blue-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-800",
  "bg-violet-50 text-violet-700",
  "bg-red-50 text-red-700",
];

function toneForName(name: string) {
  const index = name.charCodeAt(0) % TONE_CLASSES.length;
  return TONE_CLASSES[index];
}

function initialsForName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

// No real product photography exists yet — a lettermark placeholder keeps
// the "image" field visually represented without hotlinking a fake asset.
export function ProductAvatar({ name }: { name: string }) {
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${toneForName(name)}`}
      aria-hidden
    >
      {initialsForName(name)}
    </span>
  );
}
