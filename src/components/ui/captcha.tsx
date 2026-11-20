import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  RotateCw,
  ShieldCheck,
  Volume2,
} from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
    grecaptcha?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark";
        },
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

export interface CaptchaRef {
  reset: () => void;
  validate: () => boolean;
  focus: () => void;
  isVerified: boolean;
}

interface CaptchaVerificationProps {
  onVerify?: (isVerified: boolean) => void;
  className?: string;
  errorMessage?: string;
  label?: string;
}

// Characters that are easy to distinguish (avoid 0, O, 1, I, l)
const CAPTCHA_CHARS = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function generateRandomCode(length = 6): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CAPTCHA_CHARS.charAt(Math.floor(Math.random() * CAPTCHA_CHARS.length));
  }
  return code;
}

export const CaptchaVerification = forwardRef<CaptchaRef, CaptchaVerificationProps>(
  ({ onVerify, className = "", errorMessage, label }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const externalContainerRef = useRef<HTMLDivElement | null>(null);

    const [secretCode, setSecretCode] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

    // Optional third-party provider keys from environment
    const turnstileSiteKey =
      typeof import.meta !== "undefined" && import.meta.env
        ? (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined)
        : undefined;

    const recaptchaSiteKey =
      typeof import.meta !== "undefined" && import.meta.env
        ? (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined)
        : undefined;

    const hasExternalProvider = Boolean(turnstileSiteKey || recaptchaSiteKey);

    // Canvas drawing function
    const renderCaptchaCanvas = useCallback((code: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const width = 180;
      const height = 48;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#f9f6f0");
      bgGrad.addColorStop(0.5, "#f1ece1");
      bgGrad.addColorStop(1, "#fcfbf7");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Noise dots
      for (let i = 0; i < 45; i++) {
        ctx.fillStyle = `rgba(${Math.floor(Math.random() * 150 + 20)}, ${Math.floor(
          Math.random() * 150 + 20,
        )}, ${Math.floor(Math.random() * 150 + 50)}, 0.3)`;
        ctx.beginPath();
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 1.5 + 0.5,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      // Distortion curved lines
      const lineColors = [
        "rgba(20, 48, 85, 0.25)",
        "rgba(140, 60, 40, 0.25)",
        "rgba(80, 100, 120, 0.25)",
      ];
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = lineColors[i % lineColors.length];
        ctx.lineWidth = Math.random() * 1.2 + 0.8;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 20, Math.random() * height);
        ctx.bezierCurveTo(
          width * 0.3,
          Math.random() * height,
          width * 0.7,
          Math.random() * height,
          width - Math.random() * 20,
          Math.random() * height,
        );
        ctx.stroke();
      }

      // Render characters
      const charWidth = (width - 24) / code.length;
      const fontFamilies = ["monospace", "sans-serif", "Courier New", "Georgia"];

      for (let i = 0; i < code.length; i++) {
        const char = code[i];
        ctx.save();

        const x = 16 + i * charWidth + (Math.random() * 4 - 2);
        const y = height / 2 + (Math.random() * 6 - 3);

        ctx.translate(x, y);

        const angle = ((Math.random() * 44 - 22) * Math.PI) / 180;
        ctx.rotate(angle);

        const fontSize = Math.floor(Math.random() * 6 + 22);
        const fontFam = fontFamilies[i % fontFamilies.length];
        ctx.font = `bold ${fontSize}px ${fontFam}`;

        const colors = [
          "#143055", // Ink Navy
          "#08121f", // Deep ink
          "#1e3a5f", // Mid navy
          "#8a3b29", // Clay warm
          "#1d436c", // Slate navy
        ];
        ctx.fillStyle = colors[i % colors.length];
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillText(char, 0, 0);
        ctx.restore();
      }
    }, []);

    const resetCaptcha = useCallback(() => {
      setIsRefreshing(true);
      const newCode = generateRandomCode(6);
      setSecretCode(newCode);
      setUserInput("");
      setIsVerified(false);
      setHasError(false);
      if (onVerify) onVerify(false);

      setTimeout(() => {
        renderCaptchaCanvas(newCode);
        setIsRefreshing(false);
      }, 100);
    }, [onVerify, renderCaptchaCanvas]);

    // Initial challenge setup
    useEffect(() => {
      if (hasExternalProvider) return;

      const code = generateRandomCode(6);
      setSecretCode(code);
      renderCaptchaCanvas(code);
    }, [hasExternalProvider, renderCaptchaCanvas]);

    // Optional Cloudflare Turnstile / Google reCAPTCHA loader
    useEffect(() => {
      if (!hasExternalProvider || typeof window === "undefined") return;

      if (turnstileSiteKey) {
        const scriptId = "cf-turnstile-script";
        if (!document.getElementById(scriptId)) {
          const script = document.createElement("script");
          script.id = scriptId;
          script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }

        const interval = setInterval(() => {
          if (window.turnstile && externalContainerRef.current) {
            clearInterval(interval);
            try {
              window.turnstile.render(externalContainerRef.current, {
                sitekey: turnstileSiteKey,
                callback: () => {
                  setIsVerified(true);
                  setHasError(false);
                  if (onVerify) onVerify(true);
                },
                "error-callback": () => {
                  setIsVerified(false);
                  setHasError(true);
                  if (onVerify) onVerify(false);
                },
                "expired-callback": () => {
                  setIsVerified(false);
                  if (onVerify) onVerify(false);
                },
              });
            } catch (err) {
              console.warn("Turnstile render note:", err);
            }
          }
        }, 150);

        return () => clearInterval(interval);
      }

      if (recaptchaSiteKey) {
        const scriptId = "google-recaptcha-script";
        if (!document.getElementById(scriptId)) {
          const script = document.createElement("script");
          script.id = scriptId;
          script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }

        const interval = setInterval(() => {
          if (window.grecaptcha && externalContainerRef.current) {
            clearInterval(interval);
            try {
              window.grecaptcha.render(externalContainerRef.current, {
                sitekey: recaptchaSiteKey,
                callback: () => {
                  setIsVerified(true);
                  setHasError(false);
                  if (onVerify) onVerify(true);
                },
                "error-callback": () => {
                  setIsVerified(false);
                  setHasError(true);
                  if (onVerify) onVerify(false);
                },
                "expired-callback": () => {
                  setIsVerified(false);
                  if (onVerify) onVerify(false);
                },
              });
            } catch (err) {
              console.warn("reCAPTCHA render note:", err);
            }
          }
        }, 150);

        return () => clearInterval(interval);
      }
    }, [hasExternalProvider, turnstileSiteKey, recaptchaSiteKey, onVerify]);

    // Handle user typing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 6);
      setUserInput(val);

      if (val.length === 6) {
        if (val === secretCode) {
          setIsVerified(true);
          setHasError(false);
          if (onVerify) onVerify(true);
        } else {
          setIsVerified(false);
          setHasError(true);
          if (onVerify) onVerify(false);
        }
      } else {
        setIsVerified(false);
        setHasError(false);
        if (onVerify) onVerify(false);
      }
    };

    // Speech audio playback for accessibility
    const playAudioChallenge = () => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (!secretCode) return;

      setIsSpeaking(true);
      window.speechSynthesis.cancel();

      const spoken = `Security code is: ${secretCode.split("").join(", ")}`;
      const utterance = new SpeechSynthesisUtterance(spoken);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    };

    // Imperative handle for parent forms
    useImperativeHandle(ref, () => ({
      reset: resetCaptcha,
      validate: () => {
        if (hasExternalProvider) {
          return isVerified;
        }
        const valid = userInput === secretCode && secretCode.length === 6;
        if (!valid) {
          setHasError(true);
          inputRef.current?.focus();
        }
        return valid;
      },
      focus: () => {
        inputRef.current?.focus();
      },
      isVerified,
    }));

    return (
      <div
        className={`rounded-2xl border transition-all ${
          isVerified
            ? "border-emerald-500/50 bg-emerald-50/40 ring-1 ring-emerald-500/20"
            : hasError
              ? "border-destructive/60 bg-destructive/5 ring-1 ring-destructive/20"
              : "border-ink/15 bg-sand/30 hover:border-ink/25"
        } p-4 sm:p-5 ${className}`}
        role="region"
        aria-label="Security CAPTCHA verification"
      >
        {/* Header & Compliance notice */}
        <div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck
              className={`h-4 w-4 ${isVerified ? "text-emerald-600" : "text-clay"}`}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-ink">
              {label || "Security Verification (CAPTCHA)"}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-ink/65">
            <Lock className="h-2.5 w-2.5 text-clay" />
            Payment Gateway Protected
          </span>
        </div>

        {hasExternalProvider ? (
          <div className="mt-4 flex flex-col items-center justify-center min-h-[70px]">
            <div ref={externalContainerRef} />
            {hasError && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errorMessage || "Security verification failed. Please try again."}
              </p>
            )}
          </div>
        ) : (
          <>
            <p className="mt-2 text-xs text-ink/65">
              Enter the 6 characters shown below.
            </p>

            {/* Challenge Box & Controls */}
            <div className="mt-3.5 flex flex-wrap items-center gap-3">
              <div className="relative overflow-hidden rounded-xl border border-ink/20 bg-background shadow-inner">
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label="CAPTCHA image security challenge"
                  className="block cursor-pointer select-none"
                  onClick={resetCaptcha}
                  title="Click to generate new code"
                />
                {isRefreshing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-xs">
                    <RotateCw className="h-5 w-5 animate-spin text-clay" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={resetCaptcha}
                  title="Refresh security code"
                  aria-label="Refresh security code"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/15 bg-background text-ink/75 transition-all hover:border-clay hover:bg-sand/60 hover:text-clay cursor-pointer shadow-2xs active:scale-95"
                >
                  <RotateCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                </button>

                <button
                  type="button"
                  onClick={playAudioChallenge}
                  title="Listen to audio security code"
                  aria-label="Listen to audio security code"
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-ink/15 bg-background text-ink/75 transition-all hover:border-clay hover:bg-sand/60 hover:text-clay cursor-pointer shadow-2xs active:scale-95 ${
                    isSpeaking ? "text-clay ring-1 ring-clay/40" : ""
                  }`}
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Input & Live feedback */}
            <div className="mt-3.5">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="characters"
                  spellCheck="false"
                  maxLength={6}
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Enter 6 characters"
                  aria-label="Enter security code"
                  aria-invalid={hasError}
                  className={`w-full rounded-xl border px-3.5 py-2.5 font-mono text-base font-bold tracking-widest uppercase transition-colors placeholder:font-sans placeholder:text-xs placeholder:font-normal placeholder:tracking-normal placeholder:text-ink/35 focus:outline-none ${
                    isVerified
                      ? "border-emerald-500 bg-emerald-50/30 text-emerald-950 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500"
                      : hasError
                        ? "border-destructive bg-destructive/5 text-destructive focus:border-destructive focus:ring-1 focus:ring-destructive"
                        : "border-ink/20 bg-background text-ink focus:border-clay focus:ring-1 focus:ring-clay"
                  }`}
                />
                {isVerified && (
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Validation Feedback Messages */}
              {isVerified ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  Verified: Human authentication confirmed.
                </p>
              ) : hasError ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errorMessage || "Incorrect security code. Please check characters and try again."}
                </p>
              ) : (
                <p className="mt-1.5 text-[0.68rem] text-ink/50">
                  Letters and numbers are not case-sensitive. Click refresh if hard to read.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    );
  },
);

CaptchaVerification.displayName = "CaptchaVerification";
