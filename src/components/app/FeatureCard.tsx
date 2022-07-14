import Link from "next/link";

type Props = {
  title: string;
  href: string;
} & React.HTMLProps<HTMLDivElement>;

export const FeatureCard = ({ title, href, className }: Props) => {
  return (
    <Link href={href}>
      <div
        className={`shadow-xl py-12 px-8 uppercase font-bold tracking-wider text-2xl rounded border cursor-pointer hover:scale-105 duration-500 ${className}`}
      >
        {title}
      </div>
    </Link>
  );
};
