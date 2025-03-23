
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 button-press",
  {
    variants: {
      variant: {
        default: "bg-gradient-amplifa text-white hover:opacity-90 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:opacity-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md hover:-translate-y-0.5",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:-translate-y-0.5",
        secondary:
          "bg-amplifa-purple text-white hover:bg-amplifa-purple/90 hover:shadow-md hover:-translate-y-0.5",
        ghost: "hover:bg-amplifa-purple/10 hover:text-amplifa-purple hover:-translate-y-0.5",
        link: "text-amplifa-blue underline-offset-4 hover:underline hover:text-amplifa-blue/80",
        orange: "bg-gradient-amplifa text-white hover:opacity-90 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:opacity-95",
        pink: "bg-amplifa-pink text-white hover:bg-amplifa-pink/90 hover:shadow-md hover:-translate-y-0.5",
        blue: "bg-amplifa-blue text-white hover:bg-amplifa-blue/90 hover:shadow-md hover:-translate-y-0.5",
        gradient: "bg-gradient-amplifa text-white hover:opacity-90 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:opacity-95 transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
