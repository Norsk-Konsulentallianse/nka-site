import { cn } from "@/lib/utils";

type SectionTheme = "white" | "bright-inverse" | "light" | "dark";

interface SectionProps {
  id?: string;
  theme?: SectionTheme;
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;
}

const themeClasses: Record<SectionTheme, string> = {
  white: "bg-white text-gray-900",
  "bright-inverse": "bg-[#f7f6f5] text-gray-900",
  light: "bg-[#f0f0f0] text-gray-600",
  dark: "bg-gray-900 text-white",
};

export function Section({
  id,
  theme = "white",
  children,
  className,
  fullBleed,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-12 sm:py-16", themeClasses[theme], className)}
    >
      {fullBleed ? (
        children
      ) : (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
      )}
    </section>
  );
}
