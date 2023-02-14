import { Footer, NavBar } from "../components"

import { Outlet } from 'react-router-dom';
import { useState } from "react";


export default function Layout() {
    const [current, setCurrent] = useState()
    return <div>
        <NavBar current={current} setCurrent={setCurrent} />
        <Outlet />
        <Footer />
    </div>

}