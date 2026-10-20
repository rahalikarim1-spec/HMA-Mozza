/**
 * PLACEHOLDER LOGO - replace with the official Mozza file.
 * Red hexagon badge, "MOZZA" + "TRATTORIA ITALIANA" in yellow.
 * Colours come from the CSS variables in globals.css.
 */
export default function Logo({ className = "h-14 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 104"
      role="img"
      aria-label="Mozza Trattoria Italiana (placeholder logo)"
      className={className}
    >
      <polygon points="30,3 90,3 117,52 90,101 30,101 3,52" fill="var(--tomato)" />
      <polygon
        points="32,10 88,10 111,52 88,94 32,94 9,52"
        fill="none"
        stroke="var(--mustard)"
        strokeWidth="1.5"
      />
      <text
        x="60"
        y="57"
        textAnchor="middle"
        fill="var(--mustard)"
        fontSize="27"
        letterSpacing="1.5"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        MOZZA
      </text>
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fill="var(--mustard)"
        fontSize="6"
        letterSpacing="0.9"
        style={{ fontFamily: "var(--f-inter), system-ui, sans-serif", fontWeight: 600 }}
      >
        TRATTORIA ITALIANA
      </text>
    </svg>
  );
}
