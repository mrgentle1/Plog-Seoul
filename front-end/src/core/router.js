import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";

import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import HomePage from "../pages/home/HomePage";
import CoursePage from "../pages/course/CoursePage";
import RecordPage from "../pages/record/RecordPage";
import RecordIng from "../pages/record/RecordIng";

import PlogPage from "../pages/plog/PlogPage";
import MyPage from "../pages/mypage/Mypage";
import SearchPage from "../pages/search/Search";
import CoursePostPage from "../pages/course/CoursePostPage";
import CourseMainPage from "../pages/course/CourseMainPage";
import ReviewPage from "../pages/review/ReviewPage";
import ReviewWritePage from "../pages/review/ReviewWritePage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/course/:id" element={<CoursePostPage />} />
        <Route path="/course/main" element={<CourseMainPage />} />
        <Route path="/course/:id/review" element={<ReviewPage />} />
        <Route path="/course/:id/write" element={<ReviewWritePage />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/plog" element={<PlogPage />} />
          <Route path="/my" element={<MyPage />} />
        </Route>
        <Route path="/record/ing" element={<RecordIng />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
