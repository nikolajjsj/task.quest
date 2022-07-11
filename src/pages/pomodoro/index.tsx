import Head from "next/head";
import { useCallback, useEffect, useReducer, useState } from "react";
import { BsSkipEnd } from "react-icons/bs";
import { AppTitle, Button as AppButton } from "../../components/common/common";
import { styled } from "../../styles/stitches.config";
import { formatTime } from "../../utils/time";
import * as r from "../../hooks/reducers/pomodoro.reducer";

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

      <s.Pane>
        <AppTitle>Pomodoro - {`#${state.cycle}`}</AppTitle>

        <s.Pomodoro variant={state.type} ticking={state.tickerId !== undefined}>
          <s.Controls>
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
          </s.Controls>
          <s.Time>{formatTime(time)}</s.Time>
        </s.Pomodoro>

        <s.Controls>
          {state.tickerId === undefined && (
            <s.Button onClick={start}>Start</s.Button>
          )}

          {state.tickerId !== undefined && (
            <s.Button onClick={stop} variant="delete">
              Stop
            </s.Button>
          )}

          {state.tickerId !== undefined && (
            <s.Button
              onClick={() => {
                stop();
                dispatch({ type: "NEXT_CYCLE", setTime });
              }}
              variant="primary"
            >
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
    overflow: "auto",
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
        POMODORO: {
          background: "$danger",
          color: "$white",
        },
        SMALL_BREAK: {
          background: "$primary-500",
          color: "$white",
        },
        LONG_BREAK: {
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
