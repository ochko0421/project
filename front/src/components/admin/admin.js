import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import { Outlet,useNavigate } from "react-router-dom";



export default function Admin() {
    const [menu, setMenu] = useState([])


    useEffect(() => {
        axios.get("http://localhost:8000/api/menu")
            .then(res => {
                setMenu(res.data.result)

                console.log(res.data.result);
                console.log(res.data);
            }, error => {
                console.log(error);
            })
    }, [])




    return <div>
       
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                <div className="nav flex-column">
                {menu.map((e, i) => {
                    return <Link className="navbar-brand" style={{color:"#a83248"}} to={e.link} key={i}>
                        {e.menuName}
                    </Link>
                })}
                </div>
               
                </div>
                <div className="col-md-10"><Outlet/></div>
            </div>
        </div>

    </div>


}