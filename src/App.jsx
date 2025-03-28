import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import Promo from './components/Product/Promo';
import Product from './components/Product/Product';
import Detail from './components/Product/Detail';
import ScrollToTop from './scroll/ScrollToTop';

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
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
    </main>
  );
};

export default App;
