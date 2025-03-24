import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Promo from './components/Product/Promo';

const App = () => {
  return (
    <>
      <main className='overflow-x-hidden'>
        <Navbar />
        <Hero />
        <Promo />
        <Contact />
        <About />
        <Footer />
      </main>
    </>
  )
}

export default App
