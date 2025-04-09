import React, { useState } from 'react';
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
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Sidebar from './components/Sidebar/Sidebar';

import DashboardHome from './pages/dashboard/Dashboard';
import Login from './pages/Login';
import Products from './pages/dashboard/Products';
import AddProduct from './pages/dashboard/ProductCreate';
import UpdateProduct from './pages/dashboard/ProductUpdate';
import Checkout from './pages/Checkout';
import Banners from './pages/dashboard/Banners';
import AddBanner from "./pages/dashboard/BannersCreate";
import UpdateBanner from './pages/dashboard/BannersUpdate';
import ProtectedRoute from './utils/ProtectedRoute';

const { Header, Content } = Layout;

// 👉 Komponen Home Page (User)
const Heros = () => {
  return (
    <main className='overflow-x-hidden'>
      <Hero />
      <Promo />
    </main>
  );
};

// 👉 Layout Dashboard Admin
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#fff',
            boxShadow: '0 2px 8px #f0f1f2',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{ fontSize: '16px', marginLeft: '16px' }}
          />
        </Header>
        <Content
          style={{
            margin: '16px',
            padding: '16px',
            background: '#fff',
            minHeight: '280px',
            overflowX: 'auto', // biar bisa scroll kalau mepet
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<AddProduct />} />
            <Route path="products/:id" element={<UpdateProduct />} />
            <Route path="banners" element={<Banners />} />
            <Route path="banners/create" element={<AddBanner />} />
            <Route path="banners/:id" element={<UpdateBanner />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

// 👉 App Utama
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Heros />
              <Footer />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <Navbar />
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <>
              <Navbar />
              <Detail />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout/:id"
          element={
            <>
              <Navbar />
              <Checkout />
              <Footer />
            </>
          }
        />

        {/* Auth Route */}
        <Route path="/signin" element={<Login />} />

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute />} >
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
