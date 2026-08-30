import type { ReactNode } from "react";

type MorePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PopupOptionProps = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
};

type AnimatedProps = {
  children?: ReactNode;
};

export type { MorePopupProps, PopupOptionProps, AnimatedProps };