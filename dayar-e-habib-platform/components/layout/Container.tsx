import { CONTAINER_MAX_WIDTH, CONTAINER_PADDING } from "@/constants/layout";
import { cn } from "@/lib/utils";
import type { ContainerProps } from "@/types/components";

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        CONTAINER_MAX_WIDTH,
        CONTAINER_PADDING,
        className,
      )}
    >
      {children}
    </div>
  );
}
