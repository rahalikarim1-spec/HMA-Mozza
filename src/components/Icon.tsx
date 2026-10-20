const paths: Record<string, string> = {
  calendar: "M7 2v3M17 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  whatsapp: "M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12zM9 8.5c0 3 3.5 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z",
  line: "M12 3C6.5 3 2.5 6.5 2.5 10.7c0 3.7 3.2 6.7 7.5 7.3.3.1.7.3.8.6l-.1 2.2c0 .5.4.7.8.4 1.5-.9 5.5-3.4 7.6-5.4 1.6-1.5 2.8-3.3 2.8-5.1C22 6.5 18 3 12 3z",
  pin: "M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  menu: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  download: "M12 4v11M7 11l5 5 5-5M5 20h14",
};

export default function Icon({
  name,
  className = "h-5 w-5",
  mirror = false,
  filled = false,
}: {
  name: keyof typeof paths;
  className?: string;
  /** flips the icon in RTL (arrows) */
  mirror?: boolean;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`${className} shrink-0 ${mirror ? "rtl:-scale-x-100" : ""}`}
    >
      <path d={paths[name]} />
    </svg>
  );
}
