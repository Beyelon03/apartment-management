import { Link } from "react-router";
import "../styles/not-found.css";
import Header from "../components/Header.tsx";

const NotFound = () => {
  return (
    <div className="container">
      <Header />
      <h1 className="title">404</h1>
      <p className="message">Страница не найдена</p>
      <Link to="/" className="link">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
