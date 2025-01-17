import React from "react";
import { cn } from "@/lib/utils";

export function Label({ className, htmlFor, children, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-sm font-medium text-gray-300 dark:text-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
