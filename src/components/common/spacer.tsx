type Props = {
  direction: "x" | "y";
};
export const Spacer = ({ direction }: Props) => {
  return <div className={`${direction === "x" ? "ml-auto" : "mt-auto"}`}></div>;
};
