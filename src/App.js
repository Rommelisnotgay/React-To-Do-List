import "./App.css";
import MainBody from "./components/MainBody";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import TodosProvider from "./contexts/todoContext";
import { ToastProvider } from "./contexts/toastContext";
const theme = createTheme({
  typography: {
    fontFamily: "A",
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              background: "#191b1f",
              padding: "8px",
            }}
          >
            <MainBody />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
