import { useEffect,useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const [darkMode, setDarkMode] = useState(false);

  const pallateType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: pallateType,
      background: {
        default: (pallateType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })
      
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }


  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
}, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    <Box
      sx={{
        minHeight: '100vh',
        background: darkMode 
       ? 'radial-gradient(circle, #2b5876, #1c1c1c)' 
       : 'radial-gradient(circle, #a1c4fd, #c2e9fb)',
        py: 6
      }}
    >
      <Container maxWidth="xl" sx={{mt: 8}}>
      <Catalog products={products} />
    </Container>
    </Box>
    
    </ThemeProvider>
  )
}

export default App
