import "./App.css";
import MainBody from "./components/MainBody";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodoContext } from "./contexts/todoContext";
import { useState } from "react";

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
const tasks = [];
function App() {
  const [todo, setodo] = useState(tasks);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#191b1f",
        }}
      >
        <TodoContext.Provider value={{ todo, setodo }}>
          <MainBody />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
