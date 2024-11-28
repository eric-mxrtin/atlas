import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center leading-3	rounded-md border px-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        blue: 
          "border-transparent text-[#1E3765] bg-[#DDE7F9]",
        green: "border-transparent bg-green-100 text-green-700 px-3",
        red: "border-transparent bg-rose-500 text-white",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div
      className={`${cn(badgeVariants({ variant }), className)}`}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
