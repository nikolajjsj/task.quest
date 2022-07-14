import React from "react";

type Props = React.HTMLProps<HTMLHeadingElement>;
export const AppTitle = ({ children, ...props }: Props) => {
  return (
    <h1 {...props} className="text-2xl font-bold tracking-wider md:text-4xl">
      {children}
    </h1>
  );
};

export const Title = ({ children, ...props }: Props) => {
  return (
    <h1 {...props} className="text-md font-semibold md:text-lg">
      {children}
    </h1>
  );
};

type DecriptionProps = React.HTMLProps<HTMLParagraphElement>;
export const Description = ({
  children,
  className,
  ...props
}: DecriptionProps) => {
  return (
    <p {...props} className={`text-slate-600 ${className}`}>
      {children}
    </p>
  );
};

type ErrorProps = React.HTMLProps<HTMLParagraphElement>;
export const Error = ({ children, ...props }: ErrorProps) => {
  return (
    <p {...props} className="text-red-600 text-sm">
      {children}
    </p>
  );
};
