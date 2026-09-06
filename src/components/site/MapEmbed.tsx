interface MapEmbedProps {
  query: string;
  title: string;
  className?: string;
  zoom?: number;
}

/**
 * Keyless Google Maps embed. Swap `src` for the Maps Embed API
 * (with an API key) if richer control is needed later.
 */
export function MapEmbed({ query, title, className, zoom = 14 }: MapEmbedProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  return (
    <iframe
      title={title}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`h-full w-full border-0 saturate-[0.75] contrast-[1.02] ${className ?? ""}`}
    />
  );
}
