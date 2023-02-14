import { nanoid } from "nanoid";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { menuItems } from "../data/menuData";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';

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

  const [user, setUser] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  const [loggedUser, setloggedUser] = useState([null])

  useEffect(() => {
    axios.get("http://localhost:8000/user")
      .then(res => {
        setUser(res.data.result)
        console.log(user);
      })
  }, [])

  function handleLogin(e) {
    e.stopPropagation()
    
    axios.post("http://localhost:8000/user/login",{username:username,password:password})
    .then(res=>setloggedUser(res.data))
    console.log(loggedUser);
    if(loggedUser.status==true){
      if(loggedUser.result.isAdmin){
        navigate("/home")
      }
      else {
        setLoggedIn(true)
        handleClose()
        navigate(-1)
      }
    }
    else alert(loggedUser.message)
    // setloggedUser(user.filter((param) => param.username == username && param.password == password))
    // if (loggedUser.length > 0) {
    //   if (loggedUser[0].isAdmin == true) {
    //     navigate("/home")

    //   }
    //   else if (loggedUser[0].isAdmin == false) {
    //     setLoggedIn(true)
    //     handleClose()
    //     navigate(-1)
    //   }
    // } else alert("wrong username or password")
    // console.log(loggedUser);
  }

  function handleLogout() {
    setloggedUser([])
    setLoggedIn(false)
    setPassword("")
    setUsername("")
  }

  function handleSignup(e) {
    e.stopPropagation()
    navigate("/signup")
  }

  return (
    // <header className="flex align-items space-between">

    <nav className="navbar">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1>Log In</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="form">
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
            <label>Password</label>
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleSignup(e)}>Sign Up</Button>
          <Button onClick={(e) => handleLogin(e)}>Log In</Button>
        </Modal.Footer>
      </Modal>
     
      <div className="container flex align-items space-around">
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
          {!loggedIn ? <span onClick={handleShow} className="iconMenu">
            <img src={menuIcons[1].img} alt="img" />
          </span> : <NavDropdown title={loggedUser.result.name} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Cart
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Purchase History</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleLogout()}>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>

          }

        </div>
      </div>

    </nav>
  );
};
