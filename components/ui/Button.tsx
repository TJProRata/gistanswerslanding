import { ButtonHTMLAttributes, forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "gradient" | "outline" | "gradient-icon";
  size?: "default" | "sm" | "lg";
  showIcon?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", showIcon = false, children, ...props }, ref) => {
    const gradientBorderStyle = variant === "gradient-icon" ? {
      background: `
        linear-gradient(#3A2F52, #3A2F52) padding-box,
        linear-gradient(90deg, #FA9946, #7F71FA) border-box
      `,
      border: '2px solid transparent'
    } : {};

    return (
      <button
        ref={ref}
        style={gradientBorderStyle}
        className={cn(
          "inline-flex items-center justify-center gap-3 rounded-full font-semibold transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            // Variants
            "bg-dark text-white hover:bg-grimace": variant === "default",
            "bg-gradient-to-r from-orange-gradient via-orange-light to-perrywinkle text-white hover:opacity-90":
              variant === "gradient",
            "border border-dark text-dark hover:bg-dark hover:text-white":
              variant === "outline",
            "hover:opacity-90": variant === "gradient-icon",
            // Sizes
            "px-6 py-3 text-base": size === "default" && variant !== "gradient-icon",
            "px-4 py-2 text-sm": size === "sm",
            "px-8 py-4 text-lg": size === "lg" && variant !== "gradient-icon",
            // Special padding for gradient-icon variant
            "pl-8 pr-4 py-3 text-lg": variant === "gradient-icon" && size === "default",
            "pl-10 pr-5 py-4 text-xl": variant === "gradient-icon" && size === "lg",
          },
          className
        )}
        {...props}
      >
        <span
          className={variant === "gradient-icon" ? "bg-gradient-to-r from-[#FA9946] to-[#7F71FA] bg-clip-text [-webkit-background-clip:text] text-transparent" : ""}
        >
          {children}
        </span>
        {(showIcon || variant === "gradient-icon") && (
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{
              background: "linear-gradient(90deg, #FA9946, #7F71FA)"
            }}
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
