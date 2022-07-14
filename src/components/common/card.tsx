import { SCREEN_MD } from "../../styles/scales";

type Props = React.HTMLProps<HTMLDivElement>;
export const Card = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={`flex-auto w-full max-w-[${SCREEN_MD}px] rounded-lg border border-stone-500 p-4 ${className}`}
    >
      {children}
    </div>
  );
};
