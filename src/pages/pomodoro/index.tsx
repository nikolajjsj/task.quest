import Head from "next/head";
import { useEffect, useState } from "react";
import { BsSkipEnd } from "react-icons/bs";
import { AppTitle, Button as AppButton } from "../../components/common/common";
import { styled } from "../../styles/stitches.config";

const TICK_PERIOD_SEC = 1;
const TICK_PERIOD_MILLI = TICK_PERIOD_SEC * 1000;
const FIVE_MINUTES = 60 * 5;
const FIFTEEN_MINUTES = FIVE_MINUTES * 3;
const TWENTY_FIVE_MINUTES = FIVE_MINUTES * 5;

type POMODORO_TYPE = "POMODORO" | "SMALL_BREAK" | "LONG_BREAK";

type TypeButtonProps = {
  type: POMODORO_TYPE;
  selectedType: POMODORO_TYPE;
  updateType: (type: POMODORO_TYPE) => void;
  children: React.ReactNode;
};
const TypeButton = ({
  type,
  selectedType,
  updateType,
  children,
}: TypeButtonProps) => {
  const bg = type === selectedType ? "none rgba(0, 0, 0, 0.15)" : "transparent";
  return (
    <s.Button
      onClick={() => updateType(type)}
      css={{ ...s.TypeReset, background: bg }}
    >
      {children}
    </s.Button>
  );
};

const Pomodoro = () => {
  const [cycle, setCycle] = useState<number>(1);
  const [type, setType] = useState<POMODORO_TYPE>("POMODORO");
  const [tickerId, setTickerId] = useState<number | null>(null);
  const [time, setTime] = useState<number>(TWENTY_FIVE_MINUTES);

  const nextCycle = () => {
    stop();
    setTime((_) => {
      if (type === "POMODORO") {
        if (cycle % 3 === 0) {
          setType("LONG_BREAK");
          return FIFTEEN_MINUTES;
        } else {
          setType("SMALL_BREAK");
          return FIVE_MINUTES;
        }
      } else {
        setCycle((c) => c + 1);
        setType("POMODORO");
        return TWENTY_FIVE_MINUTES;
      }
    });
  };

  const updateType = (t: POMODORO_TYPE) => {
    console.log(t);
    stop();
    setType(t);
    switch (t) {
      case "POMODORO":
        setTime(TWENTY_FIVE_MINUTES);
        break;
      case "SMALL_BREAK":
        setTime(FIVE_MINUTES);
        break;
      case "LONG_BREAK":
        setTime(FIFTEEN_MINUTES);
        break;
    }
  };

  const timer = () => {
    if (time + TICK_PERIOD_SEC >= TICK_PERIOD_SEC) {
      setTime((t) => Math.max(t - TICK_PERIOD_SEC, 0));
    } else {
      nextCycle();
    }
  };

  const formatTime = (time: number): string => {
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    const secPrecision = sec.toFixed(0).padStart(2, "0");
    return `${min}:${secPrecision}`;
  };

  const start = () => {
    if (tickerId !== null) return;
    setTickerId(window.setInterval(timer, TICK_PERIOD_MILLI));
  };

  const stop = () => {
    setTickerId((t) => {
      if (t !== null) window.clearInterval(t);
      return null;
    });
  };

  useEffect(() => {
    return () => {
      if (tickerId !== null) window.clearInterval(tickerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Pomodoro - {formatTime(time)}</title>
      </Head>

      <s.Pane>
        <AppTitle>Pomodoro - {`#${cycle}`}</AppTitle>

        <s.Pomodoro
          variant={type === "POMODORO" ? "pomodoro" : "smallBreak"}
          ticking={tickerId !== null}
        >
          <s.Controls>
            <TypeButton
              type="POMODORO"
              selectedType={type}
              updateType={updateType}
            >
              Pomodoro
            </TypeButton>

            <TypeButton
              type="SMALL_BREAK"
              selectedType={type}
              updateType={updateType}
            >
              Short Break
            </TypeButton>

            <TypeButton
              type="LONG_BREAK"
              selectedType={type}
              updateType={updateType}
            >
              Long Break
            </TypeButton>
          </s.Controls>
          <s.Time>{formatTime(time)}</s.Time>
        </s.Pomodoro>

        <s.Controls>
          {tickerId === null && <s.Button onClick={start}>Start</s.Button>}

          {tickerId !== null && (
            <s.Button onClick={stop} variant="delete">
              Stop
            </s.Button>
          )}

          {tickerId !== null && (
            <s.Button onClick={nextCycle} variant="primary">
              <BsSkipEnd />
            </s.Button>
          )}
        </s.Controls>
      </s.Pane>
    </>
  );
};
export default Pomodoro;

namespace s {
  export const Pane = styled("div", {
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "$4",
    gap: "$4",

    "@md": {
      padding: "$8",
      gap: "$8",
    },
  });

  export const Pomodoro = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "$2",
    padding: "$4",
    borderRadius: "$lg",
    transition: "0.2s",
    boxShadow: "$md",

    "@sm": {
      padding: "$12",
      gap: "$8",
    },

    variants: {
      variant: {
        pomodoro: {
          background: "$danger",
          color: "$white",
        },
        smallBreak: {
          background: "$primary-500",
          color: "$white",
        },
        longBreak: {
          background: "$secondary-500",
          color: "$white",
        },
      },
      ticking: {
        true: { boxShadow: "$xl" },
      },
    },
  });

  export const Time = styled("h2", {
    fontSize: "$5xl",
    fontWeight: 700,
    letterSpacing: "$widest",

    "@xs": { fontSize: "$7xl" },
    "@sm": { fontSize: "$9xl" },
  });

  export const Controls = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "$4",

    "@sm": {
      flexDirection: "row",
    },
  });

  export const TypeReset = {
    boxShadow: "none",
    border: `1px solid transparent`,
    fontSize: "$xs",
    background: "transparent",

    "@md": {
      fontSize: "$base",
    },
  };
  export const Button = styled(AppButton, {
    fontSize: "$xs",
    fontWeight: 700,
    textTransform: "uppercase",

    "@md": {
      fontSize: "$2xl",
    },
  });
}
