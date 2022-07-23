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

export function Dialog({
  title,
  onClose,
  children,
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
    <div
      className="fixed inset-0 flex flex-col justify-center items-center backdrop-blur-xl"
      onClick={
        closeOnClickOutside && onClose
          ? (e) => {
              if (e.target === e.currentTarget) onClose();
            }
          : undefined
      }
    >
      <div
        className="flex flex-col w-full max-w-lg overflow-hidden shadow-lg rounded-lg bg-white text-black"
        ref={dialogRef}
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

        {children}
      </div>
    </div>,
    document.body,
  );
}

type DialogContentProps = React.HTMLProps<HTMLDivElement>;
export const DialogContent = ({ children, ...props }: DialogContentProps) => {
  return (
    <div
      {...props}
      className="flex-auto p-6 gap-8 flex flex-col overflow-y-hidden overflow-x-auto"
    >
      {children}
    </div>
  );
};

type DialogFooterProps = React.HTMLProps<HTMLDivElement>;
export const DialogFooter = ({ children, ...props }: DialogFooterProps) => {
  return (
    <div
      {...props}
      className="flex justify-end items-center gap-2 py-2 px-5 border-t"
    >
      {children}
    </div>
  );
};
