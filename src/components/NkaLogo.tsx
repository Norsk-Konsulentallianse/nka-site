import Link from "next/link";

function NkaLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-1 -1 50.6 69.6"
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      aria-hidden="true"
    >
      <path d="M27.1,59.5 C31.3,60.2 33.4,53.8 34.5,47.0 C35.5,41.2 35.6,35.0 35.6,32.7 C28.5,36.5 24.3,43.4 23.5,50.8 C23.2,54.0 23.9,59.0 27.1,59.5 M16.6,45.5 C18.7,37.8 23.9,30.3 30.8,26.5 C32.2,25.7 33.6,25.0 35.0,24.4 C34.6,20.3 33.1,9.2 27.9,9.1 C17.1,8.7 7.7,42.9 7.7,64.3 L0.0,64.3 C0.0,53.0 1.8,40.8 5.1,29.9 C8.9,17.5 16.6,0.0 29.6,1.4 C39.2,2.5 41.6,15.8 42.5,22.4 C44.5,22.2 46.5,22.1 48.6,22.1 L48.5,29.8 C46.6,29.8 44.9,29.9 43.3,30.2 C43.4,33.2 43.3,36.5 43.0,39.6 C42.7,44.5 41.9,67.6 27.1,67.2 C17.4,67.1 13.9,55.6 16.6,45.5 Z" />
    </svg>
  );
}

export function NkaLogo({
  size = "md",
  variant = "dark",
  layout = "horizontal",
  link = false,
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light";
  layout?: "horizontal" | "stacked";
  link?: boolean;
  className?: string;
}) {
  const iconSizes = {
    sm: "h-8 w-auto",
    md: "h-10 w-auto",
    lg: "h-14 w-auto",
    xl: "h-20 w-auto",
  };

  const textSizes = {
    sm: "text-sm leading-tight",
    md: "text-base leading-tight",
    lg: "text-xl leading-tight",
    xl: "text-3xl leading-tight",
  };

  const colors = {
    dark: "text-gray-900",
    light: "text-white",
  };

  const content = (
    <div
      className={`flex ${layout === "stacked" ? "flex-col items-center gap-3" : "items-center gap-2.5"} ${colors[variant]} ${className}`}
    >
      <NkaLogoIcon className={iconSizes[size]} />
      <div
        className={`font-semibold ${textSizes[size]}`}
        style={{ fontFamily: "var(--font-source-sans)" }}
      >
        <span className="font-normal">norsk</span>
        <br />
        konsulentallianse
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href="/" className="inline-flex no-underline hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}