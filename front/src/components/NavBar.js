import { nanoid } from "nanoid";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { menuItems } from "../data/menuData";

const menuIcons = [
  {
    _id: nanoid(),
    img: require("../assets/icon-img/bag.png"),
    link: "product",
  },
  {
    _id: nanoid(),
    img: require("../assets/icon-img/user.png"),
    link: "about-us",
  },
];

export const NavBar = ({ current, setCurrent }) => {
 
  return (
    // <header className="flex align-items space-between">

    <nav className="flex align-items space-between">
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
        {menuIcons.map((e, index) => (
          <Link className="iconMenu" to={e.link} key={index}>
            <img src={e.img} alt="img" />
          </Link>
        ))}
      </div>
    </nav>
  );
};
