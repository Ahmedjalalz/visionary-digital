import React from "react";

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
}

/**
 * High-performance image component:
 * - Automatically serves modern .webp variant with .jpg/.png fallback
 * - Enforces async decoding to prevent main thread frame drops
 * - Defaults to native lazy loading with high priority when above-the-fold
 */
export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  loading,
  decoding = "async",
  ...rest
}: OptimizedImageProps) {
  const isLocal = typeof src === "string" && src.startsWith("/") && !src.endsWith(".svg");
  const webpSrc = isLocal ? src.replace(/\.(jpe?g|png)$/i, ".webp") : null;

  const img = (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : loading ?? "lazy"}
      decoding={decoding}
      // @ts-expect-error React 19 / modern HTML fetchpriority
      fetchpriority={priority ? "high" : "auto"}
      className={className}
      {...rest}
    />
  );

  if (webpSrc && webpSrc !== src) {
    return (
      <picture className="contents">
        <source srcSet={webpSrc} type="image/webp" />
        {img}
      </picture>
    );
  }

  return img;
}
