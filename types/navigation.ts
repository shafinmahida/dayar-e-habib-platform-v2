export type NavLinksProps = {
  className?: string;
  linkClassName?: string;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
};

export type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type BookNowButtonProps = {
  className?: string;
  onNavigate?: () => void;
};
