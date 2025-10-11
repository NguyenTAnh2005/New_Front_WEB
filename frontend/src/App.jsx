import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import egImg from './assets/a.png'
import { Header } from './layout/header/header.jsx'
import { Footer } from './layout/footer/footer.jsx'
import { HomePage } from './pages/Home/home.jsx'

function App() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;