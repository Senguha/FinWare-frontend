import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/layout";
import HomePage from "../Pages/Home/Home";
import CompanyListPage from "../Pages/CompanyList";
import CompanyDetailsPage from "../Pages/CompanyDetails/CompanyDetails";
import ProfileSettings from "../Pages/ProfileSettings/ProfileSettings";
import UserCompanyListPage from "../Pages/Profile/UserCompanyList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/companies" element={<CompanyListPage/>}/>
          <Route path="/companies/:id" element={<CompanyDetailsPage/>}/>
          <Route path="/settings" element={<ProfileSettings/>}/>
          <Route path="/profile" element={<UserCompanyListPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
