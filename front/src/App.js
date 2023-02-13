import Admin from './components/admin/admin';

import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import About from './components/admin/About';
import ProductAdmin from './components/admin/ProductAdmin';
import { Product } from "./components"
import { Landing, Products, Services, Article, AboutUs } from "./pages";
import Signup from './components/Signup';


function App() {

  return (
    <div>



      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/products/*" element={<Products />}>
            <Route path="card" element={<Product />} />
          </Route>
          <Route path="/services" element={<Services />} />
          <Route path="/article" element={<Article />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      <Route exact path='/signup' element={<Signup/>}/>

        <Route element={<Admin />} >
          <Route index path="/home" element={<AdminLayout />} />
          <Route path='/about' element={<About />} />
          <Route path='/product' element={<ProductAdmin />} />
        </Route>
      </Routes>



    </div>
  );
}

export default App;
