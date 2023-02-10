import { Footer, NavBar, Product } from "../components"
import { Landing, Products, Services, Article, AboutUs } from "../pages";
import { Outlet, Route, Routes } from 'react-router-dom';
import { useState } from "react";


export default function Layout() {
    const [current, setCurrent] = useState()
    return <div className="container">
        <NavBar current={current} setCurrent={setCurrent} />
        <Outlet />
        <Footer />
    </div>

}