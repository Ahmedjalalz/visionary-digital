/**
 * Assets are stored on Lovable's asset CDN and referenced by a relative path.
 * That relative path only resolves on Lovable hosting, so a locally cloned
 * checkout would render broken images. Resolving against the stable project
 * host makes the same images load everywhere: local dev, preview and published.
 */
const ASSET_HOST = "https://project--1d415e6f-be5d-43f6-b2f3-7ecc775cffd5.lovable.app";

export function assetUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url;
  return `${ASSET_HOST}${url.startsWith("/") ? "" : "/"}${url}`;
}
