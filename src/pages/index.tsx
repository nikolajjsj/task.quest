import type { NextPage } from "next";
import { FeatureCard } from "../components/common/feature-card";
import { AppTitle } from "../components/common/text";
import { SCREEN_XL } from "../styles/scales";

const Home: NextPage = () => {
  return (
    <div className="flex-auto overflow-auto flex flex-col items-center justify-center gap-8">
      <div className="h-12"></div>

      <AppTitle>
        Task<span className="text-slate-500">.quest</span>
      </AppTitle>

      <div className="h-12"></div>

      <div
        className={`w-11/12 max-w-[${SCREEN_XL}px] mx-auto grid content-center gap-4 grid-cols-1 sm:grid-cols-2 lg:w-4/5 lg:grid-cols-3`}
      >
        <FeatureCard
          href="/pomodoro"
          title="Pomodoro"
          className="bg-slate-50"
        />

        <FeatureCard
          href="/projects"
          title="Projects"
          className="bg-slate-50"
        />

        <FeatureCard href="/tasks" title="Tasks" className="bg-slate-50" />
      </div>

      <div className="h-40"></div>
    </div>
  );
};
export default Home;
