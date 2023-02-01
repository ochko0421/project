import Admin from './components/admin/admin';
import './App.css';
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Router, Routes } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import About from './components/admin/About';
function App() {

  return (
    <div>
      <Routes>
        <Route element={<Admin/>} >
        <Route index path="/home" element={<AdminLayout/>} />
        <Route path='about' element={<About/>}/>
        </Route>
      </Routes>
      
   
    </div>
  );
}

export default App;