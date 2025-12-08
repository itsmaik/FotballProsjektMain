import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  RegisterPage,
  AdminPage,
  NotFoundPage,
  CompanyBooksPage,
} from "../pages";

const AppRouting = () => {
  return (
    <>
      <BrowserRouter>
        <header className="linkHeader">
          <nav>
            <ul className="linkfix">
              <li className="linkfix">
                <Link to="/">Home</Link>
              </li>
              <li className="linkfix">
                <Link to="registrer">RegisterPage</Link>
              </li>
              <li className="linkfix">
                <Link to="regnskap">CompanyBooksPage</Link>
              </li>
              <li className="linkfix">
                <Link to="notfoundpage">NotFoundPage</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<AdminPage />}></Route>
            <Route path="registrer" element={<RegisterPage />}></Route>
            <Route path="regnskap" element={<CompanyBooksPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </main>
      </BrowserRouter>

      <footer></footer>
    </>
  );
};

export default AppRouting;
