import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";


function App() {
  const {darkMode} = useAppSelector(state => state.ui);
  const pallateType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: pallateType,
      background: {
        default: (pallateType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })
      
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <NavBar />
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
