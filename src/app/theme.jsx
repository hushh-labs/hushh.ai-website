import { extendTheme } from "@chakra-ui/react";

const PRIMARY_COLOR = "linear-gradient(90deg, #7A7A7E 0.7%, #FFFFFF 100%)";
const SECONDARY_COLOR = "#FCEEE9";

const theme = {
  colors: {
    primary: PRIMARY_COLOR,
    gradient: "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
    secondary: "#ABABAB",
    _white: "#FFFFFF",
    _black: "#000000",
    _darkgray: "#292929",
    _gray: "#636363",
    _lightgray: "#E3E3E3",
    _lightestgray: "#F7F7F7",
    _green: "#157c00",
    _lightgreen: "#eeffeb",
    _red: "#E53E3E",
    _lightred: "#FAEAEA",
    _orange: "#FF9600",
    _lightorange: "#FFC82B",
    _purple: "#7F39FB",
    _lightpurple: "#EEE3FA",
    _blue: "#1869b3",
    _lightblue: "#F1F6F9",
    primaryGradient: {
      start: PRIMARY_COLOR,
      end: SECONDARY_COLOR,
    },
  },
  fonts: {
    body: "var(--font-figtree), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    heading: "var(--font-figtree), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif", // Heading font
    text: "var(--font-figtree), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },
  styles: {
    global: {
      "*": {
        borderColor: "_lightgray",
      },
    },
  },
  components: {
    Drawer: {
      variants: {
        alwaysOpen: {
          parts: ["dialog, dialogContainer"],
          dialog: {
            pointerEvents: "auto",
          },
          dialogContainer: {
            pointerEvents: "none",
          },
        },
      },
    },
  },
  breakpoints: {
    md: "62em",
  },
  shadows: {
    outline: `0 0 0 2px ${SECONDARY_COLOR}`,
  },
};

const extendedTheme = extendTheme(theme);

export default extendedTheme;
