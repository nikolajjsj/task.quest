import Head from "next/head";
import { useCallback, useEffect, useReducer, useState } from "react";
import { BsSkipEnd } from "react-icons/bs";
import { formatTime } from "../../utils/time";
import * as r from "../../hooks/reducers/pomodoro.reducer";
import { AppTitle } from "../../components/common/text";
import { Button } from "../../components/common/button";

type TypeButtonProps = {
  type: r.POMODORO_TYPE;
  selectedType: r.POMODORO_TYPE;
  updateType: (type: r.POMODORO_TYPE) => void;
  children: React.ReactNode;
};
const TypeButton = ({
  type,
  selectedType,
  updateType,
  children,
}: TypeButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 py-2 px-6 focus:outline-none rounded border cursor-pointer border-none font-bold uppercase text-sm sm:text-lg md:text-x ${
        type === selectedType
          ? "bg-white text-black"
          : "bg-transparent text-white hover:bg-red-50 hover:text-black"
      }`}
      onClick={() => updateType(type)}
    >
      {children}
    </button>
  );
};

const Pomodoro = () => {
  const [state, dispatch] = useReducer(r.reducer, r.initialState);
  const [time, setTime] = useState<number>(r.TWENTY_FIVE_MINUTES);

  const timer = useCallback(() => {
    if (time + r.TICK_PERIOD_SEC >= r.TICK_PERIOD_SEC) {
      setTime((t) => Math.max(t - r.TICK_PERIOD_SEC, 0));
    } else {
      dispatch({ type: "NEXT_CYCLE", setTime });
    }
  }, [time]);

  const start = () => {
    if (state.tickerId !== undefined) return;
    const tickerId = window.setInterval(timer, r.TICK_PERIOD_MILLI);
    dispatch({ type: "UPDATE_TICKER_ID", tickerId });
  };

  const stop = () => {
    if (state.tickerId === undefined) return;
    window.clearInterval(state.tickerId);
    dispatch({ type: "UPDATE_TICKER_ID", tickerId: undefined });
  };

  useEffect(() => {
    return () => {
      if (state.tickerId !== undefined) window.clearInterval(state.tickerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Pomodoro - {formatTime(time)}</title>
      </Head>

      <div className="flex-auto overflow-auto flex flex-col justify-center items-center p-4 gap-4 md:p-8 md:gap-8">
        <AppTitle>Pomodoro - {`#${state.cycle}`}</AppTitle>

        <div
          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg duration-200 shadow-md sm:p-12 sm:gap-8 ${
            state.tickerId !== undefined ? "shadow-xl" : ""
          } ${
            state.type === "POMODORO"
              ? "bg-red-400 text-white"
              : state.type === "LONG_BREAK"
              ? "bg-orange-400 text-white"
              : "bg-green-400 text-white"
          }`}
        >
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <TypeButton
              type="POMODORO"
              selectedType={state.type}
              updateType={() => {
                stop();
                dispatch({
                  type: "UPDATE_TYPE",
                  pomodoroType: "POMODORO",
                  setTime,
                });
              }}
            >
              Pomodoro
            </TypeButton>

            <TypeButton
              type="SMALL_BREAK"
              selectedType={state.type}
              updateType={() => {
                stop();
                dispatch({
                  type: "UPDATE_TYPE",
                  pomodoroType: "SMALL_BREAK",
                  setTime,
                });
              }}
            >
              Short Break
            </TypeButton>

            <TypeButton
              type="LONG_BREAK"
              selectedType={state.type}
              updateType={() => {
                stop();
                dispatch({
                  type: "UPDATE_TYPE",
                  pomodoroType: "LONG_BREAK",
                  setTime,
                });
              }}
            >
              Long Break
            </TypeButton>
          </div>

          <div className="text-5xl font-bold tracking-widest sm:text-9xl xs:text-7xl">
            {formatTime(time)}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {state.tickerId === undefined && (
            <Button onClick={start}>Start</Button>
          )}

          {state.tickerId !== undefined && <Button onClick={stop}>Stop</Button>}

          {state.tickerId !== undefined && (
            <Button
              onClick={() => {
                stop();
                dispatch({ type: "NEXT_CYCLE", setTime });
              }}
            >
              <BsSkipEnd />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default Pomodoro;
