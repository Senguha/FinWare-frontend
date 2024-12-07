import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/layout";
import HomePage from "../Pages/Home/Home";
import CompanyListPage from "../Pages/CompanyList";
import CompanyDetailsPage from "../Pages/CompanyDetails/CompanyDetails";
import ProfileSettings from "../Pages/ProfileSettings/ProfileSettings";
import UserCompanyListPage from "../Pages/Profile/UserCompanyList";
import UserRoute from "./Layout/UserRoute";
import AdminPanelPage from "../Pages/Admin/AdminPanel";
import AdminCompanyListPage from "../Pages/Admin/AdminCompanyList";
import AdminUserListPage from "../Pages/Admin/AdminUserList";
import AdminRoute from "./Layout/AdminRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<CompanyListPage />} />
          <Route path="/companies/:id" element={<CompanyDetailsPage />} />
          <Route element={<UserRoute />}>
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="/profile" element={<UserCompanyListPage />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminPanelPage/>}/>
            <Route path="admin/companies" element={<AdminCompanyListPage/>}/>
            <Route path="admin/users" element={<AdminUserListPage/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
