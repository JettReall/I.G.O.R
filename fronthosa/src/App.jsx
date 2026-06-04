import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Login from './pages/login.jsx'; // Caminho relativo correto para o componente
import './pages/login.css';           // Caminho relativo correto para o CSS

function App() {
  return (
    <>
      <Login />
    </>
  );
}

export default App;