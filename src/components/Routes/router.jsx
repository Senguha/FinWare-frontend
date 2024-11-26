import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/layout";
import HomePage from "../Pages/Home/Home";
import CompanyListPage from "../Pages/CompanyList";
import CompanyDetailsPage from "../Pages/CompanyDetails/CompanyDetails";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/companies" element={<CompanyListPage/>}/>
          <Route path="/companies/:id" element={<CompanyDetailsPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
