import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import CoursePage from "../pages/course/CoursePage";
import RecordPage from "../pages/record/RecordPage";
import PlogPage from "../pages/plog/PlogPage";
import MyPage from "../pages/mypage/Mypage";
import { Layout } from "../components/layout/Layout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/plog" element={<PlogPage />} />
          <Route path="/my" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
