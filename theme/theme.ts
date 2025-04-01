"use client";

import { createTheme } from "@mui/material/styles";

// A custom theme for your app
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      light: "#5BE49B",
      main: "#00A76F",
      dark: "#007867",
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: "#C684FF",
      main: "#8E33FF",
      dark: "#5119B7",
      contrastText: "#FFFFFF"
    },
    info: {
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
      contrastText: "#FFFFFF"
    },
    success: {
      light: "#77ED8B",
      main: "#22C55E",
      dark: "#118D57",
      contrastText: "#ffffff"
    },
    warning: {
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
      contrastText: "#1C252E"
    },
    error: {
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
      contrastText: "#FFFFFF"
    },
    grey: {
      50: "#FCFDFD",
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#1C252E",
      900: "#141A21"
    },
    common: {
      black: "#000000",
      white: "#FFFFFF"
    },
    background: {
      default: "#d1d7db"
    }
  },
  typography: {
    fontFamily: "var(--font-IRANSansX)",
    subtitle1: {
      fontSize: ".75rem",
      fontWeight: "700",
      lineHeight: "1.5rem"
    },

    subtitle2: {
      fontSize: ".75rem",
      fontWeight: "600",
      lineHeight: "1.5rem"
    },
    caption: {
      fontSize: ".875rem",
      fontWeight: "600",
      lineHeight: "0.75rem"
    }
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          margin: "24px 0",
          boxShadow: "unset",
          padding: "32px"
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: "contained"
      },
      styleOverrides: {
        root: {
          height: "52px",
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "400",
          boxShadow: "unset",
          "&:has(>svg)": {
            padding: "8px",
            borderRadius: "50%",
            minWidth: "1em",
            minHeight: "1em"
          }
        }
      }
    },
    MuiBottomNavigation:{
      styleOverrides: {
        root: {
          borderRadius: "16px",
          marginBottom: "env(safe-area-inset-bottom)",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& fieldset": {
            borderColor: "#E0E0E2"
          },
          "&.Mui-error": {
            "& svg": {
              fill: "#FF6666"
            }
          }
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#FF6666",
          "&$error": {
            color: "#FF6666"
          }
        }
      }
    },

    MuiTab: {
      defaultProps: {
        disableTouchRipple: true,
        disableRipple: true
      }
    },
    MuiSkeleton: {
      defaultProps: {
        animation: "wave"
      }
    }
  }
});

export default theme;
