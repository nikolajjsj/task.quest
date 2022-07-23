import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Title } from "./text";

type Props = {
  title?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  autoFocus?: boolean;
  closeOnEsc?: boolean;
  closeOnClickOutside?: boolean;
};

export function BottomSheet({
  title,
  onClose,
  children,
  autoFocus,
  closeOnEsc,
  closeOnClickOutside,
}: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sheetRef.current) return;
    if (autoFocus) sheetRef.current.focus();
  }, [autoFocus]);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex flex-col justify-end items-center backdrop-blur-sm"
      onClick={
        closeOnClickOutside && onClose
          ? (e) => {
              if (e.target === e.currentTarget) onClose();
            }
          : undefined
      }
    >
      <div
        className="flex flex-col w-full max-w-md overflow-hidden border rounded-t-2xl bg-white text-black"
        ref={sheetRef}
        tabIndex={-1}
        onKeyDown={
          !(onClose && closeOnEsc)
            ? undefined
            : (e) => {
                if (e.key === "Escape") onClose();
              }
        }
      >
        <header className="flex items-center bg-slate-900 text-white p-4">
          {title && <Title>{title}</Title>}
        </header>

        <div className="flex-auto flex flex-col overflow-y-scroll overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

type BottomSheetContentProps = React.HTMLProps<HTMLDivElement>;
export const BottomSheetContent = ({
  children,
  ...props
}: BottomSheetContentProps) => {
  return (
    <div {...props} className="flex-auto flex flex-col px-4 pt-4 gap-8">
      {children}
    </div>
  );
};

type BottomSheetFooterProps = React.HTMLProps<HTMLDivElement>;
export const BottomSheetFooter = ({
  children,
  ...props
}: BottomSheetFooterProps) => {
  return (
    <div
      {...props}
      className="flex justify-end items-center gap-2 py-2 px-5 border-t"
    >
      {children}
    </div>
  );
};
