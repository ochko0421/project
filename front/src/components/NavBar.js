import { nanoid } from "nanoid";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { menuItems } from "../data/menuData";
import { useEffect, useState } from "react";
import  Modal  from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
const menuIcons = [
  {
    _id: nanoid(),
    img: require("../assets/icon-img/bag.png"),
  },
  {
    _id: nanoid(),
    img: require("../assets/icon-img/user.png"),

  },
];

export const NavBar = ({ current, setCurrent }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user,setUser] = useState([])
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

    useEffect(()=>{
      axios.get("http://localhost:8000/user")
      .then(res=>{
        setUser(res.data.result)
      })
    },[])
    
    function handleLogin(){

    }

  return (
    // <header className="flex align-items space-between">

    <nav className="flex align-items space-between">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <h1>Log In</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="form">
            <label>Username</label>
            <input className="form-control"/>
            <label>Password</label>
            <input className="form-control"/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Log In</Button>
        </Modal.Footer>
      </Modal>
      <Link
        to="/"
        className="Logo flex align-items"
        onClick={() => {
          setCurrent("");
        }}
      >
        <img src={require("../assets/icon-img/logo.png")} alt="" />
        <img src={require("../assets/page/landing/Lalasia.png")} alt="" />
      </Link>
      <div className="flex align-items space-between ">
        {menuItems.map((e, index) =>
          current === e._id ? (
            <Link className="item item-active" to={e.link} key={index}>
              {e.name}
            </Link>
          ) : (
            <Link
              className="item"
              to={e.link}
              onClick={() => {
                setCurrent(e._id);
              }}
              key={index}
            >
              {e.name}
            </Link>
          )
        )}
      </div>
      <div className="flex align-items space-between">
       
          <span className="iconMenu">
            <img src={menuIcons[0].img} alt="img" />
          </span>
          <span onClick={handleShow} className="iconMenu">
            <img src={menuIcons[1].img} alt="img" />
          </span>
      </div>
    </nav>
  );
};
