import type { ReactNode } from "react";

export type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export type SectionProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
};

export type LogoProps = {
  className?: string;
  variant?: "full" | "mark";
  theme?: "dark" | "light";
};
