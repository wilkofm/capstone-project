import { cn } from "@/lib/utils";

export const Button = ({ className, ...props }) => (
  <button
    className={cn(
      "px-4 py-2 rounded-lg bg-customBlue text-white hover:bg-customInputGray",
      className
    )}
    {...props}
  />
);
