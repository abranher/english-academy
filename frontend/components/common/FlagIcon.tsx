import "@/node_modules/flag-icons/css/flag-icons.min.css";

interface Size {
  width: string;
  height: string;
}

const sizes: {
  [key in "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"]: Size;
} = {
  sm: {
    width: "24px",
    height: "13.5px",
  },
  md: {
    width: "32px",
    height: "18px",
  },
  lg: {
    width: "48px",
    height: "27px",
  },
  xl: {
    width: "64px",
    height: "36px",
  },
  "2xl": {
    width: "96px",
    height: "54px",
  },
  "3xl": {
    width: "128px",
    height: "72px",
  },
  "4xl": {
    width: "192px",
    height: "108px",
  },
  "5xl": {
    width: "256px",
    height: "144px",
  },
};

interface FlagIconProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

export default function FlagIcon({ size = "4xl" }: FlagIconProps) {
  return <span className="fi fi-ve" style={sizes[size]}></span>;
}
