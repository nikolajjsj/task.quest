type Props = React.HTMLProps<HTMLDivElement>;

export const Card = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={`relative flex-auto w-full max-w-md rounded-lg border border-slate-500 p-4 ${className}`}
    >
      {children}
    </div>
  );
};
