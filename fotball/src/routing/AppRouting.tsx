import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import {
  AddNewAthletePage,
  NotFoundPage,
  FinancePage,
  HomePage,
} from "../pages";

const AppRouting = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/register" element={<AddNewAthletePage />}></Route>
            <Route path="/finances" element={<FinancePage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <footer></footer>
    </>
  );
};

export default AppRouting;
