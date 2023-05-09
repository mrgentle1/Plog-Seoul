import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import HomePage from "../pages/home/HomePage";
import CoursePage from "../pages/course/CoursePage";
import RecordPage from "../pages/record/RecordPage";
import RecordIng from "../pages/record/RecordIng";

import PlogPage from "../pages/plog/PlogPage";
import MyPage from "../pages/mypage/Mypage";
import { Layout } from "../components/layout/Layout";
import RecordFinish from "../pages/record/RecordFinish";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/plog" element={<PlogPage />} />
          <Route path="/my" element={<MyPage />} />
        </Route>
        <Route path="/record/ing" element={<RecordIng />} />
        <Route path="/record/finish" element={<RecordFinish />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
