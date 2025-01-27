import "../styles/header.css";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <h1>Apartment Management</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Все квартиры</NavLink>
          </li>
          <li>
            <NavLink to="/add">Добавить квартиру</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
