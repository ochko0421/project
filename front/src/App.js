import Admin from './components/admin/admin';
import './App.css';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import About from './components/admin/About';
import ProductAdmin from './components/admin/ProductAdmin';
import { useState } from 'react';
import { Footer, NavBar, Product } from "./components"
import { Landing, Products, Services, Article, AboutUs } from "./pages";
function App() {

  return (
    <div>

      <div className='container'>
      <Routes>
        <Route element={<Layout />}>
        <Route index path="/" element={<Landing />} />
        <Route path="/products/*" element={<Products />}>
          <Route path="card" element={<Product />} />
        </Route>
        <Route path="/services" element={<Services />} />
        <Route path="/article" element={<Article />} />
        <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Routes>
      </div>
     
      
      <Routes>
        <Route element={<Admin />} >
          <Route index path="/home" element={<AdminLayout />} />
          <Route path='about' element={<About />} />
          <Route path='/product' element={<ProductAdmin />} />
        </Route>
      </Routes>


    </div>
  );
}

export default App;
