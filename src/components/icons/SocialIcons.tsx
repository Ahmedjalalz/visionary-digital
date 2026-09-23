import React from "react";

export interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Editorial, handcrafted icons tailored for EFL's design system.
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
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M20.5 11.8A8.8 8.8 0 0 1 7.2 19.3L3.5 20.5l1.3-3.6A8.8 8.8 0 1 1 20.5 11.8z" />
      <path
        d="M9.5 8.8c-.3-.7-.6-.7-.9-.7h-.8a1.6 1.6 0 0 0-1.2.6 3.6 3.6 0 0 0-1.1 2.7c0 2 1.5 3.9 3.6 6 2.1 2.1 4 3.6 6 3.6a3.6 3.6 0 0 0 2.7-1.1 1.6 1.6 0 0 0 .6-1.2v-.8c0-.3 0-.6-.7-.9l-2-1c-.3-.2-.6-.2-.8.1l-.8 1c-.2.2-.4.2-.7.1a7.8 7.8 0 0 1-2.9-2.6c-.2-.3-.1-.5.1-.7l.8-.8c.2-.2.2-.5.1-.8l-1-2z"
        fill="currentColor"
        stroke="none"
      />
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
 * Standard collection of official EFL communication & social channels
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
