import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserCircle, FaTasks } from "react-icons/fa";
import { HiHome, HiTemplate } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { RiTimerFlashLine } from "react-icons/ri";
import { Spacer } from "./spacer";

const iconStyle =
  "cursor-pointer h-6 w-6 duration-500  md:h-8 md:w-8 hover:scale-105";
const active = "text-indigo-700";
const inactive = "text-slate-500";

export const Navbar = () => {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <nav className="sticky top-0 bottom-0 left-0 flex flex-col p-2 gap-6 md:p-3 border">
      <Link href="/">
        <div>
          <HiHome
            className={`${iconStyle} ${
              router.pathname === "/" ? active : inactive
            }`}
          />
        </div>
      </Link>

      <Link href="/projects">
        <div>
          <HiTemplate
            className={`${iconStyle} ${
              router.pathname.startsWith("/projects") ? active : inactive
            }`}
          />
        </div>
      </Link>

      <Link href="/tasks">
        <div>
          <FaTasks
            className={`${iconStyle} ${
              router.pathname.startsWith("/tasks") ? active : inactive
            }`}
          />
        </div>
      </Link>

      <Link href="/pomodoro">
        <div>
          <RiTimerFlashLine
            className={`${iconStyle} ${
              router.pathname.startsWith("/pomodoro") ? active : inactive
            }`}
          />
        </div>
      </Link>

      <Spacer direction="y" />

      <Link href="/auth">
        <div>
          <FaUserCircle
            className={`${iconStyle} ${
              router.pathname.startsWith("/auth") ? active : inactive
            }`}
          />
        </div>
      </Link>

      <Link href="/settings">
        <div>
          <IoIosSettings
            className={`${iconStyle} ${
              router.pathname.startsWith("/settings") ? active : inactive
            }`}
          />
        </div>
      </Link>
    </nav>
  );
};
