import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { rem, styled } from "../../styles/stitches.config";
import { Title } from "../common/text";

type Props = {
  title?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  maxHeight?: "sm" | "md" | "lg" | "xl";
  autoFocus?: boolean;
  closeOnEsc?: boolean;
  closeOnClickOutside?: boolean;
};

export function Dialog({
  title,
  onClose,
  children,
  maxHeight,
  autoFocus,
  closeOnEsc,
  closeOnClickOutside,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (autoFocus) dialogRef.current.focus();
  }, [autoFocus]);

  return ReactDOM.createPortal(
    <s.Container
      onClick={
        closeOnClickOutside && onClose
          ? (e) => {
              if (e.target === e.currentTarget) onClose();
            }
          : undefined
      }
    >
      <s.Dialog
        ref={dialogRef}
        maxHeight={maxHeight}
        tabIndex={-1}
        onKeyDown={
          !(onClose && closeOnEsc)
            ? undefined
            : (e) => {
                if (e.key === "Escape") onClose();
              }
        }
      >
        <s.Header>{title && <Title>{title}</Title>}</s.Header>
        {children}
      </s.Dialog>
    </s.Container>,
    document.body,
  );
}

export const DialogContent = styled("div", {
  flex: "auto",
  paddingInline: "$5",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden auto",

  variants: {
    vpad: {
      top: { paddingTop: "$5" },
      bottom: { paddingBottom: "$5" },
      both: { paddingBlock: "$5" },
      none: {},
    },
  },

  defaultVariants: { vpad: "both" },
});

export const DialogFooter = styled("div", {
  padding: "$2-5 $5",

  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "$2-5",

  borderTop: "1px solid $default-300",
});

namespace s {
  export const Container = styled("div", {
    position: "fixed",
    inset: "0",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    background: "hsla(0184, 9%, 62%, .5)",
    backdropFilter: "blur(5px)",
  });

  const MAX_WIDTH = 720; // px
  export const Dialog = styled("div", {
    width: "calc(100% - $space$10)",
    maxWidth: rem(MAX_WIDTH),

    background: "$white",
    color: "$black",

    borderRadius: "$lg",
    boxShadow: "$lg",
    overflow: "hidden",

    display: "flex",
    flexDirection: "column",

    variants: {
      maxHeight: {
        sm: { maxHeight: "256px" },
        md: { maxHeight: "512px" },
        lg: { maxHeight: "768px" },
        xl: { maxHeight: "1024px" },
      },
    },
    defaultVariants: { maxHeight: "md" },
  });

  export const Header = styled("div", {
    display: "flex",
    alignItems: "center",
    background: "$navbar",
    color: "$white",
    padding: "$4",
  });

  export const CloseButton = styled("button", {
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const CLOSE_ICON_SIZE = 16; // px
  export const CloseIcon = styled("svg", {
    width: rem(CLOSE_ICON_SIZE),
    height: rem(CLOSE_ICON_SIZE),
  });
}
