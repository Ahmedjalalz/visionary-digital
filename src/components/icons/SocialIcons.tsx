import React from "react";

export interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Editorial, handcrafted icons tailored for ELF's design system.
 * Designed with authentic brand silhouettes and balanced stroke/optical weights.
 */

export function EmailIcon({ className = "h-4 w-4", ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="3.5" />
      <path d="m3.5 6.5 7.8 6.2a1.2 1.2 0 0 0 1.4 0l7.8-6.2" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4", ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.955c-.001 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.594 5.945L.057 23.899l6.236-1.637a11.776 11.776 0 0 0 5.764 1.468h.005c6.554 0 11.889-5.335 11.893-11.893a11.82 11.82 0 0 0-3.535-8.418z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4", ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4", ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "h-4 w-4", ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M21.5 8c-.2-1.2-.9-2.1-2.1-2.4C17.5 5.2 12 5.2 12 5.2s-5.5 0-7.4.4C3.4 5.9 2.7 6.8 2.5 8A27.8 27.8 0 0 0 2.2 12c0 1.4.1 2.7.3 4 .2 1.2.9 2.1 2.1 2.4 1.9.4 7.4.4 7.4.4s5.5 0 7.4-.4c1.2-.3 1.9-1.2 2.1-2.4.2-1.3.3-2.6.3-4 0-1.3-.1-2.7-.3-4z" />
      <polygon points="10 8.8 15.5 12 10 15.2 10 8.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Standard collection of official ELF communication & social channels
 */
export const siteSocials = [
  {
    href: "mailto:info@educationandlifefoundation.org",
    label: "Email",
    title: "Email: info@educationandlifefoundation.org",
    Icon: EmailIcon,
  },
  {
    href: "https://wa.me/923009475513",
    label: "WhatsApp",
    title: "WhatsApp: +92 300 9475513",
    Icon: WhatsAppIcon,
  },
  {
    href: "https://instagram.com/educationandlifefoundation1",
    label: "Instagram",
    title: "Instagram @educationandlifefoundation1",
    Icon: InstagramIcon,
  },
  {
    href: "https://facebook.com/profile.php?id=61582388637046",
    label: "Facebook",
    title: "Facebook",
    Icon: FacebookIcon,
  },
  {
    href: "https://youtube.com/@EducationAndLifeFoundation",
    label: "YouTube",
    title: "YouTube @EducationAndLifeFoundation",
    Icon: YouTubeIcon,
  },
] as const;
