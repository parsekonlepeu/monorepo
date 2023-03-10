import { createTheme } from '@mui/material/styles';
import { indigo, deepPurple  } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    google: {
      primary: string;
      primaryVariant: string;
      secondary: string;
      secondaryVariant: string;
      onSecondary: string;
      onSecondaryVariant: string;
      secondaryVariant_2: string;
      surface: string;
      onSurface: string;
      onSurfaceVariant: string;
      onSurfaceVariantAgm: string;
      background: string;
      onBackground: string;
      textfieldSurface: string;
      textfieldPrimary: string;
      textfieldHairline: string;
      textfieldError: string;
      textfieldOnSurfaceVariant: string;
      hairline: string;
      hairlineHover: string;
      error: string;
      now: string;
      fabHover: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    google: {
      primary: string;
      primaryVariant: string;
      secondary: string;
      secondaryVariant: string;
      onSecondary: string;
      onSecondaryVariant: string;
      secondaryVariant_2: string;
      surface: string;
      onSurface: string;
      onSurfaceVariant: string;
      onSurfaceVariantAgm: string;
      background: string;
      onBackground: string;
      textfieldSurface: string;
      textfieldPrimary: string;
      textfieldHairline: string;
      textfieldError: string;
      textfieldOnSurfaceVariant: string;
      hairline: string;
      hairlineHover: string;
      error: string;
      now: string;
      fabHover: string;
    };
  }
}

export const theme = createTheme({
  components: {
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: 14,
            fontWeight: 600
          }
        }
      },
      MuiToggleButton: {
        styleOverrides: {
        root: {
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          borderBottomLeftRadius: '5px',
          borderBottomRightRadius: '5px',
          border: 'none',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '13px',
          "&.Mui-selected": {
            color: "#1967d2",
            backgroundColor: '#e8f0fe'
          }
        }
        }
      }
    },
    palette: {
      primary: {
        light: "#4285f4",
        main: "#1a73e8",
        dark: indigo[900]
      },
      secondary: {
        light: "#d2e3fc",
        main: "#e8f0fe",
        dark: deepPurple[800]
      },
    },
    typography: {
      fontFamily: "'Open Sans', sans-serif"
    },
    google: {
      primary: "#1a73e8",
      primaryVariant: "#4285f4",
      secondary: "#e8f0fe",
      secondaryVariant: "#d2e3fc",
      onSecondary: "#1967d2",
      onSecondaryVariant: "#185abc",
      secondaryVariant_2: "#8ebbff",
      surface: "#fff",
      onSurface: "#3c4043",
      onSurfaceVariant: "#5f6368",
      onSurfaceVariantAgm: "#70757a",
      background: "#fff",
      onBackground: "#202124",
      textfieldSurface: "#f1f3f4",
      textfieldPrimary: "#1967d2",
      textfieldHairline: "#80868b",
      textfieldError: "#c5221f",
      textfieldOnSurfaceVariant: "#5f6368",
      hairline: "#dadce0",
      hairlineHover: "#B4B4B4",
      error: "#d93025",
      now: "#ea4335",
      fabHover: "#f6fafe"
    }
  })