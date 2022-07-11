export const TICK_PERIOD_SEC = 1;
export const TICK_PERIOD_MILLI = TICK_PERIOD_SEC * 1000;
const FIVE_MINUTES = 60 * 5;
const FIFTEEN_MINUTES = FIVE_MINUTES * 3;
export const TWENTY_FIVE_MINUTES = FIVE_MINUTES * 5;

export type POMODORO_TYPE = "POMODORO" | "SMALL_BREAK" | "LONG_BREAK";

export type State = {
  cycle: number;
  type: POMODORO_TYPE;
  tickerId?: number;
};

export const initialState: State = {
  cycle: 1,
  type: "POMODORO",
  tickerId: undefined,
};

export type Action =
  | { type: "NEXT_CYCLE"; setTime: (n: number) => void }
  | { type: "UPDATE_TICKER_ID"; tickerId?: number }
  | {
      type: "UPDATE_TYPE";
      pomodoroType: POMODORO_TYPE;
      setTime: (n: number) => void;
    };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_TICKER_ID": {
      return { ...state, tickerId: action.tickerId };
    }
    case "UPDATE_TYPE":
      switch (action.pomodoroType) {
        case "POMODORO":
          action.setTime(TWENTY_FIVE_MINUTES);
          break;
        case "SMALL_BREAK":
          action.setTime(FIVE_MINUTES);
          break;
        case "LONG_BREAK":
          action.setTime(FIFTEEN_MINUTES);
          break;
      }
      return { ...state, type: action.pomodoroType };
    case "NEXT_CYCLE": {
      const newState: State = { ...state, tickerId: undefined };
      if (state.type === "POMODORO") {
        if (state.cycle % 3 === 0) {
          newState.type = "LONG_BREAK";
          action.setTime(FIFTEEN_MINUTES);
        } else {
          newState.type = "SMALL_BREAK";
          action.setTime(FIVE_MINUTES);
        }
      } else {
        newState.cycle += 1;
        newState.type = "POMODORO";
        action.setTime(TWENTY_FIVE_MINUTES);
      }
      return newState;
    }
    default:
      return state;
  }
}
