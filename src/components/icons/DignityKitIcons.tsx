import React from "react";

export interface KitIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/**
 * 1. Sanitary Pad with Wings (Menstrual Hygiene Pad)
 * Authentic winged menstrual pad silhouette with central absorbency core and micro-channels.
 */
export function SanitaryPadIcon({ className = "h-6 w-6", size, ...props }: KitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {/* Main contoured body */}
      <path d="M9 5c0-1.66 1.34-3 3-3s3 1.34 3 3v14c0 1.66-1.34 3-3 3s-3-1.34-3-3V5z" />
      {/* Left wing */}
      <path d="M9 10C6.2 9.8 4.5 10.8 4.5 12s1.7 2.2 4.5 2" />
      {/* Right wing */}
      <path d="M15 10c2.8-.2 4.5.8 4.5 2s-1.7 2.2-4.5 2" />
      {/* Inner absorbent channel */}
      <path d="M12 7.5v9" strokeDasharray="2 1.5" />
      <path d="M10.8 10c.8-.6 1.6-.6 2.4 0" />
      <path d="M10.8 14c.8.6 1.6.6 2.4 0" />
    </svg>
  );
}

/**
 * 2. Disposable Bag Pack
 * Leak-proof sanitary disposal pouch with secure fold-over flap and hygiene seal.
 */
export function DisposalBagIcon({ className = "h-6 w-6", size, ...props }: KitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      <rect x="4.5" y="6" width="15" height="15" rx="3" />
      {/* Seal flap */}
      <path d="M4.5 8.5L11.2 13a1.5 1.5 0 0 0 1.6 0l6.7-4.5" />
      {/* Discrete tie / seal symbol */}
      <circle cx="12" cy="16" r="2" />
      <path d="M8 3.5h8" />
      <path d="M12 3.5v2.5" />
    </svg>
  );
}

/**
 * 3. Bath Soap Bar
 * Rounded gentle bath cleansing bar with lather bubbles.
 */
export function BathSoapIcon({ className = "h-6 w-6", size, ...props }: KitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {/* Soap bar */}
      <rect x="3" y="10" width="15" height="11" rx="4" />
      {/* Embossed smooth curve on bar */}
      <path d="M6.5 15.5c2-1.2 4.5-1.2 6.5 0s3 .8 3.5.2" />
      {/* Floating soap bubbles */}
      <circle cx="18.5" cy="5.5" r="2.5" />
      <circle cx="13" cy="4" r="1.5" />
      <circle cx="8" cy="6" r="1" />
    </svg>
  );
}

/**
 * 4. Laundry Soap Bar
 * Solid rectangular laundry soap block for fabrics and clothes.
 */
export function LaundrySoapIcon({ className = "h-6 w-6", size, ...props }: KitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {/* 3D solid soap block */}
      <path d="M4 8l11-4 5 3-11 4z" />
      <path d="M4 8v8l11 4V11" />
      <path d="M20 7v8l-5 4" />
      {/* Fabric washing ripple marks */}
      <path d="M7 13.5l4-1.4" />
      <path d="M7 16l4-1.4" />
    </svg>
  );
}

/**
 * 5. Small Hand Sanitiser Bottle (50 ml)
 * Pocket sanitiser bottle with pump nozzle, liquid level, and sterile cross.
 */
export function HandSanitiserIcon({ className = "h-6 w-6", size, ...props }: KitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {/* Pump cap & nozzle */}
      <path d="M12 2v4" />
      <path d="M9.5 2h5" />
      <path d="M14.5 3.5h2a1 1 0 0 1 1 1v1.5" />
      <rect x="10" y="6" width="4" height="2" rx="0.5" />
      {/* Bottle silhouette */}
      <rect x="6" y="8" width="12" height="13" rx="3" />
      {/* Clean antiseptic cross / drop */}
      <path d="M12 12v5" />
      <path d="M9.5 14.5h5" />
    </svg>
  );
}

/**
 * 6. Face / Hand Tissues & Wet Wipes
 * Wipe package with oval dispenser flap and emerging folded sheet.
 */
export function WetWipesIcon({ className = "h-6 w-6", size, ...props }: KitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {/* Wipe pouch body */}
      <rect x="3" y="9" width="18" height="12" rx="3" />
      {/* Resealable oval flap */}
      <ellipse cx="12" cy="15" rx="5" ry="2.5" />
      {/* Emerging wipe sheet */}
      <path d="M9.5 14C8.2 11 9 7 12 5c2.5 1.5 3.2 4.5 2.5 9" />
      <path d="M10 7.5h4" />
    </svg>
  );
}

/**
 * 7. Reusable Zip Pouch / Cloth Bag
 * Discreet toiletry zipper clutch with zip track, metal pull slider and wrist strap.
 */
export function ZipPouchIcon({ className = "h-6 w-6", size, ...props }: KitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {/* Pouch container */}
      <rect x="3" y="6" width="18" height="14" rx="3" />
      {/* Zipper track */}
      <path d="M3 10h18" strokeDasharray="1.5 1.5" />
      {/* Metal slider and pull tag */}
      <rect x="6.5" y="8.5" width="2.5" height="3.5" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <path d="M7.75 12v3" />
      {/* Carry strap */}
      <path d="M21 8c1.5 0 2.5 1 2.5 2.5v3c0 1.5-1 2.5-2.5 2.5" />
    </svg>
  );
}

/**
 * 8. Menstrual Hygiene Information Leaflet (Urdu / Local Language)
 * Illustrated guidebook with health emblem and anatomical/hygiene educational pages.
 */
export function HygieneLeafletIcon({ className = "h-6 w-6", size, ...props }: KitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {/* Book cover & pages */}
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v16H6.5a2.5 2.5 0 0 0-2.5 2.5z" />
      <path d="M6 22h14a2 2 0 0 0 2-2V4" />
      {/* Heart / flower emblem on booklet */}
      <path d="M12 6.5c-.8-.8-2-.4-2 .8 0 1.2 2 2.7 2 2.7s2-1.5 2-2.7c0-1.2-1.2-1.6-2-.8z" />
      {/* Script text lines */}
      <path d="M9.5 13h5" />
      <path d="M9.5 16h3.5" />
    </svg>
  );
}

/**
 * 9. Custom Packaging Box with Visibility Sticker
 * Heavy-duty branded storage box with lid and Good Neighbors verification badge.
 */
export function PackagingBoxIcon({ className = "h-6 w-6", size, ...props }: KitIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {/* 3D Box perspective */}
      <path d="M12 3l9 4.5v9.5l-9 4.5-9-4.5V7.5L12 3z" />
      <path d="M12 12l9-4.5" />
      <path d="M12 12v9.5" />
      <path d="M12 12L3 7.5" />
      {/* Verification sticker circle on front facet */}
      <circle cx="7.5" cy="15.5" r="2.2" strokeDasharray="1.5 1" />
      <path d="M6.5 15.5l.7.7 1.5-1.5" />
    </svg>
  );
}
