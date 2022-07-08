import { createStitches } from "@stitches/react";

export const SCREEN_XS = 320; // px
export const SCREEN_SM = 640; // px
export const SCREEN_MD = 768; // px
export const SCREEN_LG = 1024; // px
export const SCREEN_XL = 1280; // px
export const SCREEN_2XL = 1680; // px

const colors = {
  black: "rgb(27, 29, 36)",
  white: "rgb(255, 254, 254)",

  navbar: "rgb(37, 39, 49)",

  warning: "rgb(235, 126, 87)",
  danger: "rgb(236, 102, 100)",
  success: "rgb(140, 183, 128)",

  "primary-50": "",
  "primary-100": "",
  "primary-200": "",
  "primary-300": "",
  "primary-400": "",
  "primary-500": "rgb(106, 94, 204)",
  "primary-600": "",
  "primary-700": "",
  "primary-900": "",

  "secondary-50": "",
  "secondary-100": "",
  "secondary-200": "",
  "secondary-300": "",
  "secondary-400": "",
  "secondary-500": "$warning",
  "secondary-600": "",
  "secondary-700": "",
  "secondary-900": "",
};

const space = {
  "-96": rem(-384),
  "-80": rem(-320),
  "-72": rem(-288),
  "-64": rem(-256),
  "-60": rem(-240),
  "-56": rem(-224),
  "-52": rem(-208),
  "-48": rem(-192),
  "-44": rem(-176),
  "-40": rem(-160),
  "-36": rem(-144),
  "-32": rem(-128),
  "-28": rem(-112),
  "-24": rem(-96),
  "-20": rem(-80),
  "-16": rem(-64),
  "-14": rem(-56),
  "-12": rem(-48),
  "-11": rem(-44),
  "-10": rem(-40),
  "-9": rem(-36),
  "-8": rem(-30),
  "-7": rem(-28),
  "-6": rem(-24),
  "-5": rem(-20),
  "-4": rem(-16),
  "-3-5": rem(-14),
  "-3": rem(-12),
  "-2-5": rem(-10),
  "-2": rem(-8),
  "-1-5": rem(-6),
  "-1": rem(-4),
  "-0-5": rem(-2),
  "0-5": rem(2),
  "1": rem(4),
  "1-5": rem(6),
  "2": rem(8),
  "2-5": rem(10),
  "3": rem(12),
  "3-5": rem(14),
  "4": rem(16),
  "5": rem(20),
  "6": rem(24),
  "7": rem(28),
  "8": rem(32),
  "9": rem(36),
  "10": rem(40),
  "11": rem(44),
  "12": rem(48),
  "14": rem(56),
  "16": rem(64),
  "20": rem(80),
  "24": rem(96),
  "28": rem(112),
  "32": rem(128),
  "36": rem(144),
  "40": rem(160),
  "44": rem(176),
  "48": rem(192),
  "52": rem(208),
  "56": rem(224),
  "60": rem(240),
  "64": rem(256),
  "72": rem(288),
  "80": rem(320),
  "96": rem(384),
};

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "2-5xl": "1.6875rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  roboto: "Roboto, Poppins, serif",
};

const lineHeights = {
  xs: rem(16),
  sm: rem(20),
  base: rem(24),
  lg: rem(28),
  xl: rem(28),
  "2xl": rem(32),
  "3xl": rem(36),
  "4xl": rem(40),
  "5xl": "1",
  "6xl": "1",
  "7xl": "1",
  "8xl": "1",
  "9xl": "1",
};

const letterSpacings = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

const radii = {
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

const shadows = {
  sm: "2px 2px 0px rgba(0, 0, 0, 0.1)",
  md: "3px 3px 0px rgba(0, 0, 0, 0.1)",
  lg: "4px 4px 0px rgba(0, 0, 0, 0.1)",
  xl: "6px 6px 0px rgba(0, 0, 0, 0.1)",
};

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors,
    space,
    fontSizes,
    fonts,
    lineHeights,
    letterSpacings,
    radii,
    shadows,
  },
  media: {
    xs: `(min-width: ${SCREEN_XS}px)`,
    sm: `(min-width: ${SCREEN_SM}px)`,
    md: `(min-width: ${SCREEN_MD}px)`,
    lg: `(min-width: ${SCREEN_LG}px)`,
    xl: `(min-width: ${SCREEN_XL}px)`,
    "2xl": `(min-width: ${SCREEN_2XL}px)`,
  },
});

export function rem(px: number) {
  return `${px / 16}rem`;
}
