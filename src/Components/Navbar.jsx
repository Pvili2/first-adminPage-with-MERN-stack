import { NavLink,useLocation } from "react-router-dom";
import "../CSS/Navbar.css";
export default function Navbar() {

  const location = useLocation();
  const activeStyle = {
    backgroundColor: "#6C7A89",
    cursor: "pointer",
    borderRadius: "10px",
    color: "#A3C6C4"
  }
  const firstActive = (location) =>{
    if (location.pathname === "/getItems" || location.pathname === "/") {
      return true;
    }else {
      return false;
    }
  }

  return (
    <div className="navbar">
      <NavLink to="getItems" style={({isActive})=> firstActive(location) ? activeStyle : null}>
        <div className="navitem">
        Adatok lekérdezése
        </div>
      </NavLink>
      
      <NavLink to="createItems" style={({isActive})=> isActive ? activeStyle : null}>
        <div className="navitem">
          Adatok létrehozása
        </div>
      </NavLink>

      <NavLink to="updateItems" style={({isActive})=> isActive ? activeStyle : null}>
        <div className="navitem">
          Adatok módosítása
        </div>
      </NavLink>

      <NavLink to="deleteItems" style={({isActive})=> isActive ? activeStyle : null}>
        <div className="navitem">
          Adatok törlése
        </div>
      </NavLink>
    </div>
  );
}
