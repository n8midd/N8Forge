import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
  size?: "nav" | "hero" | "footer";
};

const sizes = {
  nav: {
    width: 56,
    height: 56,
    imgClass: "h-12 w-12 md:h-14 md:w-14",
    wrapClass: "rounded-sm bg-white p-0.5 shadow-sm",
  },
  hero: {
    width: 480,
    height: 480,
    imgClass: "h-auto w-full",
    wrapClass:
      "w-[min(100%,18rem)] bg-white p-3 sm:w-[min(100%,22rem)] sm:p-4 md:w-[min(100%,26rem)]",
  },
  footer: {
    width: 96,
    height: 96,
    imgClass: "h-20 w-20",
    wrapClass: "rounded-sm bg-white p-1",
  },
} as const;

export function Logo({ className = "", priority = false, size = "nav" }: LogoProps) {
  const preset = sizes[size];

  return (
    <span className={`inline-flex ${preset.wrapClass} ${className}`.trim()}>
      <Image
        src="/logo.png"
        alt="N8Forge — Build. Launch. Grow."
        width={preset.width}
        height={preset.height}
        priority={priority}
        className={`${preset.imgClass} object-contain`}
      />
    </span>
  );
}
