import {useMemo, useState } from "react";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {

 
 const [mode, setMode] = useState<"light" | "dark">("dark");
 


const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
const toggleDarkMode = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));
  
  return (
    <>
     <ThemeProvider  theme={theme}>
     <CssBaseline />
    <NavBar toggleDarkMode={toggleDarkMode} mode={mode}/>
     <Container maxWidth= 'xl' sx={{mt:16}}>
      <Outlet/>
      </Container>
      </ThemeProvider>
    </>
  )
}
export default App