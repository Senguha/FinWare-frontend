import { useState } from 'react'
import './App.css'
import Dummy from './components/dummy'
import Navbar from './components/navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Navbar/>
      <Dummy/>
    </ThemeProvider>
      
    </>
  )
}

export default App
