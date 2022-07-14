import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserCircle, FaTasks } from "react-icons/fa";
import { HiHome, HiTemplate } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { RiTimerFlashLine } from "react-icons/ri";
import { Spacer } from "./spacer";

const iconStyle =
  "cursor-pointer h-6 w-6 duration-500 text-slate-500 md:h-8 md:w-8 hover:scale-105";

export const Navbar = () => {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <nav className="sticky top-0 bottom-0 left-0 flex flex-col p-2 gap-4 md:p-3 border">
      <Link href="/" passHref>
        <div>
          <HiHome className={iconStyle} />
        </div>
      </Link>

      <Link href="/projects" passHref>
        <div>
          <HiTemplate
            className={`${iconStyle} ${
              router.pathname === "/projects" ? "text-black" : ""
            }`}
          />
        </div>
      </Link>

      <Link href="/tasks" passHref>
        <div>
          <FaTasks
            className={`${iconStyle} ${
              router.pathname === "/tasks" ? "text-black" : ""
            }`}
          />
        </div>
      </Link>

      <Link href="/pomodoro" passHref>
        <div>
          <RiTimerFlashLine
            className={`${iconStyle} ${
              router.pathname === "/pomodoro" ? "text-black" : ""
            }`}
          />
        </div>
      </Link>

      <Spacer direction="y" />

      <Link href="/auth" passHref>
        <div>
          <FaUserCircle
            className={`${iconStyle} ${
              router.pathname === "/auth" ? "text-black" : ""
            }`}
          />
        </div>
      </Link>

      <Link href="/settings" passHref>
        <div>
          <IoIosSettings
            className={`${iconStyle} ${
              router.pathname === "/settings" ? "text-black" : ""
            }`}
          />
        </div>
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
