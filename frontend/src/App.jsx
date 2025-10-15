import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import egImg from './assets/a.png'
import { Header } from './layout/header/header.jsx'
import { Footer } from './layout/footer/footer.jsx'
/* Import for router DOM*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home/home.jsx'
import { PhonesPage } from './pages/Phones/phones.jsx'
import { ArticlesPage } from './pages/Articles/artices.jsx'
import { ContactsPage } from './pages/Contacts/contacts.jsx'
import { DealsPage } from './pages/Deals/deals.jsx'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Home' element={<HomePage />} />
          <Route path='/Deals' element={<DealsPage />} />
          <Route path='/Phones' element={<PhonesPage />} />
          <Route path='/Articles' element={<ArticlesPage />} />
          <Route path='/Contact' element={<ContactsPage />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;