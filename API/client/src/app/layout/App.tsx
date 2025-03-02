import { useEffect, useMemo, useState } from "react";
import { Product } from "./models/Product";
import Catalog from "../../features/catalog/Catalog";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import NavBar from "./NavBar";

function App() {

 const [products, setProducts] = useState<Product[]>([]);
 const [mode, setMode] = useState<"light" | "dark">("dark");
 
useEffect(()=>{
  fetch('https://localhost:5001/api/products').then((Response)=>{
    if(!Response.ok) {
      throw new Error('Network response was not ok');
    }
    return Response.json();
  }).then((data)=>setProducts(data)).catch((error)=>{
    console.error('Error fetching products:', error);
  })
},[])

const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
const toggleDarkMode = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));
  
  return (
    <>
     <ThemeProvider  theme={theme}>
     <CssBaseline />
    <NavBar toggleDarkMode={toggleDarkMode} mode={mode}/>
     <Container maxWidth= 'xl' sx={{mt:16}}>
      <Catalog products={products}/>
      </Container>
      </ThemeProvider>
    </>
  )
}
export default App