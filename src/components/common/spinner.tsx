type Props = {
  center?: boolean;
};
export const Spinner = ({ center }: Props) => {
  return (
    <svg
      className={`animate-spin h-5 w-5 text-white ${
        center
          ? "absolute top-1/2 left-1/2 transform-translate-x-1/2 transform-translate-y-1/2"
          : ""
      }`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="black"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="black"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

// const loading = keyframes({
//   "0%": {
//     transform: "rotate(0deg)",
//     webkitTransform: "rotate(0deg)",
//   },
//   "100%": {
//     transform: "rotate(360deg)",
//     webkitTransform: "rotate(360deg)",
//   },
// });

// export const Spinner = styled("div", {
//   borderRadius: "50%",
//   fontSize: "10px",
//   position: "relative",
//   textIndent: "-9999em",
//   webkitTransform: "translateZ(0)",
//   msTransform: "translateZ(0)",
//   transform: "translateZ(0)",
//   webkitAnimation: `${loading} 1.1s infinite linear`,
//   animation: `${loading} 1.1s infinite linear`,

//   "&:after": {
//     borderRadius: "50%",
//     width: "3em",
//     height: "3em",
//   },

//   variants: {
//     color: {
//       black: {
//         borderTop: "0.5em solid rgba(0, 0, 0, 0.2)",
//         borderRight: "0.5em solid rgba(0, 0, 0, 0.2)",
//         borderBottom: "0.5em solid rgba(0, 0, 0, 0.2)",
//         borderLeft: "0.5em solid #000",
//       },
//       white: {
//         borderTop: "0.5em solid rgba(255, 255, 255, 0.2)",
//         borderRight: "0.5em solid rgba(255, 255, 255, 0.2)",
//         borderBottom: "0.5em solid rgba(255, 255, 255, 0.2)",
//         borderLeft: "0.5em solid #fff",
//       },
//     },
//     center: {
//       true: {
//         flex: "auto",
//         position: "absolute",
//         left: "50%",
//         top: "50%",
//         transform: "translate(-50%,-50%)",
//       },
//     },
//     size: {
//       small: {
//         width: "2em",
//         height: "2em",
//       },
//       medium: {
//         width: "3em",
//         height: "3em",
//       },
//       large: {
//         width: "5em",
//         height: "5em",
//       },
//     },
//   },
//   defaultVariants: {
//     color: "black",
//     center: false,
//     size: "medium",
//   },
// });
