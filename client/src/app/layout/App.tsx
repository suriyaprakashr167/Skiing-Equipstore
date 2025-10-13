import { useState } from "react";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {

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
      <Outlet />
    </Container>
    </Box>
    
    </ThemeProvider>
  )
}

export default App
