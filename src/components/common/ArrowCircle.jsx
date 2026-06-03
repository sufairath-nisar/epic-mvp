import { ArrowRight } from "lucide-react";

const directionClasses = {
  right: "rotate-0",
  down: "rotate-90",
  left: "rotate-180",
  up: "-rotate-90"
};

const toneClasses = {
  pink: "bg-[#FAD7D3] text-[#154527]",
  pinkWhite: "bg-[#FAD7D3] text-[#FFFCF2]",
  yellow: "bg-[#FCEFA7] text-[#FFFCF2]",
  yellowWhite: "bg-[#FCEFA7] text-[#FFFFFF]"
};

const sizeClasses = {
  sm: "h-[22px] w-[22px] [&_svg]:h-3 [&_svg]:w-3",
  md: "h-6 w-6 [&_svg]:h-4 [&_svg]:w-4",
  checkout: "h-[34px] w-[34px] [&_svg]:h-[16px] [&_svg]:w-[16px]",
  lg: "h-[45px] w-[45px] [&_svg]:h-7 [&_svg]:w-7",
  story: "h-[15px] w-[15px] [&_svg]:h-[5.57px] [&_svg]:w-[7.45px] md:h-[37.5px] md:w-[37.5px] md:[&_svg]:h-[23px] md:[&_svg]:w-[23px]",
  team: "h-[26px] w-[26px] [&_svg]:h-4 [&_svg]:w-4 md:h-[37.5px] md:w-[37.5px] md:[&_svg]:h-[23px] md:[&_svg]:w-[23px]"
};

const ArrowCircle = ({
  as: Component = "button",
  className = "",
  direction = "right",
  iconClassName = "",
  label = "Next",
  onClick,
  size = "md",
  strokeWidth = 1.73,
  tone = "yellow",
  type = "button"
}) => {
  const isButton = Component === "button";

  return (
    <Component
      {...(isButton ? { type, "aria-label": label, onClick } : { "aria-hidden": true })}
      className={`inline-flex shrink-0 items-center justify-center rounded-full transition hover:scale-105 ${toneClasses[tone]} ${sizeClasses[size]} ${className}`}
    >
      <ArrowRight className={`${directionClasses[direction]} ${iconClassName}`} strokeWidth={strokeWidth} />
    </Component>
  );
};

export default ArrowCircle;
