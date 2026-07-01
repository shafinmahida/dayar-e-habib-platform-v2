"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { CTA_BOOK_NOW } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import type { BookNowButtonProps } from "@/types/navigation";

type Props = BookNowButtonProps;

export function BookNowButton({ className, onNavigate }: Props) {
  return (
    <Link
      href={CTA_BOOK_NOW.href}
      onClick={onNavigate}
      className={cn(
        buttonVariants({ variant: "default", size: "sm" }),
        "gap-2 font-medium tracking-wide shadow-sm",
        className
      )}
    >
      <Phone className="size-3.5 shrink-0" />
      <span>{CTA_BOOK_NOW.label}</span>
    </Link>
  );
}
