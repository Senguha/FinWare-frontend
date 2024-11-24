import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/layout";
import HomePage from "../Pages/Home/Home";
import Companies from "../Pages/Companies";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/companies" element={<Companies/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
