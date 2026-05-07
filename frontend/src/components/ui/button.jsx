// src/components/ui/button.jsx
import { cn } from "@/lib/utils"

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}) {
  const variants = {
    default: "bg-[#c47a5a] text-white hover:bg-[#4a3728]",
    outline: "border border-[#e8dece] bg-transparent hover:bg-[#f5f0e8]",
    ghost: "hover:bg-[#f5f0e8]",
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
  }
  
  const Comp = asChild ? 'span' : 'button'
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}