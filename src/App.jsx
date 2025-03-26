import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import Promo from './components/Product/Promo';
import Product from './components/Product/Product';
import ScrollToTop from './scroll/ScrollToTop';

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
};

const Home = () => {
  return (
    <main className='overflow-x-hidden'>
      <Hero />
      <Promo />
      <Contact />
      <About />
    </main>
  );
};

export default App;
