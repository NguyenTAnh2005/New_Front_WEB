import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import egImg from './assets/a.png'
import { Header } from './layout/header/header.jsx'
import { Footer } from './layout/footer/footer.jsx'
/* Import for router DOM*/
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/Home/home.jsx'
import { PhonesPage } from './pages/Phones/phones.jsx'
import { ArticlesPage } from './pages/Articles/artices.jsx'
import { ContactsPage } from './pages/Contacts/contacts.jsx'
import { DealsPage } from './pages/Deals/deals.jsx'
import { LogIn } from './components/login_signup_forgotpass/login.jsx'
import { SignUp } from './components/login_signup_forgotpass/signup.jsx'

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/signup", "/forgot-pass"].includes(location.pathname);
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Deals' element={<DealsPage />} />
        <Route path='/Phones' element={<PhonesPage />} />
        <Route path='/Articles' element={<ArticlesPage />} />
        <Route path='/Contact' element={<ContactsPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}
function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}


export default App;