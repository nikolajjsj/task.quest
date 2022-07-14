import Link from "next/link";
import { FaUserCircle, FaTasks } from "react-icons/fa";
import { HiHome, HiTemplate } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { RiTimerFlashLine } from "react-icons/ri";
import { Spacer } from "../common/spacer";

const iconStyle =
  "cursor-pointer h-6 w-6 text-white duration-500 md:h-8 md:w-8 hover:scale-105";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 bottom-0 left-0 flex flex-col bg-sky-900 p-1 gap-4 md:p-3">
      <Link href="/">
        <HiHome className={iconStyle} />
      </Link>

      <Link href="/projects">
        <HiTemplate className={iconStyle} />
      </Link>

      <Link href="/tasks">
        <FaTasks className={iconStyle} />
      </Link>

      <Link href="/pomodoro">
        <RiTimerFlashLine className={iconStyle} />
      </Link>

      <Spacer direction="y" />

      <Link href="/auth">
        <FaUserCircle className={iconStyle} />
      </Link>

      <Link href="/settings">
        <IoIosSettings className={iconStyle} />
      </Link>
    </nav>
  );
};

// namespace s {
//   export const Navbar = styled("nav", {
//     position: "sticky",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     display: "flex",
//     flexDirection: "column",
//     background: "$black",
//     padding: "$1",
//     gap: "$2",

//     "@md": {
//       padding: "$2",
//     },
//   });

//   export const Title = styled("h1", {
//     fontSize: "$xl",
//     fontWeight: 700,
//     letterSpacing: "$wider",

//     "@md": {
//       fontSize: "$2xl",
//     },
//   });

//   export const Icon = styled("svg", {
//     height: rem(16),
//     width: rem(16),
//     color: "$white",

//     "@md": {
//       height: rem(24),
//       width: rem(24),
//     },
//   });
// }
